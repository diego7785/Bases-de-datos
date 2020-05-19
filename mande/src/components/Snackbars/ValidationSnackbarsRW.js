import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Celular debe ser un número",
    "Celular debe contener 10 dígitos",
    "Nombre no debe contener números, ni símbolos",
    "Apellido no debe contener números, ni símbolos",
    "Cédula debe ser un número",
    "Cédula debe contener de 8 a 10 dígitos",
    "La contraseña debe tener 5 o más carácteres",
    "Las contraseñas deben coincidir",
    "Debe llenar todos los campos requeridos",
    "Ya existe un trabajador registrado con esa cédula",
    "Ya existe un trabajador registrado con ese email"
];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarRW(props) {
    const handleClick = async() => {
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }
        var jobs = [];
        axios.get(`http://localhost:5000/RegisterWorker1/${"labores"}/`).then(res => {
            for (var i = 0; i < res.data.length; i++) {
                jobs.push({ code: res.data[i].labor_nombre, label: res.data[i].labor_nombre });
            }
        });

        var cont = 0;
        var emptyFields=true;
    
        if (validations.emptyField(props.state.celular) || validations.emptyField(props.state.name) 
            || validations.emptyField(props.state.lastname)  ||validations.emptyField(props.state.email) 
            || validations.emptyField(props.state.idCard) || validations.emptyField(props.state.password) 
            || validations.emptyField(props.state.passwordR)) 
            
        {
            verifications[8] = false;
            cont++;
            emptyFields=false;
        }
        if (false === (validations.isNumber(props.state.celular))&& emptyFields) {
            verifications[0] = false;
            cont++;
        }
        if (props.state.passwordR !== props.state.password && emptyFields) {
            verifications[7] = false;
            cont++;
        }
        if (false === (validations.validSizeEq(props.state.celular,10))&& emptyFields){
            verifications[1] = false;
            cont++;
        }
        if (false === (validations.isNumber(props.state.idCard))&& emptyFields) {
            verifications[4] = false;
            cont++;
        }
        if ((false === (validations.validSizeEq(props.state.idCard,8)) && false === (validations.validSizeEq(props.state.idCard,9)) && false === (validations.validSizeEq(props.state.idCard,10)))&& emptyFields){
            verifications[5] = false;
            cont++;
        }
        if((false === (validations.onlyLetters(props.state.name)))&& emptyFields){
            verifications[2] = false;
            cont++;
        }
        if((false === (validations.onlyLetters(props.state.lastname)))&& emptyFields){
            verifications[3] = false;
            cont++;
        }
        if (((false === (validations.validSizeMay(props.state.password,5))) || false === (validations.validSizeMay(props.state.passwordR,5)))&& emptyFields){
            verifications[6] = false;
            cont++;
        }        
        if (cont >0)
        {
            props.onHandleChange('open', true);
        }
        else {
            const validateId = await axios.get(`http://localhost:5000/validateWorkerExistence/${props.state.idCard}/`)
            const validateEmail = await axios.get(`http://localhost:5000/validateEmailExistence/${props.state.email}/`)
            var conta = 0;
            if(validateId.data[0].validateidworker)
            {
                console.log(validateId);
                verifications[9] = false;
                conta++;
            }
            if(validateEmail.data[0].validateemailworker)
            {
                console.log(validateEmail);
                verifications[10] = false;
                conta++;
            }
            if(conta > 0)
            {
                props.onHandleChange('open', true);
            }
            else
            {
                props.props.history.push({
                    pathname: "/auth/RegisterWorker1/", state: {
                        name: props.state.name,
                        lastname: props.state.lastname,
                        celular: props.state.celular,
                        email: props.state.email,
                        idCard: props.state.idCard,
                        password: props.state.password,
                        passwordR: props.state.passwordR,
                        complemento: props.state.complemento,
                        address: props.state.address,
                        latitude: props.state.latitude,
                        length: props.state.length,
                        tjobs: jobs,
                    }
                })
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
            <Button variant="contained" color="primary" onClick={handleClick}>
                    Siguiente
            </Button>
        </div>
            <Snackbar open={props.state.open} autoHideDuration={9000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {verifications.map((value, index) => {
                        if (verifications[index] === false) {
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
