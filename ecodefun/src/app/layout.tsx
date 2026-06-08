import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CodeFun — Online HTML/CSS/JS Editor",
    template: "%s | CodeFun",
  },
  description:
    "ECodePen and ECodePad — open-source, in-browser editors for HTML, CSS, and JavaScript. Build and preview instantly.",
  keywords: ["online editor", "HTML editor", "CSS editor", "JavaScript", "CodePen", "IDE"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
