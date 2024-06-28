import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ConfirmModalProps {
    title: string, 
    content: string, 
    show: any, 
    onAction: any
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({title, content, show, onAction}) => {
    return (
        <Modal show={show} backdrop='static' onHide={() => onAction('close')}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction('MODAL_ACTION_CLOSE')}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onAction('MODAL_ACTION_CONFIRM')}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal