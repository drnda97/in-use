import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import Chart from "react-apexcharts";
import customise from "../../../configs/themeConfig";

const SearchEnginesChart = () => {
    useEffect(() => {

    }, [])


    const [data] = useState({
        series: [
            {
                name: "Balance",
                data: [
                    123, 321, 111, 321, 112, 213, 54, 12, 333, 156,
                    390,
                ],
            },
        ],
        options: {
            chart: {
                fontFamily: "Manrope, sans-serif",
                type: "bar",
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            labels: {
                style: {
                    fontSize: "14px",
                },
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                borderColor: "#B2BEC3",
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 2,
                    columnWidth: "60%",
                    endingShape: "rounded",
                    colors: {
                        backgroundBarColors: ['#B2BEC3'],
                        backgroundBarOpacity: 0.2,
                    }
                },
            },
            fill: {
                opacity: 1,
                colors: [customise.theme === 'light' ? '#2D3436' : '#ffffff']
            },
            stroke: {
                show: true,
                width: 4,
                colors: ["transparent"],
            },
            xaxis: {
                axisTicks: {
                    show: false,
                    borderType: "solid",
                    height: 6,
                    offsetX: 0,
                    offsetY: 0,
                },
                tickPlacement: "between",
                labels: {
                    style: {
                        colors: ["#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3", "#B2BEC3"],
                        fontSize: "12px",
                    },
                },
                categories: [
                    "Google",
                    "Yahoo",
                    "Bing",
                    "DuckDuckGo",
                    "Yandex",
                    "Baidu",
                    "Ask.com",
                    "Naver",
                    "Ecosia",
                    "AOL",
                    "Internet Archive",
                ],
            },
            legend: {
                horizontalAlign: "right",
                offsetX: 40,
                position: "top",
                markers: {
                    radius: 12,
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ["#636E72"],
                        fontSize: "14px",
                    },
                    formatter: (value) => {
                        return value;
                    },
                },
                min: 0,
                max: 400,
                tickAmount: 4,
            },
        },
    });

    return (
        <Row className={"hp-mb-6"}>
            <Col span={24} className="hp-mb-18">
                <Row align="middle" justify="space-between">
                    <Col>
                        <span className="hp-d-block hp-p1-body">Usage</span>
                        {/*<span className="hp-d-block hp-mt-4 h3 hp-font-weight-600 hp-text-color-black-bg hp-text-color-dark-0">$12.389</span>*/}
                    </Col>

                    <Col>
                        <span className="hp-p1-body hp-d-block">Past 30 Days</span>
                    </Col>
                </Row>
            </Col>

            <Col span={24} className="hp-overflow-hidden">
                <Chart
                    options={data.options}
                    series={data.series}
                    type="bar"
                    width="100%"
                    height={250}
                    legend="legend"
                />
            </Col>
        </Row>
    )
}
export default SearchEnginesChart;