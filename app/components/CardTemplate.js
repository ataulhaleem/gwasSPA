
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
// import Link from 'next/link';
import { Link } from '@mui/material';
import { toolContext, UserContext } from './contexts';
import { Analysis } from './Analysis';
import { useContext } from 'react';


export default function CardTemplate(props) {
  var newContent = <Analysis tool={"GWAS"}/>;
  const {content, setContent} = useContext(UserContext);
  // const {tool, setTool} = useContext(UserContext);

  return (
    <UserContext.Provider value={{content, setContent}}>

    <Card onClick={() => setContent(newContent)} sx={{ maxWidth: 340, maxHeight : 300, p:1, width: 'auto' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {props.myImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

      <Link
          component="button"
          // variant="button"
          variant="body2"
          // onClick={() => {
          //   setContent(newContent);
          // }}                                    
        >
          Proceed to analysis page
      </Link>
      

      </CardActions>
    </Card>
    </UserContext.Provider>

  );
}

