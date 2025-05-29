import { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";
import { API_URL } from "../../Config";

export default function Stock() {
  // State management
  const [dataStock, setDataStock] = useState([]);
  const [dataStockFiltered, setDataStockFiltred] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputSearch, setInputSearch] = useState("");

  // Fetch stock data on component mount
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stock/`);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        setDataStock(data);
        setDataStockFiltred(data);
        console.log("data", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  //serach data with bar serach
  useEffect(() => {
    if (inputSearch.trim() === "") {
      setDataStockFiltred(dataStock);
    } else {
      const dataF = dataStock.filter((d) => {
        return (
          d.refMateriel?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.designation?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.lieu?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.situation?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.categorie?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.ville?.toLowerCase().includes(inputSearch.toLowerCase())
        );
      });
      setDataStockFiltred(dataF);
    }
  }, [inputSearch, dataStock]);
  // Handle item deletion
  const handleDelete = async (ref) => {
    // Créer un élément de modal stylisé
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    // Contenu de la modal
    modal.innerHTML = `
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          width: 400px;
          max-width: 90%;
        ">
          <h3 style="margin-top: 0; color: #dc3545;">
            <i class="fas fa-exclamation-triangle"></i> Confirmation
          </h3>
          <p>Êtes-vous sûr de vouloir supprimer cet élément ? </p>
          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
            <button id="cancelBtn" style="
              padding: 0.5rem 1rem;
              background: #6c757d;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">
              Annuler
            </button>
            <button id="confirmBtn" style="
              padding: 0.5rem 1rem;
              background: #dc3545;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">
              Confirmer
            </button>
          </div>
        </div>
      `;

    // Ajouter la modal au DOM
    document.body.appendChild(modal);

    // Gérer la réponse de manière asynchrone
    return new Promise((resolve) => {
      const confirmBtn = modal.querySelector("#confirmBtn");
      const cancelBtn = modal.querySelector("#cancelBtn");

      const cleanup = () => {
        document.body.removeChild(modal);
      };

      confirmBtn.onclick = async () => {
        cleanup();
        try {
          const response = await fetch(` ${API_URL}/api/stock/${ref}/`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Échec de la suppression");
          }

          // Mettre à jour l'état après suppression
          setDataStock((prev) =>
            prev.filter((item) => item.refMateriel !== ref)
          );
          resolve(true);
        } catch (err) {
          setError(err.message);
          resolve(false);
        }
      };

      cancelBtn.onclick = () => {
        cleanup();
        resolve(false);
      };
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement en cours...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="alert alert-danger mt-4 mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <i className="fas fa-exclamation-circle me-2"></i>
        Erreur: {error}
      </div>
    );
  }

  // Main render
  return (
    <div className="container-fluid p-4 bg-light rounded-3 shadow-sm ">
      <div className="card border-0 shadow ">
        <div className="card-header bg-primary text-white ">
          <h1 className="h3 mb-0 text-center">
            <i className="fas fa-boxes me-2"></i>
            INVENTAIRE GÉNÉRAL
          </h1>
        </div>
        {/* Barre de recherche */}
        <div className="card mb-4 shadow-sm sticky-top">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <label htmlFor="search" className="form-label fw-bold">
                  Rechercher :
                </label>
              </div>
              <div className="col-md-9">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    id="searchMouvement"
                    type="text"
                    className="form-control"
                    placeholder="Tapez pour filtrer..."
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table header */}
        <div className="card-body p-0">
          <div className="row g-0 bg-dark text-white p-2 fw-bold">
            <div className="col-md-2 ps-3">Référence</div>
            <div className="col-md-3">Désignation</div>
            <div className="col-md-1">Situation</div>
            <div className="col-md-2">Emplacement</div>
            <div className="col-md-2">Ville</div>
            <div className="col-md-2 text-center">Actions</div>
          </div>

          {/* Table body */}
          <div className="list-group list-group-flush">
            {dataStockFiltered.length > 0 ? (
              dataStockFiltered.map((data) => (
                <div
                  className="row g-0 list-group-item d-flex align-items-center py-2 border-bottom"
                  key={data.refMateriel}
                >
                  <div className="col-md-2 ps-3">{data.refMateriel}</div>
                  <div className="col-md-3 text-truncate">
                    {data.designation}
                  </div>
                  <div className="col-md-1">
                    <span
                      className={`d-block py-2 me-2 badge bg-${
                        data.situation === "DISPONIBLE" ? "success" : "danger"
                      }`}
                    >
                      {data.situation}
                    </span>
                  </div>
                  <div className="col-md-2">{data.lieu}</div>
                  <div className="col-md-2">{data.ville}</div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <Link
                      to={`/stocks/${data.refMateriel}`}
                      className="text-decoration-none mx-2"
                      title="Détails"
                    >
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-file-alt"></i>
                      </button>
                    </Link>
                    <Link
                      to={`update/${data.refMateriel}`}
                      className="text-decoration-none mx-2"
                      title="Modifier"
                    >
                      <button className="btn btn-sm btn-outline-warning">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(data.refMateriel)}
                      className="btn btn-sm btn-outline-danger mx-2"
                      title="Supprimer"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-4x text-muted mb-3"></i>
                <h3 className="text-muted">Aucun résultat à afficher</h3>
                <p className="text-muted">
                  Votre inventaire est vide pour le moment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}