import React from "react";
import AccountStyles from "./Account.module.css";

import { useDispatch } from "../../services/hooks";
import {
  Route,
  NavLink,
  useRouteMatch,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

import { wsConnectionStart } from "../../services/actions/wsActions";
import { logoutUser } from "../../services/actions/currentSession";

interface IAcoount {
  openModal: () => void;
}

const Account: React.FC<IAcoount> = (props) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(wsConnectionStart());
  }, [dispatch]);

  function handleSignOut() {
    let refreshJwt: string | null = localStorage.getItem("refreshToken");
    dispatch(logoutUser(refreshJwt!, () => history.push("/login")));
  }

  return (
    <div className={AccountStyles.account}>
      <nav className={AccountStyles.nav}>
        <ul className={`${AccountStyles.list} mb-20`}>
          <li className={AccountStyles.listItem}>
            <NavLink
              to={`${url}/profile`}
              className={`${AccountStyles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={AccountStyles.link_active}
            >
              Профиль
            </NavLink>
          </li>
          <li className={AccountStyles.listItem}>
            <NavLink
              to={`${url}/order-history`}
              className={`${AccountStyles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={AccountStyles.link_active}
            >
              История заказов
            </NavLink>
          </li>
          <li className={AccountStyles.listItem}>
            <button
              type="button"
              className={`${AccountStyles.button} text text_type_main-medium text_color_inactive`}
              onClick={handleSignOut}
            >
              Выход
            </button>
          </li>
        </ul>
        <p className={`${AccountStyles.text} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={AccountStyles.contentBox}>
        <Switch>
          <Route path={`${path}/profile`}>
            <Profile />
          </Route>
          <Route path={`${path}/order-history`}>
            <OrderHistory 
              openModal={props.openModal}
            />
          </Route>
          <Redirect to={`${url}/profile`} />
        </Switch>
      </div>
    </div>
  );
}

export default Account;
