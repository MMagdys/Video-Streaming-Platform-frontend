import * as ActionTypes from './ActionTypes';


const intialState = 
{
    isLoading: true,
    errmsg: null,
    videos: []
};


export const Videos = (state = intialState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_VIDEOS:
            return{...state, isLoading: false, errmsg: null, videos: action.payload}

        case ActionTypes.VIDEOS_LOADING:
            return{...state, isLoading: true, errmsg: null, videos: []}

        case ActionTypes.VIDEOS_FAILED:
            return{...state, isLoading: false, errmsg: action.payload, videos: []}

        // case ActionTypes.DELETE_MACHINE:
        //     return{...state, isLoading: false, errmsg: null, 
        //         machines: state.machines.filter((machine) => machine._id != action.payload ) }
        
        // case ActionTypes.APPEND_MACHINE:
        //     console.log(state.machines, state.machines.concat(action.payload) )
        //     return{...state, isLoading: false, errmsg: null, 
        //         machines: state.machines.concat(action.payload) }

        default:
            return state;
    }
};