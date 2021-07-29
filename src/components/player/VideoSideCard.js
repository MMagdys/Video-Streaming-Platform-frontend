import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { Grid, Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import {timeDifference} from '../../utils/videosUtils'


const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    marginTop: '1rem',
    marginRight: '3rem'
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
  },
}));

export default function Video(props) {
  
  const classes = useStyles();
  const {video, isLoading} = props
  const[time, setTime] = React.useState()
  console.log(video)

  useEffect(async() => {
	  if(video){
      timeDifference(video.metaData.timestamp)
      .then((t) => {
        setTime(t)
      })
    }
  }, [])


  	function LoadingSkeleton(){
      	return(
        <Grid container spacing={4} >
            <Grid item sm={5}>
                <Skeleton variant="rect" width={'100%'} height={'100%'}/>
            </Grid>
            <Grid item sm={7}>
                <Skeleton width={'100%'} />
                <Skeleton width={'60%'} />
                <Skeleton width={'30%'} />
            </Grid>
        </Grid>
      	)
  	}

  if(isLoading){
    return(<LoadingSkeleton />)
  }
  else
  return (
    <div>
        <Paper elevation={0} className={classes.root}>
        	<Grid container>
                <Grid item sm={5}>
                    <Link to={`/watch/${video.metaData.streamHash}`} className={classes.link} >
                        <CardMedia
                            className={classes.media}
                            image={video.metaData.thumbnail ? video.metaData.thumbnail : 'https://bofk.no/wp-content/plugins/video-thumbnails/default.jpg' }
                            title={video.metaData.name}
                        />
                    </Link>
                </Grid>
                <Grid item sm={7}>
                    <CardContent style={{backgroundColor: 'transparent'}}>
                        <Link to={`/watch/${video.metaData.streamHash}`} className={classes.link} >
                            <Typography gutterBottom variant="body2">
                            {video.metaData.name}
                            </Typography>
                        </Link>

                        <Link to={`/channel/${video.channelId}`} className={classes.link} >
                            <div style={{display: 'flex'}}>
                            <Avatar className={classes.orange}>
                                {video.channelId[0]}
                            </Avatar>
                            <Typography variant="caption" color="textSecondary" component="p">
                            <b> {video.channelId}</b> 
                            </Typography>
                            </div>
                        </Link>

                        <Typography variant="caption" color="textSecondary" component="p">
                        <div style={{display: 'flex'}}>
                            <div style={{marginLeft: 'auto'}}>
                                {time}
                            </div>
                        </div>
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Paper>
    </div>
  );
}