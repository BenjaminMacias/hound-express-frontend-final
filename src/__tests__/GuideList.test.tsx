import { render, screen, fireEvent } from "@testing-library/react";
import GuideList from "../components/GuideList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import guidesReducer from "../store/guidesSlice";
import { RootState } from "../store/store";
import { Guide } from "../interfaces/Guide";

// Función auxiliar para renderizar el componente con un store personalizado
const renderWithStore = (preloaded: Partial<RootState["guides"]> = {}) => {
  const store = configureStore({
    reducer: {
      guides: guidesReducer,
    },
    preloadedState: {
      guides: {
        guides: [
          {
            id: "ABC123",
            origin: "Guadalajara",
            destination: "CDMX",
            status: "Pendiente",
            recipient: "Benny",
            creationDate: "2025-04-17",
            lastUpdate: "2025-04-17",
            history: [],
          },
        ] satisfies Guide[],
        query: "",
        selectedGuideNumber: null,
        isHistoryModalOpen: false,
        ...preloaded,
      },
    },
  });

  return render(
    <Provider store={store}>
      <GuideList />
    </Provider>
  );
};

describe("GuideList", () => {
  it("renderiza la guía correctamente", () => {
    renderWithStore();

    expect(screen.getByText("ABC123")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
    expect(screen.getByText("Guadalajara")).toBeInTheDocument();
    expect(screen.getByText("CDMX")).toBeInTheDocument();
    expect(screen.getByText("Actualizar")).toBeInTheDocument();
    expect(screen.getByText("Historial")).toBeInTheDocument();
  });

  it("muestra mensaje si no hay resultados para una búsqueda", () => {
    renderWithStore({ query: "NO-EXISTE" });

    expect(
      screen.getByText(/No se encontró ninguna guía con ese número/i)
    ).toBeInTheDocument();
  });

  it("dispara acciones al hacer clic en botones", () => {
    renderWithStore();

    fireEvent.click(screen.getByText("Actualizar"));
    fireEvent.click(screen.getByText("Historial"));


  });
});
