import * as actionType from "../actions.type";

const initialState = {
  msg: "",
  show: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionType.SET_SUCCESS_MSG: {
      const { msg } = action.payload;
      return {
        ...state,
        msg,
      };
    }
    case actionType.SHOW_SUCCESS_MSG: {
      return {
        ...state,
        show: true,
      };
    }
    case actionType.HIDE_SUCCESS_MSG: {
      return {
        ...state,
        show: false,
      };
    }
    default:
      return state;
  }
}
