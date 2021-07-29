import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import Video from '../../components/video/Video'
import { getLikedVideos } from '../../api/videos/videos'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function LikedVideosListView(props){

    const {handleDrawerOpen} = props
    let [videos, setVideos] = useState([])
   

    useEffect(() => {
        // handleDrawerOpen()
        getLikedVideos()
        .then((data) => {
            // console.log(data)
            setVideos(data)
        })
    },[])


    if(videos.length < 1){return(<CircularProgress />)}
    else
    return(
        <div>
            <Grid container spacing={4} >
                <Grid item sm={12}>
                <Typography variant="h6">
                    <FavoriteBorderIcon /> Liked Videos
                </Typography>
                </Grid>

                {videos.map((video) => {
                    return(<Grid item sm={3}>
                        <Video key={video.channelId + ":" + video.metaData.name} video={video} />
                    </Grid>)
                })}


            </Grid>
        </div>
    )
}