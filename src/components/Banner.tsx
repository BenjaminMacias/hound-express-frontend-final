import React from "react";

const Banner: React.FC = () => {
  return (
    <section
      className="banner"
      role="banner"
      aria-labelledby="banner-title"
    >
      <img
        src="/img/envios.png"
        alt="Envíos Hound Express"
        className="banner__image"
      />
      <h2 id="banner-title" className="banner__title">
        Rastrea tus envíos
      </h2>
      <p className="banner__slogan">Rápido. Seguro. Eficiente.</p>
    </section>
  );
};

export default Banner;
