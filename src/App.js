import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Error from "./Pages/Error";
import Profil from "./Pages/Profil";
import FichesEnCours from "./Pages/FichesEnCours";
import MesFiches from "./Pages/MesFiches";
import Statistiques from "./Pages/Statistiques";
import InterventionCreation from "./Pages/InterventionCreation";
import InterventionPreVisualisation from "./Pages/InterventionPreVisualisation";
import InterventionValidation from "./Pages/InterventionValidation";
import InterventionDetail from "./Pages/InterventionDetail";
import Connexion from "./Pages/Connexion";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="mes_fiches" element={<MesFiches />} />
          <Route path="fiche-detail/:id" element={<InterventionDetail />} />
          <Route path="fiche_en_cours" element={<FichesEnCours />} />
          <Route path="profil" element={<Profil />} />
          <Route path="statistiques" element={<Statistiques />} />
          <Route path="*" element={<Error />} />
          <Route path="creation-intervention" element={<InterventionCreation />} />
          <Route path="preview-intervention" element={<InterventionPreVisualisation />} />
          <Route path="validation-intervention" element={<InterventionValidation />} />
          <Route index element={<Connexion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
