import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe llenar todos los campos",
                "Número de tarjeta no puede contener letras, ni símbolos",
                "Número de tarjeta debe tener 16 dígitos",
                "Número de cuenta no puede contener letras, ni símbolos",
                "Número de cuenta debe tener entre 10 y 20 dígitos",
                "Otro usuario tiene registrado esa tarjeta de débito"
            ];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarRUDeb(props)
{
    const finalRegister = async () =>
    {
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }
        console.log(props);
        var cont=0;
        var emptyFields=true
        if (validations.emptyField(props.props.cardNumber) || validations.emptyField(props.props.numberAccount)
           || validations.diferentType(props.props.bank, 'string'))
        {
            verifications[0]=false;
            cont++;
            emptyFields=false;
        }
        if(emptyFields && (false === validations.isNumber(props.props.cardNumber)))
        {
            verifications[1]=false;
            cont++;
        }
        if(emptyFields && (false === validations.validSizeEq(props.props.cardNumber,16)))
        {
            verifications[2]=false;
            cont++;
        }
        if(emptyFields && (false === validations.isNumber(props.props.numberAccount)))
        {
            verifications[3]=false;
            cont++;
        }
        if(emptyFields && (props.props.numberAccount.length < 10 || props.props.numberAccount.length > 20 ) )
        {
            verifications[4]=false;
            cont++;
        }

        if (cont >0)
        {
            props.onHandleChange('open', true);
        }

        else
        {
            const validateCard = await axios.get(`http://localhost:5000/validateDebitCardExistence/${props.props.cardNumber}/`)
            console.log(validateCard);
            if(validateCard.data[0].validatedebitcarduser)
            {
                verifications[5]=false;
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
                console.log(props);
                const cardNumber = props.props.cardNumber;
                const bank = props.props.bank;
                const numberAccount = props.props.numberAccount;
                res = await axios.post(`http://localhost:5000/RegisterUser2_2/${cardNumber}/${phone}/${bank}/${numberAccount}`)
                console.log(res)
                if(res.statusText === "OK"){
                exito=exito+1;
                }

                const lat = props.state1.location.state.latitude;
                const lng = props.state1.location.state.length;
                const address = props.state1.location.state.address;
                const complemento = props.state1.location.state.complemento;

                res = await axios.post(`http://localhost:5000/RegisterUser2_3/${phone}/${lat}/${lng}/${address}/${complemento}`)
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
            <Button variant="contained" color="primary" onClick={finalRegister}>
                    Finalizar
            </Button>
        </div>
            <Snackbar open={props.props.open} autoHideDuration={9000} onClose={handleClose}>
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
