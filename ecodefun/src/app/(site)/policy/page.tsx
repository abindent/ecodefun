import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "Consent",
    content:
      "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
  },
  {
    title: "Information We Collect",
    content:
      "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, and the contents of the message. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.",
  },
  {
    title: "How We Use Your Information",
    items: [
      "Provide, operate, and maintain our website",
      "Improve, personalise, and expand our website",
      "Understand and analyse how you use our website",
      "Develop new products, services, and functionality",
      "Communicate with you for customer service and updates",
      "Send you emails",
      "Find and prevent fraud",
    ],
  },
  {
    title: "Log Files",
    content:
      "CodeFun follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, ISP, date and time stamp, and referring/exit pages. These are not linked to personally identifiable information.",
  },
  {
    title: "Cookies and Web Beacons",
    content:
      "Like any other website, CodeFun uses cookies. These cookies are used to store information including visitors' preferences and the pages on the website that the visitor accessed or visited. The information is used to optimise the users' experience by customising our web page content based on visitors' browser type.",
  },
  {
    title: "Third Party Privacy Policies",
    content:
      "CodeFun's Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective Privacy Policies of these third-party ad servers. You can choose to disable cookies through your individual browser options.",
  },
  {
    title: "CCPA Privacy Rights",
    content:
      "Under the CCPA, California consumers have the right to request that a business disclose the categories of personal data collected, delete any personal data collected, and not sell their personal data. If you make a request, we have one month to respond.",
  },
  {
    title: "GDPR Data Protection Rights",
    content:
      "Every user is entitled to: the right to access, the right to rectification, the right to erasure, the right to restrict processing, the right to object to processing, and the right to data portability. If you make a request, we have one month to respond.",
  },
  {
    title: "Children's Information",
    content:
      "CodeFun does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this kind of information on our website, please contact us immediately.",
  },
];

export default function PolicyPage() {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(255,104,53,0.1)",
                border: "1px solid rgba(255,104,53,0.2)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={22} color="var(--accent-orange)" />
            </div>
            <div className="section-label">Legal</div>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
            At CodeFun, accessible from{" "}
            <a
              href="https://ecodefun.vercel.app/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--accent-orange)", textDecoration: "none" }}
            >
              ecodefun.vercel.app
            </a>
            , one of our main priorities is the privacy of our visitors. This
            document contains the types of information collected and how we use
            it. Last updated: 2026.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {sections.map((section, i) => (
            <div
              key={section.title}
              style={{
                paddingBottom: "40px",
                borderBottom: i < sections.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                }}
              >
                {section.title}
              </h2>
              {section.content && (
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  {section.content}
                </p>
              )}
              {section.items && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {section.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          background: "var(--accent-orange)",
                          borderRadius: "50%",
                          flexShrink: 0,
                          marginTop: "8px",
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "20px" }}>
            Questions about our policy? Contact us at{" "}
            <a
              href="mailto:osc.opensourcecodes+ecodefun@gmail.com"
              style={{ color: "var(--accent-orange)", textDecoration: "none" }}
            >
              ecodefun@gmail.com
            </a>
          </p>
          <Link href="/" className="btn-ghost">
            Back to Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
