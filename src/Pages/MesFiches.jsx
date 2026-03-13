import React, { useState, useEffect } from "react";
export default function MesFiches(){
    const [LesFiches, setFiches] = useState([]);
 
  useEffect(() => {
    const fetchFiches = async () => {
      const token = await localstorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const matricule = payload.sub;
 
      const response = await fetch(
        `localhost:8080/intervention/getFichesByMatricule/${matricule}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
 
      if (response.status === 401) {
        alert(
          "Vous avez été déconnecté de l'application. Veuillez vous reconnecter à l'application..",
        );
        return;
      }
      if (!response.ok) {
        Alert.alert("Erreur", "Impossible de charger vos interventions");
        return;
      }
 
      const data = await response.json();
      setFiches(data);
    };
 
    fetchFiches();
  }, []);
    return ()
}