import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addStock.css";

export default function AddStock() {
  const navigate = useNavigate();
  const [displayBloc, setDisplayBloc] = useState({
    GE: "none",
    MOD: "none",
    CAB: "none",
  });
  const [isdispo, setIsdispo] = useState(false);
  const [dataStock, setDataStock] = useState({
    refMateriel: "",
    designation: "",
    situation: "DISPONIBLE",
    ville: "",
    lieu: "",
    categorie: "",
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
  const [btnSubmit, setBtnSubmit] = useState(true);

  useEffect(() => {
    const commonFieldsFilled =
      dataStock.refMateriel.trim() !== "" &&
      dataStock.designation.trim() !== "" &&
      dataStock.lieu.trim() !== "";

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

  function displayBlocs() {
    const cat = document.querySelector("#cat");

    if (cat.value === "GROUPE ELECTROGENE") {
      setDisplayBloc({ GE: "block", MOD: "none", CAB: "none" });
    } else if (cat.value === "MODULAIRE") {
      setDisplayBloc({ GE: "none", MOD: "block", CAB: "none" });
    } else if (cat.value === "CABINES AUTONOMES") {
      setDisplayBloc({ GE: "none", MOD: "none", CAB: "block" });
    } else {
      setDisplayBloc({ GE: "none", MOD: "none", CAB: "none" });
    }
    setDataStock({ ...dataStock, categorie: cat.value });
  }

  const handelSubmitForm = async (e) => {
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
      const response = await axios.post(
        "http://localhost:8000/api/stocks/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/stock", {
        state: {
          msg: "Vous avez ajouté " + dataStock.refMateriel + " avec succès",
        },
      });
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Erreur: ${error.response?.data?.message || error.message}`);
    }
  };

  async function checkRef(ref) {
    const response = await axios.get("http://localhost:8000/api/stock/");
    const data = await response.data;
    let i = 0;

    data.map((d) => {
      if (d.refMateriel === ref) {
        i += 1;
        setDataStock({ ...dataStock, refMateriel: "" });
      }
    });

    i > 0 ? setIsdispo(true) : setIsdispo(false);
  }

  return (
    <div className="container">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0 text-center">Ajouter Nouveau Matériel</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handelSubmitForm}>
            <div className="row g-3">
              {/* Section commune */}
              <div className="col-md-6">
                <div className="mb-1">
                  <label className="form-label fw-bold">
                    Référence de Matériel
                  </label>
                  <input
                    id="refMateriel"
                    type="text"
                    className={`form-control ${isdispo ? "is-invalid" : ""}`}
                    value={dataStock.refMateriel || ""}
                    onChange={(e) => {
                      setDataStock({
                        ...dataStock,
                        refMateriel: e.target.value,
                      });
                    }}
                    onBlur={() => checkRef(dataStock.refMateriel)}
                  />
                  {isdispo && (
                    <div className="invalid-feedback">
                      Cette référence existe déjà
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-1">
                  <label className="form-label fw-bold">Désignation</label>
                  <input
                    name="designation"
                    type="text"
                    className="form-control text-uppercase"
                    value={dataStock.designation || ""}
                    onChange={(e) => {
                      setDataStock({
                        ...dataStock,
                        designation: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-1">
                  <label className="form-label fw-bold">Emplacement</label>
                  <input
                    name="lieu"
                    type="text"
                    className="form-control text-uppercase"
                    value={dataStock.lieu || ""}
                    onChange={(e) => {
                      setDataStock({ ...dataStock, lieu: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-1">
                  <label className="form-label fw-bold">Catégorie</label>
                  <select
                    name="categorie"
                    className="form-select"
                    id="cat"
                    onChange={displayBlocs}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="GROUPE ELECTROGENE">
                      GROUPE ELECTROGENE
                    </option>
                    <option value="MODULAIRE">MODULAIRE</option>
                    <option value="CABINES AUTONOMES">CABINES AUTONOMES</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section spécifique selon la catégorie */}
            <div
              className="mt-4 p-3 bg-light rounded"
              style={{ display: displayBloc.GE }}
            >
              <h5 className="mb-3 text-primary">Détails Groupe Électrogène</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Puissance</label>
                  <input
                    name="puissance"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailGE.puissance || ""}
                    onChange={(e) => {
                      setDetailGE({ ...detailGE, puissance: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Marque</label>
                  <input
                    name="marque"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailGE.marque || ""}
                    onChange={(e) => {
                      setDetailGE({ ...detailGE, marque: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Dimension</label>
                  <input
                    name="dimensionGE"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailGE.dimension || ""}
                    onChange={(e) => {
                      setDetailGE({ ...detailGE, dimension: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="mt-4 p-3 bg-light rounded"
              style={{ display: displayBloc.CAB }}
            >
              <h5 className="mb-3 text-primary">Détails Cabines Autonomes</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Gamme</label>
                  <input
                    name="gammeCabine"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailCAB.gamme || ""}
                    onChange={(e) => {
                      setDetailCAB({ ...detailCAB, gamme: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Dimension</label>
                  <input
                    name="dimensionCabine"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailCAB.dimension || ""}
                    onChange={(e) => {
                      setDetailCAB({ ...detailCAB, dimension: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Couleur</label>
                  <input
                    name="color"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailCAB.color || ""}
                    onChange={(e) => {
                      setDetailCAB({ ...detailCAB, color: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="mt-4 p-3 bg-light rounded"
              style={{ display: displayBloc.MOD }}
            >
              <h5 className="mb-3 text-primary">Détails Modulaire</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Gamme</label>
                  <input
                    name="gammeModulaire"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailMOD.gamme || ""}
                    onChange={(e) => {
                      setDetailMOD({ ...detailMOD, gamme: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Dimension</label>
                  <input
                    name="dimensionModulaire"
                    type="text"
                    className="form-control text-uppercase"
                    value={detailMOD.dimension || ""}
                    onChange={(e) => {
                      setDetailMOD({ ...detailMOD, dimension: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={btnSubmit}
              >
                <i className="fas fa-save me-2"></i> Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
