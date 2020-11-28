import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext'
import { attachNamesAndPrices } from './attachNamesAndPrices';
import { calculateOrderTotal } from './calculateOrderTotal';
import { formatMoney } from './formatMoney';


export const usePizza = ({ pizzas, values }) => {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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

  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessage('');

    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };


    // 4. Send this data the a serevrless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
      console.log(text)
    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    message,
    error,
    loading,
    submitOrder
  }
}