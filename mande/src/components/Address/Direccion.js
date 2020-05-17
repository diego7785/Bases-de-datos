import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';


// reactstrap components
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

  const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 50px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

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
        <FormControl className={classes.marginN}>
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
          onChange={e => props.functionSetState(e, 'complemento',1)}
        />
        </div>
        </FormControl>
      </FormGroup>
      </>
    );
}
