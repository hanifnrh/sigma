// components/ParticlesBackground.js
"use client";
import { useEffect } from 'react';

const ParticlesBackground = () => {
    useEffect(() => {
        // Load the particles.js script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            // Initialize particles.js after the script is loaded
            particlesJS('particles-background', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 700,
                        },
                    },
                    color: {
                        value: ['#8A92A6', '#FFE3A4', '#F5A67E'],
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 1,
                            color: '#fff',
                        },
                        polygon: {
                            nb_sides: 3,
                        },
                    },
                    opacity: {
                        value: 0.8,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1.5,
                            opacity_min: 0.15,
                            sync: false,
                        },
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 20,
                            size_min: 0.15,
                            sync: false,
                        },
                    },
                    line_linked: {
                        enable: true,
                        distance: 80,
                        color: '#006692',
                        opacity: 0.75,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1.2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: true,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab',
                        },
                        onclick: {
                            enable: true,
                            mode: 'push',
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 150,
                            line_linked: {
                                opacity: 0.6,
                            },
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                        push: {
                            particles_nb: 7,
                        },
                        remove: {
                            particles_nb: 2,
                        },
                    },
                },
                retina_detect: true,
            });
        };
        document.body.appendChild(script);

        // Clean up script when component is unmounted
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="particles-background" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>;
};

export default ParticlesBackground;
