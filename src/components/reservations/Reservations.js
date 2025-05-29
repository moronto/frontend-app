import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Config";

export default function Reservation() {
  const [reservation, setReservation] = useState({});
  const [inputSearch, setInputSearch] = useState("");
  const [dataFilred, setDataFiltred] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get(`${API_URL}/api/reservation`);
      console.log(response.data);
      setReservation(response.data);
    };
    fetchReservations();
  }, []);

  //serach data with bar serach
  useEffect(() => {
    if (inputSearch.trim() === "") {
      setDataFiltred(reservation);
    } else {
      const dataF = reservation.filter((d) => {
        return (
          d.refReservation?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.chargerAffaire?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.client?.toLowerCase().includes(inputSearch.toLowerCase()) ||
          d.etat?.toLowerCase().includes(inputSearch.toLowerCase())
        );
      });
      setDataFiltred(dataF);
    }
  }, [inputSearch, reservation]);
  return (
    <>
      <div class="card mb-2 shadow-sm">
        <div class="card-body ">
          {/* Barre de recherche */}
          <div className="card mb-2 shadow-sm">
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
          <div class="row g-0 bg-light card-head p-2 fw-bold">
            <div class="col-md-2">Date reservation</div>
            <div class="col-md-2">Reference</div>
            <div class="col-md-2">Charge d'affaire</div>
            <div class="col-md-2">Client</div>
            <div class="col-md-2">Etat</div>
            <div class="col-md-2 d-flex justify-content-center">Action</div>
          </div>
          <div
            class="row g-0 list-group-item d-flex align-items-center py-2 border-bottom"
            id="table-body"
          >
            {dataFilred.length > 0 ? (
              dataFilred.map((r) => (
                <div class="row" key={r.id}>
                  <div class="col-md-2">{r.dateReservation}</div>
                  <div class="col-md-2">{r.refReservation}</div>
                  <div class="col-md-2">{r.chargerAffaire}</div>
                  <div class="col-md-2">{r.client}</div>
                  <div class="col-md-2">{r.etat}</div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <Link
                      to={""}
                      className="text-decoration-none mx-2"
                      title="Détails"
                    >
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-file-alt"></i>
                      </button>
                    </Link>
                    <Link
                      to={``}
                      className="text-decoration-none mx-2"
                      title="Modifier"
                    >
                      <button className="btn btn-sm btn-outline-warning">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger mx-2"
                      title="Supprimer"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <>
                <h1>Aucune info a afficher</h1>
              </>
            )}
          </div>
        </div>
        <div className="card-footer">
          Total: {dataFilred.length} Reservation(s)
        </div>
      </div>
    </>
  );
}
