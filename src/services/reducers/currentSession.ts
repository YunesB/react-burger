import {
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,

  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILED,

  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,

  TCurrentSessionAction
} from "../actions/currentSession";

import { DEFAULT_USER } from '../../utils/constants';
import { TUser } from '../../types';

type TCurrentSessionState = {
  currentUser: TUser,
  currentUserRequest: boolean,
  currentUserFailed: boolean,

  registerRequest: boolean,
  registerFailed: boolean,

  loginRequest: boolean,
  loginFailed: boolean,

  logoutRequest: boolean,
  logoutFailed: boolean,

  isAccountLoading: boolean,
  isCurrentUserAuth: boolean,
  isUserResetPassword: boolean,
} 

const initialState: TCurrentSessionState = {
  currentUser: DEFAULT_USER,
  currentUserRequest: false,
  currentUserFailed: false,

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  isAccountLoading: false,
  isCurrentUserAuth: false,
  isUserResetPassword: false,
};

export const currentSessionReducer = (state = initialState, action: TCurrentSessionAction): TCurrentSessionState => {
  switch (action.type) {
    case GET_CURRENT_USER_REQUEST: {
      return {
        ...state,
        currentUserRequest: true,
        isAccountLoading: true,
      };
    }
    case GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUserRequest: false,
        currentUserFailed: false,
        currentUser: action.currentUser,
        isCurrentUserAuth: true,
        isAccountLoading: false
      };
    }
    case GET_CURRENT_USER_FAILED: {
      return {
        ...state,
        currentUserRequest: false,
        currentUserFailed: true,
        isAccountLoading: false,
      };
    }

    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        isAccountLoading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        isAccountLoading: false,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }

    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        isAccountLoading: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        currentUser: action.currentUser,
        isUserResetPassword: false,
        isCurrentUserAuth: true,
        isAccountLoading: false
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
        isCurrentUserAuth: false,
        isAccountLoading: false,
      };
    }

    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        isAccountLoading: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        isCurrentUserAuth: false,
        isAccountLoading: false
      };
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        isAccountLoading: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isUserResetPassword: true,
        isAccountLoading: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isUserResetPassword: true,
        isAccountLoading: false
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        isAccountLoading: false,
      };
    }

    case RECOVER_PASSWORD_REQUEST: {
      return {
        ...state,
        isAccountLoading: true,
      };
    }
    case RECOVER_PASSWORD_SUCCESS: {
      return {
        ...state,
        isUserResetPassword: false,
        isAccountLoading: false
      };
    }
    case RECOVER_PASSWORD_FAILED: {
      return {
        ...state,
        isAccountLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};