import React from 'react';
import PropTypes from 'prop-types';
import { pathFromBezierCurve } from "@/utils/formula"; 

const CannonPipe = (props) => {
  const cannonPipeStyle = {
    fill: '#999',
    stroke: '#666',
    strokeWidth: '2px',
  };
  const arrowStyle = {
    fill: 'rgba(255, 0, 0, 0.5)', // Semi-transparent red color for the arrow
    stroke: 'none',
  };
  const transform = `rotate(${props.rotation}, 0, 0)`;

  const muzzleWidth = 40;
  const halfMuzzle = 20;
  const height = 100;
  const yBasis = 70;

  const cubicBezierCurve = {
    initialAxis: {
      x: -halfMuzzle,
      y: -yBasis,
    },
    initialControlPoint: {
      x: -40,
      y: height * 1.7,
    },
    endingControlPoint: {
      x: 80,
      y: height * 1.7,
    },
    endingAxis: {
      x: muzzleWidth,
      y: 0,
    },
  };

  return (
    <g transform={transform}>
      {/* Cannon pipe */}
      <path
        style={cannonPipeStyle}
        d={pathFromBezierCurve(cubicBezierCurve)}
      />
      <line
        x1={-halfMuzzle}
        y1={-yBasis}
        x2={halfMuzzle}
        y2={-yBasis}
        style={cannonPipeStyle}
      />

      {/* Semi-transparent arrow */}
      <polygon
        points={`${muzzleWidth / 2},${-yBasis - 10} ${muzzleWidth / 2 + 20},${-yBasis - 20} ${muzzleWidth / 2 + 20},${-yBasis} ${muzzleWidth / 2},${-yBasis + 10}`}
        style={arrowStyle}
      />
    </g>
  );
};

CannonPipe.propTypes = {
  rotation: PropTypes.number.isRequired,
};

export default CannonPipe;
