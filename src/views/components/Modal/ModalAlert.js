import React, { useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Col, Label } from 'reactstrap';




function ModalAlert(props) {


    const toTimestamp = (time) => {
        var date = new Date(time * 1000); // converte para data
        return date.toLocaleDateString("pt-BR"); //formata de acordo com o requisito
    }

    useEffect(() => {

    }, [])

    return (
        <Modal isOpen={props.isOpen} toggle={() => props.toggleSmall()}
            className='modal-lg '>
            <ModalHeader toggle={props.toggleSmall}>Alerta {props.data.alertid}</ModalHeader>
            <ModalBody>
                <Form className="form-horizontal">
                    <FormGroup row>
                        <Col md="3">
                            <Label>Id</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{props.data.alertid}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label>Subject</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{props.data.subject}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label>Message</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{props.data.message}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label>Data</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{toTimestamp(props.data.clock)}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label>Host</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{props.data.hosts !== undefined ? props.data.hosts.map(item => { return item.host }) : ''}</p>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => props.toggleSmall()}>Fechar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalAlert;