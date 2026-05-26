/*
 * MindMap AI - Background Canvas and Parallax Systems
 * Implements high-performance physics-based particle fields, mouse parallax, and floating anti-gravity entities.
 */

(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracking
    let mouse = { x: null, y: null, targetX: 0, targetY: 0, active: false };

    // Particle settings
    const particles = [];
    const antiGravityObjects = [];
    const maxParticles = 60;
    const maxAntiGravity = 6;

    // Theme color palettes
    const themeColors = {
        'home': { primary: 'rgba(82, 140, 111, 0.12)', alt: 'rgba(200, 192, 180, 0.12)', spark: '#528c6f' },
        'ai-companion': { primary: 'rgba(79, 70, 229, 0.12)', alt: 'rgba(139, 92, 246, 0.12)', spark: '#4f46e5' },
        'focus-tracking': { primary: 'rgba(107, 114, 128, 0.12)', alt: 'rgba(180, 176, 167, 0.12)', spark: '#6b7280' },
        'mood-analytics': { primary: 'rgba(168, 85, 247, 0.12)', alt: 'rgba(236, 72, 153, 0.12)', spark: '#a855f7' },
        'burnout-detection': { primary: 'rgba(99, 102, 241, 0.12)', alt: 'rgba(6, 182, 212, 0.12)', spark: '#6366f1' },
        'study-planner': { primary: 'rgba(2, 132, 199, 0.12)', alt: 'rgba(16, 185, 129, 0.12)', spark: '#0284c7' },
        'predictive-insights': { primary: 'rgba(8, 145, 178, 0.12)', alt: 'rgba(5, 150, 105, 0.12)', spark: '#0891b2' }
    };

    let activeColors = themeColors['home'];

    // Standard floating star particle class
    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.0 + 0.4;
            this.speed = Math.random() * 0.15 + 0.05;
            this.opacity = Math.random() * 0.6 + 0.15;
            this.fadeSpeed = Math.random() * 0.004 + 0.001;
            this.fadeDir = Math.random() > 0.5 ? 1 : -1;
        }

        update() {
            // Slow upwards drift (calm movement)
            this.y -= this.speed;
            // Add a slow horizontal wave sway
            this.x += Math.sin(this.y * 0.01) * 0.12;
            if (this.y < 0 || this.x < 0 || this.x > width) {
                this.reset();
                this.y = height;
            }

            // Gently twinkle
            this.opacity += this.fadeSpeed * this.fadeDir;
            if (this.opacity > 0.8) {
                this.fadeDir = -1;
            } else if (this.opacity < 0.1) {
                this.fadeDir = 1;
            }
        }

        draw() {
            ctx.fillStyle = activeColors.spark;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Large floating glass-like Anti-gravity Objects
    class AntiGravityObject {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 40 + 20; // 20 to 60px radius
            
            // Random walk speed
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            
            // Rotation angle
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.003;
            
            this.opacity = Math.random() * 0.15 + 0.05;
            this.shape = Math.random() > 0.5 ? 'circle' : 'poly';
            this.sides = Math.floor(Math.random() * 3) + 3; // 3 to 5 sides
        }

        update() {
            // Apply mouse attraction (gentle pull)
            if (mouse.active && mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 400) {
                    // Attraction force increases slightly as you get closer, but capped
                    const force = (400 - dist) * 0.00008;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }

            // Damp speed to prevent acceleration runaways
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Move
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.rotationSpeed;

            // Handle edge wrapping with safety padding
            const pad = this.radius * 1.5;
            if (this.x < -pad) this.x = width + pad;
            if (this.x > width + pad) this.x = -pad;
            if (this.y < -pad) this.y = height + pad;
            if (this.y > height + pad) this.y = -pad;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            // Draw radial glass-gradient filled shapes
            const gradient = ctx.createRadialGradient(-10, -10, 0, 0, 0, this.radius);
            gradient.addColorStop(0, activeColors.alt);
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
            gradient.addColorStop(1, activeColors.primary);

            ctx.fillStyle = gradient;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.globalAlpha = this.opacity;

            ctx.beginPath();
            if (this.shape === 'circle') {
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            } else {
                // Draw regular polygon
                for (let i = 0; i < this.sides; i++) {
                    const xAngle = (i * Math.PI * 2) / this.sides;
                    const px = Math.cos(xAngle) * this.radius;
                    const py = Math.sin(xAngle) * this.radius;
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
            }
            ctx.fill();
            ctx.stroke();

            // Glass reflection highlight line
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            if (this.shape === 'circle') {
                ctx.arc(0, 0, this.radius, Math.PI * 1.25, Math.PI * 1.75);
            } else {
                ctx.moveTo(Math.cos(Math.PI * 1.2) * this.radius, Math.sin(Math.PI * 1.2) * this.radius);
                ctx.lineTo(Math.cos(Math.PI * 1.8) * this.radius, Math.sin(Math.PI * 1.8) * this.radius);
            }
            ctx.stroke();

            ctx.restore();
        }
    }

    // Initialize systems
    function init() {
        particles.length = 0;
        antiGravityObjects.length = 0;

        // Generate stars
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Star());
        }

        // Generate floaters
        for (let i = 0; i < maxAntiGravity; i++) {
            antiGravityObjects.push(new AntiGravityObject());
        }
    }

    // Game loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = 1;

        // Smooth mouse target interpolation for lagless hover reactions
        if (mouse.x !== null) {
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }

        // Render & Update stars
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Render & Update floaters
        antiGravityObjects.forEach(obj => {
            obj.update();
            obj.draw();
        });

        requestAnimationFrame(animate);
    }

    // Parallax layering translations
    function handleParallax(e) {
        // Calculate offsets relative to center (-0.5 to 0.5)
        const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

        // Map target mouse values for canvas simulation
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        mouse.active = true;

        // Translate background HTML layers
        const farLayer = document.querySelector('.bg-layer-far');
        const midLayer = document.querySelector('.bg-layer-mid');
        const foreLayer = document.querySelector('.bg-layer-fore');

        if (farLayer) {
            farLayer.style.transform = `translate(${nx * -4}px, ${ny * -4}px)`;
        }
        if (midLayer) {
            midLayer.style.transform = `translate(${nx * -12}px, ${ny * -12}px)`;
        }
        if (foreLayer) {
            foreLayer.style.transform = `translate(${nx * -20}px, ${ny * -20}px)`;
        }
    }

    // Listeners
    window.addEventListener('mousemove', handleParallax);
    
    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        // Fade layers back to origin on mouse exit
        const layers = ['.bg-layer-far', '.bg-layer-mid', '.bg-layer-fore'];
        layers.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.style.transform = 'translate(0px, 0px)';
        });
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    });

    // Expose background control APIs globally
    window.MindMapEffects = {
        init: function() {
            init();
            animate();
        },
        changeTheme: function (route) {
            let key = route === '/' ? 'home' : route.substring(1);
            if (themeColors[key]) {
                activeColors = themeColors[key];
            } else {
                activeColors = themeColors['home'];
            }
        }
    };

    // Execute startup
    window.MindMapEffects.init();

})();
