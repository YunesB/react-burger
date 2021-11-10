import { loginApi } from '../../utils/LoginApi';
import { TUserData, TResetPassword, TUser } from '../../types'

export const GET_CURRENT_USER_REQUEST: 'GET_CURRENT_USER_REQUEST' = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS'  = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILED: 'GET_CURRENT_USER_FAILED' = 'GET_CURRENT_USER_FAILED';

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RECOVER_PASSWORD_REQUEST: 'RECOVER_PASSWORD_REQUEST' = 'RECOVER_PASSWORD_REQUEST';
export const RECOVER_PASSWORD_SUCCESS: 'RECOVER_PASSWORD_SUCCESS' = 'RECOVER_PASSWORD_SUCCESS';
export const RECOVER_PASSWORD_FAILED: 'RECOVER_PASSWORD_FAILED' = 'RECOVER_PASSWORD_FAILED';

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED';

export const CHECK_CURRENT_USER_AUTH: 'CHECK_CURRENT_USER_AUTH' = 'CHECK_CURRENT_USER_AUTH';
export const CHECK_RESET_PASSWORD_VISIT: 'CHECK_RESET_PASSWORD_VISIT' = 'CHECK_RESET_PASSWORD_VISIT';

export interface IGetCurrentUserRequestAction {
  readonly type: typeof GET_CURRENT_USER_REQUEST;
}

export interface IGetCurrentUserSuccessAction {
  readonly type: typeof GET_CURRENT_USER_SUCCESS;
  readonly currentUser: TUser;
}

export interface IGetCurrentUserFailedAction {
  readonly type: typeof GET_CURRENT_USER_FAILED;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly currentUser: TUser;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly currentUser: TUser;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IRecoverPasswordRequestAction {
  readonly type: typeof RECOVER_PASSWORD_REQUEST;
}

export interface IRecoverPasswordSuccessAction {
  readonly type: typeof RECOVER_PASSWORD_SUCCESS;
}

export interface IRecoverPasswordFailedAction {
  readonly type: typeof RECOVER_PASSWORD_FAILED;
}

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface ICheckCurrentUserAuth {
  readonly type: typeof CHECK_CURRENT_USER_AUTH;
}

export interface ICheckResetPasswordVisit {
  readonly type: typeof CHECK_RESET_PASSWORD_VISIT;
}

export type TCurrentSessionAction = 
| IGetCurrentUserRequestAction
| IGetCurrentUserSuccessAction
| IGetCurrentUserFailedAction

| IRegisterUserRequestAction
| IRegisterUserSuccessAction
| IRegisterUserFailedAction

| ILoginUserRequestAction
| ILoginUserSuccessAction
| ILoginUserFailedAction

| IForgotPasswordRequestAction
| IForgotPasswordSuccessAction
| IForgotPasswordFailedAction

| IRecoverPasswordRequestAction
| IRecoverPasswordSuccessAction
| IRecoverPasswordFailedAction

| ILogoutUserRequestAction
| ILogoutUserSuccessAction
| ILogoutUserFailedAction

| ICheckCurrentUserAuth
| ICheckResetPasswordVisit

export function getCurrentUser(func: any) {
  const jwt = localStorage.getItem('accessToken');
  return function (dispatch: any) {
    dispatch({
      type: GET_CURRENT_USER_REQUEST,
    });
    loginApi.getUserInfo(jwt!)
      .then((data) => {
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

export function registerUser(data: TUserData, func: any) {
  return function (dispatch: any) {
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

export function loginUser(data: TUserData, func: any) {
  return function (dispatch: any) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    loginApi
      .signIn(data)
      .then((data: any) => {
        if (data && data.success) {
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

export function logoutUser(refreshJwt: string, func: any) {
  return function (dispatch: any) {
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

export function forgotPassword(data: TUserData, func: any) {
  return function (dispatch: any) {
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

export function recoverPassword(data: TResetPassword, func: any) {
  return function (dispatch: any) {
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
