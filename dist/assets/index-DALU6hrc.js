(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))P(d);new MutationObserver(d=>{for(const n of d)if(n.type==="childList")for(const B of n.addedNodes)B.tagName==="LINK"&&B.rel==="modulepreload"&&P(B)}).observe(document,{childList:!0,subtree:!0});function L(d){const n={};return d.integrity&&(n.integrity=d.integrity),d.referrerPolicy&&(n.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?n.credentials="include":d.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function P(d){if(d.ep)return;d.ep=!0;const n=L(d);fetch(d.href,n)}})();(function(){const k=document.getElementById("particles-canvas");if(!k)return;const t=k.getContext("2d");let L=k.width=window.innerWidth,P=k.height=window.innerHeight;const d=[],n=[],B=60,W=6,c={home:{primary:"rgba(82, 140, 111, 0.12)",alt:"rgba(200, 192, 180, 0.12)",spark:"#528c6f"},"ai-companion":{primary:"rgba(79, 70, 229, 0.12)",alt:"rgba(139, 92, 246, 0.12)",spark:"#4f46e5"},"focus-tracking":{primary:"rgba(107, 114, 128, 0.12)",alt:"rgba(180, 176, 167, 0.12)",spark:"#6b7280"},"mood-analytics":{primary:"rgba(168, 85, 247, 0.12)",alt:"rgba(236, 72, 153, 0.12)",spark:"#a855f7"},"burnout-detection":{primary:"rgba(99, 102, 241, 0.12)",alt:"rgba(6, 182, 212, 0.12)",spark:"#6366f1"},"study-planner":{primary:"rgba(2, 132, 199, 0.12)",alt:"rgba(16, 185, 129, 0.12)",spark:"#0284c7"},"predictive-insights":{primary:"rgba(8, 145, 178, 0.12)",alt:"rgba(5, 150, 105, 0.12)",spark:"#0891b2"}};let v=c.home;class e{constructor(){this.reset()}reset(){this.x=Math.random()*L,this.y=Math.random()*P,this.size=Math.random()*1+.4,this.speed=Math.random()*.15+.05,this.opacity=Math.random()*.6+.15,this.fadeSpeed=Math.random()*.004+.001,this.fadeDir=Math.random()>.5?1:-1}update(){this.y-=this.speed,this.x+=Math.sin(this.y*.01)*.12,(this.y<0||this.x<0||this.x>L)&&(this.reset(),this.y=P),this.opacity+=this.fadeSpeed*this.fadeDir,this.opacity>.8?this.fadeDir=-1:this.opacity<.1&&(this.fadeDir=1)}draw(){t.fillStyle=v.spark,t.globalAlpha=this.opacity,t.beginPath(),t.arc(this.x,this.y,this.size,0,Math.PI*2),t.fill()}}class o{constructor(){this.x=Math.random()*L,this.y=Math.random()*P,this.radius=Math.random()*40+20,this.vx=(Math.random()-.5)*.3,this.vy=(Math.random()-.5)*.3,this.angle=Math.random()*Math.PI*2,this.rotationSpeed=(Math.random()-.5)*.003,this.opacity=Math.random()*.15+.05,this.shape=Math.random()>.5?"circle":"poly",this.sides=Math.floor(Math.random()*3)+3}update(){this.vx*=.98,this.vy*=.98,this.x+=this.vx,this.y+=this.vy,this.angle+=this.rotationSpeed;const l=this.radius*1.5;this.x<-l&&(this.x=L+l),this.x>L+l&&(this.x=-l),this.y<-l&&(this.y=P+l),this.y>P+l&&(this.y=-l)}draw(){t.save(),t.translate(this.x,this.y),t.rotate(this.angle);const l=t.createRadialGradient(-10,-10,0,0,0,this.radius);if(l.addColorStop(0,v.alt),l.addColorStop(.5,"rgba(255, 255, 255, 0.01)"),l.addColorStop(1,v.primary),t.fillStyle=l,t.strokeStyle="rgba(255, 255, 255, 0.05)",t.lineWidth=1,t.globalAlpha=this.opacity,t.beginPath(),this.shape==="circle")t.arc(0,0,this.radius,0,Math.PI*2);else{for(let r=0;r<this.sides;r++){const b=r*Math.PI*2/this.sides,M=Math.cos(b)*this.radius,m=Math.sin(b)*this.radius;r===0?t.moveTo(M,m):t.lineTo(M,m)}t.closePath()}t.fill(),t.stroke(),t.beginPath(),t.strokeStyle="rgba(255, 255, 255, 0.12)",this.shape==="circle"?t.arc(0,0,this.radius,Math.PI*1.25,Math.PI*1.75):(t.moveTo(Math.cos(Math.PI*1.2)*this.radius,Math.sin(Math.PI*1.2)*this.radius),t.lineTo(Math.cos(Math.PI*1.8)*this.radius,Math.sin(Math.PI*1.8)*this.radius)),t.stroke(),t.restore()}}function p(){d.length=0,n.length=0;for(let i=0;i<B;i++)d.push(new e);for(let i=0;i<W;i++)n.push(new o)}function f(){t.clearRect(0,0,L,P),t.globalAlpha=1,d.forEach(i=>{i.update(),i.draw()}),n.forEach(i=>{i.update(),i.draw()}),requestAnimationFrame(f)}function S(i){const l=(i.clientX-window.innerWidth/2)/(window.innerWidth/2),r=(i.clientY-window.innerHeight/2)/(window.innerHeight/2);i.clientX,i.clientY;const b=document.querySelector(".bg-layer-far"),M=document.querySelector(".bg-layer-mid"),m=document.querySelector(".bg-layer-fore");b&&(b.style.transform=`translate(${l*-4}px, ${r*-4}px)`),M&&(M.style.transform=`translate(${l*-12}px, ${r*-12}px)`),m&&(m.style.transform=`translate(${l*-20}px, ${r*-20}px)`)}window.addEventListener("mousemove",S),window.addEventListener("mouseleave",()=>{[".bg-layer-far",".bg-layer-mid",".bg-layer-fore"].forEach(l=>{const r=document.querySelector(l);r&&(r.style.transform="translate(0px, 0px)")})}),window.addEventListener("resize",()=>{L=k.width=window.innerWidth,P=k.height=window.innerHeight,p()}),window.MindMapEffects={init:function(){p(),f()},changeTheme:function(i){let l=i==="/"?"home":i.substring(1);c[l]?v=c[l]:v=c.home}},window.MindMapEffects.init()})();(function(){let k=[],t=[];function L(){k.forEach(clearInterval),k=[],t.forEach(cancelAnimationFrame),t=[]}function P(){const e=document.getElementById("stress-input"),o=document.getElementById("stress-val"),p=document.getElementById("hours-input"),f=document.getElementById("hours-val"),S=document.getElementById("generate-advice-btn"),i=document.getElementById("reset-companion-btn"),l=document.getElementById("companion-form"),r=document.getElementById("companion-results"),b=document.getElementById("thinking-indicator"),M=document.getElementById("results-grid");!e||!S||(e.addEventListener("input",()=>{o.textContent=e.value}),p.addEventListener("input",()=>{f.textContent=p.value}),S.addEventListener("click",()=>{const m=parseInt(e.value),C=parseInt(p.value),I=parseInt(document.getElementById("assignments-input").value)||0;parseInt(document.getElementById("hackathons-input").value);const z=document.getElementById("mood-input").value;document.getElementById("bother-input").value.trim(),l.style.display="none",r.style.display="block",b.style.display="flex",M.innerHTML="";const F=setTimeout(()=>{b.style.display="none";let x="Stable Flow",g=15;m>7?(x="High Burnout Alert",g=85):(m>4||I>4)&&(x="Elevated Cognitive Load",g=55);let u="";m>7?u=`Your stress index is critical (${m}/10) with ${I} deadlines pending. Immediately isolate your priority tasks. We advise canceling secondary milestones and deferring non-urgent submissions.`:I>3?u=`You have ${I} assignments stacked. Schedule sequential deep study blocks of 45 minutes using Vercel/Linear focus sprints to distribute workload.`:u="Current load levels look solid. Maintain a steady study pace and protect evening slots to preserve cognitive energy.";let h="Engage a 25-minute Pomodoro block followed by a 5-minute breathing break.";m>7?h="Switch to a 15-minute high-focus interval with 10-minute active recovery breaks.":z==="focused"&&(h="Engage a 50-minute deep flow block with a 10-minute integration break.");let a="Block 9:00 AM - 11:30 AM tomorrow for deep reading. Avoid screens after 10 PM.";C>8&&(a="You've logged high study hours today. Suspend cognitive tasks for the next 4 hours and prioritize physical rest."),[{title:"Stress Risk Diagnostics",content:`${x} (${g}% Risk Indicator)`},{title:"Recommended Action Plan",content:u},{title:"Suggested Focus Routine",content:h},{title:"Adaptive Study Slot Plan",content:a}].forEach((w,y)=>{const T=setTimeout(()=>{const A=document.createElement("div");A.className="glass-card advice-card",A.innerHTML=`
                            <div class="advice-title">${w.title}</div>
                            <div class="advice-content" id="card-content-${y}"></div>
                        `,M.appendChild(A),A.getBoundingClientRect(),A.classList.add("show"),d(document.getElementById(`card-content-${y}`),w.content,0)},y*800);k.push(T)})},1800);k.push(F)}),i.addEventListener("click",()=>{r.style.display="none",l.style.display="block",M.innerHTML=""}))}function d(e,o,p){if(p<o.length){e.innerHTML+=o.charAt(p);const f=setTimeout(()=>{d(e,o,p+1)},15);k.push(f)}}function n(){const e=document.getElementById("timer-display"),o=document.getElementById("timer-status"),p=document.getElementById("timer-progress"),f=document.getElementById("timer-start-btn"),S=document.getElementById("timer-pause-btn"),i=document.getElementById("timer-reset-btn"),l=document.getElementById("timer-end-btn"),r=document.getElementById("focus-message"),b=document.querySelectorAll(".preset-btn"),M=document.getElementById("apply-custom-timer");if(!e||!p)return;let m=1500,C=m,I=null;const z=628;function F(a){const s=z-a*z;p.style.strokeDashoffset=s}function x(){const a=Math.floor(C/3600),s=Math.floor(C%3600/60),w=C%60;let y="";a>0?y=`${a.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}:${w.toString().padStart(2,"0")}`:y=`${s.toString().padStart(2,"0")}:${w.toString().padStart(2,"0")}`,e.textContent=y;const T=C/m;F(T)}function g(){if(I)return;f.style.display="none",S.style.display="block",l.style.display="block",o.textContent="Flow Session Active",r.textContent="Deep focus active. Minimize device distractions.";const a=new Date(Date.now()+C*1e3),s=a.getHours()%12||12,w=a.getMinutes().toString().padStart(2,"0"),y=a.getHours()>=12?"PM":"AM";r.textContent+=` Estimated end time: ${s}:${w} ${y}.`,I=setInterval(()=>{C--,x(),C<=0&&(clearInterval(I),I=null,o.textContent="Flow Complete",r.textContent="Session completed successfully. Stand up and stretch!",f.style.display="block",S.style.display="none",l.style.display="none",F(0))},1e3),k.push(I)}function u(){I&&(clearInterval(I),I=null,f.style.display="block",S.style.display="none",o.textContent="Session Paused",r.textContent="Timer paused. Resume when you're ready to focus.")}function h(){u(),C=m,x(),o.textContent="Flow State Ready",r.textContent="Ready to focus? Choose a duration and launch.",l.style.display="none",F(1)}b.forEach(a=>{a.addEventListener("click",()=>{b.forEach(s=>s.classList.remove("active")),a.classList.add("active"),m=parseInt(a.getAttribute("data-time")),h()})}),M&&M.addEventListener("click",()=>{b.forEach(w=>w.classList.remove("active"));const a=parseInt(document.getElementById("custom-hours").value)||0,s=parseInt(document.getElementById("custom-minutes").value)||0;a===0&&s===0||(m=a*3600+s*60,h())}),f.addEventListener("click",g),S.addEventListener("click",u),i.addEventListener("click",h),l.addEventListener("click",()=>{h(),r.textContent="Session terminated early. Rest logs saved."}),x(),F(1)}function B(){const e=document.querySelectorAll(".mood-btn"),o=document.getElementById("active-mood-display"),p=document.querySelector(".wave-p1"),f=document.querySelector(".wave-p2"),S=document.getElementById("mood-wave-card"),i=document.getElementById("large-ring-fill"),l=document.getElementById("large-ring-pct");if(!e.length||!p||!f||!S)return;let r=12,b=.02,M=0,m=.03;const C={calm:{gradient:"linear-gradient(180deg, rgba(82, 140, 111, 0.08) 0%, var(--color-bg) 85%)",color:"#528c6f",colorAlt:"#34d399"},focused:{gradient:"linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, var(--color-bg) 85%)",color:"#38bdf8",colorAlt:"#60a5fa"},fatigued:{gradient:"linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, var(--color-bg) 85%)",color:"#f59e0b",colorAlt:"#d97706"},overloaded:{gradient:"linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--color-bg) 85%)",color:"#ef4444",colorAlt:"#ec4899"},deepflow:{gradient:"linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, var(--color-bg) 85%)",color:"#a855f7",colorAlt:"#c084fc"}};function I(g,u,h,a,s,w){if(r=a,b=s,m=w,o.textContent=u,i){const T=264-264*(h/100);i.style.strokeDashoffset=T,i.style.transition="stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)"}l&&(l.textContent=h+"%");const y=C[g];y&&(S.style.background=y.gradient,S.style.setProperty("--color-accent",y.color),S.style.setProperty("--color-accent-alt",y.colorAlt),i&&(i.style.stroke=y.color)),o.style.transform="scale(1.08)",setTimeout(()=>o.style.transform="scale(1)",200)}e.forEach(g=>{g.addEventListener("click",()=>{e.forEach(T=>T.classList.remove("active")),g.classList.add("active");const u=g.getAttribute("data-mood"),h=g.getAttribute("data-label"),a=parseInt(g.getAttribute("data-energy")),s=parseFloat(g.getAttribute("data-amp")),w=parseFloat(g.getAttribute("data-freq")),y=parseFloat(g.getAttribute("data-speed"));I(u,h,a,s,w,y)})});function z(){M+=m;const g=40,u=400/g;let h="M 0 90",a="M 0 90";for(let w=0;w<=g;w++){const y=w*u,T=90+Math.sin(y*b+M)*r,A=90+Math.sin(y*(b*1.2)-M)*(r*.8);h+=` L ${y} ${T}`,a+=` L ${y} ${A}`}h+=" L 400 180 L 0 180 Z",a+=" L 400 180 L 0 180 Z",p.setAttribute("d",h),f.setAttribute("d",a);const s=requestAnimationFrame(z);t.push(s)}const F=document.querySelectorAll(".mood-chart-dot"),x=document.getElementById("chart-tooltip");F.length&&x&&F.forEach(g=>{g.addEventListener("mouseenter",()=>{x.textContent=g.getAttribute("data-info"),x.style.color="var(--color-text-primary)"}),g.addEventListener("mouseleave",()=>{x.textContent="Hover over data points to inspect mood history",x.style.color=""})}),I("calm","Calm",75,12,.02,.03),z()}function W(){const e=document.getElementById("sleep-input-burn"),o=document.getElementById("sleep-val-burn"),p=document.getElementById("stress-input-burn"),f=document.getElementById("stress-val-burn"),S=document.getElementById("deadlines-input-burn"),i=document.getElementById("deadlines-val-burn"),l=document.getElementById("burnout-score-badge"),r=document.getElementById("burnout-risk-level"),b=document.getElementById("burnout-risk-text"),M=document.getElementById("burnout-energy-val"),m=document.getElementById("burnout-energy-bar"),C=document.getElementById("brain-canvas");if(!e||!C)return;let I=parseFloat(e.value),z=parseInt(p.value),F=parseInt(S.value),x=42,g=1;const u=C.getContext("2d"),h=C.width=260,a=C.height=220,s=[{x:70,y:110,pulseOffset:0},{x:90,y:70,pulseOffset:.5},{x:130,y:55,pulseOffset:1.2},{x:180,y:75,pulseOffset:.8},{x:200,y:110,pulseOffset:2.1},{x:170,y:140,pulseOffset:1.5},{x:130,y:170,pulseOffset:.3},{x:100,y:140,pulseOffset:1.9},{x:120,y:100,pulseOffset:.9},{x:150,y:110,pulseOffset:1.4},{x:140,y:80,pulseOffset:2.4},{x:110,y:75,pulseOffset:1.7}];e.addEventListener("input",()=>{I=parseFloat(e.value),o.textContent=I,w()}),p.addEventListener("input",()=>{z=parseInt(p.value),f.textContent=z,w()}),S.addEventListener("input",()=>{F=parseInt(S.value),i.textContent=F,w()});function w(){x=Math.round(z*6.5+F*5.5-I*4.5+30),x=Math.max(5,Math.min(95,x)),l.textContent=`${x}%`;const A=Math.max(100-x,8);M.textContent=`${A}%`,m.style.width=`${A}%`,m.className="progress-bar-fill",x>70?(m.classList.add("critical"),r.textContent="Critical Burnout Risk",r.style.color="#ef4444",b.textContent="Workload exceeds mental margins. Immediately reduce tasks and prioritize rest.",g=3.5):x>40?(m.classList.add("warning"),r.textContent="Elevated Fatigue Alert",r.style.color="#f59e0b",b.textContent="Moderate cognitive strain. Consider scheduling buffer tasks and protecting sleep.",g=1.8):(m.classList.add("normal"),r.textContent="Optimal Flow Stable",r.style.color="var(--color-accent)",b.textContent="Mental metrics are steady. Maintain present work-rest ratios.",g=.8)}let y=0;function T(){u.clearRect(0,0,h,a),y+=.05*g,u.strokeStyle=x>70?"rgba(239, 68, 68, 0.15)":"rgba(var(--color-accent-rgb), 0.12)",u.lineWidth=1.2;for(let E=0;E<s.length;E++)for(let H=E+1;H<s.length;H++){const $=s[E].x-s[H].x,R=s[E].y-s[H].y;Math.sqrt($*$+R*R)<80&&(u.beginPath(),u.moveTo(s[E].x,s[E].y),u.lineTo(s[H].x,s[H].y),u.stroke())}s.forEach(E=>{const $=3+Math.abs(Math.sin(y+E.pulseOffset))*7,R=u.createRadialGradient(E.x,E.y,0,E.x,E.y,$);x>70?(R.addColorStop(0,"rgba(239, 68, 68, 0.8)"),R.addColorStop(1,"rgba(239, 68, 68, 0)")):x>40?(R.addColorStop(0,"rgba(245, 158, 11, 0.7)"),R.addColorStop(1,"rgba(245, 158, 11, 0)")):(R.addColorStop(0,"rgba(var(--color-accent-rgb), 0.7)"),R.addColorStop(1,"rgba(var(--color-accent-rgb), 0)")),u.fillStyle=R,u.beginPath(),u.arc(E.x,E.y,$,0,Math.PI*2),u.fill(),u.fillStyle=x>70?"#ef4444":x>40?"#f59e0b":"var(--color-text-primary)",u.beginPath(),u.arc(E.x,E.y,2.5,0,Math.PI*2),u.fill()});const A=document.getElementById("burnout-results-card");A&&!A.classList.contains("show")&&A.classList.add("show");const D=requestAnimationFrame(T);t.push(D)}w(),T()}function c(){const e=document.getElementById("planner-generate-btn"),o=document.getElementById("planner-assignments-input"),p=document.getElementById("planner-hackathons-input"),f=document.getElementById("planner-hours-input"),S=document.getElementById("planner-empty"),i=document.getElementById("planner-loader"),l=document.getElementById("planner-loader-text"),r=document.getElementById("planner-schedule-grid");!e||!S||!i||!r||e.addEventListener("click",()=>{const b=Math.max(0,parseInt(o.value)||0),M=Math.max(0,parseInt(p.value)||0),m=Math.max(1,parseInt(f.value)||0);S.style.display="none",r.style.display="none",i.style.display="flex",l.textContent="Analyzing deadline congestion...";let C=setTimeout(()=>{l.textContent="Allocating active focus blocks..."},600),I=setTimeout(()=>{l.textContent="Integrating sleep recovery buffers..."},1200),z=setTimeout(()=>{i.style.display="none",r.style.display="grid";const F=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];r.innerHTML="";const x=Math.round(m/7*10)/10;F.forEach((u,h)=>{let a=[],s=0;h===0?(a.push({time:"09:00 AM",name:"Calculus Quiz Prep",type:"Focus",priority:"high"}),s+=2,b>=1&&(a.push({time:"01:00 PM",name:"Assignment 1 Coding",type:"Work",priority:"med"}),s+=2)):h===1?(b>=2&&(a.push({time:"10:00 AM",name:"Chemistry Lab Draft",type:"Work",priority:"high"}),s+=2.5),a.push({time:"03:00 PM",name:"Review Lecture Stats",type:"Review",priority:"low"}),s+=1):h===2?(b>=3&&(a.push({time:"11:00 AM",name:"History Essay Outline",type:"Work",priority:"med"}),s+=2),a.push({time:"04:00 PM",name:"Focus Sprint pomodoro",type:"Focus",priority:"low"}),s+=1.5):h===3?(b>=4&&(a.push({time:"09:00 AM",name:"Physics Problem Sheet",type:"Work",priority:"high"}),s+=3),a.push({time:"02:00 PM",name:"Syllabus Synapse Sync",type:"Review",priority:"low"}),s+=1):h===4?b>=5?(a.push({time:"10:00 AM",name:"Coding Lab Submission",type:"Work",priority:"high"}),s+=2.5):(a.push({time:"02:00 PM",name:"Buffer Rest Window",type:"Decompress",priority:"low"}),s+=1):h===5?M>=1?(a.push({time:"09:00 AM",name:"Hackathon Phase 1 Build",type:"Hackathon",priority:"high"}),s+=5):(a.push({time:"10:00 AM",name:"Deep Work Side Project",type:"Focus",priority:"med"}),s+=3):h===6&&(M>=2&&(a.push({time:"10:00 AM",name:"Hackathon Pitch Draft",type:"Hackathon",priority:"high"}),s+=4),a.push({time:"04:00 PM",name:"Sleep Recovery Buffer",type:"Decompress",priority:"low"}),s+=2);const w=Math.min(s,Math.round(x*10)/10);let y="status-optimal",T="Optimal";w>4?(y="status-congested",T="Congested"):w>2.5&&(y="status-moderate",T="Moderate");let A="";a.length===0?A='<div class="planner-day-empty-text">Rest & Recovery</div>':a.forEach(E=>{A+=`
                                <div class="planner-task-card priority-${E.priority}">
                                    <div class="task-card-time">${E.time}</div>
                                    <div class="task-card-name">${E.name}</div>
                                    <div class="task-card-type">${E.type}</div>
                                </div>
                            `});const D=document.createElement("div");D.className="planner-day-col",D.style.opacity="0",D.style.transform="translateY(15px)",D.innerHTML=`
                        <div class="planner-day-header">
                            <span class="day-name">${u}</span>
                            <span class="day-badge ${y}">${w}h (${T})</span>
                        </div>
                        <div class="planner-day-tasks">
                            ${A}
                        </div>
                    `,r.appendChild(D)}),document.querySelectorAll(".planner-day-col").forEach((u,h)=>{let a=setTimeout(()=>{u.style.opacity="1",u.style.transform="translateY(0)",u.style.transition="all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"},h*80);k.push(a)})},1700);k.push(C,I,z)})}function v(){const e=document.querySelectorAll(".timeline-node"),o=document.getElementById("timeline-tooltip"),p=document.getElementById("tooltip-title"),f=document.getElementById("tooltip-risk"),S=document.getElementById("tooltip-desc");!e.length||!o||e.forEach(i=>{i.addEventListener("click",()=>{e.forEach(m=>m.classList.remove("active")),i.classList.add("active");const l=i.getAttribute("data-title"),r=i.getAttribute("data-risk"),b=i.getAttribute("data-desc");o.classList.remove("show");const M=setTimeout(()=>{p.textContent=l,S.textContent=b,f.textContent=`${r.toUpperCase()} RISK`,f.className="tooltip-risk",r==="low"?f.classList.add("risk-low"):r==="med"?f.classList.add("risk-med"):f.classList.add("risk-high"),o.classList.add("show")},200);k.push(M)})})}window.MindMapFeatures={init:function(e){L(),e==="/ai-companion"?P():e==="/focus-tracking"?n():e==="/mood-analytics"?B():e==="/burnout-detection"?W():e==="/study-planner"?c():e==="/predictive-insights"&&v()}}})();(function(){function k(){document.querySelectorAll(".feature-card").forEach(n=>{n.addEventListener("mousemove",B=>{const W=n.getBoundingClientRect(),c=B.clientX-W.left,v=B.clientY-W.top;n.style.setProperty("--mouse-x",`${c}px`),n.style.setProperty("--mouse-y",`${v}px`);const e=W.width/2,o=W.height/2,p=-((v-o)/o)*8,f=(c-e)/e*8;n.style.transform=`rotateX(${p}deg) rotateY(${f}deg) translateY(-4px)`,n.style.boxShadow="0 15px 35px rgba(0, 0, 0, 0.5), 0 0 15px rgba(var(--color-accent-rgb), 0.08)",n.style.borderColor="rgba(var(--color-accent-rgb), 0.2)"}),n.addEventListener("mouseleave",()=>{n.style.transform="rotateX(0deg) rotateY(0deg) translateY(0px)",n.style.boxShadow="",n.style.borderColor=""})})}let t=null;function L(){const d=document.querySelector(".side-card-num"),n=document.querySelectorAll(".side-card-num")[1];if(!d||!n)return;let B=34,W=82;t&&clearInterval(t),t=setInterval(()=>{const c=Math.floor(Math.random()*5)-2,v=Math.floor(Math.random()*3)-1;let e=B+c,o=W+v;e<25&&(e=25),e>45&&(e=45),o<75&&(o=75),o>90&&(o=90),d.textContent=`${e}%`,n.textContent=`${o}`},4e3)}function P(){const d=document.getElementById("story-trigger-btn"),n=document.getElementById("story-box");if(!d||!n)return;let B=!0;d.addEventListener("click",()=>{B?(d.disabled=!0,d.textContent="Analyzing Workload...",n.classList.remove("state-chaos","state-clear"),n.classList.add("state-analyzing"),setTimeout(()=>{n.classList.remove("state-analyzing"),n.classList.add("state-clear"),d.textContent="Reset Workload",d.disabled=!1,B=!1},1500)):(n.classList.remove("state-clear","state-analyzing"),n.classList.add("state-chaos"),d.textContent="Reorganize Workload",B=!0)})}window.MindMapLanding={init:function(){k(),L(),P()},destroy:function(){t&&(clearInterval(t),t=null)}}})();(function(){const k=window.location.protocol==="file:",t={"/":`
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
        `,"/ai-companion":`
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
        `,"/focus-tracking":`
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
        `,"/mood-analytics":`
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
        `,"/burnout-detection":`
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
        `,"/study-planner":`
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
        `,"/predictive-insights":`
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
        `};function L(){if(k){const c=window.location.hash;return c&&c.substring(1)||"/"}else return window.location.pathname||"/"}function P(c){k?window.location.hash=c:(window.history.pushState(null,null,c),d(c))}function d(c){let v=c;v.endsWith("index.html")&&(v="/"),t[v]||(v="/");const o=document.getElementById("app").querySelector(".router-view-page");o?(o.classList.add("page-exit"),setTimeout(()=>{n(v)},300)):n(v)}function n(c){const v=document.getElementById("app");v.innerHTML=t[c];const e=c==="/"?"home":c.substring(1);document.body.setAttribute("data-theme",e);const o=document.getElementById("nav-breadcrumbs");if(c==="/")o.innerHTML='<a href="/" class="breadcrumb-link" id="breadcrumb-home">MindMap AI</a>';else{const f={"/burnout-detection":"Burnout Detection","/study-planner":"Smart Study Planner","/mood-analytics":"Mood Analytics","/focus-tracking":"Focus Tracking","/ai-companion":"AI Companion","/predictive-insights":"Predictive Insights"}[c]||"Feature";o.innerHTML=`
                <a href="/" class="breadcrumb-link">MindMap AI</a>
                <span class="breadcrumb-separator">&gt;</span>
                <span class="breadcrumb-link" style="color:var(--color-text-secondary); cursor:default; pointer-events:none;">Features</span>
                <span class="breadcrumb-separator">&gt;</span>
                <span class="breadcrumb-active">${f}</span>
            `}window.scrollTo({top:0,behavior:"instant"}),B(c)}function B(c){W(),window.MindMapEffects&&window.MindMapEffects.changeTheme(c),c==="/"?window.MindMapLanding&&window.MindMapLanding.init():window.MindMapFeatures&&window.MindMapFeatures.init(c)}function W(){document.querySelectorAll("[data-route], a").forEach(v=>{if(v.dataset.listenerBound)return;const e=v.getAttribute("data-route")||v.getAttribute("href");e&&(e.startsWith("/")||e.startsWith("#/"))&&(v.addEventListener("click",o=>{o.preventDefault();let p=e;p.startsWith("#/")&&(p=p.substring(1)),P(p)}),v.dataset.listenerBound="true")});const c=document.getElementById("explore-features-btn");c&&c.addEventListener("click",v=>{v.preventDefault();const e=document.getElementById("features-preview");e&&e.scrollIntoView({behavior:"smooth"})})}window.addEventListener("popstate",()=>{d(L())}),window.addEventListener("hashchange",()=>{k&&d(L())}),window.MindMapRouter={navigate:P,getRoute:L,init:function(){const c=L();k&&!window.location.hash&&(window.location.hash="#/"),d(c)}},document.addEventListener("DOMContentLoaded",()=>{window.MindMapRouter.init()})})();
