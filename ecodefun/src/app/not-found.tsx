import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--bg-base)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div
        className="glow-blob"
        style={{
          width: "500px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(255,104,53,0.1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "clamp(6rem, 20vw, 12rem)",
            fontWeight: 500,
            color: "rgba(255,104,53,0.15)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: "8px",
            userSelect: "none",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            maxWidth: "360px",
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary">
            Go Home <ArrowRight size={16} />
          </Link>
          <Link href="/ide" className="btn-ghost">
            Open IDE
          </Link>
        </div>
      </div>
    </div>
  );
}
