import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function ChangePassword(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    if(props.state.actualPass === true || props.state.newPass === true || props.state.newConfirmPass === true){
      alert("Por favor llene todos los campos");
    } else{
    if(props.state.newPass === props.state.newConfirmPass){
      var res;
      const newPass = props.state.newPass;
      const actualPass = props.state.actualPass;
      if(props.state.path.substring(0,7) === '/worker'){
        const idCard = props.state.idCard;
        console.log(props.state)
        res = await axios.post(`http://localhost:5000/ChangePasswordWorker/${idCard}/${newPass}/${actualPass}`)
        if(res.data === 0){
          alert("Contraeña cambiada éxitosamente");
          setOpen(false);
        } else if(res.data === 2) {
          alert("La contraseña ingresada no coincide con la contraseña actual");
        } else{
          alert("Error cambiando la contraseña");
        }
      } else{
        const phone = props.state.phonee;
        console.log(phone);
        res = await axios.post(`http://localhost:5000/ChangePasswordUser/${phone}/${newPass}/${actualPass}`)
        console.log(res);
        if(res.data === 0){
          alert("Contraeña cambiada éxitosamente");
          setOpen(false);
        } else if(res.data === 2) {
          alert("La contraseña ingresada no coincide con la contraseña actual");
        } else{
          alert("Error cambiando la contraseña");
        }
      }


    } else {
      alert("La nueva contraseña no coincide con su confirmación");
    }
  }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Cambiar contraseña
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cambio de contraseña</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="actualpass"
            label="Contraseña actual"
            type="password"
            onChange={e => props.changePass('actualPass', e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="newpass"
            label="Nueva contraseña"
            type="password"
            onChange={e => props.changePass('newPass', e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="newConfirmpass"
            label="Confirme nueva contraseña"
            type="password"
            onChange={e => props.changePass('newConfirmPass', e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Cambiar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
