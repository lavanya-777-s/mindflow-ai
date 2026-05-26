/*
 * MindMap AI - Feature Page Modules
 * Handles full interactive scripting, simulations, dynamic canvas renderings, and timer lifecycles.
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
       1. AI COMPANION SIMULATOR
       ========================================================================== */
    function initAICompanion() {
        const stressInput = document.getElementById('stress-input');
        const stressVal = document.getElementById('stress-val');
        const hoursInput = document.getElementById('hours-input');
        const hoursVal = document.getElementById('hours-val');
        const generateBtn = document.getElementById('generate-advice-btn');
        const resetBtn = document.getElementById('reset-companion-btn');
        const formDiv = document.getElementById('companion-form');
        const resultsDiv = document.getElementById('companion-results');
        const thinkingDiv = document.getElementById('thinking-indicator');
        const resultsGrid = document.getElementById('results-grid');
        
        if (!stressInput || !generateBtn) return;

        // Sliders updates
        stressInput.addEventListener('input', () => {
            stressVal.textContent = stressInput.value;
        });

        hoursInput.addEventListener('input', () => {
            hoursVal.textContent = hoursInput.value;
        });

        // Advice generator click
        generateBtn.addEventListener('click', () => {
            // Read inputs
            const stress = parseInt(stressInput.value);
            const hours = parseInt(hoursInput.value);
            const assignments = parseInt(document.getElementById('assignments-input').value) || 0;
            const hackathons = parseInt(document.getElementById('hackathons-input').value) || 0;
            const mood = document.getElementById('mood-input').value;
            const botherText = document.getElementById('bother-input').value.trim();

            // Toggle screens
            formDiv.style.display = 'none';
            resultsDiv.style.display = 'block';
            thinkingDiv.style.display = 'flex';
            resultsGrid.innerHTML = '';

            // Simulated AI calculation delay
            const delayTimer = setTimeout(() => {
                thinkingDiv.style.display = 'none';
                
                // Formulate advice based on stats
                let stressLevel = "Stable Flow";
                let stressPct = 15;
                if (stress > 7) {
                    stressLevel = "High Burnout Alert";
                    stressPct = 85;
                } else if (stress > 4 || assignments > 4) {
                    stressLevel = "Elevated Cognitive Load";
                    stressPct = 55;
                }

                let recommendedAction = "";
                if (stress > 7) {
                    recommendedAction = `Your stress index is critical (${stress}/10) with ${assignments} deadlines pending. Immediately isolate your priority tasks. We advise canceling secondary milestones and deferring non-urgent submissions.`;
                } else if (assignments > 3) {
                    recommendedAction = `You have ${assignments} assignments stacked. Schedule sequential deep study blocks of 45 minutes using Vercel/Linear focus sprints to distribute workload.`;
                } else {
                    recommendedAction = `Current load levels look solid. Maintain a steady study pace and protect evening slots to preserve cognitive energy.`;
                }

                let focusAdvice = "Engage a 25-minute Pomodoro block followed by a 5-minute breathing break.";
                if (stress > 7) {
                    focusAdvice = "Switch to a 15-minute high-focus interval with 10-minute active recovery breaks.";
                } else if (mood === 'focused') {
                    focusAdvice = "Engage a 50-minute deep flow block with a 10-minute integration break.";
                }

                let scheduleAdvice = "Block 9:00 AM - 11:30 AM tomorrow for deep reading. Avoid screens after 10 PM.";
                if (hours > 8) {
                    scheduleAdvice = "You've logged high study hours today. Suspend cognitive tasks for the next 4 hours and prioritize physical rest.";
                }

                const resultsData = [
                    { title: "Stress Risk Diagnostics", content: `${stressLevel} (${stressPct}% Risk Indicator)` },
                    { title: "Recommended Action Plan", content: recommendedAction },
                    { title: "Suggested Focus Routine", content: focusAdvice },
                    { title: "Adaptive Study Slot Plan", content: scheduleAdvice }
                ];

                // Append advice cards sequentially with slide-up reveal
                resultsData.forEach((item, index) => {
                    const adviceTimer = setTimeout(() => {
                        const card = document.createElement('div');
                        card.className = 'glass-card advice-card';
                        card.innerHTML = `
                            <div class="advice-title">${item.title}</div>
                            <div class="advice-content" id="card-content-${index}"></div>
                        `;
                        resultsGrid.appendChild(card);
                        
                        // Force layout paint
                        card.getBoundingClientRect();
                        card.classList.add('show');
                        
                        // Run a premium typewriter effect for card content
                        typeWriter(document.getElementById(`card-content-${index}`), item.content, 0);
                        
                    }, index * 800);
                    activeIntervals.push(adviceTimer);
                });

            }, 1800);
            activeIntervals.push(delayTimer);
        });

        resetBtn.addEventListener('click', () => {
            resultsDiv.style.display = 'none';
            formDiv.style.display = 'block';
            resultsGrid.innerHTML = '';
        });
    }

    // Typewriter utility for advice text
    function typeWriter(element, text, index) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            const charTimer = setTimeout(() => {
                typeWriter(element, text, index + 1);
            }, 15);
            activeIntervals.push(charTimer);
        }
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
        const presetBtns = document.querySelectorAll('.preset-btn');
        const applyCustomBtn = document.getElementById('apply-custom-timer');

        if (!display || !progressRing) return;

        let totalDuration = 1500; // 25 mins in seconds
        let remaining = totalDuration;
        let timerId = null;
        const strokeCircumference = 628; // Approx 2 * pi * r (r=100)

        // Progress ring setter
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
            
            // Progress calculation
            const progress = remaining / totalDuration;
            setProgressOffset(progress);
        }

        function startTimer() {
            if (timerId) return;
            
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            endBtn.style.display = 'block';
            statusText.textContent = "Flow Session Active";
            messageBox.textContent = "Deep focus active. Minimize device distractions.";

            // Calculate estimated end time
            const endTime = new Date(Date.now() + remaining * 1000);
            const endHours = endTime.getHours() % 12 || 12;
            const endMins = endTime.getMinutes().toString().padStart(2, '0');
            const ampm = endTime.getHours() >= 12 ? 'PM' : 'AM';
            messageBox.textContent += ` Estimated end time: ${endHours}:${endMins} ${ampm}.`;

            timerId = setInterval(() => {
                remaining--;
                updateDisplay();

                if (remaining <= 0) {
                    clearInterval(timerId);
                    timerId = null;
                    statusText.textContent = "Flow Complete";
                    messageBox.textContent = "Session completed successfully. Stand up and stretch!";
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
            statusText.textContent = "Session Paused";
            messageBox.textContent = "Timer paused. Resume when you're ready to focus.";
        }

        function resetTimer() {
            pauseTimer();
            remaining = totalDuration;
            updateDisplay();
            statusText.textContent = "Flow State Ready";
            messageBox.textContent = "Ready to focus? Choose a duration and launch.";
            endBtn.style.display = 'none';
            setProgressOffset(1);
        }

        // Preset buttons click
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                presetBtns.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                totalDuration = parseInt(btn.getAttribute('data-time'));
                resetTimer();
            });
        });

        // Apply custom inputs
        if (applyCustomBtn) {
            applyCustomBtn.addEventListener('click', () => {
                presetBtns.forEach(p => p.classList.remove('active'));
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
            messageBox.textContent = "Session terminated early. Rest logs saved.";
        });

        // Initial setup
        updateDisplay();
        setProgressOffset(1);
    }


    /* ==========================================================================
       3. MOOD ANALYTICS WAVES
       ========================================================================== */
    function initMoodAnalytics() {
        const moodBtns = document.querySelectorAll('.mood-btn');
        const activeLabel = document.getElementById('active-mood-display');
        const path1 = document.querySelector('.wave-p1');
        const path2 = document.querySelector('.wave-p2');
        const waveCard = document.getElementById('mood-wave-card');
        const largeRingFill = document.getElementById('large-ring-fill');
        const largeRingPct = document.getElementById('large-ring-pct');
 
        if (!moodBtns.length || !path1 || !path2 || !waveCard) return;
 
        // Wave parameters changed based on selection
        let amplitude = 12;
        let frequency = 0.02;
        let phase = 0;
        let speed = 0.03;
 
        // State configurations
        const stateConfigs = {
            calm: {
                gradient: 'linear-gradient(180deg, rgba(82, 140, 111, 0.08) 0%, var(--color-bg) 85%)',
                color: '#528c6f',
                colorAlt: '#34d399'
            },
            focused: {
                gradient: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, var(--color-bg) 85%)',
                color: '#38bdf8',
                colorAlt: '#60a5fa'
            },
            fatigued: {
                gradient: 'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, var(--color-bg) 85%)',
                color: '#f59e0b',
                colorAlt: '#d97706'
            },
            overloaded: {
                gradient: 'linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--color-bg) 85%)',
                color: '#ef4444',
                colorAlt: '#ec4899'
            },
            deepflow: {
                gradient: 'linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, var(--color-bg) 85%)',
                color: '#a855f7',
                colorAlt: '#c084fc'
            }
        };

        function setMoodState(moodType, label, energy, amp, freq, spd) {
            amplitude = amp;
            frequency = freq;
            speed = spd;

            activeLabel.textContent = label;

            // Update energy rings
            if (largeRingFill) {
                const offset = 264 - (264 * (energy / 100));
                largeRingFill.style.strokeDashoffset = offset;
                largeRingFill.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }
            if (largeRingPct) {
                largeRingPct.textContent = energy + '%';
            }

            // Update Colors and Gradients
            const config = stateConfigs[moodType];
            if (config) {
                waveCard.style.background = config.gradient;
                waveCard.style.setProperty('--color-accent', config.color);
                waveCard.style.setProperty('--color-accent-alt', config.colorAlt);
                
                if (largeRingFill) {
                    largeRingFill.style.stroke = config.color;
                }
            }

            // Bounce title
            activeLabel.style.transform = 'scale(1.08)';
            setTimeout(() => activeLabel.style.transform = 'scale(1)', 200);
        }

        // Interactive log selector
        moodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                moodBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const moodType = btn.getAttribute('data-mood');
                const label = btn.getAttribute('data-label');
                const energy = parseInt(btn.getAttribute('data-energy'));
                const amp = parseFloat(btn.getAttribute('data-amp'));
                const freq = parseFloat(btn.getAttribute('data-freq'));
                const spd = parseFloat(btn.getAttribute('data-speed'));

                setMoodState(moodType, label, energy, amp, freq, spd);
            });
        });
 
        // Custom SVG Wave calculations loop (liquid dynamics)
        function animateWaves() {
            phase += speed;
            const pointsCount = 40;
            const step = 400 / pointsCount;
            
            let d1 = "M 0 90";
            let d2 = "M 0 90";
 
            for (let i = 0; i <= pointsCount; i++) {
                const x = i * step;
                // Calculate sine coordinates
                const y1 = 90 + Math.sin(x * frequency + phase) * amplitude;
                const y2 = 90 + Math.sin(x * (frequency * 1.2) - phase) * (amplitude * 0.8);
                
                d1 += ` L ${x} ${y1}`;
                d2 += ` L ${x} ${y2}`;
            }
 
            // Close the paths for filled waves
            d1 += " L 400 180 L 0 180 Z";
            d2 += " L 400 180 L 0 180 Z";
 
            path1.setAttribute('d', d1);
            path2.setAttribute('d', d2);
 
            const frameId = requestAnimationFrame(animateWaves);
            activeRafs.push(frameId);
        }
 
        // Chart tooltip behavior
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
 
        // Setup initial default calm state
        setMoodState('calm', 'Calm', 75, 12, 0.02, 0.03);
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
        const deadlineInput = document.getElementById('deadlines-input-burn');
        const deadlineVal = document.getElementById('deadlines-val-burn');
        
        const scoreBadge = document.getElementById('burnout-score-badge');
        const riskLevel = document.getElementById('burnout-risk-level');
        const riskText = document.getElementById('burnout-risk-text');
        const energyVal = document.getElementById('burnout-energy-val');
        const energyBar = document.getElementById('burnout-energy-bar');

        const canvas = document.getElementById('brain-canvas');

        if (!sleepInput || !canvas) return;

        // Calculation variables
        let sleep = parseFloat(sleepInput.value);
        let stress = parseInt(stressInput.value);
        let deadlines = parseInt(deadlineInput.value);
        
        let burnoutRisk = 42; // default
        let nodeActivitySpeed = 1.0; // scales canvas blinks

        // Canvas context setup
        const ctx = canvas.getContext('2d');
        const cWidth = (canvas.width = 260);
        const cHeight = (canvas.height = 220);

        // Define brain profile coordinates nodes
        const brainNodes = [
            { x: 70, y: 110, pulseOffset: 0 },   // Frontal pole
            { x: 90, y: 70, pulseOffset: 0.5 },
            { x: 130, y: 55, pulseOffset: 1.2 },  // Superior parietal
            { x: 180, y: 75, pulseOffset: 0.8 },  // Occipital
            { x: 200, y: 110, pulseOffset: 2.1 },
            { x: 170, y: 140, pulseOffset: 1.5 }, // Cerebellum
            { x: 130, y: 170, pulseOffset: 0.3 }, // Stem
            { x: 100, y: 140, pulseOffset: 1.9 }, // Temporal
            { x: 120, y: 100, pulseOffset: 0.9 }, // Midbrain
            { x: 150, y: 110, pulseOffset: 1.4 },
            { x: 140, y: 80, pulseOffset: 2.4 },
            { x: 110, y: 75, pulseOffset: 1.7 }
        ];

        // Sliders triggers
        sleepInput.addEventListener('input', () => {
            sleep = parseFloat(sleepInput.value);
            sleepVal.textContent = sleep;
            calculateBurnout();
        });

        stressInput.addEventListener('input', () => {
            stress = parseInt(stressInput.value);
            stressVal.textContent = stress;
            calculateBurnout();
        });

        deadlineInput.addEventListener('input', () => {
            deadlines = parseInt(deadlineInput.value);
            deadlineVal.textContent = deadlines;
            calculateBurnout();
        });

        // Perform prediction mechanics
        function calculateBurnout() {
            // Formula: high stress & deadlines increase risk, high sleep decreases risk
            burnoutRisk = Math.round((stress * 6.5) + (deadlines * 5.5) - (sleep * 4.5) + 30);
            
            // Constrain 5% to 95%
            burnoutRisk = Math.max(5, Math.min(95, burnoutRisk));
            
            // Update visual text states
            scoreBadge.textContent = `${burnoutRisk}%`;
            
            // Calculate energy level (inversed risk)
            const energy = Math.max(100 - burnoutRisk, 8);
            energyVal.textContent = `${energy}%`;
            energyBar.style.width = `${energy}%`;

            // Adjust bar colors based on levels
            energyBar.className = 'progress-bar-fill';
            if (burnoutRisk > 70) {
                energyBar.classList.add('critical');
                riskLevel.textContent = "Critical Burnout Risk";
                riskLevel.style.color = "#ef4444";
                riskText.textContent = "Workload exceeds mental margins. Immediately reduce tasks and prioritize rest.";
                nodeActivitySpeed = 3.5; // frantic blinking
            } else if (burnoutRisk > 40) {
                energyBar.classList.add('warning');
                riskLevel.textContent = "Elevated Fatigue Alert";
                riskLevel.style.color = "#f59e0b";
                riskText.textContent = "Moderate cognitive strain. Consider scheduling buffer tasks and protecting sleep.";
                nodeActivitySpeed = 1.8; // active blinking
            } else {
                energyBar.classList.add('normal');
                riskLevel.textContent = "Optimal Flow Stable";
                riskLevel.style.color = "var(--color-accent)";
                riskText.textContent = "Mental metrics are steady. Maintain present work-rest ratios.";
                nodeActivitySpeed = 0.8; // calm pulse
            }
        }

        // Draw brain connections and nodes
        let animTime = 0;
        function drawBrainVisual() {
            ctx.clearRect(0, 0, cWidth, cHeight);
            animTime += 0.05 * nodeActivitySpeed;

            // 1. Draw connection filaments
            ctx.strokeStyle = burnoutRisk > 70 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(var(--color-accent-rgb), 0.12)';
            ctx.lineWidth = 1.2;
            for (let i = 0; i < brainNodes.length; i++) {
                for (let j = i + 1; j < brainNodes.length; j++) {
                    const dx = brainNodes[i].x - brainNodes[j].x;
                    const dy = brainNodes[i].y - brainNodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    // Connect nodes within proximity
                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(brainNodes[i].x, brainNodes[i].y);
                        ctx.lineTo(brainNodes[j].x, brainNodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // 2. Draw blinking nodes
            brainNodes.forEach(node => {
                // Pulse size
                const pulse = Math.abs(Math.sin(animTime + node.pulseOffset));
                const glowRad = 3 + pulse * 7;
                
                // Glow circles
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

                // Core dot
                ctx.fillStyle = burnoutRisk > 70 ? '#ef4444' : (burnoutRisk > 40 ? '#f59e0b' : 'var(--color-text-primary)');
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Pulse card visibility initially
            const card = document.getElementById('burnout-results-card');
            if (card && !card.classList.contains('show')) {
                card.classList.add('show');
            }

            const frameId = requestAnimationFrame(drawBrainVisual);
            activeRafs.push(frameId);
        }

        // Initialize view calculation
        calculateBurnout();
        drawBrainVisual();
    }


    /* ==========================================================================
       5. SMART STUDY PLANNER
       ========================================================================== */
    function initStudyPlanner() {
        const generateBtn = document.getElementById('planner-generate-btn');
        const assignmentsInput = document.getElementById('planner-assignments-input');
        const hackathonsInput = document.getElementById('planner-hackathons-input');
        const hoursInput = document.getElementById('planner-hours-input');
        
        const emptyState = document.getElementById('planner-empty');
        const loaderState = document.getElementById('planner-loader');
        const loaderText = document.getElementById('planner-loader-text');
        const gridState = document.getElementById('planner-schedule-grid');

        if (!generateBtn || !emptyState || !loaderState || !gridState) return;

        generateBtn.addEventListener('click', () => {
            const A = Math.max(0, parseInt(assignmentsInput.value) || 0);
            const H = Math.max(0, parseInt(hackathonsInput.value) || 0);
            const W = Math.max(1, parseInt(hoursInput.value) || 0);

            // Toggle screens
            emptyState.style.display = 'none';
            gridState.style.display = 'none';
            loaderState.style.display = 'flex';
            loaderText.textContent = 'Analyzing deadline congestion...';

            // Phase loader sequence
            let timer1 = setTimeout(() => {
                loaderText.textContent = 'Allocating active focus blocks...';
            }, 600);
            
            let timer2 = setTimeout(() => {
                loaderText.textContent = 'Integrating sleep recovery buffers...';
            }, 1200);

            let timer3 = setTimeout(() => {
                loaderState.style.display = 'none';
                gridState.style.display = 'grid';
                
                // Build dynamic daily tasks
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                gridState.innerHTML = '';

                // Calculate daily parameters
                const dailyHours = Math.round((W / 7) * 10) / 10;
                
                days.forEach((day, index) => {
                    let tasks = [];
                    let activeHours = 0;
                    
                    // Task assignment rules
                    if (index === 0) { // Monday
                        tasks.push({ time: '09:00 AM', name: 'Calculus Quiz Prep', type: 'Focus', priority: 'high' });
                        activeHours += 2;
                        if (A >= 1) {
                            tasks.push({ time: '01:00 PM', name: 'Assignment 1 Coding', type: 'Work', priority: 'med' });
                            activeHours += 2;
                        }
                    } else if (index === 1) { // Tuesday
                        if (A >= 2) {
                            tasks.push({ time: '10:00 AM', name: 'Chemistry Lab Draft', type: 'Work', priority: 'high' });
                            activeHours += 2.5;
                        }
                        tasks.push({ time: '03:00 PM', name: 'Review Lecture Stats', type: 'Review', priority: 'low' });
                        activeHours += 1;
                    } else if (index === 2) { // Wednesday
                        if (A >= 3) {
                            tasks.push({ time: '11:00 AM', name: 'History Essay Outline', type: 'Work', priority: 'med' });
                            activeHours += 2;
                        }
                        tasks.push({ time: '04:00 PM', name: 'Focus Sprint pomodoro', type: 'Focus', priority: 'low' });
                        activeHours += 1.5;
                    } else if (index === 3) { // Thursday
                        if (A >= 4) {
                            tasks.push({ time: '09:00 AM', name: 'Physics Problem Sheet', type: 'Work', priority: 'high' });
                            activeHours += 3;
                        }
                        tasks.push({ time: '02:00 PM', name: 'Syllabus Synapse Sync', type: 'Review', priority: 'low' });
                        activeHours += 1;
                    } else if (index === 4) { // Friday
                        if (A >= 5) {
                            tasks.push({ time: '10:00 AM', name: 'Coding Lab Submission', type: 'Work', priority: 'high' });
                            activeHours += 2.5;
                        } else {
                            tasks.push({ time: '02:00 PM', name: 'Buffer Rest Window', type: 'Decompress', priority: 'low' });
                            activeHours += 1;
                        }
                    } else if (index === 5) { // Saturday
                        if (H >= 1) {
                            tasks.push({ time: '09:00 AM', name: 'Hackathon Phase 1 Build', type: 'Hackathon', priority: 'high' });
                            activeHours += 5;
                        } else {
                            tasks.push({ time: '10:00 AM', name: 'Deep Work Side Project', type: 'Focus', priority: 'med' });
                            activeHours += 3;
                        }
                    } else if (index === 6) { // Sunday
                        if (H >= 2) {
                            tasks.push({ time: '10:00 AM', name: 'Hackathon Pitch Draft', type: 'Hackathon', priority: 'high' });
                            activeHours += 4;
                        }
                        tasks.push({ time: '04:00 PM', name: 'Sleep Recovery Buffer', type: 'Decompress', priority: 'low' });
                        activeHours += 2;
                    }

                    // Constrain active hours display to study hours input dynamically
                    const dayHoursDisplay = Math.min(activeHours, Math.round(dailyHours * 10) / 10);
                    let congestionClass = 'status-optimal';
                    let congestionText = 'Optimal';
                    if (dayHoursDisplay > 4) {
                        congestionClass = 'status-congested';
                        congestionText = 'Congested';
                    } else if (dayHoursDisplay > 2.5) {
                        congestionClass = 'status-moderate';
                        congestionText = 'Moderate';
                    }

                    // Build tasks HTML
                    let tasksHtml = '';
                    if (tasks.length === 0) {
                        tasksHtml = `<div class="planner-day-empty-text">Rest & Recovery</div>`;
                    } else {
                        tasks.forEach(task => {
                            tasksHtml += `
                                <div class="planner-task-card priority-${task.priority}">
                                    <div class="task-card-time">${task.time}</div>
                                    <div class="task-card-name">${task.name}</div>
                                    <div class="task-card-type">${task.type}</div>
                                </div>
                            `;
                        });
                    }

                    const dayCol = document.createElement('div');
                    dayCol.className = 'planner-day-col';
                    dayCol.style.opacity = '0';
                    dayCol.style.transform = 'translateY(15px)';
                    dayCol.innerHTML = `
                        <div class="planner-day-header">
                            <span class="day-name">${day}</span>
                            <span class="day-badge ${congestionClass}">${dayHoursDisplay}h (${congestionText})</span>
                        </div>
                        <div class="planner-day-tasks">
                            ${tasksHtml}
                        </div>
                    `;
                    gridState.appendChild(dayCol);
                });

                // Stagger columns entrance animation
                const cols = document.querySelectorAll('.planner-day-col');
                cols.forEach((col, idx) => {
                    let delayTimer = setTimeout(() => {
                        col.style.opacity = '1';
                        col.style.transform = 'translateY(0)';
                        col.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, idx * 80);
                    activeIntervals.push(delayTimer);
                });

            }, 1700);

            activeIntervals.push(timer1, timer2, timer3);
        });
    }


    /* ==========================================================================
       6. PREDICTIVE INSIGHTS TIMELINE
       ========================================================================== */
    function initPredictiveInsights() {
        const nodes = document.querySelectorAll('.timeline-node');
        const tooltip = document.getElementById('timeline-tooltip');
        const tTitle = document.getElementById('tooltip-title');
        const tRisk = document.getElementById('tooltip-risk');
        const tDesc = document.getElementById('tooltip-desc');

        if (!nodes.length || !tooltip) return;

        nodes.forEach(node => {
            node.addEventListener('click', () => {
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');

                // Read milestone specs
                const title = node.getAttribute('data-title');
                const risk = node.getAttribute('data-risk');
                const desc = node.getAttribute('data-desc');

                // Transition tooltip out then in
                tooltip.classList.remove('show');
                
                const tooltipTimer = setTimeout(() => {
                    tTitle.textContent = title;
                    tDesc.textContent = desc;

                    // Set risk level tags
                    tRisk.textContent = `${risk.toUpperCase()} RISK`;
                    tRisk.className = 'tooltip-risk';
                    if (risk === 'low') {
                        tRisk.classList.add('risk-low');
                    } else if (risk === 'med') {
                        tRisk.classList.add('risk-med');
                    } else {
                        tRisk.classList.add('risk-high');
                    }

                    tooltip.classList.add('show');
                }, 200);
                activeIntervals.push(tooltipTimer);
            });
        });
    }

    // Main Exporter
    window.MindMapFeatures = {
        init: function (route) {
            // Clean up any frames before firing a new scene
            cleanupLoops();

            // Setup appropriate feature components
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
