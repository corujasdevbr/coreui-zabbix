import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

function ScriptListagem(props) {

  const [filterText, setFilterText] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);

  const columns = [
    {
      name: 'Id',
      selector: 'scriptid',
      sortable: true,
    },
    {
      name: 'Nome',
      selector: 'name',
      sortable: true
    },
    {
      name: 'Commando',
      selector: 'command',
      sortable: true
    },
    {
      name: 'Descrição',
      selector: 'description',
      sortable: true
    },
    {
      name: 'Confirmação',
      selector: 'confirmation',
      sortable: true
    },
  ];

  useEffect(() => {
    getScripts();
  }, [])

  const onChangeFilterText = (event) => {
    setFilterText(event.target.value);
    setFilteredItems(items.filter(item => item.scriptid.includes(event.target.value.toLowerCase()) || item.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  const getScripts = () => {
    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "script.get",
      "params": {
        "output": "extend"
      },
      "auth": token,
      "id": 1
    })
      .then(data => {
        if (data.status === 200) {
          setItems(data.data.result);
          setFilteredItems(data.data.result)
        }
      })
  }

  return (

    <Col xs={props.colxs} lg={props.collg}>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Lista de Scripts
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="3" md="3">
              <Input type="text" value={filterText} name="filterText" placeholder="Informe o nome do script" onChange={onChangeFilterText} />
            </Col>
          </Row>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
          // subHeader
          // subHeaderComponent={subHeaderComponentMemo}
          />
        </CardBody>
      </Card>
    </Col>
  );
}

export default ScriptListagem;
