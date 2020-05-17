import React from "react";
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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

    onHandleSearch = async () => {
      const workersToSearch = this.state.search;
      const idCard = this.props.idCard;
      const res = await axios.get(`http://localhost:5000/SearchWorkers/${workersToSearch}/${idCard}`)
      this.props.onHandleChange('results', res)
      this.props.onHandleChange('openResults', true)
      console.log(this.props)
    }

    openAdvancedSearch = () => {
        this.setState({ advancedSearch: !this.state.advancedSearch });
    }

    handleChange = (id, e) => {
        this.setState({[id]: e});
    }

    render() {

        return (
            <>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col xl="5">
                            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
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
                                        onChange={e => this.handleChange('search',e.target.innerText)}
                                    />
                                </FormGroup>
                                {this.state.advancedSearch ?
                                    <div style={{ marginTop: 15 }}><AdvancedSearchBar state={this.state} onHandleChange={this.handleChange} idCardU={this.props.idCard}/></div> :
                                    <div style={{ marginTop: 15 }}> </div>}
                            </Form>
                            <div className='text-center'>
                            <Col style={{ marginTop: 10 }}>
                                <Button variant="contained" color="primary" type="button" style={{ marginLeft: 0 }} onClick={this.onHandleSearch}>
                                    Buscar
                            </Button>
                                <Button variant="contained" color="secondary" style={{ marginLeft: 20 }} onClick={this.openAdvancedSearch} >
                                    Busqueda avanzada
                            </Button>
                            </Col>
                          </div>
                        </Col>
                    </Row>
                </Container>

            </>
        );
    }
}

export default (SearchBar);
