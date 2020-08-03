import React from "react";
import closeIcon from '../../assets/close-icon.svg';
import styled from 'styled-components';

const ImgClose = styled.img`
  width: 28px;
  cursor: pointer;
`;

const ModalGallery = styled.div`
  display: block;
  position: fixed;
  z-index: 2000;
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

const Content = styled.div`
  opacity: 0;
  animation: scaleUp 0.3s forwards;

@keyframes scaleUp {
  to {
    opacity: initial;
    transform: initial;
  }
}
`;

const BtClose = styled.div`
  position: absolute;
  top:41px;
  right: 50px;
  border: none;
  background-color: transparent;

@media (max-width: 500px){
    top:10px;
    right: 20px;
}
`;

const Modal = ({ id = 'modal', onClose= () => {}, children}) => {
  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose();
  }
  return (
    <ModalGallery id="modal"  onClick={handleOutsideClick}>
      <ModalContent>
        <BtClose onClick={onClose}>
          <ImgClose src={closeIcon}/>
        </BtClose>
        <Content>{children}</Content>
      </ModalContent>
    </ModalGallery>

  );
};


export default Modal;
