import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li className={location.pathname === "/portfolio" ? "active" : ""}>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li><Link to="/about">ABOUT</Link></li>
        <li className="active"><Link to="/blog">BLOG</Link></li>
        <li><Link to="/admin/login" style={{color: '#FFD600', fontWeight: 'bold'}}>ADMIN</Link></li>
        <li style={{marginLeft:40, cursor:'pointer'}} onClick={toggleTheme} title={theme === 'dark' ? 'Açık Mod' : 'Karanlık Mod'}>
          {theme === 'dark' ? '🌞' : '🌙'}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 