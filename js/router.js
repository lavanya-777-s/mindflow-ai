/*
 * MindMap AI - Client Side Router
 * Handles History and Hash routing fallback, dynamic template swaps, and views setup.
 */

(function () {
    // Check if running on local file system (file://) or server
    const isFileProtocol = window.location.protocol === 'file:';
    
    // Page template dictionary
    const templates = {
        '/': `
            <div class="router-view-page landing-page">
                <!-- Section 1: Hero Section -->
                <section class="hero-section">
                    <div class="hero-gradient-overlay"></div>
                    <div class="hero-content">
                        <h1 class="hero-title">
                            <span class="title-line">Understand your workload</span>
                            <span class="title-line">before burnout begins</span>
                        </h1>
                        <p class="hero-subtitle">
                            An AI-powered student companion that analyzes workload, detects stress patterns, and creates smarter study plans before productivity drops.
                        </p>
                        <div class="hero-buttons">
                            <a href="/ai-companion" class="action-btn" data-route="/ai-companion">Start Your Journey</a>
                            <a href="#features-preview" class="secondary-btn" id="explore-features-btn">Explore Features</a>
                        </div>
                    </div>
                </section>

                <!-- Section 1.5: Storytelling Journey (Wow Moment) -->
                <section class="story-section">
                    <div class="story-container">
                        <div class="section-header animate-fade-in stagger-1" style="margin-bottom: 2.5rem;">
                            <span class="section-label">Workload Diagnostics</span>
                            <h2 class="section-title">Students do not manage only tasks.</h2>
                            <p class="section-desc" style="max-width: 600px; margin: 0.5rem auto 0 auto; color: var(--color-text-secondary); font-size: 0.95rem;">They balance an overlapping, high-pressure ecosystem of deadlines, events, and physiological strain.</p>
                        </div>
                        
                        <div class="story-interactive-box state-chaos" id="story-box">
                            <!-- Premium Scanline Overlay -->
                            <div class="story-scan-line" id="story-scan"></div>
                            
                            <!-- Chaotic/Structured Viewport -->
                            <div class="story-viewport" id="story-viewport">
                                <!-- Card 1: 5 Assignments -->
                                <div class="glass-card story-card card-1" id="scard-1">
                                    <div class="chaos-view">
                                        <div class="story-card-badge">Pressure Peak</div>
                                        <div class="story-card-title">5 Assignments</div>
                                        <div class="story-card-desc">Calculus Quiz, Chemistry Lab Report, History Draft, Physics Sheet, Coding Project</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Structured Schedule</div>
                                        <div class="story-card-title">Optimal Study Order</div>
                                        <div class="story-tasks-list">
                                            <div class="story-task-item"><span>📅 Mon: Calculus Quiz Prep</span><span class="clear-status">2h Block</span></div>
                                            <div class="story-task-item"><span>📅 Tue: Chemistry Lab Report</span><span class="clear-status">1.5h Block</span></div>
                                            <div class="story-task-item"><span>📅 Wed: History Draft</span><span class="clear-status">Buffer</span></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card 2: 2 Hackathons -->
                                <div class="glass-card story-card card-2" id="scard-2">
                                    <div class="chaos-view">
                                        <div class="story-card-badge">Conflict Alert</div>
                                        <div class="story-card-title">2 Hackathons</div>
                                        <div class="story-card-desc">Global AI Build (48h), Web3 Synergy Sprint (36h)</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Hackathon Slots</div>
                                        <div class="story-card-title">Balanced Milestones</div>
                                        <div class="story-tasks-list">
                                            <div class="story-task-item"><span>🚀 Sat: Global AI Build</span><span class="clear-status">Active</span></div>
                                            <div class="story-task-item"><span>⏭️ Next Wk: Web3 Synergy</span><span class="clear-status">Postponed</span></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card 3: 3 Deadlines -->
                                <div class="glass-card story-card card-3" id="scard-3">
                                    <div class="chaos-view">
                                        <div class="story-card-badge danger-badge">Time Constraint</div>
                                        <div class="story-card-title">3 Deadlines</div>
                                        <div class="story-card-desc">Calculus, Chemistry, and Physics due within next 48 hours</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Focus Allocation</div>
                                        <div class="story-card-title">Cognitive Sprints</div>
                                        <div class="story-tasks-list">
                                            <div class="story-task-item"><span>🧠 Sprint 1: 45m Focus</span><span class="clear-status">Active</span></div>
                                            <div class="story-task-item"><span>🧠 Sprint 2: 45m Focus</span><span class="clear-status">Active</span></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card 4: 4 Hours of Sleep -->
                                <div class="glass-card story-card card-4" id="scard-4">
                                    <div class="chaos-view">
                                        <div class="story-card-badge danger-badge">Physical Deficit</div>
                                        <div class="story-card-title">4 Hours of Sleep</div>
                                        <div class="story-card-desc">Sleep debt: critical (-4.5 hrs) • Cognitive function reduced</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Rest Reconciliation</div>
                                        <div class="story-card-title">Sleep Buffer</div>
                                        <div class="story-tasks-list">
                                            <div class="story-task-item"><span>😴 Tonight: Target 7.5h Sleep</span><span class="clear-status">Enforced</span></div>
                                            <div class="story-task-item"><span>🔋 Sleep Debt: -1.2h</span><span class="clear-status">Recovering</span></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card 5: Constant Pressure -->
                                <div class="glass-card story-card card-5" id="scard-5">
                                    <div class="chaos-view">
                                        <div class="story-card-badge alert-badge">Mental Overload</div>
                                        <div class="story-card-title">Constant Pressure</div>
                                        <div class="story-card-desc">Stress Index: 8.5/10 • Fatigue: Critical • Cognitive burnout imminent</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Stress Intervention</div>
                                        <div class="story-card-title">Companion Suggestions</div>
                                        <div class="story-tasks-list">
                                            <div class="story-task-item"><span>💡 Defer History Essay by 24h</span><span class="clear-status">Auto-Drafted</span></div>
                                            <div class="story-task-item"><span>💡 Enforce 30% Screen Off at 9:30 PM</span><span class="clear-status">Enabled</span></div>
                                            <div class="story-task-item"><span>💡 Active Decompression Walk (15m)</span><span class="clear-status">Suggested</span></div>
                                            <div class="story-task-item"><span>💡 Breathing Session before Calculus</span><span class="clear-status">10m Guided</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Action Trigger Button -->
                            <div class="story-controls">
                                <button class="action-btn" id="story-trigger-btn">Reorganize Workload</button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 2: Features Preview Grid -->
                <section class="features-section" id="features-preview">
                    <div class="section-header animate-fade-in stagger-1">
                        <span class="section-label">Features Suite</span>
                        <h2 class="section-title">Designed for Cognitive Focus</h2>
                    </div>
                    <div class="features-grid animate-fade-in stagger-2">
                        <!-- AI Burnout Detection -->
                        <div class="magnetic-wrap" data-route="/burnout-detection">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title">AI Burnout Detection</h3>
                                    <p class="feature-card-desc">Predict cognitive fatigue early by analyzing academic metrics, sleep cycles, and daily anxiety levels.</p>
                                </div>
                                <div class="feature-card-footer">Analyze Risk &rarr;</div>
                            </div>
                        </div>

                        <!-- Smart Study Planner -->
                        <div class="magnetic-wrap" data-route="/study-planner">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title">Smart Study Planner</h3>
                                    <p class="feature-card-desc">Create adaptive calendars that distribute assignments evenly to prevent deadline bottle-necks.</p>
                                </div>
                                <div class="feature-card-footer">Plan Workspace &rarr;</div>
                            </div>
                        </div>

                        <!-- Mood Analytics -->
                        <div class="magnetic-wrap" data-route="/mood-analytics">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title">Mood Analytics</h3>
                                    <p class="feature-card-desc">Track stress patterns and plot emotional curves alongside study performance graphs.</p>
                                </div>
                                <div class="feature-card-footer">View Analytics &rarr;</div>
                            </div>
                        </div>

                        <!-- Focus Tracking -->
                        <div class="magnetic-wrap" data-route="/focus-tracking">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title">Focus Tracking</h3>
                                    <p class="feature-card-desc">Activate dark-themed flow timers. Tailor intervals and monitor deep focus points over time.</p>
                                </div>
                                <div class="feature-card-footer">Enter Flow State &rarr;</div>
                            </div>
                        </div>

                        <!-- AI Companion -->
                        <div class="magnetic-wrap" data-route="/ai-companion">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title">AI Companion</h3>
                                    <p class="feature-card-desc">Simulate workload obstacles and generate customized recommendations in real-time.</p>
                                </div>
                                <div class="feature-card-footer">Launch Companion &rarr;</div>
                            </div>
                        </div>

                        <!-- Predictive Insights -->
                        <div class="magnetic-wrap" data-route="/predictive-insights">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title">Predictive Insights</h3>
                                    <p class="feature-card-desc">Forecast future stress spikes, pinpoint heavy workload windows, and plan buffer days.</p>
                                </div>
                                <div class="feature-card-footer">Check Forecast &rarr;</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 3: Quick Dashboard Preview -->
                <section class="dashboard-preview-section">
                    <div class="section-header animate-fade-in stagger-1">
                        <span class="section-label">Realtime Diagnostics</span>
                        <h2 class="section-title">Your Workload Overview</h2>
                    </div>
                    <div class="dashboard-showcase animate-fade-in stagger-2">
                        <!-- Left Big Graph Card -->
                        <div class="glass-card dashboard-card-main">
                            <div class="chart-header">
                                <h3 class="feature-card-title" style="font-size: 1.15rem; margin-bottom: 0;">Weekly Productivity Metrics</h3>
                                <div class="chart-legend">
                                    <div class="legend-item">
                                        <span class="legend-dot dot-stress"></span>
                                        <span>Workload Stress</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-dot dot-focus"></span>
                                        <span>Cognitive Flow</span>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-svg-container">
                                <svg class="chart-svg" viewBox="0 0 500 200">
                                    <!-- Grid lines -->
                                    <line x1="0" y1="40" x2="500" y2="40" class="grid-line"></line>
                                    <line x1="0" y1="90" x2="500" y2="90" class="grid-line"></line>
                                    <line x1="0" y1="140" x2="500" y2="140" class="grid-line"></line>
                                    
                                    <!-- Stress line path (animated) -->
                                    <path d="M 0 160 Q 80 130 160 145 T 320 80 T 500 45" class="chart-line chart-line-stress"></path>
                                    
                                    <!-- Focus line path (animated) -->
                                    <path d="M 0 110 Q 80 120 160 85 T 320 135 T 500 95" class="chart-line chart-line-focus"></path>
                                </svg>
                            </div>
                            <!-- Explanatory Insight Banner -->
                            <div class="chart-insight-banner">
                                <span class="insight-icon">💡</span>
                                <span class="insight-text"><strong>AI Diagnostics:</strong> Focus dropped 18% after sleep reduced below 6 hours on Thursday. Stress peaked due to deadline congestion.</span>
                            </div>
                        </div>

                        <!-- Right Stats Column -->
                        <div class="dashboard-side-grid">
                            <div class="glass-card side-card">
                                <div class="side-card-content">
                                    <span class="section-label" style="font-size:0.7rem; margin-bottom: 0;">Avg Stress Score</span>
                                    <span class="side-card-num" style="color: var(--color-accent);">34%</span>
                                    <span class="side-card-sub">Optimal Range</span>
                                </div>
                                <div style="width:50px; height: 50px; border-radius:50%; border:3px solid rgba(var(--color-accent-rgb), 0.15); border-top-color: var(--color-accent); transform: rotate(45deg);"></div>
                            </div>
                            <div class="glass-card side-card">
                                <div class="side-card-content">
                                    <span class="section-label" style="font-size:0.7rem; margin-bottom: 0;">Focus Quotient</span>
                                    <span class="side-card-num" style="color: var(--color-accent-alt);">82</span>
                                    <span class="side-card-sub">High Efficiency</span>
                                </div>
                                <div style="width:50px; height: 50px; border-radius:50%; border:3px solid rgba(222, 217, 209, 0.15); border-top-color: var(--color-accent-alt); transform: rotate(180deg);"></div>
                            </div>
                            <!-- Recommendations block -->
                            <div class="glass-card ai-recommendation-card side-card" style="display: block; padding: 1.25rem 1.5rem;">
                                <span class="section-label" style="font-size:0.7rem; margin-bottom: 0.5rem; display: block;">Companion Diagnostics</span>
                                <div class="rec-list">
                                    <div class="rec-item">
                                        <span>Launch 25m Pomodoro session</span>
                                        <span class="rec-badge">Flow</span>
                                    </div>
                                    <div class="rec-item">
                                        <span>Target 7.5 hrs sleep tonight</span>
                                        <span class="rec-badge">Health</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 4: Final CTA -->
                <section class="cta-section">
                    <div class="glass-card cta-card animate-fade-in stagger-3">
                        <h2 class="cta-title">Take control before stress takes over.</h2>
                        <a href="/ai-companion" class="action-btn" data-route="/ai-companion" style="margin-top: 1rem;">Start Your Journey</a>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="footer">
                    <div class="footer-content">
                        <span>&copy; 2026 MindMap AI. All rights reserved.</span>
                        <div class="footer-links">
                            <a href="#" class="footer-link">Terms</a>
                            <a href="#" class="footer-link">Privacy</a>
                            <a href="#" class="footer-link">Docs</a>
                        </div>
                    </div>
                </footer>
            </div>
        `,
        '/ai-companion': `
            <div class="router-view-page feature-page" data-page="ai-companion">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Personalized Guidance</span>
                        <h2 class="feature-title">AI Companion</h2>
                        <p class="feature-description">
                            Experience structured advisor logic tailored to cognitive needs. Specify current parameters to map workload pressure and generate personalized guidance, focus routines, and stress management checklists.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.5rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 0.5rem;">How it works</h3>
                            <p class="feature-card-desc">The neural model calculates study load parameters based on your inputs and simulates optimal student action plans using a sequential recommendations workflow.</p>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">AI Companion Simulation</h3>
                        
                        <div class="orb-simulation-box">
                            <div class="orb-glow-ring"></div>
                            <div class="orb-glow-ring-2"></div>
                            <div class="companion-orb"></div>
                        </div>

                        <!-- Simulator Input Panel -->
                        <div id="companion-form">
                            <div class="input-group">
                                <label class="input-label">Stress Level: <span id="stress-val">5</span>/10</label>
                                <input type="range" min="1" max="10" value="5" class="slider-input" id="stress-input">
                            </div>
                            
                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div class="input-group">
                                    <label class="input-label">Pending Assignments</label>
                                    <input type="number" min="0" max="15" value="3" class="text-input" id="assignments-input">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Upcoming Hackathons</label>
                                    <input type="number" min="0" max="5" value="1" class="text-input" id="hackathons-input">
                                </div>
                            </div>

                            <div class="input-group">
                                <label class="input-label">Hours Studied Today: <span id="hours-val">4</span>h</label>
                                <input type="range" min="0" max="16" value="4" class="slider-input" id="hours-input">
                            </div>

                            <div class="input-group">
                                <label class="input-label">Current Cognitive Mood</label>
                                <select class="select-input" id="mood-input">
                                    <option value="calm">😌 Calm & Composed</option>
                                    <option value="focused">🧠 Focused & Productive</option>
                                    <option value="anxious">🥵 Stressed & Overwhelmed</option>
                                    <option value="tired">😴 Tired & Exhausted</option>
                                    <option value="excited">⚡ Motivated & Excited</option>
                                </select>
                            </div>

                            <div class="input-group">
                                <label class="input-label">What is bothering you today?</label>
                                <textarea class="text-input" rows="2" placeholder="e.g. Midterm prep is stacking up with lab reports..." id="bother-input" style="resize:none;"></textarea>
                            </div>

                            <button class="action-btn" id="generate-advice-btn" style="width: 100%; margin-top: 1rem;">Generate AI Advice</button>
                        </div>

                        <!-- Results container (hidden by default) -->
                        <div id="companion-results" style="display: none;">
                            <div class="companion-thinking" id="thinking-indicator">
                                <span class="thinking-dot"></span>
                                <span class="thinking-dot"></span>
                                <span class="thinking-dot"></span>
                            </div>
                            
                            <div class="companion-results-grid" id="results-grid">
                                <!-- Appended dynamically -->
                            </div>

                            <button class="secondary-btn" id="reset-companion-btn" style="width: 100%; margin-top: 1.5rem;">Configure Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        '/focus-tracking': `
            <div class="router-view-page feature-page" data-page="focus-tracking">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Deep Productivity</span>
                        <h2 class="feature-title">Focus Tracking</h2>
                        <p class="feature-description">
                            Sustain deep work states without mental drain. Leverage customizable timers and presets tailored for study efficiency while monitoring your flow duration.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.5rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 0.5rem;">Focus Recommendation</h3>
                            <p class="feature-card-desc">For heavy project workloads, we recommend a 45-minute sprint with 10-minute breaks to optimize neurological resilience.</p>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Working Flow Timer</h3>
                        
                        <div class="focus-timer-container">
                            <div class="timer-visual-box">
                                <svg class="timer-ring-svg">
                                    <circle class="timer-ring-bg" cx="125" cy="125" r="100"></circle>
                                    <circle class="timer-ring-progress" id="timer-progress" cx="125" cy="125" r="100"></circle>
                                </svg>
                                <div class="timer-text-container">
                                    <span class="timer-numbers" id="timer-display">25:00</span>
                                    <span class="timer-subtext" id="timer-status">Flow State</span>
                                </div>
                            </div>

                            <!-- Presets -->
                            <div class="focus-presets">
                                <button class="preset-btn active" data-time="1500">25 Min</button>
                                <button class="preset-btn" data-time="2700">45 Min</button>
                                <button class="preset-btn" data-time="3600">60 Min</button>
                                <button class="preset-btn" data-time="5400">90 Min</button>
                            </div>

                            <!-- Custom Setup -->
                            <div class="custom-time-inputs">
                                <div class="input-group" style="flex:1; margin-bottom:0;">
                                    <label class="input-label" style="font-size:0.7rem;">Hours</label>
                                    <input type="number" min="0" max="23" value="0" class="text-input" id="custom-hours" style="padding:0.5rem; text-align:center;">
                                </div>
                                <div class="input-group" style="flex:1; margin-bottom:0;">
                                    <label class="input-label" style="font-size:0.7rem;">Minutes</label>
                                    <input type="number" min="0" max="59" value="25" class="text-input" id="custom-minutes" style="padding:0.5rem; text-align:center;">
                                </div>
                                <button class="secondary-btn" id="apply-custom-timer" style="height:38px; align-self:flex-end; padding:0.5rem 1rem; font-size:0.8rem;">Apply</button>
                            </div>

                            <!-- Actions -->
                            <div class="timer-control-buttons">
                                <button class="action-btn" id="timer-start-btn">Start</button>
                                <button class="secondary-btn" id="timer-pause-btn" style="display:none;">Pause</button>
                                <button class="secondary-btn" id="timer-reset-btn">Reset</button>
                                <button class="secondary-btn" id="timer-end-btn" style="display:none; border-color:rgba(239,68,68,0.2); color:#ef4444;">End Session</button>
                            </div>

                            <!-- Message panel -->
                            <div class="focus-message-box" id="focus-message">
                                Ready to focus? Choose a duration and launch.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        '/mood-analytics': `
            <div class="router-view-page feature-page" data-page="mood-analytics">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Emotional Awareness</span>
                        <h2 class="feature-title">Mood Analytics</h2>
                        <p class="feature-description">
                            Understand the cognitive waves governing your study productivity. Chart your emotional states over study sessions and map stress spikes against academic output.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.5rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 0.5rem;">Mood-Performance Link</h3>
                            <p class="feature-card-desc">Logging mood states helps correlate anxiety levels with focus duration. Regular check-ins build a robust cognitive performance record.</p>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Emotion Waves & Trends</h3>
                        
                        <div class="mood-interface-box">
                            <!-- Visual Wave Indicator with large Energy Ring overlay -->
                            <div class="glass-card wave-display-card" id="mood-wave-card">
                                <div class="mood-large-ring-box">
                                    <svg class="mood-large-ring" viewBox="0 0 100 100">
                                        <circle class="ring-bg" cx="50" cy="50" r="42"></circle>
                                        <circle class="ring-fill" id="large-ring-fill" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="66"></circle>
                                    </svg>
                                    <div class="mood-large-ring-text">
                                        <span class="mood-large-energy-pct" id="large-ring-pct">75%</span>
                                        <span class="mood-large-energy-lbl">Energy</span>
                                    </div>
                                </div>
                                
                                <span class="mood-title-overlay" id="active-mood-display">Calm</span>
                                
                                <svg class="mood-waves-svg" viewBox="0 0 400 180" preserveAspectRatio="none">
                                    <path class="mood-wave-path wave-p1" d="M 0 90 Q 50 70 100 90 T 200 90 T 300 90 T 400 90 L 400 180 L 0 180 Z"></path>
                                    <path class="mood-wave-path wave-p2" d="M 0 90 Q 50 110 100 90 T 200 90 T 300 90 T 400 90 L 400 180 L 0 180 Z"></path>
                                </svg>
                            </div>

                            <!-- Log Mood Buttons without Emojis -->
                            <div>
                                <span class="input-label" style="display:block; margin-bottom:0.75rem;">Log Current State</span>
                                <div class="mood-selector-grid">
                                    <!-- Calm -->
                                    <button class="mood-btn active" data-mood="calm" data-label="Calm" data-energy="75" data-amp="12" data-freq="0.02" data-speed="0.03" data-color="#528c6f" data-color-alt="#34d399">
                                        <div class="mood-mini-ring-box">
                                            <svg class="mood-mini-ring" viewBox="0 0 36 36">
                                                <circle class="ring-bg" cx="18" cy="18" r="14"></circle>
                                                <circle class="ring-fill fill-calm" cx="18" cy="18" r="14" stroke-dasharray="88" stroke-dashoffset="22"></circle>
                                            </svg>
                                        </div>
                                        <span class="mood-label">Calm</span>
                                        <span class="mood-energy-value">75% Energy</span>
                                    </button>
                                    
                                    <!-- Focused -->
                                    <button class="mood-btn" data-mood="focused" data-label="Focused" data-energy="85" data-amp="18" data-freq="0.03" data-speed="0.05" data-color="#38bdf8" data-color-alt="#60a5fa">
                                        <div class="mood-mini-ring-box">
                                            <svg class="mood-mini-ring" viewBox="0 0 36 36">
                                                <circle class="ring-bg" cx="18" cy="18" r="14"></circle>
                                                <circle class="ring-fill fill-focused" cx="18" cy="18" r="14" stroke-dasharray="88" stroke-dashoffset="13.2"></circle>
                                            </svg>
                                        </div>
                                        <span class="mood-label">Focused</span>
                                        <span class="mood-energy-value">85% Energy</span>
                                    </button>
                                    
                                    <!-- Fatigued -->
                                    <button class="mood-btn" data-mood="fatigued" data-label="Fatigued" data-energy="35" data-amp="6" data-freq="0.01" data-speed="0.015" data-color="#f59e0b" data-color-alt="#d97706">
                                        <div class="mood-mini-ring-box">
                                            <svg class="mood-mini-ring" viewBox="0 0 36 36">
                                                <circle class="ring-bg" cx="18" cy="18" r="14"></circle>
                                                <circle class="ring-fill fill-fatigued" cx="18" cy="18" r="14" stroke-dasharray="88" stroke-dashoffset="57.2"></circle>
                                            </svg>
                                        </div>
                                        <span class="mood-label">Fatigued</span>
                                        <span class="mood-energy-value">35% Energy</span>
                                    </button>
                                    
                                    <!-- Overloaded -->
                                    <button class="mood-btn" data-mood="overloaded" data-label="Overloaded" data-energy="15" data-amp="28" data-freq="0.05" data-speed="0.08" data-color="#ef4444" data-color-alt="#ec4899">
                                        <div class="mood-mini-ring-box">
                                            <svg class="mood-mini-ring" viewBox="0 0 36 36">
                                                <circle class="ring-bg" cx="18" cy="18" r="14"></circle>
                                                <circle class="ring-fill fill-overloaded" cx="18" cy="18" r="14" stroke-dasharray="88" stroke-dashoffset="74.8"></circle>
                                            </svg>
                                        </div>
                                        <span class="mood-label">Overloaded</span>
                                        <span class="mood-energy-value">15% Energy</span>
                                    </button>
                                    
                                    <!-- Deep Flow -->
                                    <button class="mood-btn" data-mood="deepflow" data-label="Deep Flow" data-energy="98" data-amp="22" data-freq="0.015" data-speed="0.04" data-color="#a855f7" data-color-alt="#c084fc">
                                        <div class="mood-mini-ring-box">
                                            <svg class="mood-mini-ring" viewBox="0 0 36 36">
                                                <circle class="ring-bg" cx="18" cy="18" r="14"></circle>
                                                <circle class="ring-fill fill-deepflow" cx="18" cy="18" r="14" stroke-dasharray="88" stroke-dashoffset="1.76"></circle>
                                            </svg>
                                        </div>
                                        <span class="mood-label">Deep Flow</span>
                                        <span class="mood-energy-value">98% Energy</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Interactive graph -->
                            <div>
                                <span class="input-label" style="display:block; margin-bottom:0.75rem;">Weekly Trend Matrix</span>
                                <div class="glass-card" style="padding:1.25rem 1rem; min-height: 160px; background: rgba(0,0,0,0.2);">
                                    <svg viewBox="0 0 350 120" style="width:100%; height:100%; overflow:visible;">
                                        <!-- Vertical Grid Lines -->
                                        <line x1="20" y1="10" x2="20" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="70" y1="10" x2="70" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="120" y1="10" x2="120" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="170" y1="10" x2="170" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="220" y1="10" x2="220" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="270" y1="10" x2="270" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="320" y1="10" x2="320" y2="100" stroke="rgba(255,255,255,0.04)"></line>

                                        <!-- Trend Path -->
                                        <path d="M 20 80 L 70 50 L 120 40 L 170 85 L 220 90 L 270 30 L 320 45" fill="none" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"></path>
                                        
                                        <!-- Data Points -->
                                        <circle cx="20" cy="80" r="4.5" fill="var(--color-accent)" class="mood-chart-dot" data-info="Mon: Overloaded (Sleep: 5h)"></circle>
                                        <circle cx="70" cy="50" r="4.5" fill="var(--color-accent)" class="mood-chart-dot" data-info="Tue: Focused (Sleep: 7h)"></circle>
                                        <circle cx="120" cy="40" r="4.5" fill="var(--color-accent)" class="mood-chart-dot" data-info="Wed: Deep Flow (Sleep: 8h)"></circle>
                                        <circle cx="170" cy="85" r="4.5" fill="var(--color-accent)" class="mood-chart-dot" data-info="Thu: Fatigued (Sleep: 4h)"></circle>
                                        <circle cx="220" cy="90" r="4.5" fill="var(--color-accent)" class="mood-chart-dot" data-info="Fri: Fatigued (Sleep: 5.5h)"></circle>
                                        <circle cx="270" cy="30" r="4.5" fill="var(--color-accent)" class="mood-chart-dot" data-info="Sat: Deep Flow (Sleep: 8.5h)"></circle>
                                        <circle cx="320" cy="45" r="4.5" fill="var(--color-accent)" class="mood-chart-dot" data-info="Sun: Calm (Sleep: 7.5h)"></circle>

                                        <!-- Weekday labels -->
                                        <text x="20" y="115" font-size="7" fill="rgba(255,255,255,0.3)" text-anchor="middle">Mon</text>
                                        <text x="70" y="115" font-size="7" fill="rgba(255,255,255,0.3)" text-anchor="middle">Tue</text>
                                        <text x="120" y="115" font-size="7" fill="rgba(255,255,255,0.3)" text-anchor="middle">Wed</text>
                                        <text x="170" y="115" font-size="7" fill="rgba(255,255,255,0.3)" text-anchor="middle">Thu</text>
                                        <text x="220" y="115" font-size="7" fill="rgba(255,255,255,0.3)" text-anchor="middle">Fri</text>
                                        <text x="270" y="115" font-size="7" fill="rgba(255,255,255,0.3)" text-anchor="middle">Sat</text>
                                        <text x="320" y="115" font-size="7" fill="rgba(255,255,255,0.3)" text-anchor="middle">Sun</text>
                                    </svg>
                                    <div id="chart-tooltip" style="text-align: center; font-size: 0.72rem; color: var(--color-text-secondary); margin-top: 0.5rem; height: 12px;">Hover over data points to inspect mood history</div>
                                </div>
                                
                                <!-- Insight banner overlay -->
                                <div class="chart-insight-banner" style="margin-top: 1rem;">
                                    <span class="insight-icon">💡</span>
                                    <span class="insight-text"><strong>AI Diagnostics:</strong> Focus dropped 18% after sleep reduced below 6 hours mid-week. Optimal cognitive flow correlates with 7.5h+ rest.</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        '/burnout-detection': `
            <div class="router-view-page feature-page" data-page="burnout-detection">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Stress Intelligence</span>
                        <h2 class="feature-title">Burnout Detection</h2>
                        <p class="feature-description">
                            Simulate performance metrics and identify physiological burnout danger thresholds. The algorithm tracks sleep deficit, stress level, and workload to predict mental exhaustion indexes.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.5rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 0.5rem;">Stress Index Guidance</h3>
                            <p class="feature-card-desc">If your Stress Index climbs above 70%, we recommend scaling back non-critical deadlines and enforcing a 30% reduction in screen time.</p>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Burnout Predictor Module</h3>
                        
                        <!-- Neural Brain Simulation -->
                        <div class="burnout-brain-box">
                            <canvas id="brain-canvas" class="brain-mesh-canvas"></canvas>
                        </div>

                        <!-- Param Inputs -->
                        <div class="input-group">
                            <label class="input-label">Daily Sleep: <span id="sleep-val-burn">7.5</span> Hours</label>
                            <input type="range" min="3" max="10" step="0.5" value="7.5" class="slider-input" id="sleep-input-burn">
                        </div>

                        <div class="input-group">
                            <label class="input-label">Perceived Stress: <span id="stress-val-burn">5</span>/10</label>
                            <input type="range" min="1" max="10" value="5" class="slider-input" id="stress-input-burn">
                        </div>

                        <div class="input-group">
                            <label class="input-label">Upcoming Deadlines: <span id="deadlines-val-burn">3</span></label>
                            <input type="range" min="0" max="10" value="3" class="slider-input" id="deadlines-input-burn">
                        </div>

                        <!-- Burnout predictions cards -->
                        <div class="burnout-output-wrapper">
                            <div class="glass-card prediction-card" id="burnout-results-card">
                                <div class="prediction-badge" id="burnout-score-badge">42%</div>
                                <div style="flex:1;">
                                    <div class="feature-card-title" style="font-size: 1rem; margin-bottom: 0.25rem;" id="burnout-risk-level">Moderate Risk</div>
                                    <p class="feature-card-desc" style="font-size: 0.82rem; margin-bottom: 0.75rem;" id="burnout-risk-text">Workload is stable. Ensure regular sleep windows to prevent cognitive load drift.</p>
                                    
                                    <div class="metrics-progress-bars">
                                        <div class="progress-row">
                                            <div class="progress-header">
                                                <span>Energy Level</span>
                                                <span id="burnout-energy-val">70%</span>
                                            </div>
                                            <div class="progress-bar-bg">
                                                <div class="progress-bar-fill normal" id="burnout-energy-bar" style="width: 70%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        '/study-planner': `
            <div class="router-view-page feature-page" data-page="study-planner">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Adaptive Schedules</span>
                        <h2 class="feature-title">Smart Study Planner</h2>
                        <p class="feature-description">
                            Distribute assignments and tasks across dynamic weekly timelines. Generate your planner based on workload variables and watch tasks fall into optimal slots.
                        </p>
                        
                        <!-- Inputs Card -->
                        <div class="glass-card study-planner-input-card" style="padding: 1.5rem; border-color: rgba(var(--color-accent-rgb), 0.15); margin-top: 1rem;">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 1.25rem;">Schedule Parameters</h3>
                            <div class="input-group">
                                <label class="input-label">Pending Assignments</label>
                                <input type="number" min="0" max="10" value="4" class="text-input" id="planner-assignments-input">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Upcoming Hackathons</label>
                                <input type="number" min="0" max="4" value="1" class="text-input" id="planner-hackathons-input">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Available Study Hours/Wk</label>
                                <input type="number" min="1" max="60" value="20" class="text-input" id="planner-hours-input">
                            </div>
                            <button class="action-btn" id="planner-generate-btn" style="width: 100%; margin-top: 0.5rem;">Generate Adaptive Schedule</button>
                        </div>
                    </div>

                    <!-- Right Showcase Panel: Dynamic Schedule Grid -->
                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2" style="flex: 1.3;">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Weekly Calendar Workspace</h3>
                        
                        <!-- Empty State Placeholder -->
                        <div class="planner-empty-state" id="planner-empty" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 350px;">
                            <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;">📅</div>
                            <div class="feature-card-title" style="font-size: 1.1rem; margin-bottom: 0.5rem;">Workspace Idle</div>
                            <p class="feature-card-desc" style="max-width: 320px; text-align: center; font-size: 0.9rem; color: var(--color-text-secondary);">Adjust parameters in the left panel and click generate to map your cognitive focus schedule.</p>
                        </div>

                        <!-- Analysis Loader (Hidden by default) -->
                        <div class="planner-loader-state" id="planner-loader" style="display: none; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 350px;">
                            <div class="companion-thinking">
                                <span class="thinking-dot"></span>
                                <span class="thinking-dot"></span>
                                <span class="thinking-dot"></span>
                            </div>
                            <div class="feature-card-desc" id="planner-loader-text" style="margin-top: 1rem; text-align: center; color: var(--color-text-secondary);">Balancing deadline loads...</div>
                        </div>

                        <!-- Generated Schedule Grid (Hidden by default) -->
                        <div class="planner-schedule-grid" id="planner-schedule-grid" style="display: none;">
                            <!-- Will be populated dynamically by JS -->
                        </div>
                    </div>
                </div>
            </div>
        `,
        '/predictive-insights': `
            <div class="router-view-page feature-page" data-page="predictive-insights">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Future Forecast</span>
                        <h2 class="feature-title">Predictive Insights</h2>
                        <p class="feature-description">
                            Model future stress curves by plotting academic syllabus dates. Identify high-congestion points to formulate workload distributions ahead of exams.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.5rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 0.5rem;">Syllabus Integration</h3>
                            <p class="feature-card-desc">By analyzing standard assignment weightings, the predictive engine highlights critical stress nodes at weeks 8 and 15.</p>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Semester Stress Curve</h3>
                        
                        <div class="predictive-insights-box">
                            <!-- SVG Forecast Graph -->
                            <div class="glass-card prediction-graph-card" style="background: rgba(0,0,0,0.25);">
                                <svg viewBox="0 0 400 150" style="width:100%; height:100%; overflow:visible;">
                                    <!-- Grid levels -->
                                    <line x1="30" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.03)"></line>
                                    <line x1="30" y1="70" x2="380" y2="70" stroke="rgba(255,255,255,0.03)"></line>
                                    <line x1="30" y1="120" x2="380" y2="120" stroke="rgba(255,255,255,0.03)"></line>
                                    
                                    <!-- Labels -->
                                    <text x="25" y="23" font-size="7" fill="rgba(255,255,255,0.2)" text-anchor="end">High Risk</text>
                                    <text x="25" y="73" font-size="7" fill="rgba(255,255,255,0.2)" text-anchor="end">Moderate</text>
                                    <text x="25" y="123" font-size="7" fill="rgba(255,255,255,0.2)" text-anchor="end">Low Risk</text>

                                    <!-- Trend lines (predicted vs buffer active) -->
                                    <path d="M 30 110 L 80 100 L 130 35 L 180 90 L 230 110 L 280 40 L 330 80 L 380 95" fill="none" stroke="rgba(34, 211, 238, 0.15)" stroke-width="2" stroke-dasharray="3,3"></path>
                                    <path d="M 30 110 L 80 100 L 130 65 L 180 85 L 230 100 L 280 60 L 330 75 L 380 90" fill="none" stroke="var(--color-accent)" stroke-width="3" stroke-linecap="round"></path>
                                    
                                    <!-- Highlight critical markers -->
                                    <circle cx="130" cy="65" r="5" fill="var(--color-accent)" stroke="var(--color-bg)" stroke-width="1.5"></circle>
                                    <circle cx="280" cy="60" r="5" fill="var(--color-accent)" stroke="var(--color-bg)" stroke-width="1.5"></circle>

                                    <!-- Label lines -->
                                    <text x="130" y="52" font-size="6.5" fill="var(--color-text-primary)" text-anchor="middle" font-weight="600">Midterm Curve</text>
                                    <text x="280" y="47" font-size="6.5" fill="var(--color-text-primary)" text-anchor="middle" font-weight="600">Finals Prep</text>

                                    <!-- Semester Weeks -->
                                    <text x="30" y="140" font-size="7" fill="rgba(255,255,255,0.2)" text-anchor="middle">W1</text>
                                    <text x="130" y="140" font-size="7" fill="rgba(255,255,255,0.2)" text-anchor="middle">W8</text>
                                    <text x="280" y="140" font-size="7" fill="rgba(255,255,255,0.2)" text-anchor="middle">W15</text>
                                    <text x="380" y="140" font-size="7" fill="rgba(255,255,255,0.2)" text-anchor="middle">W18</text>
                                </svg>
                            </div>

                            <!-- Interactive timeline forecast -->
                            <div class="glass-card future-timeline-card">
                                <span class="input-label" style="display:block; font-size:0.75rem;">Interactive Milestone Forecasts</span>
                                <div class="horizontal-timeline-track">
                                    <div class="timeline-node active" data-node="1" data-title="Week 4 Project Release" data-risk="low" data-desc="Initial project outline distribution. High focus alignment will prevent later backlog pileup. Load is completely manageable.">
                                        <span class="node-label">Wk 4</span>
                                    </div>
                                    <div class="timeline-node critical" data-node="2" data-title="Week 8 Midterms" data-risk="high" data-desc="Heavy cumulative exam schedule. Stress spikes predicted to hit 78%. We suggest booking buffer slots and setting sleep guidelines in week 7.">
                                        <span class="node-label">Wk 8</span>
                                    </div>
                                    <div class="timeline-node" data-node="3" data-title="Week 12 Project Submissions" data-risk="med" data-desc="Lab reports and team coding drafts merge. Stress score registers at 52%. Focus slots will resolve workload distribution easily.">
                                        <span class="node-label">Wk 12</span>
                                    </div>
                                    <div class="timeline-node critical" data-node="4" data-title="Week 15 Finals Cycle" data-risk="high" data-desc="Final exam periods. Cognitive strain reaches maximum. Enforce 30% work reductions, prioritize sleep buffers, and leverage adaptive study timelines.">
                                        <span class="node-label">Wk 15</span>
                                    </div>
                                </div>

                                <!-- Tooltip Card -->
                                <div class="node-tooltip-card show" id="timeline-tooltip">
                                    <div class="tooltip-header">
                                        <span class="tooltip-title" id="tooltip-title">Week 4 Project Release</span>
                                        <span class="tooltip-risk risk-low" id="tooltip-risk">Low Risk</span>
                                    </div>
                                    <p class="tooltip-desc" id="tooltip-desc">Initial project outline distribution. High focus alignment will prevent later backlog pileup. Load is completely manageable.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    // Helper to get active route identifier
    function getActiveRoute() {
        if (isFileProtocol) {
            // Under file://, routes map as hash path e.g. file:///path/index.html#/ai-companion
            const hash = window.location.hash;
            if (!hash) return '/';
            // Translate '#/ai-companion' to '/ai-companion'
            return hash.substring(1) || '/';
        } else {
            return window.location.pathname || '/';
        }
    }

    // Navigates to a specific route
    function navigateTo(path) {
        if (isFileProtocol) {
            window.location.hash = path;
        } else {
            window.history.pushState(null, null, path);
            handleRouteTransition(path);
        }
    }

    // Handles the staggered transition between routes
    function handleRouteTransition(path) {
        // Resolve pathnames to template keys
        let resolvedPath = path;
        if (resolvedPath.endsWith('index.html')) resolvedPath = '/';
        if (!templates[resolvedPath]) resolvedPath = '/'; // Fallback to home

        const app = document.getElementById('app');
        const activePage = app.querySelector('.router-view-page');

        if (activePage) {
            activePage.classList.add('page-exit');
            setTimeout(() => {
                mountView(resolvedPath);
            }, 300); // Wait for transition out (approx --transition-normal)
        } else {
            mountView(resolvedPath);
        }
    }

    // Mounts the HTML template, updates breadcrumbs, body tags, and calls initializers
    function mountView(path) {
        const app = document.getElementById('app');
        
        // 1. Swap Inner HTML content
        app.innerHTML = templates[path];

        // 2. Set theme tags based on path to update colors
        const themeName = path === '/' ? 'home' : path.substring(1);
        document.body.setAttribute('data-theme', themeName);

        // 3. Update Breadcrumbs in header navigation
        const breadcrumbsContainer = document.getElementById('nav-breadcrumbs');
        if (path === '/') {
            breadcrumbsContainer.innerHTML = `<a href="/" class="breadcrumb-link" id="breadcrumb-home">MindMap AI</a>`;
        } else {
            // Map path names to clean readable title
            const routeTitles = {
                '/burnout-detection': 'Burnout Detection',
                '/study-planner': 'Smart Study Planner',
                '/mood-analytics': 'Mood Analytics',
                '/focus-tracking': 'Focus Tracking',
                '/ai-companion': 'AI Companion',
                '/predictive-insights': 'Predictive Insights'
            };
            const currentTitle = routeTitles[path] || 'Feature';
            breadcrumbsContainer.innerHTML = `
                <a href="/" class="breadcrumb-link">MindMap AI</a>
                <span class="breadcrumb-separator">&gt;</span>
                <span class="breadcrumb-link" style="color:var(--color-text-secondary); cursor:default; pointer-events:none;">Features</span>
                <span class="breadcrumb-separator">&gt;</span>
                <span class="breadcrumb-active">${currentTitle}</span>
            `;
        }

        // 4. Reset window scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // 5. Initialize active page interactive scripts
        initializePageScripts(path);
    }

    // Hooks specific JS behaviors for the loaded view
    function initializePageScripts(path) {
        // Re-bind listeners on navigation elements inside newly mounted templates
        bindRouteListeners();

        // Canvas / background controls
        if (window.MindMapEffects) {
            window.MindMapEffects.changeTheme(path);
        }

        // Call individual javascript behaviors
        if (path === '/') {
            if (window.MindMapLanding) {
                window.MindMapLanding.init();
            }
        } else {
            if (window.MindMapFeatures) {
                window.MindMapFeatures.init(path);
            }
        }
    }

    // Intercept clicks on links that have data-route or matching attributes
    function bindRouteListeners() {
        document.querySelectorAll('[data-route], a').forEach(el => {
            // Prevent multiple click listeners
            if (el.dataset.listenerBound) return;
            
            const route = el.getAttribute('data-route') || el.getAttribute('href');
            
            // Check if link targets local routes
            if (route && (route.startsWith('/') || route.startsWith('#/'))) {
                el.addEventListener('click', e => {
                    e.preventDefault();
                    
                    // Normalize target route format
                    let targetRoute = route;
                    if (targetRoute.startsWith('#/')) targetRoute = targetRoute.substring(1);
                    
                    navigateTo(targetRoute);
                });
                el.dataset.listenerBound = 'true';
            }
        });

        // Special: Explore Features link scroll on Home screen
        const exploreBtn = document.getElementById('explore-features-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', e => {
                e.preventDefault();
                const featuresSection = document.getElementById('features-preview');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Listen for browser navigation changes (Back/Forward buttons)
    window.addEventListener('popstate', () => {
        handleRouteTransition(getActiveRoute());
    });

    // Handle hash updates under file:// protocol
    window.addEventListener('hashchange', () => {
        if (isFileProtocol) {
            handleRouteTransition(getActiveRoute());
        }
    });

    // Expose routing capabilities on global namespace
    window.MindMapRouter = {
        navigate: navigateTo,
        getRoute: getActiveRoute,
        init: function () {
            // First load routing execution
            const initialRoute = getActiveRoute();
            
            // For file:// fallback initialization
            if (isFileProtocol && !window.location.hash) {
                window.location.hash = '#/';
            }
            
            handleRouteTransition(initialRoute);
        }
    };

    // Trigger router initialization once DOM is parsed
    document.addEventListener('DOMContentLoaded', () => {
        window.MindMapRouter.init();
    });

})();
