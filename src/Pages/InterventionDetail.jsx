import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import InterventionValidation from "./InterventionValidation";
import SuppressionIntervention from "../Components/SuppressionIntervention";
import ChangementInfosIntervention from "../Components/ChangementInfosIntervention";

export default function InterventionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [numIntervention_vdev, setNumIntervention] = useState("");
  const [dateVisite_vdev, setDateVisite] = useState("");
  const [heureVisite_vdev, setHeureVisite] = useState("");
  const [matriculeEmploye_vdev, setMatriculeEmploye] = useState("");
  const [fiche, setFiche] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentaire, setCommentaire] = useState("");
  const [tempsPasse, setTempsPasse] = useState(0);
  const [step, setStep] = useState("1");

  const options = {
    filename: `intervention-${id}.pdf`,
    margin: .1,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
};
  
  const contentRef = useRef(null);

  const convertToPdf = () => {
      const content = contentRef.current;
      html2pdf().set(options).from(content).save();
  };

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
        setDateVisite(data.dateIntervention_vdev);
        setHeureVisite(data.heureIntervention_vdev);
        setMatriculeEmploye(data.matriculeTechnicien_vdev);
        setNumIntervention(data.numIntervention_vdev);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch(`http://localhost:8080/intervention/getCommentaireTP/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(resB => resB.json())
    .then(dataB => setCommentaire(dataB.commentaire_vdev) & setTempsPasse(dataB.tempPasse_vdev))

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
    step === "2" ? <InterventionValidation datas={fiche} /> : (
    <div style={{ padding: "20px" }} className="w-full flex justify-center">
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
        className="absolute left-0 top-auto ml-1"
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
        className="flex flex-col w-[50%] justify-self-center"
        ref={contentRef}
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
            <input type="date" value={dateVisite_vdev} onChange={(e) => 
              JSON.parse(atob(localStorage.getItem('token').split('.')[1])).roles[0]==="Gestionnaire" && setDateVisite(e.target.value)
            } />
          </div>

          <div>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#666" }}>
              Heure :
            </label>
            <input type="time" value={heureVisite_vdev} onChange={(e) =>
              JSON.parse(atob(localStorage.getItem('token').split('.')[1])).roles[0]==="Gestionnaire" && setHeureVisite(e.target.value)
            } />
          </div>
        </div>

        {Object.entries(fiche).map(([key, value]) => {
          if (
            key === "numIntervention_vdev" ||
            key === "dateIntervention_vdev" ||
            key === "matriculeTechnicien_vdev" ||
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
        <div>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#666" }}>
              Matricule :
            </label>
            <input type="text" value={matriculeEmploye_vdev} onChange={(e) =>
              JSON.parse(atob(localStorage.getItem('token').split('.')[1])).roles[0]==="Gestionnaire" && setMatriculeEmploye(e.target.value)
            } />
          </div>
        <div>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#666" }}>
              Commentaire :
            </label>
            <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
              {commentaire}
            </p>
          </div>
          <div>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#666" }}>
              Temps passé
            </label>
            <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
              {tempsPasse}
            </p>
          </div>
        <div className="flex flex-row gap-2 justify-end">
        {
          JSON.parse(atob(localStorage.getItem('token').split('.')[1])).roles[0]==="Technicien" && commentaire === "" && tempsPasse === 0 &&
          <button className="bg-green-700 hover:bg-green-950 hover:text-white py-2 px-4 rounded-full cursor-pointer" onClick={() => setStep('2')}>Terminer la fiche</button>
        }
        {
          JSON.parse(atob(localStorage.getItem('token').split('.')[1])).roles[0]==="Gestionnaire" &&
          (<div>
            <SuppressionIntervention datas={fiche} />
            <ChangementInfosIntervention heureVisite_vdev={heureVisite_vdev} dateVisite_vdev={dateVisite_vdev} numIntervention_vdev={numIntervention_vdev} matriculeEmploye_vdev={matriculeEmploye_vdev} />
          </div>)
        }
        <button onClick={convertToPdf} className="bg-rose-700 hover:bg-rose-950 hover:text-white py-2 px-4 rounded-full cursor-pointer mt-2">Convertir en PDF</button>
        </div>
      </div>
    </div>
    )
    )
}