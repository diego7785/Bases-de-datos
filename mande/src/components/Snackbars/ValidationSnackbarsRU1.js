import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe enviar todas las fotos requeridas",
                "Imágenes cargadas correctamente",
                "Fallo ocurrido al cargar las imágenes"
];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}

function Alert(props)
{
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarRUI(props) {
    const onClickNext = async() => {
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }
        if(validations.diferentType(props.state.front,'object') || validations.diferentType(props.state.back,'object')
        || validations.diferentType(props.state.profilepic,'object') || validations.diferentType(props.state.bill,'object'))
        {
            verifications[0] = false;
            await props.onHandleChange('open', true);
        }

        if(typeof(props.state.front)=== 'object' && typeof(props.state.back) === 'object' && typeof(props.state.profilepic)=== 'object' && typeof(props.state.bill) === 'object')
        {
            var cont = 0;
            var data = new FormData()
            data.append('file', props.state.bill)
            var res = await axios.post("http://localhost:5000/RegisterUser1/images?idCard="+props.props.location.state.idCard+"&type=recibo&user=client", data, {})
            if(res.status === 200){
                cont=1;
            }

            data = new FormData()
            data.append('file', props.state.front)
            res = await axios.post("http://localhost:5000/RegisterUser1/images?idCard="+props.props.location.state.idCard+"&type=front&user=client", data, {})
            if(res.status === 200){
                cont++;
            }
            data = new FormData()
            data.append('file', props.state.back)
            res = await axios.post("http://localhost:5000/RegisterUser1/images?idCard="+props.props.location.state.idCard+"&type=back&user=client", data, {})
            if(res.status === 200){
                cont++;
            }

            data = new FormData()
            data.append('file', props.state.profilepic)
            res = await axios.post("http://localhost:5000/RegisterUser1/images?idCard="+props.props.location.state.idCard+"&type=profilepic&user=client", data, {})
            if(res.status === 200){
                cont++;
            }

            if(cont === 4){
                    alert(messages[1]);
                    props.props.history.push({
                        pathname: "/auth/RegisterUser2/", state: {
                            celular : props.props.location.state.celular,
                            name : props.props.location.state.name,
                            lastname: props.props.location.state.lastname,
                            email : props.props.location.state.email,
                            idCard: props.props.location.state.idCard,
                            password : props.props.location.state.password,
                            passwordR : props.props.location.state.passwordR,
                            address : props.props.location.state.address,
                            complemento: props.props.location.state.complemento,
                            profilepic :  props.state.profilepic,
                            front : props.state.front,
                            back :  props.state.back,
                            bill : props.state.bill,
                            latitude : props.props.location.state.latitude,
                            length : props.props.location.state.length,
                        }
                    })
                }
                else{
                    alert(messages[2]);
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
            <Button variant="contained" color="primary" onClick={onClickNext}>
                    Siguiente
            </Button>
        </div>
            <Snackbar open={props.state.open} autoHideDuration={9000} onClose={handleClose}>
                <Alert onClose={handleClose} severity= "error" >
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
