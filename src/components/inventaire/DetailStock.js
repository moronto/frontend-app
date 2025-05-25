import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function DetailStock() {
    // State management
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { ref } = useParams();

    // Fetch stock details
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

    // Loading state
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement en cours...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="alert alert-danger mt-4 mx-auto" style={{ maxWidth: '800px' }}>
                <i className="fas fa-exclamation-circle me-2"></i>
                Erreur : {error}
            </div>
        );
    }

    // No data state
    if (!stock || !stock[0]) {
        return (
            <div className="alert alert-warning mt-4 mx-auto" style={{ maxWidth: '800px' }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                Aucune donnée disponible
            </div>
        );
    }

    const st = stock[0];
    const detailSt = stock[1] || {};

    // Organize data into two columns
    const generalInfo = [
      { label: "Référence", value: st.refMateriel },
      { label: "Designation", value: st.designation },
      { label: "Situation", value: st.situation },
      { label: "Emplacement", value: st.lieu },
      { label: "Ville", value: st.ville },
      { label: "Catégorie", value: st.categorie },
    ];

    const categorySpecificInfo = [];
    if (st.categorie === "GROUPE ELECTROGENE") {
        categorySpecificInfo.push(
            { label: "Puissance", value: detailSt.puissance },
            { label: "Marque", value: detailSt.marque },
            { label: "Dimension", value: detailSt.dimension }
        );
    } else if (st.categorie === "MODULAIRE") {
        categorySpecificInfo.push(
            { label: "Gamme", value: detailSt.gamme },
            { label: "Dimension", value: detailSt.dimension }
        );
    } else if (st.categorie === "CABINES AUTONOMES") {
        categorySpecificInfo.push(
            { label: "Gamme", value: detailSt.gamme },
            { label: "Couleur", value: detailSt.color },
            { label: "Dimension", value: detailSt.dimension }
        );
    }

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-primary text-white">
                    <h2 className="h4 mb-0">
                        <i className="fas fa-info-circle me-2"></i>
                        Fiche technique : {st.refMateriel}
                    </h2>
                </div>
                
                <div className="card-body">
                    <div className="row">
                        {/* Colonne 1 - Informations générales */}
                        <div className="col-md-6">
                            <div className="mb-4">
                                <h5 className="text-muted mb-3 border-bottom pb-2">
                                    <i className="fas fa-cube me-2"></i>
                                    Informations générales
                                </h5>
                                <div className="list-group list-group-flush">
                                    {generalInfo.map((item, index) => (
                                        <DetailRow 
                                            key={index}
                                            label={item.label} 
                                            value={item.value} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Colonne 2 - Détails spécifiques */}
                        <div className="col-md-6">
                            {categorySpecificInfo.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="text-muted mb-3 border-bottom pb-2">
                                        <i className="fas fa-tags me-2"></i>
                                        Caractéristiques techniques
                                    </h5>
                                    <div className="list-group list-group-flush">
                                        {categorySpecificInfo.map((item, index) => (
                                            <DetailRow 
                                                key={index}
                                                label={item.label} 
                                                value={item.value} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-light">
                    <div className="d-flex justify-content-between">
                        <Link to="/stock" className="btn btn-outline-secondary">
                            <i className="fas fa-arrow-left me-2"></i>
                            Retour à la liste
                        </Link>
                        <Link 
                            to={`/stock/update/${st.refMateriel}`} 
                            className="btn btn-warning"
                        >
                            <i className="fas fa-edit me-2"></i>
                            Modifier
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable detail row component
function DetailRow({ label, value }) {
    return (
        <div className="list-group-item d-flex justify-content-between align-items-center py-2">
            <span className="fw-bold text-muted">{label}</span>
            <span className="text-dark text-end" style={{ maxWidth: '60%' }}>
                {value || <span className="text-muted">N/A</span>}
            </span>
        </div>
    );
}