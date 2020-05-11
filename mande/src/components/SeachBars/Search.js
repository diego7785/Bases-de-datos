import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// reactstrap components
import {
    Container,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Row,
    Col,
} from "reactstrap";

import AdvancedSearchBar from "./AdvanceSearch"

const useStyles = makeStyles({
    root: {
        width: 300
    },
});

const labores = [{ code: "Profesor de ingles", label: "Profesor inglés" },
{ code: "Paseador de perros", label: "Paseador de perros" },
{ code: "Profesor de matematicas", label: "Profesor de matemáticas" },
{ code: "Plomero", label: "Plomero" },
{ code: "Electricista", label: "Electricista" },];


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advancedSearch: false,
            search: ''
        };
    }

    buscar = (e) => {
        //this.state({username: e.target.value});
        e.preventDefault();
        this.setState({ search: e.target.value })
        console.log(e.target.value);
    }

    openAdvancedSearch = () => {
        this.setState({ advancedSearch: !this.state.advancedSearch });
    }

    render() {

        return (
            <>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col xl="5">
                            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" onChange={this.buscar} onSubmit={e => { this.buscar(e) }} >
                                <FormGroup className="mb-0">
                                    <Autocomplete
                                        id="jobs-selection"
                                        style={{ minWidth: 200, width: 600, borderColor: 'white', textEmphasisColor: 'white '}}
                                        options={labores}
                                        autoHighlight
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(option) => (
                                            <React.Fragment>
                                                {option.label}
                                            </React.Fragment>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Escoja una labor"
                                                variant="outlined"

                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </FormGroup>
                                {this.state.advancedSearch ?
                                    <div style={{ marginTop: 15 }}><AdvancedSearchBar /></div> :
                                    <div style={{ marginTop: 15 }}> </div>}
                            </Form>
                            <Col style={{ marginTop: 10 }}>
                                <Button type="submit" variant="contained" color="primary" style={{ marginLeft: 0 }} >
                                    Buscar
                            </Button>
                                <Button variant="contained" color="secondary" style={{ marginLeft: 20 }} onClick={this.openAdvancedSearch} >
                                    Busqueda avanzada
                            </Button>
                            </Col>
                        </Col>
                    </Row>
                </Container>

            </>
        );
    }
}

export default (SearchBar);