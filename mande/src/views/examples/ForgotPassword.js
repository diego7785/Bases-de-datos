import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Ingresa tu correo', 'Ingresa el código enviado a tu correo', 'Ingresa tu nueva contraseña'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <Form role="form">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-email-83" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Ingrese su correo" type="text"/>
            </InputGroup>
          </FormGroup>
      </Form>
    );
    case 1:
      return(
        <Form role="form">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-key-25" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Ingrese el código que enviamos a su correo" type="text"/>
            </InputGroup>
          </FormGroup>
      </Form>
      );
    case 2:
      return(
        <>
        <Form role="form">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-lock-circle-open" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Ingrese su nueva contraseña" type="text"/>
            </InputGroup>
          </FormGroup>
      </Form>
      <Form role="form">
        <FormGroup className="mb-3">
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-lock-circle-open" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Escriba su nueva contraseña de nuevo" type="text"/>
          </InputGroup>
        </FormGroup>
    </Form>
      </>
      );
    default:
      return 'Unknown stepIndex';
  }
}


export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const state = {
    correo: true,
    codigo: true,
    nuevaContraseña: true,
  }
  const steps = getSteps();

  const handleNext = () => {
    if(activeStep === 0){
      console.log('estoy enviando el código al correo');
    } else if(activeStep === 1){
      console.log('estoy verificando que el código sea correcto');
    } else {
      console.log('estoy cambiando la contraseña');
      alert('Contraeña cambiada con éxito o tal vez no')
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = (props) => {
    props.history.push({ pathname: "/auth/loginas/" });
  };

  return (
    <>
    <Col lg="7" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Contraseña actualizada</Typography>
            <Button onClick={handleReset(props)}>Finish</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  </CardBody>
</Card>
</Col>
    </>
  );
}
/*
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
} from "reactstrap";

class ForgotPassword extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return(
      <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Olvidé mi contraseña </small>
            </div>
            <Form role="form">
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-key-25" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="I" type="text"/>
                </InputGroup>
                </FormGroup>
            </Form>
            </CardBody>
            </Card>
            </Col>
      </>
    )
  }
}

export default ForgotPassword;
*/
