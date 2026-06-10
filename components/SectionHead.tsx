interface Props {
  eyebrow?: string;
  title?: string;
  note?: string;
  titleClassName?: string;
}

export default function SectionHead({ eyebrow, title, note, titleClassName }: Props) {
  return (
    <div style={{ marginBottom: "var(--space-7)" }}>
      {eyebrow && (
        <div
          className="ds-meta"
          style={{ marginBottom: "var(--space-4)" }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <h1
          className={titleClassName}
          style={{
            fontSize: "var(--text-title)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-display)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-display-color)",
            maxWidth: "18ch",
          }}
        >
          {title}
        </h1>
      )}
      {note && (
        <p
          style={{
            marginTop: "var(--space-4)",
            maxWidth: "var(--measure-narrow)",
            fontSize: "var(--text-lead)",
            lineHeight: "var(--leading-snug)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-secondary)",
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}
