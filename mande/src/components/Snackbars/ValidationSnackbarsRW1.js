import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe llenar todos los campos",
                "Ponga una descripción de al menos 10 caracteres",
                "Debe enviar todas las fotos requeridas"
];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SnackbarRWI(props) {
    const onHandleNext = async() => {
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }
        var cont = 0;
        var emptyFields=true;
        if ((props.state.job !==1 && props.state.job !==2 && props.state.job !==3 && props.state.job !==4 && props.state.job !==5)
            ||(validations.diferentType(props.state.type,'string')) || (validations.emptyField(props.state.price))
            ||(validations.emptyField(props.state.description)))
        {
            verifications[0] = false;
            cont++;    
            emptyFields=false;
        }
        if(props.state.description.length>1 && props.state.description.length <10 && emptyFields)
        {
            verifications[1] = false;
            cont++; 
        }
        if(validations.diferentType(props.state.front,'object') || validations.diferentType(props.state.back,'object') || validations.diferentType(props.state.profilepic,'object'))
        {
            verifications[2] = false;
            cont++; 
        }  
        if (cont >0)
        {
                props.onHandleChange('open', true);
        }

    if(typeof(props.state.front)=== 'object' && typeof(props.state.back) === 'object' && typeof(props.state.profilepic)=== 'object' && verifications[0] ===true && verifications[1] ===true)    
    {
        var conta = 0;
        var data = new FormData()
        data.append('file', props.state.front)
        var res = await axios.post("http://localhost:5000/RegisterWorker1/images?idCard="+props.props.location.state.idCard+"&type=front&user=worker", data, {})
        if(res.status === 200){
            conta=1;
        }

        data = new FormData()
        data.append('file', props.state.back)
        res = await axios.post("http://localhost:5000/RegisterWorker1/images?idCard="+props.props.location.state.idCard+"&type=back&user=worker", data, {})
        if(res.status === 200){
            conta++;

        }
        data = new FormData()
        data.append('file', props.state.profilepic)
        res = await axios.post("http://localhost:5000/RegisterWorker1/images?idCard="+props.props.location.state.idCard+"&type=profilepic&user=worker", data, {})
        if(res.status === 200){
            conta++;
        }
        if(conta === 3){
            alert('Imágenes cargadas correctamente');
            props.props.history.push({
                pathname: "/auth/RegisterWorker2/", state: {
                  idCard: props.props.location.state.idCard,
                  email : props.props.location.state.email,
                  celular : props.props.location.state.celular,
                  profilepic :  props.state.profilepic,
                  front : props.state.front,
                  back :  props.state.back,
                  name : props.props.location.state.name,
                  lastname: props.props.location.state.lastname,
                  address : props.props.location.state.address,
                  complemento : props.props.location.state.complemento,
                  password : props.props.location.state.password,
                  job : props.state.job,
                  description : props.state.description,
                  type : props.state.type,
                  price : props.state.price,
                  latitude : props.props.location.state.latitude,
                  length : props.props.location.state.length,
                }
              })
            } 
            else{
            alert('Fallo ocurrido al cargar las imágenes');
            }
        }
    };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.onHandleChange('open', false)
    };
    return (
        <>
        <div style={{ marginTop: 40}}>
            <Button variant="contained" color="primary" onClick={onHandleNext}>
                    Siguiente
            </Button>
        </div>
            <Snackbar open={props.state.open} autoHideDuration={9000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {verifications.map((value, index) => {
                        if (verifications[index]===false) {
                            return <li style={{ listStyleType: 'none', textAlign: "left" }} key={index}> {messages[index]}</li>
                        }
                        return <></>;
                    }
                    )}
                </Alert>
            </Snackbar>
        </>
    );
}