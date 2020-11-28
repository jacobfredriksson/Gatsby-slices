import { graphql } from 'gatsby';
import React from 'react';
import { SEO } from '../components/SEO';
import { useForm } from '../utils/useForm'
import Img from 'gatsby-image'
import {calculatePizzaPrice} from '../utils/calculatePizzaPrice'
import {formatMoney} from '../utils/formatMoney'
import {OrderStyles} from '../styles/OrderStyles'
import {MenuItemStyles} from '../styles/MenuItemStyles'
import { usePizza } from '../utils/usePizza';
import { calculateOrderTotal } from '../utils/calculateOrderTotal';
import { PizzaOrder } from '../components/PizzaOrder';


export default function OrderPage({data}) {
  const {values, updateValue } = useForm({
    name: '',
    email: ''
  })
  const pizzas = data.pizzas.nodes;
  const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({pizzas, values});

  if (message) {
    return <p> {message} </p>
  }
  return (
    <>
      <SEO title="Order a pizza!"/>
      <OrderStyles onSubmit={submitOrder}>
        <fieldset>
          <legend> Your Info </legend>
          <label htmlFor="name"> Name </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
            id="email"
          />
        </fieldset>
        <fieldset className="menu">
          <legend > Menu</legend>
          {pizzas.map((pizza, i) => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name}/>
              <div>
                <h2> { pizza.name }</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button type="button" key={size} onClick={() =>
                  addToOrder({
                    id: pizza.id,
                    size
                    })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend >
            Order
          </legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
        </fieldset>
        <fieldset>
          <h3>
            Your Total Is {formatMoney(calculateOrderTotal(order,pizzas))}
          </h3>
          <div>
                  {error ? <p> Error: {error} </p> : '' }
          </div>
          <button
            type="submit"
            disabled={loading}>
              {loading ? 'Placing order...' : 'Order ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
query {
  pizzas: allSanityPizza {
    nodes {
      name
      id
      slug {
        current
      }
      price
      image {
        asset {
          fluid(maxWidth: 100) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
}`