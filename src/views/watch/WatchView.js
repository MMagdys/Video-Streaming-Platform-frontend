import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Video from '../../components/player/VideoSideCard'
import Player from '../../components/player/Player'
import { fetchvideos } from '../../redux/videos/Reducer'
import { useParams } from 'react-router-dom';


export default function VideosWatchView(props){

    const {handleDrawerClose} = props
    let [loading, setLoading] = useState(true)
    let [videos, setVideos] = useState([])
    let videosObject = useSelector(state => state.Videos)
    let {videoHash} = useParams();
    console.log(videosObject, videos)
    let dispatch = useDispatch()

    // useEffect(() => {
    //     // handleDrawerClose()
    //     dispatch(fetchvideos())
    //     .then((data) => {
    //         console.log(data)
    //         setVideos(data.content)
    //         // setLoading(false)
    //         // machinesList = data.machines
    //     })
    // },[])

    if(videosObject.isLoading){
        return(
            <div>
                <Grid container spacing={4} >
                    <Grid item sm={8}>
                        <Player isLoading={videosObject.isLoading}/>
                    </Grid>

                    <Grid item sm={4}>
                        <Video key={0} isLoading={videosObject.isLoading} />
                        <Video key={1} isLoading={videosObject.isLoading} />
                        <Video key={2} isLoading={videosObject.isLoading} />
                    </Grid>
                </Grid>
            </div>
        )
    }
    else{
        return(
            <div>
                <Grid container spacing={4} >
                    <Grid item sm={8}>
                        <Player />
                    </Grid>

                    <Grid item sm={4}>
                        {videosObject.videos.map((video) => {
                            if(video.metaData.streamHash != videoHash)
                            return(<div>
                                <Video key={video.channelId + ":" + video.metaData.name} video={video} />
                            </div>)
                        })}
                    </Grid>

                </Grid>
            </div>
        )
    }
}