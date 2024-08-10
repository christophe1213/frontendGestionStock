import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import './note.css';
import SupprimerProduit from './SupprimerProduit';

function AfficherProduit() {
  const [produits, setProduits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [idSupprimer, setdelete]=useState(0);

  const handleidDelete=(id)=>{
    setdelete(id)
  }

  useEffect(() => {
    getProduits();
  }, []);

  function getProduits() {
    axios.get('http://localhost:5251/produit')
      .then(function(response) {
        console.log(response.data)
        setProduits(response.data);
      })
      .catch(function(error) {
        console.error('Une erreur et survenue lors de la récupération des étudiants:', error);
      });
      }

      const deleteProduit = (codepro) => {
        axios.delete(`http://localhost:5251/produit/${codepro}`, {
          data: {
            codepro: codepro
          }
        })
        .then(function (response) {
          console.log(response.data);
          getProduits();
        })
        .catch(function (error) {
          console.error('Une erreur est survenue lors de la suppression:', error);
        });
      }      

  return (
    <div>
        {modalOpen && <SupprimerProduit setOpenModal={setModalOpen} id={idSupprimer} getProduits={getProduits} />}
      <h1>AFFICHAGE DES PRODUITS</h1>
      <nav>
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='../Produit/AjouterProduit'>Ajouter</Link>
              </li>
            </ul> 

          </nav>  
      <table className='student-table'>
        <thead className='stu-head'>
          <tr>
            <th>N°</th>
            <th>Non fournisseur</th>
            <th>Design</th>
            <th>Categorie</th>
            <th>Prix unitaire</th>
             <th>quantite</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody className='stu-body'>
          {produits.map((produit, key) => (
            <tr key={key}>
              <td>{produit.codepro}</td>
              <td>{produit.nomFourn}</td>
              <td>{produit.designation}</td>
              <td>{produit.categorie}</td>
              <td>{produit.prix_unitaire}</td>
              <td>{produit.qte_produit}</td>
              <td>
                <Link to={`../Produit/ModifierProduit/${produit.codepro}`}>
                <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#399913" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </Link>
              </td>
              <td>
                 <svg onClick={() => {
                    setModalOpen(true);
                    setdelete(produit.codepro)
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
export default AfficherProduit;
