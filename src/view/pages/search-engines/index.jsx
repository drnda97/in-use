import React, {useEffect,useState} from "react";
import axios from "axios";
import {Row, Col} from "antd";
import SearchEnginesChart from "../../components/search-engines/SearchEnginesChart";
import CustomizedFilterPanelTable from "../../components/data-display/table/customizedFilterPanel";

export default function SearchEngines() {
    const [engines, setEngines] = useState([]);


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/todos/10')
            .then(res => setEngines(res.data));
    }

    const columns = ['title', 'completed'];

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <SearchEnginesChart/>
                <CustomizedFilterPanelTable data={engines} columnsName={columns}/>
            </Col>
        </Row>
    );
}
