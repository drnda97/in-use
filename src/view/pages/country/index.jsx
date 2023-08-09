import React, {useEffect, useState} from "react";
import {Row, Col, Button, Tooltip, Modal, Form, Input, Popconfirm} from "antd";
import CustomizedFilterPanelTable from "../../components/data-display/table/customizedFilterPanel";
import {useDispatch, useSelector} from "react-redux";
import {createCountry, deleteCountry, getCountries, updateCountry} from "../../../redux/country/countryActions";
import {Eye, PenAdd, Trash} from "iconsax-react";
import {RiCloseFill} from "react-icons/ri";

export default function Country() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const {countries} = useSelector((state) => state.country);

    const [edit, setEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataModalOpen, setIsDataModalOpen] = useState(false);
    const [data, setData] = useState(false);

    const showModal = (edit, data = null) => {
        if (data) {
            form.setFieldsValue({countryName: data.country_name});
            form.setFieldsValue({iso2: data.iso2});
            form.setFieldsValue({languageCode: data.language_code});
            form.setFieldsValue({googleExtension: data.google_extension});
        } else {
            form.setFieldsValue({countryName: ''});
            form.setFieldsValue({iso2: ''});
            form.setFieldsValue({languageCode: ''});
            form.setFieldsValue({googleExtension: ''});
        }
        setEdit(edit);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showDataModal = (search, data = null) => {
        setData(search ? data.search_engines : data.country_group);
        setIsDataModalOpen(true);
    };

    const handleCancelData = () => {
        setIsDataModalOpen(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const confirm = async (data) => {
        let params = {
            id: data.id
        }
        const formData = new FormData;
        formData.append('id', data.id)
        await dispatch(deleteCountry(params));
        await getData();
    };

    const actionButtons = (data) => (
        <div className={"d-flex"}>
            <Tooltip title="Edit">
                <Button
                    ghost
                    type="primary"
                    onClick={() => showModal(data.id,  data)}
                    className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
                    icon={
                        <PenAdd size="22" className="hp-text-color-black-80 hp-text-color-dark-30"/>
                    }
                />
            </Tooltip>
            <Popconfirm
                title="Delete country"
                description="Are you sure to delete this Country?"
                onConfirm={() => confirm(data)}
                okText="Yes"
                cancelText="No"
            >
                <Button
                    ghost
                    type="primary"
                    className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
                    icon={
                        <Trash size="22" className="hp-text-color-black-80 hp-text-color-dark-30"/>
                    }
                />
            </Popconfirm>
        </div>
    );

    const searchEngineColumn = (data) => (
        <div className={"text-center"} onClick={() => showDataModal(true, data)}>
            <Eye size="22" className="hp-text-color-black-80 hp-text-color-dark-30 cursor-pointer"/>
        </div>
    )

    const countryGroupColumn = (data) => (
        <div className={"text-center"} onClick={() => showDataModal(false, data)}>
            <Eye size="22" className="hp-text-color-black-80 hp-text-color-dark-30 cursor-pointer"/>
        </div>
    )

    const columns = [
        {
            title: 'Country Name',
            dataIndex: 'country_name',
            key: 'country_name',
        },
        {
            title: 'Country Code',
            dataIndex: 'iso2',
            key: 'iso2',
        },
        {
            title: 'Google Extension',
            dataIndex: 'google_extension',
            key: 'google_extension',
        },
        {
            title: 'Language Code',
            dataIndex: 'language_code',
            key: 'language_code',
        },
        {
            title: 'Search engines',
            dataIndex: '',
            key: 'id',
            render: (data) => searchEngineColumn(data),
        },
        {
            title: 'Country Group',
            dataIndex: '',
            key: 'language_code',
            render: (data) => countryGroupColumn(data),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (data) => actionButtons(data),
        },
    ];

    const getData = async () => {
        await dispatch(getCountries());
    }

    const updateData = async (values) => {
        const params = {
            country_name: values.countryName,
            google_extension: values.googleExtension,
            iso2: values.iso2,
            language_code: values.languageCode
        }
        if (edit) {
            params.id = edit;
            await dispatch(createCountry(params));
            handleCancel();
            await getData();
            return
        }
        await dispatch(updateCountry(params));
        handleCancel();
        await getData();

    }

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className={"d-flex justify-content-between mb-4"}>
                        <h2>Country</h2>
                        <Button onClick={() => showModal(null)}>Add new</Button>
                    </div>
                    <CustomizedFilterPanelTable data={countries} columnsName={columns}/>
                </Col>
            </Row>
            <Modal
                title={`${edit ? "Edit" : "Create"} Country`}
                width={420}
                centered
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                closeIcon={
                    <RiCloseFill className="remix-icon text-color-black-100" size={24}/>
                }
            >
                <Form layout="vertical" name="basic" form={form} onFinish={updateData}>
                    <Form.Item label="Country Name" name="countryName"  rules={[{ required: true, message: 'Country Name is required!' }]}>
                        <Input onChange={(e) => form.setFieldsValue({countryName: e.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Google Extension" name="googleExtension" rules={[{ required: true, message: 'Google Extension is required!' }]}>
                        <Input onChange={(e) => form.setFieldsValue({googleExtension: e.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Country Code" name="iso2" rules={[{ required: true, message: 'Country Code is required!' }]}>
                        <Input onChange={(e) => form.setFieldsValue({iso2: e.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Language Code" name="languageCode" rules={[{ required: true, message: 'Language Code is required!' }]}>
                        <Input onChange={(e) => form.setFieldsValue({languageCode: e.target.value})}/>
                    </Form.Item>

                    <Row>
                        <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                            >
                                Save
                            </Button>
                        </Col>

                        <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
                            <Button block onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                title={`View Country`}
                width={420}
                centered
                visible={isDataModalOpen}
                onCancel={handleCancelData}
                footer={null}
                closeIcon={
                    <RiCloseFill className="remix-icon text-color-black-100" size={24}/>
                }
            >
                <ol>
                    {data && data?.map((info) => (
                        <li>{info.name ? info.name : info.group_name}</li>
                    ))}
                </ol>
            </Modal>
        </>
    );
}