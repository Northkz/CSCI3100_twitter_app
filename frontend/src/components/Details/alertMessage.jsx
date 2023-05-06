import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
const AlertMessage = ({ message, removeMesage, dispatch }) => {
  return (
    <div className="messageAlert animate__animated animate__slide-left">
      <span>{message}</span>
      <i className="side-icon">
        <AiOutlineCloseCircle onClick={() => dispatch(removeMesage())} />
      </i>
    </div>
  );
};

export default AlertMessage;
