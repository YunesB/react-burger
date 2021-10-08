import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, redirect }) => {

  if (redirect) {
    return (
      <Route>
        {
          () => loggedIn ? (
            children
          ) : (
            <Redirect
              to='/forgot-password'
            />
          )
        }
      </Route>
    )
  };

  return (
    <Route>
      {
        () => loggedIn ? (
          children
        ) : (
        <Redirect
          to='/login'
        />
        )
      }
    </Route>
)}

export default ProtectedRoute;