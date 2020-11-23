import React from 'react'
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
    img{
      width: 100%;
      height: 200px;
      object-fit: contain;
      display: grid;
      align-items: center;
      font-size: 10px;
      color: black;
    }
`;


export const BeerList = ({beers}) => {

  console.table(beers.rating)
  return <BeerGridStyles>

     {beers.map((beer) => {
       const rating = Math.round(beer.rating.average)
       return <SingleBeerStyles key={beer.id}>
        {/* <img src={beer.image} alt="A dog smiling in a party hat" /> */}
         <div>
         {beer.name}
        </div>
        <div>
         {beer.price}
        </div>
        <div>
          <p title={`${rating} out of 5 stars`}>
            {`⭐️`.repeat(rating)}
            <span style={{filter: `grayscale(100%)`}}> {`⭐️`.repeat(5 - rating)}</span>
            <span>({beer.rating.reviews})</span>
          </p>
        </div>
      </SingleBeerStyles>
      })}
  </BeerGridStyles>
}