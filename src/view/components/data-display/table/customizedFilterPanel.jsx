import React from "react";

import { Table, Row, Col, Card } from "antd";

export default function CustomizedFilterPanelTable({data, columnsName}) {
  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col span={24}>
          <Table columns={columnsName} dataSource={data} scroll={{ x: 500 }} />
        </Col>
      </Row>
    </Card>
  );
}
