import s from "./cards.module.scss";

function Card(props) {
  const { header, cardContent,dotColor } = props;
  return <div className={s.container}>
    <div className={s.header}>{header} <div className={s.dot} style={{backgroundColor: dotColor}} /></div>
    <div>{cardContent()}</div>
  </div>;
}

export default Card;
