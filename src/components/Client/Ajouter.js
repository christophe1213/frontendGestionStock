import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./Afficher.css";
function Ajouter() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});  
    const handleNameChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('http://localhost:5251/client',inputs).then(function(response){
          console.log(response.data);
          console.log(inputs);
          navigate('/');
        }).catch(function(error){
          alert(error.response.data.message)
      })
        console.log(inputs);
    }
  return (
        <div>
          <h1 className='titre' style={{position:"relative",left:"60px"}}>INFORMATION DU NOUVEAU CLIENT </h1>   
          <nav >
            <ul className='ajout'>    
              <li className='lien-ajout'>
                <Link to='/Client/Afficher'>RETOUR</Link>
              </li>
            </ul> 
          </nav>   
          <form onSubmit={handleSubmit} className='nom'>
          <label>NUMERO :
            <input className='nom' style={{marginLeft : '40px'}}  
              type="text" 
              required 
              name="idclient"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
            <label>NOM :
            <input className='nom' style={{marginLeft : '65px'}}  
              type="text" 
              required 
              name="nomClient"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
            <label>ADRESSE :
            <input className='nom' style={{marginLeft : '40px'}}  
              type="text" 
              required 
              name="adresse"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
             <label>TELEPHONE :
            <input className='nom' style={{marginLeft : '20px'}}  
              type="text" 
              required 
              name="numtel"
              onChange={handleNameChange}
            /></label>
            <br/>
            <br/>
            <button type="submit" className='button1'><strong>AJOUTER</strong></button>  
          </form>
        </div>
      );
}

export default Ajouter