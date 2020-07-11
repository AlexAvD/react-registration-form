import * as actionType from "../actions.type";

const initialState = {
  authToken: null,
  nickname: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionType.SET_USER_AUTH_TOKEN: {
      const { authToken } = action.payload;
      return {
        ...state,
        authToken,
      };
    }

    case actionType.SET_USER_NICKNAME: {
      const { nickname } = action.payload;
      return {
        ...state,
        nickname,
      };
    }

    case actionType.RESET_USER_NICKNAME: {
      return {
        ...state,
        nickname: null,
      };
    }

    case actionType.RESET_USER_AUTH_TOKEN: {
      return {
        ...state,
        authToken: null,
      };
    }

    default:
      return state;
  }
}
