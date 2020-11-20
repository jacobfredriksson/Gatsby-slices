import React from 'react'
import styled from 'styled-components';
import Img from 'gatsby-image';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`


export const BeerList = ({beers}) => {

  console.table(beers.rating)
  return <BeerGridStyles>

     {beers.map(beer => (
       <div>
        <img src={beer.image} alt="A dog smiling in a party hat" />
         <div>
         {beer.name}
        </div>
        <div>
         {beer.price}
        </div>
        <div>
          <span> {beer.rating.average.toFixed(1)}</span>
          <span> {beer.rating.reviews}</span>
        </div>
      </div>
     ))}
  </BeerGridStyles>
}