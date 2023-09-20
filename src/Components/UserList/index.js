import { useState } from "react";
import s from "./userlist.module.scss";
import Button from "../Button";
import Modal from "../Modal";
import Card from "../Cards";

function UserList(props) {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "",
    food: "Pizza",
    hobbies: "",
  });
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userIndex, setUserIndex] = useState(0);
  const [modalOpenType, setModalOpenType] = useState("add");

  const modalContent = (type = modalOpenType, index) => {
    return (
      <>
        <div className={s.modalHeader}>
          {type === "add"
            ? "ADD USER"
            : type === "view"
            ? "VIEW USER"
            : "EDIT USER"}
        </div>
        <div className={s.modalBody}>
          <div className={s.column}>
            <div className={s.row}>
              <div className={s.heading}>NAME</div>
              <div className={s.input}>
                <input
                  type={"text"}
                  value={newUser.name}
                  onChange={(e) => {
                    if (type === "add" || type === "edit") {
                      setNewUser({
                        ...newUser,
                        name: e.target.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className={s.row}>
              <div className={s.heading}>DOB</div>
              <div className={s.input}>
                <input
                  type="date"
                  name="dob"
                  value={newUser.dob}
                  onChange={(e) => {
                    if (type === "add" || type === "edit")
                      setNewUser({
                        ...newUser,
                        dob: e.target.value,
                      });
                  }}
                />
              </div>
            </div>
            <div className={s.row}>
              <div className={s.heading}>FAVOURITE FOOD</div>
              <div className={s.input}>
                <select
                  value={newUser.food}
                  onChange={(e) => {
                    if (type === "add" || type === "edit")
                      setNewUser({ ...newUser, food: e.target.value });
                  }}
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Pasta">Pasta</option>
                </select>
              </div>
            </div>
          </div>
          <div className={s.column}>
            <div className={s.row}>
              <div className={s.heading}>AGE</div>
              <div className={s.input}>
                <input
                  type="number"
                  value={newUser.age}
                  onChange={(e) => {
                    if (type === "add" || type === "edit")
                      setNewUser({
                        ...newUser,
                        age: e.target.value,
                      });
                  }}
                />
              </div>
            </div>
            <div className={s.row}>
              <div className={s.heading}>GENDER</div>
              <div className={s.input}>
                <div>
                  <input
                    type="radio"
                    name="male"
                    checked={newUser.gender === "male"}
                    onChange={() => {
                      if (type === "add" || type === "edit")
                        setNewUser({
                          ...newUser,
                          gender: "male",
                        });
                    }}
                  />
                  MALE
                </div>
                <div className={s.checkbox}>
                  <input
                    type="radio"
                    name="female"
                    checked={newUser.gender === "female"}
                    onChange={() => {
                      if (type === "add" || type === "edit")
                        setNewUser({
                          ...newUser,
                          gender: "female",
                        });
                    }}
                  />
                  FEMALE
                </div>
              </div>
            </div>
            <div className={s.row}>
              <div className={s.heading}>HOBBIES</div>
              <div className={s.input}>
                <textarea
                  name="hobbies"
                  value={newUser.hobbies}
                  rows="7"
                  cols="40"
                  onChange={(e) => {
                    if (type === "add" || type === "edit")
                      setNewUser({
                        ...newUser,
                        hobbies: e.target.value,
                      });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.modalFooter}>
          <Button
            buttonStyling={s.cancelButton}
            onClickHandler={() => {
              setUserModalOpen(false);
              setNewUser({
                name: "",
                age: "",
                dob: "",
                gender: "",
                food: "Pizza",
                hobbies: "",
              });
            }}
            buttonName={type === "view" ? "CLOSE" : "CANCEL"}
          />{" "}
          {type !== "view" && (
            <Button
              buttonStyling={s.submitButton}
              onClickHandler={() => {
                let flag = 1;
                for (let val in newUser) {
                  console.log(newUser[val]);
                  if (!newUser[val]) {
                    flag = 0;
                    break;
                  }
                }
                console.log(flag);
                if (flag) {
                  setUserModalOpen(false);
                  if (type === "add") {
                    setUsers([...users, newUser]);
                    localStorage.setItem(
                      "users",
                      JSON.stringify([...users, newUser])
                    );
                  } else {
                    let user = users;
                    user[index] = newUser;
                    setUsers(user);
                    localStorage.setItem("users", JSON.stringify(user));
                  }
                  setNewUser({
                    name: "",
                    age: "",
                    dob: "",
                    gender: "",
                    food: "Pizza",
                    hobbies: "",
                  });
                } else {
                  alert("Enter complete user details to proceed.");
                }
              }}
              buttonName={"SUBMIT"}
            />
          )}
        </div>
      </>
    );
  };

  const cardContent = (user, index) => {
    return (
      <>
        <div className={s.cardContainer}>
          <div className={s.row}>
            <p>AGE : </p>
            <p className={s.userInfo}>
              {"   "}
              {user.age}
            </p>
          </div>
          <div className={s.row}>
            <p>DOB : </p>
            <p className={s.userInfo}>{user.dob}</p>
          </div>
          <div className={s.row}>
            <p>GENDER : </p>
            <p className={s.userInfo}>{user.gender}</p>
          </div>
          <div className={s.row}>
            <p>FOOD : </p>
            <p className={s.userInfo}>{user.food}</p>
          </div>
          <div className={s.row}>
            <p>HOBBIES : </p>
            <p className={s.userInfo}>{user.hobbies}</p>
          </div>
        </div>
        <div className={s.cardFooter}>
          <Button
            buttonName={"DELETE"}
            buttonStyling={s.redButton}
            onClickHandler={() => deleteUser(index)}
          />
          <Button
            buttonName={"VIEW"}
            buttonStyling={s.blueButton}
            onClickHandler={() => {
              setUserIndex(index);
              setModalOpenType("view");
              setNewUser(users[index]);
              setUserModalOpen(true);
            }}
          />
          <Button
            buttonName={"EDIT"}
            buttonStyling={s.blueButton}
            onClickHandler={() => {
              setUserIndex(index);
              setModalOpenType("edit");
              setNewUser(users[index]);
              setUserModalOpen(true);
            }}
          />
        </div>
      </>
    );
  };

  const deleteUser = (index) => {
    let user = [...users];
    user.splice(index, 1);
    setUsers(user);
    localStorage.setItem("users", JSON.stringify(user));
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.heading}>LIST OF USERS</div>
        <div className={s.button}>
          <Button
            buttonStyling={s.addUserButton}
            onClickHandler={() => {
              setModalOpenType("add");
              setUserModalOpen(true);
            }}
            buttonName={"ADD USER"}
          />
        </div>
      </div>
      <div className={s.body}>
        {users.length > 0 && (
          <>
            {users.map((user, index) => {
              return (
                <Card
                  header={user.name}
                  dotColor={
                    parseInt(user.age) < 25
                      ? "#1A7318"
                      : parseInt(user.age) < 50
                      ? "#F41B9E"
                      : "#FEA41D"
                  }
                  cardContent={() => cardContent(user, index)}
                />
              );
            })}
          </>
        )}
      </div>
      {userModalOpen && (
        <Modal modalContent={() => modalContent(modalOpenType, userIndex)} />
      )}
    </div>
  );
}

export default UserList;
