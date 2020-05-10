import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([7000, 30000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Rango de precio:
      </Typography>
      <Slider
        min={70000}
        max={100000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="discrete-slider-always"
        getAriaValueText={valuetext}
        style = {{marginTop: 20}}
      />
    </div>
  );
}
