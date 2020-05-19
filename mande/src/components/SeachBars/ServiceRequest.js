import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


export default function ServiceRequest(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    const idWorker = props.id;
    const phoneUser = props.phoneUser;
    const idLab = props.idLabor;
    const desc = props.desc;
    
    const res = await axios.post(`http://localhost:5000/serviceRequest/${idWorker}/${phoneUser}/${idLab}/${desc}`);
    setOpen(false);
    };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Pedir Servicio
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Da una breve descripción para el trabajador</DialogTitle>
        <DialogContent>
        <TextField
          id="outlined-multiline-static"
          label="Ingresa una breve descripcion del servicio que requieres"
          multiline
          style = {{width: 440}}
          inputProps={{ maxLength: 200}}
          rows="4"
          placeholder="Ingresa una breve descripcion del servicio que requieres"
          variant="outlined"
          onChange = {(e) => props.handleChange(e)}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="contained">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Confirmar Servicio
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
