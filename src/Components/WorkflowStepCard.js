import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { Table, Card, Button, Container, Form, Col, Row, Jumbotron } from 'react-bootstrap'


class WorkflowStepCard extends Component {


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

        const { stepName } = this.props;

        return (
            <Card style={{ width: '17rem' }}>
            <Card.Body style={this.statusColour(workflow, stepName)}>
                <Card.Title>Step Card</Card.Title>
                <Card.Text>
                {workflow.stepStatusMap[stepName] || "Not Run"}
                <p>{workflow.processResultMap[stepName] && workflow.processResultMap[stepName].message}</p>

                <table>
                    <tbody>
                    { workflow && workflow.rules && workflow.processResultMap[stepName] && workflow.processResultMap[stepName].rules.map(p => (
                        <tr key={p.ruleResultId}>
                            <td>{p.ruleCode}</td>
                            <td>{p.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </Card.Text>
            </Card.Body>
        </Card>
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
        //saveWorkflow: (workflow) => dispatch(saveWorkflow(workflow))
        //setAppGuid: (guid) => dispatch(setApplicationGuid(guid))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkflowStepCard));