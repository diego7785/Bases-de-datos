import React from "react";
import Button from '@material-ui/core/Button';

// reactstrap components
import {
  Container,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Row,
  Col,
} from "reactstrap";


import Header from "components/Headers/Header.js";


class AdvancedSearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    return (
      <>
          <Row>
            <Col xl="5">
              <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" >
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Lugar" type="text" style={{width: 200}}/>
                  </InputGroup>
                </FormGroup>
              </Form>
            </Col>
            <Col xl="5">
              <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" >
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="otro criterio" type="text" style={{width: 200}, {marginLeft: 20}}/>
                  </InputGroup>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row style={{ marginTop: 45}}>
            <Col xl="7" md="6">

            </Col>
          </Row>
      </>
    );
  }
}

export default AdvancedSearchBar;
