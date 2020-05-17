import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import RangeSlider from './Slider';
import Rater from '../RatingSelector/RatingSelector'
import axios from 'axios';

// reactstrap components
import {
  FormGroup,
  Row,
  Col,
} from "reactstrap";




const chargeType = [{ type: "Por hora" }, { type: "Por labor" },];

class AdvancedSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      value: true,
      minValue: true,
      maxValue: true,
    };
  }

  handleChange = (event,id) => {
    this.setState({[id]: event});
    console.log(this.state);
    console.log(this.props)
  }

  onHandleAdvanceSearch = async (e) => {
    const workersToSearch = this.props.state.search;
    const idCardU = this.props.idCardU;
    const res = await axios.get(`http://localhost:5000/SearchWorkers/${workersToSearch}/${idCardU}`)
    console.log(res)
    this.props.onHandleChange('results', res)
    this.props.onHandleChange('openResults', true)
  }

  render() {
    return (
      <>
        <Row>
          <Col xl="5">
            <div>
              <Rater state = {this.state} onChange = {this.handleChange}/>
            </div>
          </Col>
          <Col xl="5">
            <RangeSlider state = {this.state} onChange = {this.handleChange}/>
          </Col>
        <Col>
          <FormGroup className="mb-0" style={{ marginTop: -20 }}>
            <Autocomplete
              id="chargeType"
              style={{ width: 440 }}
              options={chargeType}
              autoHighlight
              getOptionLabel={(option) => option.type}
              renderOption={(option) => (
                <React.Fragment>
                  {option.type}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  {...params}
                  label="Escoge un tipo de cobro"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
              onChange={(e) => {this.onHandleAdvanceSearch(e)}}
            />
          </FormGroup>
        </Col>

      </Row>
      <Row style={{ marginTop: 45 }}>
        <Col xl="7" md="6">
        </Col>
      </Row>
      </>
    );
  }
}

export default AdvancedSearchBar;
