import React from "react";
import "./model.css";

function Modal({ setOpenModal }) {
  return (
//     <div class="message">
//     <div class="container">
//         <div class="box_message">
//         <div class="fermer">
//             <svg  viewBox="0 0 24 24" width="24" height="24" >
//                     <path fill="#FF2525" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"/>
//                 </svg>
//             </div>
//             <p class="tittre_message">Vous voulez le supprimer</p>
//                 <button class="btn_confi" >OUI</button>
//                 <button class="btn_confi" >NON</button>     
//     </div>        
//     </div>


// </div>

    <div className="message">
      <div className="modal">
        <div className="icons">
        <button
            onClick={() => {
              setOpenModal(false);
            }}
        >
            <svg  width="25" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-delete">
              <line x1="20" y1="11" x2="14" y2="17" ></line>
              <line x1="14" y1="11" x2="20" y2="17"></line>
            </svg>
          </button>
        </div>
        <p className="tittre_message">Vous volez supprimer</p>
          <button className="btn_confi">OUI</button>
          <button className="btn_confi">NON</button>
      </div>
      {/* <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>Entrer un stock</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default Modal;