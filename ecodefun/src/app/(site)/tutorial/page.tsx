import { Play, Code2, Layers } from "lucide-react";

export const metadata = {
  title: "Tutorial",
};

export default function TutorialPage() {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>Learn</div>
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
            Tutorial Videos
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
            Watch walkthroughs for both editors and get up to speed in minutes.
          </p>
        </div>

        {/* ECodePen Section */}
        <div style={{ marginBottom: "72px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "24px",
              paddingBottom: "20px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "rgba(255,104,53,0.1)",
                border: "1px solid rgba(255,104,53,0.2)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Code2 size={20} color="var(--accent-orange)" />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                ECodePen
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "2px" }}>
                Full-featured CodeMirror IDE walkthrough
              </p>
            </div>
          </div>

          {/* Video player */}
          <div
            style={{
              position: "relative",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "16/9",
            }}
          >
            <video
              controls
              style={{ width: "100%", height: "100%", display: "block" }}
              poster=""
            >
              <source src="/assets/Sinchan.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "14px", lineHeight: 1.7 }}>
            ECodePen is a product of OpenSource — a game-making company
            specialising in pure HTML, CSS, and JavaScript experiences. This
            video walks you through every feature of the editor from scratch.
          </p>
        </div>

        {/* ECodePad Section */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "24px",
              paddingBottom: "20px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "rgba(68,136,255,0.1)",
                border: "1px solid rgba(68,136,255,0.2)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Layers size={20} color="var(--accent-blue)" />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                ECodePad
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "2px" }}>
                Minimal scratchpad walkthrough
              </p>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "16/9",
            }}
          >
            <video
              controls
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <source src="/assets/Ananyo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "14px", lineHeight: 1.7 }}>
            ECodePad is a product of Game Splash — a platform for indie game
            hosting and discovery. This video covers the live-preview scratchpad
            and how to get the most out of its minimal interface.
          </p>
        </div>

        {/* Tip box */}
        <div
          style={{
            marginTop: "60px",
            background: "rgba(255,104,53,0.06)",
            border: "1px solid rgba(255,104,53,0.18)",
            borderRadius: "12px",
            padding: "24px 28px",
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <Play size={18} color="var(--accent-orange)" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <p
              style={{
                fontWeight: 600,
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                marginBottom: "4px",
              }}
            >
              Pro tip
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.7 }}>
              Place your video files at{" "}
              <code
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  background: "rgba(255,255,255,0.07)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                }}
              >
                /public/assets/
              </code>{" "}
              and update the <code style={{ fontFamily: "var(--font-jetbrains)", background: "rgba(255,255,255,0.07)", padding: "1px 6px", borderRadius: "4px", fontSize: "0.8rem" }}>src</code> paths above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
