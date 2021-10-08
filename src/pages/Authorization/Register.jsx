import React from 'react';
import AuthStyles from './Auth.module.css';

import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';

import { loginApi } from '../../utils/LoginApi';

function Register() {

  const history = useHistory();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const nameInputRef = React.useRef(null);
  const mailInputRef = React.useRef(null);
  
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
      name: name,
      email: email,
      password: password
    };
    loginApi.register(data)
      .then((data) => {
        console.log(data);
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Регистрация</h2>
      <form className={`${AuthStyles.form} mb-20`}>
      <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setName(e.target.value)}
            icon={null}
            value={name}
            name={'name'}
            error={false}
            ref={nameInputRef}
            onIconClick={() => onIconClick(nameInputRef)}
            errorText={'Ошибка'}
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Email'}
            onChange={e => setEmail(e.target.value)}
            icon={null}
            value={email}
            name={'name'}
            error={false}
            ref={mailInputRef}
            onIconClick={() => onIconClick(mailInputRef)}
            errorText={'Ошибка'}
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <PasswordInput 
            onChange={onChange} 
            value={password} 
            name={'Пароль'} 
          />
        </fieldset>
        <Button type="primary" size="medium" onClick={e => handleSubmit(e)}>
          Зарегистрироваться
        </Button>
      </form>
      <div className={AuthStyles.textContainer}>
        <p className={`${AuthStyles.text} text text_type_main-default text_color_inactive mb-4`}>Уже зарегистрированы? <Link to={'/login'} className={AuthStyles.link}>Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;