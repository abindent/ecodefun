"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Layers, ArrowLeft } from "lucide-react";

export default function CodepadPage() {
  const [html, setHtml] = useState(`<h1>Hello from ECodePad! 👋</h1>\n<p>Start typing and see the live preview update instantly.</p>`);
  const [css, setCss] = useState(`body {\n  font-family: system-ui, sans-serif;\n  padding: 40px;\n  background: #06060d;\n  color: #f0f0f8;\n}\n\nh1 {\n  color: #4488ff;\n}`);
  const [js, setJs] = useState(`// JavaScript runs on every keystroke\nconsole.log("ECodePad ready!");`);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = useCallback(() => {
    const frame = iframeRef.current?.contentWindow?.document;
    if (!frame) return;
    const output = `${html}<style>${css}</style><script>${js}<\/script>`;
    frame.open();
    frame.write(output);
    frame.close();
  }, [html, css, js]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  const textareaBase: React.CSSProperties = {
    width: "100%",
    height: "100%",
    resize: "none",
    border: "none",
    outline: "none",
    padding: "16px",
    fontFamily: "var(--font-jetbrains)",
    fontSize: "13px",
    lineHeight: 1.7,
    background: "#0a0a12",
    caretColor: "#fff",
    tabSize: 4,
  };

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
        <Link
          href="/ide"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={14} color="#888aaa" />
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "var(--accent-blue)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Layers size={15} color="#fff" />
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
            ECodePad
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.65rem",
            color: "#4a4a66",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Live Preview ●
        </span>
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
          {/* HTML */}
          <div
            style={{
              flex: "1 1 33.333%",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                background: "rgba(0,0,0,0.3)",
                borderBottom: "2px solid var(--accent-orange)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-orange)" }} />
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", color: "var(--accent-orange)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                HTML
              </span>
            </div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              style={{ ...textareaBase, color: "#ff6835" }}
              spellCheck={false}
            />
          </div>

          {/* CSS */}
          <div
            style={{
              flex: "1 1 33.333%",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                background: "rgba(0,0,0,0.3)",
                borderBottom: "2px solid var(--accent-blue)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-blue)" }} />
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", color: "var(--accent-blue)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                CSS
              </span>
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              style={{ ...textareaBase, color: "#4488ff" }}
              spellCheck={false}
            />
          </div>

          {/* JS */}
          <div
            style={{
              flex: "1 1 33.333%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                background: "rgba(0,0,0,0.3)",
                borderBottom: "2px solid var(--accent-yellow)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-yellow)" }} />
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", color: "var(--accent-yellow)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                JavaScript
              </span>
            </div>
            <textarea
              value={js}
              onChange={(e) => setJs(e.target.value)}
              style={{ ...textareaBase, color: "#ffd700" }}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Right: preview */}
        <div style={{ flex: 1, background: "#fff" }}>
          <iframe
            ref={iframeRef}
            title="Live Preview"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
