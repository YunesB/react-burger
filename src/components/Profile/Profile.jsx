import React from "react";
import ProfileStyles from "./Profile.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { loginApi } from "../../utils/LoginApi";

function Profile() {
  const currentUser = useSelector((state) => state.currentSession.currentUser);

  const [name, setName] = React.useState(currentUser.user.name);
  const [email, setEmail] = React.useState(currentUser.user.email);
  const [password, setPassword] = React.useState("*****");

  const [nameDisabled, setNameDisabled] = React.useState(true);
  const [emailDisabled, setEmailDisabled] = React.useState(true);
  const [passwordDisabled, setPasswordDisabled] = React.useState(true);

  const nameInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);

  function onIconClick(input, setState) {
    setTimeout(() => input.current.focus(), 0);
    setState(false);
  }

  function handleSaveClick() {
    const jwt = localStorage.getItem("accessToken");
    const data = {
      name: name,
      email: email,
    };
    loginApi
      .setUserInfo(data, jwt)
      .then(() => console.log("patch success"))
      .catch((err) => console.log(err));
  }

  function setInputData() {
    setName(currentUser.user.name);
    setEmail(currentUser.user.email);
    setNameDisabled(true);
    setEmailDisabled(true);
    setPasswordDisabled(true);
  }

  React.useEffect(() => {
    setInputData();
  });

  return (
    <div className={ProfileStyles.profile}>
      <ul className={ProfileStyles.profileList}>
        <li className={`${ProfileStyles.profileListItem} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            icon={"EditIcon"}
            value={name}
            name={"Name"}
            error={false}
            ref={nameInputRef}
            onIconClick={() => onIconClick(nameInputRef, setNameDisabled)}
            errorText={"Ошибка"}
            size={"default"}
            disabled={nameDisabled}
          />
        </li>
        <li className={`${ProfileStyles.profileListItem} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={(e) => setEmail(e.target.value)}
            icon={"EditIcon"}
            value={email}
            name={"name"}
            error={false}
            ref={emailInputRef}
            onIconClick={() => onIconClick(emailInputRef, setEmailDisabled)}
            errorText={"Ошибка"}
            size={"default"}
            disabled={emailDisabled}
          />
        </li>
        <li className={`${ProfileStyles.profileListItem} mb-6`}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
            icon={"EditIcon"}
            value={password}
            name={"name"}
            error={false}
            ref={passwordInputRef}
            onIconClick={() =>
              onIconClick(passwordInputRef, setPasswordDisabled)
            }
            errorText={"Ошибка"}
            size={"default"}
            disabled={passwordDisabled}
          />
        </li>
      </ul>
      <div className={ProfileStyles.buttonBox}>
        <Button type="secondary" size="medium" onClick={() => setInputData()}>
          Отмена
        </Button>
        <Button type="primary" size="medium" onClick={() => handleSaveClick()}>
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default Profile;
