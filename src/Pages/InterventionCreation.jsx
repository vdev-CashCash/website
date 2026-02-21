import { useState, useEffect } from "react";
import InterventionConfirmation from "./InterventionConfirmation";

export default function InterventionCreation() {

    const [lesTechniciens, setLesTechniciens] = useState([]);

    const [intervStep, setIntervStep] = useState('1');

    const [dateIntervention_vdev, setDateIntervention] = useState('');
    const [heureIntervention_vdev, setHeureIntervention] = useState('');
    const [matriculeEmploye_vdev, setMatriculeEmploye] = useState('');
    const [numSerie_vdev, setNumSerieMateriel] = useState('');

    const [error, setError] = useState('');
    const [data, setData] = useState({});

    const CreaInterv = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/intervention/createIntervention", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
             },
            body: JSON.stringify({
                dateIntervention_vdev,
                heureIntervention_vdev,
                matriculeEmploye_vdev,
                numSerie_vdev,
            }),
        });
        if (response.status === 401) {
            alert('Vous avez été déconnecté de l\'application. Veuillez vous reconnecter à l\'application..')
            window.location.href = '/#/'
            return;
        }
        if (!response.ok) {
            setError('Erreur lors de la création de l\'intervention..');
            return;
        }
        const data = await response.json();
        setIntervStep('2')
        setData(data);
        setError('');
    }

    useEffect((e) => {
        const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
        const agence = payload.agence;

        fetch(`http://localhost:8080/employe/getTechniciens/from/${agence}`, {
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
             },
        })
        .then(res => res.json())
        .then(data => setLesTechniciens(data))
    }, [])

    return <>
    {
        intervStep==='1' &&
        <div id="create-intervention" className="flex flex-wrap place-content-center min-h-screen">
        <form className="border-2 border-solid border-slate-300 py-6 px-6 rounded-sm bg-slate-50">
            <h1 className="uppercase w-full text-center mb-5 text-2xl border-b-2 border-solid border-b-slate-300">Fiche d'intervention : Création</h1>
            <label className="border-b border-solid border-b-slate-300 text-lg">Date de l'intervention : </label><br /><input  className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="date" required placeholder="date" value={dateIntervention_vdev} onChange={(e) => setDateIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Heure de l'intervention : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="time" step="1" required placeholder="heure" value={heureIntervention_vdev} onChange={(e) => setHeureIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Technicien en charge : </label><br />
            <select value={matriculeEmploye_vdev} onChange={(e) => setMatriculeEmploye(e.target.value)}>
                <option value="">-- Choisir un technicien --</option>
                {lesTechniciens.map((tech, i) => (
                    <option key={i} value={tech.matriculeEmploye_vdev}>{tech.matriculeEmploye_vdev} - {tech.nom_vdev} {tech.prenom_vdev}</option>
                ))}
            </select>
            <br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Numéro de série du matériel : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="num de série" value={numSerie_vdev} onChange={(e) => setNumSerieMateriel(e.target.value)}/><br/>
            <input value="Pré-visualiser les détails de l'intervention" className="bg-rose-700 hover:bg-rose-950 hover:text-white py-2 px-4 rounded-full cursor-pointer" onClick={CreaInterv}/>
            {error && <p className="text-center mt-4 w-full text-red-500">{error}</p>}
        </form>
        </div>
    }
    {
        intervStep==='2' &&
        <InterventionConfirmation datas={data} />
    }
    </>
}