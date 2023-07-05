import { createClient } from "pexels";
import { ActionTypes } from "../constants/actionTypes";

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

export const fetchImages = (query, page) => {
  return (dispatch) => {
    client.photos
      .search({ query, page, per_page: 20 })
      .then((photos) =>
        dispatch({ type: ActionTypes.FETCH_IMAGES, payload: photos })
      );
  };
};

export const setSearch = (search) => {
  return {
    type: ActionTypes.CHANGE_QRY,
    payload: search,
  };
};

export const toggleModal = () => {
  return {
    type: ActionTypes.TOGGLE_MODAL,
  };
};

export const selectImg = (img) => {
  return {
    type: ActionTypes.SELECT_IMG,
    payload: img,
  };
};

export const setCols = (cols) => {
  return {
    type: ActionTypes.SET_COLS,
    payload: cols,
  };
};

export const nextPage = () => {
  return {
    type: ActionTypes.NEXT_PAGE,
  };
};
export const prevPage = () => {
  return {
    type: ActionTypes.PREV_PAGE,
  };
};
