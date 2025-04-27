
import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
export default function UpdateStock(){

    const [displayBloc,setDisplayBloc]=useState({GE:"none",MOD:"none",CAB:"none"})
    const {ref}=useParams()
    const navigate=useNavigate()
    const [error, setError] = useState(null);

    const [dataStock,setDataStock]=useState({
        refMateriel:"",
        designation:"",
        situation:"DISPONIBLE",
        lieu:"",
        categorie:"",
    })
    const [detailGE,setDetailGE]=useState({
        puissance:"",
        marque:"",
        dimension:"",
    })
    const [detailCAB,setDetailCAB]=useState({
        gamme:"",
        dimension:"",
        color:"",
    })
    const [detailMOD,setDetailMOD]=useState({
        gamme:"",
        dimension:"",
    })
    const [btnSabmit,setBtnSubmit]=useState(true)
   //Check fields if they have values
    useEffect(() => {
        // Vérifier les champs communs requis
        const commonFieldsFilled = 
            dataStock.refMateriel.trim() !== "" && 
            dataStock.designation.trim() !== "" && 
            dataStock.lieu.trim() !== "" && 
            dataStock.categorie.trim() !== "";
        
        let specificFieldsFilled = false;
        
        // Vérifier les champs spécifiques selon la catégorie
        switch(dataStock.categorie) {
            case 'GROUPE ELECTROGENE':
                specificFieldsFilled = 
                    detailGE.puissance.trim() !== "" && 
                    detailGE.marque.trim() !== "" && 
                    detailGE.dimension.trim() !== "";
                break;
            case 'MODULAIRE':
                specificFieldsFilled = 
                    detailMOD.gamme.trim() !== "" && 
                    detailMOD.dimension.trim() !== "";
                break;
            case 'CABINES AUTONOMES':
                specificFieldsFilled = 
                    detailCAB.gamme.trim() !== "" && 
                    detailCAB.dimension.trim() !== "" && 
                    detailCAB.color.trim() !== "";
                break;
            default:
                specificFieldsFilled = false;
        }
        
        // Activer le bouton seulement si tous les champs requis sont remplis
        setBtnSubmit(!(commonFieldsFilled && specificFieldsFilled));
    }, [dataStock, detailGE, detailCAB, detailMOD]);
   //fetch data with the API
   useEffect(()=>{
    const fetchUpdateStock= async ()=>{
        try{
            const response = await fetch(`http://localhost:8000/api/stocks/${ref}/`);
        if(!response.ok){
            throw new Error("Réference non trouver")
        }
        const data=await response.json()

        setDataStock(data.data[0])
         switch (data.data[0].categorie) {
           case "GROUPE ELECTROGENE":
             setDisplayBloc({ GE: "block", MOD: "none", CAB: "none" });
             setDetailGE(data.data[1])
             break;
           case "MODULAIRE":
             setDisplayBloc({ GE: "none", MOD: "block", CAB: "none" });
             setDetailMOD(data.data[1])
             break;
           case "CABINES AUTONOMES":
             setDisplayBloc({ GE: "none", MOD: "none", CAB: "block" });
             setDetailCAB(data.data[1])
             break;
           default:
             setDisplayBloc({ GE: "none", MOD: "none", CAB: "none" });
             break;
         }
        }
        catch (err){
          setError(err.message)
          
        }
        
      }
      fetchUpdateStock()
   },[])
 //fuction to handel updating stock 
 const handelUpdate= async (e)=>{
e.preventDefault()
    console.log('moronto');
     let dataDetails = {};
     switch (dataStock.categorie) {
       case "GROUPE ELECTROGENE":
         dataDetails = { ...detailGE };
         break;
       case "MODULAIRE":
         dataDetails = { ...detailMOD };
         break;
       case "CABINES AUTONOMES":
         dataDetails = { ...detailCAB };
         break;
       default:
         break;
     }

     const formData = {
       ...dataStock,
       ...dataDetails,
     };


try{
    const response = await fetch(
      `http://localhost:8000/api/stock/update/${ref}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if(!response.ok){
      throw new Error("Ce reference n'existe pas")
    }
    const data=await response.json()
    navigate('/stock', {state:{"msg":data.msg}})
    

}catch (err){
setError(err.message)
}

 }
    return (
      <>
        <h1 class="text-center m-2 text-danger">
          Modification de : {dataStock.refMateriel}
        </h1>

        <form onSubmit={handelUpdate}>
          <div class="m-auto   p-4 w-75 borderShadaw">
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Designations</div>

              <div class="col-md-8">
                <input
                  name="designation"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={dataStock.designation || ""}
                  onChange={(e) => {
                    setDataStock({ ...dataStock, designation: e.target.value });
                  }}
                />
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Situation</div>

              <div class="col-md-8">
                <input
                  name="lieu"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={dataStock.situation || ""}
                  onChange={(e) => {
                    setDataStock({ ...dataStock, situation: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4 fs-6 text-dark">Emplacement</div>

              <div class="col-md-8">
                <input
                  name="lieu"
                  type="text"
                  class="form-control fs-6 text-secondary text-uppercase"
                  value={dataStock.lieu || ""}
                  onChange={(e) => {
                    setDataStock({ ...dataStock, lieu: e.target.value });
                  }}
                />
              </div>
            </div>

            <div id="GE" style={{ display: displayBloc.GE }}>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Puissance</div>
                <div class="col-md-8">
                  <input
                    name="puissance"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailGE.puissance || ""}
                    onChange={(e) => {
                      setDetailGE({ ...detailGE, puissance: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Marque</div>
                <div class="col-md-8">
                  <input
                    name="marque"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailGE.marque || ""}
                    onChange={(e) => {
                      setDetailGE({ ...detailGE, marque: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Dimension</div>
                <div class="col-md-8">
                  <input
                    name="dimensionGE"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailGE.dimension || ""}
                    onChange={(e) => {
                      setDetailGE({ ...detailGE, dimension: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <input
                  type="submit"
                  disabled={btnSabmit}
                  class="btn btn-success"
                  value="Enregistrer"
                />
              </div>
            </div>

            <div id="cabine" style={{ display: displayBloc.CAB }}>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Gamme</div>
                <div class="col-md-8">
                  <input
                    name="gammeCabine"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailCAB.gamme || ""}
                    onChange={(e) => {
                      setDetailCAB({ ...detailCAB, gamme: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Dimension</div>
                <div class="col-md-8">
                  <input
                    name="dimensionCabine"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailCAB.dimension || ""}
                    onChange={(e) => {
                      setDetailCAB({ ...detailCAB, dimension: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Color</div>
                <div class="col-md-8">
                  <input
                    name="color"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailCAB.color || ""}
                    onChange={(e) => {
                      setDetailCAB({ ...detailCAB, color: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <input
                  type="submit"
                  disabled={btnSabmit}
                  class="btn btn-success"
                  value="Enregistrer"
                />
              </div>
            </div>

            <div id="modulaire" style={{ display: displayBloc.MOD }}>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Gamme</div>
                <div class="col-md-8">
                  <input
                    name="gammeModulaire"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailMOD.gamme || ""}
                    onChange={(e) => {
                      setDetailMOD({ ...detailMOD, gamme: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-4 fs-6 text-dark">Dimension</div>
                <div class="col-md-8">
                  <input
                    name="dimensionModulaire"
                    type="text"
                    class="form-control fs-6 text-secondary text-uppercase"
                    value={detailMOD.dimension || ""}
                    onChange={(e) => {
                      setDetailMOD({ ...detailMOD, dimension: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <input
                  type="submit"
                  class="btn btn-success"
                  value="Enregistrer"
                  disabled={btnSabmit}
                />
                {/* <button class="btn btn-success">Enregistrer</button> */}
              </div>
            </div>
          </div>
        </form>
      </>
    );
}