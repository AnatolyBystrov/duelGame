import React from 'react';
import Canvas from './components/Canvas';
import useGameLogic from './hooks/useGameLogic';
import SettingsPanel from './components/SettingsPanel';
import Menu from './components/Menu';

const App = () => {
  const { heroes, bullets, setHeroes } = useGameLogic();

  const draw = (context) => {
    context.clearRect(0, 0, 800, 400);
  
    // Draw heroes
    Object.keys(heroes).forEach((heroKey) => {
      const hero = heroes[heroKey];
      context.beginPath();
      context.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
      context.fillStyle = hero.color;
      context.fill();
      context.closePath();
    });
  
    // Draw bullets
    Object.keys(bullets).forEach((bulletKey) => {
      bullets[bulletKey].forEach((bullet) => {
        console.log('Drawing bullet:', bullet);
        context.beginPath();
        context.arc(bullet.x, bullet.y, 10, 0, Math.PI * 2);  // Increased size for visibility
        context.fillStyle = bullet.color;
        context.fill();
        context.closePath();
      });
    });
  };
  
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    Object.keys(heroes).forEach((heroKey) => {
      const hero = heroes[heroKey];
      const distance = Math.sqrt((hero.x - mouseX) ** 2 + (hero.y - mouseY) ** 2);

      if (distance < hero.radius + 10) {
        hero.dy = hero.dy !== 0 ? -hero.dy : 2;
        setHeroes((prev) => ({ ...prev, [heroKey]: hero }));
      }
    });
  };

  return (
    <div>
      <Canvas draw={draw} onClick={() => {}} onMouseMove={handleMouseMove} />
      <SettingsPanel heroConfig={heroes.hero1} onConfigChange={(newConfig) => {
        setHeroes((prev) => ({ ...prev, hero1: { ...prev.hero1, ...newConfig } }));
      }} />
      <SettingsPanel heroConfig={heroes.hero2} onConfigChange={(newConfig) => {
        setHeroes((prev) => ({ ...prev, hero2: { ...prev.hero2, ...newConfig } }));
      }} />
      <Menu hero={heroes.hero1} onChangeColor={(color) => {
        setHeroes((prev) => ({ ...prev, hero1: { ...prev.hero1, bulletColor: color } }));
      }} />
      <Menu hero={heroes.hero2} onChangeColor={(color) => {
        setHeroes((prev) => ({ ...prev, hero2: { ...prev.hero2, bulletColor: color } }));
      }} />
    </div>
  );
};

export default App;
