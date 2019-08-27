import React, { Component } from 'react';
import axios from 'axios'
import { Table, Card, Button, Container, Form, Col, Row, Jumbotron } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { setApplicationGuid } from '../actions/application.actions'
import Status from './Status'
import styled from 'styled-components'
import ProcessCard from './ProcessCard'

const Green = styled.div`
 background-colour: green
`

class Workflow extends Component {
    state = {
        status: 'unknown',
        workflow: null
     }

    // componentWillReceiveProps = props => {
    //     console.log("props", this.props)
    //     const identifier = props.identifier;
    //     axios.get("http://localhost:50205/api/workflow/" + identifier).then(response => {console.log(response); this.setState({workflow: response.data})})
    // }

    componentDidMount(){
        console.log("props2", this.props)

        const {identifier} = this.props.match.params

        axios.get("https://localhost:44316/api/workflow/" + identifier).then(response => {console.log(response); this.setState({workflow: response.data})})
        //const identifier = props.identifier;
    }

    statusColour(workflow, stepName) {
        const status = workflow.stepStatusMap[stepName];
        switch(status){
            case "Succeeded":
                return {backgroundColor:"#8BC341"}
                case "Failed":
                return {backgroundColor:"red"}
            default:
                return {backgroundColor:"white"}
        }
    }

    render() {

        const workflow = this.state.workflow;
        console.log("The workflow dto", this.state.workflow)
        if (workflow === null || workflow.processResults == null || workflow.processResultMap == null)
        {
            return (<h2>Loading</h2>)
        }

        var app = workflow.application;

        return (
        <div>
            <Status status={workflow.identifier}></Status>


                <h1>{app.company}</h1>
                <hr />

            <Row>
            <Col sm={4}>
                <Table striped bordered size="sm">
                    <thead>
                    <th>Field</th>
                    <th>Value</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Applicant</td>
                            <td>{app.firstName} {app.lastName}</td>
                        </tr>
                        <tr>
                            <td>Revenue</td>
                            <td>{app.revenue}</td>
                        </tr>
                        <tr>
                            <td>Number of Direcctors</td>
                            <td>{app.numberOfDirectors}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{app.email}</td>
                        </tr>
                        <tr>
                            <td>Sic Code</td>
                            <td>{app.sicCode}</td>
                        </tr>
                    </tbody>
                    </Table>

                </Col>
            </Row>
            <Row>
                <Card style={{ width: '16rem' }}>
                    <Card.Body style={this.statusColour(workflow, "StartLoan") }>
                        <Card.Title>Completed Application</Card.Title>
                        <Card.Text>
                        {workflow.stepStatusMap["StartLoan"]}
                        <p>{workflow.processResultMap["StartLoan"].message}</p>
                        </Card.Text>
                        <Link to={'/apply'}>
                            <Button variant="primary">View Info</Button>
                        </Link>

                    </Card.Body>
                </Card>
                <Card style={{ width: '16rem' }}>
                    <Card.Body style={this.statusColour(workflow, "Boundary")}>
                        <Card.Title>Boundary Model</Card.Title>
                        <Card.Text>
                        {workflow.stepStatusMap["Boundary"]}
                        <p>{workflow.processResultMap["Boundary"] && workflow.processResultMap["Boundary"].message}</p>
                        </Card.Text>
                        <Link to={'/apply'}>
                            <Button variant="primary">View Info</Button>
                        </Link>

                    </Card.Body>
                </Card>
            <Card style={{ width: '16rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body style={this.statusColour(workflow, "SubmitCompanyInfoToRdc") }>
                        <Card.Title>RDC Status</Card.Title>
                        <Card.Text>
                            {workflow.stepStatusMap["SubmitCompanyInfoToRdc"]}
                            <p>{workflow.processResultMap["SubmitCompanyInfoToRdc"] && workflow.processResultMap["SubmitCompanyInfoToRdc"].message}</p>
                        </Card.Text>
                        <Link to={'/apply'}>
                            <Button variant="primary">View Info</Button>
                        </Link>

                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body style={this.statusColour(workflow, "CompaniesHouseRules")}>
                        <Card.Title>Companies House</Card.Title>
                        <Card.Text>
                        {workflow.stepStatusMap["CompaniesHouseRules"] || "Not Run"}
                        <p>{workflow.processResultMap["CompaniesHouseRules"] && workflow.processResultMap["CompaniesHouseRules"].message}</p>
                        </Card.Text>
                        <Link to={'/apply'}>
                            <Button variant="primary">View Info</Button>
                        </Link>

                    </Card.Body>
                </Card>
                </Row>

                <br />


                <Table class="table" size="sm">
                    <thead>
                    <th>Id</th>
                    <th>Step</th>
                    <th>Status</th>
                    <th>Message</th>
                    </thead>
                    <tbody>
                            { workflow.processResults && workflow.processResults.map(p => (
                                <tr key={p.processResultId}>
                                    <td>{p.processResultId}</td>
                                    <td>{p.stepName}</td>
                                    <td><div>{p.status}<Status /></div></td>
                                    <td>{p.message}</td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>

                        <br />
                <Table class="table" size="sm">
                    <thead>
                    <th>Id</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Weighting</th>
                    <th>Status</th>
                    <th>Message</th>
                    </thead>
                    <tbody>
                            { workflow.rules && workflow.rules.map(p => (
                                <tr key={p.ruleResultId}>
                                    <td>{p.ruleResultId}</td>
                                    <td>{p.ruleCode}</td>
                                    <td>{p.rulesetName}</td>
                                    <td>{p.weighting}</td>
                                    <td>{p.status}</td>
                                    <td>{p.message}</td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state - applications', state.applications)
    return {
        //guid: state.applications.guid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //setAppGuid: (guid) => dispatch(setApplicationGuid(guid))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Workflow));