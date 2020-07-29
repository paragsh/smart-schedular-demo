import {ADD_CUSTOMER_LIST} from "../Constant/ActionType";


const initialState= [];
export const customerReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_CUSTOMER_LIST:
            return action.payload;
        default:
            return state;
    }
};
