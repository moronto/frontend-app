import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.js"
import Home from "./components/inventaire/home";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import DetailStock from "./components/inventaire/DetailStock";
import Stock from "./components/inventaire/Stock";
import AddStock from "./components/inventaire/AddStock";
import DeleteStock from "./components/inventaire/DeleteStock";
import UpdateStock from "./components/inventaire/UpdateStock";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
 

function App() {
   const location = useLocation();

   useEffect(() => {
     if (location.state?.msg) {
       toast.success(location.state.msg);
       // Effacer le message après l'affichage pour éviter qu'il ne réapparaisse
       location.state.msg = null;
     }
   }, [location.state]);
   return (
     <div className="App">
       <Toaster />
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
         <div class="container-fluid">
           <Link to="/home">
             <img
               src="/img/ATOUT.PNG"
               class="img-fluid"
               width="200px"
               height="100px"
             />
           </Link>

           <button
             class="navbar-toggler"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarNavDropdown"
           >
             <span class="navbar-toggler-icon"></span>
           </button>

           <div class="collapse navbar-collapse" id="navbarNavDropdown">
             <ul class="navbar-nav me-auto">
               <li class="nav-item dropdown">
                 <a
                   class="nav-link dropdown-toggle"
                   href="#"
                   role="button"
                   data-bs-toggle="dropdown"
                 >
                   Gestion de Stock
                 </a>
                 <ul class="dropdown-menu">
                   <li>
                     <Link to="/addStock">
                       <a class="dropdown-item">Ajouter Materiel</a>
                     </Link>
                   </li>
                   <li>
                     <Link to="/stock">
                       {" "}
                       <a class="dropdown-item">Afficher Stock</a>
                     </Link>
                   </li>
                 </ul>
               </li>

               <li class="nav-item dropdown">
                 <a
                   class="nav-link dropdown-toggle"
                   href="#"
                   role="button"
                   data-bs-toggle="dropdown"
                 >
                   Gestion des Reservations
                 </a>
                 <ul class="dropdown-menu">
                   <li>
                     <a class="dropdown-item" href="{% url 'reservations' %}">
                       Reservations
                     </a>
                   </li>
                   <li>
                     <a class="dropdown-item" href="{% url 'addreservation' %}">
                       Ajouter Reservation
                     </a>
                   </li>
                 </ul>
               </li>
               <li class="nav-item dropdown">
                 <a
                   class="nav-link dropdown-toggle"
                   href="#"
                   role="button"
                   data-bs-toggle="dropdown"
                 >
                   Gestion des Livraisons
                 </a>
                 <ul class="dropdown-menu">
                   <li>
                     <a class="dropdown-item" href="{% url 'livraison' %}">
                       Livraisons
                     </a>
                   </li>
                   <li>
                     <a class="dropdown-item" href="{% url 'newLivraison' %}">
                       Ajouter un nouveau
                     </a>
                   </li>
                 </ul>
               </li>
               <li class="nav-item dropdown">
                 <a
                   class="nav-link dropdown-toggle"
                   href="#"
                   role="button"
                   data-bs-toggle="dropdown"
                 >
                   Gestion des Mouvements
                 </a>
                 <ul class="dropdown-menu">
                   <li>
                     <a class="dropdown-item" href="{% url 'movement' %}">
                       Mouvements
                     </a>
                   </li>
                   <li>
                     <a class="dropdown-item" href="{% url 'addMovement' %}">
                       Ajouter un Sortie
                     </a>
                   </li>
                 </ul>
               </li>
             </ul>

             <ul class="navbar-nav ms-auto">
               <li class="nav-item dropdown">
                 <a
                   class="nav-link dropdown-toggle"
                   href="#"
                   role="button"
                   data-bs-toggle="dropdown"
                 ></a>
                 <ul class="dropdown-menu dropdown-menu-end">
                   <li>
                     <a class="dropdown-item" href="#">
                       Profil
                     </a>
                   </li>
                   <li>
                     <hr class="dropdown-divider" />
                   </li>
                   <li>
                     <form method="post" action="{% url 'logout' %}">
                       <button type="submit" class="dropdown-item text-danger">
                         Déconnexion
                       </button>
                     </form>
                   </li>
                 </ul>
               </li>
               <li class="nav-item">
                 <a class="btn btn-outline-light me-2" href="{% url 'login' %}">
                   Connexion
                 </a>
               </li>
               <li class="nav-item">
                 <a class="btn btn-primary" href="{% url 'register' %}">
                   Inscription
                 </a>
               </li>
             </ul>
           </div>
         </div>
       </nav>
       <Routes>
         <Route path="/home" element={<Home />} />
         <Route path="/stock" element={<Stock />} />
         <Route path="/addStock" element={<AddStock />} />
         <Route path="/stocks/:ref" element={<DetailStock />} />
         <Route path="/stock/:ref" element={<DeleteStock />} />
         <Route path="/stock/update/:ref" element={<UpdateStock />} />
       </Routes>
     </div>
   );
}

export default App;
