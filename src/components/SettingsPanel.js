import React from 'react';

const SettingsPanel = ({ heroConfig, onConfigChange }) => {
  return (
    <div>
      <label>
        Speed:
        <input
          type="range"
          min="1"
          max="10"
          value={Math.abs(heroConfig.dy)}  // Handle speed separately
          onChange={(e) => onConfigChange({ dy: parseInt(e.target.value, 10) })}
        />
      </label>
      <label>
        Fire Rate:
        <input
          type="range"
          min="200"
          max="2000"
          value={heroConfig.fireRate}  // Handle fire rate separately
          onChange={(e) => onConfigChange({ fireRate: parseInt(e.target.value, 10) })}
        />
      </label>
    </div>
  );
};

export default SettingsPanel;
