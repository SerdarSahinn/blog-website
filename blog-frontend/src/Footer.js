import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer style={{
      width: "100%",
      borderTop: "1px solid #eee",
      padding: "18px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginTop: "60px",
      background: "#fff"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 40px"
      }}>
        <div style={{ display: "flex", gap: "18px" }}>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22 }}>
            <FontAwesomeIcon icon={faFacebook} color="#1877f3" />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22 }}>
            <FontAwesomeIcon icon={faInstagram} color="#e1306c" />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22 }}>
            <FontAwesomeIcon icon={faGithub} color="#222" />
          </a>
          <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22 }}>
            <FontAwesomeIcon icon={faYoutube} color="#ff0000" />
          </a>
        </div>
        <div style={{ fontSize: 16, color: "#222", textAlign: "center", width: "100%" }}>
          COPYRIGHT © 2023 VISUAL POETRY BY AYUSH | ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}

export default Footer; 