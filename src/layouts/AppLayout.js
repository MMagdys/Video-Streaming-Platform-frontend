import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, Redirect } from "react-router-dom";
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { initApp } from '../redux/videos/Reducer'
import { fetchsubscribtions } from '../redux/subscription/Reducer'
import { login } from '../redux/auth/Reducer'

import AppView from '../views/app/AppView'
import AuthView from '../views/auth/AuthView'

import LatestVideosView from '../views/videos/LatestVideosView'
import WatchView from '../views/watch/WatchView'
import LikedVideosView from '../views/videos/LikedVideosVIew'
import ChannelView from '../views/channel/ChannelView'


let theme = createTheme({
  palette: {
    primary: {
      light: '#666666',
      main: '#FF9900',
      dark: '#333333',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#333333',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#ffffff',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        flexGrow: 10,
        padding: theme.spacing(3),
    },

}));



export default function AppLayout() {

  const classes = useStyles();
  const [authDialog, setAuthDialog] = React.useState(false)
  let dispatch = useDispatch()

  const handleAuthDialog = () => {
    setAuthDialog(true)
  }

  const closeAuthDialog = () => {
    setAuthDialog(false)
  }


  useEffect(() => {
    dispatch(initApp())
    dispatch(fetchsubscribtions())
    dispatch(login())
  }, [])


  return (
    <ThemeProvider theme={theme}>
    <AuthView authDialog={authDialog} closeAuthDialog={closeAuthDialog} />
    <div className={classes.root}>

        <AppView handleAuthDialog={handleAuthDialog}/>
        
        

        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/likes" component={() => <LikedVideosView />} />
              <Route exact path="/watch/:videoHash" component={() => <WatchView />} />
              <Route exact path="/channel/:channelId" component={() => <ChannelView key={window.location.pathname} />} />
              <Route exact path="/channel/" component={() => <ChannelView key={window.location.pathname} />} />
              <Route path="/" component={LatestVideosView} />
              <Redirect to="/" />
            </Switch> 

        </main>
        </div>
        </ThemeProvider>
  );
}
