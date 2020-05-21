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
    maxWidth: 700,
    minWidth: 200,
    width: 700,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
//onClick={e => this.endJob(e, this.state)}
const WorkerRateDuty = (props) => {
  console.log("No quiero funcionar",props)
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title = {props.name}/>
      <CardContent>
      <Typography component="legend">Calificación promedio:</Typography>
              <Rating name="rating" defaultValue={props.rating} disabled/>
      </CardContent>
    </Card>
  );
}

export default WorkerRateDuty;
