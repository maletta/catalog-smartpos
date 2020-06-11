import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ControlExclude = styled.button`
  color: #00529b;
  background: #fff;
  border: 0;
  padding: 0;
  margin: 5px 0 0 0;
`;

const DeleteButton = ({ onClick }) => {
  return (
    <>
      <ControlExclude onClick={onClick}>
        <FontAwesomeIcon color="orange" size="lg" icon={faTrashAlt} />
      </ControlExclude>
    </>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteButton;
