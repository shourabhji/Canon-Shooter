import React from 'react';
import { pathFromBezierCurve } from '../utils/formula';

const Title = () => {
  const textStyle = {
    fontFamily: '"Joti One", cursive',
    fontSize: 120,
    fill: '#cbca62',
  };

  const Title1 = {
    initialAxis: {
      x: -190,
      y: -780,
    },
    initialControlPoint: {
      x: 95,
      y: -50,
    },
    endingControlPoint: {
      x: 285,
      y: -50,
    },
    endingAxis: {
      x: 380,
      y: 0,
    },
  };

  const Title2 = {
    ...Title1,
    initialAxis: {
      x: -250,
      y: -620,
    },
    initialControlPoint: {
      x: 125,
      y: -90,
    },
    endingControlPoint: {
      x: 375,
      y: -90,
    },
    endingAxis: {
      x: 500,
      y: 0,
    },
  };

  return (
    <g filter="url(#shadow)">
      <defs>
        <path
          id="Canon"
          d={pathFromBezierCurve(Title1)}
        />
        <path
          id="Shooter"
          d={pathFromBezierCurve(Title2)}
        />
      </defs>
      <text {...textStyle}>
        <textPath xlinkHref="#Canon">
          Canon,
        </textPath>
      </text>
      <text {...textStyle}>
        <textPath xlinkHref="#Shooter">
          Shooter!
        </textPath>
      </text>
    </g>
  );
};

export default Title;