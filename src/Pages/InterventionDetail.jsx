import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function InterventionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fiche, setFiche] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour formater l'heure
  const formatTime = (time) => {
    if (!time) return "N/A";
    
    // Si c'est un string
    if (typeof time === 'string') {
      return time;
    }
    
    // Si c'est un objet avec hour et minute
    if (typeof time === 'object' && time.hour !== undefined && time.minute !== undefined) {
      return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
    }
    
    return "N/A";
  };

  useEffect(() => {
    const fetchFicheDetail = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token manquant");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/intervention/getDetailsInterv/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          console.error("Non autorisé");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          console.error("Erreur serveur");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setFiche(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFicheDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!fiche) {
    return (
      <div style={{ padding: "20px" }}>
        <button
          onClick={() => navigate("/mes_fiches")}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Retour
        </button>
        <div style={{ textAlign: "center", color: "#999" }}>
          Fiche non trouvée
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <button
        onClick={() => navigate("/mes_fiches")}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        ← Retour aux fiches
      </button>

      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginTop: 0, color: "#333" }}>
          Intervention #{fiche.numIntervention_vdev}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          <div>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#666" }}>
              Date :
            </label>
            <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
              {fiche.dateIntervention_vdev}
            </p>
          </div>

          <div>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#666" }}>
              Heure :
            </label>
            <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
              {formatTime(fiche.heureIntervention_vdev)}
            </p>
          </div>
        </div>

        {Object.entries(fiche).map(([key, value]) => {
          if (
            key === "numIntervention_vdev" ||
            key === "dateIntervention_vdev" ||
            key === "heureIntervention_vdev"
          ) {
            return null;
          }

          return (
            <div key={key} style={{ marginTop: "16px" }}>
              <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#666" }}>
                {key.replace(/_vdev/, "").replace(/_/g, " ")} :
              </label>
              <p style={{ margin: 0, fontSize: "14px", color: "#333", wordBreak: "break-word" }}>
                {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
