import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Afficher.css";

function AjouterCommande() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        idcommande: '',
        idclient: '',
        codepro: '',
        quantite: '',
        date: ''
    });
    const [clients, setClients] = useState([]);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        getClient();
        getProduit();
    }, []);

    const getClient = async () => {
        try {
            const response = await axios.get('http://localhost:5251/client');
            setClients(response.data);
            if (response.data.length > 0) {
                setInputs(prevInputs => ({ ...prevInputs, idclient: response.data[0].idclient }));
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const getProduit = async () => {
        try {
            const response = await axios.get('http://localhost:5251/produit');
            setProduits(response.data);
            if (response.data.length > 0) {
                setInputs(prevInputs => ({ ...prevInputs, codepro: response.data[0].codepro }));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5251/commande', inputs);
            navigate('/Commande/AfficherCommande', { state: { reload: true } });
        } catch (error) {
            console.error('Error adding command:', error);
            alert(error.response.data.message);
        }
    };    

    return (
        <div>
            <h1 className='titre'>AJOUTER UNE COMMANDE :</h1>
            <nav>
                <ul className='ajout'>
                    <li className='lien-ajout'>
                        <Link to='/Commande/AfficherCommande'>RETOUR</Link>
                    </li>
                </ul>
            </nav>
            <form onSubmit={handleSubmit} className='form-control'>
                <label>
                    N° COMMANDE :
                    <input
                        className='nom'
                        style={{ marginLeft: '16px' }}
                        type="text"
                        required
                        name="idcommande"
                        value={inputs.idcommande}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    CLIENT :
                    <select
                        name="idclient"
                        className='inputFourn'
                        value={inputs.idclient}
                        onChange={handleChange}
                    >
                        {clients.map(client => (
                            <option key={client.idclient} value={client.idclient}>
                                {client.nomClient}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <br />
                <label>
                    PRODUIT :
                    <select
                        name="codepro"
                        className='inputFourn'
                        value={inputs.codepro}
                        onChange={handleChange}
                    >
                        {produits.map(produit => (
                            <option key={produit.codepro} value={produit.codepro}>
                                {produit.designation}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <br />
                <label>
                    QUANTITÉ :
                    <input
                        style={{ marginLeft: '57px' }}
                        type="number"
                        required
                        name="quantite"
                        value={inputs.quantite}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    DATE :
                    <input
                        style={{ marginLeft: '95px' }}
                        className='date'
                        type="datetime-local"
                        required
                        name="date"
                        value={inputs.date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <button type="submit" className='button1'>
                    <strong>AJOUTER</strong>
                </button>
            </form>
        </div>
    );
}

export default AjouterCommande;
