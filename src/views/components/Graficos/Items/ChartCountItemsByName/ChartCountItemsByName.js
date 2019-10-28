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
            "method": "item.get",
            "params": {
                "output": ["itemid", "name", "description", "lastclock", "hostid"],
                "selectGroups": "extend"
            },
            "auth": token,
            "id": 1
        })
            .then(data => {

                if (data.status === 200) {
                    const labels = [];
                    const counts = [];
                    const list = [];


                    var result = data.data.result.reduce((acc, o) => (acc[o.name] = (acc[o.name] || 0) + 1, acc), {});

                    Object.keys(result).map(item => labels.push(item));
                    Object.values(result).map((item => counts.push(item)));

                    for (let index = 0; index < labels.length; index++) {
                        list.push({ name: labels[index], count: counts[index] })
                    }

                    const listSort = list.reverse();

                    listSort.map(item => labels.push(item.name));
                    listSort.map(item => counts.push(item.count));

                    setChartBar(values => ({
                        ...values,
                        labels: labels,
                        datasets: [
                            {
                                label: 'Quantidade items por Nome',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: counts,
                            },
                        ]
                    }))

                    // console.log("labels", bar.labels.reverse());
                    // console.log("datasets", bar.datasets[0].data.reverse());
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
                    Quantidade de Ocorrências por Item
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