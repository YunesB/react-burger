import React from 'react';
import AuthStyles from './Auth.module.css';

import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function RecoverPassword() {

  const [code, setCode] = React.useState('');
  const [passord, setPassword] = React.useState('');
  const passwordInputRef = React.useRef(null);
  
  const onIconClick = (input) => {
    setTimeout(() => input.current.focus(), 0)
    alert('Icon Click Callback');
  };

  const onChange = e => {
    setPassword(e.target.value)
  };

  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Восстановление пароля</h2>
      <form className={`${AuthStyles.form} mb-20`}>
      <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <PasswordInput 
            onChange={onChange} 
            value={passord} 
            name={'Введите новый пароль'} 
          />
        </fieldset>
        <fieldset className={`${AuthStyles.fieldset} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setCode(e.target.value)}
            icon={null}
            value={code}
            name={'name'}
            error={false}
            ref={passwordInputRef}
            onIconClick={() => onIconClick(passwordInputRef)}
            errorText={'Ошибка'}
          />
        </fieldset>
        <Button type="primary" size="medium">
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