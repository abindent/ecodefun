export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "var(--bg-base)" }}>
      {children}
    </div>
  );
}
