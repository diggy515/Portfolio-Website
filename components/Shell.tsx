import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import type { NavKey } from "@/content/site";

interface Props {
  active?: NavKey;
  children: React.ReactNode;
  footer?: boolean;
  maxWidth?: number;
}

export default function Shell({ active, children, footer = true, maxWidth = 1280 }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--canvas)",
        padding: "var(--space-6) var(--margin-page) var(--space-7)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <SiteHeader active={active} />
        <main
          style={{
            flex: 1,
            paddingTop: "var(--space-9)",
            paddingBottom: "var(--space-9)",
          }}
        >
          {children}
        </main>
        {footer && <SiteFooter />}
      </div>
    </div>
  );
}
