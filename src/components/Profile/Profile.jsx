import React from 'react';
import ProfileStyles from './Profile.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_USER } from '../../utils/constants';
import { loginApi } from '../../utils/LoginApi';

function Profile() {

  const currentUser = useSelector(
    (state) => state.currentSession.currentUser
  );

  const [name, setName] = React.useState(DEFAULT_USER.user.name);
  const [email, setEmail] = React.useState(DEFAULT_USER.user.email);
  const [password, setPassword] = React.useState('*****');

  const nameInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);

  function onIconClick(input) {
    setTimeout(() => input.current.focus(), 0);
    console.log(input.current.value);
  }

  function handleSaveClick() {
    const data = {
      name: name,
      email: email
    }
    loginApi.setUserInfo(data)
      .then(() => console.log('patch success'))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if(currentUser) {
      setName(currentUser.user.name)
      setEmail(currentUser.user.email)
    }
  }, [ currentUser ] );

  return (
    <div className={ProfileStyles.profile}>
      <ul className={ProfileStyles.profileList}>
        <li className={`${ProfileStyles.profileListItem} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setName(e.target.value)}
            icon={'EditIcon'}
            value={name}
            name={'Name'}
            error={false}
            ref={nameInputRef}
            onIconClick={() => onIconClick(nameInputRef)}
            errorText={'Ошибка'}
            size={'default'}
          />
        </li>
        <li className={`${ProfileStyles.profileListItem} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={e => setEmail(e.target.value)}
            icon={'EditIcon'}
            value={email}
            name={'name'}
            error={false}
            ref={emailInputRef}
            onIconClick={() => onIconClick(emailInputRef)}
            errorText={'Ошибка'}
            size={'default'}
          />
        </li>
        <li className={`${ProfileStyles.profileListItem} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Пароль'}
            onChange={e => setPassword(e.target.value)}
            icon={'EditIcon'}
            value={password}
            name={'name'}
            error={false}
            ref={passwordInputRef}
            onIconClick={() => onIconClick(passwordInputRef)}
            errorText={'Ошибка'}
            size={'default'}
          />
        </li>
      </ul>
      <div className={ProfileStyles.buttonBox}>
        <Button type="secondary" size="medium">
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