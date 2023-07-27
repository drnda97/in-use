import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router';

import { Row, Col } from "antd";

import Inventory from './inventory';
import OrderDetails from './checkout/OrderDetails';

export default function Ecommerce() {
  const cart = useSelector(state => state.ecommerce.cart)

  // Checkout Price
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += (item.qty * (item.discount ? item.discount : item.price))
    });

    setTotalItem(items);
    setTotalPrice(price);
  }, [cart, totalItem, totalPrice, setTotalItem, setTotalPrice]);

  return (
    <Row gutter={32} className="hp-ecommerce-app hp-mb-32">
      <Col span={24}>
        <Switch>
          <Route path="/link-details">
            <Inventory />
          </Route>

          <Route path="/add-new-term">
            <OrderDetails
              totalItem={totalItem}
              totalPrice={totalPrice}
            />
          </Route>

        </Switch>
      </Col>
    </Row >
  )
}