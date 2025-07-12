import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">

        {/* Agrupamos logo y título */}
        <div className="header__brand">
          <img
            src="/img/logo-Hound_Express-bg-white.png"
            alt="Logo Hound Express"
            className="header__logo"
          />
          <h1 className="header__title">Hound Express</h1>
        </div>

        {/* Navegación al lado derecho */}
        <nav className="header__nav" aria-label="Navegación principal">
          <ul className="header__nav-list">
            <li><a href="#register">Registro</a></li>
            <li><a href="#search">Buscar</a></li>
            <li><a href="#status">Estado general</a></li>
            <li><a href="#list">Guías</a></li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
