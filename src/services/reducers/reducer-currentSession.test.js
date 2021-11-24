import { DEFAULT_USER } from '../../utils/constants';
import { currentSessionReducer, initialState } from "./currentSession";

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
} from "../actions/currentSession";

describe("current session reducer", () => {
  it("should return the initial state", () => {
    expect(currentSessionReducer(undefined, {})).toEqual({
      currentUser: DEFAULT_USER,
      currentUserRequest: false,
      currentUserFailed: false,
      currentUserChecked: false,
    
      registerRequest: false,
      registerFailed: false,
    
      loginRequest: false,
      loginFailed: false,
    
      logoutRequest: false,
      logoutFailed: false,
    
      isAccountLoading: false,
      isCurrentUserAuth: false,
      isUserResetPassword: false,
    });
  });

  it("should handle GET_CURRENT_USER_REQUEST", () => {
    expect(
      currentSessionReducer(initialState, {
        type: GET_CURRENT_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        currentUserRequest: true,
        isAccountLoading: true,
        currentUserChecked: false,
      })
    );
  });

  it("should handle GET_CURRENT_USER_SUCCESS", () => {
    expect(
      currentSessionReducer(initialState, {
        type: GET_CURRENT_USER_SUCCESS,
        currentUser: { name: "test_user", id: 0 }
      })
    ).toEqual(
      expect.objectContaining({
        currentUserRequest: false,
        currentUserFailed: false,
        currentUser: { name: "test_user", id: 0 },
        isCurrentUserAuth: true,
        isAccountLoading: false,
        currentUserChecked: true,
      })
    );
  });

  it("should handle GET_CURRENT_USER_FAILED", () => {
    expect(
      currentSessionReducer(initialState, {
        type: GET_CURRENT_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        currentUserRequest: false,
        currentUserFailed: true,
        isAccountLoading: false,
        currentUserChecked: true,
      })
    );
  });

  it("should handle REGISTER_USER_REQUEST", () => {
    expect(
      currentSessionReducer(initialState, {
        type: REGISTER_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        registerRequest: true,
        isAccountLoading: true,
        currentUserChecked: false,
      })
    );
  });

  it("should handle REGISTER_USER_SUCCESS", () => {
    expect(
      currentSessionReducer(initialState, {
        type: REGISTER_USER_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        registerRequest: false,
        registerFailed: false,
        isAccountLoading: false,
      })
    );
  });

  it("should handle REGISTER_USER_FAILED", () => {
    expect(
      currentSessionReducer(initialState, {
        type: REGISTER_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        registerRequest: false,
        registerFailed: true,
      })
    );
  });

  it("should handle LOGIN_USER_REQUEST", () => {
    expect(
      currentSessionReducer(initialState, {
        type: LOGIN_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        loginRequest: true,
        isAccountLoading: true,
      })
    );
  });

  it("should handle LOGIN_USER_SUCCESS", () => {
    expect(
      currentSessionReducer(initialState, {
        type: LOGIN_USER_SUCCESS,
        currentUser: { name: "test_user", id: 0 }
      })
    ).toEqual(
      expect.objectContaining({
        loginRequest: false,
        loginFailed: false,
        currentUser: { name: "test_user", id: 0 },
        isUserResetPassword: false,
        isCurrentUserAuth: true,
        isAccountLoading: false
      })
    );
  });

  it("should handle LOGIN_USER_FAILED", () => {
    expect(
      currentSessionReducer(initialState, {
        type: LOGIN_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        loginRequest: false,
        loginFailed: true,
        isCurrentUserAuth: false,
        isAccountLoading: false,
      })
    );
  });

  it("should handle LOGOUT_USER_REQUEST", () => {
    expect(
      currentSessionReducer(initialState, {
        type: LOGOUT_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        logoutRequest: true,
        isAccountLoading: true,
      })
    );
  });

  it("should handle LOGOUT_USER_SUCCESS", () => {
    expect(
      currentSessionReducer(initialState, {
        type: LOGOUT_USER_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        logoutRequest: false,
        logoutFailed: false,
        isCurrentUserAuth: false,
        isAccountLoading: false
      })
    );
  });

  it("should handle LOGOUT_USER_FAILED", () => {
    expect(
      currentSessionReducer(initialState, {
        type: LOGOUT_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        logoutRequest: false,
        logoutFailed: true,
        isAccountLoading: false,
      })
    );
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      currentSessionReducer(initialState, {
        type: FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        isUserResetPassword: true,
        isAccountLoading: true,
      })
    );
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      currentSessionReducer(initialState, {
        type: FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        isUserResetPassword: true,
        isAccountLoading: false
      })
    );
  });

  it("should handle FORGOT_PASSWORD_FAILED", () => {
    expect(
      currentSessionReducer(initialState, {
        type: FORGOT_PASSWORD_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        isAccountLoading: false,
      })
    );
  });

  it("should handle RECOVER_PASSWORD_REQUEST", () => {
    expect(
      currentSessionReducer(initialState, {
        type: RECOVER_PASSWORD_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        isAccountLoading: true,
      })
    );
  });

  it("should handle RECOVER_PASSWORD_SUCCESS", () => {
    expect(
      currentSessionReducer(initialState, {
        type: RECOVER_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        isUserResetPassword: false,
        isAccountLoading: false
      })
    );
  });

  it("should handle RECOVER_PASSWORD_FAILED", () => {
    expect(
      currentSessionReducer(initialState, {
        type: RECOVER_PASSWORD_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        isAccountLoading: false,
      })
    );
  });
});