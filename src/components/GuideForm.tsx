import React, { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import api from "../api/api";

import { useDispatch } from "react-redux"; 
import { AppDispatch } from "../store/store"; 
import { fetchGuides } from "../store/guidesSlice"; 

const GuideForm: React.FC = () => {
  const existingGuides = useSelector((state: RootState) => state.guides.guides);
  
  const dispatch = useDispatch<AppDispatch>(); 
  
  const [formData, setFormData] = useState({
    trackingNumber: "",
    origin: "",
    destination: "",
    recipient: "",
    creationDate: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const { trackingNumber, origin, destination, recipient, creationDate } = formData;

    if (
      !trackingNumber.trim() ||
      !origin.trim() ||
      !destination.trim() ||
      !recipient.trim() ||
      !creationDate.trim()
    ) {
      setError("Por favor completa todos los campos sin dejar espacios vacíos.");
      return;
    }

    const exists = existingGuides.some(
      (g) =>
        g.trackingNumber.trim().toLowerCase() === trackingNumber.trim().toLowerCase()
    );

    if (exists) {
      setError("El número de guía ya existe.");
      return;
    }

    try {
      await api.post("/guias/crear-guia/", {
        trackingNumber: trackingNumber.trim(),
        origin: origin.trim(),
        destination: destination.trim(),
        recipient: recipient.trim(),
        creationDate: new Date(creationDate).toISOString(), // formato ISO
        status: "Pendiente",
      });

      setFormData({
        trackingNumber: "",
        origin: "",
        destination: "",
        recipient: "",
        creationDate: "",
      });

      setError(null);
      setSuccess(true);
      dispatch(fetchGuides()); // Refresca la lista global y el panel
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(`Error del servidor: ${error.response.data.detail || "Datos inválidos."}`);
      } else if (error.request) {
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        setError("Ocurrió un error inesperado. Intenta más tarde.");
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Registrar Nueva Guía</h2>

      {error && <p className="form__error" role="alert">{error}</p>}
      {success && <p className="form__success">Guía registrada exitosamente.</p>}

      <div className="form__group">
        <label htmlFor="trackingNumber">Número de guía</label>
        <input
          id="trackingNumber"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          placeholder="Número de guía"
        />
      </div>

      <div className="form__group">
        <label htmlFor="origin">Origen</label>
        <input
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="Origen"
        />
      </div>

      <div className="form__group">
        <label htmlFor="destination">Destino</label>
        <input
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destino"
        />
      </div>

      <div className="form__group">
        <label htmlFor="recipient">Destinatario</label>
        <input
          id="recipient"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          placeholder="Destinatario"
        />
      </div>

      <div className="form__group">
        <label htmlFor="creationDate">Fecha de registro</label>
        <input
          type="date"
          id="creationDate"
          name="creationDate"
          value={formData.creationDate}
          onChange={handleChange}
        />
      </div>

      <div className="form__actions">
        <button type="submit" className="form__button">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default GuideForm;
