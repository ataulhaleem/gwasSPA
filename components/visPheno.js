import React from 'react'
import ChooseDropDown from '../components/chooseDropDown'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

export default function VisPheno() {
  return (
    <>
    <h3>Visualize the phenotype</h3>
    <Grid2 container spacing={1} columns={16} columnGap = {2}>
      <ChooseDropDown/>
      <ChooseDropDown/>
    </Grid2>
  



    </>
  )
}
