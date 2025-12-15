import { useState } from "react";

export default function InterventionPreVisualisation() {
    const [dateIntervention_vdev, setDateIntervention] = useState('');
    const [heureIntervention_vdev, setHeureIntervention] = useState('');
    const [numSerieMateriel_vdev, setNumSerieMateriel] = useState('');
    const [emplacementMateriel_vdev, setEmplacementMateriel] = useState('');
    const [adresseClient_vdev, setAdresseClient] = useState('');
    const [dureeDeplacementClient_vdev, setDureeDeplacementClient] = useState('');
    const [distanceAgenceClient_vdev, setDistanceAgenceClient] = useState('');
    const [telephoneClient_vdev, setTelephoneClient] = useState('');
    const [emailClient_vdev, setEmailClient] = useState('');
    const [matriculeTech_vdev, setMatriculeTech] = useState('');
    const [nomTech_vdev, setNomTech] = useState('');
    const [prenomTech_vdev, setPrenomTech] = useState('');
    const [message, setMessage] = useState('');
    const authProvider = "local";
/*
    const PreVisuaInterv = (e) => {
        e.preventDefault();

        fetch("http://localhost:8001/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dateIntervention_vdev,
                heureIntervention_vdev,
                numSerieMateriel_vdev,
                emplacementMateriel_vdev,
                adresseClient_vdev,
                dureeDeplacementClient_vdev,
                distanceAgenceClient_vdev,
                telephoneClient_vdev,
                emailClient_vdev,
                matriculeTech_vdev,
                nomTech_vdev,
                prenomTech_vdev,
                auth_provider: authProvider // send the auth_provider (local or google)
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setMessage("Pré-visualisation de l'intervention réussie !");
            } else {
                setMessage("Erreur : " + data.message);
            }
        })
        .catch(err => {
            console.error(err);
            setMessage("Erreur serveur.");
        });
    }
*/
    return <div id="preview-intervention" className="flex flex-wrap place-content-center min-h-screen">
        <form className="border-2 border-solid border-slate-300 py-6 px-6 rounded-sm bg-slate-50">
            <h1 className="uppercase w-full text-center mb-5 text-2xl border-b-2 border-solid border-b-slate-300">Fiche d'intervention : Pré-visualisation</h1>
            <label className="border-b border-solid border-b-slate-300 text-lg">Date de l'intervention : </label><br /><input  className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="date" required placeholder="date" value={dateIntervention_vdev} onChange={(e) => setDateIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Heure de l'intervention : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="time" required placeholder="heure" value={heureIntervention_vdev} onChange={(e) => setHeureIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Numéro de série du matériel : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="num de série" value={numSerieMateriel_vdev} onChange={(e) => setNumSerieMateriel(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Emplacement du matériel : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="emplacement matériel" value={emplacementMateriel_vdev} onChange={(e) => setEmplacementMateriel(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Adresse du client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="adresse client" value={adresseClient_vdev} onChange={(e) => setAdresseClient(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Durée du déplacement client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="durée déplacement client" value={dureeDeplacementClient_vdev} onChange={(e) => setDureeDeplacementClient(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Distance agence-client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="number" required placeholder="distance agence-client" value={distanceAgenceClient_vdev} onChange={(e) => setDistanceAgenceClient(e.target.value)}/><br/> {/*Distance en Km*/}
            <label className="border-b border-solid border-b-slate-300 text-lg">Téléphone client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="téléphone client" value={telephoneClient_vdev} onChange={(e) => setTelephoneClient(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Email client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="email client" value={emailClient_vdev} onChange={(e) => setEmailClient(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Matricule du technicien : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="matricule" value={matriculeTech_vdev} onChange={(e) => setMatriculeTech(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Nom du technicien : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="nom technicien" value={nomTech_vdev} onChange={(e) => setNomTech(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Prénom du technicien : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="prénom technicien" value={prenomTech_vdev} onChange={(e) => setPrenomTech(e.target.value)}/><br/>
            <input type="submit" value="Confirmer les détails" className="bg-rose-700 hover:bg-rose-950 hover:text-white py-2 px-4 rounded-full cursor-pointer" />
        </form>
        {message && <p className="text-center mt-4 w-full">{message}</p>}
    </div>
}