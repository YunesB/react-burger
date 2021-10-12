import HeaderStyles from './AppHeader.module.css';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useRouteMatch } from 'react-router-dom';

function AppHeader() {

  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isFeed = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/account');

  return (
    <header className={`${HeaderStyles.header} pb-4 pt-4`}>
      <nav className={HeaderStyles.header__nav}>
        <ul className={HeaderStyles.header__list}>
          <li className={HeaderStyles.header__listItem}>
            <NavLink exact to={'/'} className={HeaderStyles.header__link} activeClassName={HeaderStyles.header__link_active}>
              <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
              <p className={`${HeaderStyles.header__linkText} ml-2`}>Конструктор</p>
            </NavLink>
          </li>
          <li className={`${HeaderStyles.header__listItem} ml-2`} >
            <NavLink to={'/feed'} className={HeaderStyles.header__link} activeClassName={HeaderStyles.header__link_active}>
              <ListIcon type={isFeed ? 'primary' : 'secondary'} />
              <p className={`${HeaderStyles.header__linkText} ml-2`} >Лента Заказов</p>
            </NavLink>
          </li>
        </ul>
        <div className={HeaderStyles.header__logo}>
          <Logo />
        </div>
        <NavLink to={'/account'} className={HeaderStyles.header__link} activeClassName={HeaderStyles.header__link_active}>
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <p className={`${HeaderStyles.header__linkText} ml-2`}>Личный Кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;