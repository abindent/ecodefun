import Link from "next/link";
import { Code2, Send } from "lucide-react";
import { FaYoutube as Youtube, FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/ide", label: "IDE" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/premium", label: "Premium" },
  { href: "/policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
        padding: "72px 24px 32px",
        marginTop: "80px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--accent-orange)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={20} color="#fff" />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--text-primary)",
                }}
              >
                CodeFun
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: "260px",
              }}
            >
              ECodePen and ECodePad — open-source online editors for HTML, CSS
              and JavaScript. Free forever.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {[
                {
                  icon: <Linkedin size={16} />,
                  href: "https://www.linkedin.com/in/sinchan-maitra-22a303217/",
                },
                { icon: <Github size={16} />, href: "https://github.com/Think-With-Us" },
                { icon: <Youtube size={16} />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s, border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent-orange)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Address column */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent-orange)",
                marginBottom: "16px",
              }}
            >
              Contact
            </h4>
            <address
              style={{
                fontStyle: "normal",
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.9,
              }}
            >
              <p>Sarat Ava, Senpara</p>
              <p>Jalpaiguri, West Bengal</p>
              <p>PIN 735101, India</p>
              <a
                href="mailto:maitrababai2007@gmail.com"
                style={{
                  color: "var(--accent-orange)",
                  textDecoration: "none",
                  display: "block",
                  marginTop: "8px",
                  fontSize: "0.8rem",
                }}
              >
                maitrababai2007@gmail.com
              </a>
              <p style={{ marginTop: "4px", fontSize: "0.85rem" }}>
                +91 98831 05019
              </p>
            </address>
          </div>

          {/* Links column */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent-orange)",
                marginBottom: "16px",
              }}
            >
              Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--text-secondary)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent-orange)",
                marginBottom: "16px",
              }}
            >
              Newsletter
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "16px", lineHeight: 1.6 }}>
              Get updates when new features drop.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                  fontSize: "0.85rem",
                  outline: "none",
                  fontFamily: "var(--font-outfit)",
                }}
              />
              <button
                style={{
                  padding: "10px 14px",
                  background: "var(--accent-orange)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "filter 0.2s",
                }}
              >
                <Send size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.8rem",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            © 2026 OpenSource & Game Splash — All Rights Reserved
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Made with ❤️ in West Bengal, India
          </p>
        </div>
      </div>
    </footer>
  );
}
