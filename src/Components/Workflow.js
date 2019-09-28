import React, { Component } from 'react';
import axios from 'axios'
import { Table, Card, Button, Container, Form, Col, Row, Jumbotron } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { setApplicationGuid, saveWorkflow } from '../actions/application.actions'
import Status from './Status'
import styled from 'styled-components'
import ProcessCard from './ProcessCard'
import { identifier } from '@babel/types';
import ViewNotes from '../Components/ViewNotes'
import WorkflowStepCard from './WorkflowStepCard'

const Green = styled.div`
 background-colour: green
`

class Workflow extends Component {
    state = {
        status: 'unknown'
     }

    // componentWillReceiveProps = props => {
    //     console.log("props", this.props)
    //     const identifier = props.identifier;
    //     axios.get("http://localhost:50205/api/workflow/" + identifier).then(response => {console.log(response); this.setState({workflow: response.data})})
    // }

    trigger(identifier){
        axios.post(`https://localhost:50705/api/workflow/${identifier}/run`).then(response => this.getWorkflow(identifier))
    }

    rdcPass(identifier){
        axios.post(`https://localhost:44316/api/application/rdc/company/result/${identifier}`, {
            "company": "IWC Ltd",
            "status": "NotAlerted",
            "alerts": []

        }).then(response => this.getWorkflow(identifier))
    }

    componentDidMount(){
        console.log("props2", this.props)

        const {identifier} = this.props.match.params

        this.getWorkflow(identifier);
        //const identifier = props.identifier;
    }

    getWorkflow(identifier){
        axios.get("http://localhost:50705/api/workflow/" + identifier).then(response => {console.log(response); this.props.saveWorkflow(response.data);})    }

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

        const workflow = this.props.workflow;
        console.log("The workflow dto", this.props.workflow)
        if (!workflow || workflow.processResults == null || workflow.processResultMap == null)
        {
            return (<h2>Loading</h2>)
        }

        var app = workflow.application;

        return (
        <div>
            <Status status={workflow.identifier}></Status>
            <Button onClick={() => this.trigger(workflow.identifier)} >Re-fire</Button>
            <Button onClick={() => this.rdcPass(workflow.identifier)} >RDC Result</Button>

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
                {workflow && workflow.stepStatusMap && Object.keys(workflow.stepStatusMap).map(stepName => (
                    <WorkflowStepCard stepName={stepName} />    
                ))}
            </Row>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state - applications', state.applications)
    return {
        workflow: state.applications.workflow//guid: state.applications.guid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveWorkflow: (workflow) => dispatch(saveWorkflow(workflow))
        //setAppGuid: (guid) => dispatch(setApplicationGuid(guid))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Workflow));