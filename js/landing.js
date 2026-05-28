/*
 * MindMap AI - Landing Page Scripting
 * Manages 3D tilt effects, mouse-cursor glow maps, and real-time dashboard mockup simulations.
 */

(function () {

    // 3D Card Tilt + Glow setup
    function setupFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                
                // Position relative to card boundaries
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Set custom properties for CSS cursor glow gradient
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                // Calculate rotation (max 8 degrees tilt for Apple/Linear style subtlety)
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const rotateX = -((y - yc) / yc) * 8;
                const rotateY = ((x - xc) / xc) * 8;
                
                // Apply hardware-accelerated 3D transforms (including scaling up and lifting further)
                card.style.transition = 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s';
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
                card.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.45), 0 0 30px rgba(var(--color-accent-rgb), 0.25)`;
                card.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset styling smoothly
                card.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, box-shadow 0.3s';
                card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
                card.style.boxShadow = '';
                card.style.borderColor = '';
            });
        });
    }

    // Dynamic stats updates on dashboard mock
    let statInterval = null;
    function simulateLiveDashboard() {
        const stressBadge = document.querySelector('.side-card-num');
        const focusBadge = document.querySelectorAll('.side-card-num')[1];
        
        if (!stressBadge || !focusBadge) return;
        
        let baseStress = 34;
        let baseFocus = 82;

        // Clear any lingering intervals
        if (statInterval) clearInterval(statInterval);
        
        // Fluctuates statistics slightly every few seconds to represent active live analysis
        statInterval = setInterval(() => {
            const stressVar = Math.floor(Math.random() * 5) - 2; // -2 to +2
            const focusVar = Math.floor(Math.random() * 3) - 1;  // -1 to +1
            
            let targetStress = baseStress + stressVar;
            let targetFocus = baseFocus + focusVar;

            // Constrain limits
            if (targetStress < 25) targetStress = 25;
            if (targetStress > 45) targetStress = 45;
            if (targetFocus < 75) targetFocus = 75;
            if (targetFocus > 90) targetFocus = 90;

            stressBadge.textContent = `${targetStress}%`;
            focusBadge.textContent = `${targetFocus}`;
        }, 4000);
    }

    function setupChaosToClarity() {
        const triggerBtn = document.getElementById('story-trigger-btn');
        const storyBox = document.getElementById('story-box');
        
        if (!triggerBtn || !storyBox) return;

        let isChaos = true;

        triggerBtn.addEventListener('click', () => {
            if (isChaos) {
                // Transition to clear
                triggerBtn.disabled = true;
                triggerBtn.textContent = 'Analyzing Workload...';
                storyBox.classList.remove('state-chaos', 'state-clear');
                storyBox.classList.add('state-analyzing');

                setTimeout(() => {
                    storyBox.classList.remove('state-analyzing');
                    storyBox.classList.add('state-clear');
                    triggerBtn.textContent = 'Reset Workload';
                    triggerBtn.disabled = false;
                    isChaos = false;
                }, 1500);
            } else {
                // Transition to chaos
                storyBox.classList.remove('state-clear', 'state-analyzing');
                storyBox.classList.add('state-chaos');
                triggerBtn.textContent = 'Reorganize Workload';
                isChaos = true;
            }
        });
    }

    function setupInteractiveOrb() {
        const scene = document.getElementById('hero-interactive-scene');
        const orb = document.getElementById('hero-ai-orb');
        if (!scene || !orb) return;

        scene.addEventListener('mousemove', e => {
            const rect = scene.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate relative offset from center (-0.5 to 0.5)
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = (x - xc) / xc;
            const dy = (y - yc) / yc;

            // Move the orb towards the cursor smoothly
            orb.style.transform = `translate(${dx * 25}px, ${dy * 25}px) scale(1.05)`;
            orb.style.boxShadow = `0 20px 50px rgba(115, 140, 255, 0.35), 0 0 40px rgba(115, 140, 255, 0.2)`;
        });

        scene.addEventListener('mouseleave', () => {
            // Reset smoothly
            orb.style.transform = 'translate(0px, 0px) scale(1)';
            orb.style.boxShadow = '';
        });
    }

    // Expose Landing initializer globally
    window.MindFlowLanding = {
        init: function() {
            setupFeatureCards();
            simulateLiveDashboard();
            setupChaosToClarity();
            setupInteractiveOrb();
        },
        destroy: function() {
            if (statInterval) {
                clearInterval(statInterval);
                statInterval = null;
            }
        }
    };

})();
