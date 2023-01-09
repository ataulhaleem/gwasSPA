import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import "plotly.js";
import Plot from "react-plotly.js";




// Allowed extensions for input file
const allowedExtensions = ["csv"];

const VisPheno = () => {
	
	// This state will store the parsed data
	const [data, setData] = useState([]);
	
	// It state will contain the error when
	// correct file extension is not used
	const [error, setError] = useState("");
	
	// It will store the file uploaded by the user
	const [file, setFile] = useState("");
	const [selected_phenotype, setSelectedPhenotype] = useState('');
	const [selected_plot_type, setSelectedPlotType] = useState('');
	const [x, setX] = useState([]);
	const [y, setY] = useState([]);

	// This function will be called when
	// the file input changes
	const handleFileChange = (e) => {
		setError("");
		
		// Check if user has entered the file
		if (e.target.files.length) {
			const inputFile = e.target.files[0];
			
			// Check the file extensions, if it not
			// included in the allowed extensions
			// we show the error
			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}

			// If input type is correct set the state
			setFile(inputFile);
		}
	};
	const handleParse = () => {
		
		// If user clicks the parse button without
		// a file we show a error
		if (!file) return setError("Enter a valid file");

		// Initialize a reader which allows user
		// to read any file or blob.
		const reader = new FileReader();
		
		// Event listener on reader when the file
		// loads, we parse it and set the data.
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;

		var x_data = [];
		for(let i=0;i < 10;i++){
        	x_data.push(parsedData[i][selected_phenotype]);
			};
	    setX(x_data);
      	const columns = Object.keys(parsedData[0]);
				setData(columns);
			};
		reader.readAsText(file);

   
    
	};


	return (

		<div>
    	<Grid2 container spacing={1} columns={16} columnGap = {2}>

			<label htmlFor="csvInput" style={{ display: "block" }}>
				Enter CSV File
			</label>
			<input
				onChange={handleFileChange}
				id="csvInput"
				name="file"
				type="File"
			/>
			<div>
				<button onClick={handleParse}>Parse</button>
			</div>

		<Autocomplete
			options={['Bar','Line', 'box', 'raincloud']}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="choose plot type" />}
			onInputChange = {(e) => setSelectedPlotType(e.target.innerHTML)}
		/>
      	<Autocomplete
			options={data}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="choose phenotype" />}
			onInputChange = {(e) => setSelectedPhenotype(e.target.innerHTML)}
		/>


		</Grid2>
    
    <Plot
    data={[
      {
        x: x,
        y: x,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
      },
      {type: 'line', x: x, y: x},
    ]}
    layout={ {width: 800, height: 800, title: selected_phenotype} }
    ></Plot>
    
  </div>
	);
};

export default VisPheno;
