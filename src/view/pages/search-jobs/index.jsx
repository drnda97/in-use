import React, {useEffect, useState} from "react";
import {Row, Col, Button, Tooltip, Form, Input, DatePicker, Modal, Menu, Dropdown, Space} from "antd";
import CustomizedFilterPanelTable from "../../components/data-display/table/customizedFilterPanel";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Play} from "iconsax-react";
import {createSearchJob, getSearchJobs} from "../../../redux/searchJobs/searchJobActions";
import {RiCalendarLine, RiCloseFill, RiMenuFill} from "react-icons/ri";
import dayjs from "dayjs";
import {getCountries} from "../../../redux/country/countryActions";

export default function Country() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const dateFormat = 'YYYY-MM-DD';

    const {countries} = useSelector((state) => state.country);

    const [jobs, setJobs] = useState([]);
    const [contactModalVisible, setContactModalVisible] = useState(false);
    const [searchDate, setSearchDate] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await dispatch(getSearchJobs({is_done: true})).then((res) => setJobs(res.payload.data));
        await dispatch(getSearchJobs({is_done: false})).then((res) => setJobs(data => [...res.payload.data, ...data]));
        await dispatch(getCountries());
    }

    const contactModalShow = () => {
        setContactModalVisible(true);
    };

    const contactModalCancel = () => {
        setContactModalVisible(false);
    };

    const actionButtons = (data) => (
        <div className={"d-flex"}>
            <Tooltip title="Start">
                <Button
                    onClick={() => console.log('pusti crawler')}
                    disabled={data.is_done}
                    ghost
                    type="primary"
                    className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
                    icon={
                        <Play size="22" className="hp-text-color-black-80 hp-text-color-dark-30"/>
                    }
                />
            </Tooltip>
        </div>
    );

    const linkDetailsLink = (data) => {
        if (data.is_done) {
            return (
                <Link to={`/link-details/${data.id}`}>
                    {data.term}
                </Link>
            )
        }
        return (
            <span>
                {data.term}
            </span>
        )
    }

    const columns = [
        {
            title: 'Term',
            dataIndex: '',
            key: 'term',
            render: (data) => linkDetailsLink(data),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Additional Words',
            dataIndex: 'additional_words',
            key: 'additional_words',
        },
        {
            title: 'Search Date',
            dataIndex: 'search_date',
            key: 'search_date',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (data) => actionButtons(data),
        },
    ];

    const onFinish = async (values) => {
        const params = {
            term: values.term,
            owner: values.owner,
            location: values.location,
            additional_words: values.additional_words,
            search_date: searchDate,
        }
        await dispatch(createSearchJob(params));
    }

    const setCalendarFormat = (date, dateString) => {
        setSearchDate(dateString);
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    return (
        <>
        <Row>
            <Col span={24}>
                <div className={"d-flex justify-content-between mb-4"}>
                    <h2>Search Jobs</h2>
                    {/*<Link to="/add-new-term">*/}
                    <Button onClick={contactModalShow}>Add new Term</Button>
                    {/*</Link>*/}
                </div>
                <CustomizedFilterPanelTable data={jobs} columnsName={columns}/>
                <Modal
                    title="Contact Edit"
                    width={420}
                    centered
                    visible={contactModalVisible}
                    onCancel={contactModalCancel}
                    footer={null}
                    closeIcon={
                        <RiCloseFill className="remix-icon text-color-black-100" size={24}/>
                    }
                >
                    <Form layout="vertical" name="basic" form={form} onFinish={onFinish}>
                        <Form.Item label="Term" name="term" rules={[{required: true, message: "Please enter Term!"}]}>
                            <Input onChange={(e) => form.setFieldsValue({term: e.target.value})}/>
                        </Form.Item>

                        <Form.Item label="Owner" name="owner"
                                   rules={[{required: true, message: "Please enter Owner!"}]}>
                            <Input onChange={(e) => form.setFieldsValue({owner: e.target.value})}/>
                        </Form.Item>

                        <Form.Item label="Location" name="location" rules={[{required: true, message: "Please enter Location!"}]}>
                            <select className={"customDropDown"} onChange={(e) => form.setFieldsValue({location: e.target.value})}>
                                {
                                    countries.map((country) => {
                                        return (
                                            <option key={country.id} value={country.country_name}>{country.country_name}</option>
                                        )
                                    })
                                }
                            </select>
                    </Form.Item>

                    <Form.Item label="Additional Words" name="additional_words"
                               rules={[{required: true, message: "Please enter Additional Words!"}]}>
                        <Input onChange={(e) => form.setFieldsValue({additional_words: e.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Search Date" name="search_date"
                               rules={[{required: true, message: "Please enter Search Date!"}]}>
                        <DatePicker
                            format={dateFormat}
                            disabledDate={disabledDate}
                            className="hp-w-100"
                            suffixIcon={
                                <RiCalendarLine className="remix-icon hp-text-color-black-60"/>
                            }
                            onChange={setCalendarFormat}
                        />
                    </Form.Item>


                    <Row>
                        <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                            >
                                Create
                            </Button>
                        </Col>

                        <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
                            <Button block onClick={contactModalCancel}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Col>
        </Row>
</>
)
    ;
}