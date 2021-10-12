import { loginApi } from '../../utils/LoginApi';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILED = 'GET_CURRENT_USER_FAILED';

export const CHECK_CURRENT_USER_AUTH = 'CHECK_CURRENT_USER_AUTH';
export const CHECK_RESET_PASSWORD_VISIT = 'CHECK_RESET_PASSWORD_VISIT';

export function getCurrentUser() {
  const jwt = localStorage.getItem('accessToken');
  return function (dispatch) {
    dispatch({
      type: GET_CURRENT_USER_REQUEST,
    });
    loginApi.getUserInfo(jwt)
      .then((data) => {
        console.log(data)
        dispatch({
          type: GET_CURRENT_USER_SUCCESS,
          currentUser: data,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_CURRENT_USER_FAILED,
        });
      })
  }
};

export function authorizeUser(state) {
  return ({
      type: CHECK_CURRENT_USER_AUTH,
      isCurrentUserAuth: state,
    });
};

export function checkResetVisit(state) {
  return ({
      type: CHECK_RESET_PASSWORD_VISIT,
      isUserResetPassword: state,
    });
};
