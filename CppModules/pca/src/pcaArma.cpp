// #define ARMA_DONT_USE_WRAPPER
#include <armadillo>
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
using namespace std;
using namespace arma;

mat performPCA(const std::string &filename, const std::string &delimeter = ",");
mat getPCs(mat mat_obj);

int main(){
    const string file = "testData.csv";
    mat A = performPCA(file);
    mat coeff;
    mat score;
    vec latent;
    vec tsquared;
    // princomp(coeff, score, latent, tsquared, A);
    // cout << "coeff:\n" << coeff << endl;
    // cout << "score:\n" << score << endl;
    // cout << "latent:\n" << latent << endl;
    // cout << "tsquared:\n" << tsquared << endl;

    // mat pcs = getPCs(A);
    cout << A<< endl;
    return 0;
}

// mat performPCA_JS(string filename){
    
    // ifstream       file( filename.c_str() );
    // vector< std::vector<std::string> >   matrix;
    // std::vector<std::string>   row;
    // std::string                line;
    // std::string                cell;
    // while( file )
    // {
    //     std::getline(file,line);
    //     std::stringstream lineStream(line);
    //     row.clear();

    //     while( std::getline( lineStream, cell, ',' ) )
    //         row.push_back( cell );

    //     if( !row.empty() )
    //         matrix.push_back( row );
    // }

    // int col_no = matrix[0].size();
    // int rows_no = matrix.size();


    // ifstream       infile( filename.c_str() );
    // mat input_mat(rows_no,col_no);
    // for(int i=0; i<rows_no;i++){
    //     for(int j = 0; j < col_no; j++){
    //         infile >> input_mat(i,j);
    //     }
    // }
    // infile.close();
    
    // ifstream f(filename.c_str());

    // string line, val;                  /* string for line & value */
    // while (getline (f, line)) {        /* read each line */
    //     vector<int> v;                 /* row vector v */
    //     stringstream s (line);         /* stringstream line */
    //     while (getline (s, val, ','))       /* get each value (',' delimited) */
    //         cout << stoi (val);  /* add to row vector */
    // };

    // // ifstream inputFile(filename.c_str());



    // ifstream in(filename);
    // string line, field;
    // vector< vector<int> > array;  // the 2D array
    // vector<int> v;                // array of values for one line only
    // int rows =0;
    // while ( getline(in,line) )    // get next line in file
    // {
    //     v.clear();
    //     stringstream ss(line);
    //     rows += 1;
    //     while (getline(ss,field,','))  // break line into comma delimitted fields
    //     {
    //         v.push_back(stoi(field));  // add each field to the 1D array
    //     }
    //     array.push_back(v);  // add the 1D array to the 2D array
    // }
    
    // int cols = sizeof(array[0]) / sizeof(array[0][0]); 

    // cout << "rows: " << rows << " " << "cols: " << cols << endl;
    // mat input_mat(rows, cols, fill::zeros);

    // for(int i=0; i<rows;i++){
    //     for(int j=0; j<cols; j++){
    //         mat(i,j) = array[i][j];
    //         // cout << array[i][j] << " " ;

    //     }
    //     // cout << endl;
    // }


//     cout << input_mat << endl;
//     return input_mat;
// }

mat getPCs(mat mat_obj){
    mat coeff;
    mat score;
    vec latent;
    vec tsquared;
    princomp(coeff, score, latent, tsquared, mat_obj);
    return score;
}

mat performPCA(const std::string &filename, const std::string &delimeter = ",")
{
    std::ifstream csv(filename);
    std::vector<std::vector<double>> datas;

    for(std::string line; std::getline(csv, line); ) {

        std::vector<double> data;

        // split string by delimeter
        auto start = 0U;
        auto end = line.find(delimeter);
        while (end != std::string::npos) {
            data.push_back(std::stod(line.substr(start, end - start)));
            start = end + delimeter.length();
            end = line.find(delimeter, start);
        }
        data.push_back(std::stod(line.substr(start, end)));
        datas.push_back(data);
    }

    arma::mat data_mat = arma::zeros<arma::mat>(datas.size(), datas[0].size());

    for (int i=0; i<datas.size(); i++) {
        arma::mat r(datas[i]);
        data_mat.row(i) = r.t();
    }

    // return data_mat;

    mat pcs = getPCs(data_mat);
    return  pcs;

}
