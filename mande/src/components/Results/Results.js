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
          return <li key={user.cedula_trabajador}><ResultCard name={user.trabajador_nombre}
            descripcion={user.labor_descripcion}
            titulo={user.labor_nombre}
            rating="4"
            tipoCobro={user.realiza_tipo}
            precio={user.realiza_precio}
            src={user.trabajador_foto_perfil}
          /></li>
        })}

      </Row>
    );
  }
}

export default Results;
