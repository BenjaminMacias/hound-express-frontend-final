import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Guide } from "../interfaces/Guide";
import api from "../api/api";

interface GuidesState {
  guides: Guide[];
  query: string;
  selectedGuideNumber: string | null;
  isHistoryModalOpen: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: GuidesState = {
  guides: [],
  query: "",
  selectedGuideNumber: null,
  isHistoryModalOpen: false,
  loading: false,
  error: null,
};

// GET - Obtener todas las guías
export const fetchGuides = createAsyncThunk("guides/fetchGuides", async () => {
  const response = await api.get("/guias/");
  return response.data;
});

// PUT - Actualizar estado de guía con endpoint personalizado
export const updateGuideStatus = createAsyncThunk(
  "guides/updateGuideStatus",
  async ({ id, currentStatus }: { id: string; currentStatus: string }) => {
    let newStatus = currentStatus;
    if (currentStatus === "Pendiente") newStatus = "En tránsito";
    else if (currentStatus === "En tránsito") newStatus = "Entregado";

    const response = await api.put(`/guias/${id}/actualizar-guia/`, {
      status: newStatus,
    });

    return response.data;
  }
);

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedGuide: (state, action: PayloadAction<string | null>) => {
      state.selectedGuideNumber = action.payload;
    },
    setHistoryModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isHistoryModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.guides = action.payload;
        state.loading = false;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al obtener guías.";
      })
      .addCase(updateGuideStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.guides.findIndex((g) => g.id === updated.id);
        if (index !== -1) {
          state.guides[index] = updated;
        }
      });
  },
});

export const {
  setQuery,
  setSelectedGuide,
  setHistoryModalOpen,
} = guidesSlice.actions;

export default guidesSlice.reducer;
