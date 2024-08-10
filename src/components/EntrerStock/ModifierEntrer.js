import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

function ModifierEntrer() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});  

    const {IdEntrer} = useParams();

    useEffect(() => {
      getEtudiant();
    }, []);
  
    function getEtudiant() {
      axios.get(`http://localhost:5251/entrer/${IdEntrer}`)
        .then(function(response) {
          console.log(IdEntrer)
          setInputs(response.data);
        })
        .catch(function(error) {
          console.error('Une erreur est survenue lors de la récupération des entrer des stocks:', error);
        });
    }
    const handleNameChange = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]:value}));
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
    
        axios.put(`http://localhost:5251/entrer/${IdEntrer}`, inputs)
          .then(function(response){
            console.log(response.data);
            navigate('/EntrerStock');
          })
          .catch(function(error) {
            console.error('Une erreur est survenue lors de la modification de entrer:', error);
          });
    }
    
  return (
        <div>
          <h1 style={{ marginLeft: '250px' }}>MODIFICATION D'UN ENTRER DU STOCK :</h1>     
          <nav>
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='../EntrerStock'>AFFICHER</Link>
              </li>
            </ul> 
          </nav>   
          <form onSubmit={handleSubmit} className='form-control'>
          <label>PRODUIT(S) :
          <input style={{ marginLeft: '34px' }}
            type="text"
            value={inputs.codepro}
            required
            name="codepro"
            onChange={handleNameChange}
          />
        </label>
      
        <br /><br />
        <label>QUANTITE :
          <input style={{ marginLeft: '42px' }}
            type="text"
            value={inputs.quantite}
            required
            name="quantite"
            onChange={handleNameChange}
          />
        </label>
        <br /><br />
        <label>DATE:
          <input style={{ marginLeft: '82px' }}
            type="datetime-local"
            value={inputs.date}
            required
            name="date"
            onChange={handleNameChange}
          />
        </label>
            <br/>
            <br/>
            <button type="submit" className='button4'>Modifier </button>  
          </form>
        </div>
      );
}


export default ModifierEntrer