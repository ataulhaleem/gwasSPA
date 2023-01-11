#include <iostream>
#include <fstream>
#include <algorithm>
#include <vector>
#include <Eigen/Dense>
#include "tinyply.h"
#include "pca.h"
#include <regex>
using namespace Eigen;

using namespace std;




template<typename M>
M load_csv(const string & path);
void saveData(string fileName, MatrixXf  matrix);
MatrixXf openData(string fileToOpen);

int main(int argc, char* argv[])
{

	MatrixXf pca_data_matrix;
	pca_data_matrix = openData("Test.csv");

	// Eigen::Matrix<float, 4, 2> pca_center_matrix;
	MatrixXf pca_center_matrix;
	pca_t<float> pca;
	pca.set_input(pca_data_matrix);
	pca.compute();

	cout	<< "Input Matrix:		\n" << pca.get_input_matrix() << endl;
	cout	<< "Centered Matrix:	\n" << pca.get_centered_matrix() <<endl;
	cout	<< "Covariance Matrix:	\n" << pca.get_covariance_matrix() <<endl;
	cout	<< "Projection Matrix:	\n" << pca.get_projection_matrix() <<endl;
	cout	<< "Mean Matrix:		\n" << pca.get_mean() <<endl;
	cout	<< "Eigen Values:		\n" << pca.get_eigen_values() <<endl;
	cout	<< "Eigen Vectors:		\n" << pca.get_eigen_vectors() <<endl;

	
	const auto& reprojection = pca.reprojection();
	auto error = (pca_data_matrix - reprojection).norm();

	cout << "Reprojected Matrix:	\n" << reprojection <<endl;
	// cout << fixed;
	cout << "Error:				\n" << error <<endl;
	
	return EXIT_SUCCESS;
}





void saveData(string fileName, MatrixXf  matrix)
{
	//https://eigen.tuxfamily.org/dox/structEigen_1_1IOFormat.html
	const static IOFormat CSVFormat(FullPrecision, DontAlignCols, ", ", "\n");

	ofstream file(fileName);
	if (file.is_open())
	{
		file << matrix.format(CSVFormat);
		file.close();
	}
}



MatrixXf openData(string fileToOpen)
{

	// the inspiration for creating this function was drawn from here (I did NOT copy and paste the code)
	// https://stackoverflow.com/questions/34247057/how-to-read-csv-file-and-assign-to-eigen-matrix
	
	// the input is the file: "fileToOpen.csv":
	// a,b,c
	// d,e,f
	// This function converts input file data into the Eigen matrix format



	// the matrix entries are stored in this variable row-wise. For example if we have the matrix:
	// M=[a b c 
	//	  d e f]
	// the entries are stored as matrixEntries=[a,b,c,d,e,f], that is the variable "matrixEntries" is a row vector
	// later on, this vector is mapped into the Eigen matrix format
	vector<float> matrixEntries;

	// in this object we store the data from the matrix
	ifstream matrixDataFile(fileToOpen);

	// this variable is used to store the row of the matrix that contains commas 
	string matrixRowString;

	// this variable is used to store the matrix entry;
	string matrixEntry;

	// this variable is used to track the number of rows
	int matrixRowNumber = 0;


	while (getline(matrixDataFile, matrixRowString)) // here we read a row by row of matrixDataFile and store every line into the string variable matrixRowString
	{
		stringstream matrixRowStringStream(matrixRowString); //convert matrixRowString that is a string to a stream variable.

		while (getline(matrixRowStringStream, matrixEntry, ',')) // here we read pieces of the stream matrixRowStringStream until every comma, and store the resulting character into the matrixEntry
		{
			matrixEntries.push_back(stod(matrixEntry));   //here we convert the string to double and fill in the row vector storing all the matrix entries
		}
		matrixRowNumber++; //update the column numbers
	}

	// here we convet the vector variable into the matrix and return the resulting object, 
	// note that matrixEntries.data() is the pointer to the first memory location at which the entries of the vector matrixEntries are stored;
	return Map<Matrix<float, Dynamic, Dynamic, RowMajor>>(matrixEntries.data(), matrixRowNumber, matrixEntries.size() / matrixRowNumber);

}