import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

  const tipoVia = ["Autopista", "Avenida", "Av. Calle", "Av. Carrera", "Calle", "Callejón", "Carrera",
    "Circular", "Diagonal", "Kilómetro", "Pasaje", "Paso", "Ramal", "Subramal", "Tramo", "Transversal", "Vereda"]

  const complementoVia =["Este","Manzana","Noreste","Noroccidente","Noroeste","Norte","Occidente","Oeste","Oriente",
                          "Sur","Sureste","Suroccidente","Suroeste","Suroriente"];

export default function Direccion(props) {

    const classes = useStyles();
    const [element1, setElement1] = React.useState('');
    const [element2, setElement2] = React.useState('');
    const [element3, setElement3] = React.useState('');
    const [element4, setElement4] = React.useState('');

    return (
      <>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Departamento" type="text" id="departamento" onChange={e => props.functionSetState(e, 'departamento',1)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Municipio" type="text" id="municipio" onChange={e => props.functionSetState(e, 'municipio',1)}/>
        </InputGroup>
      </FormGroup>
        <FormControl className={classes.marginN} style={{marginTop: -5}} >
          <InputLabel htmlFor="tipoVia">Tipo vía</InputLabel>
          <NativeSelect
            id="tipoVia"
            value={element1}
            onChange={e => {props.functionSetState(e, 'tipoVia',1); setElement1(e.target.value); props.changeViaState() }}
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
              <Input placeholder="Nombre o número de vía" type="text" id="nombreVia" onChange={e => props.functionSetState(e, 'nombreVia',1)}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="viaSec">Vía secundaria</InputLabel>
          <NativeSelect
            id="viaSec"
            value={element2}
            onChange={e => {props.functionSetState(e, 'viaSec',1); setElement2(e.target.value);}}
            input={<BootstrapInput  style={{marginTop:30}}/>}
            >
            <option value="Select" />
            {tipoVia.map((tipo,i) => {
              var dev;
              if(props.state.via){
              if(element1 === tipo){

              }else {
                dev = <option value={tipo} key={i}>{tipo}</option>
              }}
              return dev
            })}
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
              <Input placeholder="Número de vía secundaria" type="text" id="nombreViaSec" onChange={e => props.functionSetState(e, 'nombreViaSec',1)}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <br/>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="compViaSec">Complemento vía secundaria</InputLabel>
          <NativeSelect
            id="compViaSec"
            value={element3}
            onChange={e => {props.functionSetState(e, 'compViaSec',1); setElement3(e.target.value);}}
            input={<BootstrapInput style={{marginTop:30}}/>
            }
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
              <Input placeholder="Número de casa" type="text" id="numeroCasa" onChange={e => props.functionSetState(e, 'numeroCasa',2)}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="comp">Complemento</InputLabel>
          <NativeSelect
            id="comp"
            value={element4}
            onChange={e => {props.functionSetState(e, 'comp',2); setElement4(e.target.value);}}
            input={<BootstrapInput style={{marginTop:20}}/>
            }
          >
            <option value="Select" />
            {complementoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
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
              <Input placeholder="Barrio" type="text" id="barrio" onChange={e => props.functionSetState(e, 'barrio',2)}/>
            </InputGroup>
          </FormGroup>

        </FormControl>
      </>
    );
}
