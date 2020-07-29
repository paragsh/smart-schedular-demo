import {serviceList} from "../utils/getServiceList";

export const serviceReducer = (state = serviceList, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
