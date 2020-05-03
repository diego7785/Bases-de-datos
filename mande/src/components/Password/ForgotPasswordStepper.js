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

function getStepContent(stepIndex, props) {
  if(stepIndex === 0){
      return (
        <>
        <Form role="form">
          <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-email-83" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Ingrese su correo" type="email" onChange={e => props.onHandleChange('correo', e.target.value)}/>
            </InputGroup>
          </FormGroup>
      </Form>
      </>
    );
  } else if(stepIndex === 1){
      return(
        <>
        <Form role="form">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-key-25" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Ingrese el código que enviamos a su correo" type="text" onChange={e => props.onHandleChange('codigo', e.target.value)}/>
            </InputGroup>
          </FormGroup>
      </Form>
      </>
      );
    } else {
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
              <Input placeholder="Ingrese su nueva contraseña" type="password" onChange={e => props.onHandleChange('nuevaContrasenia', e.target.value)}/>
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
            <Input placeholder="Escriba su nueva contraseña de nuevo" type="password" onChange={e => props.onHandleChange('nuevaConfirmacionContrasenia', e.target.value)}/>
          </InputGroup>
        </FormGroup>
      </Form>
      </>
      );
    }
  }


export default function ForgotPasswordStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();

  const handleNext = () => {
    if(activeStep === 0){
      console.log('estoy enviando el código al correo');
    } else if(activeStep === 1){
      console.log('estoy verificando que el código sea correcto');
    } else {
      console.log('estoy cambiando la contraseña');
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                  <Button href="/auth/loginas/">Finalizar</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>{getStepContent(activeStep, props)}</Typography>
                  <div>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
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
