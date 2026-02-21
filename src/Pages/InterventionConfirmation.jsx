import { useState } from "react";
import SuppressionIntervention from "../Components/SuppressionIntervention";
import ChangementInfosIntervention from "../Components/ChangementInfosIntervention";

export default function InterventionConfirmation({ datas }) {
    const [dateIntervention_vdev, setDateIntervention] = useState(datas.dateIntervention_vdev);
    const [heureIntervention_vdev, setHeureIntervention] = useState(datas.heureIntervention_vdev);
    const [numSerieMateriel_vdev, setNumSerieMateriel] = useState(datas.numSerie_vdev);
    const [emplacementMateriel_vdev, setEmplacementMateriel] = useState(datas.emplacement_vdev);
    const [adresseClient_vdev, setAdresseClient] = useState(datas.adressePostale_vdev);
    const [dureeDeplacementClient_vdev, setDureeDeplacementClient] = useState(datas.dureeDeplacement_vdev);
    const [distanceAgenceClient_vdev, setDistanceAgenceClient] = useState(datas.distanceAgenceClient_vdev);
    const [telephoneClient_vdev, setTelephoneClient] = useState(datas.telephone_vdev);
    const [emailClient_vdev, setEmailClient] = useState(datas.mail_vdev);
    const [matriculeTech_vdev, setMatriculeTech] = useState(datas.matriculeTechnicien_vdev);
    const [nomTech_vdev, setNomTech] = useState(datas.nom_vdev);
    const [prenomTech_vdev, setPrenomTech] = useState(datas.prenom_vdev);

    return <div id="confirmation-intervention" className="flex flex-wrap place-content-center min-h-screen">
        <form className="border-2 border-solid border-slate-300 py-6 px-6 rounded-sm bg-slate-50">
            <h1 className="uppercase w-full text-center mb-5 text-2xl border-b-2 border-solid border-b-slate-300">Fiche d'intervention : Confirmation</h1>
            <label className="border-b border-solid border-b-slate-300 text-lg">Date de l'intervention : </label><br /><input  className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="date" required placeholder="date" value={dateIntervention_vdev} onChange={(e) => setDateIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Heure de l'intervention : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="time" required placeholder="heure" value={heureIntervention_vdev} onChange={(e) => setHeureIntervention(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Numéro de série du matériel : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="num de série" value={numSerieMateriel_vdev} /><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Emplacement du matériel : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="emplacement matériel" value={emplacementMateriel_vdev} /><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Adresse du client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="adresse client" value={adresseClient_vdev} /><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Durée du déplacement client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="durée déplacement client" value={dureeDeplacementClient_vdev} /><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Distance agence-client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="number" required placeholder="distance agence-client" value={distanceAgenceClient_vdev} /><br/> {/*Distance en Km*/}
            <label className="border-b border-solid border-b-slate-300 text-lg">Téléphone client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="téléphone client" value={telephoneClient_vdev} /><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Email client : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="email client" value={emailClient_vdev} /><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Matricule du technicien : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="matricule" value={matriculeTech_vdev} onChange={(e) => setMatriculeTech(e.target.value)}/><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Nom du technicien : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" placeholder="nom technicien" value={nomTech_vdev} /><br/>
            <label className="border-b border-solid border-b-slate-300 text-lg">Prénom du technicien : </label><br /><input className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" placeholder="prénom technicien" value={prenomTech_vdev} /><br/>
            <ChangementInfosIntervention numIntervention_vdev={datas.numIntervention_vdev} dateVisite_vdev={dateIntervention_vdev} heureVisite_vdev={heureIntervention_vdev} matriculeEmploye_vdev={matriculeTech_vdev} />
            <input value="Continuer" className="bg-rose-700 text-center hover:bg-rose-950 hover:text-white py-2 px-4 rounded-full cursor-pointer" onClick={(e) => window.location.href="/creation-intervention"} />
            <SuppressionIntervention datas={datas} />
        </form>
    </div>
}