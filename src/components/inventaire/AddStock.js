import { useState,useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
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
    client: "",
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
  const [btnSabmit, setBtnSubmit] = useState(true);

  useEffect(() => {
    // Vérifier les champs communs requis
    const commonFieldsFilled =
      dataStock.refMateriel.trim() !== "" &&
      dataStock.designation.trim() !== "" &&
      dataStock.lieu.trim() !== "" &&
      dataStock.categorie.trim() !== "";

    let specificFieldsFilled = false;

    // Vérifier les champs spécifiques selon la catégorie
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

    // Activer le bouton seulement si tous les champs requis sont remplis
    setBtnSubmit(!(commonFieldsFilled && specificFieldsFilled));
  }, [dataStock, detailGE, detailCAB, detailMOD]);
  //function to check blocs to display
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

  //function wich handle submit form

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
          msg: "Vous avez ajouter " + dataStock.refMateriel + " avec success",
        },
      });
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Erreur: ${error.response?.data?.message || error.message}`);
    }
  };

  //chech if the refMateril exist on database

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
    <>
      <h1
        id="title"
        class="text-center  align-center w-75 m-auto pt-3 pb-3 mt-3"
      >
        Ajouter Nouveau Materiel
      </h1>

      <form onSubmit={handelSubmitForm}>
        <div class="m-auto   p-4 w-75 borderShadaw">
          <div class="row mt-2">
            <div class="col-md-4 fs-6 text-dark">Réference de Materiel</div>

            <div class="col-md-8">
              <input
                id="refMateriel"
                type="text"
                class="form-control fs-6 text-secondary"
                value={dataStock.refMateriel || ""}
                onChange={(e) => {
                  setDataStock({ ...dataStock, refMateriel: e.target.value });
                }}
                onBlur={() => checkRef(dataStock.refMateriel)}
              />
              <div
                id="msgErr"
                style={{ color: "red", display: isdispo ? "block" : "none" }}
              >
                Ce Reference existe deja
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-4 fs-6 text-dark">Designations</div>

            <div class="col-md-8">
              <input
                name="designation"
                type="text"
                class="form-control fs-6 text-secondary text-uppercase"
                value={dataStock.designation || ""}
                onChange={(e) => {
                  setDataStock({ ...dataStock, designation: e.target.value });
                }}
              />
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-md-4 fs-6 text-dark">Client</div>

            <div class="col-md-8">
              <input
                name="lieu"
                type="text"
                class="form-control fs-6 text-secondary text-uppercase"
                value={dataStock.client || ""}
                onChange={(e) => {
                  setDataStock({ ...dataStock, client: e.target.value });
                }}
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-4 fs-6 text-dark">Emplacement</div>

            <div class="col-md-8">
              <input
                name="lieu"
                type="text"
                class="form-control fs-6 text-secondary text-uppercase"
                value={dataStock.lieu || ""}
                onChange={(e) => {
                  setDataStock({ ...dataStock, lieu: e.target.value });
                }}
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-4 fs-6 text-dark">Categorie</div>

            <div class="col-md-8">
              <select
                name="categorie"
                class="form-select"
                id="cat"
                onChange={displayBlocs}
              >
                <option selected>Selectioner...</option>
                <option value="GROUPE ELECTROGENE">GROUPE ELECTROGENE</option>
                <option value="MODULAIRE">MODULAIRE</option>
                <option value="CABINES AUTONOMES">CABINES AUTONOMES</option>
              </select>
            </div>
          </div>

          <div id="GE" style={{ display: displayBloc.GE }}>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Puissance</div>
              <div class="col-md-8">
                <input
                  name="puissance"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailGE.puissance || ""}
                  onChange={(e) => {
                    setDetailGE({ ...detailGE, puissance: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Marque</div>
              <div class="col-md-8">
                <input
                  name="marque"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailGE.marque || ""}
                  onChange={(e) => {
                    setDetailGE({ ...detailGE, marque: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Dimension</div>
              <div class="col-md-8">
                <input
                  name="dimensionGE"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailGE.dimension || ""}
                  onChange={(e) => {
                    setDetailGE({ ...detailGE, dimension: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-3">
              <input
                type="submit"
                disabled={btnSabmit}
                class="btn btn-success"
                value="Enregistrer"
              />
            </div>
          </div>

          <div id="cabine" style={{ display: displayBloc.CAB }}>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Gamme</div>
              <div class="col-md-8">
                <input
                  name="gammeCabine"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailCAB.gamme || ""}
                  onChange={(e) => {
                    setDetailCAB({ ...detailCAB, gamme: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Dimension</div>
              <div class="col-md-8">
                <input
                  name="dimensionCabine"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailCAB.dimension || ""}
                  onChange={(e) => {
                    setDetailCAB({ ...detailCAB, dimension: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Color</div>
              <div class="col-md-8">
                <input
                  name="color"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailCAB.color || ""}
                  onChange={(e) => {
                    setDetailCAB({ ...detailCAB, color: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-3">
              <input
                type="submit"
                disabled={btnSabmit}
                class="btn btn-success"
                value="Enregistrer"
              />
            </div>
          </div>

          <div id="modulaire" style={{ display: displayBloc.MOD }}>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Gamme</div>
              <div class="col-md-8">
                <input
                  name="gammeModulaire"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailMOD.gamme || ""}
                  onChange={(e) => {
                    setDetailMOD({ ...detailMOD, gamme: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Dimension</div>
              <div class="col-md-8">
                <input
                  name="dimensionModulaire"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={detailMOD.dimension || ""}
                  onChange={(e) => {
                    setDetailMOD({ ...detailMOD, dimension: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-3">
              <input
                type="submit"
                class="btn btn-success"
                value="Enregistrer"
                disabled={btnSabmit}
              />
              {/* <button class="btn btn-success">Enregistrer</button> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}