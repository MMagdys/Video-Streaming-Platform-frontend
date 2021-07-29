import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorageIcon from '@material-ui/icons/Storage';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import GroupIcon from '@material-ui/icons/Group';
import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { Typography, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  item: {
    color: '#ffffff'
  },
  headerItem: {
    color: '#ffffff',
    marginLeft: '12px',
    marginTop: '12px',

  },
  channelAvatar:{
    backgroundColor: '#ff9900',
  },
}));


export default function SideBar(props) {

  const classes = useStyles();
  const theme = useTheme();

  let subscriptionsObject = useSelector(state => state.Subscribtions)
  let authObject = useSelector(state => state.Auth)
  let open = props.open
  let handleDrawerClose = props.handleDrawerClose

  // console.log(subscriptionsObject.subscribtions)
  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to='/' className={classes.link}>
            <ListItem button key={"Home"} className={classes.item} >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          </List>
          <Divider style={{width: '95%'}}/>
          
          <List>    
          <Link to='/channel' className={classes.link}>
            <ListItem button key={"myChannel"} className={classes.item}>
              <ListItemIcon><VideoLibraryIcon /></ListItemIcon>
              <ListItemText primary={"My Channel"} />
            </ListItem>
          </Link>
          <Link to='/likes' className={classes.link}>
              <ListItem button key={"Likes"} className={classes.item}>
                <ListItemIcon><ThumbUpAltIcon /></ListItemIcon>
                <ListItemText primary={"Liked videos"} />
              </ListItem>
            </Link>
        </List>
        <Divider style={{width: '95%'}}/>
        
        <Typography variant="h6" className={classes.headerItem} >
          {open? "Subscriptions": ""}
        </Typography>
        {authObject.profile.id?
        <List>   
          {subscriptionsObject.subscribtions.map((channel) => {
            return(<Link to={`/channel/${channel.channelId}`} className={classes.link}>
            <ListItem button key={channel._id} className={classes.item}>
              <ListItemIcon> <Avatar className={classes.channelAvatar}>{channel.channelId[0]}</Avatar> </ListItemIcon>
              <ListItemText primary={channel.channelId} />
            </ListItem>
          </Link>)
          })}
        </List>
        :
        <Typography variant="body2" color="primary"  style={{padding: '1rem'}}>
          please login to get your subscription</Typography>
        }

        
      </Drawer>




      
    </div>
  );
}
