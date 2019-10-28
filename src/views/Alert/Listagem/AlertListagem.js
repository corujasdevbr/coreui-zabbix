import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input, Button } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import ModalAlert from '../../components/Modal/ModalAlert';
import Loading from '../../components/Loading/Loading'

function AlertListagem(props) {

  const toTimestamp = (time) => {
    var date = new Date(time * 1000); // converte para data
    return date.toLocaleDateString("pt-BR"); //formata de acordo com o requisito
  }

  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    alertid: '',
    subject: '',
    message: '',
    host: ''
  });

  const columns = [
    {
      name: 'Id',
      selector: 'alertid',
      sortable: true,
    },
    {
      name: 'Assunto',
      selector: 'subject',
      sortable: true
    },
    {
      name: 'Mensagem',
      selector: 'message',
      sortable: true
    },
    {
      cell: row => <p>{row.hosts.map(item => item.host)}</p>,
      name: 'Host',
      selector: 'host',
      sortable: true
    },
    {
      cell: row => <p>{toTimestamp(row.clock)}</p>,
      name: 'Data',
      selector: 'clock',
      sortable: true
    },
    {
      cell: row => <Button onClick={() => { handleAction(row) }}>Visualizar</Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleAction = (item) => {
    setData(item);
    setIsOpen(true);
  }

  useEffect(() => {
    getAlerts();
  }, [])

  const onChangeFilterText = (event) => {
    setFilterText(event.target.value);
    setFilteredItems(items.filter(item => item.alertid.includes(event.target.value.toLowerCase()) || item.message.toLowerCase().includes(event.target.value.toLowerCase()) || item.subject.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  const getAlerts = () => {
    setLoading(true);
    let token = localStorage.getItem("auth-coreui-zabbix");
    api.post("", {
      "jsonrpc": "2.0",
      "method": "alert.get",
      "params": {
        "output": ["alertid", "clock", "subject", "message"],
        "sortfield": "clock",
        "selectHosts": ["hostid", "host"]
      },
      "auth": token,
      "id": 1
    })
      .then(data => {
        if (data.status === 200) {
          setItems(data.data.result);
          setFilteredItems(data.data.result)
        }
      }).finally(() => {
        setLoading(false);
      })
  }

  return (

    <Col xs={props.colxs} lg={props.collg}>
      <ModalAlert isOpen={isOpen} data={data} toggleSmall={() => setIsOpen(false)}></ModalAlert>
      {loading ? <Loading type="balls" title="Buscando Alertas"></Loading> : ''}
      {console.log(filteredItems)}
      {filteredItems.length !== 0 ? <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Lista de Scripts
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="3" md="3">
              <Input type="text" value={filterText} name="filterText" placeholder="Informe a mensagem do alerta" onChange={onChangeFilterText} />
            </Col>
          </Row>
          <DataTable
            columns={columns}
            data={filteredItems.reverse()}
            pagination
          />
        </CardBody>
      </Card> : ''}
    </Col>
  );
}

export default AlertListagem;
