import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Afficher.css';

function ModifierCommande() {
      const navigate = useNavigate();

      const [inputs, setInputs] = useState({});  

      const {idcommande} = useParams();

      useEffect(() => {
        getMatiere();
      }, []);

      function getMatiere() {
        axios.get(`http://localhost:5251/commande/${idcommande}`)
          .then(function(response) {
            setInputs(response.data);
          })
          .catch(function(error) {
            console.error('Une erreur est survenue lors de la récupération des produits:', error);
          });
      }
      const handleNameChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
      }
      
      const handleSubmit = (event) =>{
          event.preventDefault();
      
          axios.put(`http://localhost:5251/commande/${idcommande}`, inputs)
            .then(function(response){
              console.log("modifier"+response.data);
               navigate('/Commande/AfficherCommande');
            })
            .catch(function(error) {
              console.error('Une erreur est survenue lors de la modification de l\'produit:', error);
            });
  };

  return (
    <div>
      <h1 style={{ marginLeft: '210px' }}>MODIFICATION D'UNE COMMANDE :</h1>
      <nav>
        <ul className='ajout'>
          <li className='lien-ajout'>
            <Link to='../Commande/AfficherCommande'>AFFICHER</Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit} className='form-control'>
        <label>COMMANDE :
          <input style={{ marginLeft: '23px' }}
            type="text"
            value={inputs.idcommande}
            required
            name="idcommande"
            onChange={handleNameChange}
          />
        </label>
        <br /><br />
        <label>CLIENT :
          <input style={{ marginLeft: '67px' }}
            type="text"
            value={inputs.idclient}
            required
            name="idclient"
            onChange={handleNameChange}
          />
        </label>
        <br /><br />
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
            className='date'
            type="datetime-local"
            value={inputs.date}
            required
            name="date"
            onChange={handleNameChange}
          />
        </label>
        <br /><br />
        <button type="submit" className='button3'>Modifier</button>
      </form>
    </div>
  );
}

export default ModifierCommande;
