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

    let typingTimeout = null;
    let adaptingTimeout = null;

    function typeText(element, text, speed = 20, callback) {
        element.innerHTML = '';
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                if (text.substr(i, 4) === '<br>') {
                    element.innerHTML += '<br>';
                    i += 4;
                } else if (text.charAt(i) === '<') {
                    // Skip complete HTML tags if they exist
                    const tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                typingTimeout = setTimeout(typeChar, speed);
            } else if (callback) {
                callback();
            }
        }
        typeChar();
    }

    function setupMoodSystem() {
        const moodBtns = document.querySelectorAll('.mood-card-btn');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const defaultSubtitle = "MindFlow AI analyzes workload, stress patterns, and productivity behavior to create smarter study experiences.";
        
        const recList = document.querySelector('.rec-list');
        const insightText = document.querySelector('.chart-insight-banner strong');
        
        const heroOrb = document.getElementById('hero-ai-orb');
        const orbRing1 = document.querySelector('.hero-orb-ring-1');
        const orbRing2 = document.querySelector('.hero-orb-ring-2');
        const adaptingBubble = document.getElementById('ai-adapting-status');
        const showcaseCards = document.querySelectorAll('.dashboard-showcase .glass-card');
        
        if (!moodBtns.length) return;

        const moodConfigs = {
            focused: {
                accent: '#3b82f6',
                accentRGB: '59, 130, 246',
                accentAlt: '#93c5fd',
                accentAltRGB: '147, 197, 253',
                greeting: "You're in focus mode today. Let's maintain momentum.",
                speed: 1.0,
                spark: '#3b82f6',
                primary: 'rgba(59, 130, 246, 0.08)',
                alt: 'rgba(147, 197, 253, 0.08)',
                recs: [
                    { text: "Launch 45m deep focus sprint", badge: "Flow" },
                    { text: "Schedule machine learning revision slot", badge: "Priority" }
                ],
                insight: "High focus alignment: Cognitive reserves are optimal today. Perfect for high-intensity subjects."
            },
            calm: {
                accent: '#10b981',
                accentRGB: '16, 185, 129',
                accentAlt: '#a7f3d0',
                accentAltRGB: '167, 243, 208',
                greeting: "You're balanced today. Let's build consistency.",
                speed: 0.8,
                spark: '#10b981',
                primary: 'rgba(16, 185, 129, 0.08)',
                alt: 'rgba(167, 243, 208, 0.08)',
                recs: [
                    { text: "Maintain steady 25m Pomodoro blocks", badge: "Flow" },
                    { text: "Take a 10-minute hydration stretch break", badge: "Rest" }
                ],
                insight: "Balanced flow: Mind is clear and heart rate is steady. Maintain spacing between sessions."
            },
            overwhelmed: {
                accent: '#a78bfa',
                accentRGB: '167, 139, 250',
                accentAlt: '#ddd6fe',
                accentAltRGB: '221, 214, 254',
                greeting: "Things seem heavy today. Let's organize them together.",
                speed: 0.15, // Reduced motion
                spark: '#8b5cf6',
                primary: 'rgba(139, 92, 246, 0.08)',
                alt: 'rgba(221, 214, 254, 0.08)',
                recs: [
                    { text: "Reduce workload by 15% immediately", badge: "Workload" },
                    { text: "Run 5-cycle breathing exercises", badge: "Anxiety" }
                ],
                insight: "Overload alert: Stress load is heavy. Restrict study blocks to 15m and focus on a single urgent task."
            },
            motivated: {
                accent: '#f97316',
                accentRGB: '249, 115, 22',
                accentAlt: '#ffedd5',
                accentAltRGB: '255, 237, 213',
                greeting: "You're ready to build today. Let's use that energy wisely.",
                speed: 1.5,
                spark: '#f97316',
                primary: 'rgba(249, 115, 22, 0.08)',
                alt: 'rgba(255, 237, 213, 0.08)',
                recs: [
                    { text: "Complete Chemistry lab report draft", badge: "Sprint" },
                    { text: "Tackle Calculus quiz preparation", badge: "Task" }
                ],
                insight: "Peak motivation: Drive is exceptionally high. Channel this into your most challenging projects."
            },
            tired: {
                accent: '#64748b',
                accentRGB: '100, 116, 139',
                accentAlt: '#cbd5e1',
                accentAltRGB: '203, 213, 225',
                greeting: "Energy feels lower today. Let's optimize your workload.",
                speed: 0.35, // Slow subtle animations
                spark: '#64748b',
                primary: 'rgba(100, 116, 139, 0.08)',
                alt: 'rgba(203, 213, 225, 0.08)',
                recs: [
                    { text: "Set sleep window target to 8.5 hours", badge: "Health" },
                    { text: "Defer secondary deadlines to buffer days", badge: "Calendar" }
                ],
                insight: "Fatigue detected: Sleep debt is high. Defer dense assignments and schedule screen-free recovery."
            }
        };

        moodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const isAlreadyActive = btn.classList.contains('active');
                
                moodBtns.forEach(b => b.classList.remove('active'));
                
                let selectedMood = null;
                if (!isAlreadyActive) {
                    btn.classList.add('active');
                    selectedMood = btn.getAttribute('data-mood');
                }

                // If no mood is selected, revert to default
                const config = moodConfigs[selectedMood] || {
                    accent: '#7B9985',
                    accentRGB: '123, 153, 133',
                    accentAlt: '#E7DCCF',
                    accentAltRGB: '231, 220, 207',
                    greeting: defaultSubtitle,
                    speed: 1.0,
                    spark: '#738cff',
                    primary: 'rgba(115, 140, 255, 0.03)',
                    alt: 'rgba(115, 140, 255, 0.02)',
                    recs: [
                        { text: "Launch 25m Pomodoro session", badge: "Flow" },
                        { text: "Target 7.5 hrs sleep tonight", badge: "Health" }
                    ],
                    insight: "Focus dropped 18% after sleep reduced below 6 hours on Thursday. Stress peaked due to deadline congestion."
                };

                // 1. "AI adapting..." bubble notification near the AI orb
                if (adaptingBubble && selectedMood) {
                    clearTimeout(adaptingTimeout);
                    const statusPhrases = [
                        "Adapting experience...",
                        "Analyzing emotional state...",
                        "Personalizing recommendations..."
                    ];
                    adaptingBubble.textContent = statusPhrases[Math.floor(Math.random() * statusPhrases.length)];
                    adaptingBubble.classList.add('show');
                    
                    adaptingTimeout = setTimeout(() => {
                        adaptingBubble.classList.remove('show');
                    }, 2000);
                }

                // 2. Typewriter transition for tagline greeting
                if (heroSubtitle) {
                    clearTimeout(typingTimeout);
                    heroSubtitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    heroSubtitle.style.opacity = '0';
                    heroSubtitle.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        heroSubtitle.style.transform = 'translateY(10px)';
                        typeText(heroSubtitle, config.greeting, 15, () => {
                            heroSubtitle.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            heroSubtitle.style.opacity = '1';
                            heroSubtitle.style.transform = 'translateY(0)';
                        });
                    }, 300);
                }

                // 3. Morph AI Orb visual styles
                if (heroOrb) {
                    // Remove all existing mood classes
                    heroOrb.classList.remove('mood-focused', 'mood-calm', 'mood-overwhelmed', 'mood-motivated', 'mood-tired');
                    if (orbRing1) orbRing1.classList.remove('mood-focused', 'mood-calm', 'mood-overwhelmed', 'mood-motivated', 'mood-tired');
                    if (orbRing2) orbRing2.classList.remove('mood-focused', 'mood-calm', 'mood-overwhelmed', 'mood-motivated', 'mood-tired');
                    
                    if (selectedMood) {
                        heroOrb.classList.add(`mood-${selectedMood}`);
                        if (orbRing1) orbRing1.classList.add(`mood-${selectedMood}`);
                        if (orbRing2) orbRing2.classList.add(`mood-${selectedMood}`);
                    }
                }

                // 4. Transition root color variables
                document.documentElement.style.setProperty('--color-accent', config.accent);
                document.documentElement.style.setProperty('--color-accent-rgb', config.accentRGB);
                document.documentElement.style.setProperty('--color-accent-alt', config.accentAlt);
                document.documentElement.style.setProperty('--color-accent-alt-rgb', config.accentAltRGB);

                // 5. Transition background particle effects
                if (window.MindFlowEffects && window.MindFlowEffects.setMoodParams) {
                    window.MindFlowEffects.setMoodParams({
                        mood: selectedMood || 'home',
                        primary: config.primary,
                        alt: config.alt,
                        spark: config.spark,
                        speed: config.speed
                    });
                }

                // 6. Staggered fade + slide updates for dashboard preview cards
                if (showcaseCards.length) {
                    showcaseCards.forEach((card, idx) => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                        
                        setTimeout(() => {
                            // Update content inside when cards are hidden
                            if (idx === 0) {
                                // Animate grid line or chart metrics colors dynamically
                                const stressLine = document.querySelector('.chart-line-stress');
                                const focusLine = document.querySelector('.chart-line-focus');
                                if (stressLine) {
                                    stressLine.style.stroke = 'var(--color-accent)';
                                }
                                if (focusLine) {
                                    focusLine.style.stroke = 'var(--color-accent-alt)';
                                }
                            }
                            
                            // Re-appear
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 250 + idx * 80);
                    });
                }

                // 7. Update dashboard suggestions and banner text
                if (recList) {
                    setTimeout(() => {
                        recList.innerHTML = config.recs.map(rec => `
                            <div class="rec-item" style="border-left-color: var(--color-accent); transition: border-color 0.4s ease;">
                                <span>${rec.text}</span>
                                <span class="rec-badge" style="background: rgba(var(--color-accent-rgb), 0.12); color: var(--color-accent); transition: background 0.4s ease, color 0.4s ease;">${rec.badge}</span>
                            </div>
                        `).join('');
                    }, 250);
                }

                if (insightText) {
                    setTimeout(() => {
                        insightText.innerHTML = `<strong>AI Diagnostics:</strong> ${config.insight}`;
                    }, 250);
                }
            });
        });
    }

    // Expose Landing initializer globally
    window.MindFlowLanding = {
        init: function() {
            setupFeatureCards();
            simulateLiveDashboard();
            setupChaosToClarity();
            setupInteractiveOrb();
            setupMoodSystem();
        },
        destroy: function() {
            if (statInterval) {
                clearInterval(statInterval);
                statInterval = null;
            }
            clearTimeout(typingTimeout);
            clearTimeout(adaptingTimeout);
            
            // Reset page parameters back to normal
            document.documentElement.style.setProperty('--color-accent', '#7B9985');
            document.documentElement.style.setProperty('--color-accent-rgb', '123, 153, 133');
            document.documentElement.style.setProperty('--color-accent-alt', '#E7DCCF');
            document.documentElement.style.setProperty('--color-accent-alt-rgb', '231, 220, 207');
            
            const heroOrb = document.getElementById('hero-ai-orb');
            const orbRing1 = document.querySelector('.hero-orb-ring-1');
            const orbRing2 = document.querySelector('.hero-orb-ring-2');
            if (heroOrb) heroOrb.className = 'hero-orb';
            if (orbRing1) orbRing1.className = 'hero-orb-ring hero-orb-ring-1';
            if (orbRing2) orbRing2.className = 'hero-orb-ring hero-orb-ring-2';

            if (window.MindFlowEffects && window.MindFlowEffects.setMoodParams) {
                window.MindFlowEffects.setMoodParams({
                    mood: 'home',
                    primary: 'rgba(115, 140, 255, 0.03)',
                    alt: 'rgba(115, 140, 255, 0.02)',
                    spark: '#738cff',
                    speed: 1.0
                });
            }
        }
    };

})();
