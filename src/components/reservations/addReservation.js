import { useEffect, useState } from "react";
import axios from "axios";

export default function AddReservation() {
  const [dateRetour, setDateRetour] = useState(false);
  const [reservation, setReservation] = useState({
    refReservation: "",
    chargerAffaire: "",
    dateReservation: "",
    client: "",
    etat: "En cours",
    created_at: new Date(),
  });
  const [reservationDetails, setReservationDetails] = useState([
    { designation: "", qte: 1, dateLivraison: "", dateRetour: "" },
  ]);
  const [charge, setCharge] = useState({});

  useEffect(() => {
    const fetchChargeAffaire = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/chargeaffaire/"
      );
      if (response) {
        setCharge(response.data);
      } else {
        throw new Error("Probleme lors de request");
      }
    };

    fetchChargeAffaire();
    generatedRef();
  }, []);
  // generate reference of reservation

  const generatedRef = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/reservation/");
    let acc = [];

    if (response) {
      response.data.reduce((acc, item) => {
        const ref = item.refReservation.split("-")[1];
        if (ref === new Date().getFullYear().toString()) {
          acc.push(parseInt(item.refReservation.split("-")[0]));
        }
        return acc;
      }, acc);
    }
    const yearNow = new Date().getFullYear();
    console.log(acc);
    let ref =
      acc.length === 0
        ? "0001-" + yearNow
        : `${Math.max(...acc) + 1}-` + yearNow;

    console.log(ref);

    setReservation({ ...reservation, refReservation: ref });
  };

  const addReservationLine = () => {
    setReservationDetails([
      ...reservationDetails,
      { designation: "", qte: 1, dateLivraison: "", dateRetour: "" },
    ]);
  };

  const removeReservationLine = (index) => {
    if (reservationDetails.length > 1) {
      const newDetails = [...reservationDetails];
      newDetails.splice(index, 1);
      setReservationDetails(newDetails);
    }
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...reservationDetails];
    newDetails[index][field] = value;
    setReservationDetails(newDetails);
  };

  const checkDate = (livraisonDate, retourDate, index) => {
    if (
      livraisonDate &&
      retourDate &&
      new Date(retourDate) < new Date(livraisonDate)
    ) {
      document.querySelector(`[data-id="${index}"]`).style.display = "block";
    } else {
      document.querySelector(`[data-id="${index}"]`).style.display = "none";
    }
  };

  const checkDisplayP = () => {
    const arr = document.querySelectorAll("reservation p");
    const p = arr.filter((item) => {
      return item.style.display;
    });
    console.log(p);
  };
  checkDisplayP();
  //add new resrvation
  function handelNewReservation(e) {
    e.preventDefault();

    const param = {
      ...reservation,
      ...reservationDetails,
    };
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <h1 className="col-md-12 text-primary fw-bold border-bottom border-primary pb-2">
          Nouvelle Réservation
        </h1>
      </div>

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Informations principales</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handelNewReservation} method="post">
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label
                  htmlFor="dateReservation"
                  className="form-label fw-semibold"
                >
                  Date de réservation *
                </label>
                <input
                  type="date"
                  value={reservation.dateReservation}
                  onChange={(e) => {
                    setReservation({
                      ...reservation,
                      dateReservation: e.target.value,
                    });
                  }}
                  required
                  className="form-control border-2"
                />
              </div>

              <div className="col-md-4">
                <label
                  htmlFor="chargerAffaire"
                  className="form-label fw-semibold"
                >
                  Chargé d'affaire *
                </label>
                <select
                  className="form-select border-2"
                  value={reservation.chargerAffaire}
                  onChange={(e) => {
                    setReservation({
                      ...reservation,
                      chargerAffaire: e.target.value,
                    });
                  }}
                  required
                >
                  <option value="">Sélectionnez...</option>
                  {charge.length > 0
                    ? charge.map((ch) => (
                        <option key={ch.id} value={ch.name}>
                          {ch.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="client" className="form-label fw-semibold">
                  Client *
                </label>
                <input
                  type="text"
                  value={reservation.client}
                  onChange={(e) => {
                    setReservation({
                      ...reservation,
                      client: e.target.value,
                    });
                  }}
                  required
                  className="form-control border-2"
                  placeholder="Nom du client"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-primary mb-0">Détails de la réservation</h4>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={addReservationLine}
                >
                  <i className="bi bi-plus-circle me-2"></i>Ajouter une ligne
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th width="30%">Désignation</th>
                      <th width="15%">Quantité</th>
                      <th width="20%">Date de Livraison</th>
                      <th width="20%">Date de Retour</th>
                      <th width="15%">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="reservationBody">
                    {reservationDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            name="designation"
                            className="form-control border-1"
                            value={detail.designation}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "designation",
                                e.target.value
                              )
                            }
                            placeholder="Description de l'article"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="qte"
                            className="form-control border-1"
                            value={detail.qte}
                            onChange={(e) =>
                              handleDetailChange(index, "qte", e.target.value)
                            }
                            min="1"
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="dateLivraison"
                            className="form-control border-1"
                            value={detail.dateLivraison}
                            onChange={(e) => {
                              handleDetailChange(
                                index,
                                "dateLivraison",
                                e.target.value
                              );
                              checkDate(
                                e.target.value,
                                detail.dateRetour,
                                index
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="form-control border-1"
                            value={detail.dateRetour}
                            onChange={(e) => {
                              handleDetailChange(
                                index,
                                "dateRetour",
                                e.target.value
                              );
                              checkDate(
                                detail.dateLivraison,
                                e.target.value,
                                index
                              );
                            }}
                          />
                          <p
                            className="text-danger"
                            data-id={index}
                            style={{ display: "none" }}
                          >
                            La date de retour est postérieure à la date de
                            Livraison
                          </p>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeReservationLine(index)}
                            disabled={reservationDetails.length <= 1}
                            title="Supprimer cette ligne"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
              <button type="button" className="btn btn-secondary">
                Annuler
              </button>
              <button
                type="submit"
                disabled={dateRetour}
                className="btn btn-primary"
              >
                <i className="bi bi-save me-2"></i>Enregistrer la réservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
