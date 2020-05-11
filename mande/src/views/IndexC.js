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
import ResultCard from "components/SeachBars/SearchResult.js";

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

        <ResultCard name = "Rodrigo Perez" 
        descripcion = "Plomero profesional con más de 20 años de experiencia en la industria. Se realizan tuberías para el hogar, se destapan caños, etc." 
        titulo = "Plomeria para el hogar"
        rating = "4.5"
        tipoCobro = "por labor"
        precio = "70000" 
        />
        
        <ResultCard name = "David Lopez" 
        descripcion = "Profesor de inglés para todas las edades y niveles. Preparación para el EITLS o el TOEFL, traducción de documentos, clases personalizadas"
        titulo = "Profesor de inglés" 
        rating = "4"
        tipoCobro = "por hora"
        precio = "30000" 
        />
      </div>
    );
  }
}

export default IndexC;
