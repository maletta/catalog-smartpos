import React from "react";
import closeIcon from '../../assets/close-icon.svg';
import styled from 'styled-components';


const ModalGaleria = styled.div`
  display: block;
  position: fixed;
  z-index: 1000;
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.8);
`;



const ModalContent = styled.div`
  margin: auto;
  display: flex;
  width: 100%;
  max-width: 0px;
  justify-content: center;

`;

/*
.content {
  animation-name: zoom;
  animation-duration: 2s;

}

@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}
*/


const BtClose = styled.div `
  position: absolute;
  top:41px;
  right: 50px;
  border: none;
  background-color: transparent;

@media (max-width: 500px){
    top:10px;
    right: 20px;
}
` ;

const Modal = ({id = 'modal',onClose= () => {}, children}) => {
  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose();
  }
  return (
    <ModalGaleria id="modal"  onClick={handleOutsideClick}>
      <ModalContent>
        <BtClose onClick={onClose}>
          <img src={closeIcon}/>
        </BtClose>
        <div className="content ">{children}</div>
      </ModalContent>
    </ModalGaleria>

  );
};


export default Modal;
