import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NoteIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 15px;
  width: 80px;
`;

const NoteContent = styled.div`
  position: absolute;
  color: #fff;
  background: #434343;
  padding: 8px 15px;
  margin-right: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 9999;
`;

const NoteButton = ({ product }) => {
  const [showNote, setShowNote] = useState(false);
  const toggleNote = () => setShowNote(!showNote);

  const hasNote = product.note && product.note.length > 0;

  if (!hasNote) return null;

  return (
    <>
      <NoteIcon
        className="far fa-comment"
        onClick={toggleNote}
        onMouseOver={toggleNote}
        onMouseOut={toggleNote}
      />
      {showNote && <NoteContent>{`Observação: ${product.note}`}</NoteContent>}
    </>
  );
};

NoteButton.propTypes = {
  product: PropTypes.object
};

export default NoteButton;
