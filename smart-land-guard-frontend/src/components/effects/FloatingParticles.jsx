import React, { useRef, useEffect } from 'react';

export default function FloatingParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const createParticle = () => {
            const size = Math.random() * 2 + 1;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height + canvas.height, // Start below or random
                size: size,
                speedY: Math.random() * 1.5 + 0.5, // 0.5 to 2px upward
                speedX: Math.random() * 0.5 - 0.25, // Slight horizontal drift
                color: `rgba(0, 217, 255, ${Math.random() * 0.4 + 0.3})`, // Cyan opacity 0.3-0.7
                angle: Math.random() * Math.PI * 2, // For wave motion
                amplitude: Math.random() * 20 + 10 // Wave width
            };
        };

        const initParticles = () => {
            const particleCount = window.innerWidth < 768 ? 50 : 120;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                // Initialize randomly on screen
                const p = createParticle();
                p.y = Math.random() * canvas.height;
                particles.push(p);
            }
        };

        const updateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

            particles.forEach((p, index) => {
                // Update position
                p.y -= p.speedY;
                p.angle += 0.01;
                p.x += Math.sin(p.angle) * 0.5; // Slight sine wave movement

                // Reset if top reached
                if (p.y + p.size < 0) {
                    particles[index] = createParticle(); // Respawn
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Glow Effect (Radial Gradient)
                const gradient = ctx.createRadialGradient(p.x, p.y, p.size, p.x, p.y, p.size * 4);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(updateParticles);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        updateParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ width: '100vw', height: '100vh' }}
        />
    );
}
