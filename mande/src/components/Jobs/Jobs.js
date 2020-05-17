import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
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
var labores =[];

const tipoCobro = [{type:"Por hora"}, {type:"Por labor"},];

export default function Jobs(props) {
  labores=props.jobs;
  const classes = useStyles();
  const [values, setValues] = React.useState({
    textmask: '(1  )    -    ',
    numberformat: '0',
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    props.onHandleChange('price', event.target.value)

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
        onChange={e => props.onHandleChange('job',parseInt(e.target.dataset.optionIndex)+1)}
        />
      </FormGroup>
      <FormGroup>
        <FormControl className={classes.marginN}>
          <div style={{ marginTop: 15 }}>
          <TextField
          id="outlined-multiline-static"
          label="Descripción"
          multiline
          rows="8"
          style = {{width: 360}}
          inputProps={{ maxLength: 200 }}
          placeholder="Por favor, escriba una corta descripción de su labor"
          variant="outlined"
          onChange={e => props.onHandleChange('description', e.target.value)}
        />
        </div>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <Autocomplete
          id="type-selection"
          style={{ width: 200 }}
          options={tipoCobro}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          getOptionLabel={(option) => option.type}
          renderOption={(option) => (
            <React.Fragment>
              {option.type}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo cobro"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
        )}
        onChange={e => props.onHandleChange('type', e.target.innerText)}
        />
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
      </FormGroup>
      </>
    );
  }
