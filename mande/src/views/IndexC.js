import React from "react";
import SearchBar from '../components/SeachBars/Search.js'
import Header from "components/Headers/Header.js";
import Results from "components/Results/Results.js"
import WorkerRater from "components/RatingSelector/WorkerRate"

// reactstrap components
import {
  Col,
  Row,
  Container,

} from "reactstrap";

class IndexC extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      results: true,
      openResults: false,
      idCard: this.props.location.state.state.userInfo.celular_usuario,
      jobs: this.props.location.state.state.wjobs
    };
    console.log("pare menor")
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
    this.setState({ [id]: e })
  }

  showResults = () => {
    if (this.state.openResults === true) {

    } else { console.log('nos') }
  }

  render() {
    return (
      <div>

        <Header location={this.props.match.path} />
        <SearchBar jobs={this.state.jobs} results={this.state.results} onHandleChange={this.onHandleChange}
          idCard={this.state.idCard} />
        <Container className="mt--7" fluid>
          <Row style={{ marginTop: 80 }}>
            <Col>
              <Row>
                {this.state.openResults ? <Results results={this.state.results} idCard={this.state.idCard} /> : <div></div>}
              </Row>
            </Col>
            {/*this.showResults*/}

            <br />
            <Col xl="4" style={{ marginTop: 30 }}>
              <WorkerRater servicio={this.props.location.state.servicio}/>
            </Col>
            <br />
            <br />
          </Row>
        </Container>
      </div>

    );
  }
}


export default (IndexC);
