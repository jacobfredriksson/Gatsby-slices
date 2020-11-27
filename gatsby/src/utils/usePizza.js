import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext'

export const usePizza = ({ pizzas, inputs }) => {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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