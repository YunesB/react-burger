import {
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,
  CHECK_CURRENT_USER_AUTH,
  CHECK_RESET_PASSWORD_VISIT
} from "../actions/currentSession";

import { DEFAULT_USER } from '../../utils/constants';

const initialState = {
  currentUser: DEFAULT_USER,
  currentUserRequest: false,
  currentUserFailed: false,

  isAccountLoading: false,
  isCurrentUserAuth: false,
  isUserResetPassword: false,
};

export const currentSessionReducer = (state = initialState, action) => {
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
        isAccountLoading: false
      };
    }
    case GET_CURRENT_USER_FAILED: {
      return {
        ...state,
        currentUserRequest: false,
        currentUserFailed: true,
      };
    }
    case CHECK_CURRENT_USER_AUTH: {
      return {
        ...state,
        isCurrentUserAuth: action.isCurrentUserAuth,
      };
    }
    case CHECK_RESET_PASSWORD_VISIT: {
      return {
        ...state,
        isUserResetPassword: action.isUserResetPassword,
      };
    }
    default: {
      return state;
    }
  }
};