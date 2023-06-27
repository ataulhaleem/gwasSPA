
"use client"
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
// import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { InputBase } from '@mui/material';
import { minioClient, createProject, getMetadata,uploadFile } from '/minioClient/helper.js'
import Paper from '@mui/material/Paper';
import { ToolsContext } from './contexts';
import { useState, useEffect } from 'react';
import documentation from '../components/documentation.json';
import { useRef } from 'react';
import Papa from "papaparse";
import PlotlyPlots from './PlotlyPlots2';


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Head from 'next/head';


export function Analysis(props) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const tool = props.tool;
  // console.log("This tool that i clicked is: ",tool)

  const [toolsUsage, setToolsUsage] = useState("")
  const inputFile = useRef(null)
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  
  const [selected_plot_type, setSelectedPlotType] = useState('');
  const [col_names, setColNames] = useState([]);
  const [selectedXvar, setSelectedXvar] = useState('');
	const [selectedYvar, setSelectedYvar] = useState('');
  
  const [open, setOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [plotSchema, setPlotSchema] = useState({})
  const [state, setState] = useState({});
  const [url, setUrl] = useState('https://raw.githubusercontent.com/ataulhaleem/dataVis/main/data/modemPhenoData.csv');





  // perform GWAS

  const loadPlink = () => {
    const initializeModule = async () => {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = "wasm/plink.js"; // Replace '/path/to/wasm.js' with the correct wasm path
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
      // const Module = await window.Plink();
      // Module.callMain(["--help"])
    };
    initializeModule();
  }

  function parseSeparatedFile(fileContent, delimiter) {
    const rows = fileContent.split('\n');
    const header = rows.shift().split(delimiter).filter((value) => value !== '');
    const resultArray = [];
  
    rows.forEach((row) => {
      const columns = row.split(delimiter).filter((value) => value !== '');
      const obj = {};
  
      columns.forEach((column, index) => {
        const key = header[index];
        const value = column;
        obj[key] = value;
      });
  
    resultArray.push(obj);
  
    });
  
    return resultArray;
  }
  const handleGWAS = () => {
    const files = inputFile.current.files;
    window.Plink().then(Module => {
      const readers = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        readers.push(reader);
        reader.onload = (e) => {
          const fileContents = e.target.result;      
          // upLoadToBrowser(files[i].name, fileContents)
          Module.FS_createDataFile(
          ".", // folder
          files[i].name, // filename
          fileContents, // content
          true, // read
          true, // write
          );
          Module.callMain(["--bfile", "UNT54", "--assoc", "--allow-no-sex" ])
          console.log("Files After", Module.FS.readdir('.'))  
        };
        reader.readAsBinaryString(files[i]);
      }  

    })
  // var runPlink = async() => {
  //   const Module = await window.Plink();
  //   console.log("Files Before", Module.FS.readdir('.'))
  //   // console.log(inputFile.current.files)
  //   const files = inputFile.current.files;
  //   const readers = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     readers.push(reader);
  //     reader.onload = (e) => {
  //       const fileContents = e.target.result;      
  //       // upLoadToBrowser(files[i].name, fileContents)
  //       Module.FS_createDataFile(
  //       ".", // folder
  //       files[i].name, // filename
  //       fileContents, // content
  //       true, // read
  //       true, // write
  //       );
  //       Module.callMain(["--bfile", "UNT54", "--assoc", "--allow-no-sex" ])
  //       console.log("Files After", Module.FS.readdir('.'))  

  //     };
  //     reader.readAsBinaryString(files[i]);
  //   }  
  // }
  
  // runPlink();
  }


  const handleStateChange = (event) => {
		setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
	};

  const handleClose = () => {
    handlePLOT();
		setOpen(false);

	};

  const handleButtonClick = () => {
    inputFile.current.click();
  };

  // Existing project
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Tools usage
  var docs = Object.values(documentation)

  const handleUsage = () => {
    {docs.map((key,index) => {
      if(docs[index].id === tool){
        setToolsUsage(docs[index].description)
      }
    })
    }

  }




  // setting up data public data sets
  const handleFileInputChange = () => {
    console.log("Numbr of files is ",inputFile.current.files.length)
    const file = inputFile.current.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const blob = new Blob([event.target.result], { type: file.type });
      setFile(blob);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

	const handleParse2 = () => {
    // setUrl('https://raw.githubusercontent.com/ataulhaleem/dataVis/main/data/Agri_traits.csv')
    console.log(url)
    fetch(url)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
      setFile(blob);
        }
      )
	};

  const handleParse = () => {
		if (!file) return setError("Enter a valid file");
		const reader = new FileReader();
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
      console.log(parsedData)
			setData(parsedData);
      	const columns = Object.keys(parsedData[0]);
				setColNames(columns);
			};
		reader.readAsText(file);
	};



  useEffect(() => {
    handleUsage()
    if(tool == "GWAS"){
      loadPlink();
    }
  }, [tool])


  useEffect(() =>{
    if(selected_plot_type == 'boxplot' || selected_plot_type == 'violin' || selected_plot_type == "raincloud" || selected_plot_type == "heatMap"){
      setOpen(true)
    }
    handlePLOT();
  },[selected_plot_type, selectedXvar, selectedYvar])

  var handlePLOT = () =>{
    var  plotSchema = {
      inputData : data,
      ploty_type : '',
      variablesToPlot : []
    } 
    if(selected_plot_type === 'boxplot'){
      plotSchema.ploty_type = 'boxplot'
      plotSchema.variablesToPlot = Object.keys(state);

    }else if(selected_plot_type === 'violin' ){
      plotSchema.ploty_type = 'violin'
      plotSchema.variablesToPlot = Object.keys(state);

    }else if(selected_plot_type === 'raincloud'){
      plotSchema.ploty_type = 'raincloud'
      plotSchema.variablesToPlot = Object.keys(state);

    }else if(selected_plot_type === 'heatMap'){
      plotSchema.ploty_type = 'heatMap'
      plotSchema.variablesToPlot = Object.keys(state);

    }else{
      plotSchema.ploty_type = selected_plot_type      
      plotSchema.variablesToPlot = [selectedXvar, selectedYvar]
    }

    setPlotSchema(plotSchema)


    var newState = {}
    setState(newState)

  }

  var publicDataSets = ['MODEM']


  return (
    <>
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
        <Typography variant = 'h5'> Usage
          <Typography>  
              {toolsUsage}
          </Typography>
        </Typography>   
      </Paper>


<Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Public Data" value="1" />
            <Tab label="Project Data" value="2" />
            <Tab label="Own Data" value="3" />
          </TabList>
        </Box>
        {/* First tab */}
        <TabPanel value="1">
        <Grid container columns={3} columnGap = {2}>
            <Autocomplete
                options={publicDataSets}
                
                sx={{ width: 500 , marginTop:3}}
                renderInput={(params) => <TextField {...params} label="Select Project Data" />}
                onInputChange = {(e) => handleParse2(e.target.innerHTML)}
              />
        </Grid>
        </TabPanel>
        {/* second tab */}
        <TabPanel value="2">
          <DataSelectionBar></DataSelectionBar>
        </TabPanel>
        <TabPanel value="3">
          <div>
            <Grid sx = {{ width: 500 , marginTop:2}} container columns={2} columnGap = {2}>  
              <Button sx = {{ width: 500 , marginTop:2}} onClick={handleButtonClick} variant="outlined" >
              <b>Select own data </b>
              <input type="file" multiple ref = {inputFile} id="file" style = { {display : 'none'}} onChange={handleFileInputChange}/>
              </Button>

            </Grid>
          </div>

          {/* third tab */}
        </TabPanel>
        <Button sx = {{ width: 500 , marginTop:2}} variant="outlined" onClick={handleParse} >
                    <b>Parse</b>
              </Button>
      </TabContext>
    </Box>

    



    </Box>

    <div style={{padding : 20}}>
     {tool != "VisPheno" ? console.log('hello') : 
          <div >  
          <Grid className="top-grid" container columns={3} columnGap = {2}>
            <Autocomplete
              options={['bar','line', 'histogram', 'boxplot', 'scatter', 'linReg','violin', 'raincloud']}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="choose plot type" />}
              onInputChange = {(e) => setSelectedPlotType(e.target.innerHTML)}
            />
            {open || <Autocomplete
              options={col_names}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="choose x-variable" />}
              onInputChange = {(e) => setSelectedXvar(e.target.innerHTML)}
            />
            }
          { selected_plot_type === 'histogram' | selected_plot_type === 'line' || 
            <Autocomplete
              options={col_names}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="choose y-variable" />}
              onInputChange = {(e) => setSelectedYvar(e.target.innerHTML)}
            />
          }
            <Button variant="outlined" onClick={() => {setIsToggled(true)}}>Plot</Button>
        </Grid>
    
    
    
        {!isToggled || 
    
          <PlotlyPlots plotSchema = {plotSchema} />
    
        }
    
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Box Plots</DialogTitle>
            <DialogContent >
            <FormGroup variant="standard" sx={{ width: 1000 , m: 1}}>
                {col_names.map((item) => <FormControlLabel 
                              control={<Checkbox onChange={handleStateChange} name={item} />}
                              label={item}
                            />)}
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
            
        </div>
     }

    {tool != "GWAS" ? console.log('hello') : 
      <div padding={2}> 
      <Typography variant='h5' > Genome wide Association Analysis (GWAS)</Typography> 

      <Grid sx = {{marginTop:2}} container columns={3} columnGap = {2}>
      <Button variant = 'contained' onClick={handleGWAS} color="primary">
                run Plink
              </Button>
      <Button variant = 'contained' onClick={handleGWAS} color="primary">
                Manhattan Plot
              </Button>

      </Grid>
      </div>




     }
    </div>

    <Head>
        <script src="/wasm/plink.js" /> {/* Add the script tag to the head */}
      </Head>



    </>
  );
}