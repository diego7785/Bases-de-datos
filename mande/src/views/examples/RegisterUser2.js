import React from "react";
import Pay from 'components/Payment/Pay';
// reactstrap components
import {
    Card,
    CardBody,
    Form,
    Col,
} from "reactstrap";

class RegisterUser2 extends React.Component {

  state={
    type: true,
    bank: true,
    cardNumber: true,
    numberAccount: true,
    cvc: true,
    month: true,
    year: true,
    idCardCredit: true,
  }

  onHandleChange = (id, event) => {
    this.setState({ [id]: event})
    console.log(this.state);
    console.log(this.props)
  }
    render() {
        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>PASO 3: Introducir medio de pago</small>
                            </div>
                            <Form role="form">
                            <div className="text-center text-muted mb-4">
                                <div style={{ marginTop: 30 }}>
                                    <label>
                                        Para empezar a usar nuestros servicios, debes añadir un medio de pago
                                    </label>
                                    <Pay state={this.state} state1={this.props} onHandleChange={this.onHandleChange}/>
                                </div>
                            </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }
}
export default RegisterUser2;
