import { useState, useEffect, useRef } from "react";
import InterventionValidation from "./InterventionValidation";
import html2pdf from "html2pdf.js";

export default function InterventionPreVisualisation() {
    const [step, setStep] = useState('1');
    const [commentaire, setCommentaire] = useState("");
    const [tempsPasse, setTempsPasse] = useState(0);
    const [datas, setDatas] = useState({});

        const numIntervention_vdev = 76;
        useEffect((e) => {    
            fetch(`http://localhost:8080/intervention/getDetailsInterv/${numIntervention_vdev}`, {
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                 },
            })
            .then(res => res.json())
            .then(data => setDatas(data))

            fetch(`http://localhost:8080/intervention/getCommentaireTP/${numIntervention_vdev}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(resB => resB.json())
            .then(dataB => setCommentaire(dataB.commentaire_vdev) & setTempsPasse(dataB.tempPasse_vdev))
        }, [])


        const options = {
            filename: `intervention-${numIntervention_vdev}.pdf`,
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

    return <>
            {
            step==="1" &&
                <div id="preview-intervention" className="flex flex-wrap place-content-center min-h-screen">
                    <form className="border-2 border-solid border-slate-300 py-6 px-6 rounded-sm bg-slate-50" ref={contentRef}>
                        <h1 className="uppercase w-full text-center mb-5 text-2xl border-b-2 border-solid border-b-slate-300">Fiche d'intervention : Pré-visualisation</h1>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Date de l'intervention : </label><br /><p  className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="date" required placeholder="date">{datas.dateIntervention_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Heure de l'intervention : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="time" required placeholder="heure">{datas.heureIntervention_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Numéro de série du matériel : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="num de série">{datas.numSerie_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Emplacement du matériel : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="emplacement matériel">{datas.emplacement_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Adresse du client : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="adresse client">{datas.adressePostale_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Durée du déplacement client : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="durée déplacement client">{datas.dureeDeplacement_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Distance agence-client : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="number" required placeholder="distance agence-client">{datas.distanceAgenceClient_vdev}</p><br/> {/*Distance en Km*/}
                        <label className="border-b border-solid border-b-slate-300 text-lg">Téléphone client : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="téléphone client">{datas.telephone_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Email client : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="email client">{datas.mail_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Matricule du technicien : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="matricule">{datas.matriculeTechnicien_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Nom du technicien : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="nom technicien">{datas.nom_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Prénom du technicien : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="prénom technicien">{datas.prenom_vdev}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Commentaire : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="commentaire">{commentaire}</p><br/>
                        <label className="border-b border-solid border-b-slate-300 text-lg">Temps passé : </label><br /><p className="border-dotted border-b-[3px] border-b-slate-500 mb-4" type="text" required placeholder="temps passé">{tempsPasse} minutes</p><br/>
                        <button onClick={convertToPdf} className="bg-rose-700 hover:bg-rose-950 hover:text-white py-2 px-4 rounded-full cursor-pointer">Convertir en PDF</button>
                        {
                            JSON.parse(atob(localStorage.getItem('token').split('.')[1])).roles[0]==="Technicien" && commentaire === "" && tempsPasse === 0 &&
                            <button className="bg-green-700 hover:bg-green-950 hover:text-white py-2 px-4 rounded-full cursor-pointer" onClick={() => setStep('2')}>Terminer la fiche</button>
                        }
                    </form>
                </div>
            }

            {
                step==="2" && <InterventionValidation datas={datas} />
            }
            </>
}