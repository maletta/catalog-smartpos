import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NoteIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 15px;
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

const NoteButton = ({ note }) => {
  const [showNote, setShowNote] = useState(false);
  const toggleNote = () => setShowNote(!showNote);

  return (
    <>
      <NoteIcon
        className="far fa-comment"
        onMouseOver={toggleNote}
        onMouseOut={toggleNote}
      />
      {showNote && <NoteContent>{`Observação: ${note}`}</NoteContent>}
    </>
  );
};

NoteButton.propTypes = {
  note: PropTypes.string
};

export default NoteButton;
