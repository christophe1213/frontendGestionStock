import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import './note.css';

function ModifierProduit() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});  

    const {Idnote} = useParams();

    useEffect(() => {
      getNote();
    }, []);
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
    function getNote() {
      axios.get(`http://localhost:5251/produit/${Idnote}`)
        .then(function(response) {
          console.log(response.data)
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
    
        axios.put(`http://localhost:5251/produit/${Idnote}`, inputs)
          .then(function(response){
            console.log(response.data);
            navigate('/Produit/AfficherProduit');
          })
          .catch(function(error) {
            console.error('Une erreur est survenue lors de la modification de l\'étudiant:', error);
          });
    }
    
  return (
        <div>
          <h1>MODIFICATION D'UN PRODUIT :</h1>     
          <nav>
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='../Produit/AfficherProduit'>Afficher</Link>
              </li>
            </ul> 
          </nav>   
          <form onSubmit={handleSubmit} className='form-control'>
                <label>CODE PRODUIT :</label>
                <input className='inputModifier'
                    type="text" 
                    required 
                    name="codepro"
                    value={inputs.codepro}
                    onChange={handleNameChange}
                />
                <br/>
                <br/>
                <label>FOURNISSEUR :</label>
                    <select name="numImm" 
                      className='inputNumImm'  
                      onChange={handleNameChange} >
                      {fournisseurs.map((fournisseur, key) => (
                      <option key={key} className='nom' value={fournisseur.numImm} selected={fournisseur.numImm === inputs.numImm} >{fournisseur.nomFourn}</option>
                    ))}       
                  </select>
                <br/>
                <br/>
                <label>DESIGNATION :</label>
                <input className='inputModifier'
                    type="text" 
                    required 
                    name="designation"
                    value={inputs.designation}
                    onChange={handleNameChange}
                />
                <br/>
                <br/>
                <label> CATEGORIE:</label>
                <input className='inputModifier'
                    type="text" 
                    required 
                    name="categorie"
                    value={inputs.categorie}
                    onChange={handleNameChange}
                />
                <br/>
                <br/>
                <label>PRIX UNITAIRE :</label>
                <input className='inputModifier'
                    type="number" 
                    required 
                    name="prix_unitaire"
                    value={inputs.prix_unitaire}
                    onChange={handleNameChange}
                />
            <br/>
            <br/>
            <br/>
            <button type="submit" className='button1'>Modifier </button>  
          </form>
        </div>
      );
}


export default ModifierProduit;