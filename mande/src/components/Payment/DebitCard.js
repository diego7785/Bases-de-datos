import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ValidationSnackbarsRUDeb from 'components/Snackbars/ValidationSnackbarsRUDeb';

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

const bancos = [{ code: "Banco Agrario de Colombia", label: "Banco Agrario de Colombia" },
{ code: "Banco AV Villas", label: "Banco AV Villas" },
{ code: "Banco Caja Social", label: "Banco Caja Social" },
{ code: "Banco Cooperativo Coopcentral", label: "Banco Cooperativo Coopcentral" },
{ code: "Banco de Bogotá", label: "Banco de Bogotá" },
{ code: "Banco de Occidente", label: "Banco de Occidente" },
{ code: "Banco Falabella S.A.", label: "Banco Falabella S.A." },
{ code: "Banco GNB Sudameris", label: "Banco GNB Sudameris" },
{ code: "Banco Mundo Mujer", label: "Banco Mundo Mujer" },
{ code: "Banco Pichincha S.A.", label: "Banco Pichincha S.A." },
{ code: "Banco Popular", label: "Banco Popular" },
{ code: "Banco Procredit", label: "Banco Procredit" },
{ code: "Banco Santander", label: "Banco Santander" },
{ code: "Banco Serfinanza", label: "Banco Serfinanza" },
{ code: "Banco W S.A.", label: "Banco W S.A." },
{ code: "Bancamia S.A", label: "Bancamia S.A" },
{ code: "Bancóldex", label: "Bancóldex" },
{ code: "Bancolombia", label: "Bancolombia" },
{ code: "Bancoomeva", label: "Bancoomeva" },
{ code: "BBVA Colombia", label: "BBVA Colombia" },
{ code: "Citibank", label: "Citibank" },
{ code: "Davivienda", label: "Davivienda" },
{ code: "Itaú", label: "Itaú" },
{ code: "Scotiabank Colpatria", label: "Scotiabank Colpatria" },
];


export default function DebitCard(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <>
      <FormGroup>
        <Autocomplete
          id="bancoDebito"
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
            />
          )}
          onChange={e => { props.functionSetState(e, 'bancoDebito')}}
        />
      </FormGroup>

      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-credit-card" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Número de Tarjeta" type="text" id="numeroTarjetaDebito" onChange={e => props.functionSetState(e, 'cardNumber')} required maxLength="16" />
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-credit-card" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Número de cuenta" type="text" id="numeroCuentaDebito" required maxLength="20" onChange={e => props.functionSetState(e, 'numberAccount')} />
        </InputGroup>
      </FormGroup>

      <div className="text-center">
      <ValidationSnackbarsRUDeb  props={props.state} onHandleChange={props.onHandleChange} state1={props.state1}/>
       {/* <Button className="mt-4" color="primary" type="button" onClick={finalRegister}>
          Finalizar
          </Button>*/}
      </div>
    </>
  );
}
