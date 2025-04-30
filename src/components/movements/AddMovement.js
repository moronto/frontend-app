import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function AddMovement() {
  const [dataForm, setDataForm] = useState({
    typeMovement:"",
    dateMovement:new Date().toISOString().split('T')[0],
    typeLocation:"",
    depot:"",
    refMateriel:"",
    designation:"",
    qte:"",
    client:"",
    lieu:"",
    matTrans:"",
    condTrans:"",
    observations:"",
  });

console.log(dataForm.dateMovement)


  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici votre logique de soumission
    // displayAlert('Succès', 'Le mouvement a été enregistré avec succès');
  };

  return (
    <div className="container py-4">
  

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">
            <i className="fas fa-exchange-alt me-2"></i>
            Nouveau Mouvement de Stock
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row g-3">
              {/* Colonne de gauche */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Type de Mouvement</label>
                  <select 
                    className="form-select"
                    name="typeMovement" 
                    id="typeMovement"
                    value={dataForm.typeMovement}
                    onChange={(e)=>{setDataForm({...dataForm ,typeMovement:e.target.value})}}
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="ENTREE">ENTREE</option>
                    <option value="SORTIE">SORTIE</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Référence Matériel</label>
                  <input 
                    list="ref" 
                    className="form-control"
                    name="refMateriel" 
                    id="refMateriel" 
                    value={dataForm.refMateriel}
                    onChange={(e)=>{setDataForm({...dataForm ,refMateriel:e.target.value})}}
                    required
                  />
                  <datalist id="ref">
                    <option value="1">Matériel 1</option>
                    <option value="2">Matériel 2</option>
                  </datalist>
                </div>

                

                <div className="mb-3">
                  <label className="form-label fw-bold">Type de Location</label>
                  <select 
                    className="form-select"
                    name="typeLocation"
                    value={dataForm.typeLocation}
                    onChange={(e)=>{setDataForm({...dataForm ,typeLocation:e.target.value})}}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="CHANTIER">CHANTIER</option>
                    <option value="EVENEMENT">EVENEMENT</option>
                    <option value="VENTE">VENTE</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Dépôt</label>
                  <select 
                    className="form-select"
                    name="depot"
                    value={dataForm.depot}
                    onChange={(e)=>{setDataForm({...dataForm ,depot:e.target.value})}}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="BOUSKORA">BOUSKORA</option>
                    <option value="BERRCHID">BERRCHID</option>
                    <option value="EL JORF">EL JORF</option>
                    <option value="MARRAKECH">MARRAKECH</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Matricule Transport</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="matTrans" 
                    value={dataForm.matTrans}
                    onChange={(e)=>{setDataForm({...dataForm ,matTrans:e.target.value})}}

                    
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Lieu de location</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="lieu" 
                    id="lieu" 
                    value={dataForm.lieu}
                    onChange={(e)=>{setDataForm({...dataForm ,lieu:e.target.value})}}
                    required 
                  />
                </div>
               

                
              </div>

              {/* Colonne de droite */}
              <div className="col-md-6">
              <div className="mb-3">
                  <label className="form-label fw-bold">Date de Mouvement</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="dateMovement" 
                    value={dataForm.dateMovement}
                    onChange={(e)=>{setDataForm({...dataForm ,dateMovement:e.target.value})}}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Désignation</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="designation" 
                    name="designation" 
                    value={dataForm.designation}
                    onChange={(e)=>{setDataForm({...dataForm ,designation:e.target.value})}}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Quantité</label>
                  <input 
                    name="qte" 
                    type="number" 
                    className="form-control"
                    min="1"
                    defaultValue="1"
                    value={dataForm.qte}
                    onChange={(e)=>{setDataForm({...dataForm ,qte:e.target.value})}}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Client</label>
                  <input 
                    list="clt" 
                    className="form-control"
                    name="client" 
                    value={dataForm.client}
                    onChange={(e)=>{setDataForm({...dataForm ,client:e.target.value})}}
                    required
                  />
                  <datalist id="clt">
                    <option value="1">Client 1</option>
                    <option value="2">Client 2</option>
                  </datalist>
                </div>

                

                <div className="mb-3">
                  <label className="form-label fw-bold">Conducteur transport</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="condTrans" 
                    value={dataForm.condTrans}
                    onChange={(e)=>{setDataForm({...dataForm ,condTrans:e.target.value})}}
                  />
                </div>

                
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label fw-bold">Observations</label>
                <textarea 
                  className="form-control"
                  name="observations" 
                  // rows="3"
                  value={dataForm.observations}
                  onChange={(e)=>{setDataForm({...dataForm ,observations:e.target.value})}}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="card-footer bg-light">
            <div className="d-flex justify-content-end">
              <button 
                type="submit" 
                className="btn btn-success px-4"
              >
                <i className="fas fa-save me-2"></i>
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}