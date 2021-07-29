import * as ActionTypes from './ActionTypes';


const intialState = 
{
    isLoading: true,
    errmsg: null,
    profile: {}
};


export const Auth = (state = intialState, action) => {

    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            return{...state, isLoading: false, errmsg: null, profile: action.payload}

        case ActionTypes.AUTH_LOADING:
            return{...state, isLoading: true, errmsg: null, profile: {}}

        case ActionTypes.AUTH_FAILED:
            return{...state, isLoading: false, errmsg: action.payload, profile: {}}
        
        case ActionTypes.LOGOUT_SUCCESS:
            return{...state, isLoading: false, errmsg: null, profile: {}}
    
        default:
            return state;
    }
};