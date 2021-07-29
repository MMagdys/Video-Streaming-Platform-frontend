import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginDialog from '../../components/auth/LoginDialog'

const useStyles = makeStyles((theme) => ({
  button:{
    width: '90%',
    marginBottom: '1rem'
  }
}));

export default function AuthView(props) {

  const classes = useStyles();
  let {authDialog, closeAuthDialog} = props
  const [login, setLogin] = React.useState(false);
  const [reg, setReg] = React.useState(false);

  const handleLoginOpen = () => {
    closeAuthDialog()
    setLogin(true);
  };

  const closeLogin = () => {
    setLogin(false);
  };

  const handleRegOpen = () => {
    setReg(true);
  };

  const closeReg = () => {
    setReg(false);
  };


  return (
    <div>
      <LoginDialog login={login} closeLogin={closeLogin} />
      <Dialog open={authDialog} onClose={closeAuthDialog} 
      fullWidth
      maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Login & Register</DialogTitle>
        <DialogContent>
          <div align="center">
            <Button onClick={handleLoginOpen} variant="contained" color="primary" 
            className={classes.button}
            >
              Login
            </Button>
            <Button onClick={handleRegOpen} variant="contained" color="primary"
            className={classes.button}
            >
              Register
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}