"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Code2,
  Play,
  ArrowLeft,
  RotateCcw,
  Download,
  Copy,
  Check,
  Terminal,
  Minus,
  Plus,
  X,
  Trash2,
  Zap,
} from "lucide-react";

const EditorPane = dynamic(() => import("@/components/EditorPane"), {
  ssr: false,
});

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────
const STORAGE_KEY = "ecodepen_editor_state";

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <h1>Hello, ECodePen! 👋</h1>
  <p>Edit the panels. <strong>Auto</strong> re-runs on every keystroke.</p>
  <button id="btn">Click Me</button>
</body>
</html>`;

const DEFAULT_CSS = `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #06060d;
  color: #f0f0f8;
  gap: 16px;
}

h1 {
  font-size: 2.4rem;
  background: linear-gradient(135deg, #ff6835, #ff9f1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p { color: #888aaa; font-size: 0.95rem; }

button {
  padding: 10px 28px;
  background: #ff6835;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.15s, filter 0.15s;
}
button:hover { transform: translateY(-2px); filter: brightness(1.15); }`;

const DEFAULT_JS = `const btn = document.getElementById('btn');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  btn.textContent = \`Clicked \${count} time\${count !== 1 ? 's' : ''}!\`;
  console.log('Button clicked:', count);
});

console.log('%c ECodePen ready! 🚀', 'color:#ff6835;font-weight:bold');`;

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
type ConsoleEntry = {
  id: number;
  type: "log" | "info" | "warn" | "error" | "debug";
  args: string[];
  time: string;
};

type PanelId = "html" | "css" | "javascript";

// ─────────────────────────────────────────────────────────
// Build sandboxed srcdoc HTML
//
// KEY FIX: Instead of document.write() which reuses the same
// browsing context (causing "already declared" errors for
// `const`/`let` on re-runs), we set srcdoc on a KEYED iframe.
// React unmounts+remounts the iframe on each run (via `key`),
// giving user code a completely fresh JS VM with no variable
// bleed between runs.
// ─────────────────────────────────────────────────────────
function buildSrcdoc(html: string, css: string, js: string): string {
  // Console capture bridge — posts messages to the parent window
  const bridge = `<script>(function(){
    var _send=function(t,a){try{parent.postMessage({__ecp:1,t:t,a:a},'*')}catch(e){}};
    var _fmt=function(x){
      if(x===undefined)return'undefined';
      if(x===null)return'null';
      try{return typeof x==='object'?JSON.stringify(x,null,2):String(x)}catch(e){return'[Circular]'}
    };
    ['log','info','warn','error','debug'].forEach(function(m){
      var o=console[m];
      console[m]=function(){
        var a=Array.from(arguments).map(_fmt);
        _send(m,a);
        try{o&&o.apply(console,arguments)}catch(e){}
      };
    });
    console.clear=function(){_send('clear',[])};
    window.onerror=function(msg,_src,line,_col,err){
      _send('error',[String(err&&err.message||msg)+(line?' (line '+line+')':'')]);
      return false;
    };
    window.addEventListener('unhandledrejection',function(e){
      _send('error',['Unhandled Promise: '+String(e.reason&&e.reason.message||e.reason)]);
    });
  })();<\/script>`;

  // Escape </script> in user JS to prevent premature tag close
  const safeJs = js.replace(/<\/script>/gi, "<\\/script>");
  const isFullDoc = /^\s*<!doctype\s|^\s*<html[\s>]/i.test(html);

  if (isFullDoc) {
    let out = html;
    // Inject bridge right after <head> (or prepend if no <head>)
    out = /<head[^>]*>/i.test(out)
      ? out.replace(/(<head[^>]*>)/i, `$1${bridge}`)
      : bridge + out;
    // Inject CSS before </head>
    out = /<\/head>/i.test(out)
      ? out.replace(/<\/head>/i, `<style>${css}</style></head>`)
      : `<style>${css}</style>` + out;
    // Inject user JS before </body>
    out = /<\/body>/i.test(out)
      ? out.replace(/<\/body>/i, `<script>${safeJs}<\/script></body>`)
      : out + `<script>${safeJs}<\/script>`;
    return out;
  }

  // Partial HTML fragment
  return `${bridge}<style>${css}</style>${html}<script>${safeJs}<\/script>`;
}

// ─────────────────────────────────────────────────────────
// Shared toolbar button style
// ─────────────────────────────────────────────────────────
const tbBtn: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "28px",
  padding: "0 9px",
  gap: "5px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "5px",
  cursor: "pointer",
  color: "#7a7a9a",
  fontFamily: "var(--font-jetbrains)",
  fontSize: "0.63rem",
  letterSpacing: "0.04em",
  flexShrink: 0,
  transition: "color 0.15s, border-color 0.15s, background 0.15s",
  whiteSpace: "nowrap",
};

const tbSep: React.CSSProperties = {
  width: "1px",
  height: "18px",
  background: "rgba(255,255,255,0.06)",
  flexShrink: 0,
};

const consoleColor: Record<ConsoleEntry["type"], string> = {
  log: "#d4d4e8",
  info: "#4488ff",
  warn: "#ffd700",
  error: "#ff4444",
  debug: "#888aaa",
};

const consoleLabel: Record<ConsoleEntry["type"], string> = {
  log: "LOG",
  info: "INF",
  warn: "WRN",
  error: "ERR",
  debug: "DBG",
};

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
export default function EditorPage() {
  // ── Code state (lazy-initialized from URL hash → localStorage → defaults)
  const [html, setHtml] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_HTML;
    try {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("code=")) {
        const d = JSON.parse(decodeURIComponent(escape(atob(hash.slice(5)))));
        if (d.h !== undefined) return d.h;
      }
    } catch {}
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) { const d = JSON.parse(s); if (d.h) return d.h; }
    } catch {}
    return DEFAULT_HTML;
  });

  const [css, setCss] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_CSS;
    try {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("code=")) {
        const d = JSON.parse(decodeURIComponent(escape(atob(hash.slice(5)))));
        if (d.c !== undefined) return d.c;
      }
    } catch {}
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) { const d = JSON.parse(s); if (d.c) return d.c; }
    } catch {}
    return DEFAULT_CSS;
  });

  const [js, setJs] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_JS;
    try {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("code=")) {
        const d = JSON.parse(decodeURIComponent(escape(atob(hash.slice(5)))));
        if (d.j !== undefined) return d.j;
      }
    } catch {}
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) { const d = JSON.parse(s); if (d.j) return d.j; }
    } catch {}
    return DEFAULT_JS;
  });

  // ── Editor settings
  const [autoRun, setAutoRun] = useState(true);
  const [fontSize, setFontSize] = useState(13);
  const [wordWrap, setWordWrap] = useState(false);

  // ── Panel expand state
  const [expandedPanel, setExpandedPanel] = useState<PanelId | null>(null);

  // ── Preview state
  const [isRunning, setIsRunning] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // KEY FIX: iframeKey is bumped on each run.
  // React re-mounts the <iframe> with a new key, which creates a
  // completely fresh browsing context (new JS VM, new document).
  // This is what eliminates "Identifier already declared" errors —
  // const/let/var from a previous run never exist in the new context.
  const [iframeKey, setIframeKey] = useState(0);
  const [srcdoc, setSrcdoc] = useState("");

  // ── Console
  const [logs, setLogs] = useState<ConsoleEntry[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const logId = useRef(0);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // ── Share copy feedback
  const [copied, setCopied] = useState(false);

  // ── Reset confirmation modal
  const [showResetModal, setShowResetModal] = useState(false);

  // ── Drag-to-resize split
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const [splitPct, setSplitPct] = useState(42);
  const dragging = useRef(false);

  // ─── Auto-save to localStorage ───────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ h: html, c: css, j: js }));
      } catch {}
    }, 1200);
    return () => clearTimeout(t);
  }, [html, css, js]);

  // ─── Core run function ────────────────────────────────
  // Sets srcdoc + increments iframeKey so React remounts the iframe,
  // giving user code a clean VM. No document.write() needed.
  const runCode = useCallback(() => {
    setIsRunning(true);
    setLogs([]);
    setSrcdoc(buildSrcdoc(html, css, js));
    setIframeKey((k) => k + 1);
    setTimeout(() => setIsRunning(false), 250);
  }, [html, css, js]);

  // ─── Debounced auto-run ───────────────────────────────
  useEffect(() => {
    if (!autoRun) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(runCode, 480);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [html, css, js, autoRun, runCode]);

  // ─── First-paint run ─────────────────────────────────
  useEffect(() => {
    runCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── F5 keyboard shortcut ─────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "F5") { e.preventDefault(); runCode(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [runCode]);

  // ─── Console message receiver ─────────────────────────
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data?.__ecp) return;
      const { t, a } = e.data as { t: string; a: string[] };
      if (t === "clear") { setLogs([]); return; }
      const now = new Date();
      const time = now.toLocaleTimeString("en", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      });
      const entry: ConsoleEntry = {
        id: ++logId.current,
        type: t as ConsoleEntry["type"],
        args: a,
        time,
      };
      setLogs((prev) => [...prev.slice(-299), entry]);
      if (t === "error") setConsoleOpen(true);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // ─── Auto-scroll console to bottom ───────────────────
  useEffect(() => {
    if (consoleOpen && logs.length > 0) {
      consoleBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, consoleOpen]);

  // ─── Drag-resize event listeners ─────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPct(Math.max(18, Math.min(78, pct)));
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  // ─── Download as standalone HTML ─────────────────────
  const handleDownload = useCallback(() => {
    // Download uses buildSrcdoc without the console bridge
    const safeJs = js.replace(/<\/script>/gi, "<\\/script>");
    const isFullDoc = /^\s*<!doctype\s|^\s*<html[\s>]/i.test(html);
    let content: string;
    if (isFullDoc) {
      content = html
        .replace(/<\/head>/i, `<style>${css}</style></head>`)
        .replace(/<\/body>/i, `<script>${safeJs}<\/script></body>`);
    } else {
      content = `<style>${css}</style>${html}<script>${safeJs}<\/script>`;
    }
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ecodepen.html";
    a.click();
    URL.revokeObjectURL(url);
  }, [html, css, js]);

  // ─── Copy shareable URL ───────────────────────────────
  const handleShare = useCallback(() => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ h: html, c: css, j: js }))));
      const url = `${window.location.origin}/editor#code=${encoded}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    } catch {}
  }, [html, css, js]);

  // ─── Reset to defaults ────────────────────────────────
  const handleReset = useCallback(() => setShowResetModal(true), []);

  const confirmReset = useCallback(() => {
    setShowResetModal(false);
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    history.replaceState(null, "", window.location.pathname);
  }, []);

  // ─── Toggle panel expand/collapse ────────────────────
  const togglePanel = useCallback((panel: PanelId) => {
    setExpandedPanel((prev) => (prev === panel ? null : panel));
  }, []);

  const errCount = logs.filter((l) => l.type === "error").length;
  const warnCount = logs.filter((l) => l.type === "warn").length;
  const consoleBadgeColor = errCount > 0 ? "#ff4444" : warnCount > 0 ? "#ffd700" : "#4488ff";

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
      {/* ══════════════════════════════════════════════════
          TOOLBAR
      ══════════════════════════════════════════════════ */}
      <div
        style={{
          height: "46px",
          background: "#0c0c18",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: "5px",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Link
          href="/ide"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            textDecoration: "none",
            marginRight: "6px",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={12} color="#666688" />
          <div
            style={{
              width: "24px",
              height: "24px",
              background: "var(--accent-orange)",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code2 size={13} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#d0d0e8",
              letterSpacing: "0.04em",
            }}
          >
            ECodePen
          </span>
        </Link>

        <div style={tbSep} />

        {/* Auto-run toggle */}
        <button
          onClick={() => setAutoRun((a) => !a)}
          style={{
            ...tbBtn,
            background: autoRun ? "rgba(255,104,53,0.1)" : "transparent",
            borderColor: autoRun ? "rgba(255,104,53,0.32)" : "rgba(255,255,255,0.08)",
            color: autoRun ? "var(--accent-orange)" : "#7a7a9a",
          }}
          title={`Auto-run is ${autoRun ? "ON" : "OFF"} — click to toggle`}
        >
          <Zap size={11} fill={autoRun ? "var(--accent-orange)" : "none"} style={{ transition: "fill 0.15s" }} />
          Auto
        </button>

        {/* Run button */}
        <button
          onClick={runCode}
          style={{
            ...tbBtn,
            background: "var(--accent-orange)",
            border: "none",
            color: "#fff",
            padding: "0 14px",
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
          title="Run code (F5)"
        >
          <Play size={11} fill="#fff" />
          Run
        </button>

        {/* Running pulse */}
        {isRunning && (
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--accent-orange)",
              flexShrink: 0,
              animation: "pulse2 1s ease-in-out infinite",
            }}
          />
        )}

        <div style={tbSep} />

        {/* Font size */}
        <button onClick={() => setFontSize((f) => Math.max(10, f - 1))} style={tbBtn} title="Decrease font size">
          <Minus size={11} />
        </button>
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.6rem",
            color: "#5a5a7a",
            minWidth: "22px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {fontSize}
        </span>
        <button onClick={() => setFontSize((f) => Math.min(22, f + 1))} style={tbBtn} title="Increase font size">
          <Plus size={11} />
        </button>

        {/* Word wrap */}
        <button
          onClick={() => setWordWrap((w) => !w)}
          style={{
            ...tbBtn,
            background: wordWrap ? "rgba(68,136,255,0.1)" : "transparent",
            borderColor: wordWrap ? "rgba(68,136,255,0.3)" : "rgba(255,255,255,0.08)",
            color: wordWrap ? "var(--accent-blue)" : "#7a7a9a",
          }}
          title={`Word wrap: ${wordWrap ? "ON" : "OFF"}`}
        >
          <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>↵</span>
          Wrap
        </button>

        <div style={{ flex: 1 }} />

        {/* Download */}
        <button
          onClick={handleDownload}
          style={tbBtn}
          title="Download as standalone HTML"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#d0d0e8";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#7a7a9a";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <Download size={11} />
          Export
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          style={{
            ...tbBtn,
            color: copied ? "var(--accent-green)" : "#7a7a9a",
            borderColor: copied ? "rgba(0,217,163,0.35)" : "rgba(255,255,255,0.08)",
            background: copied ? "rgba(0,217,163,0.07)" : "transparent",
          }}
          title="Copy shareable URL to clipboard"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : "Share"}
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          style={tbBtn}
          title="Reset to defaults"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#ff4444";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,68,68,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#7a7a9a";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <RotateCcw size={11} />
        </button>

        <div style={tbSep} />

        {/* Console toggle */}
        <button
          onClick={() => setConsoleOpen((o) => !o)}
          style={{
            ...tbBtn,
            background: consoleOpen ? "rgba(68,136,255,0.1)" : "transparent",
            borderColor: consoleOpen ? "rgba(68,136,255,0.28)" : "rgba(255,255,255,0.08)",
            color: errCount > 0 ? "#ff4444" : warnCount > 0 ? "#ffd700" : consoleOpen ? "var(--accent-blue)" : "#7a7a9a",
          }}
          title="Toggle Console"
        >
          <Terminal size={11} />
          Console
          {logs.length > 0 && (
            <span
              style={{
                background: consoleBadgeColor,
                color: "#fff",
                borderRadius: "999px",
                padding: "0 4px",
                fontSize: "0.52rem",
                minWidth: "14px",
                height: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              {logs.length > 99 ? "99+" : logs.length}
            </span>
          )}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════ */}
      <div ref={splitContainerRef} style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* ── Left: Editor panels ── */}
        <div
          style={{
            width: `${splitPct}%`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <EditorPane
            lang="html"
            label="HTML"
            value={html}
            onChange={setHtml}
            accentColor="var(--accent-orange)"
            fontSize={fontSize}
            wordWrap={wordWrap}
            isExpanded={expandedPanel === "html"}
            isCollapsed={expandedPanel !== null && expandedPanel !== "html"}
            onToggleExpand={() => togglePanel("html")}
          />
          <EditorPane
            lang="css"
            label="CSS"
            value={css}
            onChange={setCss}
            accentColor="var(--accent-blue)"
            fontSize={fontSize}
            wordWrap={wordWrap}
            isExpanded={expandedPanel === "css"}
            isCollapsed={expandedPanel !== null && expandedPanel !== "css"}
            onToggleExpand={() => togglePanel("css")}
          />
          <EditorPane
            lang="javascript"
            label="JavaScript"
            value={js}
            onChange={setJs}
            accentColor="var(--accent-yellow)"
            fontSize={fontSize}
            wordWrap={wordWrap}
            isExpanded={expandedPanel === "javascript"}
            isCollapsed={expandedPanel !== null && expandedPanel !== "javascript"}
            onToggleExpand={() => togglePanel("javascript")}
          />
        </div>

        {/* ── Drag handle ── */}
        <div
          onMouseDown={() => {
            dragging.current = true;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
          }}
          style={{
            width: "5px",
            background: "rgba(255,255,255,0.03)",
            cursor: "col-resize",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,104,53,0.45)";
          }}
          onMouseLeave={(e) => {
            if (!dragging.current)
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
          }}
        />

        {/* ── Right: Preview + Console ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Preview mini-bar */}
          <div
            style={{
              height: "27px",
              background: "rgba(0,0,0,0.5)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00d9a3",
                ...(autoRun ? { animation: "pulse2 3s ease-in-out infinite" } : {}),
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.1em",
              }}
            >
              PREVIEW
            </span>
            <div style={{ flex: 1 }} />
            {autoRun && (
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.56rem",
                  color: "rgba(255,104,53,0.55)",
                  letterSpacing: "0.1em",
                }}
              >
                LIVE
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.56rem",
                color: "rgba(255,255,255,0.12)",
                letterSpacing: "0.06em",
              }}
            >
              F5 to run
            </span>
          </div>

          {/* ── Sandboxed iframe ──────────────────────────────────────
              key={iframeKey} forces React to unmount+remount the element
              on every run, creating a new browsing context with a fresh
              JS VM. srcdoc delivers the HTML without document.write().
              sandbox="allow-scripts" isolates user code from the host page.
          ────────────────────────────────────────────────────────── */}
          <div style={{ flex: 1, background: "#ffffff", overflow: "hidden" }}>
            <iframe
              key={iframeKey}
              title="Preview"
              srcDoc={srcdoc}
              sandbox="allow-scripts"
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>

          {/* ── Console Panel ── */}
          {consoleOpen && (
            <div
              style={{
                height: "210px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                background: "#07070f",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
              }}
            >
              {/* Console header */}
              <div
                style={{
                  height: "30px",
                  background: "rgba(0,0,0,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <Terminal size={11} color="#4488ff" />
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.6rem",
                    color: "#4488ff",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Console
                </span>

                {errCount > 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.57rem",
                      color: "#ff4444",
                      background: "rgba(255,68,68,0.1)",
                      padding: "1px 6px",
                      borderRadius: "3px",
                    }}
                  >
                    {errCount} error{errCount !== 1 ? "s" : ""}
                  </span>
                )}
                {warnCount > 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.57rem",
                      color: "#ffd700",
                      background: "rgba(255,215,0,0.08)",
                      padding: "1px 6px",
                      borderRadius: "3px",
                    }}
                  >
                    {warnCount} warn{warnCount !== 1 ? "s" : ""}
                  </span>
                )}

                <div style={{ flex: 1 }} />

                <button
                  onClick={() => setLogs([])}
                  title="Clear console"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.22)",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.22)"; }}
                >
                  <Trash2 size={10} />
                </button>

                <button
                  onClick={() => setConsoleOpen(false)}
                  title="Close console"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.22)",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.22)"; }}
                >
                  <X size={10} />
                </button>
              </div>

              {/* Log entries */}
              <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                {logs.length === 0 ? (
                  <div
                    style={{
                      padding: "10px 12px",
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.18)",
                      fontStyle: "italic",
                    }}
                  >
                    No output yet. Try{" "}
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>console.log()</span> in your JS.
                  </div>
                ) : (
                  logs.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "3px 10px",
                        gap: "8px",
                        borderBottom: "1px solid rgba(255,255,255,0.025)",
                        background:
                          entry.type === "error"
                            ? "rgba(255,68,68,0.04)"
                            : entry.type === "warn"
                            ? "rgba(255,215,0,0.025)"
                            : "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          color: consoleColor[entry.type],
                          opacity: 0.7,
                          flexShrink: 0,
                          minWidth: "26px",
                          paddingTop: "2px",
                        }}
                      >
                        {consoleLabel[entry.type]}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "11.5px",
                          color: consoleColor[entry.type],
                          flex: 1,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-all",
                          lineHeight: 1.55,
                        }}
                      >
                        {entry.args.join(" ")}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.13)",
                          flexShrink: 0,
                          paddingTop: "2px",
                        }}
                      >
                        {entry.time}
                      </span>
                    </div>
                  ))
                )}
                <div ref={consoleBottomRef} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Reset confirmation modal ── */}
      {showResetModal && (
        <div
          onClick={() => setShowResetModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#13131f",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "24px 28px",
              width: "360px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            }}
          >
            {/* Icon + title row */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(255,68,68,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <RotateCcw size={15} color="#ff4444" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#e8e8f0",
                  letterSpacing: "0.02em",
                }}
              >
                Reset to defaults?
              </span>
            </div>

            {/* Body */}
            <p
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              All three panels will be replaced with the starter code.
              <br />
              <span style={{ color: "#ff6644" }}>Your current code will be lost.</span>
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "4px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowResetModal(false)}
                style={{
                  ...tbBtn,
                  height: "32px",
                  padding: "0 16px",
                  fontSize: "0.68rem",
                  color: "#9a9ab8",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#d0d0e8";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#9a9ab8";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                style={{
                  ...tbBtn,
                  height: "32px",
                  padding: "0 16px",
                  fontSize: "0.68rem",
                  background: "rgba(255,68,68,0.15)",
                  borderColor: "rgba(255,68,68,0.35)",
                  color: "#ff5555",
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,68,68,0.25)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,68,68,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,68,68,0.15)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,68,68,0.35)";
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}