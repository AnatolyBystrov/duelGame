import React, { useRef, useEffect } from 'react';

const Canvas = ({ draw, onClick, onMouseMove }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      draw(context);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      style={{ border: '1px solid black' }}
      onClick={onClick}
      onMouseMove={onMouseMove}
    />
  );
};

export default Canvas;
