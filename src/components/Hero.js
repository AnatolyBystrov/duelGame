import React from 'react';

const Hero = ({ hero }) => {
  return (
    <circle cx={hero.x} cy={hero.y} r={hero.radius} fill={hero.color} />
  );
};

export default Hero;
