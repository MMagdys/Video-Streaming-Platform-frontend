import * as ActionTypes from './ActionTypes';
import { baseURL, HEADER } from '../../api/constants';


export const login = (pub, pri, username) => (dispatch) => {

    dispatch(authLoading(true));

    return new Promise ( (resolve, reject) => {
        if(!pub || !pri || !username){
            pub = localStorage.getItem('pubKey')
            pri = localStorage.getItem('priKey')
            username = localStorage.getItem('username')
        }
        fetch(baseURL + '/channels/login', {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify({pub: pub, pri: pri, username: username})
        })
        .then((result) => result.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem('pubKey', pub)
                localStorage.setItem('priKey', pri)
                localStorage.setItem('username', username)
                dispatch(authSuccess(data))
            })
            .catch((err) => {
                authFailed(err)
            })
    })
    
};


export const authLoading = () => ({
    type: ActionTypes.AUTH_LOADING
});


export const authFailed = (errmsg) => ({
    type: ActionTypes.AUTH_FAILED,
    payload: errmsg
});


export const authSuccess = (profile) => ({
    type: ActionTypes.AUTH_SUCCESS,
    payload: profile
}); 

export const logOutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS,
}); 


export const logoutUser = () => (dispatch) => {
    
    dispatch(authLoading(true));
    return new Promise ( (resolve, reject) => {
        localStorage.clear()
        dispatch(logOutSuccess())
    })
}
