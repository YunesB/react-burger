import AccountStyles from "./Account.module.css";

import { useDispatch } from "react-redux";
import {
  Route,
  NavLink,
  useRouteMatch,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import { loginApi } from "../../utils/LoginApi";

import Profile from "../../components/Profile/Profile";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

import { authorizeUser } from "../../services/actions/currentSession";

function Account() {
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const dispatch = useDispatch();

  function handleSignOut() {
    let refreshJwt = localStorage.getItem("refreshToken");
    loginApi
      .signOut(refreshJwt)
      .then(() => {
        dispatch(authorizeUser(false));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
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
            <OrderHistory />
          </Route>
          <Redirect to={`${url}/profile`} />
        </Switch>
      </div>
    </div>
  );
}

export default Account;
