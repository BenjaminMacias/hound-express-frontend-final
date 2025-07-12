import React, { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchGuides, setHistoryModalOpen, setSelectedGuide } from "../store/guidesSlice";
import api from "../api/api";

const GuideList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const guides = useSelector((state: RootState) => state.guides.guides);
  const query = useSelector((state: RootState) => state.guides.query);
  
  const [listError, setListError] = useState<string | null>(null); 

  useEffect(() => {
    dispatch(fetchGuides());
  }, [dispatch]);

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === "Pendiente"
        ? "En tránsito"
        : currentStatus === "En tránsito"
        ? "Entregado"
        : "Entregado";

    try {
      await api.put(`/guias/${id}/actualizar-guia/`, {
        status: nextStatus,
      });
      dispatch(fetchGuides());
      setListError(null); // Limpia error si funciona
    } catch (error: any) {
      console.error("Error al actualizar estado", error);
      if (error.response && error.response.data) {
        setListError(`Error del servidor: ${error.response.data.detail || "No se pudo actualizar."}`);
      } else if (error.request) {
        setListError("Error de conexión con el servidor.");
      } else {
        setListError("Error inesperado. Intenta nuevamente.");
      }
    }
  };

  const filteredGuides = guides.filter((guide) =>
    guide.trackingNumber.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="guide-list">
      <h2 className="guide-list__title">Lista de Guías</h2>
      {listError && <p className="guide-list__error" role="alert">{listError}</p>}
      <table className="guide-list__table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Estado</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha de creación</th>
            <th>Última actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuides.map((guide) => (
            <tr key={guide.id}>
              <td>{guide.trackingNumber}</td>
              <td>{guide.status}</td>
              <td>{guide.origin}</td>
              <td>{guide.destination}</td>
              <td>{new Date(guide.creationDate).toLocaleString("es-MX")}</td>
              <td>
                {guide.lastUpdate
                  ? new Date(guide.lastUpdate).toLocaleString("es-MX", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                  : "—"}
              </td>
              <td>
                <button onClick={() => handleStatusUpdate(guide.id, guide.status)}>
                  Actualizar
                </button>
                <button
                  onClick={() => {
                    dispatch(setSelectedGuide(guide.id));
                    dispatch(setHistoryModalOpen(true));
                  }}
                >
                  Historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default GuideList;
