import { CONTACT } from "@/content/contact";

export default function SiteFooter() {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "var(--space-5)",
        flexWrap: "wrap",
        paddingTop: "var(--space-5)",
        borderTop: "1px solid var(--hairline)",
      }}
    >
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
            transition: "var(--transition-link)",
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
            transition: "var(--transition-link)",
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
            transition: "var(--transition-link)",
          }}
        >
          {CONTACT.soundcloud.label}
        </a>
      </div>
      <span
        className="ds-meta"
        style={{ color: "var(--text-meta-color)" }}
      >
        © {new Date().getFullYear()} Tanmaya Wahal
      </span>
    </footer>
  );
}
