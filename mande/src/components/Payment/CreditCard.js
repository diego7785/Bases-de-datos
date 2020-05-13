import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


import {
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginN: {
    marginTop: theme.spacing(-1.6),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const bancos = [ {code:"Banco Agrario de Colombia", label:"Banco Agrario de Colombia"},
                 {code:"Banco AV Villas", label:"Banco AV Villas"},
                 {code:"Banco Caja Social", label:"Banco Caja Social"},
                 {code:"Banco Cooperativo Coopcentral", label:"Banco Cooperativo Coopcentral"},
                 {code:"Banco de Bogotá", label:"Banco de Bogotá"},
                 {code:"Banco de Occidente", label:"Banco de Occidente"},
                 {code:"Banco Falabella S.A.", label:"Banco Falabella S.A."},
                 {code:"Banco GNB Sudameris", label:"Banco GNB Sudameris"},
                 {code:"Banco Mundo Mujer", label:"Banco Mundo Mujer"},
                 {code:"Banco Pichincha S.A.", label:"Banco Pichincha S.A."},
                 {code:"Banco Popular", label:"Banco Popular"},
                 {code:"Banco Procredit", label:"Banco Procredit"},
                 {code:"Banco Santander", label:"Banco Santander"},
                 {code:"Banco Serfinanza", label:"Banco Serfinanza"},
                 {code:"Banco W S.A.", label:"Banco W S.A."},
                 {code:"Bancamia S.A", label:"Bancamia S.A"},
                 {code:"Bancóldex", label:"Bancóldex"},
                 {code:"Bancolombia", label:"Bancolombia"},
                 {code:"Bancoomeva", label:"Bancoomeva"},
                 {code:"BBVA Colombia", label:"BBVA Colombia"},
                 {code:"Citibank", label:"Citibank"},
                 {code:"Davivienda", label: "Davivienda"},
                 {code:"Itaú", label: "Itaú"},
                 {code:"Scotiabank Colpatria", label:"Scotiabank Colpatria"},
                ];

export default function CreditCard(props){
const classes = useStyles();

const finalRegister = async() => {
  var exito = 0;
  const idCard = props.state1.location.state.idCard;
  const phone = props.state1.location.state.celular;
  const email = props.state1.location.state.email;
  const name = props.state1.location.state.name;
  const lastname = props.state1.location.state.lastname;
  const password = props.state1.location.state.password;

  var res = await axios.post(`http://localhost:5000/RegisterUser2/${idCard}/${phone}/${email}/${name}/${lastname}/${password}`)
  console.log(res)
  if(res.statusText === "OK"){
    exito=exito+1;
  }

  const endDate = props.state.month+'-'+props.state.year;
  const cvc = props.state.cvc;
  const cardNumber=props.state.cardNumber;
  const bank=props.state.bank;
  res = await axios.post(`http://localhost:5000/RegisterCreditCard/${cardNumber}/${phone}/${bank}/${endDate}/${cvc}`)
  console.log(res)
  if(res.statusText === "OK"){
    exito=exito+1;
  }

  const lat = props.state1.location.state.latitude;
  const lng = props.state1.location.state.length;
  const address = props.state1.location.state.completeAddress;
  const city = props.state1.location.state.city;
  const depto = props.state1.location.state.depto;

  res = await axios.post(`http://localhost:5000/RegisterUser2_3/${phone}/${lat}/${lng}/${address}/${city}/${depto}`)
  console.log(res)
  if(res.statusText === "OK"){
    exito=exito+1;
  }

  if(exito === 3){
    alert('Registro exitoso');
    props.state1.history.push({pathname: "/auth/"})
  }else{
    const credit=1;
    res = await axios.post(`http://localhost:5000/RegisterUser2_5/delete/${phone}/${cardNumber}/${credit}`)
    alert('No se ha podido realizar el registro, por favor intente de nuevo');
  }
}

  return(
    <>
    <FormGroup>
    <Autocomplete
      id="bancoCredito"
      style={{ width: 440 }}
      options={bancos}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          {option.label}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Escoge un Banco"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
    )}
    onChange={e => {props.functionSetStateI(e, 'bancoCredito')}}
    />
    </FormGroup>

    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-credit-card" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Número de Tarjeta" type="text" id="numeroTarjetaCredito" required maxLength="16" onChange={e => props.functionSetStateI(e, 'cardNumber')} />
      </InputGroup>
    </FormGroup>

    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-credit-card" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="CVC" type="text" id="cvcCredito" required maxLength="4" onChange={e => props.functionSetStateI(e, 'cvc')}/>
      </InputGroup>
    </FormGroup>

    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-credit-card" />
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" className= "cc-exp"
        pattern="\d*" x-autocompletetype="cc-exp"
        placeholder="Mes de expiración             //" id="mesVencimientoCredito" required maxLength="2" onChange={e => props.functionSetStateI(e, 'month')}/>
        <Input type="text" className= "a-exp"
        pattern="\d*" x-autocompletetype="a-exp"
        placeholder="    Año de expiración"  id= "anioVencimientoCredito" required maxLength="2" onChange={e => props.functionSetStateI(e, 'year')}/>
      </InputGroup>
    </FormGroup>

    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-key-25" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Cédula del propietario" type="text" id="cedulaPropietarioCredito" required maxLength="10" onChange={e => props.functionSetStateI(e, 'idCardCredit')}/>
      </InputGroup>
    </FormGroup>


    <div className="text-center">
        <Button className="mt-4" color="primary" type="button" onClick={finalRegister}>
            Finalizar
        </Button>
    </div>
    </>
  );
}
