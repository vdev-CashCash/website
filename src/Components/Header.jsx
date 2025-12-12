import { Link } from "react-router-dom";
import logo from "../imgs/cashcashlogo.png";
import profil_icon from "../Components/Assets/profil.png";

export default function Header() {
    return (
        <header className="grid grid-cols-6 justify-center items-center border-b-2 border-b-red-500 w-screen">
            <img src={logo} alt="CashCash" className="w-28" />
            <Link to="/mes_fiches" className="justify-self-center border-2 border-slate-300 bg-slate-50 rounded-md p-2 hover:bg-white hover:border-slate-100 hover:text-slate-800"><button className="uppercase font-semibold">Mes fiches</button></Link>
            <Link to="/recherche_fiches" className="justify-self-center border-2 border-slate-300 bg-slate-50 rounded-md p-2 hover:bg-white hover:border-slate-100 hover:text-slate-800"><button className="uppercase font-semibold">Rechercher une fiche</button></Link>
            <Link to="/fiche_en_cours" className="justify-self-center border-2 border-slate-300 bg-slate-50 rounded-md p-2 hover:bg-white hover:border-slate-100 hover:text-slate-800"><button className="uppercase font-semibold">En cours</button></Link>
            <Link to="/statistiques" className="justify-self-center border-2 border-slate-300 bg-slate-50 rounded-md p-2 hover:bg-white hover:border-slate-100 hover:text-slate-800"><button className="uppercase font-semibold">Statistiques</button></Link>
            <Link to="/profil" className="justify-self-end pr-5"><img src={profil_icon} alt="" className="w-10 h-10 object-cover rounded-full cursor-pointer"/></Link>
        </header>
    )
}