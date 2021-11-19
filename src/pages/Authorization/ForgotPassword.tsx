import React from "react";
import AuthStyles from "./Auth.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "../../services/hooks";
import { forgotPassword } from "../../services/actions/currentSession";

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = React.useState<string>("");
  const mailInputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = (input: any) => {
    console.log(input);
    // setTimeout(() => input.current.focus(), 0);
    // alert("Icon Click Callback");
  };

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data = {
      email: email,
    };
    dispatch(forgotPassword(data, () => history.push("/reset-password")));
  }

  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Восстановление пароля</h2>
      <form
        className={`${AuthStyles.form} mb-20`}
        onSubmit={(e) => handleSubmit(e)}
      >
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
        <Button type="primary" size="medium">
          Восстановить
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

export default ForgotPassword;
