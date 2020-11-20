import React from 'react';
import { BeerList } from '../components/BeersList'


export default function BeersPage({data}) {
  const {nodes} = data.beers

  return (
    <>
      <BeerList beers={nodes}/>
    </>
  );
}


export const query = graphql`
  {
    beers: allBeer {
        nodes {
        name
        price
        rating {
          reviews
          average
        }
        image
      }
    }
  }
`;