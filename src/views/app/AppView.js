import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SideBar from '../../components/sideBar/SiderBar'
import AppHeader from '../../layouts/AppHeader';



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



export default function AppView(props) {

  const classes = useStyles();
  let {handleAuthDialog} = props
  const [open, setOpen] = React.useState(true);


  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <div className={classes.root}>
        {/* <CssBaseline /> */}

        <AppHeader 
        open={open} handleDrawerOpen={handleDrawerOpen}
        handleAuthDialog={handleAuthDialog}
        />

        <SideBar 
        PaperProps={{ style: { width: drawerWidth } }}
        // variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        // open={open} handleDrawerClose={handleDrawerClose}
        />
       
    </div>
  );
}
