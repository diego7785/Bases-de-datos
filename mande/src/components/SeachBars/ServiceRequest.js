import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function ServiceRequest(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Pedir Servicio
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Da una breve descipcion para el trabajador</DialogTitle>
        <DialogContent>
        <TextField
          id="outlined-multiline-static"
          label="Descripcion de labor"
          multiline
          style = {{width: 440}}
          inputProps={{ maxLength: 100}}
          rows="4"
          placeholder="Ingresa una breve descripcion del servicio que requieres"
          variant="outlined"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirmar Servicio
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
