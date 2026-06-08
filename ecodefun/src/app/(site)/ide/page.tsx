import Link from "next/link";
import { Code2, Layers, ArrowRight, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Choose IDE | CodeFun",
};

export default function IdePage() {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", padding: "80px 24px" }}>
      {/* Glow */}
      <div
        className="glow-blob"
        style={{
          width: "500px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255,104,53,0.12) 0%, transparent 70%)",
          top: 0,
          right: 0,
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>
            Online IDEs
          </div>
          <h1
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Choose Your Editor
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "420px", margin: "0 auto", lineHeight: 1.7 }}>
            Both editors are free, open-source, and work entirely in your browser.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {/* ECodePen */}
          <div
            className="card"
            style={{
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent corner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, var(--accent-orange), transparent)",
              }}
            />

            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(255,104,53,0.1)",
                border: "1px solid rgba(255,104,53,0.2)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
              }}
            >
              <Code2 size={32} color="var(--accent-orange)" />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "6px",
              }}
            >
              ECodePen
            </h2>
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                color: "var(--accent-orange)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              By OpenSource
            </div>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                marginBottom: "28px",
                flex: 1,
              }}
            >
              A full-featured in-browser IDE powered by CodeMirror. Syntax
              highlighting, multi-panel layout, and an instant preview pane.
              Perfect for experimenting with web UIs.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "CodeMirror syntax highlighting",
                "HTML, CSS & JS panels",
                "Click Run to preview",
                "Tab size & line numbers",
              ].map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <ChevronRight size={14} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/editor" className="btn-primary">
              Open ECodePen <ArrowRight size={16} />
            </Link>
          </div>

          {/* ECodePad */}
          <div
            className="card"
            style={{
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, var(--accent-blue), transparent)",
              }}
            />

            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(68,136,255,0.1)",
                border: "1px solid rgba(68,136,255,0.2)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
              }}
            >
              <Layers size={32} color="var(--accent-blue)" />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "6px",
              }}
            >
              ECodePad
            </h2>
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                color: "var(--accent-blue)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              By Game Splash
            </div>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                marginBottom: "28px",
                flex: 1,
              }}
            >
              A minimal scratchpad with a live preview that updates as you type.
              No buttons, no overhead — just write HTML, CSS, and JS and watch
              it render instantly.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Live preview as you type",
                "Ultra-lightweight interface",
                "No configuration required",
                "Great for beginners",
              ].map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <ChevronRight size={14} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/codepad"
              className="btn-ghost"
              style={{ borderColor: "rgba(68,136,255,0.3)", color: "var(--accent-blue)" }}
            >
              Open ECodePad <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
