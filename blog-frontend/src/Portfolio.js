import React from "react";
import "./Portfolio.css";
import { Helmet } from "react-helmet";

const projects = [
  {
    name: "OgrenciTranskriptt",
    desc: "Psql ve C# ile geliştirilmiş öğrenci transkript yönetim sistemi.",
    techs: ["Psql", "C#"],
    github: "https://github.com/SerdarSahinn/OgrenciTranskriptt"
  },
  {
    name: "SinemaBilgiSistemi",
    desc: "PSql ve C# ile geliştirilmiş sinema bilgi sistemi.",
    techs: ["PSql", "C#"],
    github: "https://github.com/SerdarSahinn/SinemaBilgiSistemi"
  },
  {
    name: "HastaneMuayneSistemi",
    desc: "PSql ve C# ile geliştirilmiş hastane muayene otomasyonu.",
    techs: ["PSql", "C#"],
    github: "https://github.com/SerdarSahinn/HastaneMuayneSistemi"
  },
  {
    name: "HaberSiniflandirma",
    desc: "Doğal Dil İşleme ile geliştirilmiş haber sınıflandırma uygulaması.",
    techs: ["Python", "Doğal Dil İşleme"],
    github: "https://github.com/SerdarSahinn/HaberSiniflandirma"
  },
  {
    name: "WebSayfasi",
    desc: "Html, Css ve JavaScript ile geliştirilmiş web sayfası.",
    techs: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/SerdarSahinn/WebSayfasi"
  },
  {
    name: "BankaOtomasyonu",
    desc: "C# ile geliştirilmiş banka otomasyon sistemi.",
    techs: ["C#"],
    github: "https://github.com/SerdarSahinn/BankaOtomasyonu"
  }
];

function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portföy | Modern Blog</title>
        <meta name="description" content="Projeler, yazılım ve web geliştirme portföyü. Modern ve profesyonel işler." />
      </Helmet>
      <div className="portfolio-bg">
        <h2 className="portfolio-title">Portföyüm</h2>
        <div className="portfolio-grid">
          {projects.map((proj, i) => (
            <div className="portfolio-card" key={i}>
              <div className="portfolio-card-header">
                <span className="portfolio-card-title">{proj.name}</span>
              </div>
              <div className="portfolio-card-desc">{proj.desc}</div>
              <div className="portfolio-card-techs">
                {proj.techs.map((t, j) => (
                  <span className="portfolio-tech" key={j}>{t}</span>
                ))}
              </div>
              <div className="portfolio-card-links">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="portfolio-btn portfolio-btn-github">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Portfolio; 