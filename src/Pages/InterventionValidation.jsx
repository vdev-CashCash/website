import './InterventionValidation.css'

export default function InterventionValidation() {
    return (
        <main className="iv-page">
            <div className="iv-card">
                <h1 className="iv-title">Fiche d'intervention : Validation</h1>

                <section className="iv-section">
                    <h2 className="iv-section-title">Information de l'intervention :</h2>

                    <label className="iv-label">Date Intervention :
                        <input className="iv-field" type="text" placeholder="JJ/MM/AAAA" />
                    </label>

                    <label className="iv-label">Heure Intervention :
                        <input className="iv-field" type="text" placeholder="hh:mm" />
                    </label>

                    <label className="iv-label">Temps passé (Durée) :
                        <input className="iv-field" type="text" placeholder="hh:mm" />
                    </label>
                </section>

                <section className="iv-section">
                    <h2 className="iv-section-title">Information sur le matériel :</h2>

                    <label className="iv-label">Numéro de série matériel :
                        <input className="iv-field" type="text" placeholder="numéro de série" />
                    </label>

                    <label className="iv-label">Emplacement du matériel :
                        <input className="iv-field" type="text" placeholder="emplacement" />
                    </label>
                </section>

                <section className="iv-section">
                    <h2 className="iv-section-title">Information sur le client :</h2>

                    <label className="iv-label">Adresse :
                        <input className="iv-field" type="text" placeholder="adresse" />
                    </label>

                    <label className="iv-label">Durée du déplacement :
                        <input className="iv-field" type="text" placeholder="durée" />
                    </label>

                    <label className="iv-label">Téléphone :
                        <input className="iv-field" type="text" placeholder="téléphone" />
                    </label>
                </section>

                <section className="iv-section">
                    <h2 className="iv-section-title">Information sur le technicien :</h2>

                    <label className="iv-label">Matricule :
                        <input className="iv-field" type="text" placeholder="matricule" />
                    </label>

                    <label className="iv-label">Nom :
                        <input className="iv-field" type="text" placeholder="nom" />
                    </label>

                    <label className="iv-label">Prénom :
                        <input className="iv-field" type="text" placeholder="prénom" />
                    </label>
                </section>

                <section className="iv-section">
                    <h2 className="iv-section-title">Commentaire :</h2>
                    <label className="iv-label">
                        <input className="iv-field" type="text" placeholder="Entrez un commentaire..." />
                    </label>
                </section>

                <div className="iv-actions">
                    <button className="iv-button">Pré-visualiser les détails</button>
                </div>
            </div>
        </main>
    );
}