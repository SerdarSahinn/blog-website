import React, { useState } from "react";
import { Helmet } from "react-helmet";

function Home() {
  const [hovered, setHovered] = useState({});
  const [formHover, setFormHover] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  // Son yazılar örnek veri
  const recentPosts = [
    {
      title: "React ile Modern Blog Tasarımı",
      summary: "React ve modern CSS ile şık ve kullanıcı dostu bir blog ana sayfası nasıl yapılır? Adım adım rehber.",
      link: "#"
    },
    {
      title: "Web'de Renk ve Tipografi Seçimi",
      summary: "Web projelerinde doğru renk ve font seçimi için pratik ipuçları ve örnekler.",
      link: "#"
    },
    {
      title: "Kariyer: Yazılımda İlk İşinizi Nasıl Bulursunuz?",
      summary: "Yeni mezunlar ve junior geliştiriciler için iş bulma sürecinde dikkat edilmesi gerekenler.",
      link: "#"
    }
  ];
  return (
    <>
      <Helmet>
        <title>Ana Sayfa | Modern Blog</title>
        <meta name="description" content="Modern, profesyonel ve animasyonlu bir React blog ana sayfası. Son yazılar, iletişim ve daha fazlası." />
      </Helmet>
      <div style={{ width: "100%", background: "#fff" }}>
        {/* Büyük Başlık */}
        <div style={{
          width: "100%",
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "20px"
        }}>
          <h1 style={{
            fontSize: "3.2rem",
            fontWeight: "bold",
            letterSpacing: "2px",
            color: "#222",
            margin: 0,
            background: "linear-gradient(90deg, #FFD600 40%, #7F7FD5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Turning Heads
          </h1>
        </div>
        {/* Slogan */}
        <div style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            color: "#222",
            margin: 0,
            fontFamily: "serif"
          }}>
            My Life. My Blog.
          </h2>
        </div>
        {/* Kısa Hakkımda ve Buton */}
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40
        }}>
          <div style={{
            maxWidth: 600,
            fontSize: 20,
            color: "#444",
            textAlign: "center",
            marginBottom: 18,
            fontWeight: 500
          }}>
            Merhaba! Ben 2025 yılında yeni mezun oldum ve bu blogu hem öğrendiklerimi paylaşmak hem de portföyümde göstermek için hazırladım. Modern web teknolojileriyle projeler geliştirmekten keyif alıyorum. Daha fazlası için aşağıdaki butona tıklayabilirsin!
          </div>
          <a href="/about" style={{
            background: "linear-gradient(90deg, #FFD600 40%, #7F7FD5 100%)",
            color: "#222",
            fontWeight: "bold",
            fontSize: 18,
            border: "none",
            borderRadius: 8,
            padding: "12px 36px",
            textDecoration: "none",
            boxShadow: "0 4px 16px #FFD60033",
            letterSpacing: 1,
            transition: "background 0.3s, color 0.3s"
          }}
          onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #7F7FD5 40%, #FFD600 100%)"}
          onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #FFD600 40%, #7F7FD5 100%)"}
          >Beni Tanı</a>
        </div>
        {/* 3'lü Banner Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            gap: "20px",
            height: "400px",
            maxWidth: "1200px",
            margin: "0 auto 0 auto"
          }}
        >
          {/* Sol görsel */}
          <div style={{ height: "100%", overflow: "hidden", borderRadius: "16px" }}>
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
              alt="sol"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Orta görsel */}
          <div style={{ height: "100%", overflow: "hidden", borderRadius: "16px" }}>
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
              alt="orta"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Sağ görsel */}
          <div style={{ height: "100%", overflow: "hidden", borderRadius: "16px" }}>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="sağ"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        {/* Son Yazılar Bölümü */}
        <div style={{
          maxWidth: 1200,
          margin: "60px auto 0 auto",
          padding: "0 24px"
        }}>
          <h2 style={{
            fontSize: "2.1rem",
            fontWeight: "bold",
            color: "#222",
            marginBottom: 28,
            letterSpacing: 1
          }}>
            Blogdan Son Yazılar
          </h2>
          <div style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {recentPosts.map((post, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 14,
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                padding: "28px 24px 24px 24px",
                width: 340,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer"
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 32px #FFD60033"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}
              >
                <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#7F7FD5", marginBottom: 10 }}>{post.title}</div>
                <div style={{ color: "#444", fontSize: 17, marginBottom: 18 }}>{post.summary}</div>
                <a href="/blog" style={{ color: "#FFD600", fontWeight: 600, textDecoration: "none", fontSize: 16, alignSelf: "flex-end", letterSpacing: 0.5 }}>
                  Devamını Oku &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* İletişim Bölümü */}
        <div style={{
          background: "linear-gradient(120deg, #f7f6f5 80%, #FFD600 100%)",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 0",
          marginTop: 60,
          boxShadow: formHover ? "0 8px 32px rgba(127,127,213,0.13)" : "0 2px 16px rgba(0,0,0,0.07)",
          transition: "box-shadow 0.3s"
        }}
        onMouseEnter={() => setFormHover(true)}
        onMouseLeave={() => setFormHover(false)}
        >
          <div style={{
            display: "flex",
            maxWidth: "1200px",
            width: "100%",
            gap: "60px",
            alignItems: "center"
          }}>
            {/* Sol Kısım - Büyük ve profesyonel görsel */}
            <div style={{ flex: 1.2, textAlign: "left", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Renkli animasyonlu daire */}
              <div style={{
                position: "absolute",
                left: -40,
                top: 80,
                width: 160,
                height: 160,
                background: "linear-gradient(135deg, #FFD600 60%, #7F7FD5 100%)",
                borderRadius: "50%",
                zIndex: 0,
                filter: "blur(2px)",
                animation: "spin 6s linear infinite"
              }} />
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
                alt="contact professional"
                style={{ width: 420, height: 420, objectFit: "cover", borderRadius: "24px", marginBottom: 24, position: "relative", zIndex: 1, boxShadow: formHover ? "0 8px 32px #FFD60055" : "0 2px 8px #0001", transition: "box-shadow 0.3s" }}
              />
              <div style={{ fontSize: 22, marginTop: 12, position: "relative", zIndex: 1, fontStyle: "italic", color: "#444", maxWidth: 420, textAlign: "center", fontWeight: 500 }}>
                Her türlü proje, işbirliği veya danışmanlık için bana ulaşabilirsin. Profesyonel ve hızlı dönüş garantisi!
              </div>
            </div>
            {/* Sağ Kısım - Daha büyük ve okunaklı metin */}
            <div style={{ flex: 2, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              {/* Modern başlık: gradient, ikon ve animasyonlu çizgi */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                <h1 style={{
                  fontSize: "3.2rem",
                  fontWeight: "bold",
                  margin: 0,
                  color: "#222",
                  letterSpacing: 1,
                  background: "linear-gradient(90deg, #FFD600 40%, #7F7FD5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block"
                }}>
                  Benimle İletişime Geç
                </h1>
                {/* El sallama ikonu animasyonlu */}
                <span style={{ fontSize: 38, animation: "wave 1.6s infinite" }}>👋</span>
              </div>
              {/* Animasyonlu çizgi */}
              <div style={{
                width: 70,
                height: 5,
                background: "linear-gradient(90deg, #FFD600 40%, #7F7FD5 100%)",
                marginBottom: 18,
                borderRadius: 3,
                animation: "slidein 1.2s cubic-bezier(.68,-0.55,.27,1.55)"
              }} />
              {/* Slogan */}
              <div style={{
                fontSize: 22,
                marginBottom: 18,
                color: "#333",
                fontWeight: 600,
                letterSpacing: 0.5,
                fontStyle: "italic",
                textShadow: "0 2px 8px #FFD60022"
              }}>
                Birlikte harika projeler üretelim!
              </div>
              {/* Sosyal medya ikonları */}
              <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
                <a href="https://www.linkedin.com/in/serdar-%C5%9Fahin-280466244/" target="_blank" rel="noopener noreferrer" style={{ color: "#0077b5", fontSize: 32, transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.2)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} title="LinkedIn">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                </a>
                <a href="https://github.com/SerdarSahinn" target="_blank" rel="noopener noreferrer" style={{ color: "#222", fontSize: 32, transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.2)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} title="GitHub">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="mailto:srdr4034@gmail.com" style={{ color: "#D44638", fontSize: 32, transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.2)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} title="Mail Gönder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.713l-11.985-8.713h23.97zm11.985-10.713h-23.97c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h23.97c1.104 0 2-.896 2-2v-16c0-1.104-.896-2-2-2zm-11.985 13.287l-12-8.713v14.426c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-14.426l-12 8.713z"/></svg>
                </a>
              </div>
              <div style={{ fontSize: 20, marginBottom: 38, color: "#333", lineHeight: 1.6, maxWidth: 600 }}>
                Markanız, ajansınız veya kişisel projeleriniz için birlikte neler yapabileceğimizi konuşalım. İstanbul merkezli çalışıyorum, ancak hizmetlerim tüm Türkiye'ye açıktır.<br /><br />
                Web sitesi, dijital marka danışmanlığı veya yaratıcı projeler için bana ulaşabilirsiniz. Size en kısa sürede dönüş yapacağım!
              </div>
              {/* Modern ve örneğe uygun form */}
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  setSending(true);
                  setSuccess('');
                  setError('');
                  try {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(form)
                    });
                    if (!res.ok) {
                      const data = await res.json();
                      throw new Error(data.error || 'Mesaj gönderilemedi.');
                    }
                    setSuccess('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.');
                    setForm({ name: '', email: '', message: '' });
                  } catch (err) {
                    setError(err.message || 'Mesaj gönderilemedi.');
                  }
                  setSending(false);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: formHover ? "0 8px 32px #FFD60033" : "0 2px 16px rgba(0,0,0,0.07)",
                  padding: 32,
                  maxWidth: 600,
                  margin: "0 auto",
                  border: formHover ? "2px solid #FFD600" : "2px solid #eee",
                  transition: "box-shadow 0.3s, border 0.3s",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                  <input
                    type="text"
                    placeholder="Adınız"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{
                      flex: 1,
                      padding: "16px 18px",
                      border: hovered.name ? "2px solid #7F7FD5" : "2px solid #eee",
                      borderRadius: 8,
                      fontSize: 18,
                      outline: "none",
                      fontStyle: "italic",
                      color: "#222",
                      background: hovered.name ? "#f7f6ff" : "#fff",
                      boxShadow: hovered.name ? "0 2px 12px #7F7FD555" : "none",
                      transition: "border 0.3s, box-shadow 0.3s, background 0.3s"
                    }}
                    onFocus={() => setHovered(h => ({ ...h, name: true }))}
                    onBlur={() => setHovered(h => ({ ...h, name: false }))}
                  />
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={{
                      flex: 1,
                      padding: "16px 18px",
                      border: hovered.email ? "2px solid #7F7FD5" : "2px solid #eee",
                      borderRadius: 8,
                      fontSize: 18,
                      outline: "none",
                      fontStyle: "italic",
                      color: "#222",
                      background: hovered.email ? "#f7f6ff" : "#fff",
                      boxShadow: hovered.email ? "0 2px 12px #7F7FD555" : "none",
                      transition: "border 0.3s, box-shadow 0.3s, background 0.3s"
                    }}
                    onFocus={() => setHovered(h => ({ ...h, email: true }))}
                    onBlur={() => setHovered(h => ({ ...h, email: false }))}
                  />
                </div>
                <textarea
                  placeholder="Mesajınız"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{
                    padding: "16px 18px",
                    border: hovered.message ? "2px solid #FFD600" : "2px solid #eee",
                    borderRadius: 8,
                    fontSize: 18,
                    outline: "none",
                    fontStyle: "italic",
                    color: "#222",
                    background: hovered.message ? "#fffbe6" : "#fff",
                    boxShadow: hovered.message ? "0 2px 12px #FFD60055" : "none",
                    transition: "border 0.3s, box-shadow 0.3s, background 0.3s",
                    marginBottom: 18
                  }}
                  onFocus={() => setHovered(h => ({ ...h, message: true }))}
                  onBlur={() => setHovered(h => ({ ...h, message: false }))}
                />
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    alignSelf: "flex-end",
                    background: formHover ? "linear-gradient(90deg, #7F7FD5 60%, #FFD600 100%)" : "linear-gradient(90deg, #FFD600 60%, #7F7FD5 100%)",
                    color: sending ? '#aaa' : "#222",
                    fontWeight: "bold",
                    fontSize: 18,
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 32px 10px 24px",
                    cursor: sending ? 'not-allowed' : "pointer",
                    boxShadow: formHover ? "0 4px 16px #FFD60055" : "0 2px 8px rgba(0,0,0,0.07)",
                    letterSpacing: 1,
                    transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #7F7FD5 60%, #FFD600 100%)"}
                  onMouseOut={e => e.currentTarget.style.background = formHover ? "linear-gradient(90deg, #7F7FD5 60%, #FFD600 100%)" : "linear-gradient(90deg, #FFD600 60%, #7F7FD5 100%)"}
                >
                  {sending ? 'Gönderiliyor...' : 'GÖNDER'}
                  <span style={{ fontSize: 22, marginLeft: 2, display: "flex", alignItems: "center" }}>&#8594;</span>
                </button>
                {(success || error) && (
                  <div style={{
                    marginTop: 18,
                    padding: 16,
                    borderRadius: 10,
                    background: success ? 'linear-gradient(90deg,#FFD600,#7F7FD5)' : '#ffebee',
                    color: success ? '#222' : '#c62828',
                    fontWeight: 600,
                    fontSize: 18,
                    boxShadow: success ? '0 2px 12px #FFD60055' : '0 2px 8px #c6282822',
                    textAlign: 'center',
                    animation: 'fadein 0.7s',
                    transition: 'all 0.3s'
                  }}>
                    {success || error}
                  </div>
                )}
              </form>
            </div>
          </div>
          {/* Animasyon için keyframes */}
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes wave {
              0% { transform: rotate(0deg); }
              10% { transform: rotate(14deg); }
              20% { transform: rotate(-8deg); }
              30% { transform: rotate(14deg); }
              40% { transform: rotate(-4deg); }
              50% { transform: rotate(10deg); }
              60% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes slidein {
              from { width: 0; opacity: 0; }
              to { width: 70px; opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    </>
  );
}

export default Home; 