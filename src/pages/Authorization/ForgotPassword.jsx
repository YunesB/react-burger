import React from 'react';
import AuthStyles from './Auth.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function ForgotPassword() {

  const [email, setEmail] = React.useState('');
  const mailInputRef = React.useRef(null);
  
  const onIconClick = (input) => {
    setTimeout(() => input.current.focus(), 0)
    alert('Icon Click Callback');
  };


  return (
    <div className={AuthStyles.login}>
      <h2 className={AuthStyles.heading}>Регистрация</h2>
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
            ref={mailInputRef}
            onIconClick={() => onIconClick(mailInputRef)}
            errorText={'Ошибка'}
          />
        </fieldset>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div className={AuthStyles.textContainer}>
        <p className={`${AuthStyles.text} text text_type_main-default text_color_inactive mb-4`}>Вспомнили пароль? <Link to={'/login'} className={AuthStyles.link}>Войти</Link></p>
      </div>
    </div>
  );
}

export default ForgotPassword;