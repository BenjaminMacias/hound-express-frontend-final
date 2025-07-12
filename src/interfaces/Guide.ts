// Representa una entrada en el historial de una guía 
export interface HistoryEntry {
  date: string;        // Fecha y hora de la acción
  status: string;      // Estado en ese momento
  location: string;    // Ubicación de la guía
  notes: string;       // Observaciones del cambio
}

// Representa una guía completa
export interface Guide {
  id: string;                  // Identificador único de la guía (antes 'number')
  trackingNumber: string;      
  origin: string;              // Ciudad de origen
  destination: string;         // Ciudad de destino
  recipient: string;           // Destinatario
  creationDate: string;        // Fecha de creación de la guía
  status: "Pendiente" | "En tránsito" | "Entregado"; // Estado actual
  lastUpdate: string;          // Fecha y hora de la última actualización
  history: HistoryEntry[];     // Lista de cambios de estado
}
