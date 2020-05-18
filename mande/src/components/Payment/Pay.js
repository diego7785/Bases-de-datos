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
  constructor(props){
    super(props)
    console.log(props)
  }
  selectPayment = (e) => {
    this.props.onHandleChange('type', e.target.innerText);
    this.props.onHandleChange('open', false);
  }

  selectDebit = (event, id) => {
    if (id === "bancoDebito") {
    this.props.onHandleChange('bank', event.target.innerText )
    }
    else {
      this.props.onHandleChange(id, event.target.value )
    }
  }

  selectCredit = (event, id) => {
    if (id === "bancoCredito") {
      this.props.onHandleChange('bank', event.target.innerText )
    }
    else {
      this.props.onHandleChange(id, event.target.value )
    }
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
              switch (this.props.state.type) {
                case "Tarjeta débito":
                  return <DebitCard state={this.props.state} state1={this.props.state1} functionSetState={this.selectDebit} onHandleChange={this.props.onHandleChange} />;
                case "Tarjeta de crédito":
                  return <CreditCard state={this.props.state} state1={this.props.state1} functionSetStateI={this.selectCredit} onHandleChange={this.props.onHandleChange} />;
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
