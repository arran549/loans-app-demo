import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { Table, Card, Button, Container, Form, Col, Row, Jumbotron } from 'react-bootstrap'
import { race } from 'q';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ViewNotes from './ViewNotes';


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
        console.log('Workflow', workflow)
        const { stepName } = this.props;

        let rules;
        let rules2;

        let processResult = workflow.processResultMap[stepName]

        if(workflow.rules.length > 0){
                        
            rules2 = (
                <Table class="table" size="sm">
                <thead>
                <th>Id</th>
                <th>Code</th>
                <th>Weighting</th>
                <th>Message</th>
                <th>Status</th>
                </thead>
                <tbody>
                        { workflow && workflow.rules && workflow.rules.map(p => (
                            <tr key={p.ruleResultId}>
                                <td>{p.ruleResultId}</td>
                                <td>{p.ruleCode}</td>
                                <td>{p.weighting}</td>
                                <td>{p.message}</td>
                                <td>{p.status}</td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            )
        }
        else{
            rules = ("No rules")
        }

        const stepStatus = workflow.stepStatusMap[stepName] || "Not Run";

        return (
            <Card style={{ width: '100%' }}>
            <Card.Body style={this.statusColour(workflow, stepName)}>
                <Card.Title style={{ backgroundColor: '#f0f3f7', padding: '10px'}}>
                    {this.stepStatusIcon(stepStatus, stepName)} 
                </Card.Title>
                
                <Card.Text style={{border: '1px solid gray', padding: '10px'}}>
                <ViewNotes title={stepName} notes={processResult.processingNotes}/>
                <p>{workflow.processResultMap[stepName] && workflow.processResultMap[stepName].message}</p>
                

                {rules2}

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