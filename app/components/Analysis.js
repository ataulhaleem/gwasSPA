

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete, TextField } from '@mui/material'
import { typographyVariant } from '@mui/system'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Input, Button } from '@mui/material';
import DataSelectionBar from './DataSelectionBar';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { InputBase } from '@mui/material';
import { minioClient, createProject, getMetadata,uploadFile } from 'minioClient/helper.js'
import Paper from '@mui/material/Paper';



export function Analysis(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
    <Grid columns={2} columnGap={5}>


    </Grid>

    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: '50%',
          border: 1.5,
          color: 'primary.main',
          boxShadow: 1,
          padding : 1.5
        },
      }}
    >
      <Paper variant="outlined" >
      <Typography variant = 'h5'> Usage</Typography>
        {/* <pre>{JSON.stringify(metadata, null, 2)}</pre> */}
        
      </Paper>
      
      <Paper variant="outlined" square>
        <Box     
           component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1,  width: '100%' },
                      gap: 2}}
            >
          <Typography variant = 'h5'> Select Project Data</Typography>
          <DataSelectionBar/>
     
          <Button variant = 'contained'   >run Analysis</Button>
          </Box>
        </Paper> 
      </Box>



    </>
   
  );
}