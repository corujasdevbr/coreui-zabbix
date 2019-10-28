import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

import logo from '../../../assets/img/brand/zabbix_logo_500x131.png'

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlzabbix: '',
      usuario: null,
      senha: null,
      nome: null,
      erroMensagem: '',
      isLoading: false
    }
  }

  componentDidMount() {
    console.log(localStorage.getItem("auth-coreui-zabbix"))
    if (localStorage.getItem("auth-coreui-zabbix") !== null) {
      this.props.history.push("/admin/dashboard");
    }
  }

  HandlerChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  efetuaLogin(event) {
    event.preventDefault();
    localStorage.setItem("url-zabbix", this.state.urlzabbix);

    this.setState({ isLoading: true, erroMensagem: "" });

    api.post(this.state.urlzabbix, {
      "jsonrpc": "2.0",
      "method": "user.login",
      "params": {
        "user": this.state.usuario,
        "password": this.state.senha
      },
      "id": 1,
      "auth": null
    })
      .then(data => {
        if (data.status === 200) {
          localStorage.setItem("auth-coreui-zabbix", data.data.result);
          api.post(this.state.urlzabbix, {
            "jsonrpc": "2.0",
            "method": "user.get",
            "params": {
              "output": "extend"
            },
            "auth": data.data.result,
            "id": 1
          })
            .then(data => {
              if (data.status === 200) {
                localStorage.setItem("name-user-zabbix", data.data.result[0].name + ' ' + data.data.result[0].surname);
                this.props.history.push("/admin/dashboard");
              }
            })
            .catch(erro => {
              this.setState({ isLoading: false });
              this.setState({ erroMensagem: 'Email ou senha inválido' });
            })
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
                        <Input type="text" name="urlzabbix" onChange={this.HandlerChange.bind(this)} placeholder="Url Zabbix" autoComplete="urlzabbix" required />
                      </InputGroup>
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
                          <Button type="submit" color="primary" disabled={this.state.isLoading ? true : false} className="px-4">{this.state.isLoading ? "Ennviado..." : "Entrar"}</Button>
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
