import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Container } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

class StartPage extends Component {
    state = { 
        status: 'unknown'
     }

    componentDidMount(){
        axios.get("http://localhost:50205/status").then(response => {console.log(response); this.setState({status: response.data})})
        
    }


    render() {

        const status = this.state.status;

        return (
            <Container>
                <Card>
                Hello World, { status }
                </Card>

                <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Apply for a loan today!</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Link to={'/apply'}>
                            <Button variant="primary">Apply Now!</Button>
                        </Link>
                       
                    </Card.Body>
                </Card>

                
            </Container>
        );
    }
}

export default StartPage;


