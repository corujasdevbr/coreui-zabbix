import React, { Component } from "react";

import { Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

import api from "../../../services/api";
import { Link } from "react-router-dom";

import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
  CardHeader,
  Table
} from "reactstrap";
import { thisTypeAnnotation } from "@babel/types";

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

let line = {
  labels: null,

  datasets: [
    {
      label: 'Quantidade de Demandas',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 10,
      pointRadius: 1,
      pointHitRadius: 10,
      data: null,
    },
  ],
};

class DashboardAdmin extends Component {


  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      quantDemandas: 0,
      quantEmpresarios: 0,
      quantEscolas: 50,
      quantFuncionarios: 0,
      demandas: [],
      labelsRelatorioDemandas: [],
      dataRelatorioDemandas: [],
      legendaGrafico: []
    };
  }
  componentDidMount() {

  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Link to="/escola/listagem">
                    <i className="icon-settings" />
                  </Link>
                </ButtonGroup>
                <div className="text-value">{this.state.quantEscolas}</div>
                <div>Escolas</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Link to="/funcionario/listagem">
                    <i className="icon-settings" />
                  </Link>
                </ButtonGroup>
                <div className="text-value">{this.state.quantFuncionarios}</div>
                <div>Funcionários</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Link to="/demanda/listagem">
                    <i className="icon-settings" />
                  </Link>
                </ButtonGroup>
                <div className="text-value">{this.state.quantDemandas}</div>
                <div>Demandas</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Link to="/empresario/listagem">
                    <i className="icon-settings" />
                  </Link>
                </ButtonGroup>
                <div className="text-value">{this.state.quantEmpresarios}</div>
                <div>Empresários</div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="9" sm="9">
            <Card>
              <CardHeader>
                Demandas

              </CardHeader>
              <CardBody>
                <div className="chart-wrapper" style={{ height: '56vh' }}>
                  <Line data={line} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="3" sm="3">
            <Card>
              <CardBody>
                <Table responsive>

                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.legendaGrafico.map((data, key) => {
                      return (
                        <tr key={key}>
                          <td>{this.formataData(data.date)}</td>
                          <td>{data.count}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Demandas
                {/* <div className="card-header-actions">
                  <Link to="/escola/formulario" className="btn btn-sm btn-primary">Nova Escola</Link>
                </div> */}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Escola</th>
                      <th>Descrição</th>
                      <th>Empresário</th>
                      <th>Telefone</th>
                      <th>Status</th>
                      <th>Categoria</th>
                      <th>Data Criação</th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.demandas.slice(0, 10).map((demanda, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            {demanda.escola.cfp} - {demanda.escola.nomeUnidade}
                          </td>
                          <td>{demanda.descricao}</td>
                          <td>{demanda.empresario.responsavel}</td>
                          <td>{demanda.empresario.telefone}</td>
                          <td>{demanda.categoria}</td>
                          <td>{this.formataData(demanda.dataCriacao)}</td>
                          {/* <td>
                              <i className="cui-note icons"></i>   <i className="cui-circle-x icons"></i>
                            </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardAdmin;
