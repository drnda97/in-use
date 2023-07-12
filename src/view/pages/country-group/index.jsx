import React, {useEffect,useState} from "react";
import axios from "axios";
import {Row, Col, Table} from "antd";
import 'svgmap/dist/svgMap.min.css';
import svgMap from 'svgmap';

export default function SearchEngines() {
    const [engines, setEngines] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        new svgMap({
            targetElementID: 'svgMap',
            data: {
                data: {
                    gdp: {
                        name: 'GDP per capita',
                        format: '{0} USD',
                        thousandSeparator: ',',
                        thresholdMax: 50000,
                        thresholdMin: 1000
                    },
                    change: {
                        name: 'Change to year before',
                        format: '{0} %'
                    }
                },
                applyData: 'gdp',
                values: {
                    AF: { gdp: 587, change: 4.73 },
                    AL: { gdp: 4583, change: 11.09 },
                    DZ: { gdp: 4293, change: 10.01 }
                }
            }
        });
    }, []);

    const getData = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(res => setEngines(res.data));
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
        },
        {
            title: 'Completed',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
    ];

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <h1>Country Group Page</h1>
                <div id="svgMap"></div>
                {engines.length > 0 && (
                    <Col span={24} className={"hp-mt-12"}>
                        <Table columns={columns} dataSource={engines} scroll={{ x: 500 }} />
                    </Col>
                )}
            </Col>
        </Row>
    );
}
