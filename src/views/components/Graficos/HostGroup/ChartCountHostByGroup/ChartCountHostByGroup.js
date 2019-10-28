import React, { useEffect, useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import Loading from '../../../../components/Loading/Loading'
import api from '../../../../../services/api';
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

import {
    Card,
    CardBody,
    CardHeader
} from "reactstrap";

const options = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false
}

const line = {
    labels: null,
    datasets: [
        {
            label: 'Quantidade de Hosts por Grupo',
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

function ChartCountHostByGroup() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        let token = localStorage.getItem("auth-coreui-zabbix");
        api.post("", {
            "jsonrpc": "2.0",
            "method": "hostgroup.get",
            "params": {
                "output": ["groupid", "name"],
                "selectHosts": "extend"
            },
            "auth": token,
            "id": 1
        })
            .then(data => {
                if (data.status === 200) {
                    const labels = [];
                    const counts = [];

                    const chart = data.data.result.map(group => ({ id: group.groupid, name: group.name, hosts: group.hosts.length }))

                    chart.map(item => labels.push(item.id + ' ' + item.name));
                    line.labels = labels;

                    chart.map(item => counts.push(item.hosts));
                    line.datasets[0].data = counts;
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    Quantidade Hosts por Grupo
                </CardHeader>
                <CardBody>
                    {loading ? <Loading type="balls" title="Buscando Dados"></Loading> : ''}
                    {line.labels !== null ? <div className="chart-wrapper" style={{ height: '56vh' }}>
                        <HorizontalBar data={line} options={options} />
                    </div> : ''}
                </CardBody>
            </Card>
        </div>
    )
}

export default ChartCountHostByGroup;