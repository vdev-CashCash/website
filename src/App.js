import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import Layout from "./Layout";
import Error from "./Pages/Error";
import Connexion from "./Pages/Connexion";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="*" element={<Error />} />
          <Route path="/connexion" element={<Connexion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
