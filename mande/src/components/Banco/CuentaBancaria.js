import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


import {
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

const tipoCuenta = [{code: "Cuenta de ahorros", label: "Cuenta de ahorros"},
                    {code: "Cuenta corriente", label: "Cuenta corriente"},]

export default function CuentaBancaria(props){
const classes = useStyles();
const [element1, setElement1] = React.useState('');
const [element2, setElement2] = React.useState('');
  return(
    <>
    <FormGroup>
    <Autocomplete
      id="jobs-selection"
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
          label="Escoja un Banco"
          variant="outlined"
        />
    )}
    value={element1.getOptionLabel}
    onChange={e => { props.functionSetState(e, 'bancoCuenta'); setElement1(e.target.value) }} 
    />
    </FormGroup>
    <FormGroup>
    <Autocomplete
      id="jobs-selection"
      style={{ width: 440 }}
      options={tipoCuenta}
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
          label="Escoja un tipo de cuenta bancaria"
          variant="outlined"
        />
    )}
    value={element2.getOptionLabel}
    onChange={e => { props.functionSetState(e, 'tipoCuenta'); setElement2(e.target.value) }} 
    />
    </FormGroup>
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-credit-card" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Número de cuenta" type="text" required maxLength="20" onChange={e => props.functionSetState(e, 'numeroCuenta')} />
      </InputGroup>
    </FormGroup>
    </>
  );
}
