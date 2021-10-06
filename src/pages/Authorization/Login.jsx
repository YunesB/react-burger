import React from 'react';
import AuthStyles from './Auth.module.css';

import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function Login() {

  const [email, setEmail] = React.useState('');
  const [passord, setPassword] = React.useState('');


  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback');
  };

  const onChange = e => {
    setPassword(e.target.value)
  };

  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Вход</h2>
      <form className={`${AuthStyles.form} mb-20`}>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Email'}
            onChange={e => setEmail(e.target.value)}
            icon={null}
            value={email}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <PasswordInput 
            onChange={onChange} 
            value={passord} 
            name={'Пароль'} 
          />
        </fieldset>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={AuthStyles.textContainer}>
        <p className={`${AuthStyles.text} text text_type_main-default text_color_inactive mb-4`}>Вы — новый пользователь? <Link to={'/register'} className={AuthStyles.link}>Зарегистрироваться</Link></p>
        <p className={`${AuthStyles.text} text text_type_main-default text_color_inactive`}>Забыли пароль? <Link to={'/forgot-password'} className={AuthStyles.link}>Восстановить пароль</Link></p>
      </div>
    </div>
  );
}

export default Login;