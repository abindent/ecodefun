"use client";

import CodeMirror from "@uiw/react-codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { indentWithTab } from "@codemirror/commands";
import { Maximize2, Minimize2 } from "lucide-react";

type Lang = "html" | "css" | "javascript";

export interface EditorPaneProps {
  lang: Lang;
  value: string;
  onChange: (value: string) => void;
  label: string;
  accentColor: string;
  fontSize?: number;
  wordWrap?: boolean;
  isExpanded?: boolean;
  isCollapsed?: boolean;
  onToggleExpand?: () => void;
}

// Build extensions per language (memo-stable references)
const langExtensions = {
  html: [html({ autoCloseTags: true, matchClosingTags: true })],
  css: [css()],
  javascript: [javascript({ jsx: false })],
};

export default function EditorPane({
  lang,
  value,
  onChange,
  label,
  accentColor,
  fontSize = 13,
  wordWrap = false,
  isExpanded = false,
  isCollapsed = false,
  onToggleExpand,
}: EditorPaneProps) {
  const extensions = [
    ...langExtensions[lang],
    // Tab key → smart indent (like VS Code)
    keymap.of([indentWithTab]),
    ...(wordWrap ? [EditorView.lineWrapping] : []),
  ];

  const lineCount = value.split("\n").length;
  const charCount = value.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // Collapsed: just header row. Normal/expanded: take available flex space
        flex: isCollapsed ? "0 0 27px" : "1 1 0",
        minHeight: 0,
        borderBottom: "1px solid rgba(255,255,255,0.055)",
        overflow: "hidden",
      }}
    >
      {/* ── Panel header ── */}
      <div
        style={{
          height: "27px",
          padding: "0 10px",
          background: "rgba(0,0,0,0.5)",
          borderBottom: isCollapsed ? "none" : `2px solid ${accentColor}`,
          borderLeft: isCollapsed ? `3px solid ${accentColor}` : "none",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          flexShrink: 0,
          cursor: isCollapsed ? "pointer" : "default",
          userSelect: "none",
          transition: "background 0.15s",
        }}
        onClick={isCollapsed ? onToggleExpand : undefined}
        title={isCollapsed ? `Expand ${label}` : undefined}
        onMouseEnter={(e) => {
          if (isCollapsed)
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255,255,255,0.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)";
        }}
      >
        {/* Language dot */}
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: accentColor,
            flexShrink: 0,
          }}
        />

        {/* Language label */}
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.64rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          {label}
        </span>

        {/* Stats (hidden when collapsed) */}
        {!isCollapsed && (
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.57rem",
              color: "rgba(255,255,255,0.17)",
              letterSpacing: "0.02em",
            }}
          >
            {lineCount}L · {charCount}C
          </span>
        )}

        <div style={{ flex: 1 }} />

        {/* Expand/collapse toggle */}
        {onToggleExpand && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            title={
              isExpanded ? "Restore" : isCollapsed ? "Expand" : "Maximize"
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.2)",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.65)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.2)";
            }}
          >
            {isExpanded ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
          </button>
        )}
      </div>

      {/* ── CodeMirror editor (hidden when collapsed) ── */}
      {!isCollapsed && (
        <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
          <CodeMirror
            value={value}
            onChange={onChange}
            extensions={extensions}
            theme={oneDark}
            height="100%"
            style={{ fontSize: `${fontSize}px`, height: "100%" }}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLineGutter: true,
              highlightActiveLine: true,
              // VS Code-style auto-pairing & matching
              closeBrackets: true,
              bracketMatching: true,
              // Smart autocomplete
              autocompletion: true,
              // Multi-cursor & selection
              drawSelection: true,
              allowMultipleSelections: true,
              // Indent on enter
              indentOnInput: true,
              tabSize: 2,
            }}
          />
        </div>
      )}
    </div>
  );
}