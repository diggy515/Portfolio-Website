"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ── Shared audio singleton ─────────────────────────────────────
   One audio element is shared across every WaveformPlayer on the
   page so only one track can ever play at a time.              */
let _audio: HTMLAudioElement | null = null;
let _playingId: string | null = null;
const _listeners = new Set<() => void>();

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!_audio) {
    _audio = document.createElement("audio");
    _audio.preload = "none";
  }
  return _audio;
}

function notifyAll() {
  _listeners.forEach((fn) => fn());
}

/* ── Waveform generation ────────────────────────────────────────
   Used as a placeholder when peaks JSON isn't available yet.  */
function makePlaceholderPeaks(count: number): number[] {
  return Array.from({ length: count }, (_, i) =>
    Math.max(0.08, Math.abs(Math.sin(i * 0.14 + 1.2)) * 0.65 + Math.sin(i * 0.07) * 0.25 + 0.15)
  );
}

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface Props {
  id: string;
  title: string;
  audioUrl?: string;
  peaksUrl?: string;
  height?: number;
  bars?: number;
  /** Fallback duration (seconds) shown before audio loads. */
  duration?: number;
}

export default function WaveformPlayer({
  id,
  title,
  audioUrl,
  peaksUrl,
  height = 64,
  bars = 140,
  duration: durationProp,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [peaks, setPeaks] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(durationProp ?? 0);

  /* ── Fetch peaks ──────────────────────────────────────────── */
  useEffect(() => {
    if (!peaksUrl) {
      setPeaks(makePlaceholderPeaks(bars));
      return;
    }
    let live = true;
    fetch(peaksUrl)
      .then((r) => r.json())
      .then((d) => {
        if (!live) return;
        const arr: number[] = Array.isArray(d) ? d : d.peaks ?? [];
        setPeaks(arr.length > 0 ? arr : makePlaceholderPeaks(bars));
        if (d.duration) setAudioDuration(d.duration);
      })
      .catch(() => {
        if (live) setPeaks(makePlaceholderPeaks(bars));
      });
    return () => {
      live = false;
    };
  }, [peaksUrl, bars]);

  /* ── Subscribe to shared audio events ────────────────────── */
  useEffect(() => {
    const audio = getAudio();

    const sync = () => {
      if (_playingId !== id) {
        setIsPlaying(false);
        return;
      }
      if (!audio) return;
      setIsPlaying(!audio.paused);
      setCurrentTime(audio.currentTime);
      if (audio.duration && isFinite(audio.duration)) {
        setAudioDuration(audio.duration);
        setProgress(audio.currentTime / audio.duration);
      }
    };

    _listeners.add(sync);
    if (audio) {
      audio.addEventListener("timeupdate", sync);
      audio.addEventListener("ended", sync);
      audio.addEventListener("pause", sync);
      audio.addEventListener("play", sync);
      audio.addEventListener("loadedmetadata", sync);
    }
    return () => {
      _listeners.delete(sync);
      if (audio) {
        audio.removeEventListener("timeupdate", sync);
        audio.removeEventListener("ended", sync);
        audio.removeEventListener("pause", sync);
        audio.removeEventListener("play", sync);
        audio.removeEventListener("loadedmetadata", sync);
      }
    };
  }, [id]);

  /* ── Draw waveform ────────────────────────────────────────── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || peaks.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    if (w === 0) return;

    canvas.width = w * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, height);

    const gap = 1.5;
    const totalGap = gap * (bars - 1);
    const barW = (w - totalGap) / bars;
    if (barW <= 0) return;

    for (let i = 0; i < bars; i++) {
      const peakIdx = Math.floor((i / bars) * peaks.length);
      const raw = peaks[peakIdx] ?? 0;
      const peak = Math.max(0.04, Math.min(1, raw));
      const barH = Math.max(2, peak * height);
      const x = i * (barW + gap);
      const y = (height - barH) / 2;
      const played = i / bars < progress;
      ctx.fillStyle = played ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.30)";
      ctx.fillRect(x, y, barW, barH);
    }
  }, [peaks, progress, height, bars]);

  useEffect(() => {
    draw();
  }, [draw]);

  /* Redraw on container resize */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => draw());
    obs.observe(el);
    return () => obs.disconnect();
  }, [draw]);

  /* ── Playback control ─────────────────────────────────────── */
  const togglePlay = useCallback(async () => {
    if (!audioUrl) return;
    const audio = getAudio();
    if (!audio) return;

    if (_playingId === id) {
      audio.paused ? audio.play().catch(() => {}) : audio.pause();
    } else {
      audio.pause();
      audio.src = audioUrl;
      audio.preload = "none";
      _playingId = id;
      notifyAll();
      audio.play().catch(() => {});
    }
  }, [id, audioUrl]);

  const scrubTo = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const audio = getAudio();
      if (!audio || !audioUrl) return;
      if (_playingId !== id) return;
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      if (audio.duration) audio.currentTime = ratio * audio.duration;
    },
    [id, audioUrl]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.shiftKey ? scrubTo(e) : togglePlay();
    },
    [scrubTo, togglePlay]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const audio = getAudio();
      if (!audio) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft" && _playingId === id) {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 5);
      } else if (e.key === "ArrowRight" && _playingId === id) {
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
      }
    },
    [id, togglePlay]
  );

  const label = isPlaying && _playingId === id ? `Pause ${title}` : `Play ${title}`;

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height,
          cursor: audioUrl ? "pointer" : "default",
        }}
        role="button"
        aria-label={label}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "var(--space-3)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-meta)",
          letterSpacing: "var(--tracking-label)",
          color: "var(--text-meta-color)",
        }}
      >
        <span>{fmt(currentTime)}</span>
        <span>{audioDuration ? fmt(audioDuration) : "--:--"}</span>
      </div>
    </div>
  );
}
