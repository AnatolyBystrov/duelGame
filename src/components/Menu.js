import React from 'react';

const Menu = ({ hero, onChangeColor }) => {
  return (
    <div>
      <label>
        Bullet Color:
        <input
          type="color"
          value={hero.bulletColor}
          onChange={(e) => onChangeColor(e.target.value)}
        />
      </label>
    </div>
  );
};

export default Menu;
