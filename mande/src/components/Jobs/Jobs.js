import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

// reactstrap components
import {
  FormGroup
} from "reactstrap";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

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
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

//Esto se debe actualizar con respecto a la base de datos
const labores = [{code: "Profesor de ingles", label:"Profesor inglés"},
                 {code: "Paseador de perros", label: "Paseador de perros"},
                 {code: "Profesor de matematicas", label: "Profesor de matemáticas"},
                 {code: "Plomero", label: "Plomero"},
                 {code: "Electricista", label: "Electricista"},];

const tipoCobro = ["Por hora", "Por labor"];

export default function CustomizedSelects() {
  const classes = useStyles();
  const element = React.useState('');
  const [values, setValues] = React.useState({
    textmask: '(1  )    -    ',
    numberformat: '1320',
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

    return(
      <>
      <FormGroup>
        <Autocomplete
          id="jobs-selection"
          style={{ width: 300 }}
          options={labores}
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
              label="Escoja una labor"
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
        <FormControl className={classes.marginN}>
          <TextField
          id="outlined-multiline-static"
          label="Descripción"
          multiline
          rows="4"
          placeholder="Por favor, escriba una corta descripción de su labor"
          variant="outlined"
        />
        </FormControl>
      </FormGroup>
      <FormGroup>
      <FormControl className={classes.marginN} style={{marginTop:-5}} >
        <InputLabel htmlFor="demo-customized-select-native">Tipo cobro</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={element}
          onChange={handleChange}
          input={<BootstrapInput  />}
        >
          <option value="Select" />
          {tipoCobro.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
        </NativeSelect>
      </FormControl>
    </FormGroup>
      <FormGroup>
        <TextField
        label="Cobro"
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    <FormControl className={classes.margin} style={{marginTop:-20}}>
      <Tooltip title="Añadir otra labor" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      </FormControl>
      </FormGroup>
      </>
    );
  }
