import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { CONTACT } from "@/content/contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Shell active="contact" footer={false}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "62vh",
        }}
      >
        <div className="ds-meta">Contact</div>
        <div style={{ flex: 1 }} />

        <a
          href={`mailto:${CONTACT.email}`}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-display-color)",
            width: "fit-content",
            transition: "var(--transition-link)",
          }}
        >
          {CONTACT.email}
        </a>

        <div
          style={{
            display: "flex",
            gap: "var(--space-6)",
            flexWrap: "wrap",
            marginTop: "var(--space-6)",
          }}
        >
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
              transition: "var(--transition-link)",
            }}
          >
            Instagram ↗
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
              transition: "var(--transition-link)",
            }}
          >
            SoundCloud ↗
          </a>
        </div>

        <div
          className="ds-meta"
          style={{ marginTop: "var(--space-7)" }}
        >
          Booking &amp; enquiries — replace with management / label
        </div>
      </div>
    </Shell>
  );
}
