import React from "react";
import AuthStyles from "./Auth.module.css";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/actions/currentSession";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const mailInputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = (input: any) => {
    console.log(input);
    // setTimeout(() => input.current.focus(), 0);
    // alert("Icon Click Callback");
  };

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(registerUser(data, history.push("/login")));
  }

  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Регистрация</h2>
      <form
        className={`${AuthStyles.form} mb-20`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={false}
            ref={nameInputRef}
            onIconClick={() => onIconClick(nameInputRef)}
            errorText={"Ошибка"}
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"name"}
            error={false}
            ref={mailInputRef}
            onIconClick={() => onIconClick(mailInputRef)}
            errorText={"Ошибка"}
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <PasswordInput onChange={onChange} value={password} name={"Пароль"} />
        </fieldset>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={AuthStyles.textContainer}>
        <p
          className={`${AuthStyles.text} text text_type_main-default text_color_inactive mb-4`}
        >
          Уже зарегистрированы?{" "}
          <Link to={"/login"} className={AuthStyles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
