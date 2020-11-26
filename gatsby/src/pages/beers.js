import React from 'react';
import { BeerList } from '../components/BeersList'
import { SEO } from '../components/SEO';


export default function BeersPage({data}) {
  const {nodes} = data.beers

  return (
    <>
      <SEO title={ `Beers! We have ${data.beers.nodes.length} in stock`}/>
      {/* <BeerList beers={nodes}/> */}
    </>
  );
}


// export const query = graphql`
//   {
//     beers: allBeer {
//         nodes {
//         name
//         id
//         price
//         image
//         rating {
//           reviews
//           average
//         }
//         image
//       }
//     }
//   }
// `;