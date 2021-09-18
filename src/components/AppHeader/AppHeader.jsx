import HeaderStyles from './AppHeader.module.css';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={`${HeaderStyles.header} pb-4 pt-4`}>
      <nav className={HeaderStyles.header__nav}>
        <ul className={HeaderStyles.header__list}>
          <li className={HeaderStyles.header__listItem}>
            <a href="#" className={HeaderStyles.header__link}>
              <BurgerIcon type="primary" />
              <p className={`${HeaderStyles.header__linkText} ml-2`}>Конструктор</p>
            </a>
          </li>
          <li className={`${HeaderStyles.header__listItem} ml-2`}>
            <a href="#" className={HeaderStyles.header__link}>
              <ListIcon type="primary" />
              <p className={`${HeaderStyles.header__linkText} ml-2`}>Лента Заказов</p>
            </a>
          </li>
        </ul>
        <div className="logo">
          <Logo />
        </div>
        <a href="#" className={HeaderStyles.header__link}>
          <ProfileIcon type="primary" />
          <p className={`${HeaderStyles.header__linkText} ml-2`}>Личный Кабинет</p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;