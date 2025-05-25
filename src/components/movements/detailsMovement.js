import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailsMovement() {
  const [movementDetail, setMovementDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMovement = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/detailsMovement/${id}`
        );

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

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="h5 mb-0">Détails du Mouvement</h2>
        </div>

        <div className="card-body">
          <div className="row g-3">
            {/* Colonne 1 */}
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Type de Mouvement</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.typeMovement || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Dépôt</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.depot || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Quantité</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.qte || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Matricule Transport
                </label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.matTrans || "-"}
                </div>
              </div>
            </div>

            {/* Colonne 2 */}
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Date de Mouvement</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.dateMovement || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Référence Matériel</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.refMateriel || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Emplacement</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.lieu || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Conducteur transport
                </label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.condTrans || "-"}
                </div>
              </div>
            </div>

            {/* Colonne 3 */}
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Type de Location</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.typeLocation || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Désignation</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.designation || "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Lieu de location</label>
                <div className="form-control-plaintext border-bottom pb-2">
                  {movementDetail.ville || "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Observations (pleine largeur) */}
          <div className="row mt-3">
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label fw-bold">Observations</label>
                <div className="form-control-plaintext border p-2 min-h-100">
                  {movementDetail.observations || "Aucune observation"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer bg-light">
          <Link to="/movements" className="btn btn-outline-primary">
            <i className="fas fa-arrow-left me-2"></i> Retour à la liste
          </Link>
        </div>
      </div>
    </div>
  );
}
