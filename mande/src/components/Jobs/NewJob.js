import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Job from 'components/Jobs/Jobs.js'
import axios from 'axios';

export default function AddNewJob(props) {
  const [open, setOpen] = React.useState(false);
  const [jobs, setJobs] = React.useState(true);

  const handleClickOpen = async () => {
    var tjobs=[];
    var res = await axios.get(`http://localhost:5000/RegisterWorker1/${"labores"}/`)

    for(var i=0; i<res.data.length; i++){
      tjobs.push({code: res.data[i].labor_nombre, label: res.data[i].labor_nombre});
    }
    setJobs(tjobs)
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    if(props.state.job === true || props.state.description === true || props.state.type === true || props.state.price === true){
      alert("Llene todos los campos por favor");
    } else{
      setOpen(false);
      const idJob = props.state.job;
      const idCard = props.state.idCard;
      const phone = props.state.phone;
      const price = props.state.price;
      const typePay = props.state.type;
      const description = props.state.description;
      const status = true;
      var res = await axios.post(`http://localhost:5000/RegisterWorker2_1/${idJob}/${idCard}/${phone}/${price}/${typePay}/${description}/${status}`)
      console.log(res);
      if(res.statusText === "OK"){
        alert("Labor agregada con éxito");
      }
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
          <Job onHandleChange={props.onHandleChange} jobs={jobs}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
