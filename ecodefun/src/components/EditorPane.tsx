"use client";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

type Lang = "html" | "css" | "javascript";

interface EditorPaneProps {
  lang: Lang;
  value: string;
  onChange: (value: string) => void;
  label: string;
  accentColor: string;
}

const extensions = {
  html: [html()],
  css: [css()],
  javascript: [javascript()],
};

export default function EditorPane({ lang, value, onChange, label, accentColor }: EditorPaneProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "33.333%",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Tab label */}
      <div
        style={{
          padding: "6px 16px",
          background: "rgba(0,0,0,0.3)",
          borderBottom: `2px solid ${accentColor}`,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: accentColor,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          {label}
        </span>
      </div>

      {/* Editor */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <CodeMirror
          value={value}
          onChange={onChange}
          extensions={extensions[lang]}
          theme={oneDark}
          style={{ height: "100%", fontSize: "13px" }}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLineGutter: true,
            autocompletion: true,
            tabSize: 4,
          }}
        />
      </div>
    </div>
  );
}
