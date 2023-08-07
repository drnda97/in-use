import React, {useEffect, useState} from "react";
import {Row, Col, Tooltip, Button, Form, Input, Modal} from "antd";
import SearchEnginesChart from "../../components/search-engines/SearchEnginesChart";
import CustomizedFilterPanelTable from "../../components/data-display/table/customizedFilterPanel";
import {useDispatch, useSelector} from "react-redux";
import {ElementPlus, PenAdd, Play, Trash} from "iconsax-react";
import {
    createSearchEngine,
    getSearchEngines,
    updateSearchEngine
} from "../../../redux/searchEngines/searchEnginesActions";
import {RiCloseFill} from "react-icons/ri";

export default function SearchEngines() {
    const dispatch = useDispatch();
    const {searchEngines} = useSelector((state) => state.searchEngines);

    const [modalVisible, setModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await dispatch(getSearchEngines());
    }

    const modalShow = (edit, data = null) => {
        if (data) {
            setName(data.name);
            setUrl(data.url);
        } else {
            setName("");
            setUrl("");
        }
        setEdit(edit);
        setModalVisible(true);
    };

    const modalCancel = () => {
        setModalVisible(false);
    };

    const updateData = async () => {
        let params = {
            name: name,
            url: url
        }
        if (edit){
            params.id = edit;
            await dispatch(updateSearchEngine(params));
            setModalVisible(false);
            return
        }
        await dispatch(createSearchEngine(params));
        setModalVisible(false);
    };

    const actionButtons = (data) => (
        <div className={"d-flex"}>
            <Tooltip title="Edit">
                <Button
                    ghost
                    onClick={() => modalShow(data.id, data)}
                    type="primary"
                    className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
                    icon={
                        <PenAdd size="22" className="hp-text-color-black-80 hp-text-color-dark-30"/>
                    }
                />
            </Tooltip>
        </div>
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (data) => actionButtons(data),
        },
    ];


    return (
        <div>
            <Modal
                title={`${edit ? "Edit" : "Create"} Search Engine`}
                width={420}
                centered
                visible={modalVisible}
                onCancel={modalCancel}
                footer={null}
                closeIcon={
                    <RiCloseFill className="remix-icon text-color-black-100" size={24} />
                }
            >
                {/*<Form layout="vertical" name="basic" initialValues={{ name, url }}>*/}
                {/*    <Form.Item label="Name" name="name">*/}
                        <Input defaultValue={name} onChange={(e) => setName(e.target.value)} />
                    {/*</Form.Item>*/}

                    {/*<Form.Item label="Url" name="url">*/}
                        <Input defaultValue={url} onChange={(e) => setUrl(e.target.value)} />
                    {/*</Form.Item>*/}
                    <Row>
                        <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
                            <Button
                                block
                                type="primary"
                                onClick={() => updateData()}
                            >
                                {edit ? "Edit" : "Create"}
                            </Button>
                        </Col>

                        <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
                            <Button block onClick={modalCancel}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                {/*</Form>*/}
            </Modal>
                <SearchEnginesChart/>
                <div className={"d-flex justify-content-between mb-4"}>
                    <h2>Search Engines</h2>
                    <Button onClick={() => modalShow(false)} >
                        Add new
                    </Button>
                </div>
                <CustomizedFilterPanelTable data={searchEngines} columnsName={columns}/>
        </div>
    );
}
