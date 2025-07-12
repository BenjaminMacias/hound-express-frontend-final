import React from "react";

// Props del componente: totales de cada estado
interface Props {
  total: number;
  inTransit: number;
  delivered: number;
}

// Panel de estado general del sistema
const StatusPanel: React.FC<Props> = ({ total, inTransit, delivered }) => {
  return (
    <section
      className="status-panel"
      id="status"
      role="region"
      aria-labelledby="status-panel-title"
    >
      <h2 id="status-panel-title" className="status-panel__title">
        Estado General de las Guías
      </h2>

      <div className="status-panel__card-container">
        <div className="status-panel__card">
          Guías activas: {total}
        </div>
        <div className="status-panel__card">
          En tránsito: {inTransit}
        </div>
        <div className="status-panel__card">
          Entregadas: {delivered}
        </div>
      </div>
    </section>
  );
};

export default StatusPanel;
