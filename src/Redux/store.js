// import { toast } from 'react-toastify';
var redux = require('redux');


const postInitialState = {
    title: 'test',
    isEdit: false,
    editPost:{},
    notify: "",
    searchPost:"",
    showImageDes: false,
    imageDes:"",
    showFormLogin: false,
}
const allReducer = (state = postInitialState, action) => {
    switch (action.type) {
        case "NOTIFY_SUCCESS":

            return {...state, notify:action.notify}
        case "NOTIFY_ERROR":

            return {...state, notify:action.notifyEdit}
        default:
            return state
    }
}
var store = redux.createStore(allReducer);
store.subscribe(function(){
    // console.log(JSON.stringify(store.getState()));
})
export default store;