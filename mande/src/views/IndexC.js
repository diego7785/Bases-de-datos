import React from "react";  
import SearchBar from '../components/SeachBars/Search.js'

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
import Footer from "components/Footers/Footer.js";


class IndexC extends React.Component {
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
      <div>
        <Header/>
        <SearchBar />
      </div>
    );
  }
}

export default IndexC;
