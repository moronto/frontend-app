import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function UpdateStock() {
    const { ref } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // State management
    const [displayBloc, setDisplayBloc] = useState({ GE: "none", MOD: "none", CAB: "none" });
    const [btnSubmit, setBtnSubmit] = useState(true);

    const [dataStock, setDataStock] = useState({
      refMateriel: "",
      designation: "",
      situation: "DISPONIBLE",
      lieu: "",
      categorie: "",
      ville: "",
    });

    const [detailGE, setDetailGE] = useState({
      puissance: "",
      marque: "",
      dimension: "",
    });

    const [detailCAB, setDetailCAB] = useState({
      gamme: "",
      dimension: "",
      color: "",
    });

    const [detailMOD, setDetailMOD] = useState({
      gamme: "",
      dimension: "",
    });

    // Form validation
    useEffect(() => {
      const commonFieldsFilled =
        dataStock.refMateriel.trim() !== "" &&
        dataStock.designation.trim() !== "" &&
        dataStock.lieu.trim() !== "" &&
        (dataStock.ville === null || dataStock.ville.trim() !== "") &&
        dataStock.categorie.trim() !== "";

      let specificFieldsFilled = false;

      switch (dataStock.categorie) {
        case "GROUPE ELECTROGENE":
          specificFieldsFilled =
            detailGE.puissance.trim() !== "" &&
            detailGE.marque.trim() !== "" &&
            detailGE.dimension.trim() !== "";
          break;
        case "MODULAIRE":
          specificFieldsFilled =
            detailMOD.gamme.trim() !== "" && detailMOD.dimension.trim() !== "";
          break;
        case "CABINES AUTONOMES":
          specificFieldsFilled =
            detailCAB.gamme.trim() !== "" &&
            detailCAB.dimension.trim() !== "" &&
            detailCAB.color.trim() !== "";
          break;
        default:
          specificFieldsFilled = false;
      }

      setBtnSubmit(!(commonFieldsFilled && specificFieldsFilled));
    }, [dataStock, detailGE, detailCAB, detailMOD]);

    // Fetch data
    useEffect(() => {
      const fetchUpdateStock = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/stocks/${ref}/`
          );
          if (!response.ok) {
            throw new Error("Référence non trouvée");
          }
          const data = await response.json();

          setDataStock(data.data[0]);
          switch (data.data[0].categorie) {
            case "GROUPE ELECTROGENE":
              setDisplayBloc({ GE: "block", MOD: "none", CAB: "none" });
              setDetailGE(data.data[1]);
              break;
            case "MODULAIRE":
              setDisplayBloc({ GE: "none", MOD: "block", CAB: "none" });
              setDetailMOD(data.data[1]);
              break;
            case "CABINES AUTONOMES":
              setDisplayBloc({ GE: "none", MOD: "none", CAB: "block" });
              setDetailCAB(data.data[1]);
              break;
            default:
              setDisplayBloc({ GE: "none", MOD: "none", CAB: "none" });
              break;
          }
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUpdateStock();
    }, [ref]);

    // Handle form submission
    const handleUpdate = async (e) => {
      e.preventDefault();

      let dataDetails = {};
      switch (dataStock.categorie) {
        case "GROUPE ELECTROGENE":
          dataDetails = { ...detailGE };
          break;
        case "MODULAIRE":
          dataDetails = { ...detailMOD };
          break;
        case "CABINES AUTONOMES":
          dataDetails = { ...detailCAB };
          break;
        default:
          break;
      }

      const formData = {
        ...dataStock,
        ...dataDetails,
      };

      try {
        const response = await fetch(
          `http://localhost:8000/api/stock/update/${ref}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Cette référence n'existe pas");
        }

        const data = await response.json();
        navigate("/stock", { state: { msg: data.msg } });
      } catch (err) {
        setError(err.message);
      }
    };

    // Render category-specific fields
    const renderCategoryFields = () => {
      switch (dataStock.categorie) {
        case "GROUPE ELECTROGENE":
          return (
            <>
              <FormField
                label="Puissance"
                name="puissance"
                value={detailGE.puissance}
                onChange={(e) =>
                  setDetailGE({ ...detailGE, puissance: e.target.value })
                }
              />
              <FormField
                label="Marque"
                name="marque"
                value={detailGE.marque}
                onChange={(e) =>
                  setDetailGE({ ...detailGE, marque: e.target.value })
                }
              />
              <FormField
                label="Dimension"
                name="dimensionGE"
                value={detailGE.dimension}
                onChange={(e) =>
                  setDetailGE({ ...detailGE, dimension: e.target.value })
                }
              />
            </>
          );
        case "MODULAIRE":
          return (
            <>
              <FormField
                label="Gamme"
                name="gammeModulaire"
                value={detailMOD.gamme}
                onChange={(e) =>
                  setDetailMOD({ ...detailMOD, gamme: e.target.value })
                }
              />
              <FormField
                label="Dimension"
                name="dimensionModulaire"
                value={detailMOD.dimension}
                onChange={(e) =>
                  setDetailMOD({ ...detailMOD, dimension: e.target.value })
                }
              />
            </>
          );
        case "CABINES AUTONOMES":
          return (
            <>
              <FormField
                label="Gamme"
                name="gammeCabine"
                value={detailCAB.gamme}
                onChange={(e) =>
                  setDetailCAB({ ...detailCAB, gamme: e.target.value })
                }
              />
              <FormField
                label="Dimension"
                name="dimensionCabine"
                value={detailCAB.dimension}
                onChange={(e) =>
                  setDetailCAB({ ...detailCAB, dimension: e.target.value })
                }
              />
              <FormField
                label="Couleur"
                name="color"
                value={detailCAB.color}
                onChange={(e) =>
                  setDetailCAB({ ...detailCAB, color: e.target.value })
                }
              />
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="container py-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h2 className="h4 mb-0">
              <i className="fas fa-edit me-2"></i>
              Modification : {dataStock.refMateriel || "Nouvel équipement"}
            </h2>
          </div>

          {error && (
            <div className="alert alert-danger m-3">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate}>
            <div className="card-body">
              <div className="row">
                {/* Colonne de gauche - Informations générales */}
                <div className="col-md-6">
                  <div className="mb-4">
                    <h5 className="text-muted border-bottom pb-2 mb-3">
                      <i className="fas fa-info-circle me-2"></i>
                      Informations générales
                    </h5>

                    <FormField
                      label="Désignation"
                      name="designation"
                      value={dataStock.designation}
                      onChange={(e) =>
                        setDataStock({
                          ...dataStock,
                          designation: e.target.value,
                        })
                      }
                    />

                    <div className="mb-3">
                      <label
                        htmlFor="situation"
                        className="form-label fw-bold text-muted"
                      >
                        Situation
                      </label>
                      <select
                        id="situation"
                        className="form-control"
                        onChange={(e) =>
                          setDataStock({
                            ...dataStock,
                            situation: e.target.value,
                          })
                        }
                      >
                        <option value="LOUER">LOUER</option>
                        <option value="DISPONIBLE">DISPONIBLE</option>
                        <option value="VENTE">VENTE</option>
                      </select>
                    </div>

                    <FormField
                      label="Emplacement"
                      name="lieu"
                      value={dataStock.lieu}
                      onChange={(e) =>
                        setDataStock({ ...dataStock, lieu: e.target.value })
                      }
                    />

                    <FormField
                      label="Ville"
                      name="client"
                      value={dataStock.ville}
                      onChange={(e) =>
                        setDataStock({ ...dataStock, ville: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Colonne de droite - Détails spécifiques */}
                <div className="col-md-6">
                  <div className="mb-4">
                    <h5 className="text-muted border-bottom pb-2 mb-3">
                      <i className="fas fa-cogs me-2"></i>
                      Caractéristiques techniques
                    </h5>

                    {renderCategoryFields()}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer bg-light">
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/stock")}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Annuler
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={btnSubmit}
                >
                  <i className="fas fa-save me-2"></i>
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}


// Reusable form field component
function FormField({ label, name, value, onChange, type = "text" }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label fw-bold text-muted">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                className="form-control"
                value={value || ""}
                onChange={onChange}
            />
        </div>
    );
}