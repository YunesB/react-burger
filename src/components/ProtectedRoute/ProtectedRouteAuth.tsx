import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";
import { getCurrentUser } from '../../services/actions/currentSession';



interface IProtectedRouteAuth {
  path: string;
}

const ProtectedRouteAuth: React.FC<IProtectedRouteAuth> = ({ children, ...rest }) => {

  const isUserAuth = useSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  const dispatch = useDispatch();
  const init = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getCurrentUser());
    } 
  };

  React.useEffect(() => {
    init();
  }, []);
  
  return (
    <Route {...rest} render={() => (!isUserAuth ? children : <Redirect to='/' />)} />
  )
};

export default ProtectedRouteAuth;