import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Grid, Paper } from '@material-ui/core';
import {timeDifference} from '../../utils/videosUtils'


const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 245,
  },
  media: {
    height: 140,
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
  const {video} = props
  const[time, setTime] = React.useState()


  useEffect(async() => {
	  if(video){
      timeDifference(video.timestamp)
      .then((t) => {
        setTime(t)
      })
    }
  }, [])


  return (
    <div>
      <Paper elevation={0} className={classes.root}>
        	<Grid container>
                <Grid item sm={12}>
                    <Link to={`/watch/${video.streamHash}`} className={classes.link} >
                        <CardMedia
                            className={classes.media}
                            image={video.thumbnail ? video.thumbnail : 'https://bofk.no/wp-content/plugins/video-thumbnails/default.jpg' }
                            title={video.name}
                        />
                    </Link>
                </Grid>
                <Grid item sm={12}>
                    <CardContent style={{backgroundColor: 'transparent'}}>
                        <Link to={`/watch/${video.streamHash}`} className={classes.link} >
                            <Typography gutterBottom variant="body2">
                            {video.name}
                            </Typography>
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