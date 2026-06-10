"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, type NavKey } from "@/content/site";

interface Props {
  active?: NavKey;
  showName?: boolean;
}

export default function SiteHeader({ active, showName = true }: Props) {
  const pathname = usePathname();

  function isActive(key: NavKey) {
    if (active) return active === key;
    const nav = NAV.find((n) => n.key === key);
    return nav ? pathname.startsWith(nav.href) : false;
  }

  return (
    <header
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: showName ? "space-between" : "flex-end",
        gap: "var(--space-6)",
      }}
    >
      {showName && (
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-body)",
            fontWeight: "var(--weight-medium)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
          }}
        >
          Tanmaya Wahal
        </Link>
      )}
      <nav
        style={{
          display: "flex",
          gap: "var(--space-5)",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {NAV.map((item) => {
          const active = isActive(item.key);
          return (
            <Link
              key={item.key}
              href={item.href}
              style={{
                fontFamily: "var(--font-meta)",
                fontSize: "var(--text-nav)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: active ? "var(--text-primary)" : "var(--text-meta-color)",
                transition: "var(--transition-link)",
                textDecoration: active ? "underline" : "none",
                textUnderlineOffset: "3px",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
