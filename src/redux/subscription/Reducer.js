import * as ActionTypes from './ActionTypes';
import { baseURL, HEADER } from '../../api/constants';


export const fetchsubscribtions = () => (dispatch) => {

    dispatch(subscribtionsLoading(true));

    return new Promise ( (resolve, reject) => {
        fetch(baseURL + '/channels/subscribtion', {
            method: 'GET',
            headers: HEADER,
        })
        .then((result) => result.json())
            .then((data) => {
                console.log(data)
                dispatch(addsubscribtions(data))
            })
            .catch((err) => {
                subscribtionsFailed(err)
            })
    })
    
};


export const subscribtionsLoading = () => ({
    type: ActionTypes.SUBSCRIBTIONS_LOADING
});


export const subscribtionsFailed = (errmsg) => ({
    type: ActionTypes.SUBSCRIBTIONS_FAILED,
    payload: errmsg
});


export const addsubscribtions = (subscribtions) => ({
    type: ActionTypes.ADD_SUBSCRIBTIONS,
    payload: subscribtions
}); 


export const unsubscribe = (id) => (dispatch) => {
    dispatch({
       type: ActionTypes.UNSUBSCRIBE,
       payload: id
    })
}

export const subscibe = (channel) => (dispatch) => {
    dispatch({
        type: ActionTypes.SUBSCIBE,
        payload: channel
    })
}
