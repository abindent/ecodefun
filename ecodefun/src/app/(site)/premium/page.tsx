import Link from "next/link";
import { Sparkles, ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Premium",
};

export default function PremiumPage() {
  return (
    <div
      style={{
        background: "var(--bg-base)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="glow-blob"
        style={{
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(255,104,53,0.14) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />

      <div style={{ maxWidth: "600px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            background: "rgba(255,104,53,0.12)",
            border: "1px solid rgba(255,104,53,0.25)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <Sparkles size={36} color="var(--accent-orange)" />
        </div>

        <div className="tag" style={{ marginBottom: "20px", display: "inline-flex" }}>
          Coming Soon
        </div>

        <h1
          style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          CodePack Premium
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            lineHeight: 1.75,
            marginBottom: "40px",
          }}
        >
          We&apos;re building something special — a premium coding environment
          with advanced features, collaboration tools, and more. Stay tuned.
        </p>

        {/* Planned features */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "28px",
            marginBottom: "36px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent-orange)",
              marginBottom: "16px",
            }}
          >
            Planned Features
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Multiple file tabs & project mode",
              "Cloud save & sync",
              "Share projects with a link",
              "TypeScript & framework support",
              "AI code completion",
            ].map((f) => (
              <li
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                }}
              >
                <Check size={16} color="var(--accent-green)" style={{ flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/ide" className="btn-primary">
            Use Free IDE <ArrowRight size={16} />
          </Link>
          <Link href="/" className="btn-ghost">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
