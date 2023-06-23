// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import styled from 'styled-components';
import { Typography } from '@mui/material';
import CardTemplate from './CardTemplate';
import './carousel.css'; // Import the custom CSS file



// const images = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];


// // const CarouselContainer = styled.div`
// //   width: 100%;
// //   margin: 0 auto;
// // `;

// // const CarouselItem = styled.div`
// //   display: flex !important;
// //   justify-content: space-between;
// //   margin: 0 -10px;

// //   > div {
// //     flex: 0 0 33.33% !important;
// //     margin: 0 10px;
// //   }

// //   @media (max-width: 768px) {
// //     > div {
// //       flex: 0 0 100% !important;
// //     }
// //   }
// // `;


// function WelcomePage() {
//   return (
//     <>

//     <h1> Welcome to the Genomics data Analysis workbench</h1>

//     <Carousel
//       // showThumbs={false}
//       // showStatus={false}
//       showArrows
//       infiniteLoop
//       emulateTouch
//       swipeable
//       // className="carousel-container"
//       renderIndicator={() => null} // Hide the default indicators
//       // itemClass="carousel-item"
//       autoPlay={true}
  
//       // height="50%"
//       // width="100%"
//       pauseOnHover={true}
//       items="3"
//     >
//       {images.map((image, index) => (
//         <div key={index}>
//           <img src={image.imgPath} alt={image.label} />
//           <p className="legend">{image.label}</p>
//         </div>
//       ))}
//     </Carousel>
//     </>
//   );
// }

// export default WelcomePage;



// // style = {
// //   {  "width": "100%", 
// //   "margin": "0 auto",}

// // }
// // .carousel-container {
// //   width: 100%;
// //   margin: 0 auto;

// // }

// // .carousel-item {
// //   display: flex !important;
// // }

// // .carousel-item > div {
// //   flex: 0 0 33.33% !important;
// //   margin: 0 10px;
// // }

// // @media (max-width: 768px) {
// //   .carousel-item > div {
// //     flex: 0 0 100% !important;
// //   }
// // }


import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import  Footer  from './Footer';

const components = [
  {
    label: 'VisPheno',
    component: <CardTemplate 
    myImage = './dataViz.jpg' 
    title = 'VisPheno' 
    description = 'Visualize your phenotypic data' />
  },
  {
    label: 'PCA analysis',
    component: <CardTemplate
      myImage = './pca.png' 
      title = 'PCA' 
      description = 'Principle component analysis'/>,
  },
  {
    label: 'LD analysis',
    component:  <CardTemplate
      myImage = './LDplot.png' 
      title = 'LD analysis' 
      description = 'Find correlations among genetic markers '
  />
  },
  {
    label: 'GWAS',
    component: <CardTemplate
        myImage = './gwas.jpg' 
        title = 'GWAS' 
        description = 'Minecraft Dungeons is'/>
  },
];


function WelcomePage() {
  const autoplayInterval = 3000;
  const slidesToShow = 3;

  const chunkComponents = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedComponents = chunkComponents(components, slidesToShow);

  return (

    <>
    
    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to Genomics Data Analysis Workbench</h1>
        <p style={styles.paragraph}>The work bench allows you anlysis and visualize genomics data from several open source porjects
        as well your local data, without having to install any software</p>
        <button style={styles.button}>Contact Us</button>
      </div>
    </div>

    <div style={styles.slider} >
      <Carousel 
        showArrows
        infiniteLoop
        emulateTouch
        swipeable
        renderIndicator={() => null}
        autoPlay={true}
        interval={autoplayInterval}
        transitionTime={500}
        swipeScrollTolerance={40}
        stopOnHover={false}
        selectedItem={2}
        showThumbs={false}
        showStatus={false}
        axis="horizontal"
        className="horizontal-carousel"
        width="80%"
      >
        {chunkedComponents.map((chunk, index) => (
          <div key={index} className="horizontal-slide">
            {chunk.map((component, subIndex) => (
              <div key={subIndex}>
                {component.component}
                {/* <p className="legend">{component.label}</p> */}
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>

    <div style={{padding:50}}>
      <Typography align='center' variant='h4'> Institute of Bio and Geosciences (IBG-4)</Typography>
      <Typography align='center' variant='h5'>Wilhelm-Johnen-Straße 52428 Jülich</Typography>
      <Typography align='center' color="blue" variant='h6'>< a href="https://www.fz-juelich.de/en/ibg/ibg-4/about-us">vist our home page</a></Typography>
    </div>

    <div >
      <Footer/>
    </div>



    </>

  );
}

const styles = {
  container: {
    // position: 'relative',
    height: '30vh',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundImage: 'url(./DNA.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.5,
  },
  content: {
    position: 'absolute',
    top: '100px',
    left: '100px',
  },
  heading: {
    fontSize: '50px',
    margin: 0,
  },
  paragraph: {
    fontSize: '24px',
    margin: '10px 0',
    padding : '2px 16px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  slider : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default WelcomePage;