# CodeFun — Next.js Rebuild

A modern rebuild of the EcodeFun app using **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## ✦ Pages

| Route | Page |
|---|---|
| `/` | Home — hero, about, features |
| `/ide` | Choose between ECodePen and ECodePad |
| `/editor` | **ECodePen** — full CodeMirror IDE (HTML / CSS / JS + Run) |
| `/codepad` | **ECodePad** — live-preview textarea scratchpad |
| `/tutorial` | Tutorial videos |
| `/premium` | Premium / Coming Soon |
| `/policy` | Privacy Policy |

## ✦ Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS** — utility-first styling
- **@uiw/react-codemirror** — CodeMirror 6 for the ECodePen editor
- **lucide-react** — icons

## ✦ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## ✦ Project Structure

```
codefun-next/
├── app/
│   ├── layout.tsx            # Root layout (fonts, globals)
│   ├── globals.css           # CSS variables & base styles
│   ├── not-found.tsx         # Custom 404
│   ├── (site)/               # Route group — pages with Navbar + Footer
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Home
│   │   ├── ide/page.tsx
│   │   ├── tutorial/page.tsx
│   │   ├── premium/page.tsx
│   │   └── policy/page.tsx
│   └── (tools)/              # Route group — full-screen editors
│       ├── layout.tsx
│       ├── editor/page.tsx   # ECodePen
│       └── codepad/page.tsx  # ECodePad
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── EditorPane.tsx        # CodeMirror wrapper (client)
└── public/
    └── assets/               # Place your logo, videos, etc. here
```

## ✦ Adding Your Assets

Place your files in the `public/` directory:

```
public/
└── assets/
    ├── logo.png
    ├── favicon.png
    ├── bg.jpg
    ├── Sinchan.mp4       # ECodePen tutorial video
    └── Ananyo.mp4        # ECodePad tutorial video
```

Reference them in code as `/assets/logo.png` (Next.js serves `public/` from root).

## ✦ Updating the Navbar Logo

The logo currently uses a `Code2` icon from lucide-react. To use your own `logo.png`:

```tsx
// In components/Navbar.tsx, replace the icon div with:
import Image from "next/image";
<Image src="/assets/logo.png" width={36} height={36} alt="CodeFun" style={{ borderRadius: "8px" }} />
```

## ✦ Deploy to Firebase Hosting

```bash
npm run build
# Copy the .next/out/ folder (or use next export) to Firebase public dir
firebase deploy
```

Or deploy directly to Vercel:

```bash
npx vercel
```
