import type { Metadata } from "next";
import Shell from "@/components/Shell";
import SectionHead from "@/components/SectionHead";

export const metadata: Metadata = { title: "Limbo" };

const LIMBO_VIDEO_ID = "4ZPb4oY9F9Y";

export default function LimboPage() {
  return (
    <Shell active="limbo">
      <SectionHead
        eyebrow="Limbo"
        title="Limbo"
        titleClassName="limbo-spin"
        note="Sketches and Experiments"
      />
      <section className="limbo-video">
        <div className="tube-frame">
          <iframe
            src={`https://www.youtube.com/embed/${LIMBO_VIDEO_ID}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>
    </Shell>
  );
}
