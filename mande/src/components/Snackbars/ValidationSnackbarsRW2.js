import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe llenar todos los campos",
                "Su número de cuenta no debe contener letras, ni símbolos",
                "Su número de cuenta debe contener entre 10 y 20 dígitos"
];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarRWII(props) {

    const FinalRegister = async () => 
    {
        var cont =0;
        var emptyFields=true;
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }

        if((validations.diferentType(props.state.bancoCuenta,'string')) || (validations.diferentType(props.state.tipoCuenta,'string'))
            ||(validations.emptyField(props.state.numeroCuenta)))
        {
            verifications[0] = false;
            cont++;
            emptyFields=false;
        }
        if (false === (validations.isNumber(props.state.numeroCuenta))&& emptyFields)
        {
            verifications[1] = false;
            cont++;

        }
        if(emptyFields && (props.state.numeroCuenta.length<10 ||props.state.numeroCuenta.length>20))
        {
            verifications[2] = false;
            cont++;
        }
        if (cont >0)
        {
            props.onHandleChange('open', true);
        }

        else
        {
            var exito = 0;
            const idCard = props.props.location.state.idCard;
            const phone = props.props.location.state.celular;
            const email = props.props.location.state.email;
            const name = props.props.location.state.name;
            const lastname = props.props.location.state.lastname;
            const password = props.props.location.state.password;
        
            var res = await axios.post(`http://localhost:5000/RegisterWorker2/${idCard}/${phone}/${email}/${name}/${lastname}/${password}`)
            console.log(res);
            if(res.statusText === "OK"){
            exito=exito+1;
            }
        
            const numberAccount = props.state.numeroCuenta;
            const bank = props.state.bancoCuenta;
            const type = props.state.tipoCuenta;
        
            res = await axios.post(`http://localhost:5000/RegisterWorker2/${numberAccount}/${bank}/${type}/${idCard}/${phone}`)
            console.log(res);
            if(res.statusText === "OK"){
            exito=exito+1;
            }
        
            const lat = props.props.location.state.latitude;
            const lng = props.props.location.state.length;
            const address = props.props.location.state.completeAddress;
            const city = props.props.location.state.city;
            const depto = props.props.location.state.depto;
        
            res = await axios.post(`http://localhost:5000/RegisterWorker2_2/${idCard}/${phone}/${lat}/${lng}/${address}/${city}/${depto}`)
            console.log(res);
            if(res.statusText === "OK"){
            exito=exito+1;
            }
        
            const idJob = props.props.location.state.job;
            const price = props.props.location.state.price;
            const description = props.props.location.state.description;
            const typePay = props.props.location.state.type;
            const status = true;
        
            res = await axios.post(`http://localhost:5000/RegisterWorker2_1/${idJob}/${idCard}/${phone}/${price}/${typePay}/${description}/${status}`)
            console.log(res);
            if(res.statusText === "OK"){
            exito=exito+1;
            }
        
            if(exito === 4){
            alert('Registro exitoso');
            props.props.history.push({pathname: "/auth/"})
            }else{
            res = await axios.post(`http://localhost:5000/RegisterWorker2_3/delete/${idCard}`)
        
            alert('No se ha podido realizar el registro, por favor intente de nuevo');        
            }
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.onHandleChange('open', false)
    };

    return (
        <>
        <div style={{ marginTop: 40}}>
            <Button variant="contained" color="primary" onClick={FinalRegister}>
                    Finalizar
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
};