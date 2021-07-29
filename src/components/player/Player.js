import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams, Link } from 'react-router-dom'
import { Paper, Typography, IconButton, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

import  { addVideoByHash, likeVideo  } from '../../api/videos/videos'
import { timeDifference } from '../../utils/videosUtils'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
    root: {
    //   marginTop: '1rem',
      marginLeft: '1rem',
      marginRight: '1rem',
    },
    media: {
      height: '100%',
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: '14px',
      marginRight: '16px',
  
    },
    link: {
      textDecoration: 'none',
      color: 'black',
    //   marginBottom: '1rem'
    },
}));


export default function Player(props) {
    
    const classes = useStyles();

    const {isLoading } = props
    const [loading, setLoading] = React.useState(true);
    const [video, setVideo] = React.useState({});
    const [time, setTime] = React.useState('');
    const [liked, setLiked] = React.useState(false);
    let videosObject = useSelector(state => state.Videos)
    let {videoHash} = useParams();
    console.log(videoHash, video)


    useEffect(() => {
        setLoading(true)
        addVideoByHash(String(videoHash))
        .then((data) => {
            // let vid = 
            setVideo(videosObject.videos.filter((video) => video.metaData.streamHash == videoHash)[0])
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if(video.metaData){
            timeDifference(video.metaData.timestamp)
            .then((t) => {
                setTime(t)
            })  
        }
    }, [loading])

    const like = () => {
        likeVideo(video.channelId, video.metaData.hash)
        .then((liked) => {
            setLiked(true)
        })
    }

    if(loading || isLoading){return(
        <div align="center">
            <CircularProgress />
        </div>
    )}
    else
        return(
            <div>
                <video width="100%" autoPlay controls style={{backgroundColor: 'grey'}}>
                    <source src={`http://localhost:4000/v0/videos/stream/${videoHash}`} type="video/mp4"/>
                </video>

                    <div className={classes.root}>

                        <div style={{display: 'flex', }}>
                            <Typography variant="h6" >
                                {video.metaData.name}
                            </Typography>
                                
                            <Typography variant="caption" color="textSecondary" component="p" style={{marginLeft: 'auto'}}>
                                    {liked? 
                                    <IconButton onClick={like} >
                                        <FavoriteIcon />
                                    </IconButton>
                                    :
                                    <IconButton >
                                        <FavoriteBorderIcon /> 
                                    </IconButton>
                                    }
                            </Typography>
                        </div>

                        <Link to={`/channel/${video.channelId}`} className={classes.link} >
                            <div style={{display: 'flex', marginTop: '1rem'}}>
                                <Avatar className={classes.orange}>
                                    {video.channelId[0]}
                                </Avatar>
                                <Typography variant="caption" color="textSecondary" component="p">
                                    <b> {video.channelId}</b> 
                                </Typography>
                                <Typography variant="caption" color="textSecondary" component="p" style={{marginLeft: 'auto'}}>
                                    {time}
                                </Typography>
                            </div>
                        </Link>

                    </div>
                {/* </Paper> */}
            </div>
            
        )    
}
