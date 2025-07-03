import React, { useState } from "react";
import { Helmet } from "react-helmet";

function Contact() {
  const [hovered, setHovered] = useState({});

  return (
    <>
      <Helmet>
        <title>İletişim | Modern Blog</title>
        <meta name="description" content="İletişim formu, profesyonel destek ve işbirliği için bana ulaşın." />
      </Helmet>
      <div style={{
        background: "#f7f6f5",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 0"
      }}>
        <div style={{
          display: "flex",
          maxWidth: "1600px",
          width: "100%",
          gap: "80px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {/* Sol Kısım */}
          <div style={{ flex: 1.2, textAlign: "center", position: "relative", minWidth: 240 }}>
            {/* Renkli animasyonlu daire */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 40,
              transform: "translateX(-50%)",
              width: 180,
              height: 180,
              background: "linear-gradient(135deg, #FFD600 60%, #7F7FD5 100%)",
              borderRadius: "50%",
              zIndex: 0,
              filter: "blur(4px)",
              animation: "spin 8s linear infinite"
            }} />
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
              alt="profil"
              style={{ width: "60vw", maxWidth: 220, borderRadius: "16px", marginBottom: 24, position: "relative", zIndex: 1, boxShadow: "0 8px 32px rgba(127,127,213,0.12)" }}
            />
            <div style={{ fontSize: 20, marginTop: 12, position: "relative", zIndex: 1, color: "#444", fontWeight: 500 }}>
              When not shooting, I'm busy being a cat-dad to Churo.
            </div>
          </div>
          {/* Sağ Kısım */}
          <div style={{ flex: 2, minWidth: 220 }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: 12, color: "#222", letterSpacing: -1 }}>
              connect with me
            </h1>
            <div style={{
              width: 40,
              height: 3,
              background: "#FFD600",
              marginBottom: 18,
              borderRadius: 2
            }} />
            <div style={{ fontSize: 16, marginBottom: 24, color: "#333", lineHeight: 1.5 }}>
              Let's talk about your plans as a brand, agency, or artist and how best we could work together. I'm based in Mumbai, but my services are available PAN India.<br /><br />
              If you also need some creative concepts or digital branding services like a website, feel free to reach out to me with your requirements.
            </div>
            {/* Animasyonlu Form */}
            <form style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              padding: 18,
              maxWidth: "98vw",
              margin: "0 auto"
            }}>
              <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                <input
                  type="text"
                  placeholder="Name"
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    border: hovered.name ? "2px solid #FFD600" : "2px solid #eee",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    transition: "border 0.3s"
                  }}
                  onFocus={() => setHovered(h => ({ ...h, name: true }))}
                  onBlur={() => setHovered(h => ({ ...h, name: false }))}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    border: hovered.email ? "2px solid #FFD600" : "2px solid #eee",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    transition: "border 0.3s"
                  }}
                  onFocus={() => setHovered(h => ({ ...h, email: true }))}
                  onBlur={() => setHovered(h => ({ ...h, email: false }))}
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                style={{
                  padding: "10px 12px",
                  border: hovered.message ? "2px solid #FFD600" : "2px solid #eee",
                  borderRadius: 8,
                  fontSize: 16,
                  outline: "none",
                  transition: "border 0.3s"
                }}
                onFocus={() => setHovered(h => ({ ...h, message: true }))}
                onBlur={() => setHovered(h => ({ ...h, message: false }))}
              />
              <button
                type="submit"
                style={{
                  marginTop: 8,
                  alignSelf: "flex-end",
                  background: "linear-gradient(90deg, #FFD600 60%, #7F7FD5 100%)",
                  color: "#222",
                  fontWeight: "bold",
                  fontSize: 16,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
                  letterSpacing: 1,
                  transition: "background 0.3s, color 0.3s"
                }}
                onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #7F7FD5 60%, #FFD600 100%)"}
                onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #FFD600 60%, #7F7FD5 100%)"}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
        {/* Animasyon için keyframes ve media query */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 700px) {
            div[style*='display: flex'][style*='max-width'] {
              flex-direction: column !important;
              gap: 24px !important;
              align-items: center !important;
            }
            div[style*='flex: 1.2'] img {
              width: 90vw !important;
              max-width: 160px !important;
            }
            div[style*='flex: 2'] form {
              max-width: 98vw !important;
              padding: 10px !important;
            }
            h1 {
              font-size: 1.2rem !important;
            }
            div[style*='font-size: 28'] {
              font-size: 1rem !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default Contact; 