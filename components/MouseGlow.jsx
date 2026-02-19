import React, { useEffect, useRef } from 'react';

const MouseGlow = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            // Smooth interpolation ease-out effect
            // glowX += (mouseX - glowX) * 0.25;
            // glowY += (mouseY - glowY) * 0.25;

            if (glow) {
                glow.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            }
            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <div ref={glowRef} className="mouse-glow" />;
};

export default MouseGlow;
