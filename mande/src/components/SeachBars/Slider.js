import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  root: {
    width: 300
  },
  valueLabel: {
    color: '#000',
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="bottom" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};


function valuetext(value) {
  return `${value}`;
}

 const RangeSlider = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([1000, 120000]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    await props.onChange("minValue",newValue[0]);
    await props.onChange("maxValue", newValue[1]);
    console.log(props.state)
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom style = {{color: 'white'}}>
        Rango de precio:
      </Typography>
      <Slider
        min = {1000}
        max={120000}
        value={value}
        //ValueLabelComponent={ValueLabelComponent}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slide"
        getAriaValueText={valuetext}
        style = {{marginTop: 9}}

      />
    </div>
  );
}
export default RangeSlider;
