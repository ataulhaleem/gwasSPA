

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

export function Analysis() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
    <DataSelectionBar/>

    </>
   
  );
}