import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

import "./Afficher.css";
function AjouterEntrer() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    //Combo box produit
    const [produits, setProduit] = useState([]);
  
    useEffect(() => {
      getProduit();
    }, []);
  
    function getProduit() {
      axios.get('http://localhost:5251/produit')
        .then(function(response) {
          console.log(response.data)
          setProduit(response.data);
          if (response.data.length > 0) {
            setInputs(values => ({...values, codepro: response.data[0].codepro}));
        }
        })
        .catch(function(error) {
          console.error('Une erreur et survenue lors de la récupération des produits:', error);
        });
        }
    const handleNameChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('http://localhost:5251/entrer',inputs).then(function(response){
        console.log(response.data);
        console.log(inputs);
        navigate('/EntrerStock');
        }).catch(function(error){
          alert(error.response.data.message)
        })
        console.log(inputs);
    }
  return (
        <div>
          <h1 className='titre'>ENREGISTREMENT DES STOCKS EN ENTRANT :</h1>   
          <nav >
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='/EntrerStock'>RETOUR</Link>
              </li>
            </ul> 
          </nav>   
          <form onSubmit={handleSubmit} className='form-control'>
          <label>IDENTIFICATION :
            <input className='nom' style={{marginLeft : '20px'}}  
              type="number" 
              required 
              name="idEntrer"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
            <label>PRODUIT :
            <select name="codepro" 
                style={{marginLeft : '143px'}}  
                className='codepro'
                onChange={handleNameChange} >
                {produits.map((produit, key) => (
                <option key={key} className='nom' value={produit.codepro} >{produit.designation}</option>
            ))}       
            </select>
            </label>
            <br/>
            <br/>
            <label>QUANTITE :
            <input style={{marginLeft : '60px'}}  
              type="number" 
              required 
              name="quantite"
              onChange={handleNameChange}
            /></label>
             <br/>
             <br/>
            <label>DATE D'ENTRER :
            <input 
              style={{marginLeft : '25px'}}  
              className='date'
              type="datetime-local"
              required
              name="date"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
            <button type="submit" className='button'><strong>AJOUTER</strong></button>  
          </form>
        </div>
      );
}

export default AjouterEntrer