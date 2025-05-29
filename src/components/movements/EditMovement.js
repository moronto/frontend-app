import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DetailsMovement from "./detailsMovement";
import axios from "axios";
import { API_URL } from "../../Config";

export default function EditMovement() {
  const navigate = useNavigate();

  const [movementDetail, setMovementDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMovement = async () => {
      try {
        const response = await fetch(`${API_URL}/api/detailsMovement/${id}`);

        if (!response.ok) {
          throw new Error("Pardon ce mouvement n'existe pas");
        }
        const data = await response.json();
        setMovementDetail(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails:", error);
      }
    };
    fetchMovement();
  }, [id]);

  const handelSave = async () => {
    const response = await axios.put(
      `${API_URL}/api/update/${id}`,
      movementDetail
    );

    const data = response.data;

    navigate("/movements", {
      state: {
        msg: data.msg,
      },
    });
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="h5 mb-0">
            Modification de {movementDetail.typeMovement} de{" "}
            {movementDetail.refMateriel}
          </h2>
        </div>

        <div className="card-body  fs-5">
          <div className="row">
            <div className="mb-3">
              <label className="form-label fw-bold">Type de Location</label>
              <select
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.typeLocation}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    typeLocation: e.target.value,
                  });
                }}
              >
                <option value="CHANTIER">CHANTIER</option>
                <option value="EVENEMENT">EVENEMENT</option>
                <option value="VENTE">VENTE</option>
                <option value="TRANSFERT">TRANSFERT</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Désignation</label>
              <input
                type="text"
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.designation}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    designation: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Quantité</label>
              <input
                type="text"
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.qte}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    qte: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Dépôt</label>
              <select
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.depot}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    depot: e.target.value,
                  });
                }}
              >
                <option value="BOSKOURA">BOSKOURA</option>
                <option value="JORF LASFER">JORF LASFER</option>
                <option value="MARRAKECH">MARRAKECH</option>
                <option value="BERRCHID">BERRCHID</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Date de Mouvement</label>
              <input
                type="date"
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.dateMovement}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    dateMovement: e.target.value,
                  });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Emplacement</label>
              <input
                type="text"
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.lieu}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    lieu: e.target.value,
                  });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Matricule Transport</label>
              <input
                type="text"
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.matTrans}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    matTrans: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Conducteur transport</label>
              <input
                type="text"
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.condTrans}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    condTrans: e.target.value,
                  });
                }}
              />
            </div>

            {/* Colonne 2 */}

            <div className="mb-3">
              <label className="form-label fw-bold">Ville</label>
              <input
                type="text"
                className="form-control-plaintext border-bottom pb-2"
                value={movementDetail.ville}
                onChange={(e) => {
                  setMovementDetail({
                    ...movementDetail,
                    ville: e.target.value,
                  });
                }}
              />
            </div>

            {/* Colonne 3 */}
          </div>

          {/* Observations (pleine largeur) */}
          <div className="row mt-3">
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label fw-bold">Observations</label>
                <input
                  type="text"
                  className="form-control-plaintext border-bottom pb-2"
                  value={movementDetail.observations}
                  onChange={(e) => {
                    setMovementDetail({
                      ...movementDetail,
                      observations: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end bg-primary  ">
          <Link to="/movements" className="btn btn-outline-info fs-5 me-2">
            <i className="fas fa-save me-2"></i> Annuler
          </Link>
          <button className="btn btn-outline-danger fs-5 " onClick={handelSave}>
            <i className="fas fa-save me-2"></i> Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
