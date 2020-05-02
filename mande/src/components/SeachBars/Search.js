import React from "react";
import Button from '@material-ui/core/Button';

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


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNav: 1,
            chartExample1Data: "data1",
            search: ''
        };
    }

    buscar = (e) => {
        //this.state({username: e.target.value});
        e.preventDefault();
        this.setState({search: e.target.value})
        console.log(e.target.value);
    }

    render() {

        return (
            <>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col xl="5">
                            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" onChange={this.buscar} onSubmit={e => { this.buscar(e) }} >
                                <FormGroup className="mb-0">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-search" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Busca trabajadores" name="busca" type="text" style={{ width: 600 }} ref={this.buscaRef} />
                                    </InputGroup>
                                </FormGroup>
                                <div style = {{marginTop: 15}}>
                                    <AdvancedSearchBar />
                                </div>
                                
                            </Form>
                            
                            <Col style ={{marginTop: 0}}>
                                <Button type="submit" variant="contained" color="primary" style={{ marginLeft: 0 }} >
                                    Buscar
                            </Button>
                                <Button variant="contained" color="secondary" style={{ marginLeft: 20 }}>
                                    Busqueda avanzada
                            </Button>
                            </Col>
                        </Col>
                        
                    </Row>
                    <Row style={{ marginTop: 40 }}>
                        <Col xl="7" md="6">
                        </Col>
                    </Row>
                    
                </Container>
                
            </>
        );
    }
}

export default SearchBar;