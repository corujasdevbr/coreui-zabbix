import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const columns = [
  {
    name: 'Id',
    selector: 'groupid',
    sortable: true,
  },
  {
    name: 'Nome',
    selector: 'name',
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

function HostGroupListagem() {

  const [filterText, setFilterText] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState([]);
  const subHeaderComponentMemo = React.useMemo(() => <Filter onFilter={value => setFilterText(value)} />, []);

  useEffect(() => {
    buscarHostGroups();
  })

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
          setFilteredItems(data.data.result.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()) || item.groupid.includes(filterText)))
        }
      })
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Host Group
              </CardHeader>
            <CardBody>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
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

export default HostGroupListagem;
