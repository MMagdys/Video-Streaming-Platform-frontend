import * as ActionTypes from './ActionTypes';
import { baseURL, HEADER } from '../../api/constants';


export const fetchvideos = () => (dispatch) => {

    dispatch(videosLoading(true));

    return new Promise ( (resolve, reject) => {
        fetch(baseURL + '/blockchain/', {
            method: 'GET',
            headers: HEADER,
        })
        .then((result) =>{
            fetch(baseURL + '/videos/latest/', {
                method: 'GET',
                headers: HEADER,
            })
            .then((result) => result.json())
            .then((data) => {
                // console.log(data)
                dispatch(addvideos(data.content))
            })
            .catch((err) => {
                videosFailed(err)
            })
        })
        
        .catch((err) => {
            videosFailed(err)
        })
    })
    
};


export const initApp = () => (dispatch) => {

    dispatch(videosLoading(true));

    return new Promise ( (resolve, reject) => {
        fetch(baseURL + '/videos/init/', {
            method: 'GET',
            headers: HEADER,
        })
        .then((result) => result.json())
            .then((data) => {
                // console.log(data)
                dispatch(addvideos(data.content))
            })
            .catch((err) => {
                videosFailed(err)
            })
    })
    
};


export const videosLoading = () => ({
    type: ActionTypes.VIDEOS_LOADING
});


export const videosFailed = (errmsg) => ({
    type: ActionTypes.VIDEOS_FAILED,
    payload: errmsg
});


export const addvideos = (videos) => ({
    type: ActionTypes.ADD_VIDEOS,
    payload: videos
}); 
