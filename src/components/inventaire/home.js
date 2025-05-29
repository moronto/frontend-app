import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { API_URL } from "../../Config";

export default function Home() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
    values: Array(12).fill(0),
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const resp = await fetch(`${API_URL}/api/statistics/`);

        if (!resp.ok) {
          throw new Error(`Erreur HTTP: ${resp.status}`);
        }

        const data = await resp.json();
        setStatistics(data);

        // Calcul des données pour le graphique
        const monthlyData = data.reduce((acc, item) => {
          const date = new Date(item.dateMovement);
          const monthIndex = date.getMonth();
          acc[monthIndex]++;
          return acc;
        }, Array(12).fill(0));

        setChartData((prev) => ({
          ...prev,
          values: monthlyData,
        }));
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    if (loading || !chartRef.current) return;

    // Détruire l'ancien graphique s'il existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Créer le nouveau graphique
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Évolution des locations",
            data: chartData.values,
            borderWidth: 2,
            backgroundColor: "rgba(0, 255, 255, 0.7)",
            borderColor: "rgba(0, 200, 200, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Nombre de locations",
            },
          },
          x: {
            title: {
              display: true,
              text: "Mois",
            },
          },
        },
      },
    });

    // Nettoyage
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [loading, chartData]);

  if (loading) {
    return <div>Chargement des statistiques...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Statistiques des locations</h1>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "500px",
          margin: "0 auto",
        }}
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
