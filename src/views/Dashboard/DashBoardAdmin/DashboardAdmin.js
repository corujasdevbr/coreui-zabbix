import React, { useEffect, useState } from "react";
import ChartCountHostByGroup from '../../components/Graficos/HostGroup/ChartCountHostByGroup'
import ChartCountItemsByName from '../../components/Graficos/Items/ChartCountItemsByName'
import ChartCountAlertsByDay from '../../components/Graficos/Alerts/ChartCountAlertsByDay/ChartCountAlertsByDay'
import api from '../../../services/api';

import { Link } from "react-router-dom";

import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
  CardHeader,
} from "reactstrap";

function DashboardAdmin() {
  const [quantidadeHosts, setQuantidadeHosts] = useState(0);
  const [quantidadeHostGroup, setQuantidadeHostGroup] = useState(0);
  const [quantidadeServices, setQuantidadeServices] = useState(0);
  const [quantidadeValueMap, setQuantidadeValueMap] = useState(0);

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

        "countOutput": true

      },
      "auth": token,
      "id": 3
    })
      .then(data => {
        if (data.status === 200) {
          setQuantidadeHosts(data.data.result)
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
        <Col xs="4" sm="4">
          <ChartCountHostByGroup></ChartCountHostByGroup>
        </Col>
        <Col xs="8" sm="8">
          <ChartCountAlertsByDay></ChartCountAlertsByDay>
        </Col>
      </Row>

      <Row>
        <Col xs="12" sm="12">
          <ChartCountItemsByName></ChartCountItemsByName>
        </Col>
      </Row>

    </div>
  );
}

export default DashboardAdmin;
