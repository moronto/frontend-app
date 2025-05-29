import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";
import axios from "axios";

export default function Movement() {
  const [movement, setMovement] = useState([]);
  const [dataFiltred, setDataFiltred] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMouvement, setSelectedMouvement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMouvement = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/movements/`);
        const data = await resp.json();
        setMovement(data);
        setDataFiltred(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMouvement();
  }, []);

  useEffect(() => {
    if (inputSearch.trim() === "") {
      setDataFiltred(movement);
    } else {
      const dataF = movement.filter((d) => {
        return (
          d.typeMovement?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.refMateriel?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.designation?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.ville?.toLowerCase().includes(inputSearch.toLowerCase())
        );
      });
      setDataFiltred(dataF);
    }
  }, [inputSearch, movement]);

  const handleConfirmDelete = (move) => {
    // Ajoutez ici la logique de suppression
    setShowDeleteModal(true);
    setSelectedMouvement(move);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  //delete movement
  async function deleteMovement() {
    try {
      await axios.delete(`${API_URL}/api/delete/${selectedMouvement.id}`);

      // Mise à jour locale sans recharger
      setMovement((prev) => prev.filter((m) => m.id !== selectedMouvement.id));
      setDataFiltred((prev) =>
        prev.filter((m) => m.id !== selectedMouvement.id)
      );

      setShowDeleteModal(false);
      // Afficher un message de succès
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  }

  return (
    <div className="container-fluid py-4">
      {/* Modal de suppression */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirmation de suppression</h5>
              </div>
              <div className="modal-body">
                <p>Voulez-vous vraiment supprimer ce mouvement ?</p>
                <p>
                  <strong>Référence:</strong> {selectedMouvement?.refMateriel}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={deleteMovement}>
                  Oui, supprimer
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barre de recherche */}
      <div className="card mb-4 shadow-sm">
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

      {/* En-tête du tableau */}
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="h5 mb-0">Liste des Mouvements</h2>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3">Mouvement</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Référence</th>
                  <th className="py-3">Désignation</th>
                  <th className="py-3">ville</th>
                  <th className="py-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataFiltred.length > 0 ? (
                  dataFiltred.map((move) => (
                    <tr key={move.id} className="align-middle">
                      <td>{move.typeMovement}</td>
                      <td>
                        {new Date(move.dateMovement).toLocaleDateString()}
                      </td>
                      <td className="fw-bold">{move.refMateriel}</td>
                      <td>{move.designation}</td>
                      <td>{move.ville}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <Link
                            to={`/detailsMovement/${move.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Voir détails"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          <Link
                            to={`/editMovement/${move.id}`}
                            className="btn btn-sm btn-outline-warning"
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleConfirmDelete(move)}
                            title="Supprimer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      {inputSearch
                        ? "Aucun résultat trouvé"
                        : "Aucun mouvement disponible"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Total: {dataFiltred.length} mouvement(s)
          </small>
        </div>
      </div>
    </div>
  );
}
