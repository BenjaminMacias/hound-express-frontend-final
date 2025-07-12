import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store"; // Asegúrate que el path sea correcto

import "./styles/main.scss";

import Header from "./components/Header";
import Banner from "./components/Banner";
import GuideForm from "./components/GuideForm";
import StatusPanel from "./components/StatusPanel";
import GuideList from "./components/GuideList";
import HistoryModal from "./components/HistoryModal";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const guides = useSelector((state: RootState) => state.guides.guides);

  // Cálculo de totales
  const total = guides.length;
  const inTransit = guides.filter(g => g.status === "En tránsito").length;
  const delivered = guides.filter(g => g.status === "Entregado").length;

  return (
    <>
      <Header />
      <Banner />

      <main className="container" role="main">
        {/* Sección Registro */}
        <section id="register" aria-labelledby="register-title">
          <h2 id="register-title" className="visually-hidden">Registro de Guías</h2>
          <GuideForm />
        </section>

        {/* Sección Estado General */}
        <section id="status" aria-labelledby="status-title">
          <h2 id="status-title" className="visually-hidden">Estado General</h2>
          
          {/* Aquí pasamos correctamente los props */}
          <StatusPanel 
            total={total}
            inTransit={inTransit}
            delivered={delivered}
          />
        </section>

        {/* Sección Buscar */}
        <section id="search" aria-labelledby="search-title">
          <h2 id="search-title" className="visually-hidden">Buscar Guías</h2>
          <SearchBar />
        </section>

        {/* Sección Guías */}
        <section id="list" aria-labelledby="list-title">
          <h2 id="list-title" className="visually-hidden">Listado de Guías</h2>
          <GuideList />
        </section>
      </main>

      <HistoryModal />

      <footer>
        <p style={{ textAlign: "center", padding: "1rem" }}>
          © 2025 Hound Express. Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
};

export default App;
