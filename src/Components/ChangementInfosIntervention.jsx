import { useState } from "react";

export default function ChangementInfosIntervention({ numIntervention_vdev, dateVisite_vdev, heureVisite_vdev, matriculeEmploye_vdev }){

    const [Error, setError] = useState('');

    const handleSetUpdate = async (e) => {
        const res = await fetch("http://localhost:8080/intervention/updateIntervention", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
             },
            body: JSON.stringify({
                numIntervention_vdev,
                dateVisite_vdev,
                heureVisite_vdev,
                matriculeEmploye_vdev
            })
        });

        if (res.status === 401) {
            alert('Vous avez été déconnecté de l\'application. Veuillez vous reconnecter à l\'application..')
            window.location.href = '/#/'
            return;
        }
        if (!res.ok) {
            setError('Erreur lors de la création de l\'intervention..');
            alert(Error);
            return;
        }

        alert("Les modifications de l'intervention ont bien été prises en compte");
        window.location.href="/#/recherche_fiches";
    }
    return <input value="Confirmer changements" className="bg-rose-700 text-center hover:bg-rose-950 hover:text-white py-2 px-4 rounded-full cursor-pointer" onClick={handleSetUpdate} />
}
//