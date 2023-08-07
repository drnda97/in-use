import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "antd";
import {ExportSquare, ImportSquare, MoneyRecive, MoneySend, WalletMinus} from "iconsax-react";

import HistoryUser1 from "../../../../assets/images/users/profile.jpg";
import HistoryUser2 from "../../../../assets/images/users/mirjana_saric.png";
import HistoryUser3 from "../../../../assets/images/users/natasa.png";
import ZendeskLogo from "../../../../assets/images/dasboard/zendesk-logo.svg";
import SalesForceLogo from "../../../../assets/images/dasboard/sales-force-logo.svg";
import AppleLogo from "../../../../assets/images/dasboard/apple-logo.svg";
import GoogleLogo from "../../../../assets/images/dasboard/google-logo.svg";
import VirginLogo from "../../../../assets/images/dasboard/virgin-logo.svg";

import FeatureCard from "./featureCard";
import BalanceCard from "./balanceCard";
import ListCard from "./listCard";
import HistoryCard from "./historyCard";
import CreditCard from "./creditCard";
import {getSearchJobs, getSearchJobsInProgress} from "../../../../redux/searchJobs/searchJobActions";

export default function Analytics() {
    const dispatch = useDispatch();
    const customise = useSelector(state => state.customise);

    const [finished, setFinished] = useState([]);
    const [notFinished, setNotFinished] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await dispatch(getSearchJobs({is_done: true})).then(res => {
            let data = res.payload.data && res.payload.data?.slice(0, 10);
            setFinished(data);
        });
        await dispatch(getSearchJobsInProgress())
            .then(res => setNotFinished((res.payload.data && res.payload.data?.slice(0, 3)) || []));
        await dispatch(getSearchJobs({is_done: false}))
            .then(res => setNotFinished(recentData => [...recentData, res.payload.data.slice(0, 5 - notFinished.length )]));
    }

    return (
        <Row gutter={[32, 32]} className="hp-mb-32">
            <Col flex="1" className="hp-overflow-hidden">
                <Row gutter={[32, 32]}>
                    <Col span={24}>
                        <h1 className="hp-mb-0">Dashboard</h1>
                    </Col>

                    <Col span={24}>
                        <Row gutter={[32, 32]}>
                            <Col sm={8} span={24}>
                                <FeatureCard
                                    icon={
                                        <MoneyRecive
                                            size="24"
                                            variant="Bold"
                                            className="hp-text-color-black-bg hp-text-color-dark-0"
                                        />
                                    }
                                    title='Income'
                                    titleIcon={
                                        <ExportSquare
                                            size="14"
                                            variant="Bold"
                                            className="hp-text-color-success-1"
                                        />
                                    }
                                    date='April 2022'
                                    price='$13,908'
                                />
                            </Col>

                            <Col sm={8} span={24}>
                                <FeatureCard
                                    icon={
                                        <MoneySend
                                            size="24"
                                            variant="Bold"
                                            className="hp-text-color-black-bg hp-text-color-dark-0"
                                        />
                                    }
                                    title='Expenses'
                                    titleIcon={
                                        <ImportSquare
                                            size="14"
                                            variant="Bold"
                                            className="hp-text-color-danger-1"
                                        />
                                    }
                                    date='April 2022'
                                    price='$7,949'
                                />
                            </Col>

                            <Col sm={8} span={24}>
                                <FeatureCard
                                    icon={
                                        <WalletMinus
                                            size="24"
                                            variant="Bold"
                                            className="hp-text-color-black-bg hp-text-color-dark-0"
                                        />
                                    }
                                    title='Balance'
                                    date='April 2022'
                                    price='$5,129'
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <BalanceCard/>
                    </Col>

                    <Col span={24}>
                        <HistoryCard
                            list={[
                                {
                                    avatar: HistoryUser1,
                                    avatarBg: ' hp-bg-danger-4',
                                    name: 'Tatjana Stanojevic',
                                    title: 'Product Designer',
                                    price: '7734.32',
                                    number: '30432',
                                    percent: '23.23%'
                                },
                                {
                                    avatar: HistoryUser2,
                                    avatarBg: ' hp-bg-info-4',
                                    name: 'Mirjana Saric',
                                    title: 'Product Designer',
                                    price: '7614.43',
                                    number: '949',
                                    percent: '19.03%'
                                },
                                {
                                    avatar: HistoryUser3,
                                    avatarBg: ' hp-bg-warning-4',
                                    name: 'Natasa Stankovic',
                                    title: 'Product Designer',
                                    price: '6789.19',
                                    number: '732',
                                    percent: '13.98%'
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </Col>

            {
                customise.contentWidth === "boxed" && (
                    <Col className="hp-dashboard-line hp-px-0">
                        <div className="hp-bg-black-40 hp-bg-dark-80 hp-h-100 hp-mx-24" style={{width: 1}}></div>
                    </Col>
                )
            }

            <Col className={`hp-analytics-col-2${customise.contentWidth && ' hp-boxed-active'}`}>
                <Row gutter={[32, 40]}>
                    <Col span={24}>
                        <CreditCard/>
                    </Col>

                    <Col span={24}>
                        <ListCard
                            title='Finished Search Jobs'
                            date=''
                            list={finished?.map((finish) => {
                                return {
                                    img: GoogleLogo,
                                    title: finish.term,
                                    date: finish.search_date.replaceAll("-", " "),
                                    location: finish.location
                                }
                            })}
                        />
                    </Col>

                    <Col span={24}>
                        <ListCard
                            title='Upcoming Search Jobs'
                            date=''
                            list={notFinished[0]?.map((finish, index) => {
                                return {
                                    img: GoogleLogo,
                                    title: finish.term,
                                    date: finish.search_date.replaceAll("-", " "),
                                    location: finish.location
                                }
                            })}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
