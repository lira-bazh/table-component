import axios from "axios";

const UPLOAD_DATA = "UPLOAD_DATA";
const CHANGE_SORT_FIELD = "CHANGE_SORT_FIELD";
const GET_DATA_SIZE = "GET_DATA_SIZE";
const CHANGE_SIZE_PORTION = "CHANGE_SIZE_PORTION";
const SEARCH_TEXT = "SEARCH_TEXT";

const initialState = {
  availableData: [],
  startNumData: 0,
  sizeData: 0,
  curPortionStartNum: 0,
  sizePortionToLoad: 5,
  urlGetData: "/api/data",
  urlUpdData: "/api/create-data",
  emptyBase: false,
  sortField: "title",
  sortAsc: true,
  findID: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DATA: {
      return {
        ...state,
        availableData: [...action.portion],
        curPortionStartNum: action.num,
        emptyBase: action.portion.length < state.sizePortionToLoad
      };
    }
    case GET_DATA_SIZE: {
      return {
        ...state,
        sizeData: action.size
      };
    }
    case CHANGE_SORT_FIELD: {
      if (state.sortField === action.sort) {
        return {
          ...state,
          sortAsc: !state.sortAsc
        };
      }
      return {
        ...state,
        sortField: action.sort,
        sortAsc: true
      };
    }
    case CHANGE_SIZE_PORTION: {
      return {
        ...state,
        sizePortionToLoad: action.num
      };
    }
    case SEARCH_TEXT: {
      return {
        ...state,
        findID: action.id
      };
    }
    default:
      return state;
  }
};

export function uploadData(num, size) {
  return (dispatch, getState) => {
    const store = getState().table;
    if (
      !store.emptyBase &&
      (store.curPortionStartNum !== num ||
        store.availableData.length === 0 ||
        store.availableData.length !== size)
    ) {
      const fullUrl = `${store.urlGetData}/${num}/${num + size}`;
      axios(fullUrl).then(({ data }) => {
        dispatch({ type: UPLOAD_DATA, portion: data.portion, num });
      });
    }
  };
}

export function getDataSize() {
  return (dispatch, getState) => {
    const store = getState().table;
    const fullUrl = `${store.urlGetData}/size`;
    axios(fullUrl).then(({ data }) => {
      dispatch({ type: GET_DATA_SIZE, size: data });
    });
  };
}

export function changeSortField(sort) {
  return { type: CHANGE_SORT_FIELD, sort };
}

export function changeSizePortion(num) {
  return { type: CHANGE_SIZE_PORTION, num };
}

export function setFindArray(array) {
  return { type: SEARCH_TEXT, id: array };
}
