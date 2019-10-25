import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import ModalItemsHost from '../../components/Modal/ModalItemsHost';

import api from '../../../services/api';

import { Link } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
  CardHeader,
  Table
} from "reactstrap";


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

function DashboardAdmin() {
  const [quantidadeHosts, setQuantidadeHosts] = useState(0);
  const [quantidadeHostGroup, setQuantidadeHostGroup] = useState(0);
  const [quantidadeServices, setQuantidadeServices] = useState(0);
  const [quantidadeValueMap, setQuantidadeValueMap] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [hostid, setHostId] = useState('');


  const [lista, setLista] = useState({
    demandas: [],
    labelsRelatorioDemandas: [],
    dataRelatorioDemandas: [],
    legendaGrafico: []
  })

  useEffect(() => {

    buscarHostGroups();
    buscarServices();
    buscarHosts();
    buscarValueMaps();
  }, []);

  const buscarHostGroups = () => {
    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "hostgroup.get",
      "params": {
        "output": ["groupid", "name"]
      },
      "auth": token,
      "id": 1
    })
      .then(data => {
        if (data.status === 200) {
          setQuantidadeHostGroup(data.data.result.length)
        }
      })
  }

  const buscarHosts = () => {
    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "host.get",
      "params": {
        "output": ["hostid", "host"],
        "groupids": "129"
      },
      "auth": token,
      "id": 1
    })
      .then(data => {
        if (data.status === 200) {
          setQuantidadeHosts(data.data.result.length)
        }
      })
  }

  const buscarServices = () => {
    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "service.get",
      "params": {
        "output": "extend",
        "selectDependencies": "extend"
      },
      "auth": token,
      "id": 1
    })
      .then(data => {
        if (data.status === 200) {
          setQuantidadeServices(data.data.result.length)
        }
      })
  }

  const buscarValueMaps = () => {
    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "valuemap.get",
      "params": {
        "output": "extend"
      },
      "auth": token,
      "id": 1
    })
      .then(data => {
        if (data.status === 200) {
          setQuantidadeValueMap(data.data.result.length)
        }
      })
  }

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );



  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Link to="/admin/hosts/listagem">
                  <i className="icon-settings" />
                </Link>
              </ButtonGroup>
              <div className="text-value">{quantidadeHosts}</div>
              <div>Hosts</div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-success">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Link to="/admin/services/listagem">
                  <i className="icon-settings" />
                </Link>
              </ButtonGroup>
              <div className="text-value">{quantidadeServices}</div>
              <div>Serviços</div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Link to="/admin/hostgroup/listagem">
                  <i className="icon-settings" />
                </Link>
              </ButtonGroup>
              <div className="text-value">{quantidadeHostGroup}</div>
              <div>HostGroup</div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-danger">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Link to="/admin/valuemap/listagem">
                  <i className="icon-arrow" />
                </Link>
              </ButtonGroup>
              <div className="text-value">{quantidadeValueMap}</div>
              <div>ValueMap</div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              Gráfico
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper" style={{ height: '56vh' }}>
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>
        </Col>

      </Row>
    </div>
  );
}

export default DashboardAdmin;
