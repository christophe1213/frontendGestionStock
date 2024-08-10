import React from "react";
import "./../../model.css";
import axios from 'axios';

function SupprimerFourn(props) {

  const a="christophe"
  function supprimer(b)
  {
     console.log(b+"supprimer")
     axios.delete(`http://localhost:5251/fournisseur/${b}`)
     .then(function(response) {
       console.log(response.data);
        props.getFournisseurs();
        props.setOpenModal(false); 

     })
     .catch(function(error) {
       console.error('Une erreur est survenue lors de la suppression :', error);
     });
  }
  return (
    <div className="message">
      <div className="modal">
        <div class="icons">
                    <svg  onClick={() => {
               props.setOpenModal(false);
            }} viewBox="0 0 24 24" width="24" height="24" >
                        <path fill="#FF2525" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"/>
                    </svg>
            </div> 
        <p className="tittre_message">Vous volez supprimer</p>
          <button className="btn_confi" onClick={()=>{
            supprimer(props.id)
          
          }}>OUI</button>
          <button className="btn_confi" onClick={()=>{
            props.setOpenModal(false);
          }}>NON</button>
      </div>
    </div>
  );
}

export default SupprimerFourn;