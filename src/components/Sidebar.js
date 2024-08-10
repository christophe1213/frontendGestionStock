// Sidebar.js
import React from 'react';
import './styles.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1 className='menu'>MENU</h1>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="/Client/Afficher">CLIENT</Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/Fournisseur/AfficherFourn">FOURNISSEUR</Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/EntrerStock">ENTRER</Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/Produit/AfficherProduit">PRODUIT</Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to="/Commande/AfficherCommande">COMMANDES</Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/Commande/Facture">FACTURE</Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/dashboard">HISTOGRAMME </Link>
                </li>
                {/* <li className='sidebar-list-item'>
                    <Link to="/average">Average</Link>
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;

