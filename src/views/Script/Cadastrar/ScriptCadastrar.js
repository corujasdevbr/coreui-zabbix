import React, { useEffect } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row,
  FormGroup,
  Input,
  Label,
  Button,
  Form
} from 'reactstrap';
import ScriptListagem from '../Listagem/ScriptListagem';
import styled from 'styled-components';
import api from '../../../services/api';

const div = styled.div`
  text-align : right
`;


function ScriptCadastrar() {

  const [command, setCommand] = React.useState('');
  const [name, setName] = React.useState('');
  const [confirmation, setConfirmation] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [execute_on, setExecute_on] = React.useState(2);
  const [groupid, setGroupid] = React.useState(0);
  const [host_access, setHost_access] = React.useState(2);
  const [type, setType] = React.useState(0);
  const [usrgrpid, setUsrgrpid] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const submit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const objScript = {
      command: command,
      name: name,
      confirmation: confirmation,
      description: description,
      execute_on: execute_on,
      groupid: groupid,
      host_access: host_access,
      type: type,
      usrgrpid: usrgrpid
    }

    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "script.create",
      "params": objScript,
      "auth": token,
      "id": 1
    })
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          if (data.data.error !== null) {
            setMessage(data.data.error.data);
          } else {
            setMessage('Script Cadastrado com sucesso');
          }
        }
      })
      .catch(erro => {
        console.error(erro)
        setMessage('Ocorreu um erro, contacte o administrador do sistema');
      }).finally(() => {
        setIsLoading(false);
      })

    console.log(objScript);
  }



  return (
    <div className="animated fadeIn">
      <Row>

        <Col xs="12" lg="12">
          <Form onSubmit={submit}>
            <Card>
              <CardHeader>
                Script Cadastrar
            </CardHeader>
              <CardBody>
                <Row>

                  <Col xs="6" sm="6">

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="Nome">Nome* </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" value={name} name="name" placeholder="Informe o nome do comando" onChange={e => setName(e.target.value)} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="vat">Comando*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" value={command} name="command" onChange={e => setCommand(e.target.value)} placeholder="Informe o comando" required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="street">Confirmação</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" value={confirmation} onChange={e => setConfirmation(e.target.value)} name="confirmation" placeholder="Mensagem de confirmação" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="textarea-input">Descrição</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="textarea" name="description" onChange={e => setDescription(e.target.value)} value={description} rows="9"
                          placeholder="Descrição do script..." />
                      </Col>
                    </FormGroup>

                  </Col>
                  <Col xs="6" sm="6">

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Execute On</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="execute_on" onChange={e => setExecute_on(e.target.value)} value={execute_on}>
                          <option value="2" defaultValue>run on Zabbix server (proxy)</option>
                          <option value="1">run on Zabbix server</option>
                          <option value="0"> run on Zabbix agent</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Host Access</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="host_access" onChange={e => setHost_access(e.target.value)} value={host_access}>
                          <option value="2" defaultValue>read</option>
                          <option value="3" >write</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Type</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="type" onChange={e => setType(e.target.value)} value={type}>
                          <option value="0" defaultValue>script</option>
                          <option value="1" >IPMI</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Group</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="groupid" onChange={e => setGroupid(e.target.value)} value={groupid}>
                          <option value="0" defaultValue>Default</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">User Group</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="usrgrpid" onChange={e => setUsrgrpid(e.target.value)} value={usrgrpid}>
                          <option value="0" defaultValue>Default</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup >
                      {
                        message !== '' && (
                          <p>{message}</p>
                        )
                      }
                      <Button type="submit" color="primary" disabled={isLoading ? true : false}><i className="fa fa-dot-circle-o"></i> {isLoading ? "Ennviado..." : "Cadastrar"}</Button>
                      {/* <Button type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
                    </FormGroup>
                  </Col>

                </Row>
              </CardBody>
            </Card>
          </Form>
        </Col>

      </Row>
      <Row>
        <ScriptListagem colxs='12' collg='12'></ScriptListagem>
      </Row>
    </div >
  );
}

export default ScriptCadastrar;
