import Slider from "react-slick";
import CardTemplate from "./CardTemplate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function  WelcomePage() {

  const settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: "5px"
  };



  return (

    <>
      <h1>This container is for WelcomePage</h1>

      <Slider {...settings}>
        <div>
        <CardTemplate
      myImage = './dataViz.jpg' 
      title = 'VisPheno' 
      description = 'A tool to create interactive plots with plotly.js, using data from a csv or the backend DB' />

        </div>

        <div>
      <CardTemplate
          myImage = './pca.png' 
        title = 'PCA' 
        description = 'Principle component analysis '
        />
     </div>
     <div>
        <CardTemplate
          myImage = './LDplot.png' 
        title = 'LD analysis' 
        description = 'Find correlations among genetic markers '
        />
    </div>

    <div>
        <CardTemplate
        myImage = './gwas.jpg' 
        title = 'GWAS' 
        description = 'Minecraft Dungeons is '
        />
          </div>

    </Slider>


      </>
  )
}


