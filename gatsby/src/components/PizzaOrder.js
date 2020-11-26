import React from 'react';
import {MenuItemStyles} from '../styles/MenuItemStyles'
import Img from 'gatsby-image';
import {formatMoney} from '../utils/formatMoney'
import { calculatePizzaPrice } from '../utils/calculatePizzaPrice'



export const PizzaOrder = ({order, pizzas, removeFromOrder }) => {
  console.log(pizzas, order, removeFromOrder)
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find(pizza => pizza.id === singleOrder.id)
        return <MenuItemStyles key={singleOrder.id}>
          <Img fluid={pizza.image.asset.fluid}/>
          <h2> {singleOrder.name}</h2>
          <p>
            {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            <button
              type="button"
              className="remove"
              title={`Remove ${singleOrder.size} ${pizza.name} from order`}
              onClick={() => removeFromOrder(index)}
            > ❌ </button>
          </p>
        </MenuItemStyles>
      })}
    </>
  );
}