import React from "react";

// reactstrap components
import {Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import WorkerCardRating from "components/RatingSelector/WorkerCardRating"

class WorkerRater extends React.Component {
  render() {
    return (
      <>
        <Card className="card-profile shadow">
                <CardHeader className="text-center">
                  <div className="d-flex justify-content-center">
                    ¡Califica a la labor que ya fue completada!
                  </div>
                </CardHeader>
                <CardBody>
                    <WorkerCardRating name = "Alejandro Murillo" titulo = "Paseador de perros"/>
                    
                </CardBody>
              </Card>
      </>
    );
  }
}

export default WorkerRater;