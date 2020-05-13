import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    minWidth: 200,

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
console.log(props.src)
  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar alt = {props.name} src = {props.src}></Avatar>
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
