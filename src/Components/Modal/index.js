import React from "react";
import s from "./modal.module.scss";
import Button from "../Button";

function Modal(props) {
  const { modalContent } = props;
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        {modalContent()}
      </div>
    </div>
  );
}
export default Modal;
