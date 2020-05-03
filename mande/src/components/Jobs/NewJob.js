import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Job from 'components/Jobs/Jobs.js'

export default function AddNewJob(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    if(props.state.job === true || props.state.description === true || props.state.type === true || props.state.price === true){
      alert("Llene todos los campos por favor");
    } else{
      //Hacer vainitas para agregar la labor
      alert("Labor agregada con éxito");
      setOpen(false);
      props.onHandleChange('job', true);
      props.onHandleChange('description', true);
      props.onHandleChange('type', true);
      props.onHandleChange('price', true);
    }
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Agregar trabajo
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar nuevo trabajo</DialogTitle>
        <DialogContent>
          <Job onHandleChange={props.onHandleChange}/>
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
