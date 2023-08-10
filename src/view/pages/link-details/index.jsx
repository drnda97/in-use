import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux";

import { Row, Col, Button, Input, Pagination } from "antd";
import { Discovery, Plus } from 'react-iconly';

import BreadCrumbs from '../../../layout/components/content/breadcrumbs';
import InventoryItem from './item';
import {getLinkDetailsAdmin} from "../../../redux/linkDetails/linkDetailsActions";
import {useParams} from "react-router-dom";
import CustomizedFilterPanelTable from "../../components/data-display/table/customizedFilterPanel";

export default function LinkDetails() {
    const dispatch = useDispatch();
    let { id } = useParams();

    const [array, setArray] = useState([])
    // const [newArray, setNewArray] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [page]);

    const getData = async () => {
        await dispatch(getLinkDetailsAdmin({search_job_id: id, page}))
            .then((res) => {
                if (res.payload?.data?.content) {
                    const array = res.payload.data.content.map((data) => {
                        return {
                            id: data.id,
                            img: 'white-cam-1.png',
                            title: data.title,
                            search_engine: data.search_engine,
                            search_term: data.search_term,
                            for_sending: data.for_sending,
                            url: data.url,
                            created_date: data.created_date,
                            description: data.description,
                            country_name: data.country_name,
                        }
                    })
                    setArray(res.payload.data.content);
                    // setNewArray(array);
                    setTotalPages(res.payload.data.totalElements)
                }
            });
    }

    const changePage = (e) => {
        setPage(e);
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Search Engine',
            dataIndex: 'search_engine',
            key: 'search_engine',
        },
        {
            title: 'Search Term',
            dataIndex: 'search_term',
            key: 'search_term',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Created Date',
            dataIndex: 'created_date',
            key: 'created_date',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Country Name',
            dataIndex: 'country_name',
            key: 'country_name',
        }
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Row gutter={[32, 32]} className="hp-ecommerce-app hp-mb-32">
            <Col span={24}>
                <Row gutter={[32, 32]} justify="space-between">
                    <BreadCrumbs
                        breadCrumbParent="Search Jobs"
                        breadCrumbActive="Link Details"
                    />

                    <Col span={24} md={12}>
                        <Row gutter={[16, 16]} justify="end" className="hp-ecommerce-app-inventory-events">
                            <Col flex="0 0 250px">
                                <Input
                                    placeholder="Search Links"
                                    prefix={<Discovery set="curved" className="remix-icon" size={18} />}
                                />
                            </Col>

                            <Col>
                                <Button type="primary" onClick={() => console.log('generate report')}>
                                    <Plus set="curved" size={18} />
                                    <span className="hp-ml-8">Generate Report</span>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <h2>Link Details</h2>
            </Col>

            {/*<Col span={24} className="hp-ecommerce-app-inventory">*/}
            {/*    <div className="hp-inventory-container">*/}
            {/*        <div className="hp-inventory-header">*/}
            {/*            <div className="hp-inventory-header-item item-sku">*/}
            {/*            </div>*/}

            {/*            <div className="hp-inventory-header-item item-name">*/}
            {/*                <span className="hp-caption hp-text-uppercase">Title</span>*/}
            {/*            </div>*/}

            {/*            <div className="hp-inventory-header-item item-price">*/}
            {/*                <span className="hp-caption hp-text-uppercase">Search Engine</span>*/}
            {/*            </div>*/}

            {/*            <div className="hp-inventory-header-item item-status">*/}
            {/*                <span className="hp-caption hp-text-uppercase">Search Term</span>*/}
            {/*            </div>*/}

            {/*            <div className="hp-inventory-header-item item-stock">*/}
            {/*                <span className="hp-caption hp-text-uppercase">For Sending</span>*/}
            {/*            </div>*/}

            {/*            <div className="hp-inventory-header-item item-details hp-d-flex-end">*/}
            {/*                <span className="hp-caption hp-text-uppercase">url</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="hp-inventory-body">*/}
            {/*            {*/}
            {/*                newArray.map((value, index) => (*/}
            {/*                    <InventoryItem*/}
            {/*                        id={value.id}*/}
            {/*                        img={value.img}*/}
            {/*                        title={value.title}*/}
            {/*                        search_engine={value.search_engine}*/}
            {/*                        search_term={value.search_term}*/}
            {/*                        for_sending={value.for_sending}*/}
            {/*                        url={value.url}*/}
            {/*                        created_date={value.created_date}*/}
            {/*                        description={value.description}*/}
            {/*                        country_name={value.country_name}*/}
            {/*                    />*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Col>*/}

            {/*<Col span={24}>*/}
            {/*    <Row justify="end">*/}
            {/*        <Pagination defaultCurrent={1} total={totalPages} onChange={changePage} />*/}
            {/*    </Row>*/}
            {/*</Col>*/}
            <CustomizedFilterPanelTable rowSelection={rowSelection} data={array} columnsName={columns}/>
        </Row>
    );
}