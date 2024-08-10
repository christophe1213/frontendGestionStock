import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Afficher.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Table, Button } from 'react-bootstrap';
import PDFGenerator from './PDFGenerator';
import { useLocation } from 'react-router-dom';

function Facture() {
    const location = useLocation();
    const [factures, setFactures] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [idSupprimer, setdelete] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleidDelete = (id) => {
        setdelete(id);
    };

    useEffect(() => {
        // Recharger les factures si l'état `reload` est défini
        if (location.state?.reload) {
            getFacture();
        }
    }, [location.state?.reload]); // Dépendance sur `location.state?.reload`

    useEffect(() => {
        // Recharger les factures au premier chargement de la page
        getFacture();
    }, []);

    function getFacture() {
        axios.get('http://localhost:5251/facture')
            .then(function (response) {
                setFactures(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.error('Une erreur est survenue lors de la récupération des clients :', error);
                setError('Une erreur est survenue lors de la récupération des données.');
                setLoading(false);
            });
    }

    const deleteClient = (idcommande) => {
        axios.delete(`http://localhost:5251/commande/${idcommande}`)
            .then(function (response) {
                console.log(response.data);
                getFacture(); 
            })
            .catch(function (error) {
                console.error('Une erreur est survenue lors de la suppression :', error);
            });
    };

    const groupByClientAndDate = (factures) => {
        const grouped = {};
        factures.forEach(facture => {
            const key = `${facture.nom}_${facture.date}`;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(facture);
        });
        return grouped;
    };

    const groupedFactures = groupByClientAndDate(factures);

    if (loading) {
        return <div>Chargement des données...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="afficher-container">
            {modalOpen && <Facture setOpenModal={setModalOpen} id={idSupprimer} getFacture={getFacture} />}
            <h1>GENERER LE FACTURE DE CLIENT :</h1>
            <table className='student-table'>
                <thead className='stu-head'>
                    <tr>
                        <th>Nom</th>
                        <th>Designation</th>
                        <th>Quantite</th>
                        <th>Prix unitaire</th>
                        <th>Date</th>
                        <th>Facture</th>
                    </tr>
                </thead>
                <tbody className='stu-body'>
                    {factures.map((facture, key) => (
                        <tr key={key}>
                            <td>{facture.nom}</td>
                            <td>{facture.designation}</td>
                            <td>{facture.quantite}</td>
                            <td>{facture.prix_unitaire}</td>
                            <td>{facture.date}</td>
                            <td>
                            <PDFDownloadLink 
                                document={<PDFGenerator factures={groupedFactures[`${facture.nom}_${facture.date}`]} />} 
                                fileName={`facture_${facture.nom}_${facture.date}.pdf`}
                            >
                                {({ loading }) => (
                                    <Button className='Telecharger' variant="primary">
                                        {loading ? 'Chargement du document...' : 'Télécharger'}
                                    </Button>
                                )}
                            </PDFDownloadLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Facture;
