import React from 'react'
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 20px 0;
`;

export default function SingleToppingPage({ data: {pizzas} }) {
  const { edges } = pizzas
  console.log(edges)


  return <>
    {edges.map((pizza) => (
      <PizzaGrid>
        <Img fluid={pizza.node.image.asset.fluid} />
        <div>
          <h2 className="mark">{pizza.node.name}</h2>
          <ul>
            {pizza.node.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>

   ))}
</>
}


export const query = graphql`
  query($name: String!) {
    pizzas: allSanityPizza(filter: {toppings: {elemMatch: {name: {eq: $name}}}}) {
    edges {
      node {
        id
        name
        image {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
        toppings {
          name
          id
          vegetarian
        }
      }
    }
  }
  }
`;

