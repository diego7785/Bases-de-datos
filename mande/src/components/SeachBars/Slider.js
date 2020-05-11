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
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
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
  return `${value}°C`;
}

 const RangeSlider = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([10000, 100000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onChange(newValue[0],"minValue");
    props.onChange(newValue[1],"maxValue");
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Rango de precio: 
      </Typography>
      <Slider
        min={10000}
        max={100000}
        value={value}
        ValueLabelComponent={ValueLabelComponent}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="discrete-slider-always"
        getAriaValueText={valuetext}
        style = {{marginTop: 20}}

      />
    </div>
  );
}
export default RangeSlider;