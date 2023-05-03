// import { Modal } from "bootstrap";
import React from 'react';
import Modal from 'react-bootstrap/Modal'


export default class PdfModal extends React.Component {

    render() {
        return (
            <Modal dialogClassName="InfoSuccess text-center"
                show={true}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{

                    overflow: 'hidden',
                    paddingLeft: '2px'
                }}>


                    <h4>Please Note....</h4>

                </Modal.Body>
            </Modal>
        )
    }


}