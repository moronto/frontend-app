// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// React Router
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Notifications
import toast, { Toaster } from "react-hot-toast";

// Inventory Components
import Home from "./components/inventaire/home";
import Stock from "./components/inventaire/Stock";
import DetailStock from "./components/inventaire/DetailStock";
import AddStock from "./components/inventaire/AddStock";
import DeleteStock from "./components/inventaire/DeleteStock";
import UpdateStock from "./components/inventaire/UpdateStock";

// Movement Components
import Movements from "./components/movements/Movements";
import DetailsMovement from "./components/movements/detailsMovement";
import AddSortie from "./components/movements/AddSortie";
import AddRetour from "./components/movements/AddRetour";
import EditMovement from "./components/movements/EditMovement";

// Reservation Components
import Reservation from "./components/reservations/Reservations";
import AddReservation from "./components/reservations/addReservation";
function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.msg) {
      toast.success(location.state.msg);
      location.state.msg = null;
    }
  }, [location.state]);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Toaster position="top-right" />

      {/* Navigation Bar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
        style={{ background: "#008080", boxShadow: "5px 10px  #99999 inset" }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="/img/ATOUT.PNG"
              className="img-fluid"
              width="200"
              alt="Logo ATOUT"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              {/* Gestion de Stock */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="stockDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gestion de Stock
                </a>
                <ul className="dropdown-menu" aria-labelledby="stockDropdown">
                  <li>
                    <Link to="/addStock" className="dropdown-item">
                      Ajouter Matériel
                    </Link>
                  </li>
                  <li>
                    <Link to="/stock" className="dropdown-item">
                      Afficher Stock
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestion des Réservations */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="reservationDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gestion des Réservations
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="reservationDropdown"
                >
                  <li>
                    <Link to="/reservation" className="dropdown-item">
                      Réservations
                    </Link>
                  </li>
                  <li>
                    <Link to="/addreservation" className="dropdown-item">
                      Ajouter Réservation
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestion des Livraisons */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="deliveryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gestion des Livraisons
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="deliveryDropdown"
                >
                  <li>
                    <Link to="#" className="dropdown-item">
                      Livraisons
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item">
                      Ajouter Livraison
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestion des Mouvements */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="movementDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Gestion des Mouvements
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="movementDropdown"
                >
                  <li>
                    <Link to="/movements" className="dropdown-item">
                      Mouvements
                    </Link>
                  </li>
                  <li>
                    <Link to="/addSortie" className="dropdown-item">
                      Ajouter un Sortie
                    </Link>
                  </li>
                  <li>
                    <Link to="/addRetour" className="dropdown-item">
                      Ajouter un Entrer
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* User Section */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle fa-lg"></i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="#" className="dropdown-item">
                      <i className="fas fa-user me-2"></i> Profil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger">
                      <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content - flex-grow-1 permet au contenu de prendre tout l'espace disponible */}
      <main className="flex-grow-1 container-fluid py-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/addStock" element={<AddStock />} />
          <Route path="/stocks/:ref" element={<DetailStock />} />
          <Route path="/stock/:ref" element={<DeleteStock />} />
          <Route path="/stock/update/:ref" element={<UpdateStock />} />
          <Route path="/movements" element={<Movements />} />
          <Route path="/detailsMovement/:id" element={<DetailsMovement />} />
          <Route path="/editMovement/:id" element={<EditMovement />} />
          <Route path="/addSortie" element={<AddSortie />} />
          <Route path="/addRetour" element={<AddRetour />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/addreservation" element={<AddReservation />} />
        </Routes>
      </main>

      {/* Footer - mt-auto pousse le footer vers le bas */}
      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">&copy; 2023 ATOUT. Tous droits réservés.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <Link to="#" className="text-white me-3">
                Mentions légales
              </Link>
              <Link to="#" className="text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
