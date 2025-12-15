import './InterventionValidation.css'

export default function InterventionValidation() {
    return (
        <div className="page">
            <div className="sheet">
                <h1>FICHE D'INTERVENTION : VALIDATION</h1>

                <h3>Information de l'intervention :</h3>
                <p>Date Intervention : <input type="text" placeholder="JJ/MM/AAAA" /></p>
                <p>Heure Intervention : <input type="text" placeholder="hh:mm" /></p>
                <p>Temps passé (Durée) : <input type="text" placeholder="hh:mm" /></p>

                <h3>Information sur le matériel :</h3>
                <p>Numéro de série matériel : <input type="text" placeholder="numéro de série" /></p>
                <p>Emplacement du matériel : <input type="text" placeholder="emplacement" /></p>

                <h3>Information sur le client :</h3>
                <p>Adresse : <input type="text" placeholder="adresse" /></p>
                <p>Durée du déplacement : <input type="text" placeholder="durée" /></p>
                <p>Téléphone : <input type="text" placeholder="téléphone" /></p>

                <h3>Information sur le technicien :</h3>
                <p>Matricule : <input type="text" placeholder="matricule" /></p>
                <p>Nom : <input type="text" placeholder="nom" /></p>
                <p>Prénom : <input type="text" placeholder="prénom" /></p>

                <h3>Commentaire :</h3>
                <p><input type="text" placeholder="Entrez un commentaire..." /></p>

                <p><button className="btn">Pré-visualiser les détails</button></p>
            </div>
        </div>
    )
}