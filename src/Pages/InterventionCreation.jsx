import { useState } from "react";

export default function InterventionCreation() {
    const [dateIntervention_vdev, setDateIntervention] = useState('');
    const [heureIntervention_vdev, setHeureIntervention] = useState('');
    const [matriculeTech_vdev, setMatriculeTech] = useState('');
    const [numSerieMateriel_vdev, setNumSerieMateriel] = useState('');
    const [message, setMessage] = useState('');
    const authProvider = "local";
/*
    const CreaInterv = (e) => {
        e.preventDefault();

        fetch("http://localhost:8001/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dateIntervention_vdev,
                heureIntervention_vdev,
                matriculeTech_vdev,
                numSerieMateriel_vdev,
                auth_provider: authProvider // send the auth_provider (local or google)
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setMessage("Création de l'intervention réussie !");
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
    return <div id="create-intervention" className="flex flex-wrap place-content-center h-screen">
        <form className="border-2 border-solid border-slate-300 py-6 px-6 rounded-sm bg-slate-50">
            <h1 className="uppercase w-full text-center mb-5 text-2xl border-b-2 border-solid border-b-slate-300">Fiche d'intervention : Création</h1>
            <label className="border-b border-solid border-b-slate-300 text-lg">Date de l'intervention : </label><br /><input  className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="date" required placeholder="date" value={dateIntervention_vdev} onChange={(e) => setDateIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Heure de l'intervention : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="time" required placeholder="heure" value={heureIntervention_vdev} onChange={(e) => setHeureIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Matricule du technicien : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="matricule" value={matriculeTech_vdev} onChange={(e) => setMatriculeTech(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Numéro de série du matériel : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="num de série" value={numSerieMateriel_vdev} onChange={(e) => setNumSerieMateriel(e.target.value)}/><br/>
            <input type="submit" value="Pré-visualiser les détails" className="border-rose-900 bg-rose-600 hover:border-rose-950 hover:bg-rose-800 py-2 px-4 rounded-full cursor-pointer" />
        </form>
        {message && <p className="text-center mt-4 w-full">{message}</p>}
    </div>
}