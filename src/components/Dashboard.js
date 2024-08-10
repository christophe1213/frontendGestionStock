import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell,Tooltip, ResponsiveContainer } from 'recharts';
import Example from './Example'; // Make sure to import the Example component
import axios from 'axios';

const Dashboard = () => {
  const [moyenneDeClasse, setMoyenneDeClasse] = useState(0);
  const [moyenneMaximale, setMoyenneMaximale] = useState(0);
  const [moyenneMinimale, setMoyenneMinimale] = useState(0);
  const [erreur, setError] = useState(null);

  
 const [NombreTotal, setNombreTotal] = useState(0);
 const [produits, setProduits] = useState([]);

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

 const fetchNombreTotal = () => {
   axios.get('http://localhost:5251/NombreTotal')
     .then(response => {
       if (response.data.length > 0) {
         setNombreTotal(response.data[0].qteEntre);
       }
     })
     .catch(error => {
       setError('Une erreur est survenue lors de la récupération des données.');
     });
 };

 useEffect(() => {
   fetchNombreTotal();

   const interval = setInterval(() => {
     fetchNombreTotal();
   }, 10000); // Vérifie toutes les 10 secondes

   return () => clearInterval(interval);
 }, []);


  useEffect(() => {
    axios.get('http://localhost/BACKEND/Registre/Affichage_bulletin.php')
      .then(response => {
        setMoyenneDeClasse(response.data.class_moyenne);
        setMoyenneMaximale(response.data.max_moyenne);
        setMoyenneMinimale(response.data.min_moyenne);
      })
      .catch(error => {
        console.error('Une erreur est survenue lors de la récupération des moyennes:', error);
      });
  }, []);

  return (
    <div className='dash'>
      <div className='box box1'>
        <h4 className='title'>Recette total :</h4>
        <h2 className='body' style={{color:'yellow'}}>{NombreTotal}</h2>
      </div>
      {/* <div className='box box2'>
        <h4 className='title'>MOYENNE MAXIMALE</h4>
        <h2 className='body' style={{color:'green'}}>{moyenneMaximale}</h2>
      </div>
      <div className='box box3'>
        <h4 className='title'>MOYENNE MINIMALE</h4>
        <h2 className='body' style={{color:'red'}}>{moyenneMinimale}</h2>
      </div> */}
      {/* <div className='box box4'>
          <CustomPieChart />
      </div> */}
      <div className='box box5'>
        <h2 className='title' style={{color:'whitesmoke'}}>Quantité des produits actuels  </h2>
        <Example />
      </div>
      <br/>
    </div>
  );
};

export default Dashboard;
