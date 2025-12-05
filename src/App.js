import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import Layout from "./Layout";
import Error from "./Pages/Error";
import Profil from "./Pages/Profil";
import FichesEnCours from "./Pages/FichesEnCours";
import RechercheFiches from "./Pages/RechercheFiches";
import MesFiches from "./Pages/MesFiches";
import Statistiques from "./Pages/Statistiques";
import InterventionCreation from "./Pages/InterventionCreation";
import InterventionPreVisualisation from "./Pages/InterventionPreVisualisation";
import InterventionConfirmation from "./Pages/InterventionConfirmation";
import InterventionValidation from "./Pages/InterventionValidation";
import Connexion from "./Pages/Connexion";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/connexion" element={<Accueil />} />
          <Route path="/mes_fiches" element={MesFiches} />
          <Route path="/fiche_en_cours" element={FichesEnCours} />
          <Route path="/" element={RechercheFiches} />
          <Route path="/recherche_fiches" element={RechercheFiches} />
          <Route path="/profil" element={Profil} />
          <Route path="statistiques" element={Statistiques} />
          <Route path="*" element={<Error />} />
          <Route path="/creation-intervention" element={<InterventionCreation />} />
          <Route path="/preview-intervention" element={<InterventionPreVisualisation />} />
          <Route path="/confirmation-intervention" element={<InterventionConfirmation />} />
          <Route path="/validation-intervention" element={<InterventionValidation />} />
          <Route path="/connexion" element={<Connexion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
