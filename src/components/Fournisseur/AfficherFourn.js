import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import "./matiere.css"
import SupprimerFourn from './SupprimerFourn';

function AfficherFourn() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [idSupprimer, setdelete]=useState(0);
  
  const handleidDelete=(id)=>{
        setdelete(id)
  }
  useEffect(() => {
    getFournisseurs();
  }, []);

  function getFournisseurs() {
    axios.get('http://localhost:5251/fournisseur')
      .then(function(response) {
        setFournisseurs(response.data);
      })
      .catch(function(error) {
        console.error('Une erreur et survenue lors de la récupération des étudiants:', error);
      });
      }

      const deleteFournisseur = (numImm) => {
        axios.delete(`http://localhost:5251/fournisseur/${numImm}`)
        .then(function (response) {
          getFournisseurs();
          console.log(response.data)
        })
        .catch(function (error) {       
          console.error('Une erreur est survenue lors de la suppression:', error);
        });
      }      

  return (
    <div className="afficher-container">
      {modalOpen && <SupprimerFourn setOpenModal={setModalOpen} id={idSupprimer} getFournisseurs={getFournisseurs} />}
      <h1>LISTE DES FOURNISSEURS </h1>
      <nav>
            <ul className='student-option'>    
              <li className='option-etudiant1'>
                <Link to='../Fournisseur/AjouterFourn'>Ajouter</Link>
              </li>
            </ul> 
          </nav>  
      <table className='student-table'>
        <thead className='stu-head'>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Contact</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody className='stu-body'>
          {fournisseurs.map((fournisseur, key) => (
            <tr key={key}>
              <td>{fournisseur.numImm}</td>
              <td>{fournisseur.nomFourn}</td>
              <td>{fournisseur.adresse}</td>
              <td>{fournisseur.contact}</td>
              {/* <td>
                <Link to={`/Fournisseur/ModifierFourn/${fournisseur.numImm}`}>Modifier</Link>
              </td>
              <td>
                <button onClick={() => deleteFournisseur(fournisseur.numImm)}
                style={{ background:'red', color:'black'}}>Supprimer</button>
              </td> */}
              <td class="modifier" title="modifier">
                <Link to={`/Fournisseur/ModifierFourn/${fournisseur.numImm}`} style={{ color: 'green' }}>
                
                <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#399913" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </Link>
              </td>
              <td class="supprimer" title="supprimer">
                <svg onClick={() => {
                    setModalOpen(true);
                    setdelete(fournisseur.numImm)
                    }} x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
                      <path fill="red" d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                  </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AfficherFourn;
