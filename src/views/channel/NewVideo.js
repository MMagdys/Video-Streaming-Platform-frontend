import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { addVideo } from '../../api/videos/videos'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  item: {
      marginBottom: '1rem'
  },
  input: {
    display: 'none',
  },
}));

export default function NewVideo() {
  
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    thumbnail: '',
    path: '',
  })

  const handleChange = (prop) => (event) => {
    // console.log(event.target.files[0].name)
    if(event.target.files){
      setValues({ ...values, [prop]: event.target.files[0].name });
    }
    else{
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const addNewVideo = () => {
    addVideo(values.path, values.name, values.thumbnail)
    .then((video) => {
      console.log(video)
    })
  }

  return (
    <div>
        <Typography variant="h5" className={classes.item}>New Video</Typography>

      <div>
      <Grid container spacing={4}>
          <Grid item sm={8}>
            <div className={classes.root}>

                <TextField
                id="standard-full-width"
                label="Name"
                style={{ margin: 8 }}
                placeholder="Video name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                className={classes.item}
                value={values.name}
                onChange={handleChange('name')}
                />

                <TextField
                id="standard-full-width"
                label="Thumbnail"
                style={{ margin: 8 }}
                placeholder="https://link-to-your-thumbnail-photo"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                className={classes.item}
                value={values.thumbnail}
                onChange={handleChange('thumbnail')}
                />

            </div>
          </Grid>

          <Grid item sm={4}>
            <div align="center" style={{height: '100%'}}>
            <input
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange('path')}
            />
            <label htmlFor="contained-button-file">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    component="span"
                    style={{top: '30%'}}
                >
                    Video file
                </Button>
            </label>
            </div>
          </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        component="span"
        style={{marginTop: '2rem', width: '90%'}}
        onClick={addNewVideo}
      >
        ADD
      </Button>
      </div>
    </div>
  );
}
