import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe llenar los campos cédula y contraseña",
                "Cédula o contraseña incorrectas"];
var verifications = [true,true];

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarLW(props) {
    const onHandleNext = async () =>
    {
        verifications = [true,true];
        const idCard = parseInt(props.state.idCard);
        const idCardI = props.state.idCard;
        const pass = props.state.pass;

        var emptyFields=true;
        if(validations.emptyField(idCardI) || validations.emptyField(pass))
        {
            verifications[0]=false;
            props.onHandleChange('open', true);
            emptyFields=false;
        }

        else
        {
            const res = await axios.get(`http://localhost:5000/LoginAsWorker/${idCard}/${pass}/`);
            if(emptyFields && (false === res.data))
            {
                verifications[1]=false;
                props.onHandleChange('open', true);
            }
            if(res.data)
            {
                const res1 = await axios.get(`http://localhost:5000/GetWorkerInfo/${idCard}/`);
                const workerInfo = res1.data[0];
                const res2 = await axios.get(`http://localhost:5000/GetAddressInfo/${idCard}/`);
                const addressInfo = res2.data[0];
                const res3 = await axios.get(`http://localhost:5000/GetRealizaInfo/${idCard}/`);
                const realizaInfo = res3.data;
                const res4 = await axios.get(`http://localhost:5000/GetAccountInfo/${idCard}/`)
                const accountInfo = res4.data[0];
                const res5 = await axios.get(`http://localhost:5000/GetBusyInfo/${idCard}`)
                const busyInfo = res5.data[0];
                const res6 = await axios.get(`http://localhost:5000/ScoreAverageWorker/${idCard}/`)
                const scoreAvg = res6.data;
                console.log(scoreAvg);
                const res7 = await axios.get(`http://localhost:5000/GetSolicitudesLabor/${idCard}`)
                const solicitudes = res7.data;

                props.props.history.push({
                    pathname: "/worker/", state: {
                    idCard: props.state.idCard,
                    workerInfo : workerInfo,
                    addressInfo : addressInfo,
                    realizaInfo : realizaInfo,
                    accountInfo : accountInfo,
                    busyInfo : busyInfo,
                    solicitudes: solicitudes,
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
