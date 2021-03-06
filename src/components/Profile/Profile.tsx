import React from "react";
import ProfileStyles from "./Profile.module.css";
import AppStyles from '../App/App.module.css';

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import { loginApi } from "../../utils/LoginApi";

function Profile() {
  const currentUser = useSelector((state) => state.currentSession.currentUser);
  const [name, setName] = React.useState<string>('Загрузка...');
  const [email, setEmail] = React.useState<string>('Загрузка...');
  const [password, setPassword] = React.useState<string>("*****");

  const [nameDisabled, setNameDisabled] = React.useState<boolean>(true);
  const [emailDisabled, setEmailDisabled] = React.useState<boolean>(true);
  const [passwordDisabled, setPasswordDisabled] = React.useState<boolean>(true);

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setInputData();
  });

  function onIconClick(input: any, 
    // HTMLInputElement не срабатывает, так и не смог разобраться почему
    setState: (arg0: boolean) => void) {
    console.log(input);
    setTimeout(() => input.current.focus(), 0);
    setState(false);
  }

  function handleSaveClick() {
    const jwt = localStorage.getItem("accessToken");
    const data = {
      name: name,
      email: email,
    };
    if (jwt) {
      loginApi
      .setUserInfo(data, jwt)
      .then(() => console.log("patch success"))
      .catch((err) => console.log(err));
    } else {
      return
    }
  }

  function setInputData() {
    if (currentUser === null || undefined) {
      setName('Загрузка...');
      setEmail('Загрузка...');
    } else {
      setName(currentUser.user.name);
      setEmail(currentUser.user.email);
    }
    setNameDisabled(true);
    setEmailDisabled(true);
    setPasswordDisabled(true);
  }

  if (currentUser === null || undefined) {
    return <div className={`${AppStyles.centeredComponent} text text_type_main-large`}>Загрузка...</div>
  }

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
