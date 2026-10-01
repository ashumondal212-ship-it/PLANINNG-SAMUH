const DEMO={month:"2026-09",plans:[
["2026-09-01","Lucknow","ROZ39494","Milky Biscuit 20.47g",20.47,10.47],
["2026-09-02","Lucknow","ROZ23739","Orange Cream",8,1.01],
["2026-09-03","Lucknow","ROZ23738","Chocolate Cream",6,5.77],
["2026-09-04","Lucknow","ROZ23743","Butter Cookies",10.5,17.28],
["2026-09-05","Lucknow","ROZ23741","Coconut Cookies",34.61,26.28],
["2026-09-06","Lucknow","ROZ23742","Salty Sweety Biscuit",5,6.87],
["2026-09-07","Lucknow","ROZ36954","Butter Cashew",17.34,9.62],
["2026-09-08","Rudrapur","ROZ23742","Salty Sweety Biscuit",20,0],
["2026-09-09","Kathua","ROZ23741","Coconut Cookies",40,36],
["2026-09-10","Punjab","ROZ23759","Elaichi Rusk 65g",67,0]],materials:[
["Laminate",28168.84,110195.26],["BOPP",0,0],["Boxes",181005,320374]]};
let S=JSON.parse(localStorage.getItem("samuhS")||"null")||structuredClone(DEMO),H=JSON.parse(localStorage.getItem("samuhH")||"[]"),edit=-1,kind="";
const $=id=>document.getElementById(id), save=()=>{localStorage.setItem("samuhS",JSON.stringify(S));localStorage.setItem("samuhH",JSON.stringify(H));render()};
const num=x=>Number(x)||0, fmt=x=>num(x).toLocaleString("en-IN",{maximumFractionDigits:2}), esc=x=>String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function log(a,n,d){H.unshift({t:new Date().toLocaleString("en-IN"),a,n,d});save()}
function render(){
 $("month").value=S.month||"";$("kp").textContent=fmt(S.plans.reduce((a,p)=>a+num(p[4]),0))+" T";$("ka").textContent=fmt(S.plans.reduce((a,p)=>a+num(p[5]),0))+" T";$("kpl").textContent=new Set(S.plans.map(p=>p[1])).size;$("ks").textContent=S.materials.filter(m=>num(m[1])>num(m[2])).length;
 $("matCards").innerHTML=S.materials.map(m=>{let r=num(m[1]),a=num(m[2]),pc=r?Math.min(100,a/r*100):0;return `<div><b>${esc(m[0])}</b> <span class="status ${a>=r?"ready":"short"}">${r?(a>=r?"Ready":"Shortage"):"Source gap"}</span><div class="progress"><i style="width:${pc}%"></i></div><small>Required ${fmt(r)} · Available ${fmt(a)}</small></div><br>`}).join("");
 let P={};S.plans.forEach(p=>{P[p[1]]??=[0,0];P[p[1]][0]+=num(p[4]);P[p[1]][1]+=num(p[5])});$("plantRows").innerHTML=Object.entries(P).map(([n,v])=>`<tr><td>${esc(n)}</td><td>${fmt(v[0])}</td><td>${fmt(v[1])}</td><td>${v[0]?fmt(v[1]/v[0]*100):0}%</td></tr>`).join("");
 $("dashRows").innerHTML=S.plans.map(p=>`<tr><td>${esc(p[0])}</td><td>${esc(p[1])}</td><td>${esc(p[2])}</td><td>${esc(p[3])}</td><td>${fmt(p[4])}</td><td>${fmt(p[5])}</td><td><span class="status ${num(p[5])>=num(p[4])?"ready":"short"}">${num(p[5])>=num(p[4])?"Completed":"Pending"}</span></td></tr>`).join("");
 renderPlans();renderMats();$("changeRows").innerHTML=H.map(h=>`<tr><td>${esc(h.t)}</td><td>${esc(h.a)}</td><td>${esc(h.n)}</td><td>${esc(h.d)}</td></tr>`).join("")||"<tr><td colspan=4>No changes.</td></tr>";
}
function renderPlans(){let q=($("search").value||"").toLowerCase();$("planRows").innerHTML=S.plans.map((p,i)=>({p,i})).filter(x=>x.p.join(" ").toLowerCase().includes(q)).map(x=>{let p=x.p;return `<tr><td>${esc(p[0])}</td><td>${esc(p[1])}</td><td>${esc(p[2])}</td><td>${esc(p[3])}</td><td>${fmt(p[4])}</td><td>${fmt(p[5])}</td><td><button onclick="editPlan(${x.i})">Edit</button> <button onclick="cancelPlan(${x.i})">Cancel</button></td></tr>`}).join("")}
function renderMats(){$("matRows").innerHTML=S.materials.map((m,i)=>{let sh=Math.max(0,num(m[1])-num(m[2]));return `<tr><td>${esc(m[0])}</td><td>${fmt(m[1])}</td><td>${fmt(m[2])}</td><td>${fmt(sh)}</td><td><span class="status ${sh?"short":"ready"}">${sh?"Shortage":"Ready"}</span></td><td><button onclick="editMat(${i})">Update</button></td></tr>`}).join("")}
function openModal(title,html){$("mt").textContent=title;$("mf").innerHTML=html;$("modal").classList.remove("hidden")}
function editPlan(i){edit=i;kind="plan";let p=S.plans[i];openModal("Edit / Reschedule Plan",`<div class=form>${["Date","Plant","SKU","Product","Planned T","Actual T"].map((l,j)=>`<label>${l}<input id=f${j} value="${esc(p[j])}" type="${j==0?"date":j>3?"number":"text"}"></label>`).join("")}</div>`)}
function editMat(i){edit=i;kind="mat";let m=S.materials[i];openModal("Update Material",`<div class=form>${["Material","Required","Available"].map((l,j)=>`<label>${l}<input id=m${j} value="${esc(m[j])}" type="${j?"number":"text"}"></label>`).join("")}</div>`)}
function cancelPlan(i){if(confirm("Cancel this plan?")){S.plans[i][6]="Cancelled";log("Cancelled",S.plans[i][1]+" / "+S.plans[i][2],"Plan cancelled.")}}
window.editPlan=editPlan;window.editMat=editMat;window.cancelPlan=cancelPlan;
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll("nav button").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");$(b.dataset.tab).classList.add("active")});
$("search").oninput=renderPlans;$("month").onchange=e=>{S.month=e.target.value;save()};
$("x").onclick=$("cancel").onclick=()=> $("modal").classList.add("hidden");
$("save").onclick=()=>{if(kind==="plan"){let p=S.plans[edit],old=[...p];for(let i=0;i<6;i++)p[i]=$("f"+i).value;log("Edited / Rescheduled",p[1]+" / "+p[2],`Date ${old[0]} → ${p[0]}; quantity ${old[4]} → ${p[4]}`)}else{let m=S.materials[edit];m[0]=$("m0").value;m[1]=num($("m1").value);m[2]=num($("m2").value);log("Material Updated",m[0],"Stock updated to "+m[2])}$("modal").classList.add("hidden")};
$("addMat").onclick=()=>{S.materials.push(["New Material",0,0]);editMat(S.materials.length-1)};
$("clear").onclick=()=>{if(confirm("Clear history?")){H=[];save()}};
$("file").onchange=async e=>{let f=e.target.files[0];if(!f)return;try{let wb=XLSX.read(await f.arrayBuffer(),{type:"array"}),rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,defval:""}),h=rows[0].map(x=>String(x).toLowerCase()),find=a=>{for(let n of a){let i=h.findIndex(x=>x.includes(n));if(i>=0)return i}return -1};let d=find(["date"]),pl=find(["plant"]),sk=find(["sku","item code","code"]),pr=find(["product","description","item"]),q=find(["plan","planned","quantity"]),a=find(["actual","produced"]);let out=rows.slice(1).filter(r=>r.some(Boolean)).map(r=>[d>=0?r[d]:"",pl>=0?r[pl]:"",sk>=0?r[sk]:"",pr>=0?r[pr]:"",q>=0?num(r[q]):0,a>=0?num(r[a]):0]).filter(r=>r[1]||r[2]||r[3]);if(!out.length)throw Error("No usable rows found in first sheet.");S.plans=out;log("Monthly Plan Imported",f.name,out.length+" plan rows imported.")}catch(err){alert(err.message)}e.target.value=""};
render();