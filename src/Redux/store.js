import { toast } from "react-toastify";

var redux = require("redux");
const postInitialState = {
  notify: "",
  totalNumOfRooms: 0,
  editRow: {},
};
const allReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case "NOTIFY_SUCCESS":
      toast.success(action.notifySuccess);
      console.log(action.notifySuccess);
      return {
        ...state,
        notify: action.notifySuccess,
      };
    case "NOTIFY_ERROR":
      toast.error(action.notifyError);
      console.log(action.notifyError);
      return { ...state };
    case "EDIT_ROW":
      console.log(action.editRowData);
      return { ...state, editRow: action.editRowData };
    case "NUM_ROOMS":
      console.log(action.totalNumOfRooms);
      return { ...state, totalNumOfRooms: action.numOfRooms };
    default:
      return state;
  }
};
var store = redux.createStore(allReducer);
store.subscribe(function () {
  // console.log(JSON.stringify(store.getState()));
});
export default store;
