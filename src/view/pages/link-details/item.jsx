import React, { useEffect, useState } from 'react'

import { Row, Col, Avatar, Checkbox, Tag,  } from "antd";
import { ChevronDownCircle, InfoSquare } from 'react-iconly';

export default function InventoryItem(props) {
    const [detailCheckClass, setDetailCheckClass] = useState("")
    const [detailCheck, setDetailCheck] = useState(false)

    useEffect(() => {
        if (detailCheck) {
            setTimeout(() => {
                setDetailCheckClass(" active")
            }, 100);
        } else {
            setDetailCheckClass("")
        }
    }, [detailCheck])

    return (
        props && (
            <div className="hp-inventory-body-row" key={props.id}>
                <div className="hp-d-flex hp-w-100">
                    <div className="hp-inventory-body-row-item">
                        <Checkbox />
                    </div>

                    <div className="hp-inventory-body-row-item">
                        <Avatar
                            size={64}
                            src={require(`../../../assets/images/product/${props.img}`)}
                            className="hp-bg-black-0 hp-bg-dark-100 hp-border-1"
                        />
                    </div>

                    <div className="hp-inventory-body-row-item">
                        <span>{props.title}</span>
                    </div>

                    <div className="hp-inventory-body-row-item">
                        <span>{props.search_engine}</span>
                    </div>

                    <div className="hp-inventory-body-row-item">
                        <span>{props.search_term}</span>
                    </div>

                    <div className="hp-inventory-body-row-item">
                        {
                            props.for_sending ? (
                                <Tag color="success" className="hp-px-12">
                                    <span className="hp-d-flex hp-align-items-center">
                                        <InfoSquare set="curved" className="remix-icon" size={12} />
                                        <span className="hp-ml-4">Active</span>
                                    </span>
                                </Tag>
                            ) : (
                                <Tag color="warning" className="hp-px-12">
                                    <span className="hp-d-flex hp-align-items-center">
                                        <InfoSquare set="curved" className="remix-icon" size={12} />
                                        <span className="hp-ml-4">Deactive</span>
                                    </span>
                                </Tag>
                            )
                        }
                    </div>

                    <div className="hp-inventory-body-row-item">
                        <span>{props.url}</span>
                    </div>

                    <div className={`hp-inventory-body-row-item item-details hp-d-flex-end${detailCheckClass}`}>
                        <div className="hp-cursor-pointer" onClick={() => setDetailCheck(!detailCheck)}>
                            <ChevronDownCircle set="curved" />
                        </div>
                    </div>
                </div>

                {
                    detailCheck && (
                        <div className={`hp-inventory-body-row-detail${detailCheckClass}`}>
                            <Row align="middle">
                                <Col>
                                    <div className="hp-border-radius hp-overflow-hidden hp-inventory-body-row-detail-img">
                                        <img src={require(`../../../assets/images/product/${props.img}`)} alt={props.title} />
                                    </div>
                                </Col>

                                <Col flex="1 0 0">
                                    <Row>
                                        <Col span={24} lg={12}>
                                            <Row>
                                                <Col span={24}>
                                                    <div className="hp-inventory-body-row-detail-item">
                                                        <span>Title</span>

                                                        <span>{props.title}</span>
                                                    </div>
                                                </Col>

                                                <Col span={24}>
                                                    <div className="hp-inventory-body-row-detail-item">
                                                        <span>ID Number</span>

                                                        <span>{props.id}</span>
                                                    </div>
                                                </Col>

                                                <Col span={24}>
                                                    <div className="hp-inventory-body-row-detail-item">
                                                        <span>Created Date</span>

                                                        <span>{props.created_date}</span>
                                                    </div>
                                                </Col>

                                                <Col span={24}>
                                                    <div className="hp-inventory-body-row-detail-item">
                                                        <span>Country</span>

                                                        <span>{props.country_name}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col span={24} lg={12}>
                                            <Row>
                                                <Col span={24}>
                                                    <div className="hp-inventory-body-row-detail-item">
                                                        <span>Description</span>

                                                        <span>{props.description}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </div>
        )
    );
}