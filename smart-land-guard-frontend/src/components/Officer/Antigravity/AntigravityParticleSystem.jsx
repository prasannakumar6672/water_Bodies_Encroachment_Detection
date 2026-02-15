import React, { useEffect, useRef } from 'react';

export default function AntigravityParticleSystem() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * canvas.width;
                this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
                this.size = Math.random() * 3 + 1; // 1-4px
                this.speed = Math.random() * 1.7 + 0.8; // 0.8-2.5px
                this.color = Math.random() > 0.4 ? 'rgba(0, 217, 255, ' : (Math.random() > 0.3 ? 'rgba(0, 201, 167, ' : 'rgba(255, 255, 255, ');
                this.opacity = Math.random() * 0.5 + 0.2;
                this.wobble = Math.random() * Math.PI * 2;
                this.wobbleSpeed = Math.random() * 0.05 + 0.02;
            }

            update() {
                this.y -= this.speed;
                this.wobble += this.wobbleSpeed;
                this.x += Math.sin(this.wobble) * 0.5;

                if (this.y < -20) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                // Glow effect
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
                gradient.addColorStop(0, this.color + this.opacity + ')');
                gradient.addColorStop(1, this.color + '0)');

                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.fillStyle = this.color + (this.opacity + 0.2) + ')';
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 150; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'linear-gradient(to bottom, #0A0E1A, #0f172a)' }}
        />
    );
}
