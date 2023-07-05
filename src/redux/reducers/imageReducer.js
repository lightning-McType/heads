import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  showModal: false,
  query: "",
  selectedImg: {},
  cols: 5,
  page: 1,
  images: [],
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_IMAGES:
      return { ...state, images: action.payload };
    case ActionTypes.CHANGE_QRY:
      return { ...state, query: action.payload };
    case ActionTypes.TOGGLE_MODAL:
      return { ...state, showModal: !state.showModal };
    case ActionTypes.SELECT_IMG:
      return { ...state, selectedImg: { ...action.payload } };
    case ActionTypes.SET_COLS:
      return { ...state, cols: Number(action.payload) };
    case ActionTypes.NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case ActionTypes.PREV_PAGE:
      return { ...state, page: state.page - 1 };
    default:
      return state;
  }
};
