(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))T(h);new MutationObserver(h=>{for(const C of h)if(C.type==="childList")for(const W of C.addedNodes)W.tagName==="LINK"&&W.rel==="modulepreload"&&T(W)}).observe(document,{childList:!0,subtree:!0});function P(h){const C={};return h.integrity&&(C.integrity=h.integrity),h.referrerPolicy&&(C.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?C.credentials="include":h.crossOrigin==="anonymous"?C.credentials="omit":C.credentials="same-origin",C}function T(h){if(h.ep)return;h.ep=!0;const C=P(h);fetch(h.href,C)}})();(function(){const I=document.getElementById("particles-canvas");if(!I)return;const o=I.getContext("2d");let P=I.width=window.innerWidth,T=I.height=window.innerHeight;const h=[],C=[],W=60,V=6,w={home:{primary:"rgba(115, 140, 255, 0.03)",alt:"rgba(115, 140, 255, 0.02)",spark:"#738cff"},"ai-companion":{primary:"rgba(79, 70, 229, 0.12)",alt:"rgba(139, 92, 246, 0.12)",spark:"#4f46e5"},"focus-tracking":{primary:"rgba(107, 114, 128, 0.12)",alt:"rgba(180, 176, 167, 0.12)",spark:"#6b7280"},"mood-analytics":{primary:"rgba(168, 85, 247, 0.12)",alt:"rgba(236, 72, 153, 0.12)",spark:"#a855f7"},"burnout-detection":{primary:"rgba(99, 102, 241, 0.12)",alt:"rgba(6, 182, 212, 0.12)",spark:"#6366f1"},"study-planner":{primary:"rgba(2, 132, 199, 0.12)",alt:"rgba(16, 185, 129, 0.12)",spark:"#0284c7"},"predictive-insights":{primary:"rgba(8, 145, 178, 0.12)",alt:"rgba(5, 150, 105, 0.12)",spark:"#0891b2"}};let d=w.home,a=1,e="home";class c{constructor(){this.reset()}reset(){this.x=Math.random()*P,this.y=Math.random()*T,this.size=Math.random()*1+.4,this.speed=Math.random()*.15+.05,this.opacity=Math.random()*.6+.15,this.fadeSpeed=Math.random()*.004+.001,this.fadeDir=Math.random()>.5?1:-1}update(){this.y-=this.speed*a;const r=e==="tired"?.7:.12,l=e==="tired"?.025:.01;this.x+=Math.sin(this.y*l)*r*a,(this.y<0||this.x<0||this.x>P)&&(this.reset(),this.y=T),this.opacity+=this.fadeSpeed*this.fadeDir,this.opacity>.8?this.fadeDir=-1:this.opacity<.1&&(this.fadeDir=1)}draw(){o.fillStyle=d.spark,o.globalAlpha=this.opacity,o.beginPath(),o.arc(this.x,this.y,this.size,0,Math.PI*2),o.fill(),e==="motivated"&&(o.strokeStyle=d.spark,o.globalAlpha=this.opacity*.45,o.lineWidth=this.size*.8,o.beginPath(),o.moveTo(this.x,this.y),o.lineTo(this.x-Math.sin(this.y*.01)*2,this.y+this.speed*8),o.stroke())}}class n{constructor(){this.x=Math.random()*P,this.y=Math.random()*T,this.radius=Math.random()*40+20,this.vx=(Math.random()-.5)*.3,this.vy=(Math.random()-.5)*.3,this.angle=Math.random()*Math.PI*2,this.rotationSpeed=(Math.random()-.5)*.003,this.opacity=Math.random()*.15+.05,this.shape=Math.random()>.5?"circle":"poly",this.sides=Math.floor(Math.random()*3)+3}update(){this.vx*=.98,this.vy*=.98,this.x+=this.vx*a,this.y+=this.vy*a,this.angle+=this.rotationSpeed*a;const r=this.radius*1.5;this.x<-r&&(this.x=P+r),this.x>P+r&&(this.x=-r),this.y<-r&&(this.y=T+r),this.y>T+r&&(this.y=-r)}draw(){o.save(),o.translate(this.x,this.y),o.rotate(this.angle);const r=o.createRadialGradient(-10,-10,0,0,0,this.radius);if(r.addColorStop(0,d.alt),r.addColorStop(.5,"rgba(255, 255, 255, 0.01)"),r.addColorStop(1,d.primary),o.fillStyle=r,o.strokeStyle="rgba(255, 255, 255, 0.05)",o.lineWidth=1,o.globalAlpha=this.opacity,o.beginPath(),this.shape==="circle")o.arc(0,0,this.radius,0,Math.PI*2);else{for(let l=0;l<this.sides;l++){const g=l*Math.PI*2/this.sides,v=Math.cos(g)*this.radius,f=Math.sin(g)*this.radius;l===0?o.moveTo(v,f):o.lineTo(v,f)}o.closePath()}o.fill(),o.stroke(),o.beginPath(),o.strokeStyle="rgba(255, 255, 255, 0.12)",this.shape==="circle"?o.arc(0,0,this.radius,Math.PI*1.25,Math.PI*1.75):(o.moveTo(Math.cos(Math.PI*1.2)*this.radius,Math.sin(Math.PI*1.2)*this.radius),o.lineTo(Math.cos(Math.PI*1.8)*this.radius,Math.sin(Math.PI*1.8)*this.radius)),o.stroke(),o.restore()}}function y(){h.length=0,C.length=0;for(let t=0;t<W;t++)h.push(new c);for(let t=0;t<V;t++)C.push(new n)}function m(){if(o.clearRect(0,0,P,T),o.globalAlpha=1,h.forEach(t=>{t.update(),t.draw()}),e==="focused"){o.strokeStyle="rgba(59, 130, 246, 0.05)",o.lineWidth=.5;for(let t=0;t<h.length;t++)for(let r=t+1;r<h.length;r++){const l=h[t].x-h[r].x,g=h[t].y-h[r].y;Math.sqrt(l*l+g*g)<100&&(o.beginPath(),o.moveTo(h[t].x,h[t].y),o.lineTo(h[r].x,h[r].y),o.stroke())}}C.forEach(t=>{t.update(),t.draw()}),requestAnimationFrame(m)}function b(t){const r=(t.clientX-window.innerWidth/2)/(window.innerWidth/2),l=(t.clientY-window.innerHeight/2)/(window.innerHeight/2);t.clientX,t.clientY;const g=document.querySelector(".bg-layer-far"),v=document.querySelector(".bg-layer-mid"),f=document.querySelector(".bg-layer-fore");g&&(g.style.transform=`translate(${r*-4}px, ${l*-4}px)`),v&&(v.style.transform=`translate(${r*-12}px, ${l*-12}px)`),f&&(f.style.transform=`translate(${r*-20}px, ${l*-20}px)`)}window.addEventListener("mousemove",b),window.addEventListener("mouseleave",()=>{[".bg-layer-far",".bg-layer-mid",".bg-layer-fore"].forEach(r=>{const l=document.querySelector(r);l&&(l.style.transform="translate(0px, 0px)")})}),window.addEventListener("resize",()=>{P=I.width=window.innerWidth,T=I.height=window.innerHeight,y()}),document.addEventListener("click",t=>{const r=t.target.closest(".action-btn, .secondary-btn, .preset-btn, .mode-select-btn, .suggested-prompt-btn, #story-trigger-btn");if(!r)return;window.getComputedStyle(r).position==="static"&&(r.style.position="relative");const l=document.createElement("span");l.className="ripple-wave";const g=r.getBoundingClientRect(),v=Math.max(g.width,g.height);l.style.width=l.style.height=`${v}px`;const f=t.clientX-g.left-v/2,i=t.clientY-g.top-v/2;l.style.left=`${f}px`,l.style.top=`${i}px`,r.appendChild(l),setTimeout(()=>{l.remove()},600)}),window.MindFlowEffects={init:function(){y(),m()},changeTheme:function(t){let r=t==="/"?"home":t.substring(1);w[r]?d=w[r]:d=w.home,a=1,e="home"},setMoodParams:function(t){d={primary:t.primary,alt:t.alt,spark:t.spark},a=t.speed,e=t.mood}},window.MindFlowEffects.init()})();(function(){let I=[],o=[];function P(){I.forEach(clearInterval),I=[],o.forEach(cancelAnimationFrame),o=[]}function T(e){const c=document.getElementById("ai-moment-overlay"),n=document.getElementById("ai-moment-status"),y=document.getElementById("step-dot-1"),m=document.getElementById("step-dot-2"),b=document.getElementById("step-dot-3"),t=document.getElementById("ai-moment-percentage"),r=document.querySelectorAll(".floating-ai-card");if(!c||!n){e();return}c.style.display="flex",c.style.opacity="1",n.textContent="Analyzing...",y.className="step-dot active",m.className="step-dot",b.className="step-dot",t&&(t.textContent="0%");let l=0;const g=setInterval(()=>{l+=Math.floor(Math.random()*4)+2,l>=100&&(l=100,clearInterval(g)),t&&(t.textContent=`${l}%`)},50);I.push(g),r.forEach((s,u)=>{const p=(Math.random()-.5)*220,L=(Math.random()-.5)*120-40,k=(Math.random()-.5)*36;s.style.transition="none",s.style.transform=`translate(${p}px, ${L}px) rotate(${k}deg) scale(0.9)`,s.style.opacity="0.85",s.style.borderColor="rgba(255, 255, 255, 0.15)"});const v=setTimeout(()=>{n.textContent="Detecting patterns...",y.className="step-dot",m.className="step-dot active",r.forEach(s=>{s.style.transition="transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s, border-color 0.7s",s.style.transform="translate(0px, -20px) scale(0.8) rotate(0deg)",s.style.opacity="0.5",s.style.borderColor="rgba(115, 140, 255, 0.4)"})},700),f=setTimeout(()=>{n.textContent="Generating recommendations...",m.className="step-dot",b.className="step-dot active",r.forEach((s,u)=>{s.style.transition="transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s, border-color 0.6s";const p=(u-1.5)*110;s.style.transform=`translate(${p}px, 60px) scale(0.95) rotate(0deg)`,s.style.opacity="1",s.style.borderColor="rgba(52, 211, 153, 0.35)"})},1400),i=setTimeout(()=>{c.style.transition="opacity 0.3s ease",c.style.opacity="0";const s=setTimeout(()=>{c.style.display="none",c.style.transition="",clearInterval(g),e()},300);I.push(s)},2300);I.push(v,f,i)}function h(e,c,n="",y=1200){if(!e)return;const m=performance.now();function b(t){const r=t-m,l=Math.min(r/y,1),g=l*(2-l),v=Math.floor(g*c);e.textContent=v+n,l<1?requestAnimationFrame(b):e.textContent=c+n}requestAnimationFrame(b)}function C(){const e=document.getElementById("chat-messages"),c=document.getElementById("chat-user-input"),n=document.getElementById("chat-send-btn"),y=document.querySelectorAll(".suggested-prompt-btn"),m=document.querySelectorAll(".quick-action-btn");if(!e||!c||!n)return;function b(i,s,u=!1){const p=document.createElement("div");p.className=`chat-message ${u?"assistant":"user"}`,p.innerHTML=`
                <div class="message-sender" style="color: ${u?"var(--color-accent)":"var(--color-accent-alt)"}; font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem; margin-top:0.6rem;">${i}</div>
                <div class="message-text" style="font-size:0.9rem; line-height:1.4;">${s}</div>
            `,e.appendChild(p),e.scrollTop=e.scrollHeight}function t(i,s){const u=document.createElement("div");u.className="chat-message assistant",u.innerHTML=`
                <div class="message-sender" style="color: var(--color-accent); font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem; margin-top:0.6rem;">${i}</div>
                <div class="message-text" style="font-size:0.9rem; line-height:1.4;"></div>
            `,e.appendChild(u),e.scrollTop=e.scrollHeight;const p=u.querySelector(".message-text"),L=s.match(/<[^>]+>|[^<>\s]+|\s+/g)||[s];let k=0;function x(){if(k<L.length){p.innerHTML+=L[k],k++,e.scrollTop=e.scrollHeight;const A=L[k-1].startsWith("<")?0:Math.random()*25+15,S=setTimeout(x,A);I.push(S)}}x()}function r(){const i=document.createElement("div");i.className="chat-message assistant typing-indicator-msg",i.id="chat-typing-indicator",i.innerHTML=`
                <div class="message-sender" style="color: var(--color-accent); font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem; margin-top:0.6rem;">MindFlow AI</div>
                <div class="companion-thinking" style="justify-content: flex-start; padding: 0.2rem 0;">
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                </div>
            `,e.appendChild(i),e.scrollTop=e.scrollHeight}function l(){const i=document.getElementById("chat-typing-indicator");i&&i.remove()}function g(i){r();const s=i.toLowerCase();let u="";s.includes("schedule")||s.includes("organize")||s.includes("study plan")||s.includes("create a study plan")?u="I've structured a balanced study plan for tomorrow:<br><br>• <b>09:00 AM - 10:30 AM:</b> Cognitive peak slot (Calculus quiz preparation)<br>• <b>10:30 AM - 10:45 AM:</b> Screen-free hydration break<br>• <b>11:00 AM - 12:30 PM:</b> Reading / Lab report drafting<br>• <b>03:00 PM - 04:30 PM:</b> Revision sprint (Machine Learning lecture)<br><br><em>AI Recommendation: Protect your evening after 9:30 PM. Avoid screens to restore sleep cycles.</em>":s.includes("stress")||s.includes("reduce")||s.includes("anxious")||s.includes("burnout")?u="I detect elevated stress load. Let's trigger a physical reset:<br><br>1. <b>Laptop Off:</b> Close your screens for the next 15 minutes.<br>2. <b>Guided Breathing:</b> Inhale 4s, hold 4s, exhale 6s. Repeat 5 times.<br>3. <b>Workload Reduction:</b> Pinpoint your single most urgent milestone. Defer secondary tasks. I will buffer your calendar slots.<br><br><em>AI Recommendation: Reduce workload by 15%. Take a recovery break.</em>":s.includes("prioritize")||s.includes("tasks")?u="Prioritization complete. Tasks are sorted by cognitive demand and deadlines:<br><br>• <b>High Priority (Critical):</b> Calculus prep & Chemistry draft (Schedule for morning peak hours).<br>• <b>Medium Priority (Moderate):</b> Machine Learning study sprint (Schedule for mid-afternoon).<br>• <b>Low Priority (Buffer):</b> Course registrations & general readings (Schedule for late afternoon or block to buffer days).":s.includes("optimize")?u="Study routine optimized for neuro-efficiency:<br><br>• <b>Spaced Sprints:</b> Block 45m deep focus slots followed by 10m active stretches.<br>• <b>Subject Mixing:</b> Study different subjects between blocks to avoid cognitive saturation.<br>• <b>Active Recall:</b> Spend the final 15 minutes of each block testing yourself without looking at notes.":u="I've analyzed your parameters. Based on your metrics, your current focus quotient is solid. To sustain this, study in high-focus 25m sprints with 5m breaks. Ensure sleep debt stays below 2 hours.";const p=setTimeout(()=>{l(),t("MindFlow AI",u)},1100);I.push(p)}function v(){const i=c.value.trim();i&&(b("You",i,!1),c.value="",g(i))}n.addEventListener("click",v),c.addEventListener("keypress",i=>{i.key==="Enter"&&v()});function f(i){c.value="",c.focus();let s=0;function u(){if(s<i.length){c.value+=i[s],s++;const p=setTimeout(u,Math.random()*15+10);I.push(p)}else{const p=setTimeout(()=>{v()},150);I.push(p)}}u()}y.forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-prompt");f(s)})}),m.forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-action");let u=s;s==="Create Study Plan"?u="Help me create a study plan":s==="Reduce Stress"?u="I need to reduce my stress levels":s==="Prioritize Tasks"?u="Help me prioritize my tasks":s==="Optimize Schedule"&&(u="How do I optimize my study schedule?"),f(u)})})}function W(){const e=document.getElementById("timer-display"),c=document.getElementById("timer-status"),n=document.getElementById("timer-progress"),y=document.getElementById("timer-start-btn"),m=document.getElementById("timer-pause-btn"),b=document.getElementById("timer-reset-btn"),t=document.getElementById("timer-end-btn"),r=document.getElementById("focus-message"),l=document.querySelectorAll(".mode-select-btn"),g=document.getElementById("apply-custom-timer");if(!e||!n)return;let v=1500,f=v,i=null;const s=628;function u(B){const A=s-B*s;n.style.strokeDashoffset=A}function p(){const B=Math.floor(f/3600),A=Math.floor(f%3600/60),S=f%60;let M="";B>0?M=`${B.toString().padStart(2,"0")}:${A.toString().padStart(2,"0")}:${S.toString().padStart(2,"0")}`:M=`${A.toString().padStart(2,"0")}:${S.toString().padStart(2,"0")}`,e.textContent=M;const F=f/v;u(F)}function L(){i||(y.style.display="none",m.style.display="block",t.style.display="block",c.textContent="Flow Active",r.textContent="Deep focus state active. Keep device alerts muted.",i=setInterval(()=>{f--,p(),f<=0&&(clearInterval(i),i=null,c.textContent="Flow Complete",r.textContent="Session completed successfully. Take a physical stretch break!",y.style.display="block",m.style.display="none",t.style.display="none",u(0))},1e3),I.push(i))}function k(){i&&(clearInterval(i),i=null,y.style.display="block",m.style.display="none",c.textContent="Flow Paused",r.textContent="Timer paused. Click start when ready to resume focus.")}function x(){k(),f=v,p(),c.textContent="Flow Ready",r.textContent="Choose your focus interval and start your sprint.",t.style.display="none",u(1)}l.forEach(B=>{B.addEventListener("click",()=>{l.forEach(A=>A.classList.remove("active")),B.classList.add("active"),v=parseInt(B.getAttribute("data-time")),x()})}),g&&g.addEventListener("click",()=>{l.forEach(S=>S.classList.remove("active"));const B=parseInt(document.getElementById("custom-hours").value)||0,A=parseInt(document.getElementById("custom-minutes").value)||0;B===0&&A===0||(v=B*3600+A*60,x())}),y.addEventListener("click",L),m.addEventListener("click",k),b.addEventListener("click",x),t.addEventListener("click",()=>{x(),r.textContent="Session ended. Work progress recorded."}),p(),u(1)}function V(){const e=document.getElementById("analyze-mood-btn"),c=document.getElementById("mood-select"),n=document.getElementById("energy-slider-input"),y=document.getElementById("energy-val-display"),m=document.getElementById("focus-slider-input"),b=document.getElementById("focus-val-display"),t=document.getElementById("active-mood-display"),r=document.querySelector(".wave-p1"),l=document.querySelector(".wave-p2"),g=document.getElementById("mood-wave-card"),v=document.getElementById("large-ring-fill"),f=document.getElementById("large-ring-pct");if(!e||!n)return;n.addEventListener("input",()=>{y.textContent=n.value}),m.addEventListener("input",()=>{b.textContent=m.value});let i=12,s=.02,u=0,p=.03;const L={calm:{gradient:"linear-gradient(180deg, rgba(82, 140, 111, 0.08) 0%, var(--color-bg) 85%)",color:"#528c6f",colorAlt:"#34d399",amp:12,freq:.02,spd:.03},focused:{gradient:"linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, var(--color-bg) 85%)",color:"#38bdf8",colorAlt:"#60a5fa",amp:18,freq:.03,spd:.05},fatigued:{gradient:"linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, var(--color-bg) 85%)",color:"#f59e0b",colorAlt:"#d97706",amp:6,freq:.01,spd:.015},overloaded:{gradient:"linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--color-bg) 85%)",color:"#ef4444",colorAlt:"#ec4899",amp:28,freq:.05,spd:.08},deepflow:{gradient:"linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, var(--color-bg) 85%)",color:"#a855f7",colorAlt:"#c084fc",amp:22,freq:.015,spd:.04}};function k(S,M,F){const z=L[S];if(z){if(i=z.amp,s=z.freq,p=z.spd,t.textContent=M,v){const q=264-264*(F/100);v.style.strokeDashoffset=q,v.style.transition="stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)"}f&&(f.textContent=F+"%"),g&&(g.style.background=z.gradient,g.style.setProperty("--color-accent",z.color),g.style.setProperty("--color-accent-alt",z.colorAlt),v&&(v.style.stroke=z.color))}}function x(){if(!r||!l)return;u+=p;const S=40,M=400/S;let F="M 0 90",z="M 0 90";for(let $=0;$<=S;$++){const R=$*M,E=90+Math.sin(R*s+u)*i,H=90+Math.sin(R*(s*1.2)-u)*(i*.8);F+=` L ${R} ${E}`,z+=` L ${R} ${H}`}F+=" L 400 180 L 0 180 Z",z+=" L 400 180 L 0 180 Z",r.setAttribute("d",F),l.setAttribute("d",z);const q=requestAnimationFrame(x);o.push(q)}e.addEventListener("click",()=>{const S=c.value,M=parseInt(n.value),F=parseInt(m.value),z=c.options[c.selectedIndex].text.split(" ").slice(1).join(" ");T(()=>{k(S,z,M);const q=document.getElementById("mood-trend-path");if(q){const E="M 20 80 L 70 50 L 120 40 L 170 85 L 220 90 L 270 30",H=120-Math.round(F*.9);q.setAttribute("d",`${E} L 320 ${H}`)}const $=document.querySelectorAll(".mood-chart-dot")[6];$&&$.setAttribute("data-info",`Today: ${z} (Energy: ${M}%, Focus: ${F}%)`);const R=document.getElementById("mood-insight-text");R&&(F<40?R.innerHTML=`<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${M}% • Severe focus drop after study sprints. <em>Recommendation: Add short breaks between sessions.</em>`:M>80&&F>70?R.innerHTML=`<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${M}% • High cognitive reserve and focus peaks. <em>Recommendation: Schedule deep study blocks of 45-60m.</em>`:R.innerHTML=`<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${M}% • Workload stress is moderate. <em>Recommendation: Add short breaks between sessions.</em>`)})});const B=document.querySelectorAll(".mood-chart-dot"),A=document.getElementById("chart-tooltip");B.length&&A&&B.forEach(S=>{S.addEventListener("mouseenter",()=>{A.textContent=S.getAttribute("data-info"),A.style.color="var(--color-text-primary)"}),S.addEventListener("mouseleave",()=>{A.textContent="Hover over data points to inspect mood history",A.style.color=""})}),k("calm","Calm",75),x()}function w(){const e=document.getElementById("sleep-input-burn"),c=document.getElementById("sleep-val-burn"),n=document.getElementById("stress-input-burn"),y=document.getElementById("stress-val-burn"),m=document.getElementById("deadlines-input-burn"),b=document.getElementById("deadlines-val-burn"),t=document.getElementById("study-input-burn"),r=document.getElementById("study-val-burn"),l=document.getElementById("analyze-burnout-btn"),g=document.getElementById("burnout-score-badge"),v=document.getElementById("burnout-risk-level"),f=document.getElementById("burnout-energy-val"),i=document.getElementById("burnout-energy-bar"),s=document.getElementById("burnout-contributors-list"),u=document.getElementById("burnout-recommendations-list"),p=document.getElementById("burnout-ring-fill"),L=document.getElementById("burnout-results-card"),k=document.getElementById("brain-canvas");if(!e||!k||!l)return;e.addEventListener("input",()=>{c.textContent=e.value}),n.addEventListener("input",()=>{y.textContent=n.value}),m.addEventListener("input",()=>{b.textContent=m.value}),t.addEventListener("input",()=>{r.textContent=t.value});const x=k.getContext("2d"),B=k.width=260,A=k.height=220,S=[{x:70,y:110,pulseOffset:0},{x:90,y:70,pulseOffset:.5},{x:130,y:55,pulseOffset:1.2},{x:180,y:75,pulseOffset:.8},{x:200,y:110,pulseOffset:2.1},{x:170,y:140,pulseOffset:1.5},{x:130,y:170,pulseOffset:.3},{x:100,y:140,pulseOffset:1.9},{x:120,y:100,pulseOffset:.9},{x:150,y:110,pulseOffset:1.4},{x:140,y:80,pulseOffset:2.4},{x:110,y:75,pulseOffset:1.7}];let M=42,F=1;function z(){x.clearRect(0,0,B,A);const $=performance.now()*.001*F;x.strokeStyle=M>70?"rgba(239, 68, 68, 0.15)":"rgba(var(--color-accent-rgb), 0.12)",x.lineWidth=1.2;for(let E=0;E<S.length;E++)for(let H=E+1;H<S.length;H++){const O=S[E].x-S[H].x,D=S[E].y-S[H].y;Math.sqrt(O*O+D*D)<80&&(x.beginPath(),x.moveTo(S[E].x,S[E].y),x.lineTo(S[H].x,S[H].y),x.stroke())}S.forEach(E=>{const O=3+Math.abs(Math.sin($+E.pulseOffset))*7,D=x.createRadialGradient(E.x,E.y,0,E.x,E.y,O);M>70?(D.addColorStop(0,"rgba(239, 68, 68, 0.8)"),D.addColorStop(1,"rgba(239, 68, 68, 0)")):M>40?(D.addColorStop(0,"rgba(245, 158, 11, 0.7)"),D.addColorStop(1,"rgba(245, 158, 11, 0)")):(D.addColorStop(0,"rgba(var(--color-accent-rgb), 0.7)"),D.addColorStop(1,"rgba(var(--color-accent-rgb), 0)")),x.fillStyle=D,x.beginPath(),x.arc(E.x,E.y,O,0,Math.PI*2),x.fill(),x.fillStyle=M>70?"#ef4444":M>40?"#f59e0b":"var(--color-text-primary)",x.beginPath(),x.arc(E.x,E.y,2.5,0,Math.PI*2),x.fill()});const R=requestAnimationFrame(z);o.push(R)}function q($,R,E,H,O){if(M=$,p){const j=264-264*(M/100);p.style.strokeDashoffset=j}h(g,M,"%");const D=Math.max(100-M,8);f&&h(f,D,"%"),i&&(i.style.width=`${D}%`,i.className="progress-bar-fill"),M>70?(i&&i.classList.add("critical"),v.textContent="Critical Burnout Risk",v.style.color="#ef4444",p&&(p.style.stroke="#ef4444"),F=3.5):M>40?(i&&i.classList.add("warning"),v.textContent="Elevated Fatigue Alert",v.style.color="#f59e0b",p&&(p.style.stroke="#f59e0b"),F=1.8):(i&&i.classList.add("normal"),v.textContent="Optimal Flow Stable",v.style.color="var(--color-accent)",p&&(p.style.stroke="var(--color-accent)"),F=.8);let N=[];R<7&&N.push("• Sleep deficit"),H>3&&N.push("• Assignment overload"),E>6&&N.push("• High stress"),O>8&&N.push("• Study duration peaks"),N.length===0&&N.push("• Load metrics balanced"),s.innerHTML=N.map(j=>`<li>${j}</li>`).join("");let G=[];M>60?(G.push("• Reduce workload by 15%"),G.push("• Take a recovery break"),G.push("• Prioritize important tasks")):M>35?(G.push("• Buffer task schedules"),G.push("• Ensure regular rest blocks"),G.push("• Use Pomodoro focus mode")):(G.push("• Maintain present pacing"),G.push("• Standardize sleep schedules")),u.innerHTML=G.map(j=>`<li>${j}</li>`).join(""),L&&L.classList.add("show")}l.addEventListener("click",()=>{const $=parseFloat(e.value),R=parseInt(n.value),E=parseInt(m.value),H=parseFloat(t.value),O=Math.round(R*6.5+E*5.5+H*2-$*5.5+30),D=Math.max(5,Math.min(95,O));T(()=>{q(D,$,R,E,H)})}),q(42,7.5,5,3,6),z()}function d(){const e=document.getElementById("planner-generate-btn"),c=document.getElementById("planner-tasks-input"),n=document.getElementById("planner-deadline-input"),y=document.getElementById("planner-priority-input"),m=document.getElementById("planner-days-val"),b=document.getElementById("planner-schedule-grid"),t=document.getElementById("planner-breakdown-text");if(!e||!b)return;n.addEventListener("input",()=>{m.textContent=n.value});function r(l,g,v){b.innerHTML="",["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].forEach((s,u)=>{const p=document.createElement("div");p.className="planner-day-col",p.style.opacity="1",p.style.transform="none";let L="",k=0;if(u<l){const A=v[u%v.length];k=g==="high"?4:g==="med"?2.5:1.5,L=`
                        <div class="planner-task-card priority-${g}" style="transform:none; opacity:1;">
                            <div class="task-card-time">09:00 AM</div>
                            <div class="task-card-name">${A}</div>
                            <div class="task-card-type">${g==="high"?"Deep Focus":"Study Sprint"}</div>
                        </div>
                    `}else L='<div class="planner-day-empty-text">Rest & Recovery Slot</div>';let x="status-optimal",B="Optimal";k>3?(x="status-congested",B="High Load"):k>0&&(x="status-moderate",B="Moderate"),p.innerHTML=`
                    <div class="planner-day-header">
                        <span class="day-name">${s}</span>
                        <span class="day-badge ${x}">${k}h (${B})</span>
                        <div class="indicator-ring-mini" style="width:10px; height:10px; border-radius:50%; background: ${k>3?"#ef4444":k>0?"#f59e0b":"#528c6f"}; margin-top:2px;"></div>
                    </div>
                    <div class="planner-day-tasks">
                        ${L}
                    </div>
                `,b.appendChild(p)});const i=l*(g==="high"?4:g==="med"?2.5:1.5);t.innerHTML=`Today's Schedule Ready. Generated a balanced study plan over <b>${l} days</b>. A total of <b>${i} study hours</b> were distributed into optimal focus sprints. Remaining buffer slots are mapped to ensure cognitive recovery.`}e.addEventListener("click",()=>{const l=c.value.trim(),g=parseInt(n.value),v=y.value;let f=l?l.split(`
`).filter(i=>i.trim()):[];f.length===0&&(f=["Calculus Homework prep","Lab Report write-up","Machine Learning lecture revision"]),T(()=>{r(g,v,f)})}),r(3,"med",["Calculus Homework prep","Lab Report write-up","Machine Learning lecture revision"])}function a(){const e=document.getElementById("forecast-btn"),c=document.getElementById("predictive-week-select"),n=document.getElementById("predictive-results-panel"),y=document.querySelectorAll(".timeline-node"),m=document.getElementById("timeline-tooltip"),b=document.getElementById("tooltip-title"),t=document.getElementById("tooltip-risk"),r=document.getElementById("tooltip-desc"),l=document.getElementById("predictive-risk-level"),g=document.getElementById("predictive-peak-days"),v=document.getElementById("predictive-recs");if(!e||!n)return;const f={1:{risk:"Low",peak:"None",recs:"Maintain present pacing. Sleep indices look stable.",nodeIdx:0},4:{risk:"Low",peak:"Wednesday",recs:"Early project releases. Focus slots will preserve cognitive load.",nodeIdx:0},8:{risk:"High",peak:"Tuesday, Thursday",recs:"Shift non-urgent tasks. Defer secondary milestones.",nodeIdx:1},12:{risk:"Medium",peak:"Monday, Friday",recs:"Buffer tasks list. Block 15m screen recovery slots.",nodeIdx:2},15:{risk:"High",peak:"Tuesday, Thursday",recs:"Finals cycle. Prioritize sleep recovery buffers.",nodeIdx:3},18:{risk:"Low",peak:"None",recs:"Semester evaluation stable. Recover rest hours.",nodeIdx:3}};function i(s){const u=f[s];if(!u)return;l.textContent=u.risk,l.style.color=u.risk==="High"?"#ef4444":u.risk==="Medium"?"#f59e0b":"var(--color-accent)",g.textContent=u.peak,v.innerHTML=`AI Recommendation: <em>${u.recs}</em>`,y.forEach(L=>L.classList.remove("active"));const p=y[u.nodeIdx];if(p){p.classList.add("active");const L=p.getAttribute("data-title"),k=p.getAttribute("data-risk"),x=p.getAttribute("data-desc");b.textContent=L,r.textContent=x,t.textContent=`${k.toUpperCase()} RISK`,t.className="tooltip-risk",k==="low"?t.classList.add("risk-low"):k==="med"?t.classList.add("risk-med"):t.classList.add("risk-high")}}e.addEventListener("click",()=>{const s=c.value;T(()=>{i(s)})}),y.forEach(s=>{s.addEventListener("click",()=>{y.forEach(x=>x.classList.remove("active")),s.classList.add("active");const u=s.getAttribute("data-title"),p=s.getAttribute("data-risk"),L=s.getAttribute("data-desc");m.classList.remove("show");const k=setTimeout(()=>{b.textContent=u,r.textContent=L,t.textContent=`${p.toUpperCase()} RISK`,t.className="tooltip-risk",p==="low"?t.classList.add("risk-low"):p==="med"?t.classList.add("risk-med"):t.classList.add("risk-high"),m.classList.add("show")},200);I.push(k)})}),i("1")}window.MindFlowFeatures={init:function(e){P(),e==="/ai-companion"?C():e==="/focus-tracking"?W():e==="/mood-analytics"?V():e==="/burnout-detection"?w():e==="/study-planner"?d():e==="/predictive-insights"&&a()}}})();(function(){function I(){document.querySelectorAll(".feature-card").forEach(a=>{a.addEventListener("mousemove",e=>{const c=a.getBoundingClientRect(),n=e.clientX-c.left,y=e.clientY-c.top;a.style.setProperty("--mouse-x",`${n}px`),a.style.setProperty("--mouse-y",`${y}px`);const m=c.width/2,b=c.height/2,t=-((y-b)/b)*8,r=(n-m)/m*8;a.style.transition="transform 0.1s ease, border-color 0.3s, box-shadow 0.3s",a.style.transform=`rotateX(${t}deg) rotateY(${r}deg) translateY(-10px) scale(1.02)`,a.style.boxShadow="0 20px 40px rgba(0, 0, 0, 0.45), 0 0 30px rgba(var(--color-accent-rgb), 0.25)",a.style.borderColor="rgba(255, 255, 255, 0.3)"}),a.addEventListener("mouseleave",()=>{a.style.transition="transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, box-shadow 0.3s",a.style.transform="rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",a.style.boxShadow="",a.style.borderColor=""})})}let o=null;function P(){const d=document.querySelector(".side-card-num"),a=document.querySelectorAll(".side-card-num")[1];if(!d||!a)return;let e=34,c=82;o&&clearInterval(o),o=setInterval(()=>{const n=Math.floor(Math.random()*5)-2,y=Math.floor(Math.random()*3)-1;let m=e+n,b=c+y;m<25&&(m=25),m>45&&(m=45),b<75&&(b=75),b>90&&(b=90),d.textContent=`${m}%`,a.textContent=`${b}`},4e3)}function T(){const d=document.getElementById("story-trigger-btn"),a=document.getElementById("story-box");if(!d||!a)return;let e=!0;d.addEventListener("click",()=>{e?(d.disabled=!0,d.textContent="Analyzing Workload...",a.classList.remove("state-chaos","state-clear"),a.classList.add("state-analyzing"),setTimeout(()=>{a.classList.remove("state-analyzing"),a.classList.add("state-clear"),d.textContent="Reset Workload",d.disabled=!1,e=!1},1500)):(a.classList.remove("state-clear","state-analyzing"),a.classList.add("state-chaos"),d.textContent="Reorganize Workload",e=!0)})}function h(){const d=document.getElementById("hero-interactive-scene"),a=document.getElementById("hero-ai-orb");!d||!a||(d.addEventListener("mousemove",e=>{const c=d.getBoundingClientRect(),n=e.clientX-c.left,y=e.clientY-c.top,m=c.width/2,b=c.height/2,t=(n-m)/m,r=(y-b)/b;a.style.transform=`translate(${t*25}px, ${r*25}px) scale(1.05)`,a.style.boxShadow="0 20px 50px rgba(115, 140, 255, 0.35), 0 0 40px rgba(115, 140, 255, 0.2)"}),d.addEventListener("mouseleave",()=>{a.style.transform="translate(0px, 0px) scale(1)",a.style.boxShadow=""}))}let C=null,W=null;function V(d,a,e=20,c){d.innerHTML="";let n=0;function y(){if(n<a.length){if(a.substr(n,4)==="<br>")d.innerHTML+="<br>",n+=4;else if(a.charAt(n)==="<"){const m=a.indexOf(">",n);m!==-1?(d.innerHTML+=a.substring(n,m+1),n=m+1):(d.innerHTML+=a.charAt(n),n++)}else d.innerHTML+=a.charAt(n),n++;C=setTimeout(y,e)}else c&&c()}y()}function w(){const d=document.querySelectorAll(".mood-card-btn"),a=document.querySelector(".hero-subtitle"),e="MindFlow AI analyzes workload, stress patterns, and productivity behavior to create smarter study experiences.",c=document.querySelector(".rec-list"),n=document.querySelector(".chart-insight-banner strong"),y=document.getElementById("hero-ai-orb"),m=document.querySelector(".hero-orb-ring-1"),b=document.querySelector(".hero-orb-ring-2"),t=document.getElementById("ai-adapting-status"),r=document.querySelectorAll(".dashboard-showcase .glass-card");if(!d.length)return;const l={focused:{accent:"#3b82f6",accentRGB:"59, 130, 246",accentAlt:"#93c5fd",accentAltRGB:"147, 197, 253",greeting:"You're in focus mode today. Let's maintain momentum.",speed:1,spark:"#3b82f6",primary:"rgba(59, 130, 246, 0.08)",alt:"rgba(147, 197, 253, 0.08)",recs:[{text:"Launch 45m deep focus sprint",badge:"Flow"},{text:"Schedule machine learning revision slot",badge:"Priority"}],insight:"High focus alignment: Cognitive reserves are optimal today. Perfect for high-intensity subjects."},calm:{accent:"#10b981",accentRGB:"16, 185, 129",accentAlt:"#a7f3d0",accentAltRGB:"167, 243, 208",greeting:"You're balanced today. Let's build consistency.",speed:.8,spark:"#10b981",primary:"rgba(16, 185, 129, 0.08)",alt:"rgba(167, 243, 208, 0.08)",recs:[{text:"Maintain steady 25m Pomodoro blocks",badge:"Flow"},{text:"Take a 10-minute hydration stretch break",badge:"Rest"}],insight:"Balanced flow: Mind is clear and heart rate is steady. Maintain spacing between sessions."},overwhelmed:{accent:"#a78bfa",accentRGB:"167, 139, 250",accentAlt:"#ddd6fe",accentAltRGB:"221, 214, 254",greeting:"Things seem heavy today. Let's organize them together.",speed:.15,spark:"#8b5cf6",primary:"rgba(139, 92, 246, 0.08)",alt:"rgba(221, 214, 254, 0.08)",recs:[{text:"Reduce workload by 15% immediately",badge:"Workload"},{text:"Run 5-cycle breathing exercises",badge:"Anxiety"}],insight:"Overload alert: Stress load is heavy. Restrict study blocks to 15m and focus on a single urgent task."},motivated:{accent:"#f97316",accentRGB:"249, 115, 22",accentAlt:"#ffedd5",accentAltRGB:"255, 237, 213",greeting:"You're ready to build today. Let's use that energy wisely.",speed:1.5,spark:"#f97316",primary:"rgba(249, 115, 22, 0.08)",alt:"rgba(255, 237, 213, 0.08)",recs:[{text:"Complete Chemistry lab report draft",badge:"Sprint"},{text:"Tackle Calculus quiz preparation",badge:"Task"}],insight:"Peak motivation: Drive is exceptionally high. Channel this into your most challenging projects."},tired:{accent:"#64748b",accentRGB:"100, 116, 139",accentAlt:"#cbd5e1",accentAltRGB:"203, 213, 225",greeting:"Energy feels lower today. Let's optimize your workload.",speed:.35,spark:"#64748b",primary:"rgba(100, 116, 139, 0.08)",alt:"rgba(203, 213, 225, 0.08)",recs:[{text:"Set sleep window target to 8.5 hours",badge:"Health"},{text:"Defer secondary deadlines to buffer days",badge:"Calendar"}],insight:"Fatigue detected: Sleep debt is high. Defer dense assignments and schedule screen-free recovery."}};d.forEach(g=>{g.addEventListener("click",()=>{const v=g.classList.contains("active");d.forEach(s=>s.classList.remove("active"));let f=null;v||(g.classList.add("active"),f=g.getAttribute("data-mood"));const i=l[f]||{accent:"#7B9985",accentRGB:"123, 153, 133",accentAlt:"#E7DCCF",accentAltRGB:"231, 220, 207",greeting:e,speed:1,spark:"#738cff",primary:"rgba(115, 140, 255, 0.03)",alt:"rgba(115, 140, 255, 0.02)",recs:[{text:"Launch 25m Pomodoro session",badge:"Flow"},{text:"Target 7.5 hrs sleep tonight",badge:"Health"}],insight:"Focus dropped 18% after sleep reduced below 6 hours on Thursday. Stress peaked due to deadline congestion."};if(t&&f){clearTimeout(W);const s=["Adapting experience...","Analyzing emotional state...","Personalizing recommendations..."];t.textContent=s[Math.floor(Math.random()*s.length)],t.classList.add("show"),W=setTimeout(()=>{t.classList.remove("show")},2e3)}a&&(clearTimeout(C),a.style.transition="opacity 0.3s ease, transform 0.3s ease",a.style.opacity="0",a.style.transform="translateY(-10px)",setTimeout(()=>{a.style.transform="translateY(10px)",V(a,i.greeting,15,()=>{a.style.transition="opacity 0.4s ease, transform 0.4s ease",a.style.opacity="1",a.style.transform="translateY(0)"})},300)),y&&(y.classList.remove("mood-focused","mood-calm","mood-overwhelmed","mood-motivated","mood-tired"),m&&m.classList.remove("mood-focused","mood-calm","mood-overwhelmed","mood-motivated","mood-tired"),b&&b.classList.remove("mood-focused","mood-calm","mood-overwhelmed","mood-motivated","mood-tired"),f&&(y.classList.add(`mood-${f}`),m&&m.classList.add(`mood-${f}`),b&&b.classList.add(`mood-${f}`))),document.documentElement.style.setProperty("--color-accent",i.accent),document.documentElement.style.setProperty("--color-accent-rgb",i.accentRGB),document.documentElement.style.setProperty("--color-accent-alt",i.accentAlt),document.documentElement.style.setProperty("--color-accent-alt-rgb",i.accentAltRGB),window.MindFlowEffects&&window.MindFlowEffects.setMoodParams&&window.MindFlowEffects.setMoodParams({mood:f||"home",primary:i.primary,alt:i.alt,spark:i.spark,speed:i.speed}),r.length&&r.forEach((s,u)=>{s.style.transition="opacity 0.3s ease, transform 0.3s ease",s.style.opacity="0",s.style.transform="translateY(12px)",setTimeout(()=>{if(u===0){const p=document.querySelector(".chart-line-stress"),L=document.querySelector(".chart-line-focus");p&&(p.style.stroke="var(--color-accent)"),L&&(L.style.stroke="var(--color-accent-alt)")}s.style.transition="opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",s.style.opacity="1",s.style.transform="translateY(0)"},250+u*80)}),c&&setTimeout(()=>{c.innerHTML=i.recs.map(s=>`
                            <div class="rec-item" style="border-left-color: var(--color-accent); transition: border-color 0.4s ease;">
                                <span>${s.text}</span>
                                <span class="rec-badge" style="background: rgba(var(--color-accent-rgb), 0.12); color: var(--color-accent); transition: background 0.4s ease, color 0.4s ease;">${s.badge}</span>
                            </div>
                        `).join("")},250),n&&setTimeout(()=>{n.innerHTML=`<strong>AI Diagnostics:</strong> ${i.insight}`},250)})})}window.MindFlowLanding={init:function(){I(),P(),T(),h(),w()},destroy:function(){o&&(clearInterval(o),o=null),clearTimeout(C),clearTimeout(W),document.documentElement.style.setProperty("--color-accent","#7B9985"),document.documentElement.style.setProperty("--color-accent-rgb","123, 153, 133"),document.documentElement.style.setProperty("--color-accent-alt","#E7DCCF"),document.documentElement.style.setProperty("--color-accent-alt-rgb","231, 220, 207");const d=document.getElementById("hero-ai-orb"),a=document.querySelector(".hero-orb-ring-1"),e=document.querySelector(".hero-orb-ring-2");d&&(d.className="hero-orb"),a&&(a.className="hero-orb-ring hero-orb-ring-1"),e&&(e.className="hero-orb-ring hero-orb-ring-2"),window.MindFlowEffects&&window.MindFlowEffects.setMoodParams&&window.MindFlowEffects.setMoodParams({mood:"home",primary:"rgba(115, 140, 255, 0.03)",alt:"rgba(115, 140, 255, 0.02)",spark:"#738cff",speed:1})}}})();(function(){const I=window.location.protocol==="file:",o={"/":`
            <div class="router-view-page landing-page">
                <!-- Section 1: Hero Section -->
                <section class="hero-section">
                    <div class="hero-gradient-overlay"></div>
                    <div class="hero-container-split">
                        <div class="hero-left">
                            <div class="hero-badge animate-fade-in stagger-1">
                                <span class="badge-dot"></span>
                                <span class="badge-text">AI-powered student companion</span>
                            </div>
                            <h1 class="hero-title animate-fade-in stagger-2">
                                Understand your workload before burnout begins
                            </h1>
                            <p class="hero-subtitle animate-fade-in stagger-3" style="margin-bottom: 2.5rem;">
                                MindFlow AI analyzes workload, stress patterns, and productivity behavior to create smarter study experiences.
                            </p>
                            <div class="hero-buttons animate-fade-in stagger-4" style="margin-bottom: 2.0rem;">
                                <a href="/ai-companion" class="action-btn" data-route="/ai-companion">Start Journey</a>
                                <a href="#features-preview" class="secondary-btn" id="explore-features-btn">Explore Features</a>
                            </div>

                            <!-- Mood Selection Container -->
                            <div class="mood-selection-container animate-fade-in stagger-4" style="margin-bottom: 2.0rem; text-align: left;">
                                <span class="input-label" style="display: block; margin-bottom: 0.5rem; font-size: 0.72rem; color: var(--color-text-secondary);">How are you feeling today?</span>
                                <div class="mood-cards-row">
                                    <button class="mood-card-btn" data-mood="focused">😊 Focused</button>
                                    <button class="mood-card-btn" data-mood="calm">😌 Calm</button>
                                    <button class="mood-card-btn" data-mood="overwhelmed">😓 Overwhelmed</button>
                                    <button class="mood-card-btn" data-mood="motivated">⚡ Motivated</button>
                                    <button class="mood-card-btn" data-mood="tired">😴 Tired</button>
                                </div>
                            </div>
                            
                            <!-- Hero Preview Cards -->
                            <div class="hero-preview-cards animate-fade-in stagger-4">
                                <div class="preview-mini-card" data-route="/burnout-detection">🧠 Burnout Detection</div>
                                <div class="preview-mini-card" data-route="/study-planner">📅 Smart Planner</div>
                                <div class="preview-mini-card" data-route="/mood-analytics">😊 Mood Analytics</div>
                                <div class="preview-mini-card" data-route="/focus-tracking">⏳ Focus Tracking</div>
                                <div class="preview-mini-card" data-route="/ai-companion">🤖 AI Companion</div>
                                <div class="preview-mini-card" data-route="/predictive-insights">🔮 Predictive Insights</div>
                            </div>
                        </div>
                        <div class="hero-right animate-fade-in stagger-2" id="hero-interactive-scene">
                            <div class="hero-orb-wrapper">
                                <div id="ai-adapting-status" class="ai-adapting-bubble" style="opacity:0; pointer-events:none;">Adapting experience...</div>
                                <div class="hero-orb-ring hero-orb-ring-1"></div>
                                <div class="hero-orb-ring hero-orb-ring-2"></div>
                                <div class="hero-orb" id="hero-ai-orb">
                                    <div class="hero-orb-inner"></div>
                                </div>
                            </div>
                            <!-- Floating Cards -->
                            <div class="floating-hero-card card-stress-risk">
                                <div class="floating-card-icon">⚡</div>
                                <div class="floating-card-info">
                                    <span class="floating-card-label">Stress Risk</span>
                                    <span class="floating-card-value">Low</span>
                                </div>
                            </div>
                            <div class="floating-hero-card card-focus-score">
                                <div class="floating-card-icon">🎯</div>
                                <div class="floating-card-info">
                                    <span class="floating-card-label">Focus Score</span>
                                    <span class="floating-card-value">85/100</span>
                                </div>
                            </div>
                            <div class="floating-hero-card card-upcoming-deadline">
                                <div class="floating-card-icon">📅</div>
                                <div class="floating-card-info">
                                    <span class="floating-card-label">Upcoming Deadline</span>
                                    <span class="floating-card-value">in 4h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 1.5: Storytelling Journey (Wow Moment) -->
                <section class="story-section">
                    <div class="story-container">
                        <div class="section-header animate-fade-in stagger-1" style="margin-bottom: 3.5rem;">
                            <span class="section-label">Workload Diagnostics</span>
                            <h2 class="section-title">Students do not manage only tasks.</h2>
                            <p class="section-desc" style="max-width: 600px; margin: 1rem auto 0 auto; color: var(--color-text-secondary); font-size: 0.95rem;">They balance an overlapping, high-pressure ecosystem of deadlines, events, and physiological strain.</p>
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
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">5 Assignments</div>
                                        <div class="story-card-desc">Calculus Quiz, Chemistry Lab Report, History Draft, Physics Sheet, Coding Project</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Structured Schedule</div>
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">Optimal Study Order</div>
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
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">2 Hackathons</div>
                                        <div class="story-card-desc">Global AI Build (48h), Web3 Synergy Sprint (36h)</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Hackathon Slots</div>
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">Balanced Milestones</div>
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
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">3 Deadlines</div>
                                        <div class="story-card-desc">Calculus, Chemistry, and Physics due within next 48 hours</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Focus Allocation</div>
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">Cognitive Sprints</div>
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
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">4 Hours of Sleep</div>
                                        <div class="story-card-desc">Sleep debt: critical (-4.5 hrs) • Cognitive function reduced</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Rest Reconciliation</div>
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">Sleep Buffer</div>
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
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">Constant Pressure</div>
                                        <div class="story-card-desc">Stress Index: 8.5/10 • Fatigue: Critical • Cognitive burnout imminent</div>
                                    </div>
                                    <div class="clear-view">
                                        <div class="story-card-badge clear-badge">Stress Intervention</div>
                                        <div class="story-card-title" style="margin-bottom: 0.5rem;">Companion Suggestions</div>
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
                            <div class="story-controls" style="margin-top: 1.5rem;">
                                <button class="action-btn" id="story-trigger-btn">Reorganize Workload</button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 2: Features Preview Grid -->
                <section class="features-section" id="features-preview">
                    <div class="section-header animate-fade-in stagger-1" style="margin-bottom: 3.5rem;">
                        <span class="section-label">Features Suite</span>
                        <h2 class="section-title">Designed for Cognitive Focus</h2>
                    </div>
                    <div class="features-grid animate-fade-in stagger-2">
                        <!-- AI Burnout Detection -->
                        <div class="magnetic-wrap" data-route="/burnout-detection">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper" style="margin-bottom: 1.75rem;">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title" style="margin-bottom: 0.75rem;">AI Burnout Detection</h3>
                                    <p class="feature-card-desc">Predict cognitive fatigue early by analyzing academic metrics, sleep cycles, and daily anxiety levels.</p>
                                </div>
                                <div class="feature-card-footer" style="margin-top: 2rem;">Analyze Risk &rarr;</div>
                            </div>
                        </div>

                        <!-- Smart Study Planner -->
                        <div class="magnetic-wrap" data-route="/study-planner">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper" style="margin-bottom: 1.75rem;">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title" style="margin-bottom: 0.75rem;">Smart Study Planner</h3>
                                    <p class="feature-card-desc">Create adaptive calendars that distribute assignments evenly to prevent deadline bottle-necks.</p>
                                </div>
                                <div class="feature-card-footer" style="margin-top: 2rem;">Plan Workspace &rarr;</div>
                            </div>
                        </div>

                        <!-- Mood Analytics -->
                        <div class="magnetic-wrap" data-route="/mood-analytics">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper" style="margin-bottom: 1.75rem;">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title" style="margin-bottom: 0.75rem;">Mood Analytics</h3>
                                    <p class="feature-card-desc">Track stress patterns and plot emotional curves alongside study performance graphs.</p>
                                </div>
                                <div class="feature-card-footer" style="margin-top: 2rem;">View Analytics &rarr;</div>
                            </div>
                        </div>

                        <!-- Focus Tracking -->
                        <div class="magnetic-wrap" data-route="/focus-tracking">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper" style="margin-bottom: 1.75rem;">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title" style="margin-bottom: 0.75rem;">Focus Tracking</h3>
                                    <p class="feature-card-desc">Activate dark-themed flow timers. Tailor intervals and monitor deep focus points over time.</p>
                                </div>
                                <div class="feature-card-footer" style="margin-top: 2rem;">Enter Flow State &rarr;</div>
                            </div>
                        </div>

                        <!-- AI Companion -->
                        <div class="magnetic-wrap" data-route="/ai-companion">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper" style="margin-bottom: 1.75rem;">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title" style="margin-bottom: 0.75rem;">AI Companion</h3>
                                    <p class="feature-card-desc">Simulate workload obstacles and generate customized recommendations in real-time.</p>
                                </div>
                                <div class="feature-card-footer" style="margin-top: 2rem;">Launch Companion &rarr;</div>
                            </div>
                        </div>

                        <!-- Predictive Insights -->
                        <div class="magnetic-wrap" data-route="/predictive-insights">
                            <div class="glass-card feature-card">
                                <div class="card-glow"></div>
                                <div class="feature-card-content">
                                    <div class="feature-icon-wrapper" style="margin-bottom: 1.75rem;">
                                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <h3 class="feature-card-title" style="margin-bottom: 0.75rem;">Predictive Insights</h3>
                                    <p class="feature-card-desc">Forecast future stress spikes, pinpoint heavy workload windows, and plan buffer days.</p>
                                </div>
                                <div class="feature-card-footer" style="margin-top: 2rem;">Check Forecast &rarr;</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 3: Quick Dashboard Preview -->
                <section class="dashboard-preview-section">
                    <div class="section-header animate-fade-in stagger-1" style="margin-bottom: 3.5rem;">
                        <span class="section-label">Realtime Diagnostics</span>
                        <h2 class="section-title">Your Workload Overview</h2>
                    </div>
                    <div class="dashboard-showcase animate-fade-in stagger-2">
                        <!-- Left Big Graph Card -->
                        <div class="glass-card dashboard-card-main">
                            <div class="chart-header" style="margin-bottom: 2rem;">
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
                            <div class="chart-svg-container" style="min-height: 220px;">
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
                            <div class="chart-insight-banner" style="margin-top: 1.5rem;">
                                <span class="insight-icon">💡</span>
                                <span class="insight-text"><strong>AI Diagnostics:</strong> Focus dropped 18% after sleep reduced below 6 hours on Thursday. Stress peaked due to deadline congestion.</span>
                            </div>
                        </div>

                        <!-- Right Stats Column -->
                        <div class="dashboard-side-grid">
                            <div class="glass-card side-card">
                                <div class="side-card-content">
                                    <span class="section-label" style="font-size:0.7rem; margin-bottom: 0;">Avg Stress Score</span>
                                    <span class="side-card-num" style="color: var(--color-accent);" id="avg-stress-counter">34%</span>
                                    <span class="side-card-sub">Optimal Range</span>
                                </div>
                                <div style="width:50px; height: 50px; border-radius:50%; border:3px solid rgba(var(--color-accent-rgb), 0.15); border-top-color: var(--color-accent); transform: rotate(45deg);"></div>
                            </div>
                            <div class="glass-card side-card">
                                <div class="side-card-content">
                                    <span class="section-label" style="font-size:0.7rem; margin-bottom: 0;">Focus Quotient</span>
                                    <span class="side-card-num" style="color: var(--color-accent-alt);" id="focus-quotient-counter">82</span>
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
                <section class="cta-section" style="margin-top: 2rem;">
                    <div class="glass-card cta-card animate-fade-in stagger-3">
                        <h2 class="cta-title" style="margin-bottom: 1.25rem;">Ready to take control of your academic life?</h2>
                        <p class="section-desc" style="max-width: 600px; margin: 0.5rem auto 2.2rem auto; color: var(--color-text-secondary); font-size: 0.95rem;">MindFlow AI helps students understand workload, improve focus, and reduce stress.</p>
                        <div class="cta-buttons" style="display:flex; gap:1.25rem; justify-content:center;">
                            <a href="/ai-companion" class="action-btn" data-route="/ai-companion">Get Started</a>
                            <a href="#features-preview" class="secondary-btn" id="explore-features-btn-footer">Explore Features</a>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="footer" style="margin-top: 4rem;">
                    <div class="footer-content">
                        <span>&copy; 2026 MindFlow AI. All rights reserved.</span>
                        <div class="footer-links">
                            <a href="#" class="footer-link">Terms</a>
                            <a href="#" class="footer-link">Privacy</a>
                            <a href="#" class="footer-link">Docs</a>
                        </div>
                    </div>
                </footer>
            </div>
        `,"/ai-companion":`
            <div class="router-view-page feature-page" data-page="ai-companion">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Personalized Guidance</span>
                        <h2 class="feature-title" style="margin-bottom: 1.5rem;">AI Companion</h2>
                        <p class="feature-description" style="margin-bottom: 2rem;">
                            Chat with your MindFlow Companion. It analyzes your stress patterns and study workload in real time to give personalized recommendations and schedules.
                        </p>
                        
                        <!-- Quick Actions Section -->
                        <div class="glass-card" style="padding: 1.75rem; border-color: rgba(var(--color-accent-rgb), 0.15); margin-bottom: 1.5rem;">
                            <h3 class="feature-card-title" style="font-size:1.05rem; margin-bottom: 0.85rem;">⚡ Quick Actions</h3>
                            <div class="quick-actions-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
                                <button class="quick-action-btn" data-action="Create Study Plan">📅 Create Study Plan</button>
                                <button class="quick-action-btn" data-action="Reduce Stress">🥵 Reduce Stress</button>
                                <button class="quick-action-btn" data-action="Prioritize Tasks">🔥 Prioritize Tasks</button>
                                <button class="quick-action-btn" data-action="Optimize Schedule">🧠 Optimize Schedule</button>
                            </div>
                        </div>

                        <div class="glass-card" style="padding: 1.75rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.05rem; margin-bottom: 0.85rem;">Suggested Prompts</h3>
                            <div class="suggested-prompts-container" style="display:flex; flex-direction:column; gap:0.5rem;">
                                <button class="suggested-prompt-btn" data-prompt="Help me organize my schedule">📅 Help me organize my schedule</button>
                                <button class="suggested-prompt-btn" data-prompt="I feel stressed">🥵 I feel stressed</button>
                                <button class="suggested-prompt-btn" data-prompt="Optimize my study routine">🧠 Optimize my study routine</button>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2" style="flex: 1.3;">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">MindFlow Chatbot</h3>
                        
                        <div class="orb-simulation-box" style="height:120px; margin-bottom:0.5rem;">
                            <div class="orb-glow-ring" style="width:110px; height:110px;"></div>
                            <div class="companion-orb" style="width:80px; height:80px;"></div>
                        </div>

                        <!-- Chat Console Box -->
                        <div class="chat-container-wrapper" style="display:flex; flex-direction:column; flex:1; min-height: 300px; justify-content: space-between;">
                            <div class="chat-messages-box" id="chat-messages" style="flex:1; overflow-y:auto; padding:1.25rem; background:rgba(0,0,0,0.15); border-radius:12px; margin-bottom:1.5rem; max-height:300px;">
                                <div class="chat-message assistant">
                                    <div class="message-sender" style="color:var(--color-accent); font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem;">MindFlow AI</div>
                                    <div class="message-text" style="font-size:0.9rem; line-height:1.4;">Hello! I am your AI study advisor. I can help organize your schedule, manage stress, or optimize your study routine. Select a quick action/prompt or type below.</div>
                                </div>
                            </div>
                            
                            <div class="chat-input-area" style="display:flex; gap:0.5rem; align-items:center;">
                                <input type="text" class="text-input" id="chat-user-input" placeholder="Ask AI anything..." style="margin-top:0; padding: 0.75rem 1rem;">
                                <button class="action-btn" id="chat-send-btn" style="padding: 0.75rem 1.5rem; border-radius: 20px;">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,"/focus-tracking":`
            <div class="router-view-page feature-page" data-page="focus-tracking">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Deep Productivity</span>
                        <h2 class="feature-title" style="margin-bottom: 1.5rem;">Focus Tracking</h2>
                        <p class="feature-description" style="margin-bottom: 2rem;">
                            Sustain deep work states without mental drain. Leverage customizable timers and presets tailored for study efficiency while monitoring your flow duration.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.75rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 1rem;">Focus Mode Selection</h3>
                            <div class="focus-mode-selector" style="display:flex; flex-direction:column; gap:0.5rem;">
                                <button class="mode-select-btn active" data-mode="pomodoro" data-time="1500">🍅 Pomodoro (25m)</button>
                                <button class="mode-select-btn" data-mode="deepwork" data-time="3600">🧠 Deep Work (60m)</button>
                                <button class="mode-select-btn" data-mode="quicksession" data-time="900">⚡ Quick Session (15m)</button>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Working Flow Timer</h3>
                        
                        <div class="focus-timer-container">
                            <div class="timer-visual-box" style="margin-bottom: 1.5rem;">
                                <svg class="timer-ring-svg">
                                    <circle class="timer-ring-bg" cx="125" cy="125" r="100"></circle>
                                    <circle class="timer-ring-progress" id="timer-progress" cx="125" cy="125" r="100"></circle>
                                </svg>
                                <div class="timer-text-container">
                                    <span class="timer-numbers" id="timer-display">25:00</span>
                                    <span class="timer-subtext" id="timer-status">Flow State</span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="timer-control-buttons" style="margin-bottom: 1.5rem;">
                                <button class="action-btn" id="timer-start-btn">Start</button>
                                <button class="secondary-btn" id="timer-pause-btn" style="display:none;">Pause</button>
                                <button class="secondary-btn" id="timer-reset-btn">Reset</button>
                                <button class="secondary-btn" id="timer-end-btn" style="display:none; border-color:rgba(239,68,68,0.2); color:#ef4444;">End Session</button>
                            </div>

                            <!-- Custom Setup -->
                            <div class="custom-timer-setup" style="width: 100%;">
                                <span class="input-label" style="display:block; margin-bottom:0.75rem; text-align:center;">Custom Timer</span>
                                <div class="custom-time-inputs" style="display:flex; gap:0.5rem; align-items:center;">
                                    <input type="number" min="0" max="23" value="0" class="text-input" id="custom-hours" placeholder="Hrs" style="text-align:center; padding: 0.5rem;">
                                    <input type="number" min="0" max="59" value="25" class="text-input" id="custom-minutes" placeholder="Mins" style="text-align:center; padding: 0.5rem;">
                                    <button class="secondary-btn" id="apply-custom-timer" style="padding: 0.5rem 1rem;">Apply</button>
                                </div>
                            </div>

                            <!-- Message panel -->
                            <div class="focus-message-box" id="focus-message" style="margin-top: 1.5rem;">
                                Ready to focus? Choose a duration and launch.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,"/mood-analytics":`
            <div class="router-view-page feature-page" data-page="mood-analytics">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Emotional Awareness</span>
                        <h2 class="feature-title" style="margin-bottom: 1.5rem;">Mood Analytics</h2>
                        <p class="feature-description" style="margin-bottom: 2rem;">
                            Understand the cognitive waves governing your study productivity. Chart your emotional states over study sessions and map stress spikes against academic output.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.75rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 1.25rem;">Log Current Parameters</h3>
                            
                            <div class="input-group">
                                <label class="input-label" style="position:static; margin-bottom: 0.4rem;">Current Mood</label>
                                <select class="select-input" id="mood-select" style="padding:0.6rem 1rem;">
                                    <option value="calm">😌 Calm & Composed</option>
                                    <option value="focused">🧠 Focused & Productive</option>
                                    <option value="fatigued">😴 Tired & Exhausted</option>
                                    <option value="overloaded">🥵 Overloaded & Stressed</option>
                                    <option value="deepflow">⚡ Motivated & Excited</option>
                                </select>
                            </div>
                            
                            <div class="input-group" style="margin-top:1rem;">
                                <label class="input-label">Energy Level: <span id="energy-val-display">75</span>%</label>
                                <input type="range" min="0" max="100" value="75" class="slider-input" id="energy-slider-input">
                            </div>

                            <div class="input-group" style="margin-top:1rem;">
                                <label class="input-label">Focus Level: <span id="focus-val-display">80</span>%</label>
                                <input type="range" min="0" max="100" value="80" class="slider-input" id="focus-slider-input">
                            </div>

                            <button class="action-btn" id="analyze-mood-btn" style="width:100%; margin-top:1.5rem;">Analyze Mood</button>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Emotion Trend Generated</h3>
                        
                        <div class="mood-interface-box" id="mood-results-panel" style="display:block;">
                            <!-- Visual Wave Indicator with large Energy Ring overlay -->
                            <div class="glass-card wave-display-card" id="mood-wave-card" style="margin-bottom: 1.5rem;">
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

                            <!-- Interactive graph -->
                            <div style="margin-bottom: 1.5rem;">
                                <span class="input-label" style="display:block; margin-bottom:0.75rem;">Weekly Trend Matrix</span>
                                <div class="glass-card" style="padding:1.25rem 1rem; min-height: 160px; background: rgba(0,0,0,0.2);">
                                    <svg id="mood-trend-svg" viewBox="0 0 350 120" style="width:100%; height:100%; overflow:visible;">
                                        <!-- Vertical Grid Lines -->
                                        <line x1="20" y1="10" x2="20" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="70" y1="10" x2="70" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="120" y1="10" x2="120" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="170" y1="10" x2="170" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="220" y1="10" x2="220" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="270" y1="10" x2="270" y2="100" stroke="rgba(255,255,255,0.04)"></line>
                                        <line x1="320" y1="10" x2="320" y2="100" stroke="rgba(255,255,255,0.04)"></line>

                                        <!-- Trend Path -->
                                        <path id="mood-trend-path" d="M 20 80 L 70 50 L 120 40 L 170 85 L 220 90 L 270 30 L 320 45" fill="none" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"></path>
                                        
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
                                <div class="chart-insight-banner">
                                    <span class="insight-icon">💡</span>
                                    <span class="insight-text" id="mood-insight-text"><strong>AI Diagnostics:</strong> Energy level is stable. Energy Score: 74% • Focus decreases after long study sessions. <em>Recommendation: Add short breaks between sessions.</em></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,"/burnout-detection":`
            <div class="router-view-page feature-page" data-page="burnout-detection">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Stress Intelligence</span>
                        <h2 class="feature-title" style="margin-bottom: 1.5rem;">Burnout Detection</h2>
                        <p class="feature-description" style="margin-bottom: 2rem;">
                            Simulate performance metrics and identify physiological burnout danger thresholds. The algorithm tracks sleep deficit, stress level, and workload to predict mental exhaustion indexes.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.75rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 1.25rem;">Burnout Risk Parameters</h3>
                            
                            <div class="input-group">
                                <label class="input-label">Daily Sleep: <span id="sleep-val-burn">7.5</span> Hours</label>
                                <input type="range" min="3" max="10" step="0.5" value="7.5" class="slider-input" id="sleep-input-burn">
                            </div>

                            <div class="input-group" style="margin-top:0.5rem;">
                                <label class="input-label">Perceived Stress: <span id="stress-val-burn">5</span>/10</label>
                                <input type="range" min="1" max="10" value="5" class="slider-input" id="stress-input-burn">
                            </div>

                            <div class="input-group" style="margin-top:0.5rem;">
                                <label class="input-label">Upcoming Deadlines: <span id="deadlines-val-burn">3</span></label>
                                <input type="range" min="0" max="15" value="3" class="slider-input" id="deadlines-input-burn">
                            </div>

                            <div class="input-group" style="margin-top:0.5rem;">
                                <label class="input-label">Daily Study Hours: <span id="study-val-burn">6</span>h</label>
                                <input type="range" min="0" max="16" value="6" class="slider-input" id="study-input-burn">
                            </div>

                            <button class="action-btn" id="analyze-burnout-btn" style="width:100%; margin-top:1.5rem;">Analyze Risk</button>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Analysis Available</h3>
                        
                        <!-- Neural Brain Simulation -->
                        <div class="burnout-brain-box" style="margin-bottom: 1.5rem;">
                            <canvas id="brain-canvas" class="brain-mesh-canvas"></canvas>
                        </div>

                        <!-- Burnout predictions cards -->
                        <div class="burnout-output-wrapper" id="burnout-results-panel" style="display: block; width:100%;">
                            <div class="glass-card prediction-card" id="burnout-results-card" style="display:flex; align-items:center; gap:1.5rem; padding: 2rem;">
                                <div class="burnout-score-ring-container" style="position:relative; width:80px; height:80px; flex-shrink:0;">
                                    <svg class="burnout-score-ring-svg" viewBox="0 0 100 100" style="width:100%; height:100%; transform: rotate(-90deg);">
                                        <circle class="ring-bg" cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="6"></circle>
                                        <circle class="ring-fill" id="burnout-ring-fill" cx="50" cy="50" r="42" fill="none" stroke="var(--color-accent)" stroke-width="6" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="153" style="transition: stroke-dashoffset 0.8s ease;"></circle>
                                    </svg>
                                    <div class="prediction-badge" id="burnout-score-badge" style="border:none; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); margin:0; font-size:1.3rem; font-weight:700;">42%</div>
                                </div>
                                <div style="flex:1;">
                                    <div class="feature-card-title" style="font-size: 1.1rem; margin-bottom: 0.5rem;" id="burnout-risk-level">Moderate Risk</div>
                                    
                                    <div class="burnout-contributors-box" style="margin-bottom:0.75rem;">
                                        <span class="input-label" style="font-size:0.68rem; display:block; margin-bottom:0.25rem;">Contributors</span>
                                        <ul id="burnout-contributors-list" style="list-style-type:none; padding-left:0; font-size:0.85rem; color:var(--color-text-secondary); display:flex; flex-direction:column; gap:0.2rem;">
                                            <li>• Sleep debt moderate</li>
                                            <li>• Stable assignment load</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="burnout-recommendations-box">
                                        <span class="input-label" style="font-size:0.68rem; display:block; margin-bottom:0.25rem;">AI Recommendations</span>
                                        <ul id="burnout-recommendations-list" style="list-style-type:none; padding-left:0; font-size:0.85rem; color:var(--color-text-secondary); display:flex; flex-direction:column; gap:0.2rem;">
                                            <li>• Schedule a focus sprint session</li>
                                            <li>• Keep study window below 8h</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,"/study-planner":`
            <div class="router-view-page feature-page" data-page="study-planner">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Adaptive Schedules</span>
                        <h2 class="feature-title" style="margin-bottom: 1.5rem;">Smart Study Planner</h2>
                        <p class="feature-description" style="margin-bottom: 2rem;">
                            Distribute assignments and tasks across dynamic weekly timelines. Generate your planner based on workload variables and watch tasks fall into optimal slots.
                        </p>
                        
                        <!-- Inputs Card -->
                        <div class="glass-card study-planner-input-card" style="padding: 1.75rem; border-color: rgba(var(--color-accent-rgb), 0.15); margin-top: 1rem;">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 1.25rem;">Schedule Parameters</h3>
                            
                            <div class="input-group">
                                <label class="input-label" style="position:static; margin-bottom:0.4rem;">Study Tasks</label>
                                <textarea class="text-input" rows="3" id="planner-tasks-input" style="resize:none;">Calculus Homework prep
Lab Report write-up
Machine Learning lecture revision</textarea>
                            </div>

                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                                <div class="input-group">
                                    <label class="input-label">Days to Deadline: <span id="planner-days-val">3</span></label>
                                    <input type="range" min="1" max="7" value="3" class="slider-input" id="planner-deadline-input">
                                </div>
                                <div class="input-group">
                                    <label class="input-label" style="position:static; margin-bottom:0.4rem;">Study Priority</label>
                                    <select class="select-input" id="planner-priority-input" style="padding:0.6rem 1rem;">
                                        <option value="high">🔥 High Priority</option>
                                        <option value="med" selected>⚡ Medium Priority</option>
                                        <option value="low">🌱 Low Priority</option>
                                    </select>
                                </div>
                            </div>

                            <button class="action-btn" id="planner-generate-btn" style="width: 100%; margin-top: 1.5rem;">Generate Schedule</button>
                        </div>
                    </div>

                    <!-- Right Showcase Panel: Dynamic Schedule Grid -->
                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2" id="planner-workspace" style="flex: 1.3;">
                        <!-- Premium Scanline Overlay -->
                        <div class="planner-scan-line" id="planner-scan"></div>
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;" id="planner-workspace-title">Today's Schedule Ready</h3>
                        
                        <!-- Generated Schedule Grid (Visible by default) -->
                        <div class="planner-schedule-grid" id="planner-schedule-grid" style="display: grid;">
                            <!-- Will be populated dynamically by JS -->
                        </div>

                        <!-- Task Breakdown Result Card (Visible by default) -->
                        <div class="glass-card" id="planner-breakdown" style="display:block; padding:1.5rem; margin-top:1.5rem; background:rgba(255,255,255,0.02);">
                            <h4 class="advice-title" style="margin-bottom:0.5rem;">Cognitive Sprints Breakdown</h4>
                            <p class="feature-card-desc" id="planner-breakdown-text" style="font-size:0.85rem; color:var(--color-text-secondary);">Today's Schedule Ready. Generated a balanced workload slot over 3 days. A total of 7.5 study hours were structured into optimal focus sprints.</p>
                        </div>
                    </div>
                </div>
            </div>
        `,"/predictive-insights":`
            <div class="router-view-page feature-page" data-page="predictive-insights">
                <div class="feature-page-container">
                    <div class="feature-info animate-fade-in stagger-1">
                        <span class="feature-tagline">Future Forecast</span>
                        <h2 class="feature-title" style="margin-bottom: 1.5rem;">Predictive Insights</h2>
                        <p class="feature-description" style="margin-bottom: 2rem;">
                            Model future stress curves by plotting academic syllabus dates. Identify high-congestion points to formulate workload distributions ahead of exams.
                        </p>
                        
                        <div class="glass-card" style="padding: 1.75rem; border-color: rgba(var(--color-accent-rgb), 0.15);">
                            <h3 class="feature-card-title" style="font-size:1.1rem; margin-bottom: 1rem;">Forecast Settings</h3>
                            <div class="input-group">
                                <label class="input-label" style="position:static; margin-bottom:0.4rem;">Select Semester Week</label>
                                <select class="select-input" id="predictive-week-select">
                                    <option value="1" selected>Week 1: Introduction</option>
                                    <option value="4">Week 4: Project Releases</option>
                                    <option value="8">Week 8: Midterms Cycle</option>
                                    <option value="12">Week 12: Project Drafts</option>
                                    <option value="15">Week 15: Finals Prep</option>
                                    <option value="18">Week 18: Semester End</option>
                                </select>
                            </div>
                            <button class="action-btn" id="forecast-btn" style="width:100%; margin-top:1.5rem;">Forecast Trends</button>
                        </div>
                    </div>

                    <div class="glass-card feature-interactive-panel animate-fade-in stagger-2">
                        <h3 class="feature-card-title" style="margin-bottom: 1.5rem; text-align: center;">Forecast Available</h3>
                        
                        <div class="predictive-insights-box" id="predictive-results-panel" style="display:block;">
                            <!-- SVG Forecast Graph -->
                            <div class="glass-card prediction-graph-card" style="background: rgba(0,0,0,0.25); margin-bottom: 1.5rem; height: 180px;">
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

                            <!-- Mini Line Chart & Metrics Card -->
                            <div class="glass-card" style="padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); margin-bottom: 1.5rem;">
                                <div style="flex:1;">
                                    <div class="feature-card-title" style="font-size:0.95rem; margin-bottom:0.25rem;">Next Week Risk: <span id="predictive-risk-level" style="color:var(--color-accent-alt); font-weight:700;">Medium</span></div>
                                    <p class="feature-card-desc" style="font-size:0.8rem; line-height:1.4; margin-bottom:0.5rem;">Peak Stress Days: <b id="predictive-peak-days">Tuesday, Thursday</b></p>
                                    <p class="feature-card-desc" id="predictive-recs" style="font-size:0.8rem; line-height:1.4;">AI Recommendation: <em>Shift non-urgent tasks.</em></p>
                                </div>
                                <div style="width: 80px; height: 50px;">
                                    <!-- Mini line SVG -->
                                    <svg viewBox="0 0 100 50" style="width:100%; height:100%; overflow:visible;">
                                        <path d="M 0 45 L 20 40 L 40 15 L 60 30 L 80 45 L 100 25" fill="none" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round"></path>
                                    </svg>
                                </div>
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
                                        <span class="tooltip-title" id="tooltip-title">Week 1: Introduction</span>
                                        <span class="tooltip-risk risk-low" id="tooltip-risk">Low Risk</span>
                                    </div>
                                    <p class="tooltip-desc" id="tooltip-desc">Semester initialization. Academic load is low, sleep patterns look steady, cognitive focus at peak.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `};function P(){if(I){const w=window.location.hash;return w&&w.substring(1)||"/"}else return window.location.pathname||"/"}function T(w){I?window.location.hash=w:(window.history.pushState(null,null,w),h(w))}function h(w){let d=w;d.endsWith("index.html")&&(d="/"),o[d]||(d="/");const e=document.getElementById("app").querySelector(".router-view-page");e?(e.classList.add("page-exit"),setTimeout(()=>{C(d)},300)):C(d)}function C(w){const d=document.getElementById("app");d.innerHTML=o[w];const a=w==="/"?"home":w.substring(1);document.body.setAttribute("data-theme",a);const e=document.getElementById("nav-breadcrumbs");if(w==="/")e.innerHTML='<a href="/" class="breadcrumb-link" id="breadcrumb-home">MindFlow AI</a>';else{const n={"/burnout-detection":"Burnout Detection","/study-planner":"Smart Study Planner","/mood-analytics":"Mood Analytics","/focus-tracking":"Focus Tracking","/ai-companion":"AI Companion","/predictive-insights":"Predictive Insights"}[w]||"Feature";e.innerHTML=`
                <a href="/" class="breadcrumb-link">MindFlow AI</a>
                <span class="breadcrumb-separator">&gt;</span>
                <a href="/" class="breadcrumb-link" id="breadcrumb-features">Features</a>
                <span class="breadcrumb-separator">&gt;</span>
                <span class="breadcrumb-active">${n}</span>
            `;const y=document.getElementById("breadcrumb-features");y&&y.addEventListener("click",m=>{m.preventDefault(),window.shouldScrollToFeatures=!0,T("/")})}window.scrollTo({top:0,behavior:"instant"}),W(w)}function W(w){V(),window.MindFlowEffects&&window.MindFlowEffects.changeTheme(w),w==="/"?(window.MindFlowLanding&&window.MindFlowLanding.init(),window.shouldScrollToFeatures&&(window.shouldScrollToFeatures=!1,setTimeout(()=>{const d=document.getElementById("features-preview");d&&d.scrollIntoView({behavior:"smooth"})},350))):window.MindFlowFeatures&&window.MindFlowFeatures.init(w)}function V(){document.querySelectorAll("[data-route], a").forEach(a=>{if(a.dataset.listenerBound)return;const e=a.getAttribute("data-route")||a.getAttribute("href");e&&(e.startsWith("/")||e.startsWith("#/"))&&(a.addEventListener("click",c=>{c.preventDefault();let n=e;n.startsWith("#/")&&(n=n.substring(1)),T(n)}),a.dataset.listenerBound="true")});const w=document.getElementById("explore-features-btn");w&&w.addEventListener("click",a=>{a.preventDefault();const e=document.getElementById("features-preview");e&&e.scrollIntoView({behavior:"smooth"})});const d=document.getElementById("explore-features-btn-footer");d&&d.addEventListener("click",a=>{a.preventDefault();const e=document.getElementById("features-preview");e&&e.scrollIntoView({behavior:"smooth"})})}window.addEventListener("popstate",()=>{h(P())}),window.addEventListener("hashchange",()=>{I&&h(P())}),window.MindFlowRouter={navigate:T,getRoute:P,init:function(){const w=P();I&&!window.location.hash&&(window.location.hash="#/"),h(w)}},document.addEventListener("DOMContentLoaded",()=>{window.MindFlowRouter.init()})})();
