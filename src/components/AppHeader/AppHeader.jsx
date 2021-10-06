import HeaderStyles from './AppHeader.module.css';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={`${HeaderStyles.header} pb-4 pt-4`}>
      <nav className={HeaderStyles.header__nav}>
        <ul className={HeaderStyles.header__list}>
          <li className={HeaderStyles.header__listItem}>
            <Link to={'/'} className={HeaderStyles.header__link}>
              <BurgerIcon type="primary" />
              <p className={`${HeaderStyles.header__linkText} ml-2`}>Конструктор</p>
            </Link>
          </li>
          <li className={`${HeaderStyles.header__listItem} ml-2`}>
            <Link to={''} className={HeaderStyles.header__link}>
              <ListIcon type="primary" />
              <p className={`${HeaderStyles.header__linkText} ml-2`}>Лента Заказов</p>
            </Link>
          </li>
        </ul>
        <div className={HeaderStyles.header__logo}>
          <Logo />
        </div>
        <Link to={'/account'} className={HeaderStyles.header__link}>
          <ProfileIcon type="primary" />
          <p className={`${HeaderStyles.header__linkText} ml-2`}>Личный Кабинет</p>
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader;