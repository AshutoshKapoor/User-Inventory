import s from "./app.module.scss";
import Header from "./Components/Header";
import UserList from "./Components/UserList";

function App() {
  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          <Header name={"USER'S INVENTORY"} headerStyling={s.heading} />
        </div>
        <div><UserList /></div>
      </div>
    </>
  );
}

export default App;
