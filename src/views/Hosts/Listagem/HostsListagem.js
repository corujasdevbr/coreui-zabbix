import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import ModalItemsHost from '../../components/Modal/ModalItemsHost';



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
  const handleAction = (hostid) => {
    setHostId(hostid);
    setIsOpen(true);
    setTitle('Host Id: ' + hostid)
  }

  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const subHeaderComponentMemo = React.useMemo(() => <Filter onFilter={value => setFilterText(value)} />, []);
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
      cell: row => <Button onClick={() => { handleAction(row.hostid) }}>Action</Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];



  useEffect(() => {
    buscarHosts();
  }, [])

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
          setFilteredItems(data.data.result.filter(item => item.host.toLowerCase().includes(filterText.toLowerCase()) || item.hostid.includes(filterText)))
        }
      })
  }

  return (
    <div className="animated fadeIn">
      <ModalItemsHost title={title} isOpen={isOpen} hostid={hostid} toggleSmall={() => setIsOpen(false)}></ModalItemsHost>

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

export default HostsListagem;
