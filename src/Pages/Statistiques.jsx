import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Statistiques() {
  const [datas, setData] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const matricule = payload.sub;
      const userRole = payload.roles[0];
      const agence = payload.agence;
      setRole(userRole);

      const lien = userRole === "Technicien"
        ? `http://localhost:8080/intervention/getStatEmploye/${matricule}`
        : `http://localhost:8080/intervention/getStats/${agence}`;

      const response = await fetch(lien, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) { navigate("/"); return; }
      if (!response.ok) { console.error("Erreur serveur"); return; }

      const ldata = await response.json();
      setData(ldata);
    };
    fetchStats();
  }, []);

  // Technicien : barres Interventions vs Distance pour lui seul
  const chartDataTechnicien = datas ? [
    { x: 'Interventions', y: datas.nbIntervention_vdev },
    { x: 'Distance (km)',  y: datas.nbDistance_vdev },
  ] : [];

  // Manager : une barre par employé (nb interventions)
  const chartDataManager = Array.isArray(datas)
    ? datas.map(emp => ({
        x: emp.nomEmploye_vdev,
        y: emp.nbIntervention_vdev,
        label: `${emp.nomEmploye_vdev}\n${emp.nbIntervention_vdev} interventions`,
      }))
    : [];

  // Manager : distance par employé
  const chartDataManagerDist = Array.isArray(datas)
    ? datas.map(emp => ({
        x: emp.nomEmploye_vdev,
        y: emp.nbDistance_vdev,
        label: `${emp.nomEmploye_vdev}\n${emp.nbDistance_vdev} km`,
      }))
    : [];

  if (!datas) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="w-screen h-full flex flex-col items-center p-6 gap-8">

      {role === "Technicien" && (
        <div className="w-full max-w-lg">
          <h2 className="text-lg font-medium text-center mb-2">Mes statistiques</h2>
          <VictoryChart theme={VictoryTheme.material} domainPadding={40}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={chartDataTechnicien}
              style={{ data: { fill: '#185FA5' } }}
              labels={({ datum }) => datum.y}
              labelComponent={<VictoryTooltip />}
            />
          </VictoryChart>
        </div>
      )}

      {role !== "Technicien" && (
        <>
          <div className="w-full max-w-2xl">
            <h2 className="text-lg font-medium text-center mb-2">Interventions par technicien</h2>
            <VictoryChart theme={VictoryTheme.material} domainPadding={30}>
              <VictoryAxis style={{ tickLabels: { angle: -30, fontSize: 10 } }} />
              <VictoryAxis dependentAxis />
              <VictoryBar
                data={chartDataManager}
                style={{ data: { fill: '#185FA5' } }}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryChart>
          </div>

          <div className="w-full max-w-2xl">
            <h2 className="text-lg font-medium text-center mb-2">Distance parcourue par technicien (km)</h2>
            <VictoryChart theme={VictoryTheme.material} domainPadding={30}>
              <VictoryAxis style={{ tickLabels: { angle: -30, fontSize: 10 } }} />
              <VictoryAxis dependentAxis />
              <VictoryBar
                data={chartDataManagerDist}
                style={{ data: { fill: '#3B6D11' } }}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryChart>
          </div>
        </>
      )}

    </div>
  );
}