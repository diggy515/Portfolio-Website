import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { SITE } from "@/content/site";
import { CONTACT } from "@/content/contact";

export const metadata: Metadata = {
  title: SITE.name,
};

export default function HomePage() {
  return (
    <div className="home">
      {/* Left — looping GIF, rotated 90° to fill the tall column */}
      <div className="home__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="home__gif"
          src="https://media.tanmayawahal.com/Cool%20Video%20Loop.gif"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Right — nav, name, tagline, socials */}
      <div className="home__panel">
        <SiteHeader showName={false} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "var(--text-display)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-display-color)",
              maxWidth: "9ch",
              fontFamily: '"Courier New"',
            }}
          >
            Tanmaya Wahal
          </h1>
          <div
            style={{
              marginTop: "var(--space-5)",
              display: "flex",
              gap: "var(--space-3)",
              flexWrap: "wrap",
              alignItems: "baseline",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-nav)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            {SITE.tagline.map((item, i) => (
              <>
                <span key={item} style={{ whiteSpace: "nowrap" }}>
                  {item}
                </span>
                {i < SITE.tagline.length - 1 && (
                  <span key={`dot-${i}`} style={{ color: "var(--text-meta-color)" }}>
                    ·
                  </span>
                )}
              </>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "var(--space-5)",
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <a
            href={`mailto:${CONTACT.email}`}
            style={{
              fontFamily: "var(--font-meta)",
              fontSize: "var(--text-nav)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-meta)",
              fontSize: "var(--text-nav)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            {CONTACT.instagram.label}
          </a>
          <a
            href={CONTACT.soundcloud.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-meta)",
              fontSize: "var(--text-nav)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            {CONTACT.soundcloud.label}
          </a>
        </div>
      </div>
    </div>
  );
}
