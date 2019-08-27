import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-redux'

const ProcessCard = ({status, complete}) => {
    
        return (
    <Card style={{ width: '18rem' }}>
<   Card.Body style={complete ? {backgroundColor:"#8BC34A"} : {backgroundColor:"white"} }>
        <Card.Title>Companies House</Card.Title>
        <Card.Text>
        Ruleset results: {status}
        </Card.Text>
        <Link to={'/apply'}>
            <Button variant="primary">View Info</Button>
        </Link>
       
        </Card.Body>
    </Card>
    )
}

export default ProcessCard