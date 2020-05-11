import React from "react";

// reactstrap components
import {
  Container,
} from "reactstrap";

function searchBar(props){
    if(props.location=== "/worker/index"){
      return(<h1 style={{color: 'white'}}>¡Con Mande conseguir trabajo es mucho más fácil!</h1>)
    } else {
      return(<h1 style={{color: 'white'}}>¡Con Mande conseguir un trabajador es mucho más fácil!</h1>)
    }
  }

class Header extends React.Component {

  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "300px",
            maxHeight: "400px",
            backgroundImage:
              "url(" + require("assets/img/theme/cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          <span className="mask bg-gradient-default opacity-2" />
          <Container fluid>
            {searchBar(this.props)}
          </Container>
          
        </div>
      </>
    );
  }
}

export default Header;
