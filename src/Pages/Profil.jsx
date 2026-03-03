import { useNavigate } from "react-router-dom";

export default function Profil(){
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    const nom = payload.nom;
    const prenom = payload.prenom;
    const roles = payload.roles[0];
    const matricule = payload.sub;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
<div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Nom :</span>
                        <span className="text-right">{nom}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Prénom :</span>
                        <span className="text-right">{prenom}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Role :</span>
                        <span className="text-right">{roles}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Matricule :</span>
                        <span className="text-right">{matricule}</span>
                    </div>
                </div>
                <br />
                <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition">
                    Déconnexion
                </button>
            </div>
        </div>
    );
}