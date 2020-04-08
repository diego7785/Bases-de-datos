import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

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


const tipoVia = ["Autopista", "Avenida", "Av. Calle", "Av. Carrera", "Barrio", "Calle", "Callejón", "Carrera",
  "Circular", "Diagonal", "Kilómetro", "Pasaje", "Paso", "Ramal", "Subramal", "Tramo", "Transversal", "Vereda"]

const complementoVia =["Este","Manzana","Noreste","Noroccidente","Noroeste","Norte","Occidente","Oeste","Oriente",
                        "Sur","Sureste","Suroccidente","Suroeste","Suroriente"]


export default function CustomizedSelects() {
  const classes = useStyles();
  const [element, setelement] = React.useState('');
  const handleChange = event => {
    setelement(event.target.value);
  };

  return (
    <>
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-planet" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="País" type="text" />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-planet" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Departamento" type="text" />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-planet" />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Municipio" type="text" />
      </InputGroup>
    </FormGroup>
      <FormControl className={classes.marginN} style={{marginTop:-5}} >
        <InputLabel htmlFor="demo-customized-select-native">Tipo vía</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={element}
          onChange={handleChange}
          input={<BootstrapInput  />}
        >
          <option value="Select" />
          {tipoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-planet" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Nombre o número de vía" type="text" />
          </InputGroup>
        </FormGroup>
      </FormControl>
      <FormControl className={classes.marginN}>
        <InputLabel htmlFor="demo-customized-select-native">Complemento vía principal</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={element}
          onChange={handleChange}
          input={<BootstrapInput  style={{marginTop:30}}/>}
          >
          <option value="Select" />
          {complementoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
          </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin} style={{marginLeft: 7, marginTop:15}}>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-planet" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Número de vía secundaria" type="text" />
          </InputGroup>
        </FormGroup>
      </FormControl>
      <br/>
      <FormControl className={classes.marginN}>
        <InputLabel htmlFor="demo-customized-select-native">Complemento vía secundaria</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={element}
          onChange={handleChange}
          input={<BootstrapInput style={{marginTop:30}}/>
          }
        >
          <option value="Select" />
          {tipoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin} style={{marginLeft: 7, marginTop:15}}>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-planet" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Número de casa" type="text" />
          </InputGroup>
        </FormGroup>
      </FormControl>
      <FormControl className={classes.marginN}>
        <InputLabel htmlFor="demo-customized-select-native">Complemento</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={element}
          onChange={handleChange}
          input={<BootstrapInput style={{marginTop:20}}/>
          }
        >
          <option value="Select" />
          {tipoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin} style={{marginLeft: 7, marginTop:5}}>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-planet" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Barrio" type="text" />
          </InputGroup>
        </FormGroup>
      </FormControl>
    </>
  );

}
