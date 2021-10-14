import { loginApi } from '../../utils/LoginApi';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILED = 'GET_CURRENT_USER_FAILED';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST';
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
export const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const CHECK_CURRENT_USER_AUTH = 'CHECK_CURRENT_USER_AUTH';
export const CHECK_RESET_PASSWORD_VISIT = 'CHECK_RESET_PASSWORD_VISIT';

export function getCurrentUser(func) {
  const jwt = localStorage.getItem('accessToken');
  return function (dispatch) {
    dispatch({
      type: GET_CURRENT_USER_REQUEST,
    });
    loginApi.getUserInfo(jwt)
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_CURRENT_USER_SUCCESS,
          currentUser: data,
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_CURRENT_USER_FAILED,
        });
        if (err.message === "jwt expired") {
          console.log("token refresh started");
          func();
        }
      })
  }
};

export function registerUser(data, func) {
  return function (dispatch) {
    dispatch({
      type:REGISTER_USER_REQUEST,
    });
    loginApi.register(data)
      .then(() => {
        dispatch({
          type: REGISTER_USER_SUCCESS
        });
        func();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      })
  }
}

export function loginUser(data, func) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    loginApi
      .signIn(data)
      .then((data) => {
        if(data && data.success) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          dispatch({
            type: LOGIN_USER_SUCCESS,
            currentUser: data,
          })
          func();
        } else {
          dispatch({
            type: LOGIN_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGIN_USER_FAILED,
        });
      });
  }
};

export function logoutUser(refreshJwt, func) {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    loginApi
    .signOut(refreshJwt)
    .then(() => {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      func();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGOUT_USER_FAILED,
      });
    });
  }
}

export function forgotPassword(data, func) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    loginApi
      .resetPassword(data)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        })
        func();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  }
};

export function recoverPassword(data, func) {
  return function (dispatch) {
    dispatch({
      type: RECOVER_PASSWORD_REQUEST,
    });
    loginApi
      .updatePassword(data)
      .then(() => {
        dispatch({
          type: RECOVER_PASSWORD_SUCCESS,
        })
        func();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: RECOVER_PASSWORD_FAILED,
        });
      });
  }
}
