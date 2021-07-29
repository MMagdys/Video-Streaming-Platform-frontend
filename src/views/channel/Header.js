import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { subscribeChannel, unSubscribeChannel } from '../../api/channels/channels'
import { subscibe, unsubscribe } from '../../redux/subscription/Reducer'
import { useDispatch, useSelector } from 'react-redux';


const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    color: '#ffffff',
    backgroundColor: '#ff9900',
    fontSize: '16px',
  },
  unbutton: {
    color: '#ff9900',
    backgroundColor: '#ffffff',
    fontSize: '16px',
  },
  title: {
    color: '#333333',
    fontSize: '32px',
    marginLeft: '1rem',
    paddingTop: '5px'
  },
  avatar: {
    backgroundColor: '#ff9900',
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: '32px',
  },
  subTitle: {
    fontSize: '14px',
    marginLeft: '1rem',
    // color: 'grey'

  }
});

function Header(props) {

  const { classes, setLoading, channel, value, handleChange } = props;
  let auth = useSelector(state => state.Auth)

  let dispatch = useDispatch()

  const subscribeToChannel = () => {
    setLoading(true)
    subscribeChannel(channel.id)
    .then((channel) => {
      console.log(channel)
      setLoading(false)
      dispatch(subscibe(channel))
    })
  }

  const unSubscribeToChannel = () => {
    setLoading(true)
    unSubscribeChannel(channel.id)
    .then((result) => {
      console.log(result)
      setLoading(false)
      dispatch(unsubscribe(channel.id))
    })
  }


  return (
    <React.Fragment>

      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="dark"
        position="static"
        elevation={0}
        style={{backgroundColor: 'silver'}}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
                <div style={{display: 'flex', paddingTop: '1rem'}}>
                    <Grid container>
                        <Grid item>
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {channel.name[0]}
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography color="inherit" variant="h5" component="h1" 
                            className={classes.title}
                            >
                                {channel.name}
                            </Typography>
                            <Typography color="inherit" variant="body2"
                            className={classes.subTitle}
                            >
                                {channel.type}  | {channel.amount} coins
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid item>
              {auth.profile.id == channel.id?
              <Button className={classes.unbutton} variant="outlined" color="inherit" size="medium"
              onClick={() => {handleChange(null, 1)}}
              >
                Add Video
              </Button>
              :
              channel.subscribed? 
              <Button className={classes.unbutton} variant="outlined" color="inherit" size="medium"
              onClick={unSubscribeToChannel}
              >
                unsubscribe
              </Button>
            :
            <Button className={classes.button} variant="outlined" color="inherit" size="medium"
            onClick={subscribeToChannel}
            >
              subscribe
            </Button>
            }
            </Grid>
            {/* <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>

      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
        style={{backgroundColor: 'silver'}}
      >
        <Tabs value={value} onChange={handleChange}  textColor="inherit">
          <Tab textColor="white" label="Videos" />
          {auth.profile.id == channel.id ? <Tab textColor="white" label="New Video"/> : <div></div>}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);