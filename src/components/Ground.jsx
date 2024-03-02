import React from 'react';

const Ground = () => {
  const groundStyle = {
    fill: 'url(#groundGradient)',
  };
  const division = {
    stroke: '#458232',
    strokeWidth: '3px',
  };

  const groundWidth = 5000;

  return (
    <g id="ground">
      <defs>
        <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#59a941', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#408026', stopOpacity: 1 }} />
        </linearGradient>
        <pattern id="groundTexture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <image xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR42mP8z/CfAQMVAv89HwBi5YB5Rdk0AAAAASUVORK5CYII=" x="0" y="0" width="100" height="100" />
        </pattern>
      </defs>
      <rect
        id="ground-2"
        data-name="ground"
        style={groundStyle}
        x={groundWidth / -2}
        y={0}
        width={groundWidth}
        height={100}
      />
      <line
        x1={groundWidth / -2}
        y1={0}
        x2={groundWidth / 2}
        y2={0}
        style={division}
      />
    </g>
  );
};

export default Ground;
