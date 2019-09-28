import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { Table, Card, Button, Container, Form, Col, Row, Jumbotron } from 'react-bootstrap'
import { race } from 'q';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";


class WorkflowStepCard extends Component {


    statusColour(workflow, stepName) {
        const status = workflow.stepStatusMap[stepName];
        switch(status){
            // case "Succeeded":
            //     return {backgroundColor:"#8BC341"}
            //     case "Failed":
            //     return {backgroundColor:"red"}
            default:
                return {backgroundColor:"white"}
        }
    }

    stepStatusIcon(stepStatus, stepName) {
        switch(stepStatus){
            case "Succeeded":
                 return <><FaCheckCircle size={28} color='#8BC341' /> {stepName}</>
            case "Failed":
                 return <><FaTimesCircle size={28} color='red' /> {stepName}</>
            default:
                return <><FaCheckCircle size={28} color='#8BC341' /> {stepName}}</>//{backgroundColor:"white"}
        }
    }

    render() {

        const workflow = this.props.workflow;

        const { stepName } = this.props;

        let rules;

        if(workflow.rules.length > 0){
                            
            rules = (<table>
            <tbody>
            { workflow && workflow.rules && workflow.processResultMap[stepName] && workflow.processResultMap[stepName].rules.map(p => (
                <tr key={p.ruleResultId}>
                    <td>{p.ruleCode}</td>
                    <td>{p.message}</td>
                    <td>{p.status}</td>
                </tr>
            ))}
            </tbody>
            </table>)
        }
        else{
            rules = ("No rules")
        }

        const stepStatus  = workflow.stepStatusMap[stepName];

        return (
            <Card style={{ width: '100%' }}>
            <Card.Body style={this.statusColour(workflow, stepName)}>
                <Card.Title style={{ backgroundColor: '#f0f3f7', padding: '10px'}}>
                    {this.stepStatusIcon(stepStatus, stepName)}
                </Card.Title>
                
                <Card.Text style={{border: '1px solid gray', padding: '10px'}}>
                {workflow.stepStatusMap[stepName] || "Not Run"}
                <p>{workflow.processResultMap[stepName] && workflow.processResultMap[stepName].message}</p>

                {rules}

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