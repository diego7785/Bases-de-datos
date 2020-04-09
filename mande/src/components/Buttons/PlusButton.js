import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Job from 'components/Jobs/Jobs.js'


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginN: {
    marginTop: theme.spacing(-1.6),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

var addJob = false;

const handleOpen = () =>{
  console.log('handleOpen')
  addJob = true;
}

function handleAddJob(){
  console.log(addJob)
  if(addJob){
    console.log('handleAddJob')
    return <Job/>
  }
}

export default function CustomizedSelects() {
  const classes = useStyles();

  return(
    <>
    <FormControl className={classes.margin} style={{marginLeft:-20, marginTop: -20}}>
      <Tooltip title="Añadir otra labor" aria-label="add">
        <Fab size="medium" color="primary" className={classes.fab}>
          <AddIcon onClick={handleOpen}/>
        </Fab>
      </Tooltip>
      </FormControl>
      {handleAddJob}
    </>
  );
}
