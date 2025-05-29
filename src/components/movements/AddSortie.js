import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./AddSortie.css";
import { API_URL } from "../../Config";

export default function AddSortie() {
  const [msgErreur, setMsgErreur] = useState({ etat: false, msg: "" });
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    typeMovement: "SORTIE",
    dateMovement: new Date().toISOString().split("T")[0],
    typeLocation: "",
    depot: "",
    refMateriel: "",
    designation: "",
    qte: 1,
    ville: "",
    lieu: "",
    matTrans: "",
    condTrans: "",
    observations: "",
  });
  const [materiel, setMateriel] = useState([]);

  //find designation of ref and check if ref is exixte
  useEffect(() => {
    const fetchMovement = async () => {
      const response = await fetch(`${API_URL}/api/stock/`);
      const data = await response.json();
      setMateriel(data);
      const f = data.find((d) => d.refMateriel === dataForm.refMateriel);

      if (f) {
        setDataForm({ ...dataForm, designation: f.designation });
      } else {
        setDataForm({ ...dataForm, designation: "" });
      }
    };
    fetchMovement();
  }, [dataForm.refMateriel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsgErreur({ etat: "false", msg: "" });

    const resp = await fetch(`${API_URL}/api/stock/${dataForm.refMateriel}`);
    const d = await resp.json();
    console.log(d);
    try {
      if (resp.ok) {
        if (d.situation === "LOUER") {
          setMsgErreur({ etat: true, msg: "Ce réfernce est deja en location" });

          return;
        } else if (d.situation === "VENTE") {
          setMsgErreur({ etat: true, msg: "Ce Réference été vendu" });

          return;
        } else if (d.situation === "A VERFIER") {
          setMsgErreur({
            etat: true,
            msg: "Ce Réference est en verifications",
          });
        }
      } else {
        setMsgErreur({
          etat: true,
          msg: "Ce Reference n'est existe pas dans le stock",
        });

        return;
      }
    } catch (error) {
      throw new Error(error);
    }

    const param = {
      ...dataForm,
    };
    console.log(param);
    try {
      const response = await axios.post(`${API_URL}/api/addSortie/`, param, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/movements", {
        state: {
          msg: "Vous avez ajouté " + dataForm.refMateriel + " avec succès",
        },
      });
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Erreur: ${error.response?.data?.message || error.message}`);
    }

    // Ajoutez ici votre logique de soumission
    // displayAlert('Succès', 'Le mouvement a été enregistré avec succès');
  };

  return (
    <div className="container w-75 py-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">
            <i className="fas fa-arrow-left me-2"></i>
            Nouveau Sortie
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row ">
              {/* Colonne de gauche */}
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label fw-bold">Date de Sortie</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateMovement"
                    value={dataForm.dateMovement}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        dateMovement: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Type de Location</label>
                  <select
                    className="form-select"
                    name="typeLocation"
                    value={dataForm.typeLocation}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        typeLocation: e.target.value,
                      });
                    }}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="CHANTIER">CHANTIER</option>
                    <option value="EVENEMENT">EVENEMENT</option>
                    <option value="VENTE">VENTE</option>
                    <option value="A VERFIER">A VERFIER</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Référence Matériel
                  </label>
                  <input
                    type="text"
                    list="refs"
                    className={`form-control ${
                      msgErreur.etat && dataForm.refMateriel !== null
                        ? "notvalid-input"
                        : ""
                    }`}
                    id="refMateriel"
                    value={dataForm.refMateriel}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, refMateriel: e.target.value });
                      setMsgErreur({ etat: false, msg: "" });
                    }}
                    autoComplete="off"
                  />
                  <p
                    className={
                      msgErreur ? "text-danger notvalid " : "text-danger"
                    }
                    style={{ display: msgErreur.etat ? "block" : "none" }}
                  >
                    {msgErreur.msg}
                  </p>
                  <datalist id="refs" style={{ display: "none" }}>
                    {materiel.map((d) => (
                      <option key={d.refMateriel} value={d.refMateriel}>
                        {d.refMateriel}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Désignation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    name="designation"
                    value={dataForm.designation}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, designation: e.target.value });
                    }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Quantité</label>
                  <input
                    name="qte"
                    type="number"
                    className="form-control"
                    min="1"
                    defaultValue="1"
                    value={dataForm.qte}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, qte: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Dépôt</label>
                  <select
                    className="form-select"
                    name="depot"
                    value={dataForm.depot}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, depot: e.target.value });
                    }}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="BOUSKORA">BOUSKORA</option>
                    <option value="BERRCHID">BERRCHID</option>
                    <option value="EL JORF">EL JORF</option>
                    <option value="MARRAKECH">MARRAKECH</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Ville</label>
                  <input
                    className="form-control"
                    name="ville"
                    value={dataForm.ville}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, ville: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Lieu de location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lieu"
                    id="lieu"
                    value={dataForm.lieu}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, lieu: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Matricule Transport
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="matTrans"
                    value={dataForm.matTrans}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, matTrans: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Conducteur transport
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="condTrans"
                    value={dataForm.condTrans}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, condTrans: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Observations</label>
                  <textarea
                    className="form-control"
                    name="observations"
                    // rows="3"
                    value={dataForm.observations}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        observations: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row"></div>
          </div>

          <div className="card-footer bg-light">
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success px-4">
                <i className="fas fa-save me-2"></i>
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
