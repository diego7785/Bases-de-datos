import React from "react";
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// reactstrap components
import {
    Container,
    Form,
    FormGroup,
    Row,
    Col,
} from "reactstrap";

import AdvancedSearchBar from "./AdvanceSearch"

const style = {
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: 'white',
    minWidth: 200,
    width: 800,
};

class SearchBar extends React.Component {

    state = {
        advancedSearch: false,
        search: '',
        jobs: this.props.jobs,
    };

    buscar = (e) => {
        //accion del boton para buscar
    }

    openAdvancedSearch = () => {
        this.setState({ advancedSearch: !this.state.advancedSearch });
    }

    handleChange = (e) => {
        console.log("hey");
        this.setState({search: e.target.value});
        console.log(this.state.search);
    }

    render() {

        return (
            <>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col xl="5">
                            <div>{this.state.search}</div>
                            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" onChange={e => this.handleChange(e)}>
                                <FormGroup className="mb-0">
                                    <Autocomplete
                                        id="jobs-selection"
                                        style={style}
                                        options={this.state.jobs}
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
