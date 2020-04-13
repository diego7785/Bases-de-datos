import React from 'react';
import Jobs from "components/Jobs/Jobs.js"

import {
  Button,
} from 'reactstrap'


class PlusButton extends React.Component{

state: {
  addJob: boolean,
}

constructor(props){
  super(props);
  this.state = {
    addJob: false,
  }
}

handleOpen(e){
  this.setState({addJob: true,});
};

  render(){
    if(this.state.addJob){
      return(
        <>
        <Jobs/>
        </>
      );
    } else {
      return(
        <>
        <p>
          <Button color="primary" type="button" title="Añadir otra labor" onClick={this.handleOpen.bind(this)}>Añadir otra labor</Button>
        </p>
        </>
      );
    }

  }

}

export default PlusButton;
