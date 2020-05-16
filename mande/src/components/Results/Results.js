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
  constructor(props){
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

  render(){
    return(
      <Container className = "mt--7" fluid>
      <Row style = {{marginTop: 80}}>
        <Col>
          <Row>
            <ResultCard name="David Lopez"
              descripcion="Profesor de inglés para todas las edades y niveles. Preparación para el EITLS o el TOEFL, traducción de documentos, clases personalizadas"
              titulo="Profesor de inglés"
              rating="4"
              tipoCobro="por hora"
              precio="30000"
              src = "/assets/img/profilePics/DavidLopez.jpg"
            />
          </Row>
        </Col>
      </Row>
      </Container>
    );
  }
}

export default Results;
