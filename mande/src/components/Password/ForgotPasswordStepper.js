import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

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
const validations = require('../../validations/Verifications.js');

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function setButton (stepIndex, listen, listenI, listenII)
{
    if (stepIndex ===0)
    {
      return (
        <>
           <Button variant="contained" color="primary" onClick={listen}>
             Siguiente
          </Button>
        </>
      )
    }
    else if(stepIndex ===1)
    {
      return (
        <>
           <Button variant="contained" color="primary" onClick={listenI}>
             Siguiente
          </Button>
        </>
      )
    }
    else if(stepIndex ===2)
    {
      return (
        <>
           <Button variant="contained" color="primary" onClick={listenII}>
             Cambiar contraseña
          </Button>
        </>
      )
    }
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
  } else if(stepIndex === 1 ){
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

var messages = ["Debe llenar el campo con el email",
                "Email no relacionado con ningún usuario o trabajador",
                "Debe colocar el código enviado a su correo",
                "Código de verificación incorrecto",
                "Debe llenar los campos requeridos",
                "Las contraseñas deben coincidir",
                "La contraseña debe tener 5 o más carácteres"
];

var validatedStep =[false,false,false];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
  verifications[i] = true;
}

export default function ForgotPasswordStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();

  const handleNext = async() => 
  {
      for (var i = 0; i < verifications.length; i++) 
      {
        verifications[i] = true;
      }
      validatedStep =[false,false,false];
      var cont = 0;
      var emptyFields=true;

      if (validations.emptyField(props.state.correo))
      {
        verifications[0]=false;
        cont++;
        emptyFields = false;
      }
      if(emptyFields)
      {
        const validateEmailW = await axios.get(`http://localhost:5000/validateEmailExistence/${props.state.correo}/`)
        const validateEmailU = await axios.get(`http://localhost:5000/validateEmailUserExistence/${props.state.correo}/`)
        if(emptyFields && (validateEmailW.data[0].validateemailworker === false) && (validateEmailU.data[0].validateemailuser ===false))
        {
            verifications[1] = false;
            cont++;
        }
        if(validateEmailW.data[0].validateemailworker || validateEmailU.data[0].validateemailuser)
        {
          validatedStep[1] =true;  
          if(validateEmailW.data[0].validateemailworker)
          {
            var resi = await axios.get(`http://localhost:5000/SendMailWorker/${props.state.correo}/`)  
            props.onHandleChange('worker', true);
          }
          if(validateEmailU.data[0].validateemailuser)
          {
            var resi = await axios.get(`http://localhost:5000/SendMailUser/${props.state.correo}/`) 
            props.onHandleChange('user', true);
          }
        }
      }

      if (cont >0)
      {
          props.onHandleChange('open', true);
      }

      setActiveStep((prevActiveStep) => 
      { if(validatedStep[1]){
        return prevActiveStep+1;
      }
      if(validatedStep[2]){
        return prevActiveStep+1;
      }
      return prevActiveStep;
      });
  };

  const handleNextI = async() => 
  {

      for (var i = 0; i < verifications.length; i++) 
      {
        verifications[i] = true;
      }
      validatedStep =[false,false,false];
      var cont = 0;
      var emptyFields=true;
      if (validations.emptyField(props.state.codigo))
      {
        verifications[2]=false;
        cont++;
        emptyFields = false;
      }

      if(props.state.user && emptyFields)
      {
        var res = await axios.get(`http://localhost:5000/CheckCodeUser/${props.state.codigo}/`) 
        console.log(res.data.respuesta);
        if(true !== res.data.respuesta)
        {
          verifications[3]=false;
          cont++;
        }
  
        if(true === res.data.respuesta)
        {
          validatedStep[2] =true;
        }
      }
      if(props.state.worker && emptyFields)
      {
        var res = await axios.get(`http://localhost:5000/CheckCodeWorker/${props.state.codigo}/`) 
        console.log(res.data.respuesta);
        if(true !== res.data.respuesta)
        {
          verifications[3]=false;
          cont++;
        }
  
        if(true === res.data.respuesta)
        {
          validatedStep[2] =true;
        }
      }

      if (cont >0)
      {
          props.onHandleChange('open', true);
      }

      setActiveStep((prevActiveStep) => 
      { if(validatedStep[1]){
        return prevActiveStep+1;
      }
      if(validatedStep[2]){
        return prevActiveStep+1;
      }
      return prevActiveStep;
      });
  };

  const handleNextII = async() => 
  {
      for (var i = 0; i < verifications.length; i++) 
      {
        verifications[i] = true;
      }
      validatedStep =[false,false,false];
      var cont = 0;
      var emptyFields=true;
      var sig=true;
      if (validations.emptyField(props.state.nuevaContrasenia) || validations.emptyField(props.state.nuevaConfirmacionContrasenia))
      {
        verifications[4]=false;
        cont++;
        emptyFields = false;
        sig=false;
      }
      if(emptyFields && props.state.nuevaContrasenia !== props.state.nuevaConfirmacionContrasenia)
      {
        verifications[5]=false;
        cont++;
        sig=false;
      }
      if(emptyFields && (( false === validations.validSizeMay(props.state.nuevaContrasenia,5)) || (false === validations.validSizeMay(props.state.nuevaConfirmacionContrasenia,5))))
      {
        verifications[6]=false;
        cont++;
        sig=false
      }
      if (cont >0)
      {
          props.onHandleChange('open', true);
      }
      if(sig)
      {
        if(props.state.worker)
        {
          var res = await axios.post(`http://localhost:5000/RecoverAccountWorker/${props.state.correo}/${props.state.nuevaContrasenia}`)           
          if(res.status === 200)
          {
            alert("Contraseña actualizada");
          }
          else
          {
            alert("Fallo al actualizar la contraseña");
          }
        }
        if(props.state.user)
        {
          var resI = await axios.post(`http://localhost:5000/RecoverAccountUser/${props.state.correo}/${props.state.nuevaContrasenia}`)
          if(resI.status === 200)
          {
            alert("Contraseña actualizada");
          }
          else
          {
            alert("Fallo al actualizar la contraseña");
          }
        }        
      }

      setActiveStep((prevActiveStep) => 
      { if(validatedStep[1]){
        return prevActiveStep+1;
      }
      if(validatedStep[2]){
        return prevActiveStep+1;
      }
      return prevActiveStep;
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    props.onHandleChange('open', false)
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
                  <Button href="/auth/loginas/" variant="contained" color="primary">Finalizar</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>{getStepContent(activeStep, props)}</Typography>
                  <div>
                  {setButton (activeStep,handleNext,handleNextI,handleNextII)}
                    <Snackbar open={props.state.open} autoHideDuration={9000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="error">
                    {verifications.map((value, index) => {
                        if (verifications[index] === false) {
                            return <li style={{ listStyleType: 'none', textAlign: "left" }} key={index}> {messages[index]}</li>
                        }
                        return <></>;
                    }
                    )}
                      </Alert>
                  </Snackbar>
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
