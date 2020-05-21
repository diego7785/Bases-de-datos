import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import { Col, Row } from "reactstrap";
import { Button } from '@material-ui/core';
import ServiceRequest from './ServiceRequest';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    minWidth: 300,
    width: 900,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ResultCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar alt={props.name} src={require("assets/img/userImages/worker/"+props.src+".png")}>

          </Avatar>
        }
        title={props.titulo}
        subheader={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.descripcion}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Row>
            <Col>
              <Typography component="legend">Calificación:</Typography>
              <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} value={props.rating} readOnly />
            </Col>
            <Col>
              <Typography>Precio {props.tipoCobro}: ${props.precio}</Typography>
            </Col>

          </Row>
          <Row>
            <Col>
              <Typography component="legend">A una distacia de: {props.distancia} km</Typography>
            </Col>
            <Col>
              {props.estado ?
                <ServiceRequest id = {props.id} phoneUser = {props.phoneUser} idLabor = {props.idLabor} desc = {props.desc} handleChange = {props.handleChange}/> :
                <Button variant="contained" color="primary" disabled>Trabajador Ocupado </Button>}

            </Col>
          </Row>
        </CardContent>
      </Collapse>
    </Card>

  );
}

export default ResultCard;
