(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const b of document.querySelectorAll('link[rel="modulepreload"]'))B(b);new MutationObserver(b=>{for(const m of b)if(m.type==="childList")for(const u of m.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&B(u)}).observe(document,{childList:!0,subtree:!0});function P(b){const m={};return b.integrity&&(m.integrity=b.integrity),b.referrerPolicy&&(m.referrerPolicy=b.referrerPolicy),b.crossOrigin==="use-credentials"?m.credentials="include":b.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function B(b){if(b.ep)return;b.ep=!0;const m=P(b);fetch(b.href,m)}})();(function(){const C=document.getElementById("particles-canvas");if(!C)return;const r=C.getContext("2d");let P=C.width=window.innerWidth,B=C.height=window.innerHeight;const b=[],m=[],u=60,R=6,o={home:{primary:"rgba(115, 140, 255, 0.03)",alt:"rgba(115, 140, 255, 0.02)",spark:"#738cff"},"ai-companion":{primary:"rgba(79, 70, 229, 0.12)",alt:"rgba(139, 92, 246, 0.12)",spark:"#4f46e5"},"focus-tracking":{primary:"rgba(107, 114, 128, 0.12)",alt:"rgba(180, 176, 167, 0.12)",spark:"#6b7280"},"mood-analytics":{primary:"rgba(168, 85, 247, 0.12)",alt:"rgba(236, 72, 153, 0.12)",spark:"#a855f7"},"burnout-detection":{primary:"rgba(99, 102, 241, 0.12)",alt:"rgba(6, 182, 212, 0.12)",spark:"#6366f1"},"study-planner":{primary:"rgba(2, 132, 199, 0.12)",alt:"rgba(16, 185, 129, 0.12)",spark:"#0284c7"},"predictive-insights":{primary:"rgba(8, 145, 178, 0.12)",alt:"rgba(5, 150, 105, 0.12)",spark:"#0891b2"}};let x=o.home;class L{constructor(){this.reset()}reset(){this.x=Math.random()*P,this.y=Math.random()*B,this.size=Math.random()*1+.4,this.speed=Math.random()*.15+.05,this.opacity=Math.random()*.6+.15,this.fadeSpeed=Math.random()*.004+.001,this.fadeDir=Math.random()>.5?1:-1}update(){this.y-=this.speed,this.x+=Math.sin(this.y*.01)*.12,(this.y<0||this.x<0||this.x>P)&&(this.reset(),this.y=B),this.opacity+=this.fadeSpeed*this.fadeDir,this.opacity>.8?this.fadeDir=-1:this.opacity<.1&&(this.fadeDir=1)}draw(){r.fillStyle=x.spark,r.globalAlpha=this.opacity,r.beginPath(),r.arc(this.x,this.y,this.size,0,Math.PI*2),r.fill()}}class t{constructor(){this.x=Math.random()*P,this.y=Math.random()*B,this.radius=Math.random()*40+20,this.vx=(Math.random()-.5)*.3,this.vy=(Math.random()-.5)*.3,this.angle=Math.random()*Math.PI*2,this.rotationSpeed=(Math.random()-.5)*.003,this.opacity=Math.random()*.15+.05,this.shape=Math.random()>.5?"circle":"poly",this.sides=Math.floor(Math.random()*3)+3}update(){this.vx*=.98,this.vy*=.98,this.x+=this.vx,this.y+=this.vy,this.angle+=this.rotationSpeed;const a=this.radius*1.5;this.x<-a&&(this.x=P+a),this.x>P+a&&(this.x=-a),this.y<-a&&(this.y=B+a),this.y>B+a&&(this.y=-a)}draw(){r.save(),r.translate(this.x,this.y),r.rotate(this.angle);const a=r.createRadialGradient(-10,-10,0,0,0,this.radius);if(a.addColorStop(0,x.alt),a.addColorStop(.5,"rgba(255, 255, 255, 0.01)"),a.addColorStop(1,x.primary),r.fillStyle=a,r.strokeStyle="rgba(255, 255, 255, 0.05)",r.lineWidth=1,r.globalAlpha=this.opacity,r.beginPath(),this.shape==="circle")r.arc(0,0,this.radius,0,Math.PI*2);else{for(let i=0;i<this.sides;i++){const v=i*Math.PI*2/this.sides,p=Math.cos(v)*this.radius,g=Math.sin(v)*this.radius;i===0?r.moveTo(p,g):r.lineTo(p,g)}r.closePath()}r.fill(),r.stroke(),r.beginPath(),r.strokeStyle="rgba(255, 255, 255, 0.12)",this.shape==="circle"?r.arc(0,0,this.radius,Math.PI*1.25,Math.PI*1.75):(r.moveTo(Math.cos(Math.PI*1.2)*this.radius,Math.sin(Math.PI*1.2)*this.radius),r.lineTo(Math.cos(Math.PI*1.8)*this.radius,Math.sin(Math.PI*1.8)*this.radius)),r.stroke(),r.restore()}}function n(){b.length=0,m.length=0;for(let s=0;s<u;s++)b.push(new L);for(let s=0;s<R;s++)m.push(new t)}function d(){r.clearRect(0,0,P,B),r.globalAlpha=1,b.forEach(s=>{s.update(),s.draw()}),m.forEach(s=>{s.update(),s.draw()}),requestAnimationFrame(d)}function f(s){const a=(s.clientX-window.innerWidth/2)/(window.innerWidth/2),i=(s.clientY-window.innerHeight/2)/(window.innerHeight/2);s.clientX,s.clientY;const v=document.querySelector(".bg-layer-far"),p=document.querySelector(".bg-layer-mid"),g=document.querySelector(".bg-layer-fore");v&&(v.style.transform=`translate(${a*-4}px, ${i*-4}px)`),p&&(p.style.transform=`translate(${a*-12}px, ${i*-12}px)`),g&&(g.style.transform=`translate(${a*-20}px, ${i*-20}px)`)}window.addEventListener("mousemove",f),window.addEventListener("mouseleave",()=>{[".bg-layer-far",".bg-layer-mid",".bg-layer-fore"].forEach(a=>{const i=document.querySelector(a);i&&(i.style.transform="translate(0px, 0px)")})}),window.addEventListener("resize",()=>{P=C.width=window.innerWidth,B=C.height=window.innerHeight,n()}),document.addEventListener("click",s=>{const a=s.target.closest(".action-btn, .secondary-btn, .preset-btn, .mode-select-btn, .suggested-prompt-btn, #story-trigger-btn");if(!a)return;window.getComputedStyle(a).position==="static"&&(a.style.position="relative");const i=document.createElement("span");i.className="ripple-wave";const v=a.getBoundingClientRect(),p=Math.max(v.width,v.height);i.style.width=i.style.height=`${p}px`;const g=s.clientX-v.left-p/2,e=s.clientY-v.top-p/2;i.style.left=`${g}px`,i.style.top=`${e}px`,a.appendChild(i),setTimeout(()=>{i.remove()},600)}),window.MindFlowEffects={init:function(){n(),d()},changeTheme:function(s){let a=s==="/"?"home":s.substring(1);o[a]?x=o[a]:x=o.home}},window.MindFlowEffects.init()})();(function(){let C=[],r=[];function P(){C.forEach(clearInterval),C=[],r.forEach(cancelAnimationFrame),r=[]}function B(t){const n=document.getElementById("ai-moment-overlay"),d=document.getElementById("ai-moment-status"),f=document.getElementById("step-dot-1"),s=document.getElementById("step-dot-2"),a=document.getElementById("step-dot-3"),i=document.querySelectorAll(".floating-ai-card");if(!n||!d){t();return}n.style.display="flex",n.style.opacity="1",d.textContent="Analyzing workload...",f.className="step-dot active",s.className="step-dot",a.className="step-dot",i.forEach((e,c)=>{const l=(Math.random()-.5)*220,w=(Math.random()-.5)*120-40,E=(Math.random()-.5)*36;e.style.transition="none",e.style.transform=`translate(${l}px, ${w}px) rotate(${E}deg) scale(0.9)`,e.style.opacity="0.85",e.style.borderColor="rgba(255, 255, 255, 0.15)"});const v=setTimeout(()=>{d.textContent="Detecting stress patterns...",f.className="step-dot",s.className="step-dot active",i.forEach(e=>{e.style.transition="transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s, border-color 0.7s",e.style.transform="translate(0px, -20px) scale(0.8) rotate(0deg)",e.style.opacity="0.5",e.style.borderColor="rgba(115, 140, 255, 0.4)"})},700),p=setTimeout(()=>{d.textContent="Generating recommendations...",s.className="step-dot",a.className="step-dot active",i.forEach((e,c)=>{e.style.transition="transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s, border-color 0.6s";const l=(c-1.5)*110;e.style.transform=`translate(${l}px, 60px) scale(0.95) rotate(0deg)`,e.style.opacity="1",e.style.borderColor="rgba(52, 211, 153, 0.35)"})},1400),g=setTimeout(()=>{n.style.transition="opacity 0.3s ease",n.style.opacity="0";const e=setTimeout(()=>{n.style.display="none",n.style.transition="",t()},300);C.push(e)},2300);C.push(v,p,g)}function b(t,n,d="",f=1200){if(!t)return;const s=performance.now();function a(i){const v=i-s,p=Math.min(v/f,1),g=p*(2-p),e=Math.floor(g*n);t.textContent=e+d,p<1?requestAnimationFrame(a):t.textContent=n+d}requestAnimationFrame(a)}function m(){const t=document.getElementById("chat-messages"),n=document.getElementById("chat-user-input"),d=document.getElementById("chat-send-btn"),f=document.querySelectorAll(".suggested-prompt-btn"),s=document.querySelectorAll(".quick-action-btn");if(!t||!n||!d)return;function a(e,c,l=!1){const w=document.createElement("div");w.className=`chat-message ${l?"assistant":"user"}`,w.innerHTML=`
                <div class="message-sender" style="color: ${l?"var(--color-accent)":"var(--color-accent-alt)"}; font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem; margin-top:0.6rem;">${e}</div>
                <div class="message-text" style="font-size:0.9rem; line-height:1.4;">${c}</div>
            `,t.appendChild(w),t.scrollTop=t.scrollHeight}function i(){const e=document.createElement("div");e.className="chat-message assistant typing-indicator-msg",e.id="chat-typing-indicator",e.innerHTML=`
                <div class="message-sender" style="color: var(--color-accent); font-weight:600; font-size:0.75rem; text-transform:uppercase; margin-bottom:0.2rem; margin-top:0.6rem;">MindFlow AI</div>
                <div class="companion-thinking" style="justify-content: flex-start; padding: 0.2rem 0;">
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                    <span class="thinking-dot" style="width:5px; height:5px;"></span>
                </div>
            `,t.appendChild(e),t.scrollTop=t.scrollHeight}function v(){const e=document.getElementById("chat-typing-indicator");e&&e.remove()}function p(e){i();const c=e.toLowerCase();let l="";c.includes("schedule")||c.includes("organize")||c.includes("study plan")?l="I've structured a balanced study plan for tomorrow:<br><br>• <b>09:00 AM - 10:30 AM:</b> Cognitive peak slot (Calculus quiz preparation)<br>• <b>10:30 AM - 10:45 AM:</b> Screen-free hydration break<br>• <b>11:00 AM - 12:30 PM:</b> Reading / Lab report drafting<br>• <b>03:00 PM - 04:30 PM:</b> Revision sprint (Machine Learning lecture)<br><br><em>AI Recommendation: Protect your evening after 9:30 PM. Avoid screens to restore sleep cycles.</em>":c.includes("stress")||c.includes("reduce")||c.includes("anxious")||c.includes("burnout")?l="I detect elevated stress load. Let's trigger a physical reset:<br><br>1. <b>Laptop Off:</b> Close your screens for the next 15 minutes.<br>2. <b>Guided Breathing:</b> Inhale 4s, hold 4s, exhale 6s. Repeat 5 times.<br>3. <b>Workload Reduction:</b> Pinpoint your single most urgent milestone. Defer secondary tasks. I will buffer your calendar slots.<br><br><em>AI Recommendation: Reduce workload by 15%. Take a recovery break.</em>":c.includes("prioritize")||c.includes("tasks")?l="Prioritization complete. Tasks are sorted by cognitive demand and deadlines:<br><br>• <b>High Priority (Critical):</b> Calculus prep & Chemistry draft (Schedule for morning peak hours).<br>• <b>Medium Priority (Moderate):</b> Machine Learning study sprint (Schedule for mid-afternoon).<br>• <b>Low Priority (Buffer):</b> Course registrations & general readings (Schedule for late afternoon or block to buffer days).":c.includes("optimize")?l="Study routine optimized for neuro-efficiency:<br><br>• <b>Spaced Sprints:</b> Block 45m deep focus slots followed by 10m active stretches.<br>• <b>Subject Mixing:</b> Study different subjects between blocks to avoid cognitive saturation.<br>• <b>Active Recall:</b> Spend the final 15 minutes of each block testing yourself without looking at notes.":l="I've analyzed your parameters. Based on your metrics, your current focus quotient is solid. To sustain this, study in high-focus 25m sprints with 5m breaks. Ensure sleep debt stays below 2 hours.";const w=setTimeout(()=>{v(),a("MindFlow AI",l,!0)},1100);C.push(w)}function g(){const e=n.value.trim();e&&(a("You",e,!1),n.value="",p(e))}d.addEventListener("click",g),n.addEventListener("keypress",e=>{e.key==="Enter"&&g()}),f.forEach(e=>{e.addEventListener("click",()=>{const c=e.getAttribute("data-prompt");a("You",c,!1),p(c)})}),s.forEach(e=>{e.addEventListener("click",()=>{const c=e.getAttribute("data-action");a("You",c,!1),p(c)})})}function u(){const t=document.getElementById("timer-display"),n=document.getElementById("timer-status"),d=document.getElementById("timer-progress"),f=document.getElementById("timer-start-btn"),s=document.getElementById("timer-pause-btn"),a=document.getElementById("timer-reset-btn"),i=document.getElementById("timer-end-btn"),v=document.getElementById("focus-message"),p=document.querySelectorAll(".mode-select-btn"),g=document.getElementById("apply-custom-timer");if(!t||!d)return;let e=1500,c=e,l=null;const w=628;function E(A){const T=w-A*w;d.style.strokeDashoffset=T}function h(){const A=Math.floor(c/3600),T=Math.floor(c%3600/60),S=c%60;let k="";A>0?k=`${A.toString().padStart(2,"0")}:${T.toString().padStart(2,"0")}:${S.toString().padStart(2,"0")}`:k=`${T.toString().padStart(2,"0")}:${S.toString().padStart(2,"0")}`,t.textContent=k;const F=c/e;E(F)}function D(){l||(f.style.display="none",s.style.display="block",i.style.display="block",n.textContent="Flow Active",v.textContent="Deep focus state active. Keep device alerts muted.",l=setInterval(()=>{c--,h(),c<=0&&(clearInterval(l),l=null,n.textContent="Flow Complete",v.textContent="Session completed successfully. Take a physical stretch break!",f.style.display="block",s.style.display="none",i.style.display="none",E(0))},1e3),C.push(l))}function M(){l&&(clearInterval(l),l=null,f.style.display="block",s.style.display="none",n.textContent="Flow Paused",v.textContent="Timer paused. Click start when ready to resume focus.")}function y(){M(),c=e,h(),n.textContent="Flow Ready",v.textContent="Choose your focus interval and start your sprint.",i.style.display="none",E(1)}p.forEach(A=>{A.addEventListener("click",()=>{p.forEach(T=>T.classList.remove("active")),A.classList.add("active"),e=parseInt(A.getAttribute("data-time")),y()})}),g&&g.addEventListener("click",()=>{p.forEach(S=>S.classList.remove("active"));const A=parseInt(document.getElementById("custom-hours").value)||0,T=parseInt(document.getElementById("custom-minutes").value)||0;A===0&&T===0||(e=A*3600+T*60,y())}),f.addEventListener("click",D),s.addEventListener("click",M),a.addEventListener("click",y),i.addEventListener("click",()=>{y(),v.textContent="Session ended. Work progress recorded."}),h(),E(1)}function R(){const t=document.getElementById("analyze-mood-btn"),n=document.getElementById("mood-select"),d=document.getElementById("energy-slider-input"),f=document.getElementById("energy-val-display"),s=document.getElementById("focus-slider-input"),a=document.getElementById("focus-val-display"),i=document.getElementById("active-mood-display"),v=document.querySelector(".wave-p1"),p=document.querySelector(".wave-p2"),g=document.getElementById("mood-wave-card"),e=document.getElementById("large-ring-fill"),c=document.getElementById("large-ring-pct");if(!t||!d)return;d.addEventListener("input",()=>{f.textContent=d.value}),s.addEventListener("input",()=>{a.textContent=s.value});let l=12,w=.02,E=0,h=.03;const D={calm:{gradient:"linear-gradient(180deg, rgba(82, 140, 111, 0.08) 0%, var(--color-bg) 85%)",color:"#528c6f",colorAlt:"#34d399",amp:12,freq:.02,spd:.03},focused:{gradient:"linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, var(--color-bg) 85%)",color:"#38bdf8",colorAlt:"#60a5fa",amp:18,freq:.03,spd:.05},fatigued:{gradient:"linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, var(--color-bg) 85%)",color:"#f59e0b",colorAlt:"#d97706",amp:6,freq:.01,spd:.015},overloaded:{gradient:"linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--color-bg) 85%)",color:"#ef4444",colorAlt:"#ec4899",amp:28,freq:.05,spd:.08},deepflow:{gradient:"linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, var(--color-bg) 85%)",color:"#a855f7",colorAlt:"#c084fc",amp:22,freq:.015,spd:.04}};function M(S,k,F){const z=D[S];if(z){if(l=z.amp,w=z.freq,h=z.spd,i.textContent=k,e){const O=264-264*(F/100);e.style.strokeDashoffset=O,e.style.transition="stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)"}c&&(c.textContent=F+"%"),g&&(g.style.background=z.gradient,g.style.setProperty("--color-accent",z.color),g.style.setProperty("--color-accent-alt",z.colorAlt),e&&(e.style.stroke=z.color))}}function y(){if(!v||!p)return;E+=h;const S=40,k=400/S;let F="M 0 90",z="M 0 90";for(let q=0;q<=S;q++){const W=q*k,I=90+Math.sin(W*w+E)*l,H=90+Math.sin(W*(w*1.2)-E)*(l*.8);F+=` L ${W} ${I}`,z+=` L ${W} ${H}`}F+=" L 400 180 L 0 180 Z",z+=" L 400 180 L 0 180 Z",v.setAttribute("d",F),p.setAttribute("d",z);const O=requestAnimationFrame(y);r.push(O)}t.addEventListener("click",()=>{const S=n.value,k=parseInt(d.value),F=parseInt(s.value),z=n.options[n.selectedIndex].text.split(" ").slice(1).join(" ");B(()=>{M(S,z,k);const O=document.getElementById("mood-trend-path");if(O){const I="M 20 80 L 70 50 L 120 40 L 170 85 L 220 90 L 270 30",H=120-Math.round(F*.9);O.setAttribute("d",`${I} L 320 ${H}`)}const q=document.querySelectorAll(".mood-chart-dot")[6];q&&q.setAttribute("data-info",`Today: ${z} (Energy: ${k}%, Focus: ${F}%)`);const W=document.getElementById("mood-insight-text");W&&(F<40?W.innerHTML=`<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${k}% • Severe focus drop after study sprints. <em>Recommendation: Add short breaks between sessions.</em>`:k>80&&F>70?W.innerHTML=`<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${k}% • High cognitive reserve and focus peaks. <em>Recommendation: Schedule deep study blocks of 45-60m.</em>`:W.innerHTML=`<strong>AI Diagnostics:</strong> Emotion Trend Generated. Energy Score: ${k}% • Workload stress is moderate. <em>Recommendation: Add short breaks between sessions.</em>`)})});const A=document.querySelectorAll(".mood-chart-dot"),T=document.getElementById("chart-tooltip");A.length&&T&&A.forEach(S=>{S.addEventListener("mouseenter",()=>{T.textContent=S.getAttribute("data-info"),T.style.color="var(--color-text-primary)"}),S.addEventListener("mouseleave",()=>{T.textContent="Hover over data points to inspect mood history",T.style.color=""})}),M("calm","Calm",75),y()}function o(){const t=document.getElementById("sleep-input-burn"),n=document.getElementById("sleep-val-burn"),d=document.getElementById("stress-input-burn"),f=document.getElementById("stress-val-burn"),s=document.getElementById("deadlines-input-burn"),a=document.getElementById("deadlines-val-burn"),i=document.getElementById("study-input-burn"),v=document.getElementById("study-val-burn"),p=document.getElementById("analyze-burnout-btn"),g=document.getElementById("burnout-score-badge"),e=document.getElementById("burnout-risk-level"),c=document.getElementById("burnout-energy-val"),l=document.getElementById("burnout-energy-bar"),w=document.getElementById("burnout-contributors-list"),E=document.getElementById("burnout-recommendations-list"),h=document.getElementById("burnout-ring-fill"),D=document.getElementById("burnout-results-card"),M=document.getElementById("brain-canvas");if(!t||!M||!p)return;t.addEventListener("input",()=>{n.textContent=t.value}),d.addEventListener("input",()=>{f.textContent=d.value}),s.addEventListener("input",()=>{a.textContent=s.value}),i.addEventListener("input",()=>{v.textContent=i.value});const y=M.getContext("2d"),A=M.width=260,T=M.height=220,S=[{x:70,y:110,pulseOffset:0},{x:90,y:70,pulseOffset:.5},{x:130,y:55,pulseOffset:1.2},{x:180,y:75,pulseOffset:.8},{x:200,y:110,pulseOffset:2.1},{x:170,y:140,pulseOffset:1.5},{x:130,y:170,pulseOffset:.3},{x:100,y:140,pulseOffset:1.9},{x:120,y:100,pulseOffset:.9},{x:150,y:110,pulseOffset:1.4},{x:140,y:80,pulseOffset:2.4},{x:110,y:75,pulseOffset:1.7}];let k=42,F=1;function z(){y.clearRect(0,0,A,T);const q=performance.now()*.001*F;y.strokeStyle=k>70?"rgba(239, 68, 68, 0.15)":"rgba(var(--color-accent-rgb), 0.12)",y.lineWidth=1.2;for(let I=0;I<S.length;I++)for(let H=I+1;H<S.length;H++){const G=S[I].x-S[H].x,$=S[I].y-S[H].y;Math.sqrt(G*G+$*$)<80&&(y.beginPath(),y.moveTo(S[I].x,S[I].y),y.lineTo(S[H].x,S[H].y),y.stroke())}S.forEach(I=>{const G=3+Math.abs(Math.sin(q+I.pulseOffset))*7,$=y.createRadialGradient(I.x,I.y,0,I.x,I.y,G);k>70?($.addColorStop(0,"rgba(239, 68, 68, 0.8)"),$.addColorStop(1,"rgba(239, 68, 68, 0)")):k>40?($.addColorStop(0,"rgba(245, 158, 11, 0.7)"),$.addColorStop(1,"rgba(245, 158, 11, 0)")):($.addColorStop(0,"rgba(var(--color-accent-rgb), 0.7)"),$.addColorStop(1,"rgba(var(--color-accent-rgb), 0)")),y.fillStyle=$,y.beginPath(),y.arc(I.x,I.y,G,0,Math.PI*2),y.fill(),y.fillStyle=k>70?"#ef4444":k>40?"#f59e0b":"var(--color-text-primary)",y.beginPath(),y.arc(I.x,I.y,2.5,0,Math.PI*2),y.fill()});const W=requestAnimationFrame(z);r.push(W)}function O(q,W,I,H,G){if(k=q,h){const j=264-264*(k/100);h.style.strokeDashoffset=j}b(g,k,"%");const $=Math.max(100-k,8);c&&b(c,$,"%"),l&&(l.style.width=`${$}%`,l.className="progress-bar-fill"),k>70?(l&&l.classList.add("critical"),e.textContent="Critical Burnout Risk",e.style.color="#ef4444",h&&(h.style.stroke="#ef4444"),F=3.5):k>40?(l&&l.classList.add("warning"),e.textContent="Elevated Fatigue Alert",e.style.color="#f59e0b",h&&(h.style.stroke="#f59e0b"),F=1.8):(l&&l.classList.add("normal"),e.textContent="Optimal Flow Stable",e.style.color="var(--color-accent)",h&&(h.style.stroke="var(--color-accent)"),F=.8);let N=[];W<7&&N.push("• Sleep deficit"),H>3&&N.push("• Assignment overload"),I>6&&N.push("• High stress level"),G>8&&N.push("• Study duration peaks"),N.length===0&&N.push("• Load metrics balanced"),w.innerHTML=N.map(j=>`<li>${j}</li>`).join("");let V=[];k>60?(V.push("• Reduce workload by 15%"),V.push("• Take a recovery break"),V.push("• Prioritize important tasks")):k>35?(V.push("• Buffer task schedules"),V.push("• Ensure regular rest blocks"),V.push("• Use Pomodoro focus mode")):(V.push("• Maintain present pacing"),V.push("• Standardize sleep schedules")),E.innerHTML=V.map(j=>`<li>${j}</li>`).join(""),D&&D.classList.add("show")}p.addEventListener("click",()=>{const q=parseFloat(t.value),W=parseInt(d.value),I=parseInt(s.value),H=parseFloat(i.value),G=Math.round(W*6.5+I*5.5+H*2-q*5.5+30),$=Math.max(5,Math.min(95,G));B(()=>{O($,q,W,I,H)})}),O(42,7.5,5,3,6),z()}function x(){const t=document.getElementById("planner-generate-btn"),n=document.getElementById("planner-tasks-input"),d=document.getElementById("planner-deadline-input"),f=document.getElementById("planner-priority-input"),s=document.getElementById("planner-days-val"),a=document.getElementById("planner-schedule-grid"),i=document.getElementById("planner-breakdown-text");if(!t||!a)return;d.addEventListener("input",()=>{s.textContent=d.value});function v(p,g,e){a.innerHTML="",["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].forEach((w,E)=>{const h=document.createElement("div");h.className="planner-day-col",h.style.opacity="1",h.style.transform="none";let D="",M=0;if(E<p){const T=e[E%e.length];M=g==="high"?4:g==="med"?2.5:1.5,D=`
                        <div class="planner-task-card priority-${g}" style="transform:none; opacity:1;">
                            <div class="task-card-time">09:00 AM</div>
                            <div class="task-card-name">${T}</div>
                            <div class="task-card-type">${g==="high"?"Deep Focus":"Study Sprint"}</div>
                        </div>
                    `}else D='<div class="planner-day-empty-text">Rest & Recovery Slot</div>';let y="status-optimal",A="Optimal";M>3?(y="status-congested",A="High Load"):M>0&&(y="status-moderate",A="Moderate"),h.innerHTML=`
                    <div class="planner-day-header">
                        <span class="day-name">${w}</span>
                        <span class="day-badge ${y}">${M}h (${A})</span>
                        <div class="indicator-ring-mini" style="width:10px; height:10px; border-radius:50%; background: ${M>3?"#ef4444":M>0?"#f59e0b":"#528c6f"}; margin-top:2px;"></div>
                    </div>
                    <div class="planner-day-tasks">
                        ${D}
                    </div>
                `,a.appendChild(h)});const l=p*(g==="high"?4:g==="med"?2.5:1.5);i.innerHTML=`Today's Schedule Ready. Generated a balanced study plan over <b>${p} days</b>. A total of <b>${l} study hours</b> were distributed into optimal focus sprints. Remaining buffer slots are mapped to ensure cognitive recovery.`}t.addEventListener("click",()=>{const p=n.value.trim(),g=parseInt(d.value),e=f.value;let c=p?p.split(`
`).filter(l=>l.trim()):[];c.length===0&&(c=["Calculus Homework prep","Lab Report write-up","Machine Learning lecture revision"]),B(()=>{v(g,e,c)})}),v(3,"med",["Calculus Homework prep","Lab Report write-up","Machine Learning lecture revision"])}function L(){const t=document.getElementById("forecast-btn"),n=document.getElementById("predictive-week-select"),d=document.getElementById("predictive-results-panel"),f=document.querySelectorAll(".timeline-node"),s=document.getElementById("timeline-tooltip"),a=document.getElementById("tooltip-title"),i=document.getElementById("tooltip-risk"),v=document.getElementById("tooltip-desc"),p=document.getElementById("predictive-risk-level"),g=document.getElementById("predictive-peak-days"),e=document.getElementById("predictive-recs");if(!t||!d)return;const c={1:{risk:"Low",peak:"None",recs:"Maintain present pacing. Sleep indices look stable.",nodeIdx:0},4:{risk:"Low",peak:"Wednesday",recs:"Early project releases. Focus slots will preserve cognitive load.",nodeIdx:0},8:{risk:"High",peak:"Tuesday, Thursday",recs:"Shift non-urgent tasks. Defer secondary milestones.",nodeIdx:1},12:{risk:"Medium",peak:"Monday, Friday",recs:"Buffer tasks list. Block 15m screen recovery slots.",nodeIdx:2},15:{risk:"High",peak:"Tuesday, Thursday",recs:"Finals cycle. Prioritize sleep recovery buffers.",nodeIdx:3},18:{risk:"Low",peak:"None",recs:"Semester evaluation stable. Recover rest hours.",nodeIdx:3}};function l(w){const E=c[w];if(!E)return;p.textContent=E.risk,p.style.color=E.risk==="High"?"#ef4444":E.risk==="Medium"?"#f59e0b":"var(--color-accent)",g.textContent=E.peak,e.innerHTML=`AI Recommendation: <em>${E.recs}</em>`,f.forEach(D=>D.classList.remove("active"));const h=f[E.nodeIdx];if(h){h.classList.add("active");const D=h.getAttribute("data-title"),M=h.getAttribute("data-risk"),y=h.getAttribute("data-desc");a.textContent=D,v.textContent=y,i.textContent=`${M.toUpperCase()} RISK`,i.className="tooltip-risk",M==="low"?i.classList.add("risk-low"):M==="med"?i.classList.add("risk-med"):i.classList.add("risk-high")}}t.addEventListener("click",()=>{const w=n.value;B(()=>{l(w)})}),f.forEach(w=>{w.addEventListener("click",()=>{f.forEach(y=>y.classList.remove("active")),w.classList.add("active");const E=w.getAttribute("data-title"),h=w.getAttribute("data-risk"),D=w.getAttribute("data-desc");s.classList.remove("show");const M=setTimeout(()=>{a.textContent=E,v.textContent=D,i.textContent=`${h.toUpperCase()} RISK`,i.className="tooltip-risk",h==="low"?i.classList.add("risk-low"):h==="med"?i.classList.add("risk-med"):i.classList.add("risk-high"),s.classList.add("show")},200);C.push(M)})}),l("1")}window.MindFlowFeatures={init:function(t){P(),t==="/ai-companion"?m():t==="/focus-tracking"?u():t==="/mood-analytics"?R():t==="/burnout-detection"?o():t==="/study-planner"?x():t==="/predictive-insights"&&L()}}})();(function(){function C(){document.querySelectorAll(".feature-card").forEach(u=>{u.addEventListener("mousemove",R=>{const o=u.getBoundingClientRect(),x=R.clientX-o.left,L=R.clientY-o.top;u.style.setProperty("--mouse-x",`${x}px`),u.style.setProperty("--mouse-y",`${L}px`);const t=o.width/2,n=o.height/2,d=-((L-n)/n)*8,f=(x-t)/t*8;u.style.transition="transform 0.1s ease, border-color 0.3s, box-shadow 0.3s",u.style.transform=`rotateX(${d}deg) rotateY(${f}deg) translateY(-10px) scale(1.02)`,u.style.boxShadow="0 20px 40px rgba(0, 0, 0, 0.45), 0 0 30px rgba(var(--color-accent-rgb), 0.25)",u.style.borderColor="rgba(255, 255, 255, 0.3)"}),u.addEventListener("mouseleave",()=>{u.style.transition="transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, box-shadow 0.3s",u.style.transform="rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",u.style.boxShadow="",u.style.borderColor=""})})}let r=null;function P(){const m=document.querySelector(".side-card-num"),u=document.querySelectorAll(".side-card-num")[1];if(!m||!u)return;let R=34,o=82;r&&clearInterval(r),r=setInterval(()=>{const x=Math.floor(Math.random()*5)-2,L=Math.floor(Math.random()*3)-1;let t=R+x,n=o+L;t<25&&(t=25),t>45&&(t=45),n<75&&(n=75),n>90&&(n=90),m.textContent=`${t}%`,u.textContent=`${n}`},4e3)}function B(){const m=document.getElementById("story-trigger-btn"),u=document.getElementById("story-box");if(!m||!u)return;let R=!0;m.addEventListener("click",()=>{R?(m.disabled=!0,m.textContent="Analyzing Workload...",u.classList.remove("state-chaos","state-clear"),u.classList.add("state-analyzing"),setTimeout(()=>{u.classList.remove("state-analyzing"),u.classList.add("state-clear"),m.textContent="Reset Workload",m.disabled=!1,R=!1},1500)):(u.classList.remove("state-clear","state-analyzing"),u.classList.add("state-chaos"),m.textContent="Reorganize Workload",R=!0)})}function b(){const m=document.getElementById("hero-interactive-scene"),u=document.getElementById("hero-ai-orb");!m||!u||(m.addEventListener("mousemove",R=>{const o=m.getBoundingClientRect(),x=R.clientX-o.left,L=R.clientY-o.top,t=o.width/2,n=o.height/2,d=(x-t)/t,f=(L-n)/n;u.style.transform=`translate(${d*25}px, ${f*25}px) scale(1.05)`,u.style.boxShadow="0 20px 50px rgba(115, 140, 255, 0.35), 0 0 40px rgba(115, 140, 255, 0.2)"}),m.addEventListener("mouseleave",()=>{u.style.transform="translate(0px, 0px) scale(1)",u.style.boxShadow=""}))}window.MindFlowLanding={init:function(){C(),P(),B(),b()},destroy:function(){r&&(clearInterval(r),r=null)}}})();(function(){const C=window.location.protocol==="file:",r={"/":`
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
                            <div class="hero-buttons animate-fade-in stagger-4" style="margin-bottom: 2.5rem;">
                                <a href="/ai-companion" class="action-btn" data-route="/ai-companion">Start Journey</a>
                                <a href="#features-preview" class="secondary-btn" id="explore-features-btn">Explore Features</a>
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
                        <p class="section-desc" style="max-width: 600px; margin: 0.5rem auto 2.2rem auto; color: var(--color-text-secondary); font-size: 0.95rem;">MindFlow AI helps students understand workload, focus better, and reduce stress.</p>
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
        `};function P(){if(C){const o=window.location.hash;return o&&o.substring(1)||"/"}else return window.location.pathname||"/"}function B(o){C?window.location.hash=o:(window.history.pushState(null,null,o),b(o))}function b(o){let x=o;x.endsWith("index.html")&&(x="/"),r[x]||(x="/");const t=document.getElementById("app").querySelector(".router-view-page");t?(t.classList.add("page-exit"),setTimeout(()=>{m(x)},300)):m(x)}function m(o){const x=document.getElementById("app");x.innerHTML=r[o];const L=o==="/"?"home":o.substring(1);document.body.setAttribute("data-theme",L);const t=document.getElementById("nav-breadcrumbs");if(o==="/")t.innerHTML='<a href="/" class="breadcrumb-link" id="breadcrumb-home">MindFlow AI</a>';else{const d={"/burnout-detection":"Burnout Detection","/study-planner":"Smart Study Planner","/mood-analytics":"Mood Analytics","/focus-tracking":"Focus Tracking","/ai-companion":"AI Companion","/predictive-insights":"Predictive Insights"}[o]||"Feature";t.innerHTML=`
                <a href="/" class="breadcrumb-link">MindFlow AI</a>
                <span class="breadcrumb-separator">&gt;</span>
                <a href="/" class="breadcrumb-link" id="breadcrumb-features">Features</a>
                <span class="breadcrumb-separator">&gt;</span>
                <span class="breadcrumb-active">${d}</span>
            `;const f=document.getElementById("breadcrumb-features");f&&f.addEventListener("click",s=>{s.preventDefault(),window.shouldScrollToFeatures=!0,B("/")})}window.scrollTo({top:0,behavior:"instant"}),u(o)}function u(o){R(),window.MindFlowEffects&&window.MindFlowEffects.changeTheme(o),o==="/"?(window.MindFlowLanding&&window.MindFlowLanding.init(),window.shouldScrollToFeatures&&(window.shouldScrollToFeatures=!1,setTimeout(()=>{const x=document.getElementById("features-preview");x&&x.scrollIntoView({behavior:"smooth"})},350))):window.MindFlowFeatures&&window.MindFlowFeatures.init(o)}function R(){document.querySelectorAll("[data-route], a").forEach(L=>{if(L.dataset.listenerBound)return;const t=L.getAttribute("data-route")||L.getAttribute("href");t&&(t.startsWith("/")||t.startsWith("#/"))&&(L.addEventListener("click",n=>{n.preventDefault();let d=t;d.startsWith("#/")&&(d=d.substring(1)),B(d)}),L.dataset.listenerBound="true")});const o=document.getElementById("explore-features-btn");o&&o.addEventListener("click",L=>{L.preventDefault();const t=document.getElementById("features-preview");t&&t.scrollIntoView({behavior:"smooth"})});const x=document.getElementById("explore-features-btn-footer");x&&x.addEventListener("click",L=>{L.preventDefault();const t=document.getElementById("features-preview");t&&t.scrollIntoView({behavior:"smooth"})})}window.addEventListener("popstate",()=>{b(P())}),window.addEventListener("hashchange",()=>{C&&b(P())}),window.MindFlowRouter={navigate:B,getRoute:P,init:function(){const o=P();C&&!window.location.hash&&(window.location.hash="#/"),b(o)}},document.addEventListener("DOMContentLoaded",()=>{window.MindFlowRouter.init()})})();
