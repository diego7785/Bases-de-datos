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
          <Input placeholder="País" type="text" id="pais" onChange={e => props.functionSetState(e, 'pais')}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Departamento" type="text" id="departamento" onChange={e => props.functionSetState(e, 'departamento')}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Municipio" type="text" id="municipio" onChange={e => props.functionSetState(e, 'municipio')}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Código postal" type="text" id="postalcode" onChange={e => props.functionSetState(e, 'postalcode')}/>
        </InputGroup>
      </FormGroup>
        <FormControl className={classes.marginN} style={{marginTop:-5}} >
          <InputLabel htmlFor="tipoVia">Tipo vía</InputLabel>
          <NativeSelect
            id="tipoVia"
            value={element1}
            onChange={e => {props.functionSetState(e, 'tipoVia'); setElement1(e.target.value); props.changeViaState() }}
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
              <Input placeholder="Nombre o número de vía" type="text" id="nombreVia" onChange={e => props.functionSetState(e, 'nombreVia')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="viaSec">Vía secundaria</InputLabel>
          <NativeSelect
            id="viaSec"
            value={element2}
            onChange={e => {props.functionSetState(e, 'viaSec'); setElement2(e.target.value);}}
            input={<BootstrapInput  style={{marginTop:30}}/>}
            >
            <option value="Select" />
            {tipoVia.map((tipo,i) => {
              if(props.state.via){
              if(element1 === tipo){
                  
              }else {
                return <option value={tipo} key={i}>{tipo}</option>
              }}})}
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
              <Input placeholder="Número de vía secundaria" type="text" id="nombreViaSec" onChange={e => props.functionSetState(e, 'nombreViaSec')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <br/>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="compViaSec">Complemento vía secundaria</InputLabel>
          <NativeSelect
            id="compViaSec"
            value={element3}
            onChange={e => {props.functionSetState(e, 'compViaSec'); setElement3(e.target.value);}}
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
              <Input placeholder="Número de casa" type="text" id="numeroCasa" onChange={e => props.functionSetState(e, 'numeroCasa')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="comp">Complemento</InputLabel>
          <NativeSelect
            id="comp"
            value={element4}
            onChange={e => {props.functionSetState(e, 'comp'); setElement4(e.target.value);}}
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
              <Input placeholder="Barrio" type="text" id="barrio" onChange={e => props.functionSetState(e, 'barrio')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
      </>
    );
}

/*
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

class Direccion extends React.Component{

  constructor(props){
    super(props);

  }
  BootstrapInput = withStyles(theme => ({
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

  useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    marginN: {
      marginTop: theme.spacing(-1.6),
    },
  }));

  state = {
    pais: true,
    departamento: true,
    municipio: true,
    tipoVia: true,
    nombreVia: true,
    compViaPrinc: true,
    nombreViaSec: true,
    compViaSec: true,
    numeroCasa: true,
    comp: true,
    barrio: true,
  }

  handleOnChange = (id, event)=>{
    this.setState({ [id]: event.target.value });
  }


  tipoVia = ["Autopista", "Avenida", "Av. Calle", "Av. Carrera", "Barrio", "Calle", "Callejón", "Carrera",
    "Circular", "Diagonal", "Kilómetro", "Pasaje", "Paso", "Ramal", "Subramal", "Tramo", "Transversal", "Vereda"]

  complementoVia =["Este","Manzana","Noreste","Noroccidente","Noroeste","Norte","Occidente","Oeste","Oriente",
                          "Sur","Sureste","Suroccidente","Suroeste","Suroriente"];

toReturn = () => {

    const classes = this.useStyles();
    const [element, setelement] = React.useState('');
    const handleChange = id => event => {
      setelement(event.target.value);
      //console.log(props.stateProps)
    };

    const onHandleChange = id => event =>{
      //this.handleOnChange(id, event);
      console.log('hey');
    }


    return (
      <>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="País" type="text" id="pais" onChange={onHandleChange('pais')}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Departamento" type="text" id="departamento" onChange={onHandleChange('departamento')}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Municipio" type="text" id="municipio" onChange={onHandleChange('municipio')}/>
        </InputGroup>
      </FormGroup>
        <FormControl className={classes.marginN} style={{marginTop:-5}} >
          <InputLabel htmlFor="demo-customized-select-native">Tipo vía</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={element}
            onChange={handleChange('tipoVia')}
            input={<this.BootstrapInput  />}
          >
            <option value="Select" />
            {this.tipoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
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
              <Input placeholder="Nombre o número de vía" type="text" id="nombreVia" onChange={onHandleChange('nombreVia')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="demo-customized-select-native">Complemento vía principal</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={element}
            onChange={handleChange('compViaPrinc')}
            input={<this.BootstrapInput  style={{marginTop:30}}/>}
            >
            <option value="Select" />
            {this.complementoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
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
              <Input placeholder="Número de vía secundaria" type="text" id="nombreViaSec" onChange={onHandleChange('nombreViaSec')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <br/>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="demo-customized-select-native">Complemento vía secundaria</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={element}
            onChange={handleChange('compViaSec')}
            input={<this.BootstrapInput style={{marginTop:30}}/>
            }
          >
            <option value="Select" />
            {this.complementoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
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
              <Input placeholder="Número de casa" type="text" id="numeroCasa" onChange={onHandleChange('numeroCasa')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="demo-customized-select-native">Complemento</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={element}
            onChange={handleChange('comp')}
            input={<this.BootstrapInput style={{marginTop:20}}/>
            }
          >
            <option value="Select" />
            {this.complementoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
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
              <Input placeholder="Barrio" type="text" id="barrio" onChange={onHandleChange('barrio')}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
      </>
    );
}

render(){
  return(
    <Direccion/>
  );
}

}

export default Direccion;

*/
