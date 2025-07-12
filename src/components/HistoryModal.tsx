import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setHistoryModalOpen, setSelectedGuide } from "../store/guidesSlice";

const HistoryModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state: RootState) => state.guides.isHistoryModalOpen);
  const selectedId = useSelector((state: RootState) => state.guides.selectedGuideNumber);
  const guide = useSelector((state: RootState) =>
    state.guides.guides.find((g) => g.id === selectedId)
  );

  const handleClose = () => {
    dispatch(setHistoryModalOpen(false));
    dispatch(setSelectedGuide(null));
  };

  if (!isOpen || !guide) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Cerrar historial"
        >
          &times;
        </button>

        <h3 id="modal-title" className="modal-title">
          Historial de la guía: <strong>{guide.trackingNumber}</strong>
        </h3>

        {guide.history.length === 0 ? (
          <p className="modal-empty" role="alert">No hay historial disponible.</p>
        ) : (
          <table className="modal-table">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col">Ubicación</th>
                <th scope="col">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {[...guide.history]
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.date}</td>
                    <td>{entry.status}</td>
                    <td>{entry.location}</td>
                    <td>{entry.notes}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
