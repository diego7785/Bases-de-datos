import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import RangeSlider from './Slider';
import Rater from '../RatingSelector/RatingSelector'

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

const useStyles = makeStyles({
  root: {
    width: 300
  }
});



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
              onChange={(event) => { }}
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
