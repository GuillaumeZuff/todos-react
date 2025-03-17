import React from "react";

const DeleteButton = (props) => {
  const { handleClick } = props;
  return <button onClick={handleClick}>X</button>;
};

export default DeleteButton;
