import guidesReducer, { addGuide } from "../store/guidesSlice";
import { Guide } from "../interfaces/Guide";

describe("guidesSlice", () => {
  it("debe agregar una guía correctamente", () => {
    const initialState = {
      guides: [],
      query: "",
      selectedGuideNumber: null,
      isHistoryModalOpen: false,
    };

    const newGuide: Guide = {
      id: "TEST123",
      origin: "CDMX",
      destination: "GDL",
      recipient: "Benjamín",
      creationDate: "2025-04-18",
      lastUpdate: "2025-04-18",
      status: "Pendiente",
      history: [],
    };

    const state = guidesReducer(initialState, addGuide(newGuide));
    expect(state.guides.length).toBe(1);
    expect(state.guides[0].id).toBe("TEST123");
  });
});
