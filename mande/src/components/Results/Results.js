import React from 'react';
import ResultCard from "components/SeachBars/SearchResult.js";

// reactstrap components
import {
  Row,
} from "reactstrap";

class Results extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    desc: false,
  }

  handleChange = (e) => {
    this.setState({desc: e.target.value})
  } 

  render() {
    return (

      <Row>
        {this.props.results.data.map((user) => {
          var estado = true;
          if (user.trabajador_estado == 0){
            estado = false;
            console.log(estado)
          } 
           
          
          return <li key={user.cedula_trabajador} style={{ listStyle: "none" }}><ResultCard name={user.trabajador_nombre}
            descripcion={user.labor_descripcion}
            titulo={user.labor_nombre}
            rating={user.trabajador_calificacion}
            tipoCobro={user.realiza_tipo}
            precio={user.realiza_precio}
            src={user.trabajador_foto_perfil}
            distancia={(user.distancia / 1000).toFixed(2)}
            estado={estado}
            id={user.cedula_trabajador}
            phoneUser={this.props.idCard}
            idLabor = {user.id_labor}
            desc = {this.state.desc}
            handleChange = {this.handleChange}
          /></li>
        })}

      </Row>
    );
  }
}

export default Results;
