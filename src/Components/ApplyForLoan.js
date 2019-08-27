import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Container, Form, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { setApplicationGuid } from '../actions/application.actions'

class ApplyForLoan extends Component {
    state = { 
        status: 'unknown'
     }

    apply = () => {

        const { firstName, lastName, email, password, company }  = this.state
        const { guid } = this.props
        const application =  {
            guid,
            firstName,
            lastName,
            company,
            email,
            password
        }

        axios.post("http://localhost:50205/api/application/apply", application).then(response => {console.log(response);})
        
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      componentDidMount(){
          this.props.setAppGuid(uuid())
      }

    render() {

        const status = this.state.status;
        const identifier = this.props.guid

        return (
            <Container>
                <p>ApplicationId: {identifier}</p>
                <hr />
                <Form>
                    <Form.Group controlId="formCompany">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="Company" name="company" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Row>
                    <Form.Group as={Col}controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" name="firstName" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            You must be the company director!
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name="lastName" onChange={this.handleChange}/>
                    </Form.Group>
                    </Form.Row>
          
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="my@email.com" name="email" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="form">
                        <Form.Check type="checkbox" label="Accept Terms and Conditions" />
                    </Form.Group>
                    <Link to={'/companyDetails'}>
                        <Button variant="primary" onClick={this.apply} type="submit">Apply Now!</Button>
                    </Link>
                </Form>
               
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state - applications', state.applications)
    return {
        guid: state.applications.guid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAppGuid: (guid) => dispatch(setApplicationGuid(guid))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplyForLoan));