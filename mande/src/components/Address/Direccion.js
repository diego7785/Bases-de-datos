import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FieldDireccion from 'components/Address/DireccionField.js'

// reactstrap components
import {
  FormGroup,
} from "reactstrap";

  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    marginN: {
      marginTop: theme.spacing(-1.6),
    },
  }));

export default function Direccion(props) {

    const classes = useStyles();

    return (
      <>

      <FormGroup>
        <FormControl>
        <FieldDireccion onHandleChange={props.functionSetState}/>
        </FormControl>
        <FormControl className={classes.marginN} style={{marginTop: 10}}>
          <div style={{ marginTop: 15 }}>
          <TextField
          id="outlined-multiline-static"
          label="Complemento de la dirección"
          multiline
          style = {{width: 440}}
          inputProps={{ maxLength: 100}}
          rows="4"
          placeholder="Ejemplo: Torre 2 Apto 405, al lado de la farmacia"
          variant="outlined"
          onChange={e => props.functionSetState(e.target.value, 'complemento',1)}
        />
        </div>
        </FormControl>
      </FormGroup>
      </>
    );
}
