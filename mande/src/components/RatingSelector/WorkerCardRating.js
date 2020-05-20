import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';

import {
  Button,
} from 'reactstrap'

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
//onClick={e => this.endJob(e, this.state)}
const WorkerRating = (props) => {
  const classes = useStyles();
  const [rate, setRate] = React.useState(1);

  const calificar = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/CalificarLabor/${props.id}/${rate}`);
    alert('Labor de '+props.name+' Calificada correctamente, por favor vuelve a iniciar sesion');
    props.logout("/auth");
  }

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar alt = {props.name} src = {require("assets/img/userImages/worker/profilepic-" + props.cedula + ".png")}></Avatar>
        }
        title={props.titulo}
        subheader={props.name}
      />
      <CardContent>
      <Typography component="legend">Calificación:</Typography>
              <Rating name="rating" defaultValue={rate} onChange={async (event) => {
                await setRate(event.target.value);
                console.log(rate)}
              }/>
            <Button className="my-4" color="primary" type="button" onClick={e => calificar(e)}>
                  Calificar
            </Button>
      </CardContent>
    </Card>
  );
}

export default WorkerRating;
