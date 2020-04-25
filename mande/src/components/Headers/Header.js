import React from "react";

// reactstrap components
import {
  Container,
} from "reactstrap";

function searchBar(props){
    if(props.location=== "/worker/index"){
      return(<h1>¡Con Mande conseguir trabajo es mucho más fácil!</h1>)
    } else {
      return(<h1>¡Con Mande conseguir un trabajador es mucho más fácil!</h1>)
    }
  }

class Header extends React.Component {

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            {searchBar(this.props)}

          </Container>
        </div>
      </>
    );
  }
}

export default Header;
