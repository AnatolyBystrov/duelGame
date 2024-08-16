import React from 'react';

const Bullet = ({ bullet }) => {
  return (
    <circle cx={bullet.x} cy={bullet.y} r={bullet.radius} fill={bullet.color} />
  );
};

export default Bullet;
