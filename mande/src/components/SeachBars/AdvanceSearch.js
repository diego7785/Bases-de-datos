import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import RangeSlider from './Slider';
import Rater from '../RatingSelector/RatingSelector'

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
      value: this.props.value,
      minValue: this.props.minValue,
      maxValue: this.props.maxValue,
      type: this.props.type,
    };
  }


  render() {
    return (
      <>
        <Row>
          <Col xl="5">
            <div>
              <Rater state = {this.props.state} onChange = {this.props.onHandleChange}/>
            </div>
          </Col>
          <Col xl="5">
            <RangeSlider state = {this.props.state} onChange = {this.props.onHandleChange}/>
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
              onChange={async (e) => {await this.props.onHandleChange('type', e.target.innerText)}}
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
