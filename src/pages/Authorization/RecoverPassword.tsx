import React from "react";
import AuthStyles from "./Auth.module.css";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recoverPassword } from "../../services/actions/currentSession";

function RecoverPassword() {
  const history = useHistory();

  const dispatch = useDispatch();
  const [token, setToken] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = (input: any) => {
    console.log(input)
    // setTimeout(() => input.current.focus(), 0);
    // alert("Icon Click Callback");
  };

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data = {
      password: password,
      token: token,
    };
    dispatch(recoverPassword(data, () => history.push("/login")));
  }

  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Восстановление пароля</h2>
      <form
        className={`${AuthStyles.form} mb-20`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <PasswordInput
            onChange={onChange}
            value={password}
            name={"Введите новый пароль"}
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name={"name"}
            error={false}
            ref={passwordInputRef}
            onIconClick={() => onIconClick(passwordInputRef)}
            errorText={"Ошибка"}
          />
        </fieldset>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={AuthStyles.textContainer}>
        <p
          className={`${AuthStyles.text} text text_type_main-default text_color_inactive mb-4`}
        >
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={AuthStyles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RecoverPassword;
