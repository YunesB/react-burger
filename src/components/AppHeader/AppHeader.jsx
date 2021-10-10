import HeaderStyles from './AppHeader.module.css';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={`${HeaderStyles.header} pb-4 pt-4`}>
      <nav className={HeaderStyles.header__nav}>
        <ul className={HeaderStyles.header__list}>
          <li className={HeaderStyles.header__listItem}>
            <NavLink exact to={'/'} className={HeaderStyles.header__link} activeClassName={HeaderStyles.header__link_active}>
              <BurgerIcon type="primary" />
              <p className={`${HeaderStyles.header__linkText} ml-2`}>Конструктор</p>
            </NavLink>
          </li>
          <li className={`${HeaderStyles.header__listItem} ml-2`} activeClassName={HeaderStyles.header__link_active}>
            <NavLink to={''} className={HeaderStyles.header__link}>
              <ListIcon type="primary" />
              <p className={`${HeaderStyles.header__linkText} ml-2`} >Лента Заказов</p>
            </NavLink>
          </li>
        </ul>
        <div className={HeaderStyles.header__logo}>
          <Logo />
        </div>
        <NavLink to={'/account'} className={HeaderStyles.header__link} activeClassName={HeaderStyles.header__link_active}>
          <ProfileIcon type="primary" />
          <p className={`${HeaderStyles.header__linkText} ml-2`}>Личный Кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;