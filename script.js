const EVENTS=[
{id:1,name:"CodeStorm Hackathon",cat:"Technical",day:"Day 1",time:"9:00 AM",venue:"CS Lab Block",desc:"A 12-hour team build challenge."},
{id:2,name:"Capture the Flag",cat:"Technical",day:"Day 1",time:"2:00 PM",venue:"Cyber Lab",desc:"Solve security puzzles against the clock."},
{id:3,name:"Battle of Bands",cat:"Cultural",day:"Day 2",time:"6:00 PM",venue:"Open Air Stage",desc:"College bands compete live."},
{id:4,name:"Classical Dance Showcase",cat:"Cultural",day:"Day 2",time:"10:00 AM",venue:"Main Auditorium",desc:"Solo and group performances."},
{id:5,name:"Inter-Dept Cricket",cat:"Sports",day:"Day 2",time:"8:00 AM",venue:"College Ground",desc:"Knockout tournament between departments."},
{id:6,name:"Quiz League",cat:"Technical",day:"Day 3",time:"11:00 AM",venue:"Seminar Hall",desc:"Tech and general knowledge rounds."},
{id:7,name:"Fashion Walk",cat:"Cultural",day:"Day 3",time:"5:00 PM",venue:"Main Auditorium",desc:"Theme-based ramp show."},
{id:8,name:"Badminton Doubles",cat:"Sports",day:"Day 3",time:"9:00 AM",venue:"Indoor Court",desc:"Open doubles bracket."}];
const NEWS=["Registrations close on 10 March.","Hackathon teams may have up to 4 members.","Free shuttle from the main gate on all three days."];
const COLORS=["#e4572e","#0f766e","#6d28d9","#b45309","#be123c","#1d4ed8","#4d7c0f","#c2410c"];
const GAL=[["Opening Night","🎆"],["Hackathon","💻"],["Dance","💃"],["Band Battle","🎸"],["Cricket Final","🏏"],["Quiz","🧠"],["Ramp Walk","👗"],["Prize Day","🏆"]].map(([t,e])=>({t,e}));
const regs=[];
const $=s=>document.querySelector(s), app=$("#app");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pages={
home(){return `<section class="college"><div class="crest">PEC</div><div><h2>Prathyusha Engineering College</h2><p>Thiruvallur District, Tamil Nadu · Approved by AICTE · Affiliated to Anna University</p>
<div class="chips"><span>Dept. of Cyber Security presents</span><span>14–16 March 2026</span><span>Open to all departments</span></div></div></section><section class="hero"><h1>Three days.<br>Eight events.<br>One campus.</h1>
<p>Spectra is the annual fest of Prathyusha Engineering College, Thiruvallur, Tamil Nadu. Students from all departments compete in technical, cultural and sports events. Browse events, register, and check the schedule.</p>
<button class="btn" data-go="register">Register now</button><button class="btn alt" data-go="events">See events</button></section>
<h2>Announcements</h2>${NEWS.map(n=>`<div class="notice">${esc(n)}</div>`).join("")}
<h2 style="margin-top:2rem">Schedule</h2><div class="scroll"><table><tr><th>Day</th><th>Time</th><th>Event</th><th>Venue</th></tr>
${EVENTS.slice().sort((a,b)=>a.day.localeCompare(b.day)).map(e=>`<tr><td>${e.day}</td><td>${e.time}</td><td>${esc(e.name)}</td><td>${esc(e.venue)}</td></tr>`).join("")}</table></div>`},
events(){return `<h2>Events</h2><div class="filters" id="f">${["All","Technical","Cultural","Sports"].map((c,i)=>`<button class="${i?"":"on"}" data-c="${c}">${c}</button>`).join("")}</div><div class="grid" id="list"></div>`},
register(){return `<h2>Event registration</h2><div id="rbox"><form id="rf" novalidate>
<label>Full name<input name="name" autocomplete="name"><span class="err"></span></label>
<label>Email<input name="email" type="email" autocomplete="email"><span class="err"></span></label>
<label>Phone<input name="phone" type="tel" inputmode="numeric" autocomplete="tel"><span class="err"></span></label>
<label>Department<select name="dept"><option value="">Choose department</option><option>Cyber Security</option><option>Computer Science</option><option>Information Technology</option><option>AI &amp; Data Science</option><option>Electronics &amp; Communication</option><option>Electrical &amp; Electronics</option><option>Mechanical</option><option>Civil</option><option>Other</option></select><span class="err"></span></label>
<label>College / Roll number<input name="roll" autocomplete="off"><span class="err"></span></label><label>Year of study<select name="year"><option value="">Choose year</option><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option></select><span class="err"></span></label><label>Event<select name="event"><option value="">Choose event</option>${EVENTS.map(e=>`<option>${esc(e.name)}</option>`).join("")}</select><span class="err"></span></label>
<button class="btn" type="submit">Register</button></form></div>`},
about(){return `<h2>About the college</h2><p>Prathyusha Engineering College is an engineering institution in Thiruvallur District, Tamil Nadu, offering B.E. and B.Tech programmes across engineering departments.</p>
<div class="facts"><div class="card"><h3>Organised by</h3><p>Department of Cyber Security with the student council.</p></div><div class="card"><h3>Who can join</h3><p>All students of the college. Inter-college entries need a college ID card.</p></div><div class="card"><h3>Venue</h3><p>Prathyusha Engineering College campus, Thiruvallur District. Follow signboards from the main gate.</p></div></div>
<h2>Festival rules</h2><div class="notice">Carry your college ID card to every event.</div><div class="notice">Register before 10 March. Walk-in entries depend on seats.</div><div class="notice">Judges' decisions are final.</div>`},
gallery(){return `<h2>Gallery</h2><p>Highlights from the fest. Add your own college photos below.</p>
<div class="upl"><label class="btn" style="display:inline-block">Add photos<input type="file" id="up" accept="image/*" multiple hidden></label></div>
<div class="gallery">${GAL.map((g,i)=>`<button class="tile" data-i="${i}" aria-label="${g.t}" style="background:linear-gradient(135deg,${COLORS[i%8]},#14213d)">${g.src?`<img class="photo" src="${g.src}" alt="${g.t}">`:`<span class="e">${g.e}</span>`}<span class="t">${g.t}</span></button>`).join("")}</div>`},
contact(){return `<h2>Contact us</h2><p>Spectra Organising Committee, Prathyusha Engineering College: <a href="mailto:spectra@prathyusha.edu.in">spectra@prathyusha.edu.in</a> · Helpline: +91 00000 00000</p><div id="cbox"><form id="cf" novalidate>
<label>Name<input name="name"><span class="err"></span></label>
<label>Email<input name="email" type="email"><span class="err"></span></label>
<label>Message<textarea name="msg" rows="4"></textarea><span class="err"></span></label>
<button class="btn" type="submit">Send message</button></form></div>`}
};
function show(p){
  if(!pages[p])p="home";
  app.innerHTML=pages[p]();
  document.querySelectorAll("nav button").forEach(b=>b.toggleAttribute("aria-current",b.dataset.p===p)||b.removeAttribute("aria-current"));
  document.querySelectorAll("nav button").forEach(b=>{if(b.dataset.p===p)b.setAttribute("aria-current","page")});
  if(p==="events")drawEvents("All");
  if(p==="gallery")$("#up").onchange=ev=>{[...ev.target.files].forEach(f=>{const r=new FileReader();r.onload=()=>{GAL.unshift({t:"My photo",src:r.result});show("gallery")};r.readAsDataURL(f)})};
  if(p==="register")$("#rf").onsubmit=e=>submit(e,"reg");
  if(p==="contact")$("#cf").onsubmit=e=>submit(e,"contact");
  window.scrollTo(0,0);
  try{history.replaceState(null,"","#"+p)}catch(e){}
}
function drawEvents(c){
  $("#list").innerHTML=EVENTS.filter(e=>c==="All"||e.cat===c).map(e=>`<article class="card"><span class="tag">${e.cat}</span><h3>${esc(e.name)}</h3><p>${esc(e.desc)}</p><small>${e.day}, ${e.time} · ${esc(e.venue)}</small><p><button class="btn" data-reg="${esc(e.name)}">Register</button></p></article>`).join("");
}
function submit(e,kind){
  e.preventDefault();
  const f=e.target,d=Object.fromEntries(new FormData(f));let ok=true;
  const rules={name:v=>v.trim().length>=2||"Enter your full name.",
    email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||"Enter a valid email like name@prathyusha.edu.in.",
    phone:v=>/^\d{10}$/.test(v.replace(/\s/g,""))||"Enter a 10-digit phone number.",
    dept:v=>!!v||"Choose your department.",year:v=>!!v||"Choose your year.",roll:v=>v.trim().length>=3||"Enter your roll number.",event:v=>!!v||"Choose an event.",
    msg:v=>v.trim().length>=10||"Write at least 10 characters."};
  f.querySelectorAll("[name]").forEach(i=>{const r=rules[i.name](i.value),s=i.parentElement.querySelector(".err");
    s.textContent=r===true?"":r;if(r!==true)ok=false});
  if(!ok){f.querySelector(".err:not(:empty)").previousElementSibling.focus();return}
  if(kind==="reg"){regs.push(d);$("#rbox").innerHTML=`<div class="ok" role="status"><strong>You're registered, ${esc(d.name)}.</strong><br>Event: ${esc(d.event)}. Confirmation will go to ${esc(d.email)}.</div>`}
  else $("#cbox").innerHTML=`<div class="ok" role="status">Thanks ${esc(d.name)}, your message was sent. We'll reply soon.</div>`;
}
document.addEventListener("click",e=>{
  const t=e.target.closest("button");if(!t)return;
  if(t.dataset.p)show(t.dataset.p);
  else if(t.dataset.go)show(t.dataset.go);
  else if(t.dataset.c){document.querySelectorAll("#f button").forEach(b=>b.classList.toggle("on",b===t));drawEvents(t.dataset.c)}
  else if(t.dataset.reg){show("register");$("#rf").event.value=t.dataset.reg}
  else if(t.dataset.i){const i=+t.dataset.i;const g=GAL[i];$("#dbig").style.background=g.src?`center/cover url(${g.src})`:`linear-gradient(135deg,${COLORS[i%8]},#14213d)`;$("#dbig").textContent=g.src?"":g.e+" "+g.t;$("#dtxt").textContent=g.t;$("#dlg").showModal()}
  else if(t.id==="dclose")$("#dlg").close();
});
show(location.hash.slice(1)||"home");