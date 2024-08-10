import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Ajouter from "./components/Client/Ajouter";
import AjouterFourn from "./components/Fournisseur/AjouterFourn";
import AfficherFourn from "./components/Fournisseur/AfficherFourn";
import ModifierFourn from "./components/Fournisseur/ModifierFourn";
import AjouterProduit from "./components/Produit/AjouterProduit";
import Modifier from "./components/Client/Modifier";
import Afficher from "./components/Client/Afficher";
import Dashboard from "./components/Dashboard";
import AfficherProduit from "./components/Produit/AfficherProduit";
import ModifierProduit from "./components/Produit/ModifierProduit";
import Affichage_commande from "./components/Commande/AfficherCommande";
import  AjouterCommande from"./components/Commande/AjouterCommande";
import ModifierCommande from "./components/Commande/ModifierCommande";
import Afficher_entrer from"./components/EntrerStock/AfficherEntrer";
import AjouterEntrer from "./components/EntrerStock/AjouterEntrer";
import ModifierEntrer from "./components/EntrerStock/ModifierEntrer";
import Facture from "./components/Commande/Facture";
import PDFGenerator from "./components/Commande/PDFGenerator";
import "./App.css";
import  Sidebar  from "./components/Sidebar";


function App() {
  return (
  <body>
    <div className="App">
       <BrowserRouter>
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <Routes>
              <Route index element={<Afficher />} />
              <Route path="Fournisseur/AjouterFourn" element={<AjouterFourn/>} />
              <Route path="Produit/AjouterProduit" element={<AjouterProduit/>} />
              <Route path="/Client/Modifier/:IdEtudiant" element={<Modifier/>} />
              <Route path="/Client/Modifier" element={<Modifier/>} />
              <Route path="/Client/Afficher" element={<Afficher/>} />
              <Route path="/Client/Ajouter" element={<Ajouter/>} />
              <Route path="/Fournisseur/ModifierFourn" element={<ModifierFourn/>} />
              <Route path="/Fournisseur/AfficherFourn" element={<AfficherFourn/>} />
              <Route path="/Fournisseur/ModifierFourn/:Codemat" element={<ModifierFourn/>} />
              <Route path="/Commande/AfficherCommande" element={<Affichage_commande/>} />
              <Route path="/Commande/AjouterCommande" element={<AjouterCommande/>} />
              <Route path="/Commande/ModifierCommande/:idcommande" element={<ModifierCommande/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Produit/AfficherProduit" element={<AfficherProduit />} />
              <Route path="/Produit/ModifierProduit/:Idnote" element={<ModifierProduit />} />
              <Route path="/EntrerStock" element={<Afficher_entrer />} />
              <Route path="/EntrerStock/AjouterEntrer" element={<AjouterEntrer />} />
              <Route path="/Commande/Facture" element={<Facture />} />
              <Route path="/Commande/PDFGenerator" element={<PDFGenerator />} />
              <Route path="/EntrerStock/ModifierEntrer/:IdEntrer" element={<ModifierEntrer/>} />              
            </Routes>
          </div>
       </BrowserRouter>
    </div>
  </body>
  );
}

export default App;
