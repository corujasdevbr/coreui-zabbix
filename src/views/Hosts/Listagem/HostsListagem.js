/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label, Form } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import ModalItemsHost from '../../components/Modal/ModalItemsHost';
import Loading from '../../components/Loading/Loading'



function HostsListagem() {


  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [hostid, setHostId] = useState('');

  const columns = [
    {
      name: 'Id',
      selector: 'hostid',
      sortable: true,
    },
    {
      name: 'Nome',
      selector: 'host',
      sortable: true
    },
    {
      name: 'Groups',
      selector: 'groups',
      sortable: true
    },
    {
      cell: row => <Button onClick={() => { handleAction(row.hostid) }}>Visualizar</Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    buscarHosts();
    buscarHostGroups();
  }, [])

  const onChangeFilter = (event) => {
    let listHosts = items;
    switch (event.target.name) {
      case "filterText":
        setFilterText(event.target.value);
        break;
      case "filterGroup":
        setFilterGroup(event.target.value);
    }

    console.log(filterText)
    console.log(filterGroup)
    if (filterText !== '') {
      listHosts = listHosts.filter(item => item.hostid.includes(filterText) || item.host.toLowerCase().includes(filterText))
    }

    if (filterGroup.toLowerCase() !== 'selecione') {
      listHosts = listHosts.filter(item => item.groups.toLowerCase().includes(filterGroup.toLowerCase()))
    }

    setFilteredItems(listHosts);
  }


  const handleAction = (hostid) => {
    setHostId(hostid);
    setIsOpen(true);
    setTitle('Host Id: ' + hostid)
  }

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
          setGroups(data.data.result)
        }
      })
  }

  const buscarHosts = () => {
    setLoading(true);
    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "host.get",
      "params": {
        "output": ["hostid", "name", "host"],
        "selectGroups": "extend"
      },
      "auth": token,
      "id": 1
    })
      .then(data => {
        if (data.status === 200) {
          let listGroups = data.data.result.map((item) => {

            var groupstemp = '';
            item.groups.forEach((item => {
              groupstemp += item.name + ' - '
            }));
            console.log(groupstemp);
            return { hostid: item.hostid, host: item.host, groups: groupstemp }
          })
          setItems(listGroups);
          setFilteredItems(listGroups)
          setLoading(false);
        }
      }).finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className="animated fadeIn">
      <ModalItemsHost title={title} isOpen={isOpen} hostid={hostid} toggleSmall={() => setIsOpen(false)}></ModalItemsHost>
      {loading ? <Loading type="balls" title="Buscando Hosts"></Loading> : ''}

      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Hosts
              </CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Col md="3">
                    <Label>Host</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" value={filterText} name="filterText" placeholder="Informe o host" onChange={onChangeFilter} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="filterGroup" value={filterGroup} onChange={onChangeFilter}>
                      <option>Selecione</option>
                      {groups.map((item) => {
                        return (<option key={item.groupid} value={item.name}>{item.name}</option>)
                      })}
                    </Input>
                  </Col>
                </FormGroup>
              </Form>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
              />
            </CardBody>
          </Card>
        </Col>

      </Row>
    </div>
  );
}

export default HostsListagem;
