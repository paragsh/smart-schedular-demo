import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {rootReducer} from "./Reducer/rootReducer";

const myApplyMiddleware = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer, myApplyMiddleware);
