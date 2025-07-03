import React, { useState, useEffect } from "react";
import "./About.css";
import { Helmet } from "react-helmet";

const techs = [
  { name: "React", color: "#61dafb", icon: "⚛️" },
  { name: "React Router", color: "#f44250", icon: "🔀" },
  { name: "JavaScript", color: "#f7df1e", icon: "🟨" },
  { name: "HTML5", color: "#e34c26", icon: "🌐" },
  { name: "CSS3", color: "#2965f1", icon: "🎨" },
  { name: "FontAwesome", color: "#333", icon: "⭐" }
];

const profileImg = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80";

function About() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => setActive(true), 100);
  }, []);

  return (
    <>
      <Helmet>
        <title>Hakkımda | Modern Blog</title>
        <meta name="description" content="Kişisel bilgiler, eğitim ve deneyimler. Modern blog sahibi hakkında detaylar." />
      </Helmet>
      <div className="about-bg">
        <div className={`about-card${active ? " about-animate" : ""}`}> 
          <div className="about-img-wrap">
            <img src={profileImg} alt="Profil" className="about-img" />
          </div>
          <div className="about-content">
            <h2 className="about-title">Hakkımda</h2>
            <div className="about-desc">
              Merhaba! Ben 2025 yılında yeni mezun oldum ve bu blogu hem öğrendiklerimi paylaşmak hem de portföyümde göstermek için hazırladım.<br/><br/>
              React, React Router, JavaScript, HTML ve CSS gibi teknolojilerle modern web projeleri geliştirmekten keyif alıyorum. Ayrıca ikonlar için FontAwesome kullandım.<br/>
              Umarım burada paylaştıklarım sana da ilham verir!
            </div>
            <div className="about-techs">
              {techs.map(tech => (
                <span key={tech.name} className="about-tech" style={{color: tech.color, boxShadow: `0 2px 8px ${tech.color}22`}}>
                  <span>{tech.icon}</span> {tech.name}
                </span>
              ))}
            </div>
            {/* Timeline Başlangıcı */}
            <div className="timeline-section">
              <h3 className="timeline-title">Zaman Çizelgesi</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-icon timeline-icon-edu">🎓</div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-institution">İzmir Bakırçay Üniversitesi</span>
                      <span className="timeline-date">2021 - 2025</span>
                    </div>
                    <div className="timeline-role">Bilgisayar Mühendisliği</div>
                    <div className="timeline-desc">3.2/4.0 ortalama ile yeni mezun oldum.</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon timeline-icon-intern">💼</div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-institution">Ledsoft Teknoloji A.Ş.</span>
                      <span className="timeline-date">2024 (4 Ay)</span>
                    </div>
                    <div className="timeline-role">Stajyer</div>
                    <div className="timeline-desc">4 aylık yazılım stajı yaptım.</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Timeline Sonu */}
          </div>
        </div>
      </div>
    </>
  );
}

export default About; 