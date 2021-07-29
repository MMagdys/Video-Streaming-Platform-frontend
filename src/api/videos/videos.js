import { baseURL, HEADER } from '../constants';


const addVideoByHash = (hash)  => {

    return new Promise ( (resolve, reject) => {

        fetch(baseURL + '/videos/', {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({infoHash: hash})
        })
        .then((res) =>{ 
            console.log(res);
            if (res.status === 200){
                res.json()
                .then((data) => {
                    resolve(data.content)
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


const getLikedVideos = ()  => {

    return new Promise ( (resolve, reject) => {

        fetch(baseURL + '/videos/like/', {
            method: "GET",
            headers: HEADER,
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


const likeVideo = (channelId, hash)  => {

    return new Promise ( (resolve, reject) => {

        fetch(baseURL + '/videos/like/', {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({channelId: channelId, hash: hash})
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


const addVideo = (videoPath, mediaName, thumbnail, amount)  => {

    return new Promise ( (resolve, reject) => {

        fetch(baseURL + '/videos/addVideo/', {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({videoPath: `assets/${videoPath}`, mediaName: mediaName, 
                thumbnail: thumbnail, amount: amount, channelId: localStorage.getItem('username'), channelPrivateKey: localStorage.getItem('priKey')})
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
    addVideoByHash,
    getLikedVideos,
    likeVideo,
    addVideo
}