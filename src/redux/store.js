import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import { Videos } from './videos/Actions';
import { Subscribtions } from './subscription/Actions';
import { Auth } from './auth/Actions';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Videos: Videos,
            Subscribtions: Subscribtions,
            Auth: Auth
        }),
        applyMiddleware(thunk)
        // applyMiddleware(thunk, logger)
    );

    
    return store;
}