import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { zoomIn, zoomOut } from 'react-animations';
import Navbar from '../../Components/Navbar';

const zoomInAnimation = keyframes`${zoomIn}`;
const zoomOutAnimation = keyframes`${zoomOut}`;

const ZoomInOut = styled.div`
  ${({ animation }) =>
    animation === 'zoomIn'
      ? css`
          animation: ${zoomInAnimation} 1s forwards;
        `
      : css`
          animation: ${zoomOutAnimation} 3s forwards;
        `}
`;

function HomePage() {
  const [animation, setAnimation] = useState('zoomIn');

  useEffect(() => {
    const timeout = setTimeout(() => {
      // After the first animation (zoomIn), switch to the second animation (zoomOut)
      setAnimation('zoomOut');
      
    }, 1200); // Set the delay to match the duration of the first animation

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="home-page">
      <ZoomInOut animation={animation}>
        <h1>Troubadour</h1>
      </ZoomInOut>
      <Navbar/>
    </div>
  );
}

export default HomePage;

