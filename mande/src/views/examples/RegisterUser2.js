import React from "react";
import { Link } from "react-router-dom";
import Pay from 'components/Payment/Pay';
// reactstrap components
import {
    Card,
    CardBody,
    Form,
    Row,
    Col,
    NavLink
} from "reactstrap";

class RegisterUser2 extends React.Component {

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
                                    <Pay />
                                </div>
                            </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col className="text-right" xs="12">
                            <NavLink
                                className="nav-link-icon"
                                to="/auth/loginas"
                                tag={Link}
                            >
                                <div className="text-light">
                                    <small>Ingresar</small>
                                </div>
                            </NavLink>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}
export default RegisterUser2;
