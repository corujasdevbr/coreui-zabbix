import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import Loading from '../Loading/Loading'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function ModalTriggersHost(props) {


    const toTimestamp = (time) => {
        var date = new Date(time * 1000); // converte para data
        return date.toLocaleDateString("pt-BR"); //formata de acordo com o requisito
    }

    
    const host = props;
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const columns = [
        {
            name: 'Id',
            selector: 'triggerid',
            sortable: true,
        },
        {
            name: 'Nome',
            selector: 'description',
            sortable: true
        }
    ];

    useEffect(() => {
        buscarTriggersHost();
    }, [props.isOpen])

    const buscarTriggersHost = () => {
        setLoading(true);
        let token = localStorage.getItem("auth-coreui-zabbix");
        api.post("", {
            "jsonrpc": "2.0",
            "method": "trigger.get",
            "params": {
                "output": "extend",
                "hostids": props.hostid
            },
            "auth": token,
            "id": 1
        })
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    
                    setItems(data.data.result);
                    setFilteredItems(data.data.result);
                }
            }).finally(() => {
                setLoading(false);
            })
    }

    return (
        <Modal isOpen={props.isOpen} toggle={() => props.toggleSmall()}
            className='modal-lg '>
            <ModalHeader toggle={props.toggleSmall}>{props.title}</ModalHeader>
            <ModalBody>
                {loading ? <Loading type="balls" title="Buscando Alertas"></Loading> : ''}
                <DataTable
                    columns={columns}
                    data={filteredItems.reverse()}
                    pagination
                />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => props.toggleSmall()}>Fechar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalTriggersHost;