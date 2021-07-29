import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { login as loginFunction } from '../../redux/auth/Reducer'


const useStyles = makeStyles((theme) => ({
  button:{
    width: '90%',
    marginBottom: '1rem'
  },
  input: {
    display: 'none',
  },
}));


export default function AuthView(props) {

  const classes = useStyles();
  let {closeLogin, login} = props
  let dispatch = useDispatch()
  const regexpWords = /\b\w+\b/g;


  const showFile = async (event) => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = async (event) => { 
      const text = (event.target.result)
      // console.log(text)
      let words = text.match(regexpWords)
      dispatch(loginFunction(words[1].replace('"', ''),
      words[3].replace('"', ''), words[5].replace('"', '')))
      closeLogin()
    };
    reader.readAsText(event.target.files[0])
  }


  return (
    
    <div>
      <Dialog open={login} onClose={closeLogin} 
      fullWidth
      maxWidth="sm"
      >
        <DialogTitle>Login & Register</DialogTitle>
        <DialogContent>
            <div align="center" style={{padding: '1rem'}}>
              <input
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              // onChange={onFileChange}
              onChange={showFile}
              // onClick={() => {showFile}}
              />
              <label htmlFor="contained-button-file">
                  <Button variant="outlined" color="primary" component="span"
                  className={classes.button} 
                  >
                    Key File
                  </Button>
              </label>

              <Button onClick={closeLogin} className={classes.button}  color="primary">
                Cancel
              </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}