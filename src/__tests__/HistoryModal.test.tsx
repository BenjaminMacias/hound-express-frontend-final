import { render, screen } from "@testing-library/react";
import HistoryModal from "../components/HistoryModal";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import guidesReducer from "../store/guidesSlice";
import { RootState } from "../store/store";
import { Guide } from "../interfaces/Guide";

// Utilidad que renderiza el componente HistoryModal con un store simulado
const renderWithStore = (preloaded: Partial<RootState["guides"]>) => {
  const store = configureStore({
    reducer: {
      guides: guidesReducer,
    },
    preloadedState: {
      guides: {
        guides: [],
        query: "",
        selectedGuideNumber: null,
        isHistoryModalOpen: false,
        ...preloaded,
      },
    },
  });

  return render(
    <Provider store={store}>
      <HistoryModal />
    </Provider>
  );
};

describe("HistoryModal", () => {
  it("no se muestra si isHistoryModalOpen es false", () => {
    renderWithStore({
      guides: [],
      query: "",
      selectedGuideNumber: null,
      isHistoryModalOpen: false,
    });
    expect(screen.queryByText(/Historial de la guía/i)).not.toBeInTheDocument();
  });

  it("muestra mensaje de historial vacío si no hay entradas", () => {
    const emptyGuide: Guide = {
      id: "ABC123",
      origin: "GDL",
      destination: "CDMX",
      recipient: "Benny",
      creationDate: "2025-04-17",
      lastUpdate: "2025-04-17",
      status: "Pendiente",
      history: [],
    };

    renderWithStore({
      guides: [emptyGuide],
      query: "",
      selectedGuideNumber: "ABC123",
      isHistoryModalOpen: true,
    });

    expect(screen.getByText("Historial de la guía:")).toBeInTheDocument();
    expect(screen.getByText("No hay historial disponible.")).toBeInTheDocument();
  });

  it("muestra correctamente una entrada en el historial", () => {
    const guideWithHistory: Guide = {
      id: "ABC123",
      origin: "GDL",
      destination: "CDMX",
      recipient: "Benny",
      creationDate: "2025-04-17",
      lastUpdate: "2025-04-17",
      status: "Pendiente",
      history: [
        {
          date: "2025-04-17",
          status: "Pendiente",
          location: "GDL",
          notes: "Registrado",
        },
      ],
    };

    renderWithStore({
      guides: [guideWithHistory],
      query: "",
      selectedGuideNumber: "ABC123",
      isHistoryModalOpen: true,
    });

    expect(screen.getByText("Historial de la guía:")).toBeInTheDocument();
    expect(screen.getByText("2025-04-17")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
    expect(screen.getByText("GDL")).toBeInTheDocument();
    expect(screen.getByText("Registrado")).toBeInTheDocument();
  });
});
