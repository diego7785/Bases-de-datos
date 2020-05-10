import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DebitCard from './DebitCard';
import CreditCard from './CreditCard';

import {
  FormGroup,
} from "reactstrap";

const medioPago = [{ code: "Tarjeta débito", label: "Tarjeta débito" },
{ code: "Tarjeta de crédito", label: "Tarjeta de crédito" },]

class Pay extends React.Component {

  state = {
    formaPago: '',
    numeroTarjetaDebito: '',
    numeroCuentaDebito: '',
    bancoCredito: '',
    numeroTarjetaCredito: '',
    cvcCredito: '',
    mesVencimientoCredito: '',
    anioVencimientoCredito: '',
    cedulaPropietarioCredito: ''
  }

  selectPayment = (e) => {
    this.setState({ formaPago: e.target.innerText });
    console.log(this.state.formaPago);
  }

  selectDebit = (event, id) => {
    if (id === "bancoDebito") {
      this.setState({ [id]: event.target.innerText })
    }
    else {
      this.setState({ [id]: event.target.value })
    }
    /*
    console.log(this.state.bancoDebito);
    console.log(this.state.numeroTarjetaDebito);
    console.log(this.state.numeroCuentaDebito);*/
  }

  selectCredit = (event, id) => {
    if (id === "bancoCredito") {
      this.setState({ [id]: event.target.innerText })
    }
    else {
      this.setState({ [id]: event.target.value })
    }
    /*
    console.log(this.state.bancoCredito);
    console.log(this.state.numeroTarjetaCredito);
    console.log(this.state.cvcCredito);
    console.log(this.state.mesVencimientoCredito);
    console.log(this.state.anioVencimientoCredito);
    console.log(this.state.cedulaPropietarioCredito);*/
  }


  render() {
    return (
      <>
        <FormGroup style={{ marginTop: 20}}>
          <Autocomplete
            id="pay-selection"
            style={{ width: 440 }}
            options={medioPago}
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
                label="Escoge un medio de pago"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
            onChange={(event) => { this.selectPayment(event); }}
          />
          <div style={{ marginTop: 30 }}>
            {(() => {
              switch (this.state.formaPago) {
                case "Tarjeta débito":
                  return <DebitCard state={this.state} functionSetState={this.selectDebit} />;
                case "Tarjeta de crédito":
                  return <CreditCard state={this.state} functionSetStateI={this.selectCredit} />;
                default:
                  return null;
              }
            })()}
          </div>
        </FormGroup>
      </>
    );
  }
}
export default Pay;
