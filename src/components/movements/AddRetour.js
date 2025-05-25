import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AddEntrer() {
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");
  const [materiel, setMateriel] = useState([]);
  const [infoMove, setInfoMove] = useState({
    typeMovement: "ENTREE",
    dateMovement: new Date().toISOString().split("T")[0],
    typeLocation: "",
    depot: "",
    qte: 1,
    matTrans: "",
    condTrans: "",
    observations: "",
  });

  // Find designation of ref and check if ref exists
  const fetchMovement = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/infoMateriel/${inputSearch}`
      );
      if (!response.ok) {
        // throw new Error("Pardon ce mouvement n'existe pas");
        setMateriel([]);
      }
      const data = await response.json();
      setMateriel(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setSearch(inputSearch);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const param = {
      refMateriel: materiel.refMateriel,
      designation: materiel.designation,
      lieu: infoMove.depot,
      ville: materiel.lieu,
      ...infoMove,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/retirerMateriel/",
        param,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      navigate("/movements", {
        state: {
          msg: data.msg,
        },
      });
    } catch (error) {
      alert(`Erreur: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container w-75 py-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">
            <i className="fas fa-arrow-right me-2"></i>
            Retirer Matériel
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Référence Matériel
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="refMateriel"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    onBlur={fetchMovement}
                    placeholder="Entrez la référence du matériel"
                    required
                  />
                </div>
              </div>
            </div>

            {materiel ? (
              materiel.situation === "LOUER" ? (
                <div className="mt-1">
                  <div className="card bg-light mb-4">
                    <div className="card-header bg-dark text-white">
                      <h3 className="h6 mb-0">Détails du Matériel</h3>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <p className="fw-bold">Désignation:</p>
                          <p>{materiel.designation}</p>
                        </div>
                        <div className="col-md-4">
                          <p className="fw-bold">Situation:</p>
                          <p>{materiel.situation}</p>
                        </div>
                        <div className="col-md-4">
                          <p className="fw-bold">Client:</p>
                          <p>{materiel.client}</p>
                        </div>
                      </div>

                      <div className="border-top pt-3">
                        <h4 className="h5 mb-3">Informations de Retrait</h4>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">
                              Date de Retrait
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={infoMove.dateMovement}
                              onChange={(e) => {
                                setInfoMove({
                                  ...infoMove,
                                  dateMovement: e.target.value,
                                });
                              }}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">
                              Type De Location
                            </label>
                            <select
                              className="form-select"
                              value={infoMove.typeLocation}
                              onChange={(e) => {
                                setInfoMove({
                                  ...infoMove,
                                  typeLocation: e.target.value,
                                });
                              }}
                              required
                            >
                              <option value="">Sélectionnez...</option>
                              <option value="chantier">CHANTIER</option>
                              <option value="evenement">EVENEMENT</option>
                              <option value="transfer">TRANSFERT</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Dépôt</label>
                            <select
                              className="form-select"
                              value={infoMove.depot}
                              onChange={(e) => {
                                setInfoMove({
                                  ...infoMove,
                                  depot: e.target.value,
                                });
                              }}
                              required
                            >
                              <option value="">Sélectionnez...</option>
                              <option value="BOUSKORA">BOUSKORA</option>
                              <option value="BERRCHID">BERRCHID</option>
                              <option value="EL JORF">EL JORF</option>
                              <option value="MARRAKECH">MARRAKECH</option>
                            </select>
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">
                              Matricule Transport
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={infoMove.matTrans}
                              onChange={(e) => {
                                setInfoMove({
                                  ...infoMove,
                                  matTrans: e.target.value,
                                });
                              }}
                              placeholder="Ex: 1234-A-6"
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">
                              Conducteur transport
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={infoMove.condTrans}
                              onChange={(e) => {
                                setInfoMove({
                                  ...infoMove,
                                  condTrans: e.target.value,
                                });
                              }}
                              placeholder="Conducteur "
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">
                              Observations
                            </label>
                            <textarea
                              className="form-control"
                              value={infoMove.observations}
                              onChange={(e) => {
                                setInfoMove({
                                  ...infoMove,
                                  observations: e.target.value,
                                });
                              }}
                              rows="3"
                              placeholder="Notes supplémentaires..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : materiel.situation === "DISPONIBLE" ? (
                <div className="alert alert-warning mt-3">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Ce matériel est déja disponible !
                </div>
              ) : search && !materiel.situation ? (
                <div className="alert alert-info mt-3">
                  <i className="fas fa-info-circle me-2"></i>
                  Aucun matériel trouvé avec cette référence
                </div>
              ) : (
                <div></div>
              )
            ) : null}
          </div>

          {materiel && materiel.situation === "LOUER" && (
            <div className="card-footer bg-light">
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-danger px-4">
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Retirer
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
