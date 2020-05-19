import React from "react";
import { Link } from 'react-router-dom'
import ValidationSnackbarsLU from 'components/Snackbars/ValidationSnackbarsLU';
import Cookies from 'js-cookie';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
} from "reactstrap";

class LoginAsUser extends React.Component {

  constructor(props){
    super(props)
    Cookies.remove("Client");
  }
  state = {
    phone: true,
    pass: true,
    open: false,
  }

  setOpen = (id,val)=>
  {
    this.setState({[id] : val})
  }

  onHandleChange = (id, event) =>{
    this.setState({ [id]: event.target.value})
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Ingresar </small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Celular" type="text" onChange={e => this.onHandleChange('phone', e)}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" onChange={e => this.onHandleChange('pass', e)}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <ValidationSnackbarsLU state={this.state} onHandleChange={this.setOpen} props={this.props}/>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <NavLink
                className="text-light"
                to="/auth/ForgotPassword"
                tag={Link}
              >
              <div className="text-light">
                <small>¿Olvidaste tu contraseña?</small>
              </div>
              </NavLink>
            </Col>
            <Col className="text-right" xs="6">
              <NavLink
                className="nav-link-icon"
                to='/auth/RegisterAs'
                tag={Link}
                >
                <div className="text-light">
                  <small>Crear cuenta</small>
                </div>
              </NavLink>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default LoginAsUser;
