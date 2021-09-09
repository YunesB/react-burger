import './AppHeader.css';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className="header pb-4 pt-4">
      <ul className="header__list">
        <li className="header__list-item">
          <a href="#" className="header__link">
            <BurgerIcon type="primary" />
            <p className="header__link-text ml-2">Конструктор</p>
          </a>
        </li>
        <li className="header__list-item ml-2">
          <a href="#" className="header__link">
            <ListIcon type="primary" />
            <p className="header__link-text ml-2">Лента Заказов</p>
          </a>
        </li>
      </ul>  
      <Logo />
      <a href="#" className="header__link">
        <ProfileIcon type="primary" />
        <p className="header__link-text ml-2">Личный Кабинет</p>
      </a>
    </header>
  );
}

export default AppHeader;