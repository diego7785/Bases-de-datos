import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

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

  state = {
    phone: true,
    pass: true,
  }

  onHandleChange = (id, event) =>{
    this.setState({ [id]: event.target.value})
  }

  onHandleNext = async (e) =>{
    e.preventDefault()
    const phone = parseInt(this.state.phone);
    const pass = this.state.pass;

    const res = await axios.get(`http://localhost:5000/LoginAsUser/${phone}/${pass}/`)
    if(res.data[0]){
      const res1 = await axios.get(`http://localhost:5000/GetUserInfo/${phone}/`)
      const userInfo = res1.data
      const res2 = await axios.get(`http://localhost:5000/GetUserAddressInfo/${phone}/`)
      const addressInfo = res2.data
      const res3 = await axios.get(`http://localhost:5000/GetCreditCardInfo/${phone}/`)
      const creditCardInfo = res3.data
      const res4 = await axios.get(`http://localhost:5000/GetDebitCardInfo/${phone}/`)
      const debitCardInfo = res4.data

      var paymentMethod;
      var type;
      console.log(userInfo)
      console.log(addressInfo)
      if(debitCardInfo === "" ){
        paymentMethod=creditCardInfo;
        type='Credito'
      } else{
        paymentMethod=debitCardInfo;
        type='Debito'
      }
      console.log(paymentMethod)


      this.props.history.push({
        pathname: "/client/", state: {
        idCard: res.data[1],
        userInfo: userInfo,
        addressInfo: addressInfo,
        paymentMethod: paymentMethod,
        type: type,
        }
      })
    } else {
      alert('Credenciales incorrectas');
    }

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
                  <Button className="my-4" color="primary" type="button" onClick={e => this.onHandleNext(e)}>
                    Ingresar
                  </Button>
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
                to='/auth/ForgotPassword'
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
