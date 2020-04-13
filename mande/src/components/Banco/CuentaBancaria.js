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

const bancos = [{code: "Bancolombia", label:"Bancolombia"},
                 {code: "Davivienda", label: "Davivienda"},];

const tipoCuenta = [{code: "Cuenta de ahorros", label: "Cuenta de ahorros"},
                    {code: "Cuenta corriente", label: "Cuenta corriente"},]

export default function CuentaBancaria(){
const classes = useStyles();
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
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
    )}
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
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
    )}
    />
    </FormGroup>
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-credit-card" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Número de cuenta" type="text" />
      </InputGroup>
    </FormGroup>
    </>
  );
}
