import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from "@material-ui/core/Typography";
import { Box } from '@material-ui/core';



const Rater = (props) => {

  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend" style = {{color: 'white'}}>Rating minimo:</Typography>
      <Rating
        name="simple-controlled"
        value={props.state.value}
        onChange={async (event, newValue) => {
          await props.onChange(event.target.value,"value");
          console.log(props)
        }}
        style = {{marginTop: 15}}
      />
    </Box>
  );
}

export default Rater;
