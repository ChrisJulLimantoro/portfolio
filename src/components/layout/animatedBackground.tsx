'use client';
import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // particle creation
    const createParticle = (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.5 + 0.2;
      const hues = [160, 180, 200];
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 60 + 60,
        maxLife: 100,
        size: Math.random() * 2 + 0.5,
        hue: hues[Math.floor(Math.random() * hues.length)],
      };
    };

    // initial particles
    const particles = particlesRef.current;
    for (let i = 0; i < 120; i++) {
      particles.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }

    const spotlightRadius = 140;

    const animate = () => {
      ctx.fillStyle = 'rgba(15,23,42,1)'; // dark base
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.5;

        // recycle
        if (p.life <= 0) {
          particles[i] = createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
          continue;
        }

        // wrap screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // only show near mouse
        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < spotlightRadius) {
          const factor = 1 - dist / spotlightRadius;
          const opacity = factor * factor * (p.life / p.maxLife) * 0.5;

          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 4
          );
          gradient.addColorStop(0, `hsla(${p.hue},70%,60%,${opacity})`);
          gradient.addColorStop(1, `hsla(${p.hue},70%,60%,0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // soft spotlight fade
      if (mousePos.x > -500) {
        const g = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          spotlightRadius
        );
        g.addColorStop(0, 'rgba(6,182,212,0.05)');
        g.addColorStop(0.5, 'rgba(16,185,129,0.03)');
        g.addColorStop(1, 'rgba(15,23,42,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) =>
    setMousePos({ x: e.clientX, y: e.clientY });

  const handleMouseLeave = () => setMousePos({ x: -1000, y: -1000 });

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{
        zIndex: -1,
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        mixBlendMode: 'screen',
      }}
    />
  );
}
