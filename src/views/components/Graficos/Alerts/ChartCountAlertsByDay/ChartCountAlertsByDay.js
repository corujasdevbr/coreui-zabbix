import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Loading from '../../../../components/Loading/Loading'
import api from '../../../../../services/api';
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

import {
    Card,
    CardBody,
    CardHeader
} from "reactstrap";



function ChartCountHostByGroup() {
    const toTimestamp = (time) => {
        var date = new Date(time * 1000); // converte para data
        return date.toLocaleDateString("pt-BR"); //formata de acordo com o requisito
    }

    const [loading, setLoading] = useState(false);
    const [chartBar, setChartBar] = useState({
        labels: null,
        datasets: null,
    });

    useEffect(() => {
        getData();
    }, []);

    const options = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio: false
    }

    const compare = (a, b) => {
        if (a.count < b.count)
            return -1;
        if (a.count > b.count)
            return 1;
        return 0;
    }

    const getData = () => {
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
                    const labels = [];
                    const counts = [];
                    const listAlerts = [];

                    data.data.result.reverse().map((item) => {
                        listAlerts.push({ id: item.alertid, clock: toTimestamp(item.clock), subject: item.subject })
                    })

                    var result = listAlerts.reduce((acc, o) => (acc[o.clock] = (acc[o.clock] || 0) + 1, acc), {});

                    Object.keys(result).map(item => labels.push(item));
                    Object.values(result).map((item => counts.push(item)));


                    setChartBar(values => ({
                        ...values,
                        labels: labels.slice(0, 15),
                        datasets: [
                            {
                                label: 'Quantidade Alertas por Data',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: counts.slice(0, 15),
                            },
                        ]
                    }))
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    Quantidade Alertas por Data
                </CardHeader>
                <CardBody>
                    {loading ? <Loading type="balls" title="Buscando Dados"></Loading> : ''}

                    {chartBar.labels !== null ? <div className="chart-wrapper" style={{ height: '56vh' }}>
                        <Bar
                            data={chartBar}
                            options={options}
                        />
                    </div> : ''}
                </CardBody>
            </Card>
        </div>
    )
}

export default ChartCountHostByGroup;