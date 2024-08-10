import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

function ModifierFourn() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});  

    const {Codemat} = useParams();

    useEffect(() => {
      getFournisseur();
    }, []);
  
    function getFournisseur() {
      axios.get(`http://localhost:5251/fournisseur/${Codemat}`)
        .then(function(response) {
          setInputs(response.data);
        })
        .catch(function(error) {
          console.error('Une erreur est survenue lors de la récupération des étudiants:', error);
        });
    }
    const handleNameChange = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]:value}));
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(inputs)
        axios.put(`http://localhost:5251/fournisseur/${Codemat}`, inputs)
          .then(function(response){
            console.log(response.data);
            navigate('../Fournisseur/AfficherFourn');
          })
          .catch(function(error) {
            console.error('Une erreur est survenue lors de la modification de fournisseur:', error);
          });
    }
    
  return (
        <div>
          <h1 className="titre">MODIFICATION D'UN FOURNISSEUR :</h1>     
          <nav>
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='../Fournisseur/AfficherFourn'>AFFICHER</Link>
              </li>
            </ul> 
          </nav>   
          <form onSubmit={handleSubmit} className='form-control'>
          <label>NUMERO :
                <input className='nom' style={{marginLeft : '34px'}} 
                    type="text"
                    required
                    name="numImm"
                    value={inputs.numImm}
                    onChange={handleNameChange}
                /></label>
                <br/>
                <br/>
                <label>NOM :
                <input
                className='nom'
                    type="text"
                    style={{marginLeft : '63px'}} 
                    required
                    name="nomFourn"
                    value={inputs.nomFourn}
                    onChange={handleNameChange}
                /></label>
                <br/>
                <br/>
                <label>ADRESSE :
                <input
                className='nom'
                    type="text"
                    style={{marginLeft : '38px'}} 
                    required
                    name="adresse"
                    value={inputs.adresse}
                    onChange={handleNameChange}
                /></label>
                <br/>
                <br/>
                <label>CONTACT :
                <input
                className='nom'
                    type="text"
                    style={{marginLeft : '35px'}} 
                    required
                    name="contact"
                    value={inputs.contact}
                    onChange={handleNameChange}
                /></label>
            <br/>
            <br/>
            <button type="submit"  className='button1'>Modifier </button>  
          </form>
        </div>
      );
}


export default ModifierFourn;