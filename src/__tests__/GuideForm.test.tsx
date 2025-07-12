import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GuideForm from "../components/GuideForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Mock explícito para addGuide como una función tipo thunk
const mockedAddGuide = jest.fn(() => () => {}); //  Simula un thunk (función que retorna una función)

// Se hace un mock del módulo guidesSlice y se reemplaza addGuide por el mock
jest.mock("../store/guidesSlice", () => ({
  ...jest.requireActual("../store/guidesSlice"),
  addGuide: () => mockedAddGuide(),
}));

// Importamos el reducer después del mock para evitar interferencias
const guidesReducer = require("../store/guidesSlice").default;

// Función para renderizar el componente con un store de prueba
const renderWithProvider = (component: React.ReactElement) => {
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
      },
    },
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe("GuideForm", () => {
  // Antes de cada prueba limpiamos cualquier mock anterior
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verificamos que se renderizan todos los campos esperados
  it("renderiza correctamente todos los campos", () => {
    renderWithProvider(<GuideForm />);
    expect(screen.getByPlaceholderText("Número de guía")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Origen")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Destino")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Destinatario")).toBeInTheDocument();

    // El input de fecha no tiene label ni placeholder, pero se encuentra con value vacío
    const inputs = screen.getAllByDisplayValue("");
    expect(inputs[inputs.length - 1]).toBeInTheDocument();
  });

  // Simulamos el envío sin llenar campos para verificar mensaje de error
  it("muestra error si se intentan enviar campos vacíos", () => {
    renderWithProvider(<GuideForm />);
    fireEvent.click(screen.getByText("Registrar"));
    expect(screen.getByText(/Por favor completa todos los campos/i)).toBeInTheDocument();
  });

  // Simulamos el llenado correcto del formulario y verificamos el dispatch de la acción
  it("envía correctamente una guía válida", () => {
    renderWithProvider(<GuideForm />);

    fireEvent.change(screen.getByPlaceholderText("Número de guía"), {
      target: { value: "ABC123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Origen"), {
      target: { value: "Guadalajara" },
    });
    fireEvent.change(screen.getByPlaceholderText("Destino"), {
      target: { value: "CDMX" },
    });
    fireEvent.change(screen.getByPlaceholderText("Destinatario"), {
      target: { value: "Benny" },
    });

    const inputs = screen.getAllByDisplayValue("");
    const dateInput = inputs[inputs.length - 1]; // campo de fecha
    fireEvent.change(dateInput, { target: { value: "2025-04-17" } });

    fireEvent.click(screen.getByText("Registrar"));

    expect(mockedAddGuide).toHaveBeenCalledTimes(1); // se llamó el thunk una vez
  });
});
