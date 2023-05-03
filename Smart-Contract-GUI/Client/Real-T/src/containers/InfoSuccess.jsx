// import { Modal } from "bootstrap";
import React from 'react';
import Modal from 'react-bootstrap/Modal'


export default class InfoSuccess extends React.Component {

    render() {
        return (
            <Modal dialogClassName="InfoSuccess text-center"
                show={this.props.visible}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {/* <CheckCircle /> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    wordWrap: 'break-word',
                    paddingLeft: '2px',
                    paddingRight: '2px'
                }}>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.message}</p>
                    <button type="button" class="btn btn-secondary Cancel" onClick={this.props.close}>Close</button>
                </Modal.Body>
            </Modal >
        )
    }


}