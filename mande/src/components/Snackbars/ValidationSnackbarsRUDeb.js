import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe llenar todos los campos",
                "",
                "",
                "",
                "",
            ];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarRUDeb(props) {
    const finalRegister = async (props) => {
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }

        var cont=0;
        console.log(props.state);

        if (false === validations.isNumber(props.state.cardNumber))
        {
            verifications[0]=false;
            cont++;   
        }
                
        if (cont >0)
        {
            props.onHandleChange('open', true);
        }

        else
        {
            var exito = 0;
            const idCard = props.state1.location.state.idCard;
            const phone = props.state1.location.state.celular;
            const email = props.state1.location.state.email;
            const name = props.state1.location.state.name;
            const lastname = props.state1.location.state.lastname;
            const password = props.state1.location.state.password;
        
            var res = await axios.post(`http://localhost:5000/RegisterUser2/${idCard}/${phone}/${email}/${name}/${lastname}/${password}`)
            console.log(res)
            if(res.statusText === "OK"){
            exito=exito+1;
            }
        
            const cardNumber = props.state.cardNumber;
            const bank = props.state.bank;
            const numberAccount = props.state.numberAccount;
            res = await axios.post(`http://localhost:5000/RegisterUser2_2/${cardNumber}/${phone}/${bank}/${numberAccount}`)
            console.log(res)
            if(res.statusText === "OK"){
            exito=exito+1;
            }
        
            const lat = props.state1.location.state.latitude;
            const lng = props.state1.location.state.length;
            const address = props.state1.location.state.completeAddress;
            const city = props.state1.location.state.city;
            const depto = props.state1.location.state.depto;
        
            res = await axios.post(`http://localhost:5000/RegisterUser2_3/${phone}/${lat}/${lng}/${address}/${city}/${depto}`)
            console.log(res)
            if(res.statusText === "OK"){
            exito=exito+1;
            }
        
            if(exito === 3){
            alert('Registro exitoso');
            props.state1.history.push({pathname: "/auth/"})
            }else{
            const credit=0;
            res = await axios.post(`http://localhost:5000/RegisterUser2_5/delete/${phone}/${cardNumber}/${credit}`)
            alert('No se ha podido realizar el registro, por favor intente de nuevo');
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
            <Button variant="contained" color="primary" onClick={finalRegister}>
                    Finalizar
            </Button>
        </div>
            <Snackbar open={props.open} autoHideDuration={9000} onClose={handleClose}>
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
