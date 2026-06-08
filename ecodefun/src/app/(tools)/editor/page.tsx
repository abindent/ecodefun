"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Code2, Play, ArrowLeft, RefreshCw } from "lucide-react";

// SSR-safe dynamic import for CodeMirror
const EditorPane = dynamic(() => import("@/components/EditorPane"), { ssr: false });

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello, CodeFun! 👋</h1>
  <p>Edit the HTML, CSS, and JS panels then click <strong>Run</strong>.</p>
</body>
</html>`;

const DEFAULT_CSS = `body {
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  background: #06060d;
  color: #f0f0f8;
}

h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #ff6835, #ff9f1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`;

const DEFAULT_JS = `// Your JavaScript here
console.log("CodeFun ECodePen loaded!");`;

export default function EditorPage() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [ran, setRan] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = useCallback(() => {
    const frame = iframeRef.current?.contentWindow?.document;
    if (!frame) return;
    const output = `${html}<style>${css}</style><script>${js}<\/script>`;
    frame.open();
    frame.write(output);
    frame.close();
    setRan(true);
  }, [html, css, js]);

  // Run on first mount with defaults
  useEffect(() => {
    runCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a12",
        overflow: "hidden",
      }}
    >
      {/* ── Toolbar ── */}
      <div
        style={{
          height: "48px",
          background: "#0d0d1a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <Link
          href="/ide"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            marginRight: "8px",
          }}
        >
          <ArrowLeft size={14} color="#888aaa" />
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "var(--accent-orange)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code2 size={15} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#f0f0f8",
              letterSpacing: "0.04em",
            }}
          >
            ECodePen
          </span>
        </Link>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Run button */}
        <button
          onClick={runCode}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "7px 18px",
            background: "var(--accent-orange)",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "filter 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1.12)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(1)")}
        >
          <Play size={12} fill="#fff" />
          Run
        </button>

        <button
          onClick={() => {
            setHtml(DEFAULT_HTML);
            setCss(DEFAULT_CSS);
            setJs(DEFAULT_JS);
          }}
          title="Reset to defaults"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
            cursor: "pointer",
            color: "#888aaa",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#f0f0f8";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#888aaa";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* ── Main split ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left: editors */}
        <div
          style={{
            width: "42%",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <EditorPane
            lang="html"
            label="HTML"
            value={html}
            onChange={setHtml}
            accentColor="var(--accent-orange)"
          />
          <EditorPane
            lang="css"
            label="CSS"
            value={css}
            onChange={setCss}
            accentColor="var(--accent-blue)"
          />
          <EditorPane
            lang="javascript"
            label="JavaScript"
            value={js}
            onChange={setJs}
            accentColor="var(--accent-yellow)"
          />
        </div>

        {/* Right: preview */}
        <div style={{ flex: 1, position: "relative", background: "#fff" }}>
          <iframe
            ref={iframeRef}
            title="Preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
          {!ran && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a0a12",
                color: "#888aaa",
                gap: "12px",
              }}
            >
              <Play size={32} color="#ff6835" />
              <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.8rem" }}>
                Click Run to see your preview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
