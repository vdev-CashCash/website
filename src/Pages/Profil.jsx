import { useNavigate } from "react-router-dom";

export default function Profil(){
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
                <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
}