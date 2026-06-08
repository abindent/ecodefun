import Link from "next/link";
import { ArrowRight, Code2, Layers, Zap, Globe, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg-base)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "80px 24px",
        }}
      >
        {/* Dot grid */}
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

        {/* Orange glow top-right */}
        <div
          className="glow-blob"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,104,53,0.18) 0%, transparent 70%)",
            top: "-100px",
            right: "-200px",
          }}
        />
        {/* Blue glow bottom-left */}
        <div
          className="glow-blob"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(68,136,255,0.12) 0%, transparent 70%)",
            bottom: "0px",
            left: "-100px",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            maxWidth: "760px",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <div className="tag" style={{ marginBottom: "28px", display: "inline-flex" }}>
            <Zap size={11} />
            Open Source · Free Forever
          </div>

          <h1
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "24px",
            }}
          >
            Code in the browser.{" "}
            <span style={{ color: "var(--accent-orange)" }}>Instantly.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}
          >
            ECodePen and ECodePad are open-source in-browser editors for HTML,
            CSS, and JavaScript. Write code, see results in real time — no setup
            needed.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/ide" className="btn-primary">
              Launch IDE <ArrowRight size={16} />
            </Link>
            <Link href="/tutorial" className="btn-ghost">
              Watch Tutorial
            </Link>
          </div>

          {/* Mini stats */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              marginTop: "56px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "2", label: "IDEs" },
              { value: "100%", label: "Free" },
              { value: "3", label: "Languages" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section
        id="about"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>
            Our Products
          </div>
          <h2
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Two editors, one mission
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "12px",
              fontSize: "1rem",
              maxWidth: "480px",
              margin: "12px auto 0",
            }}
          >
            Pick the editor that fits your workflow — from a minimal scratchpad
            to a full-featured IDE.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* ECodePen Card */}
          <div className="card" style={{ padding: "40px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                background: "rgba(255,104,53,0.12)",
                border: "1px solid rgba(255,104,53,0.25)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <Code2 size={26} color="var(--accent-orange)" />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}
            >
              ECodePen
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                marginBottom: "28px",
              }}
            >
              A full-featured CodeMirror-powered IDE with syntax highlighting,
              line numbers, and a real-time preview. Built for serious web
              development right in your browser.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {["Syntax highlighting", "Line numbers & tab support", "Real-time preview"].map(
                (f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <ChevronRight size={14} color="var(--accent-orange)" />
                    {f}
                  </li>
                )
              )}
            </ul>
            <Link href="/editor" className="btn-primary" style={{ fontSize: "0.85rem", padding: "10px 22px" }}>
              Open ECodePen <ArrowRight size={14} />
            </Link>
          </div>

          {/* ECodePad Card */}
          <div className="card" style={{ padding: "40px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                background: "rgba(68,136,255,0.12)",
                border: "1px solid rgba(68,136,255,0.25)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <Layers size={26} color="var(--accent-blue)" />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}
            >
              ECodePad
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                marginBottom: "28px",
              }}
            >
              A lightweight scratchpad with instant live preview. No overhead,
              no distractions — just type your HTML, CSS, and JS and watch it
              come to life immediately.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {["Instant live preview", "Minimal & distraction-free", "Beginner friendly"].map(
                (f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <ChevronRight size={14} color="var(--accent-blue)" />
                    {f}
                  </li>
                )
              )}
            </ul>
            <Link href="/codepad" className="btn-ghost" style={{ fontSize: "0.85rem", padding: "10px 22px" }}>
              Open ECodePad <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-surface)",
          padding: "64px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
          }}
        >
          {[
            {
              icon: <Zap size={22} color="var(--accent-orange)" />,
              title: "Instant Preview",
              desc: "See your code render live with zero delay.",
            },
            {
              icon: <Globe size={22} color="var(--accent-blue)" />,
              title: "No Install Needed",
              desc: "Runs entirely in the browser. Open and code.",
            },
            {
              icon: <Code2 size={22} color="var(--accent-green)" />,
              title: "HTML · CSS · JS",
              desc: "Full support for the three pillars of the web.",
            },
            {
              icon: <Layers size={22} color="var(--accent-yellow)" />,
              title: "Two Editors",
              desc: "A powerful IDE and a minimal scratchpad.",
            },
          ].map((feat) => (
            <div key={feat.title}>
              <div style={{ marginBottom: "14px" }}>{feat.icon}</div>
              <h4
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}
              >
                {feat.title}
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div
          className="glow-blob"
          style={{
            width: "500px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(255,104,53,0.14) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Ready to build something?
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "1rem" }}>
            Pick an editor and start coding — no login, no setup.
          </p>
          <Link href="/ide" className="btn-primary">
            Choose Your IDE <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
