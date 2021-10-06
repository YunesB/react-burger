import React from 'react';
import AccountStyles from './Account.module.css';

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Profile() {

  const [name, setName] = React.useState('bob@example.com');
  const [email, setEmail] = React.useState('bob@example.com');
  const [password, setPassword] = React.useState('bob@example.com');

  const onChange = e => {
    setName(e.target.value)
  }

  return (
    <div className={AccountStyles.profile}>
      <EmailInput onChange={onChange} value={name} name={'Email'} />
      <EmailInput onChange={onChange} value={email} name={'Логин'} />
      <EmailInput onChange={onChange} value={password} name={'email'} />
    </div>
  );
}

export default Profile;