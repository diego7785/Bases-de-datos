import React from "react";
// reactstrap components
import {
  Container,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Button,
} from "reactstrap";

import Header from "components/Headers/Header.js";

function searchBar(props, id){
  if(id === 2){
    if(props.location.pathname=== "/worker/index"){
      return(<Input placeholder="Busca trabajos" type="text" style={{width: 600 }}/>)
    } else {
      return(<Input placeholder="Busca trabajadores" type="text" style={{width: 600}}/>)
    }
  } else{
    if(props.location.pathname=== "/worker/index"){
      return(<h1>¡Con Mande conseguir trabajo es mucho más fácil!</h1>)
    } else {
      return(<h1>Busca un trabajador</h1>)
    }
  }

}


class IndexW extends React.Component {
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
        <Header location={this.props.match.path}/>

        <Container className="mt--7" fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" >
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                {searchBar(this.props, 2)}
              </InputGroup>
            </FormGroup>
          </Form>
        </Container>
        <div className="text-left">
          <Button className="mt-4" color="secundary" type="button">
            Buscar
          </Button>
        </div>

      </>
    );
  }
}

export default IndexW;
