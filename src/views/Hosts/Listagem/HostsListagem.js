import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

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
];

const TextField = styled.input`
  height: 32px;
  width: 300px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const Filter = ({ onFilter }) => (
  <TextField id="search" type="search" role="search" placeholder="Search Title" onChange={e => onFilter(e.target.value)} />
);

function HostsListagem() {

  const [filterText, setFilterText] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState('');
  const subHeaderComponentMemo = React.useMemo(() => <Filter onFilter={value => setFilterText(value)} />, []);

  useEffect(() => {
    buscarHosts();
  })

  const buscarHosts = () => {
    let token = localStorage.getItem("auth-blocktime-zabbix");
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
          setFilteredItems(data.data.result.filter(item => item.host.includes(filterText) || item.hostid.includes(filterText)))
        }
      })
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Hosts
              </CardHeader>
            <CardBody>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination="true"
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
              />
            </CardBody>
          </Card>
        </Col>

      </Row>
    </div>
  );
}

export default HostsListagem;
