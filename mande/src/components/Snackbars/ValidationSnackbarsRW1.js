import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const validations = require('../../validations/Verifications.js');

var messages = ["Debe escoger una labor",
                "Debe escoger un tipo de cobro",
                "Ponga una descripción de al menos 10 caracteres",
                "Establezca un precio a su labor"
];

var verifications = new Array(messages.length);
for (var i = 0; i < verifications.length; i++) {
    verifications[i] = true;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SnackbarJe(props) {
    const onHandleNext = () => {
        for (var i = 0; i < verifications.length; i++) {
            verifications[i] = true;
        }
        var cont = 0;

        if (props.state.job !==1 && props.state.job !==2 && props.state.job !==3 && props.state.job !==4 && props.state.job !==5 )
        {
            verifications[0] = false;
            cont++;    
        }
        if (typeof(props.state.type) !=='string')
        {
            verifications[1] = false;
            cont++;    
        }
        if(typeof(props.state.description) !='string' || props.state.description.length <10)
        {
            verifications[2] = false;
            cont++; 
        }
        if(props.state.price.length === 0 || props.state.price ===true)
        {
            verifications[3] = false;
            cont++; 
        }

        if (cont >0)
        {
            props.onHandleChange('open', true);
        }

        else{
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
            completeAddress : props.props.location.state.completeAddress,
            password : props.props.location.state.password,
            passwordR : props.props.location.state.passwordR,
            depto : props.props.location.state.departamento,
            city : props.props.location.state.municipio,
            job : props.state.job,
            description : props.state.description,
            type : props.state.type,
            price : props.state.price,
            latitude : props.props.location.state.latitude,
            length : props.props.location.state.length,
          }
        })   
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