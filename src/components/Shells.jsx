import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { gameHeight } from '../utils/constants';

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${-1000}px);
  }
`;

const Move1 = styled.g`
  animation: ${moveVertically} 4s linear;
`;

const Shells = (props) => {
  const ballStyle = {
    fill: '#777',
    stroke: '#444',
    strokeWidth: '2px',
  };

  // Calculate initial position of the shell
  const { rotation } = props.cannonProps;
  const cannonLength = 100; // Adjust this according to your cannon's dimensions
  const muzzleX = cannonLength * Math.cos((rotation * Math.PI) / 180); // Convert degrees to radians
  const muzzleY = cannonLength * Math.sin((rotation * Math.PI) / 180);

  return (
    <Move1>
      <ellipse
        style={ballStyle}
        cx={props.position.x + muzzleX} // Adjusting position based on cannon's rotation
        cy={props.position.y + muzzleY} // Adjusting position based on cannon's rotation
        rx="16"
        ry="16"
      />
    </Move1>
  );
};

Shells.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  cannonProps: PropTypes.shape({
    rotation: PropTypes.number.isRequired
  }).isRequired
};

export default Shells;
