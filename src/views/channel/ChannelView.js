import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Video from '../../components/channel/Video'
import { Grid, Typography } from '@material-ui/core';
import Header from './Header'
import { useParams } from 'react-router-dom';
import { getChannelInfo } from '../../api/channels/channels'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import NewVideo from './NewVideo'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    minHeight: '90vh'
  },
  avatar: {
    backgroundColor: '#333333',
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: '32px',

  },
  header: {
    color: '#333333',
    fontSize: '32px'
  },
  subHeader: {
    fontSize: '14px'
  }
}));

export default function ChannelView() {

  const classes = useStyles();
  let {channelId} = useParams()
  let auth = useSelector(state => state.Auth)
  const [channel, setChannel] = React.useState({})
  const [loading, setLoading] = React.useState({})
  const [notFound, setNotFound] = React.useState(false)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(!channelId && auth.profile.id){
      channelId = auth.profile.id
    }
    getChannelInfo(channelId)
    .then((channel) => {
      if(channel == null){
        setNotFound(true)
      }
      else{
        setChannel(channel)
      }
    })
  }, [loading])


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
  
  if(notFound){return(<div align="center" style={{width: '100%', margin: '2rem'}}><Typography variant="h6">channel not found</Typography></div>)}
  if(!channel.name){return(<CircularProgress />)}
  return (
    <div>
    <Header channel={channel} setLoading={setLoading} value={value} handleChange={handleChange} />

      <CardContent>
        <TabPanel value={value} index={0}>
          <Grid container spacing={4} style={{padding: '1rem'}}>
            {channel.contents.map((video) => {
                return(
                    <Grid item sm={3}>
                        <Video video={video} />
                    </Grid>
                )
            })}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <NewVideo />
        </TabPanel>
          
      </CardContent>
    </div>
  );
}
