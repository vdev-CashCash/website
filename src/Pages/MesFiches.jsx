import React, { useState, useEffect } from "react";
export default function MesFiches(){
    const [LesFiches, setFiches] = useState([]);
 
  useEffect(() => {
    const fetchFiches = async () => {
      const token = await localStorage.getItem("token");
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
        return;
      }
      if (!response.ok) {
        return;
      }
 
      const data = await response.json();
      setFiches(data);
    };
 
    fetchFiches();
  }, []);
    return (<></>)
}