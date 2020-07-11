import * as actionType from "./actions.type";

export const setSuccessMsg = (msg) => ({
  type: actionType.SET_SUCCESS_MSG,
  payload: {
    msg,
  },
});

export const showSuccessMsg = () => ({
  type: actionType.SHOW_SUCCESS_MSG,
});

export const hideSuccessMsg = () => ({
  type: actionType.HIDE_SUCCESS_MSG,
});

export const setUserAuthToken = (authToken) => ({
  type: actionType.SET_USER_AUTH_TOKEN,
  payload: {
    authToken,
  },
});

export const setUserNickname = (nickname) => ({
  type: actionType.SET_USER_NICKNAME,
  payload: {
    nickname,
  },
});

export const resetUserNickname = () => ({
  type: actionType.RESET_USER_NICKNAME,
});

export const resetUserAuthToken = () => ({
  type: actionType.RESET_USER_AUTH_TOKEN,
});
