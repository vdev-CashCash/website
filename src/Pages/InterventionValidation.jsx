import './InterventionValidation.css'
import { useState } from "react";

export default function InterventionValidation({ datas }) {

    const numIntervention_vdev = datas.numIntervention_vdev;
    const [dateIntervention, setDateIntervention] = useState(datas.dateIntervention_vdev);
    const [heureIntervention, setHeureIntervention] = useState(datas.heureIntervention_vdev);
    const [tempPasse_vdev, settempPasse_vdev] = useState(0);
    const [numSerieMateriel, setNumSerieMateriel] = useState(datas.numSerie_vdev);
    const [emplacementMateriel, setEmplacementMateriel] = useState(datas.emplacement_vdev);
    const [adresseClient, setAdresseClient] = useState(datas.adressePostale_vdev);
    const [dureeDeplacementClient, setDureeDeplacementClient] = useState(datas.dureeDeplacement_vdev);
    const [distanceAgenceClient, setDistanceAgenceClient] = useState(datas.distanceAgenceClient_vdev);
    const [mail, setMail] = useState(datas.mail_vdev);
    const [telephoneClient, setTelephoneClient] = useState(datas.telephone_vdev);
    const [matriculeTech, setMatriculeTech] = useState(datas.matriculeTechnicien_vdev);
    const [nomTech, setNomTech] = useState(datas.nom_vdev);
    const [prenomTech, setPrenomTech] = useState(datas.prenom_vdev);
    const [commentaire_vdev, setcommentaire_vdev] = useState('');

    const handleValidation = async (e) => {
        if(commentaire_vdev===""){
            alert("Veuillez remplir la section commentaire_vdev..");
            return;
        }
        const tempPasseInt = parseInt(tempPasse_vdev);
        if(tempPasseInt === 0 || isNaN(tempPasseInt)){
            alert("Veuillez saisir votre temps passé sur l'intervention (minute)..");
            return;
        }

        const res = await fetch("http://localhost:8080/intervention/valideInterv", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
             },
            body: JSON.stringify({
                numIntervention_vdev,
                commentaire_vdev,
                tempPasse_vdev: tempPasseInt
            })
        });
        if (res.status === 401) {
            alert('Vous avez été déconnecté de l\'application. Veuillez vous reconnecter à l\'application..');
            window.location.href = '/#/';
            return;
        }
        if (!res.ok) {
            alert('Erreur lors de la validation de l\'intervention..');
            return;
        }
    };
    
    return (
        <div className="page">
            <div className="sheet">
                <h1>FICHE D'INTERVENTION : VALIDATION</h1>

                <h3>Information de l'intervention :</h3>
                <p>Date Intervention : <input type="text" placeholder="JJ/MM/AAAA" value={dateIntervention} /></p>
                <p>Heure Intervention : <input type="text" placeholder="hh:mm" value={heureIntervention} /></p>
                <p>Temps passé (minutes) : <input type="number" placeholder="hh:mm" value={tempPasse_vdev} onChange={(e) => settempPasse_vdev(e.target.value)} /></p>

                <h3>Information sur le matériel :</h3>
                <p>Numéro de série matériel : <input type="text" placeholder="numéro de série" value={numSerieMateriel} /></p>
                <p>Emplacement du matériel : <input type="text" placeholder="emplacement" value={emplacementMateriel} /></p>

                <h3>Information sur le client :</h3>
                <p>Adresse : <input type="text" placeholder="adresse" value={adresseClient} /></p>
                <p>Mail client : <input type="text" placeholder="mail" value={mail} /></p>
                <p>Téléphone : <input type="text" placeholder="téléphone" value={telephoneClient} /></p>
                <p>Durée du déplacement : <input type="text" placeholder="durée" value={dureeDeplacementClient} /></p>
                <p>Distance du déplacement : <input type="text" placeholder="distance" value={distanceAgenceClient} /></p>

                <h3>Information sur le technicien :</h3>
                <p>Matricule : <input type="text" placeholder="matricule" value={matriculeTech} /></p>
                <p>Nom : <input type="text" placeholder="nom" value={nomTech} /></p>
                <p>Prénom : <input type="text" placeholder="prénom" value={prenomTech} /></p>

                <h3>commentaire_vdev :</h3>
                <p><input type="text" placeholder="Entrez un commentaire_vdev..." value={commentaire_vdev} onChange={(e) => setcommentaire_vdev(e.target.value)} /></p>

                <p><button className="btn" onClick={handleValidation}>Valider la fiche d'intervention</button></p>
            </div>
        </div>
    )
}