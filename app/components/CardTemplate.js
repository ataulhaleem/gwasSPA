
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
// import Link from 'next/link';
import { Link } from '@mui/material';
import { UserContext } from './contexts';
import { Analysis } from './Analysis';
import { useContext } from 'react';


export default function CardTemplate(props) {
  var newContent = <Analysis/>;
  const {content, setContent} = useContext(UserContext);


  return (
    <Card sx={{ maxWidth: 340, maxHeight : 300, p:1, width: 'auto' }}>
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

      <UserContext.Provider value={{content, setContent}}>
      <Link
          component="button"
          // variant="button"
          variant="body2"
          onClick={() => {
            setContent(newContent);
          }}                                    
        >
          Proceed to analysis page
      </Link>
      </UserContext.Provider>
      

      </CardActions>
    </Card>
  );
}

