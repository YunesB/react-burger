import React from 'react';
import AuthStyles from './Auth.module.css';

import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { loginApi } from '../../utils/LoginApi';
import { checkResetVisit } from '../../services/actions/currentSession';

function RecoverPassword() {

  const history = useHistory();

  const dispatch = useDispatch();
  const [token, setToken] = React.useState('');
  const [password, setPassword] = React.useState('');
  const passwordInputRef = React.useRef(null);
  
  const onIconClick = (input) => {
    setTimeout(() => input.current.focus(), 0)
    alert('Icon Click Callback');
  };

  const onChange = e => {
    setPassword(e.target.value)
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = {
      password: password,
      token: token,
    };
    loginApi.updatePassword(data)
      .then(() => {
        dispatch(checkResetVisit(false));
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Восстановление пароля</h2>
      <form className={`${AuthStyles.form} mb-20`}>
      <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <PasswordInput 
            onChange={onChange} 
            value={password} 
            name={'Введите новый пароль'} 
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setToken(e.target.value)}
            icon={null}
            value={token}
            name={'name'}
            error={false}
            ref={passwordInputRef}
            onIconClick={() => onIconClick(passwordInputRef)}
            errorText={'Ошибка'}
          />
        </fieldset>
        <Button type="primary" size="medium" onClick={(e) => handleSubmit(e)}>
          Сохранить
        </Button>
      </form>
      <div className={AuthStyles.textContainer}>
        <p className={`${AuthStyles.text} text text_type_main-default text_color_inactive mb-4`}>Вспомнили пароль? <Link to={'/login'} className={AuthStyles.link}>Войти</Link></p>
      </div>
    </div>
  );
}

export default RecoverPassword;