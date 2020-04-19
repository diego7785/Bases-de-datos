import React from "react";

// reactstrap components
import {
  Container,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,} from "reactstrap";

function searchBar(props, id){
  if(id === 2){
    if(props.location=== "/worker/index"){
      return(<Input placeholder="Busca trabajos" type="text" style={{width: 600}}/>)
    } else {
      return(<Input placeholder="Busca trabajadores" type="text" style={{width: 600}}/>)
    }
  } else{
    if(props.location=== "/worker/index"){
      return(<h1>¡Con Mande conseguir trabajo es mucho más fácil!</h1>)
    } else {
      return(<h1>¡Con Mande conseguir un trabajador es mucho más fácil!</h1>)
    }
  }

}
class Header extends React.Component {

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            {searchBar(this.props,1)}

          </Container>
        </div>
      </>
    );
  }
}

export default Header;
