import React from "react";

// reactstrap components
import {Card, CardBody, CardHeader } from "reactstrap";
import WorkerCardRating from "components/RatingSelector/WorkerCardRating"

class WorkerRater extends React.Component {
  constructor(props){
    super(props)
    console.log(props);
  }

  onHandleCalificacion(id){
    this.props.history.push({
      pathname: id,
    });
  }

  laboresCalificar(){
    if(this.props.servicio === undefined){
      return(
          <CardHeader className="text-center">
            <div className="d-flex justify-content-center">
              ¡No hay labores para calificar!
            </div>
          </CardHeader>
      );
    } else {
      return(
        <>
          <CardHeader className="text-center">
            <div className="d-flex justify-content-center">
              ¡Califica a la labor que ya fue completada!
            </div>
          </CardHeader>
          <CardBody>
              <WorkerCardRating cedula={this.props.servicio.cedulat}
                name = {this.props.servicio.trabajadornombre + ' ' + this.props.servicio.trabajadorapellido}
                titulo = {this.props.servicio.nombrelabor}
                id = {this.props.servicio.idservicio}
                logout = {this.props.props}
                />
          </CardBody>
          </>
      );
    }
  }

  render() {
    return (
      <Card className="card-profile shadow">
        {this.laboresCalificar()}
      </Card>
    );
  }
}

export default WorkerRater;
