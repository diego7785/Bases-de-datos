import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe llenar todos los campos",
                "Número de tarjeta no puede contener letras, ni símbolos",
                "Número de tarjeta debe tener 16 dígitos",
                "CVC no puede contener letras, ni símbolos",
                "CVC debe contener 3 o 4 dígitos",
                "Mes de expiración no puede contener letras, ni símbolos",
                "Mes de expiración va de 01 a 12",
                "Año de expiración no puede contener letras, ni símbolos",
                "Año de expiración no puede contener años pasados",
                "Cédula no puede contener letras, ni símbolos",
                "Cédula debe tener entre 8 y 10 dígitos",
                "Otro usuario tiene registrado esa tarjeta de crédito"
            ];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarRUCred(props)
{
    const finalRegister = async () =>
    {
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }
        var emptyFields=true;
        var cont =0;
        if(validations.diferentType(props.props.bank, 'string') ||validations.emptyField(props.props.cardNumber)
          || validations.emptyField(props.props.cvc) || validations.emptyField(props.props.month) || validations.emptyField(props.props.year)
          || validations.emptyField(props.props.idCardCredit))
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
        if(emptyFields && (false === validations.isNumber(props.props.cvc)))
        {
            verifications[3]=false;
            cont++;
        }
        if(emptyFields && (props.props.cvc.length !== 3 && props.props.cvc.length !== 4))
        {
            verifications[4]=false;
            cont++;
        }
        if(emptyFields && (false === validations.isNumber(props.props.month)))
        {
            verifications[5]=false;
            cont++;
        }
        if(emptyFields && (props.props.month !== '01' && props.props.month !== '02' && props.props.month !== '03'
        && props.props.month !== '04' && props.props.month !== '05' && props.props.month !== '06' && props.props.month !== '07'
        && props.props.month !== '08' && props.props.month !== '09' && props.props.month !== '10' && props.props.month !== '11'
        && props.props.month !== '12'))
        {
            verifications[6]=false;
            cont++;
        }
        if(emptyFields && (false === validations.isNumber(props.props.year)))
        {
            verifications[7]=false;
            cont++;
        }
        if(emptyFields && (parseInt(props.props.year) < 20))
        {
            verifications[8]=false;
            cont++;
        }
        if(emptyFields && (false === validations.isNumber(props.props.idCardCredit)))
        {
            verifications[9]=false;
            cont++;
        }
        if(emptyFields && (props.props.idCardCredit.length < 8 || props.props.idCardCredit.length > 10 ))
        {
            verifications[10]=false;
            cont++;
        }
        if (cont >0)
        {
            props.onHandleChange('open', true);
        }

        else
        {
            console.log(props.props.cardNumber);
            const validateCard = await axios.get(`http://localhost:5000/validateCreditCardExistence/${props.props.cardNumber}/`)
            if(validateCard.data[0].validatecreditcarduser)
            {
                verifications[11]=false;
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

                const endDate = props.props.month+'-'+props.props.year;
                const cvc = props.props.cvc;
                const cardNumber=props.props.cardNumber;
                const bank=props.props.bank;
                res = await axios.post(`http://localhost:5000/RegisterCreditCard/${cardNumber}/${phone}/${bank}/${endDate}/${cvc}`)
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
                const credit=1;
                res = await axios.post(`http://localhost:5000/RegisterUser2_5/delete/${phone}/${cardNumber}/${credit}`)
                alert('No se ha podido realizar el registro, por favor intente de nuevo');
                }
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
