import React, {useState} from 'react'
import { Modal, Button} from 'react-bootstrap'

function ViewNotes(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow} style={{float: 'right'}}>
          Notes 
        </Button>
  
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}: Processing Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.notes.map((note) => (
              <>
                <p>{note.message}</p>
              </>
            ))}
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default ViewNotes