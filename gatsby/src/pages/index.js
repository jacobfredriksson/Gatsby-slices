import React from 'react';
import { useLatestData } from '../utils/useLatestData';

const CurrentlySlicing = ({slicemasters}) => {

  return (
    <div>
      <p> CurrentlySlicing </p>
    </div>
  )
}

const HotSlices = ({hotSlices}) => {

  return (
    <div>
      <p> HotSlices </p>
    </div>
  )
}

export default function HomePage() {
  const result = useLatestData();
  const {slicemasters, hotSlices} = result.state;

  return (
    <div className="center">
      <h1> The Best Pizza Downtown! </h1>
      <p> Open 11am to 11pm Every Single Day </p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} > </CurrentlySlicing>
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
