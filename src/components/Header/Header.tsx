import Logo from "../Logo/Logo";
import LangSwitcher from "./LangSwitcher/LangSwitcher";
import styles from "./Header.module.css";
import Navbar from "./Navbar/Navbar";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.header}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />

        <svg
          onClick={() => setShowMenu(!showMenu)}
          className={styles.mobileMenuIcon}
          width="28"
          height="14"
          viewBox="0 0 28 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="12" width="28" height="2" fill="#676767" />
          <rect y="6" width="28" height="2" fill="#676767" />
          <rect width="28" height="2" fill="#676767" />
        </svg>
      </div>
      {showMenu && (
        <div className={styles.mobileMenu}>
          <LangSwitcher />
          <Navbar />
        </div>
      )}
      <div className={styles.desktopMenu}>
        <LangSwitcher />
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
