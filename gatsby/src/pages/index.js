import React from 'react';
import { LoadingGrid } from '../components/LoadingGrid';
import { HomePageGrid, ItemStyles } from '../styles/Grids';
import { useLatestData } from '../utils/useLatestData';
import { ItemGrid } from '../components/ItemGrid';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
`

const CurrentlySlicing = ({slicemasters}) => {
  return (
    <Container>
      <h2 className="center">
        <span className="mark tilt"> Slicemasters on </span>
        <p> Standing by, Ready to slice you up!</p>
      </h2>
      {!slicemasters && <LoadingGrid count={4}/>}
      {slicemasters && !slicemasters?.length && <p> No one is working right now</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters}/>}
    </Container>
  )
}

const HotSlices = ({hotSlices}) => {
  return (
    <Container>
      <h2 className="center">
        <span className="mark tilt"> HotSlices  on </span>
        <p> Come on by, buy the slice!</p>
      </h2>
      {!hotSlices && <LoadingGrid count={4}/>}
      {hotSlices && !hotSlices?.length && <p> Nothing in the case </p>}
      {hotSlices?.length && <ItemGrid items={hotSlices}/>}
    </Container>
  )
}

export default function HomePage() {
  const result = useLatestData();
  const {slicemasters, hotSlices} = result.state;

  return (
    <div className="center">
      <h1> The Best Pizza Downtown! </h1>
      <p> Open 11am to 11pm Every Single Day </p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} > </CurrentlySlicing>
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
