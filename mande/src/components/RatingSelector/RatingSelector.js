import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function Rater() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Typography id="range-slider" gutterBottom>
        Calificación mínima:
      </Typography>
      <Rating name="half-rating" defaultValue={2.5} precision={0.50} style = {{marginTop: 20}}/>
    </div>
  );
}