import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import Button from '@mui/material/Button';
import { max } from "d3";
import { scale } from "pca-js";



// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Pca = () => {
  var PCA = require('pca-js');
  // PCA(global);


	
	// This state will store the parsed data
	// const [col_names, setColNames] = useState([]);
	const [data, setData] = useState([]);

	// It state will contain the error when
	// correct file extension is not used
	const [error, setError] = useState("");
	
	// It will store the file uploaded by the user
	const [file, setFile] = useState("");
	// const [selectedXvar, setSelectedXvar] = useState([]);
	// const [selectedYvar, setSelectedYvar] = useState();
	const [selected_plot_type, setSelectedPlotType] = useState('');
	const [plot_input_data, setPlotIinputData] = useState([]);
	const [plot_layout, setPlotLayout] = useState({});
	

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
			// console.log(parsedData);
			setData(parsedData);

      const columns = Object.keys(parsedData[0]);
				// setColNames(columns);
			};
		reader.readAsText(file);


   
	};
	


	const handlePLOT = () => {
    
      var data2 = data.map(function(obj) {
        return Object.keys(obj).sort().map(function(key) { 
          return obj[key];
        });
      });
      // data2 = PCA.scale(data2,1);
      const max = Math.max(...[].concat(...data2));
      const min = Math.min(...[].concat(...data2));
      var getScaledVal = (input_arr) => {
        var scaledArr = [];
        for (var i = 0; i < input_arr.length; i++) {
          var scaledVal = (input_arr[i] - min) / (max - min);
          scaledArr.push(scaledVal);
        };
        return scaledArr;
      }
      var scaled_data = data2.map((array) => {
        return getScaledVal(array);
      });

      // console.log(scaled_data);

      var vectors = PCA.getEigenVectors(scaled_data);
      // var topTwo = PCA.computePercentageExplained(vectors,vectors[0],vectors[1])
      var sorted_vectors = vectors;
      var PC1 = sorted_vectors[0].vector;
      var PC2 = sorted_vectors[1].vector;
      // console.log(vectors);
      var input_data=[{type : 'scatter', mode: 'markers',x:PC1, y:PC2} ];
			setPlotIinputData(input_data);
			var new_layout = {
				width: 800, 
				height: 600,
				yaxis: {
					title: 'PC2',
					zeroline: false},
				boxmode: 'group',
				xaxis: {
					title: 'PC1'},
				title: 'PCA plot'}
			setPlotLayout(new_layout); 
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

			<Button variant="outlined" onClick={handlePLOT}>Plot</Button>

		</Grid2>
    
		<Plot 
			data={plot_input_data}
			layout={ plot_layout }
		></Plot>
    
  </div>
	);
};

export default Pca;
