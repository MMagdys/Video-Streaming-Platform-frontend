import { baseURL, HEADER } from '../constants';


const getChannelInfo = (channelId)  => {

    return new Promise ( (resolve, reject) => {

        fetch(baseURL + '/channels/', {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({channelId: channelId})
        })
        .then((res) =>{ 
            console.log(res);
            if (res.status === 200){
                res.json()
                .then((data) => {
                    resolve(data)
                })
            }
            else{
                console.log("ERROR: ", res);
                reject('Internal Server Error')
            }
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
};


const subscribeChannel = (channelId)  => {

    return new Promise ( (resolve, reject) => {

        fetch(baseURL + '/channels/subscribe', {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({channelId: channelId})
        })
        .then((res) =>{ 
            console.log(res);
            if (res.status === 200){
                res.json()
                .then((data) => {
                    resolve(data)
                })
            }
            else{
                console.log("ERROR: ", res);
                reject('Internal Server Error')
            }
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
};


const unSubscribeChannel = (channelId)  => {

    return new Promise ( (resolve, reject) => {

        fetch(baseURL + '/channels/unsubscribe', {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({channelId: channelId})
        })
        .then((res) =>{ 
            console.log(res);
            if (res.status === 200){
                res.json()
                .then((data) => {
                    resolve(data)
                })
            }
            else{
                console.log("ERROR: ", res);
                reject('Internal Server Error')
            }
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
};



export {
    getChannelInfo,
    subscribeChannel,
    unSubscribeChannel,
}