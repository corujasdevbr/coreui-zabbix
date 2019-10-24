import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseJwt } from '../../../services/auth';
import api from '../../../services/api';

import logo from '../../../assets/img/brand/logo-blocktime.png'

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: null,
      senha: null,
      erroMensagem: '',
      isLoading: false
    }
  }

  HandlerChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  efetuaLogin(event) {
    event.preventDefault();
    this.setState({ isLoading: true, erroMensagem: "" });

    api.post("", {
      "jsonrpc": "2.0",
      "method": "user.login",
      "params": {
        "user": "senai2.2019",
        "password": "$3naI@2019!"
      },
      "id": 1,
      "auth": null
    })
      .then(data => {
        if (data.status === 200) {
          localStorage.setItem("auth-blocktime-zabbix", data.data.result);
          this.props.history.push("/admin/dashboard");
        }
      })
      .catch(erro => {
        this.setState({ isLoading: false });
        this.setState({ erroMensagem: 'Email ou senha inválido' });
      })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.efetuaLogin.bind(this)}>
                      <h1>Login</h1>
                      <p className="text-muted">Informe os dados abaixo</p>
                      {
                        this.state.erroMensagem !== '' && (
                          <p>{this.state.erroMensagem}</p>
                        )
                      }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="usuario" onChange={this.HandlerChange.bind(this)} placeholder="Usuário" autoComplete="usuario" required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="senha" onChange={this.HandlerChange.bind(this)} placeholder="Senha" autoComplete="senha" required />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">{this.state.isLoading ? "Ennviado..." : "Entrar"}</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/esquecisenha" className="px-0">Esqueci minha senha?</Link>

                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <img src={logo} width="150px" height="45px" alt="BlockTime" />
                      {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p> */}
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
