import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';
import { CardBody, Col, Row } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 300,
    width: 400,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  avatar: {
    backgroundColor: red[500],
  },
  
}));

const WorkerRating = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        title={props.titulo}
        subheader={props.name}
      />
      <CardContent>
      <Typography component="legend">Calificación:</Typography>
              <Rating name="rating" defaultValue={3} value={props.rating}/>
      </CardContent>
    </Card>
  );
}

export default WorkerRating;