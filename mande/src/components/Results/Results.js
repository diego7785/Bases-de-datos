import React from 'react';
import ResultCard from "components/SeachBars/SearchResult.js";
import WorkerRater from "components/RatingSelector/WorkerRate"

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

class Results extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    name: true,
    description: true,
    title: true,
    rating: 4,
    type: true,
    price: true,
  }

  render() {
    return (

      <Row>
        {this.props.results.data.map((user) => {
          var estado = false;
          if (user.trabajador_estado !== 0) 
            estado = true;
          
          return <li key={user.cedula_trabajador} style={{ listStyle: "none" }}><ResultCard name={user.trabajador_nombre}
            descripcion={user.labor_descripcion}
            titulo={user.labor_nombre}
            rating={user.trabajador_calificacion}
            tipoCobro={user.realiza_tipo}
            precio={user.realiza_precio}
            src={user.trabajador_foto_perfil}
            distancia={(user.distancia / 1000).toFixed(2)}
            estado={false}
          /></li>
        })}

      </Row>
    );
  }
}

export default Results;
