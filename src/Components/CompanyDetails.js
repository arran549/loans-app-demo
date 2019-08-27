import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Container, Form, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class CompanyDetails extends Component {
    state = {
        status: 'unknown'
     }

    submit = () => {

        const { revenue, sicCode, numDirectors }  = this.state
        const { guid } = this.props
        const application =  {
            guid,
            revenue,
            sicCode,
            numDirectors
        }

        axios.post("https://localhost:44316/api/application/companyDetails", application).then(response => {console.log(response);})

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      componentDidMount(){

      }

    render() {

        const status = this.state.status;
        const identifier = this.props.guid;

        return (
            <Container>
                <p>ApplicationId: {identifier}</p>
                <hr />
                <Form>
                    <Form.Group controlId="formCompany">
                        <Form.Label>Revenue</Form.Label>
                        <Form.Control type="number" placeholder="Revenue" name="revenue" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Row>
                    <Form.Group as={Col}controlId="formFirstName">
                        <Form.Label>Industry SIC Code</Form.Label>
                        <Form.Control type="text" placeholder="Sic Code" name="sicCode" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            You must be the company director!
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Number of Directors</Form.Label>
                        <Form.Control type="text" placeholder="No. directors" name="numDirectors" onChange={this.handleChange}/>
                    </Form.Group>
                    </Form.Row>

                    <Link to={'/companyDetails'}>
                        <Button variant="primary" onClick={this.submit} type="submit">Sumbit</Button>
                    </Link>
                </Form>

            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        guid: state.applications.guid
    }
}

const mapDispatchToProps = dispatch => {
    return {
       // setAppGuid: (guid) => dispatch(setAppGuid(guid))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyDetails));