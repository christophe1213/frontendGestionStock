import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
function AjouterFourn() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});  
    const handleInputChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('http://localhost:5251/fournisseur',inputs).then(function(response){
          console.log(response.data);
          navigate('/Fournisseur/AfficherFourn');
        })
        console.log(inputs);
    }
  return (
        <div>
          <h1 style={{position:"relative",left:"60px"}} className='titre'>VEUILLEZ AJOUTER DES FOURNISSEURS :</h1>   
          <nav>
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='../Fournisseur/AfficherFourn'>RETOUR</Link>
              </li>
            </ul> 
          </nav>   
            <form onSubmit={handleSubmit} className='form-control'>
                <label>NUMERO :
                <input className='nom' style={{marginLeft : '35px'}} 
                    type="text"
                    required
                    name="numImm"
                    value={inputs.numImm}
                    onChange={handleInputChange}
                /></label>
                <br/>
                <br/>
                <label>NOM :
                <input
                    type="text"
                    style={{marginLeft : '63px'}} 
                    required
                    name="nomFourn"
                    value={inputs.nomFourn}
                    onChange={handleInputChange}
                    className='nom'
                /></label>
                <br/>
                <br/>
                <label>ADRESSE :
                <input
                className='nom'
                    type="text"
                    style={{marginLeft : '36px'}} 
                    required
                    name="adresse"
                    value={inputs.adresse}
                    onChange={handleInputChange}
                /></label>
                <br/>
                <br/>
                <label>CONTACT :
                <input
                className='nom'
                    type="text"
                    style={{marginLeft : '33px'}} 
                    required
                    name="contact"
                    value={inputs.contact}
                    onChange={handleInputChange}
                /></label>
                <br/>
                <br/>
                <button type="submit" className='button1'>Ajouter</button>
            </form>
        </div>
    );
}

export default AjouterFourn;
