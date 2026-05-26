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
                
                // Apply hardware-accelerated 3D transforms
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
                card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.5), 0 0 15px rgba(var(--color-accent-rgb), 0.08)`;
                card.style.borderColor = 'rgba(var(--color-accent-rgb), 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset styling smoothly
                card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
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

    // Expose Landing initializer globally
    window.MindMapLanding = {
        init: function() {
            setupFeatureCards();
            simulateLiveDashboard();
            setupChaosToClarity();
        },
        destroy: function() {
            if (statInterval) {
                clearInterval(statInterval);
                statInterval = null;
            }
        }
    };

})();
