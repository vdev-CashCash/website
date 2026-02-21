import { useState } from "react";


export default function SuppressionIntervention({ datas }){

    const numIntervention_vdev = datas.numIntervention_vdev;
    const dateIntervention_vdev = datas.dateIntervention_vdev;
    const heureIntervention_vdev = datas.heureIntervention_vdev;
    const numSerie_vdev = datas.numSerie_vdev;
    const emplacement_vdev = datas.emplacement_vdev;
    const telephone_vdev = datas.telephone_vdev;
    const adressePostale_vdev = datas.adressePostale_vdev;
    const dureeDeplacement_vdev = datas.dureeDeplacement_vdev;
    const distanceAgenceClient_vdev = datas.distanceAgenceClient_vdev;
    const mail_vdev = datas.mail_vdev;
    const matriculeTechnicien_vdev = datas.matriculeTechnicien_vdev;
    const nom_vdev = datas.nom_vdev;
    const prenom_vdev = datas.prenom_vdev;

    const [Error, setError] = useState('');

    const deleteInterv = async (e) => {
        const res = await fetch("http://localhost:8080/intervention/deleteIntervention", {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
             },
            body: JSON.stringify({
                numIntervention_vdev,
                dateIntervention_vdev,
                heureIntervention_vdev,
                numSerie_vdev,
                emplacement_vdev,
                telephone_vdev,
                adressePostale_vdev,
                dureeDeplacement_vdev,
                distanceAgenceClient_vdev,
                mail_vdev,
                matriculeTechnicien_vdev,
                nom_vdev,
                prenom_vdev
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

        alert("Suppresion de l'intervention - OK");
        window.location.href="/#/recherche_fiches";
    }

    return <input value="Supprimer la fiche" className="bg-rose-700 text-center hover:bg-rose-950 hover:text-white py-2 px-4 rounded-full cursor-pointer" onClick={deleteInterv} />
}