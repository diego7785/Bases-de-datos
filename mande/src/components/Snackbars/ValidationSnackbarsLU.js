import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe llenar los campos celular y contraseña",
                "Celular o contraseña incorrectas"];
var verifications = [true,true];

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarLU(props) {

   const onHandleNext = async () =>
    {
        verifications = [true,true];
        const phone = parseInt(props.state.phone);
        const phoneI = props.state.phone;
        const pass = props.state.pass;

        var emptyFields=true;
        if(validations.emptyField(phoneI) || validations.emptyField(pass))
        {
            verifications[0]=false;
            props.onHandleChange('open', true);
            emptyFields=false;
        }

        else
        {
            const res = await axios.get(`http://localhost:5000/LoginAsUser/${phone}/${pass}/`)
            if(emptyFields && (false === res.data[0]))
            {
                verifications[1]=false;
                props.onHandleChange('open', true);
            }
            if(res.data[0])
            {
                const res1 = await axios.get(`http://localhost:5000/GetUserInfo/${phone}/`)
                const userInfo = res1.data
                const res2 = await axios.get(`http://localhost:5000/GetUserAddressInfo/${phone}/`)
                const addressInfo = res2.data
                const res3 = await axios.get(`http://localhost:5000/GetCreditCardInfo/${phone}/`)
                const creditCardInfo = res3.data
                const res4 = await axios.get(`http://localhost:5000/GetDebitCardInfo/${phone}/`)
                const debitCardInfo = res4.data
                const res5 = await axios.get(`http://localhost:5000/GetJobsWithWorker/${'jobs'}`)
                var dutiesWithWorker=[];
                for(var i=0; i<res5.data.length; i++){
                    dutiesWithWorker.push({code: res5.data[i].labor_nombre, label: res5.data[i].labor_nombre});
                }

                var paymentMethod;
                var type;
                console.log(userInfo)
                console.log(addressInfo)
                if(debitCardInfo === "" ){
                    paymentMethod=creditCardInfo;
                    type='Credito'
                } else{
                    paymentMethod=debitCardInfo;
                    type='Debito'
                }
                console.log(paymentMethod)

                const res6 = await axios.get(`http://localhost:5000/GetJobsNoStars/${userInfo.celular_usuario}`)
                const servicioNoCal = res6.data[0];
                const res7 = await axios.get(`http://localhost:5000/GetCalificacionesTotalesUser/${phone}`)
                const calificacionesTotales = res7.data[0];
                const res8 = await axios.get(`http://localhost:5000/GetTrabajosTotalesUser/${phone}`)
                const trabajosTotales = res8.data[0];

                props.props.history.push({
                    pathname: "/client/", state: {
                    idCard: res.data[1],
                    userInfo: userInfo,
                    addressInfo: addressInfo,
                    paymentMethod: paymentMethod,
                    type: type,
                    wjobs: dutiesWithWorker,
                    servicio : servicioNoCal,
                    calificacionesTotales : calificacionesTotales,
                    trabajosTotales : trabajosTotales,
                    }
                })
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
            <Button variant="contained" color="primary" onClick={onHandleNext}>
                    Ingresar
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
