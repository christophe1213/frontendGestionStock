import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

function Modifier() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});  

    const {IdEtudiant} = useParams();

    useEffect(() => {
      getEtudiant();
    }, []);
  
    function getEtudiant() {
      axios.get(`http://localhost:5251/client/${IdEtudiant}`)
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
    
        axios.put(`http://localhost:5251/client/${IdEtudiant}`, inputs)
          .then(function(response){
            console.log(response.data);
            navigate('/');
          })
          .catch(function(error) {
            console.error('Une erreur est survenue lors de la modification de l\'étudiant:', error);
          });
    }
    
  return (
        <div>
          <h1 style={{position:"relative",left:"60px"}}>MODIFICATION D'UN CLIENT :</h1>     
          <nav>
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='../Client/Afficher'>AFFICHER</Link>
              </li>
            </ul> 
          </nav>   
          <form onSubmit={handleSubmit}  className='form-control'>
            <label>NOM :
            <input className='nom' style={{marginLeft : '70px'}}
              type="text" 
              value={inputs.nomClient}
              required 
              name="Nom"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
            <label>ADRESSE(S) :
            <input 
              type="text" 
              style={{marginLeft : '28px'}}
              value={inputs.adresse}
              required 
              name="adresse"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
             <label>TELEPHONE :
            <input className='nom'
              type="text"
              style={{marginLeft : '28px'}}
              value={inputs.numtel} 
              required 
              name="numtel"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
            <button type="submit" className='button1'>Modifier </button>  
          </form>
        </div>
      );
}


export default Modifier