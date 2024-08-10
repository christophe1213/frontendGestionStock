import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les produits depuis l'API
    const getProduits = async () => {
      try {
        const response = await axios.get('http://localhost:5251/produit');
        console.log(response.data);
        // Supposons que response.data est un tableau d'objets avec des propriétés 'name' et 'value'
        setData(response.data);
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des produits:', error);
      }
    };

    getProduits();
  }, []);

  return (
    <div>
      <BarChart
        width={800}
        height={430}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="designation" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="qte_produit" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Dashboard;
