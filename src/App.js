import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import Layout from "./Layout";
import Error from "./Pages/Error";
<<<<<<< HEAD
import InterventionCreation from "./Pages/InterventionCreation";
import InterventionPreVisualisation from "./Pages/InterventionPreVisualisation";
import InterventionConfirmation from "./Pages/InterventionConfirmation";
import InterventionValidation from "./Pages/InterventionValidation";
=======
import Connexion from "./Pages/Connexion";
>>>>>>> 2996af6644e469f166820aaf400796e3ccd5739b

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="*" element={<Error />} />
<<<<<<< HEAD
          <Route path="/creation-intervention" element={<InterventionCreation />} />
          <Route path="/preview-intervention" element={<InterventionPreVisualisation />} />
          <Route path="/confirmation-intervention" element={<InterventionConfirmation />} />
          <Route path="/validation-intervention" element={<InterventionValidation />} />
=======
          <Route path="/connexion" element={<Connexion />} />
>>>>>>> 2996af6644e469f166820aaf400796e3ccd5739b
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
