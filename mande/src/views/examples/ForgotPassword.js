import React from 'react';
import Stepper from 'components/Password/ForgotPasswordStepper';

class ForgotPassword extends React.Component{
  state = {
    correo: true,
    codigo: true,
    nuevaContrasenia: true,
    nuevaConfirmacionContrasenia: true,
    open: false,
    worker: false,
    user: false,
  }


  setOpen = (id,val)=>
  {
    this.setState({[id] : val})
  }

  onHandleChange = (id, event) => {
    this.setState({ [id]: event })
    console.log(this.state);
  }

  render(){
  return(<Stepper state={this.state}  onHandleChange={this.setOpen} props={this.props}/>);
  }
}

export default ForgotPassword;
