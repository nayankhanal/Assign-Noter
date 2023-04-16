import React from "react";
import "../cssStyle/KeeperGlobal.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
