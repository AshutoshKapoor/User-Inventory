import s from "./button.module.scss";

function Button(props) {
  const { buttonStyling, onClickHandler, buttonName } = props;

  return (
    <div className={buttonStyling} onClick={() => onClickHandler()}>
      {buttonName}
    </div>
  );
}

export default Button;
