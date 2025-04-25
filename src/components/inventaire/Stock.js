import { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

export default function Stock() {
    const [dataStock, setDataStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/stock/");
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setDataStock(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStock();
    }, []);

    const handleDelete = async (ref) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:8000/api/stock/${ref}/`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Échec de la suppression');
            }
            
            // Mettre à jour l'état après suppression
            setDataStock(prev => prev.filter(item => item.refMateriel !== ref));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Chargement en cours...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-4">Erreur: {error}</div>;
    }

    return (
        <div className="p-4 bg-light mt-1 borderShadaw">
            <h1 className="text-center">INVENTAIRE GENERAL</h1>

            <div className="row bg-black pt-2 pb-2 text-white">
                <div className="col-md-2">Référence</div>
                <div className="col-md-3">Désignation</div>
                <div className="col-md-1">Situation</div>
                <div className="col-md-2">Emplacement</div>
                <div className="col-md-2">Catégorie</div>    
                <div className="col-md-2 text-center">Actions</div>    
            </div>
            
            <div className="body">
                {dataStock.length > 0 ? (
                    dataStock.map((data) => (
                        <div className="row" key={data.refMateriel}>
                            <div className="col-md-2">{data.refMateriel}</div>
                            <div className="col-md-3">{data.designation}</div>
                            <div className="col-md-1">{data.situation}</div>
                            <div className="col-md-2">{data.lieu}</div>
                            <div className="col-md-2">{data.categorie}</div>    
                            <div className="col-md-2 action">
                                <Link to={`/stocks/${data.refMateriel}`} className="text-decoration-none">
                                    <button  className="btn btn-link p-0 ms-4">
                                    <i className="fa fa-file fa-2x text-success ms-4" title="Détails"></i>
                                    </button>
                                </Link>
                                <Link to={`update/${data.refMateriel}`} className="text-decoration-none">
                                     <button  className="btn btn-link p-0 ms-4">
                                    <i className="fa fa-edit fa-2x text-warning ms-4" title="Modifier"></i>
                                    </button>
                                </Link>   
                                <button 
                                    onClick={() => handleDelete(data.refMateriel)}
                                    className="btn btn-link p-0 ms-4"
                                    title="Supprimer"
                                >
                                    <i className="fa fa-trash fa-2x text-danger"></i>
                                </button>
                            </div>    
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info text-center mt-4">
                        <h1>Aucun résultat à afficher</h1>
                    </div>
                )}
            </div>
        </div>
    );
}