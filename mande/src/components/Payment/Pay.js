import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DebitCard from './DebitCard';
import CreditCard from './CreditCard';

import {
  FormGroup,
} from "reactstrap";

const medioPago = [{ code: "Tarjeta débito", label: "Tarjeta débito" },
{ code: "Tarjeta de crédito", label: "Tarjeta de crédito" },]

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

class Pay extends React.Component {

  state = {
    selection: ''
  }

  selectPayment = (e) => {
    this.setState({ selection: e.target.innerText });
    console.log(this.state.selection);
  }

  render() {
    return (
      <>
        <FormGroup>
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
          <div style = {{marginTop:30}}>
            {(() => {
              switch (this.state.selection) {
                case "Tarjeta débito":
                  return <DebitCard />;
                case "Tarjeta de crédito":
                  return <CreditCard />;
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

