/*
 * MindFlow AI - Feature Page Modules
 * Handles interactive scripting, AI simulation models, chatbot logic, timers, and the global AI Moment overlay.
 */

(function () {
    // Shared variables for animations and timers to ensure clean memory cycles
    let activeIntervals = [];
    let activeRafs = [];

    // Helper to clear active tasks and animations when navigating
    function cleanupLoops() {
        activeIntervals.forEach(clearInterval);
        activeIntervals = [];
        activeRafs.forEach(cancelAnimationFrame);
        activeRafs = [];
    }

    /* ==========================================================================
       GLOBAL STRONG AI MOMENT: CHAOS -> CLARITY TRANSFORMATION
       ========================================================================== */
    function runAIMoment(callback) {
        const overlay = document.getElementById('ai-moment-overlay');
        const statusText = document.getElementById('ai-moment-status');
        const dot1 = document.getElementById('step-dot-1');
        const dot2 = document.getElementById('step-dot-2');
        const dot3 = document.getElementById('step-dot-3');
        const fCards = document.querySelectorAll('.floating-ai-card');

        if (!overlay || !statusText) {
            // Fallback if elements not present
            callback();
            return;
        }

        // Show overlay
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        statusText.textContent = "Analyzing workload...";
        dot1.className = 'step-dot active';
        dot2.className = 'step-dot';
        dot3.className = 'step-dot';

        // Phase 1: Chaos Layout (Scatter cards randomly)
        fCards.forEach((card, index) => {
            const rx = (Math.random() - 0.5) * 220; // -110px to 110px
            const ry = (Math.random() - 0.5) * 120 - 40; // -100px to 20px
            const rot = (Math.random() - 0.5) * 36; // -18deg to 18deg
            card.style.transition = 'none';
            card.style.transform = `translate(${rx}px, ${ry}px) rotate(${rot}deg) scale(0.9)`;
            card.style.opacity = '0.85';
            card.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        });

        // Phase 2: AI Processing (Cards pull in towards the center orb and glow)
        const t1 = setTimeout(() => {
            statusText.textContent = "Detecting stress patterns...";
            dot1.className = 'step-dot';
            dot2.className = 'step-dot active';

            fCards.forEach((card) => {
                card.style.transition = 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s, border-color 0.7s';
                card.style.transform = 'translate(0px, -20px) scale(0.8) rotate(0deg)';
                card.style.opacity = '0.5';
                card.style.borderColor = 'rgba(115, 140, 255, 0.4)';
            });
        }, 700);

        // Phase 3: Clarity (Cards align into a clean horizontal structured row)
        const t2 = setTimeout(() => {
            statusText.textContent = "Generating recommendations...";
            dot2.className = 'step-dot';
            dot3.className = 'step-dot active';

            fCards.forEach((card, index) => {
                card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s, border-color 0.6s';
                // Spread out horizontally in order
                const offset = (index - 1.5) * 110;
                card.style.transform = `translate(${offset}px, 60px) scale(0.95) rotate(0deg)`;
                card.style.opacity = '1';
                card.style.borderColor = 'rgba(52, 211, 153, 0.35)'; // Mint green border for clarity
            });
        }, 1400);

        // End Moment and Reveal Results
        const t3 = setTimeout(() => {
            overlay.style.transition = 'opacity 0.3s ease';
            overlay.style.opacity = '0';
            
            const tFade = setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.transition = '';
                callback();
            }, 300);
            activeIntervals.push(tFade);
        }, 2300);

        activeIntervals.push(t1, t2, t3);
    }

    // Metric counter increment upward animation
    function animateCounter(element, targetValue, suffix = '', duration = 1200) {
        if (!element) return;
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out quad
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * targetValue);
            
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = targetValue + suffix;
            }
        }
        requestAnimationFrame(update);
    }


    /* ==========================================================================
       1. AI COMPANION SIMULATOR (MINI CHATBOT WITH QUICK ACTIONS)
       ========================================================================== */
    function initAICompanion() {
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-user-input');
        const sendBtn = document.getElementById('chat-send-btn');
        const prompts = document.querySelectorAll('.suggested-prompt-btn');
        const actions = document.querySelectorAll('.quick-action-btn');

        if (!chatMessages || !chatInput || !sendBtn) return;

        function appendMessage(sender, text, isAssistant = false) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${isAssistant ? 'assistant' : 'user'}`;
            msgDiv.innerHTML = `
                <div class="message-sender" style="color: ${isAssistant ? 'var(--color-accent)' : 'var(--color-accent-alt)'}; font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem; margin-top:0.6rem;">${sender}</div>
                <div class="message-text" style="font-size:0.9rem; line-height:1.4;">${text}</div>
            `;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function appendTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message assistant typing-indicator-msg';
            typingDiv.id = 'chat-typing-indicator';
            typingDiv.innerHTML = `
                <div class="message-sender" style="color: var(--color-accent); font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem; margin-top:0.6rem;">MindFlow AI</div>
                <div class="companion-thinking" style="justify-content: flex-start; padding: 0.2rem 0;">
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('chat-typing-indicator');
            if (indicator) indicator.remove();
        }

        function generateAIResponse(userInput) {
            appendTypingIndicator();

            const query = userInput.toLowerCase();
            let response = "";

            if (query.includes('schedule') || query.includes('organize') || query.includes('study plan')) {
                response = "I've structured a balanced study plan for tomorrow:<br><br>" +
                           "• <b>09:00 AM - 10:30 AM:</b> Cognitive peak slot (Calculus quiz preparation)<br>" +
                           "• <b>10:30 AM - 10:45 AM:</b> Screen-free hydration break<br>" +
                           "• <b>11:00 AM - 12:30 PM:</b> Reading / Lab report drafting<br>" +
                           "• <b>03:00 PM - 04:30 PM:</b> Revision sprint (Machine Learning lecture)<br><br>" +
                           "<em>AI Recommendation: Protect your evening after 9:30 PM. Avoid screens to restore sleep cycles.</em>";
            } else if (query.includes('stress') || query.includes('reduce') || query.includes('anxious') || query.includes('burnout')) {
                response = "I detect elevated stress load. Let's trigger a physical reset:<br><br>" +
                           "1. <b>Laptop Off:</b> Close your screens for the next 15 minutes.<br>" +
                           "2. <b>Guided Breathing:</b> Inhale 4s, hold 4s, exhale 6s. Repeat 5 times.<br>" +
                           "3. <b>Workload Reduction:</b> Pinpoint your single most urgent milestone. Defer secondary tasks. I will buffer your calendar slots.<br><br>" +
                           "<em>AI Recommendation: Reduce workload by 15%. Take a recovery break.</em>";
            } else if (query.includes('prioritize') || query.includes('tasks')) {
                response = "Prioritization complete. Tasks are sorted by cognitive demand and deadlines:<br><br>" +
                           "• <b>High Priority (Critical):</b> Calculus prep & Chemistry draft (Schedule for morning peak hours).<br>" +
                           "• <b>Medium Priority (Moderate):</b> Machine Learning study sprint (Schedule for mid-afternoon).<br>" +
                           "• <b>Low Priority (Buffer):</b> Course registrations & general readings (Schedule for late afternoon or block to buffer days).";
            } else if (query.includes('optimize')) {
                response = "Study routine optimized for neuro-efficiency:<br><br>" +
                           "• <b>Spaced Sprints:</b> Block 45m deep focus slots followed by 10m active stretches.<br>" +
                           "• <b>Subject Mixing:</b> Study different subjects between blocks to avoid cognitive saturation.<br>" +
                           "• <b>Active Recall:</b> Spend the final 15 minutes of each block testing yourself without looking at notes.";
            } else {
                response = "I've analyzed your parameters. Based on your metrics, your current focus quotient is solid. " +
                           "To sustain this, study in high-focus 25m sprints with 5m breaks. Ensure sleep debt stays below 2 hours.";
            }

            const responseTimer = setTimeout(() => {
                removeTypingIndicator();
                appendMessage("MindFlow AI", response, true);
            }, 1100);

            activeIntervals.push(responseTimer);
        }

        function handleSend() {
            const text = chatInput.value.trim();
            if (!text) return;
            appendMessage("You", text, false);
            chatInput.value = "";
            generateAIResponse(text);
        }

        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') handleSend();
        });

        // Prompt Chips click
        prompts.forEach(chip => {
            chip.addEventListener('click', () => {
                const prompt = chip.getAttribute('data-prompt');
                appendMessage("You", prompt, false);
                generateAIResponse(prompt);
            });
        });

        // Quick Actions click
        actions.forEach(act => {
            act.addEventListener('click', () => {
                const action = act.getAttribute('data-action');
                appendMessage("You", action, false);
                generateAIResponse(action);
            });
        });
    }


    /* ==========================================================================
       2. FOCUS TRACKER TIMER
       ========================================================================== */
    function initFocusTracker() {
        const display = document.getElementById('timer-display');
        const statusText = document.getElementById('timer-status');
        const progressRing = document.getElementById('timer-progress');
        const startBtn = document.getElementById('timer-start-btn');
        const pauseBtn = document.getElementById('timer-pause-btn');
        const resetBtn = document.getElementById('timer-reset-btn');
        const endBtn = document.getElementById('timer-end-btn');
        const messageBox = document.getElementById('focus-message');
        const modeBtns = document.querySelectorAll('.mode-select-btn');
        const applyCustomBtn = document.getElementById('apply-custom-timer');

        if (!display || !progressRing) return;

        let totalDuration = 1500; // 25 mins
        let remaining = totalDuration;
        let timerId = null;
        const strokeCircumference = 628;

        function setProgressOffset(pct) {
            const offset = strokeCircumference - (pct * strokeCircumference);
            progressRing.style.strokeDashoffset = offset;
        }

        function updateDisplay() {
            const hrs = Math.floor(remaining / 3600);
            const mins = Math.floor((remaining % 3600) / 60);
            const secs = remaining % 60;
            
            let timeStr = "";
            if (hrs > 0) {
                timeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            } else {
                timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
            display.textContent = timeStr;
            
            const progress = remaining / totalDuration;
            setProgressOffset(progress);
        }

        function startTimer() {
            if (timerId) return;
            
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            endBtn.style.display = 'block';
            statusText.textContent = "Flow Active";
            messageBox.textContent = "Deep focus state active. Keep device alerts muted.";

            timerId = setInterval(() => {
                remaining--;
                updateDisplay();

                if (remaining <= 0) {
                    clearInterval(timerId);
                    timerId = null;
                    statusText.textContent = "Flow Complete";
                    messageBox.textContent = "Session completed successfully. Take a physical stretch break!";
                    startBtn.style.display = 'block';
                    pauseBtn.style.display = 'none';
                    endBtn.style.display = 'none';
                    setProgressOffset(0);
                }
            }, 1000);
            activeIntervals.push(timerId);
        }

        function pauseTimer() {
            if (!timerId) return;
            clearInterval(timerId);
            timerId = null;
            startBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
            statusText.textContent = "Flow Paused";
            messageBox.textContent = "Timer paused. Click start when ready to resume focus.";
        }

        function resetTimer() {
            pauseTimer();
            remaining = totalDuration;
            updateDisplay();
            statusText.textContent = "Flow Ready";
            messageBox.textContent = "Choose your focus interval and start your sprint.";
            endBtn.style.display = 'none';
            setProgressOffset(1);
        }

        // Mode switch
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                totalDuration = parseInt(btn.getAttribute('data-time'));
                resetTimer();
            });
        });

        // Apply Custom setup
        if (applyCustomBtn) {
            applyCustomBtn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                const hrs = parseInt(document.getElementById('custom-hours').value) || 0;
                const mins = parseInt(document.getElementById('custom-minutes').value) || 0;
                
                if (hrs === 0 && mins === 0) return;
                
                totalDuration = (hrs * 3600) + (mins * 60);
                resetTimer();
            });
        }

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        
        endBtn.addEventListener('click', () => {
            resetTimer();
            messageBox.textContent = "Session ended. Work progress recorded.";
        });

        updateDisplay();
        setProgressOffset(1);
    }


    /* ==========================================================================
       3. MOOD ANALYTICS WAVES
       ========================================================================== */
    function initMoodAnalytics() {
        const analyzeBtn = document.getElementById('analyze-mood-btn');
        const moodSelect = document.getElementById('mood-select');
        const energySlider = document.getElementById('energy-slider-input');
        const energyDisplay = document.getElementById('energy-val-display');
        const focusSlider = document.getElementById('focus-slider-input');
        const focusDisplay = document.getElementById('focus-val-display');

        const activeLabel = document.getElementById('active-mood-display');
        const path1 = document.querySelector('.wave-p1');
        const path2 = document.querySelector('.wave-p2');
        const waveCard = document.getElementById('mood-wave-card');
        const largeRingFill = document.getElementById('large-ring-fill');
        const largeRingPct = document.getElementById('large-ring-pct');

        if (!analyzeBtn || !energySlider) return;

        // Sliders updates
        energySlider.addEventListener('input', () => {
            energyDisplay.textContent = energySlider.value;
        });

        focusSlider.addEventListener('input', () => {
            focusDisplay.textContent = focusSlider.value;
        });

        let amplitude = 12;
        let frequency = 0.02;
        let phase = 0;
        let speed = 0.03;

        const stateConfigs = {
            calm: {
                gradient: 'linear-gradient(180deg, rgba(82, 140, 111, 0.08) 0%, var(--color-bg) 85%)',
                color: '#528c6f', colorAlt: '#34d399', amp: 12, freq: 0.02, spd: 0.03
            },
            focused: {
                gradient: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, var(--color-bg) 85%)',
                color: '#38bdf8', colorAlt: '#60a5fa', amp: 18, freq: 0.03, spd: 0.05
            },
            fatigued: {
                gradient: 'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, var(--color-bg) 85%)',
                color: '#f59e0b', colorAlt: '#d97706', amp: 6, freq: 0.01, spd: 0.015
            },
            overloaded: {
                gradient: 'linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--color-bg) 85%)',
                color: '#ef4444', colorAlt: '#ec4899', amp: 28, freq: 0.05, spd: 0.08
            },
            deepflow: {
                gradient: 'linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, var(--color-bg) 85%)',
                color: '#a855f7', colorAlt: '#c084fc', amp: 22, freq: 0.015, spd: 0.04
            }
        };

        function setMoodState(moodType, label, energy) {
            const config = stateConfigs[moodType];
            if (!config) return;

            amplitude = config.amp;
            frequency = config.freq;
            speed = config.spd;

            activeLabel.textContent = label;

            // Animate energy ring
            if (largeRingFill) {
                const offset = 264 - (264 * (energy / 100));
                largeRingFill.style.strokeDashoffset = offset;
                largeRingFill.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }
            if (largeRingPct) {
                largeRingPct.textContent = energy + '%';
            }

            // Update Colors
            if (waveCard) {
                waveCard.style.background = config.gradient;
                waveCard.style.setProperty('--color-accent', config.color);
                waveCard.style.setProperty('--color-accent-alt', config.colorAlt);
                if (largeRingFill) largeRingFill.style.stroke = config.color;
            }
        }

        // SVG wave loops
        function animateWaves() {
            if (!path1 || !path2) return;
            phase += speed;
            const pointsCount = 40;
            const step = 400 / pointsCount;
            
            let d1 = "M 0 90";
            let d2 = "M 0 90";

            for (let i = 0; i <= pointsCount; i++) {
                const x = i * step;
                const y1 = 90 + Math.sin(x * frequency + phase) * amplitude;
                const y2 = 90 + Math.sin(x * (frequency * 1.2) - phase) * (amplitude * 0.8);
                
                d1 += ` L ${x} ${y1}`;
                d2 += ` L ${x} ${y2}`;
            }

            d1 += " L 400 180 L 0 180 Z";
            d2 += " L 400 180 L 0 180 Z";

            path1.setAttribute('d', d1);
            path2.setAttribute('d', d2);

            const frameId = requestAnimationFrame(animateWaves);
            activeRafs.push(frameId);
        }

        analyzeBtn.addEventListener('click', () => {
            const mood = moodSelect.value;
            const energy = parseInt(energySlider.value);
            const focus = parseInt(focusSlider.value);
            const moodLabel = moodSelect.options[moodSelect.selectedIndex].text.split(' ').slice(1).join(' ');

            runAIMoment(() => {
                setMoodState(mood, moodLabel, energy);
                
                // Redraw chart paths dynamically with variance
                const trendPath = document.getElementById('mood-trend-path');
                if (trendPath) {
                    const basePoints = "M 20 80 L 70 50 L 120 40 L 170 85 L 220 90 L 270 30";
                    const nextY = 120 - Math.round(focus * 0.9);
                    trendPath.setAttribute('d', `${basePoints} L 320 ${nextY}`);
                }

                // Update dots info
                const lastDot = document.querySelectorAll('.mood-chart-dot')[6];
                if (lastDot) {
                    lastDot.setAttribute('data-info', `Today: ${moodLabel} (Energy: ${energy}%, Focus: ${focus}%)`);
                }

                // Update insight text with specific reasoning
                const insightText = document.getElementById('mood-insight-text');
                if (insightText) {
                    if (focus < 40) {
                        insightText.innerHTML = `<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${energy}% • Severe focus drop after study sprints. <em>Recommendation: Add short breaks between sessions.</em>`;
                    } else if (energy > 80 && focus > 70) {
                        insightText.innerHTML = `<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${energy}% • High cognitive reserve and focus peaks. <em>Recommendation: Schedule deep study blocks of 45-60m.</em>`;
                    } else {
                        insightText.innerHTML = `<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${energy}% • Workload stress is moderate. <em>Recommendation: Add short breaks between sessions.</em>`;
                    }
                }
            });
        });

        // Initialize tooltips
        const dots = document.querySelectorAll('.mood-chart-dot');
        const tooltip = document.getElementById('chart-tooltip');
        if (dots.length && tooltip) {
            dots.forEach(dot => {
                dot.addEventListener('mouseenter', () => {
                    tooltip.textContent = dot.getAttribute('data-info');
                    tooltip.style.color = 'var(--color-text-primary)';
                });
                dot.addEventListener('mouseleave', () => {
                    tooltip.textContent = "Hover over data points to inspect mood history";
                    tooltip.style.color = '';
                });
            });
        }

        // Render realistic defaults on load
        setMoodState('calm', 'Calm', 75);
        animateWaves();
    }


    /* ==========================================================================
       4. BURNOUT BRAIN CANVAS AND PREDICTOR
       ========================================================================== */
    function initBurnoutDetection() {
        const sleepInput = document.getElementById('sleep-input-burn');
        const sleepVal = document.getElementById('sleep-val-burn');
        const stressInput = document.getElementById('stress-input-burn');
        const stressVal = document.getElementById('stress-val-burn');
        const deadlinesInput = document.getElementById('deadlines-input-burn');
        const deadlinesVal = document.getElementById('deadlines-val-burn');
        const studyInput = document.getElementById('study-input-burn');
        const studyVal = document.getElementById('study-val-burn');
        const analyzeBtn = document.getElementById('analyze-burnout-btn');

        const scoreBadge = document.getElementById('burnout-score-badge');
        const riskLevel = document.getElementById('burnout-risk-level');
        const energyVal = document.getElementById('burnout-energy-val');
        const energyBar = document.getElementById('burnout-energy-bar');
        const contributorsList = document.getElementById('burnout-contributors-list');
        const recommendationsList = document.getElementById('burnout-recommendations-list');
        const ringFill = document.getElementById('burnout-ring-fill');
        const resultsCard = document.getElementById('burnout-results-card');

        const canvas = document.getElementById('brain-canvas');

        if (!sleepInput || !canvas || !analyzeBtn) return;

        // Sliders updates
        sleepInput.addEventListener('input', () => { sleepVal.textContent = sleepInput.value; });
        stressInput.addEventListener('input', () => { stressVal.textContent = stressInput.value; });
        deadlinesInput.addEventListener('input', () => { deadlinesVal.textContent = deadlinesInput.value; });
        studyInput.addEventListener('input', () => { studyVal.textContent = studyInput.value; });

        // Brain Mesh Context
        const ctx = canvas.getContext('2d');
        const cWidth = (canvas.width = 260);
        const cHeight = (canvas.height = 220);

        const brainNodes = [
            { x: 70, y: 110, pulseOffset: 0 },
            { x: 90, y: 70, pulseOffset: 0.5 },
            { x: 130, y: 55, pulseOffset: 1.2 },
            { x: 180, y: 75, pulseOffset: 0.8 },
            { x: 200, y: 110, pulseOffset: 2.1 },
            { x: 170, y: 140, pulseOffset: 1.5 },
            { x: 130, y: 170, pulseOffset: 0.3 },
            { x: 100, y: 140, pulseOffset: 1.9 },
            { x: 120, y: 100, pulseOffset: 0.9 },
            { x: 150, y: 110, pulseOffset: 1.4 },
            { x: 140, y: 80, pulseOffset: 2.4 },
            { x: 110, y: 75, pulseOffset: 1.7 }
        ];

        let burnoutRisk = 42; // default
        let nodeActivitySpeed = 1.0;

        function runBrainVisuals() {
            ctx.clearRect(0, 0, cWidth, cHeight);
            const animTime = performance.now() * 0.001 * nodeActivitySpeed;

            // Draw connections
            ctx.strokeStyle = burnoutRisk > 70 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(var(--color-accent-rgb), 0.12)';
            ctx.lineWidth = 1.2;
            for (let i = 0; i < brainNodes.length; i++) {
                for (let j = i + 1; j < brainNodes.length; j++) {
                    const dx = brainNodes[i].x - brainNodes[j].x;
                    const dy = brainNodes[i].y - brainNodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(brainNodes[i].x, brainNodes[i].y);
                        ctx.lineTo(brainNodes[j].x, brainNodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            brainNodes.forEach(node => {
                const pulse = Math.abs(Math.sin(animTime + node.pulseOffset));
                const glowRad = 3 + pulse * 7;
                
                const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRad);
                if (burnoutRisk > 70) {
                    grad.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
                    grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
                } else if (burnoutRisk > 40) {
                    grad.addColorStop(0, 'rgba(245, 158, 11, 0.7)');
                    grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
                } else {
                    grad.addColorStop(0, 'rgba(var(--color-accent-rgb), 0.7)');
                    grad.addColorStop(1, 'rgba(var(--color-accent-rgb), 0)');
                }

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(node.x, node.y, glowRad, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = burnoutRisk > 70 ? '#ef4444' : (burnoutRisk > 40 ? '#f59e0b' : 'var(--color-text-primary)');
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            });

            const frameId = requestAnimationFrame(runBrainVisuals);
            activeRafs.push(frameId);
        }

        function renderResults(calculatedRisk, sleepVal, stressVal, deadlinesVal, studyVal) {
            burnoutRisk = calculatedRisk;
            
            // Set ring offset: 264 is full stroke-dasharray
            if (ringFill) {
                const offset = 264 - (264 * (burnoutRisk / 100));
                ringFill.style.strokeDashoffset = offset;
            }

            // Update badge text
            animateCounter(scoreBadge, burnoutRisk, '%');

            // Update energy
            const energy = Math.max(100 - burnoutRisk, 8);
            if (energyVal) animateCounter(energyVal, energy, '%');
            if (energyBar) {
                energyBar.style.width = `${energy}%`;
                energyBar.className = 'progress-bar-fill';
            }

            if (burnoutRisk > 70) {
                if (energyBar) energyBar.classList.add('critical');
                riskLevel.textContent = "Critical Burnout Risk";
                riskLevel.style.color = "#ef4444";
                if (ringFill) ringFill.style.stroke = '#ef4444';
                nodeActivitySpeed = 3.5;
            } else if (burnoutRisk > 40) {
                if (energyBar) energyBar.classList.add('warning');
                riskLevel.textContent = "Elevated Fatigue Alert";
                riskLevel.style.color = "#f59e0b";
                if (ringFill) ringFill.style.stroke = '#f59e0b';
                nodeActivitySpeed = 1.8;
            } else {
                if (energyBar) energyBar.classList.add('normal');
                riskLevel.textContent = "Optimal Flow Stable";
                riskLevel.style.color = "var(--color-accent)";
                if (ringFill) ringFill.style.stroke = 'var(--color-accent)';
                nodeActivitySpeed = 0.8;
            }

            // Generate specific reasoning contributor items
            let contributors = [];
            if (sleepVal < 7.0) contributors.push("• Sleep deficit");
            if (deadlinesVal > 3) contributors.push("• Assignment overload");
            if (stressVal > 6) contributors.push("• High stress level");
            if (studyVal > 8) contributors.push("• Study duration peaks");
            if (contributors.length === 0) contributors.push("• Load metrics balanced");

            contributorsList.innerHTML = contributors.map(item => `<li>${item}</li>`).join('');

            // Generate recommendations
            let recs = [];
            if (burnoutRisk > 60) {
                recs.push("• Reduce workload by 15%");
                recs.push("• Take a recovery break");
                recs.push("• Prioritize important tasks");
            } else if (burnoutRisk > 35) {
                recs.push("• Buffer task schedules");
                recs.push("• Ensure regular rest blocks");
                recs.push("• Use Pomodoro focus mode");
            } else {
                recs.push("• Maintain present pacing");
                recs.push("• Standardize sleep schedules");
            }
            recommendationsList.innerHTML = recs.map(item => `<li>${item}</li>`).join('');

            // Add the 'show' class to display the results card
            if (resultsCard) {
                resultsCard.classList.add('show');
            }
        }

        analyzeBtn.addEventListener('click', () => {
            const sleep = parseFloat(sleepInput.value);
            const stress = parseInt(stressInput.value);
            const deadlines = parseInt(deadlinesInput.value);
            const study = parseFloat(studyInput.value);

            // Burnout algorithm
            const calculatedRisk = Math.round((stress * 6.5) + (deadlines * 5.5) + (study * 2) - (sleep * 5.5) + 30);
            const constrainedRisk = Math.max(5, Math.min(95, calculatedRisk));

            runAIMoment(() => {
                renderResults(constrainedRisk, sleep, stress, deadlines, study);
            });
        });

        // Initial default state rendering on load
        renderResults(42, 7.5, 5, 3, 6);
        runBrainVisuals();
    }


    /* ==========================================================================
       5. SMART STUDY PLANNER
       ========================================================================== */
    function initStudyPlanner() {
        const generateBtn = document.getElementById('planner-generate-btn');
        const tasksInput = document.getElementById('planner-tasks-input');
        const deadlineInput = document.getElementById('planner-deadline-input');
        const priorityInput = document.getElementById('planner-priority-input');
        const daysVal = document.getElementById('planner-days-val');

        const gridState = document.getElementById('planner-schedule-grid');
        const breakdownText = document.getElementById('planner-breakdown-text');

        if (!generateBtn || !gridState) return;

        // Slider value display
        deadlineInput.addEventListener('input', () => {
            daysVal.textContent = deadlineInput.value;
        });

        function populateSchedule(daysCount, priority, tasksList) {
            gridState.innerHTML = '';
            const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            
            weekDays.forEach((day, index) => {
                const dayCol = document.createElement('div');
                dayCol.className = 'planner-day-col';
                dayCol.style.opacity = '1';
                dayCol.style.transform = 'none';
                
                let tasksHtml = "";
                let dailyHours = 0;

                if (index < daysCount) {
                    const taskToAssign = tasksList[index % tasksList.length];
                    dailyHours = priority === 'high' ? 4 : (priority === 'med' ? 2.5 : 1.5);
                    tasksHtml = `
                        <div class="planner-task-card priority-${priority}" style="transform:none; opacity:1;">
                            <div class="task-card-time">09:00 AM</div>
                            <div class="task-card-name">${taskToAssign}</div>
                            <div class="task-card-type">${priority === 'high' ? 'Deep Focus' : 'Study Sprint'}</div>
                        </div>
                    `;
                } else {
                    tasksHtml = `<div class="planner-day-empty-text">Rest & Recovery Slot</div>`;
                }

                let congestionClass = 'status-optimal';
                let congestionText = 'Optimal';
                if (dailyHours > 3) {
                    congestionClass = 'status-congested';
                    congestionText = 'High Load';
                } else if (dailyHours > 0) {
                    congestionClass = 'status-moderate';
                    congestionText = 'Moderate';
                }

                dayCol.innerHTML = `
                    <div class="planner-day-header">
                        <span class="day-name">${day}</span>
                        <span class="day-badge ${congestionClass}">${dailyHours}h (${congestionText})</span>
                        <div class="indicator-ring-mini" style="width:10px; height:10px; border-radius:50%; background: ${dailyHours > 3 ? '#ef4444' : (dailyHours > 0 ? '#f59e0b' : '#528c6f')}; margin-top:2px;"></div>
                    </div>
                    <div class="planner-day-tasks">
                        ${tasksHtml}
                    </div>
                `;

                gridState.appendChild(dayCol);
            });

            // Set breakdown text details
            const studyHoursTotal = daysCount * (priority === 'high' ? 4 : (priority === 'med' ? 2.5 : 1.5));
            breakdownText.innerHTML = `Today's Schedule Ready. Generated a balanced study plan over <b>${daysCount} days</b>. ` +
                                      `A total of <b>${studyHoursTotal} study hours</b> were distributed into optimal focus sprints. ` +
                                      `Remaining buffer slots are mapped to ensure cognitive recovery.`;
        }

        generateBtn.addEventListener('click', () => {
            const rawTasks = tasksInput.value.trim();
            const daysCount = parseInt(deadlineInput.value);
            const priority = priorityInput.value;

            let tasksList = rawTasks ? rawTasks.split('\n').filter(t => t.trim()) : [];
            if (tasksList.length === 0) {
                tasksList = ["Calculus Homework prep", "Lab Report write-up", "Machine Learning lecture revision"];
            }

            runAIMoment(() => {
                populateSchedule(daysCount, priority, tasksList);
            });
        });

        // Render realistic defaults on load
        populateSchedule(3, 'med', ["Calculus Homework prep", "Lab Report write-up", "Machine Learning lecture revision"]);
    }


    /* ==========================================================================
       6. PREDICTIVE INSIGHTS TIMELINE
       ========================================================================== */
    function initPredictiveInsights() {
        const forecastBtn = document.getElementById('forecast-btn');
        const weekSelect = document.getElementById('predictive-week-select');
        const resultsPanel = document.getElementById('predictive-results-panel');

        const nodes = document.querySelectorAll('.timeline-node');
        const tooltip = document.getElementById('timeline-tooltip');
        const tTitle = document.getElementById('tooltip-title');
        const tRisk = document.getElementById('tooltip-risk');
        const tDesc = document.getElementById('tooltip-desc');

        const riskLvlText = document.getElementById('predictive-risk-level');
        const peakDaysText = document.getElementById('predictive-peak-days');
        const recsText = document.getElementById('predictive-recs');

        if (!forecastBtn || !resultsPanel) return;

        const forecastData = {
            '1': { risk: 'Low', peak: 'None', recs: 'Maintain present pacing. Sleep indices look stable.', nodeIdx: 0 },
            '4': { risk: 'Low', peak: 'Wednesday', recs: 'Early project releases. Focus slots will preserve cognitive load.', nodeIdx: 0 },
            '8': { risk: 'High', peak: 'Tuesday, Thursday', recs: 'Shift non-urgent tasks. Defer secondary milestones.', nodeIdx: 1 },
            '12': { risk: 'Medium', peak: 'Monday, Friday', recs: 'Buffer tasks list. Block 15m screen recovery slots.', nodeIdx: 2 },
            '15': { risk: 'High', peak: 'Tuesday, Thursday', recs: 'Finals cycle. Prioritize sleep recovery buffers.', nodeIdx: 3 },
            '18': { risk: 'Low', peak: 'None', recs: 'Semester evaluation stable. Recover rest hours.', nodeIdx: 3 }
        };

        function setForecast(week) {
            const data = forecastData[week];
            if (!data) return;

            riskLvlText.textContent = data.risk;
            riskLvlText.style.color = data.risk === 'High' ? '#ef4444' : (data.risk === 'Medium' ? '#f59e0b' : 'var(--color-accent)');
            peakDaysText.textContent = data.peak;
            recsText.innerHTML = `AI Recommendation: <em>${data.recs}</em>`;

            // Timelines select node
            nodes.forEach(n => n.classList.remove('active'));
            const activeNode = nodes[data.nodeIdx];
            if (activeNode) {
                activeNode.classList.add('active');
                
                const title = activeNode.getAttribute('data-title');
                const risk = activeNode.getAttribute('data-risk');
                const desc = activeNode.getAttribute('data-desc');

                tTitle.textContent = title;
                tDesc.textContent = desc;
                tRisk.textContent = `${risk.toUpperCase()} RISK`;
                tRisk.className = 'tooltip-risk';
                if (risk === 'low') tRisk.classList.add('risk-low');
                else if (risk === 'med') tRisk.classList.add('risk-med');
                else tRisk.classList.add('risk-high');
            }
        }

        forecastBtn.addEventListener('click', () => {
            const selectedWeek = weekSelect.value;
            runAIMoment(() => {
                setForecast(selectedWeek);
            });
        });

        // Timeline node clicks
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');

                const title = node.getAttribute('data-title');
                const risk = node.getAttribute('data-risk');
                const desc = node.getAttribute('data-desc');

                tooltip.classList.remove('show');
                const tooltipTimer = setTimeout(() => {
                    tTitle.textContent = title;
                    tDesc.textContent = desc;
                    tRisk.textContent = `${risk.toUpperCase()} RISK`;
                    tRisk.className = 'tooltip-risk';
                    if (risk === 'low') tRisk.classList.add('risk-low');
                    else if (risk === 'med') tRisk.classList.add('risk-med');
                    else tRisk.classList.add('risk-high');
                    tooltip.classList.add('show');
                }, 200);
                activeIntervals.push(tooltipTimer);
            });
        });

        // Load default on page load
        setForecast('1');
    }

    // Main Exporter
    window.MindFlowFeatures = {
        init: function (route) {
            cleanupLoops();

            if (route === '/ai-companion') {
                initAICompanion();
            } else if (route === '/focus-tracking') {
                initFocusTracker();
            } else if (route === '/mood-analytics') {
                initMoodAnalytics();
            } else if (route === '/burnout-detection') {
                initBurnoutDetection();
            } else if (route === '/study-planner') {
                initStudyPlanner();
            } else if (route === '/predictive-insights') {
                initPredictiveInsights();
            }
        }
    };

})();
