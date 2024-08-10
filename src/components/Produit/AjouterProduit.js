import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './note.css';

function AjouterProduit() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});  
    const [fournisseurs, setFournisseur] = useState([]);
  
    useEffect(() => {
      getFournisseur();
    }, []);
  
    function getFournisseur() {
      axios.get('http://localhost:5251/fournisseur')
        .then(function(response) {
          console.log(response.data)
          setFournisseur(response.data);
          if (response.data.length > 0) {
            setInputs(values => ({...values, numImm: response.data[0].numImm}));
        }
        })
        .catch(function(error) {
          console.error('Une erreur et survenue lors de la récupération des étudiants:', error);
        });
        }
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // setFormData(prevState => ({ ...prevState, [name]: value }));
        setInputs(values => ({...values, [name]:value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post('http://localhost:5251/produit',inputs)
            .then(function(response) {
                console.log(response.data);
                navigate('/Produit/AfficherProduit');
            })
            .catch(function(error) {
                alert(error.response.data.message)
                console.error('Une erreur est survenue lors de l\'envoi des données:', error);
            });
    }    

    return (
        <div>
            <h1 style={{marginLeft : '250px'}} >ENTRER DES PRODUITS :</h1>  
            <nav>
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='../Produit/AfficherProduit'>RETOUR</Link>
              </li>
              
            </ul> 
          </nav>     
            <form onSubmit={handleSubmit} className='form-control'>
                <label>CODE DU PRODUIT :
                <input className='inputcode'
                    type="text" 
                    required 
                    name="codepro"
                    onChange={handleInputChange}
                /></label>
                <br/>
                <br/>
                <label>FOURNISSEUR :
                  <select name="numImm" 
                    className='inputFourn'  
                    onChange={handleInputChange} >
                    {fournisseurs.map((fournisseur, key) => (
                    <option key={key} className='nom' value={fournisseur.numImm} >{fournisseur.nomFourn}</option>
                    ))}       
                  </select>
                </label>
                <br/>
                <br/>
                <label>DESIGNATION :
                <input className='inputdesign'
                    type="text" 
                    required 
                    name="designation"
                    onChange={handleInputChange}
                />
                </label>
                <br/>
                <br/>
                <label> CATEGORIE :
                <input className='inputcate'
                    type="text" 
                    required 
                    name="categorie"
                    onChange={handleInputChange}
                />
                </label>
                <br/>
                <br/>
                <label> PRIX UNITAIRE :
                <input className='inputprix'
                    type="number" 
                    required 
                    name="prix_unitaire"
                    onChange={handleInputChange}
                /></label>
                <br/>
                <br/>
                <button type="submit" className='button1' >Ajouter </button>  
            </form>
        </div>
    );
}

export default AjouterProduit;
