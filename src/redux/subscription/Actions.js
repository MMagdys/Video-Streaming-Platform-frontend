import * as ActionTypes from './ActionTypes';


const intialState = 
{
    isLoading: true,
    errmsg: null,
    subscribtions: []
};


export const Subscribtions = (state = intialState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_SUBSCRIBTIONS:
            return{...state, isLoading: false, errmsg: null, subscribtions: action.payload}

        case ActionTypes.SUBSCRIBTIONS_LOADING:
            return{...state, isLoading: true, errmsg: null, subscribtions: []}

        case ActionTypes.SUBSCRIBTIONS_FAILED:
            return{...state, isLoading: false, errmsg: action.payload, subscribtions: []}

        case ActionTypes.UNSUBSCRIBE:
            return{...state, isLoading: false, errmsg: null, 
                subscribtions: state.subscribtions.filter((subscription) => subscription.channelId != action.payload ) }
        
        case ActionTypes.SUBSCIBE:
            return{...state, isLoading: false, errmsg: null, 
                subscribtions: state.subscribtions.concat(action.payload) }

        default:
            return state;
    }
};