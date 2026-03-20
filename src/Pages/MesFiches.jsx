import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MesFiches() {

  const [LesFiches, setFiches] = useState([]);
  const navigate = useNavigate();

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

  // Fonction au clic sur une intervention
  const handleInterventionClick = (fiche) => {
    navigate(`/fiche-detail/${fiche.numIntervention_vdev}`);
  };

  useEffect(() => {

    const fetchFiches = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token manquant");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const matricule = payload.sub;
      const role = payload.roles[0];
      const agence = payload.agence;

      const lien = role==="Technicien" ? `http://localhost:8080/intervention/getFichesByMatricule/${matricule}` : `http://localhost:8080/intervention/getFiches/${agence}`;

      const response = await fetch(
        lien,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        navigate("/");
        return;
      }

      if (!response.ok) {
        console.error("Erreur serveur");
        return;
      }

      const data = await response.json();

      setFiches(data);
    };

    fetchFiches();

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mes Fiches</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginTop: "20px" }}>
        {LesFiches.map((fiche) => (
          <div
            key={fiche.numIntervention_vdev}
            onClick={() => handleInterventionClick(fiche)}
            style={{
              padding: "16px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              e.currentTarget.style.backgroundColor = "#f9f9f9";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "18px", color: "#333" }}>
                Intervention #{fiche.numIntervention_vdev}
              </strong>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#666" }}>
              <div>
                <span style={{ fontWeight: "600" }}>Date:</span> {fiche.dateIntervention_vdev}
              </div>
              <div>
                <span style={{ fontWeight: "600" }}>Heure:</span> {formatTime(fiche.heureIntervention_vdev)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {LesFiches.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          Aucune intervention trouvée
        </div>
      )}
    </div>
  );
}