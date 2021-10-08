import React from 'react';
import AccountStyles from './Account.module.css';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../../services/actions/currentSession';

function Profile() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const currentUser = useSelector(
    (state) => state.currentSession.currentUser
  );

  const [name, setName] = React.useState('bob@example.com');
  const [email, setEmail] = React.useState('bob@example.com');
  const [password, setPassword] = React.useState('bob@example.com');

  const nameInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);

  const onChange = e => {
    setName(e.target.value)
  }

  const onIconClick = (input) => {
    setTimeout(() => input.current.focus(), 0);
    alert('Icon Click Callback');
  }

  return (
    <div className={AccountStyles.profile}>
      <ul className={AccountStyles.profileList}>
      <li className={AccountStyles.profileListItem}>
        <Input
          type={'text'}
          placeholder={'placeholder'}
          onChange={e => setName(e.target.value)}
          icon={'EditIcon'}
          value={name}
          name={'name'}
          error={false}
          ref={nameInputRef}
          onIconClick={onIconClick(nameInputRef)}
          errorText={'Ошибка'}
          size={'default'}
        />
      </li>
      <li className={AccountStyles.profileListItem}>
        <Input
          type={'text'}
          placeholder={'placeholder'}
          onChange={e => setEmail(e.target.value)}
          icon={'EditIcon'}
          value={email}
          name={'name'}
          error={false}
          ref={emailInputRef}
          onIconClick={onIconClick(emailInputRef)}
          errorText={'Ошибка'}
          size={'default'}
        />
      </li>
      <li className={AccountStyles.profileListItem}>
        <Input
          type={'text'}
          placeholder={'placeholder'}
          onChange={e => setPassword(e.target.value)}
          icon={'EditIcon'}
          value={password}
          name={'name'}
          error={false}
          ref={passwordInputRef}
          onIconClick={onIconClick(passwordInputRef)}
          errorText={'Ошибка'}
          size={'default'}
        />
      </li>
      </ul>
    </div>
  );
}

export default Profile;