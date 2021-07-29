import React, { useState } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import Video from '../../components/video/Video'


export default function LatestVideosListView(){

    let videosObject = useSelector(state => state.Videos)


    if(!videosObject){return(<CircularProgress />)}
    else
    return(
        <div>
            <Grid container spacing={4} >
                <Grid item sm={12}>
                <Typography variant="h6">
                    Latest Videos
                </Typography>
                </Grid>

                {videosObject.videos.map((video) => {
                    return(<Grid item sm={3} key={video.metaData.name}>
                        <Video key={video.channelId + ":" + video.metaData.name} video={video} />
                    </Grid>)
                })}


            </Grid>
        </div>
    )
}