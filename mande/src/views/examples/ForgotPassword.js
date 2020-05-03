import React from 'react';
import Stepper from 'components/Password/ForgotPasswordStepper';

class ForgotPassword extends React.Component{
  state = {
    correo: true,
    codigo: true,
    nuevaContrasenia: true,
    nuevaConfirmacionContrasenia: true,
  }

  onHandleChange = (id, event) => {
    this.setState({ [id]: event })
    console.log(this.state);
  }

  render(){
  return(<Stepper state={this.state} onHandleChange={this.onHandleChange}/>);

  }
}

export default ForgotPassword;
