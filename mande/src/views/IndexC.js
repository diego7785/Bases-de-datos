import React from "react";
import SearchBar from '../components/SeachBars/Search.js'
import Header from "components/Headers/Header.js";
import Results from "components/Results/Results.js"
import WorkerRater from "components/RatingSelector/WorkerRate"

// reactstrap components
import {
  Col,
} from "reactstrap";

class IndexC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      results: true,
      openResults: false,
    };
    console.log(props)
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  onHandleChange = (id, e) => {
    this.setState({[id]: e})
  }

   showResults = () =>{
     if(this.state.openResults === true){

   } else {console.log('nos')}
   }

  render() {
    return (
      <div>

        <Header location={this.props.match.path}/>
        <SearchBar jobs={this.props.location.state.state.wjobs} results={this.state.results} onHandleChange={this.onHandleChange}
          idCard={this.props.location.state.state.userInfo.celular_usuario}/>

          {this.state.openResults ? <Results results={this.state.results}/> : <div></div>}
          <br/>
            <Col xl="4" style = {{marginTop: 30}}>
              <WorkerRater/>
            </Col>
          <br/>
          <br/>

      </div>

    );
  }
}

export default IndexC;
