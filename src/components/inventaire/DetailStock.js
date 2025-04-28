import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DetailStock() {
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { ref } = useParams();

    useEffect(() => {
        const fetchRef = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/stocks/${ref}`);
                if (!response.ok) {
                    throw new Error('Stock non trouvé');
                }
                const data = await response.json();
                setStock(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRef();
    }, [ref]);

    if (loading) return <div className="text-center mt-5">Chargement en cours...</div>;
    if (error) return <div className="alert alert-danger mt-3">Erreur : {error}</div>;
    if (!stock || !stock[0]) return <div className="alert alert-warning mt-3">Aucune donnée disponible</div>;

    const st = stock[0];
    const detailSt = stock[1] || {}; // Fallback pour les données spécifiques

    return (
      <div className="container mt-4">
        <h2 className="bg-info ps-4 pt-1 pb-1 pe-4">
          Détail de : {st.refMateriel}
        </h2>
        <div className="row bg-light p-2 m-1">
          <div className="col-md-5">Designation</div>
          <div className="col-md-2">:</div>
          <div className="col-md-5">{st.designation || "N/A"}</div>
        </div>
        <div className="row bg-light p-2 m-1">
          <div className="col-md-5">Situation</div>
          <div className="col-md-2">:</div>
          <div className="col-md-5">{st.situation || "N/A"}</div>
        </div>
        <div className="row bg-light p-2 m-1">
          <div className="col-md-5">Emplacement</div>
          <div className="col-md-2">:</div>
          <div className="col-md-5">{st.lieu || "N/A"}</div>
        </div>
        <div className="row bg-light p-2 m-1">
          <div className="col-md-5">Ville</div>
          <div className="col-md-2">:</div>
          <div className="col-md-5">{st.client || "N/A"}</div>
        </div>
        <div className="row bg-light p-2 m-1">
          <div className="col-md-5">Categorie</div>
          <div className="col-md-2">:</div>
          <div className="col-md-5">{st.categorie || "N/A"}</div>
        </div>

        {st.categorie === "GROUPE ELECTROGENE" && (
          <>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Puissance</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.puissance || "N/A"}</div>
            </div>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Marque</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.marque || "N/A"}</div>
            </div>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Dimension</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.dimension || "N/A"}</div>
            </div>
          </>
        )}

        {st.categorie === "MODULAIRE" && (
          <>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Gamme</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.gamme || "N/A"}</div>
            </div>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Dimension</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.dimension || "N/A"}</div>
            </div>
          </>
        )}

        {st.categorie === "CABINES AUTONOMES" && (
          <>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Gamme</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.gamme || "N/A"}</div>
            </div>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Couleur</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.color || "N/A"}</div>
            </div>
            <div className="row bg-light p-2 m-1">
              <div className="col-md-5">Dimension</div>
              <div className="col-md-2">:</div>
              <div className="col-md-5">{detailSt.dimension || "N/A"}</div>
            </div>
          </>
        )}

        <div className="row justify-content-center mt-4">
          <Link to="/stock" className="btn btn-primary w-25">
            Retour
          </Link>
        </div>
      </div>
    );
}