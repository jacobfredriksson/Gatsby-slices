import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import {ToppingsFilter} from '../components/ToppingsFilter';

export default function PizzasPage({data, pageContext}) {

  const {pizzas} = data.data
  return (
    <>
      <ToppingsFilter activeTopping={pageContext.topping}/>
      <PizzaList pizzas={pizzas}/>
    </>
  );
}

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    data: allSanityPizza(
      filter: { toppings: {elemMatch: {name: {regex: $toppingRegex }}}}
    ) {
      pizzas: nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width:200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;