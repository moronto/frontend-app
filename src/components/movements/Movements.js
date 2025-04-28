import { useEffect, useState } from "react"
export default function Movement(){
    const [movement,setMovement]=useState([])
    useEffect(()=>{
        const fetchMovement = async ()=>{
            const resp = await fetch("http://127.0.0.1:8000/api/movements/");
            const data=await resp.json()
            setMovement(data)
            console.log(movement);
            console.log(data);
        }
        fetchMovement()
    },[])
    return(
        <>

 
<div class="promptDelete" style={{display:'none'}}>
    <div class="msg " >
        <h3>Voulez vous supprimer ce Mouvement ?</h3>
        <div class="d-flex justify-content-center">
            <a  id='btnSupprimer' class="btn btn-success w-25">Oui</a>
            <button class="btn btn-danger ms-4 w-25" onclick="annuler()">Non</button>
        </div>
    </div>
</div>

<div class=" mt-1">
    <div class="row m-3 ">
        <div class="col-md-3"><label for="search">La valeur a rechercher :</label></div>
        <div class="col-md-9"> <input id="searchMovement" type="text" class="form-control" /></div>
    </div>
</div>    



<div class="row bg-dark p-1 text-white">
    <div class="col-md-2">Mouvement</div>
    <div class="col-md-2">Date Mouvement</div>
    <div class="col-md-2">Reference</div>
    <div class="col-md-2">Designation</div>
    <div class="col-md-2">Client</div>
    <div class="col-md-2">Action</div>

</div>


{
movement.map((move)=>(
     <div id="bodyMovement">
      <div class="row bg-secondary-subtle p-2">
        <div class="col-md-2">{move.typeMovement}</div>
        <div class="col-md-2">{move.dateMovement}</div>
        <div class="col-md-2">{move.refMateriel}</div>
        <div class="col-md-2">{move.designation}</div>
        <div class="col-md-2">{move.client}</div>
        <div class="col-md-2 flex-row">
          <a href="{% url 'detailMovement' d.id %}">
            <input type="button" class="btn btn-info" value="Details" />
          </a>
          <a onclick="addHref('{{url}}')" class="btn btn-danger">
            
            Supprimer
          </a>
        </div>
      </div>
    </div>
))
}

        </>
    )
}