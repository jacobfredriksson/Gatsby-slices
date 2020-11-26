import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext'

export const usePizza = ({ pizzas, inputs }) => {
  const [order, setOrder] = useContext(OrderContext);

  const addToOrder = (orderedPizza) => {
    console.log("addToOrder")
    setOrder([...order, orderedPizza]);
  }

  const removeFromOrder = (index) => {
    setOrder([
      ...order.slice(0, index),
      ...order.slice(index + 1)
    ])
  }

  return {
    order,
    addToOrder,
    removeFromOrder
  }
}