import { useState, useEffect } from 'react';
import { detectCollision } from '../utils/Collision';

const useGameLogic = () => {
  const [heroes, setHeroes] = useState({
    hero1: { x: 30, y: 200, radius: 20, dy: 2, color: 'red', bulletColor: 'black', fireRate: 1000 },
    hero2: { x: 770, y: 200, radius: 20, dy: 2, color: 'blue', bulletColor: 'black', fireRate: 1000 },
  });

  const [bullets, setBullets] = useState({
    hero1: [], // Array to hold bullets fired by hero1
    hero2: []  // Array to hold bullets fired by hero2
  });

  // Update heroes' positions based on dy (speed)
  const updateHeroes = () => {
    setHeroes((prevHeroes) => {
      const newHeroes = { ...prevHeroes };
      Object.keys(newHeroes).forEach((heroKey) => {
        const hero = newHeroes[heroKey];
        
        hero.y += hero.dy;

        if (hero.y <= hero.radius || hero.y >= 400 - hero.radius) {
          hero.dy = -hero.dy; // Reverse direction if hitting top or bottom
        }
      });
      return newHeroes;
    });
  };

  // Fire a bullet in the direction specified (right or left)
  const fireBullet = (heroKey, direction) => {
    const hero = heroes[heroKey];
  
    if (!hero) {
      console.error(`Hero with key ${heroKey} not found!`);
      return;
    }
  
    const newBullet = {
      x: hero.x + (direction === 'right' ? hero.radius : -hero.radius),
      y: hero.y,
      dx: direction === 'right' ? 2 : -2,  // Adjust speed for bullet visibility
      color: hero.bulletColor || 'red',  // Ensure bullet color is set
    };
  
    console.log(`Firing bullet from ${heroKey}:`, newBullet);
  
    setBullets((prevBullets) => ({
      ...prevBullets,
      [heroKey]: [...prevBullets[heroKey], newBullet],  // Add the new bullet to the correct array
    }));
  };

  // Update bullets' positions and handle collisions
  const updateBullets = () => {
    setBullets((prevBullets) => {
      const newBullets = { ...prevBullets };
      Object.keys(newBullets).forEach((key) => {
        newBullets[key] = newBullets[key].map((bullet) => {
          bullet.x += bullet.dx;
          return bullet;
        }).filter((bullet) => {
          const targetHero = key === 'bullets1' ? heroes.hero2 : heroes.hero1;
          if (detectCollision(bullet, targetHero)) {
            console.log('Collision detected');
            return false;  // Remove bullet on collision
          }
          return bullet.x > 0 && bullet.x < 800;  // Keep bullets on the screen
        });
      });
      return newBullets;
    });
  };

  // Main game loop to update heroes and bullets
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateHeroes();
      updateBullets();
    }, 1000 / 60);  // 60 FPS

    return () => clearInterval(intervalId);
  }, [heroes, bullets]);

  // Fire bullets based on each hero's fire rate
  useEffect(() => {
    const fireInterval1 = setInterval(() => {
      fireBullet('hero1', 'right');
    }, heroes.hero1.fireRate);

    const fireInterval2 = setInterval(() => {
      fireBullet('hero2', 'left');
    }, heroes.hero2.fireRate);

    return () => {
      clearInterval(fireInterval1);
      clearInterval(fireInterval2);
    };
  }, [heroes.hero1.fireRate, heroes.hero2.fireRate]);

  return { heroes, bullets, setHeroes };
};

export default useGameLogic;
