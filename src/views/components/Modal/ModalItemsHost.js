import React, { useEffect } from 'react';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';



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

function ModalItemsHost(props) {

    const [filterText, setFilterText] = React.useState('');
    const [filteredItems, setFilteredItems] = React.useState([]);
    const subHeaderComponentMemo = React.useMemo(() => <Filter onFilter={value => setFilterText(value)} />, []);

    const columns = [
        {
            name: 'Id',
            selector: 'itemid',
            sortable: true,
        },
        {
            name: 'Nome',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Data',
            selector: 'lastclock',
            sortable: true,
        }
    ];

    const toTimestamp = (strDate) => {
        console.log(strDate);
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    useEffect(() => {
        buscarItemsHost();
    }, [props.hostid])

    const buscarItemsHost = () => {
        let token = localStorage.getItem("auth-coreui-zabbix");
        api.post("", {
            "jsonrpc": "2.0",
            "method": "item.get",
            "params": {
                "output": "extend",
                "hostids": props.hostid
            },
            "auth": token,
            "id": 1
        })
            .then(data => {
                if (data.status === 200) {
                    console.log(data.data.result);
                    setFilteredItems(data.data.result.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()) || item.itemid.includes(filterText)))
                    var result = data.data.result.reduce((acc, o) => (acc[o.name] = (acc[o.name] || 0) + 1, acc), {});
                    console.log(result);
                }
            })
    }

    return (
        <Modal isOpen={props.isOpen} toggle={() => props.toggleSmall()}
            className='modal-lg '>
            <ModalHeader toggle={props.toggleSmall}>{props.title}</ModalHeader>
            <ModalBody>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => props.toggleSmall()}>Fechar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalItemsHost;