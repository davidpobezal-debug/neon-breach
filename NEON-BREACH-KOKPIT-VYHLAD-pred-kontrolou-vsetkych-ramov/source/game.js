'use strict';
const $=id=>document.getElementById(id),game=$('game');
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),angle=a=>Math.atan2(Math.sin(a),Math.cos(a));
const MW=72,MH=98,CEIL=3.5;
const bridgeLocalLayout={console:{x:13.5,z:4.5,w:3.6,d:1.15,h:1.12},chair:{x:13.5,z:6.4,w:1.16,d:1.04,h:1.8},flight:{x:13.5,z:5.6}};
const bridgeOffset={x:0,z:0};
const bridgeLayout=Object.fromEntries(Object.entries(bridgeLocalLayout).map(([k,p])=>[k,{...p,x:p.x+bridgeOffset.x,z:p.z+bridgeOffset.z}]));
// Move complete authored geometry, normals unchanged, and its lights together.
function bridgeGeometry(arr,glass,author){const a=[],b=[],first=lights.length;author(a,b);for(let i=0;i<a.length;i+=10){a[i]+=bridgeOffset.x;a[i+2]+=bridgeOffset.z;}for(let i=0;i<b.length;i+=10){b[i]+=bridgeOffset.x;b[i+2]+=bridgeOffset.z;}for(const v of a)arr.push(v);if(glass)for(const v of b)glass.push(v);for(let i=first;i<lights.length;i++){lights[i].x+=bridgeOffset.x;lights[i].z+=bridgeOffset.z;}}
function decorateBridgeInterior(arr){bridgeGeometry(arr,null,a=>{const arr=a,B=G.box;
 // Low instruments and layered structural ribs frame an unobstructed panorama.
 for(const x of [9.45,17.55]){
  B(arr,x,.42,5.4,1.12,.84,3.6,'#243c49');B(arr,x,.86,5.4,1.2,.08,3.7,'#506874');
  B(arr,x,.93,5.4,.94,.08,3.2,'#0b202c');
  for(let i=0;i<3;i++){B(arr,x,.99,4.45+i*.9,.68,.02,.56,'#123d49',3);for(let j=0;j<4;j++)B(arr,x-.22+j*.14,1.005,4.45+i*.9,.035,.015,.12+j*.06,j===3?'#efab67':'#4cafa8',3);}
  for(let z=4;z<7;z+=.22)B(arr,x,.35,z,.65,.035,.035,'#101f2a');
 }
 // Panoramic cabin has no old square window frame behind its pressure glazing.
 for(const x of [8.66,18.34])for(const z of [5.5,8.5]){
  B(arr,x,3.36,z,.12,.26,.36,'#425e70');B(arr,x,3.217,z,.075,.02,.29,'#68b6b3',3);lights.push({x,y:2.9,z,r:4,c:'#68b6b3'});
 }
 decorateCockpitAmber(arr);
 // Raised navigation platform, edge lighting and a recognisable captain's seat.
 B(arr,13.5,.04,4.6,4.4,.08,5,'#233b47',0);
 for(const x of [11.3,15.7])B(arr,x,.09,4.6,.035,.025,5,'#459d9d',3);
 const seat=bridgeLocalLayout.chair;
 // The pilot faces the centre navigation screen; the base is bolted to the raised deck.
 B(arr,seat.x,.12,seat.z,.78,.08,.76,'#263e4b');B(arr,seat.x,.40,seat.z,.28,.50,.28,'#59737b');
 for(const dx of [-.29,.29])for(const dz of [-.27,.27])B(arr,seat.x+dx,.17,seat.z+dz,.07,.035,.07,'#9caaa4');
 B(arr,seat.x,.76,seat.z,.85,.16,.78,'#3b5362');B(arr,seat.x,1.25,seat.z+.32,.82,1.10,.19,'#405568');
 B(arr,seat.x,1.25,seat.z+.205,.61,.73,.075,'#253d4c');B(arr,seat.x,1.70,seat.z+.27,.61,.17,.24,'#263b4c');
 for(const dx of [-.51,.51]){B(arr,seat.x+dx,.88,seat.z+.1,.09,.30,.10,'#3c5360');B(arr,seat.x+dx,1.04,seat.z,.13,.13,.85,'#758b94');B(arr,seat.x+dx,1.115,seat.z-.25,.07,.023,.14,dx>0?'#c79256':'#69b3aa',3);}
 for(let z=5;z<9;z+=2){B(arr,13.5,3.25,z,9.9,.18,.18,'#162936');for(const x of [8.62,18.38])B(arr,x,3.11,z,.11,.025,1.25,'#499895',3);}
 lights.push({x:12,y:1.7,z:4.7,r:5,c:'#66ded4'},{x:16,y:2,z:3,r:6,c:'#6b94c9'});

 // Recessed ceiling strips and bolted supports remain above the pilot's panorama.
 for(const x of [10.5,16.5])for(const z of [4.8,7.8]){
  B(arr,x,3.42,z,1.9,.12,.56,'#3d5665');
  B(arr,x,3.345,z,1.64,.025,.37,'#a6dbc9',3);
  for(const dx of [-.78,.78])B(arr,x+dx,3.38,z,.045,.085,.40,'#718b91');
  lights.push({x,y:2.9,z,r:4,c:'#80bdad'});
 }
 B(arr,13.5,3.28,1.97,1.5,.24,.08,'#142936');centeredLabel(arr,'NAV',13.5,3.36,2.03,.047,'#659795');

 });}

const sectors=[
 {name:'ARÉNA / SEKTOR 07',bounds:[3,67,24,86],waves:2,entry:[13.5,83],color:'#5ae8d8'},
 {name:'NÁKLADOVÁ PALUBA',bounds:[2,48,25,67],waves:3,entry:[13.5,65],color:'#5ae8d8'},
 {name:'REAKTOR NOVA',bounds:[2,28,25,48],waves:3,entry:[13.5,46],color:'#c589ff'},
 {name:'HANGÁR / POSLEDNÝ ODPOR',bounds:[2,10,25,28],waves:2,entry:[13.5,26],color:'#ffa260'},
 {name:'KOKPIT',bounds:[7,1,19,10],waves:0,entry:[13.5,8.5],color:'#5ae8d8'}];
const gates=[67,48,28,10].map((z,i)=>({x:13.5,z:z+.5,row:z,open:0,active:false,name:sectors[i+1].name}));
const weapons=[{name:'PULZNÁ PUŠKA / MK.04',cap:16,damage:1,delay:.17,reload:1.2},{name:'NEON NOVA / BOSS CORE',cap:7,damage:5,delay:.42,reload:1.5}];
let colliders=[],map=[],props=[],barrels=[],lights=[],staticMesh,doorL,doorR,robotMeshes={},orbMesh,novaOrb,barrelMesh,planetMesh,skyMesh,skyDome,consoleMesh;
let defenses=[],sideDoors=[],cardMesh,modMesh,turretMesh,card=false,power=false,upgraded=false,secretFound=false,logs=[],commTimer=0,alarmTimer=0,alarmTriggered=false,warpFlash=0;
let pickups=[],medMesh,weaponMesh,glassMesh,navReady=false,tour=false,supplyUsed=false;
let state='menu',player={x:13.5,y:83,a:-Math.PI/2,pitch:0,hp:100},keys={},enemies=[],bolts=[],particles=[];
let room=0,roomWave=0,totalWaves=0,cleared=[false,false,false,false,false],entered=[true,false,false,false,false];
let score=0,kills=0,weapon=0,unlocked=false,ammo=16,magazines=[16,7],reload=0,cooldown=0,flash=0,hurt=0,hit=0,time=0,nextWave=0,noticeTimer=0,walk=0,flightTime=0;
let mouseDown=false,muted=false,audio,checkpoint=null,flow=[],flowTimer=0,objective='',best=0,last=performance.now();
try{best=+(localStorage.getItem('neon-breach-kokpit-clear-view-best')||0);const saved=JSON.parse(localStorage.getItem('neon-breach-kokpit-clear-view-checkpoint')||'null');if(saved?.version===2)checkpoint=saved}catch{}
function tone(freq,duration,type='square',volume=.035,slide=.3){if(muted)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.setValueAtTime(freq,audio.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(20,freq*slide),audio.currentTime+duration);g.gain.setValueAtTime(volume,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+duration)}catch{}}
function notice(text,duration=3){$('notice').textContent=text;$('notice').style.opacity=1;noticeTimer=duration}
function hud(){ $('health').textContent=Math.ceil(player.hp);$('healthbar').style.width=player.hp+'%';$('ammo').textContent=ammo;$('weaponname').textContent=weapons[weapon].name;$('reloadtext').textContent=reload?'PREBÍJAM…':unlocked?'1 / 2 — ZBRAŇ · R — PREBIŤ':'R — PREBIŤ';$('score').innerHTML=String(score).padStart(5,'0')+' <span>BODOV</span>';$('wave').textContent=sectors[room].waves?`${sectors[room].name} · ${roomWave}/${sectors[room].waves}`:'KOKPIT / NAVIGÁCIA';$('objective').textContent=objective;$('progress').textContent=`${totalWaves} / 10 VĹN`;const boss=enemies.find(e=>e.kind==='boss');$('bossbar').classList.toggle('hidden',!boss);if(boss)$('bosshealth').style.width=100*boss.hp/boss.maxhp+'%';if(!intro.gun){$('weaponname').textContent='PRÁZDNE RUKY';$('ammo').textContent='—';$('reloadtext').textContent='NÁJDI PUŠKU · E';}refreshHeldToolHUD();}
function goal(text){if(objective===text)return;objective=text;hud()}
function makeLevel(){map=Array.from({length:MH},()=>Array(MW).fill('1'));props=[];colliders=[];barrels=[];lights=[];pickups=[];navReady=false;supplyUsed=false;card=power=upgraded=secretFound=alarmTriggered=false;logs=[];defenses=[];sideDoors=[];commTimer=alarmTimer=0;weapons[0].reload=1.2;
 for(const s of sectors){const [x0,y0,x1,y1]=s.bounds;for(let y=y0+1;y<y1;y++)for(let x=x0+1;x<x1;x++)map[y][x]='0'}
 for(const g of gates){g.open=0;g.active=false;for(let x=11;x<16;x++)map[g.row][x]='4'}
 // Familiar paired columns in the starting arena; later rooms stay generously sized.
 for(const [x,z,t] of [[6,71,'2'],[7,71,'2'],[6,72,'2'],[7,72,'2'],[19,71,'3'],[20,71,'3'],[19,72,'3'],[20,72,'3'],[6,79,'2'],[7,79,'2'],[19,79,'3'],[20,79,'3'],[10,75,'2'],[17,75,'3'],[6,53,'2'],[21,53,'3'],[6,61,'2'],[21,61,'3'],[7,34,'2'],[20,34,'3'],[7,42,'2'],[20,42,'3'],[5,17,'2'],[22,17,'3']])map[z][x]=t;
 for(let x=8;x<19;x++)map[1][x]='5';for(let y=2;y<9;y++){map[y][7]='5';map[y][19]='5'}for(let y=54;y<60;y++)map[y][2]='5';for(let y=11;y<21;y++)map[y][25]='5';
 for(let z=35;z<38;z++)for(let x=3;x<6;x++)map[z][x]='8';
 const crates=[[5,83],[6,83],[21,83],[22,83],[5,69],[22,69],[5,64],[6,64],[20,64],[21,64],[8,57],[9,57],[18,57],[19,57],[4,50],[22,50],[4,45],[5,45],[22,45],[9,38],[18,38],[4,30],[22,30],[4,24],[5,24],[21,24],[22,24],[7,15],[8,15],[19,15],[20,15]];
 for(const [x,z]of crates){if(map[z][x]==='0'){map[z][x]='6';props.push({x:x+.5,y:z+.5,h:1.05+(x%3)*.2})}}
 for(const [x,z]of [[8.5,81],[18.5,70],[8.5,63],[19.5,51],[10.5,54],[5.5,39],[21.5,35],[10.5,32],[7.5,23],[20.5,13]])barrels.push({x,y:z,hp:1,alive:true});
 buildSideSpaces();buildSystemRooms();buildEVA();buildCryo();buildFurnitureCollision();buildEVACollision();buildDetailCollision();const arr=[],glass=[];const B=G.box;
 buildDeckSurfaces(arr);decoratePanoramicBridgeDeck(arr);
 for(const s of sectors){const [x0,z0,x1,z1]=s.bounds;
  if(s===sectors[4])continue; // New cabin has its own fitted roof and lighting.
  if(z0>10)B(arr,13.5,CEIL-.025,(z0+z1)/2,.08,.045,z1-z0,'#2c8d8b',3);
  for(let z=z0+2;z<z1;z+=4){B(arr,(x0+x1)/2,CEIL-.08,z,x1-x0,.18,.16,'#111e29');for(const [x,c]of [[x0+1,'#53f5dc'],[x1-1,'#ff9852']]){lights.push({x,y:2.1,z,r:7,c});B(arr,x,CEIL-.18,z,.55,.06,.4,c,3)}}
  // Directional lane markings make the route through the vessel easy to read.
  for(let z=z0+1;z<z1;z+=1.6){B(arr,11,.008,z,.045,.015,.7,'#498f8e',3);B(arr,16,.008,z,.045,.015,.7,'#8b6740',3)}
 }
 for(let z=0;z<MH;z++)for(let x=0;x<MW;x++){const t=map[z][x];if(t==='V'||t==='0'||t==='4'||t==='6'||t==='9')continue;if(t==='8')continue;const exposed=[[0,1],[0,-1],[1,0],[-1,0]].some(([dx,dz])=>['0','4','6','8','9'].includes(map[z+dz]?.[x+dx]));if(!exposed)continue;
  // The complete new cabin supplies its own glass and frames.
  if(t==='5'&&x>=7&&x<=20&&z<10)continue;
  if(t==='5'&&x===55&&z>=31&&z<44){B(arr,55.5,.22,z+.5,1,.44,1,'#293e4c');B(arr,55.5,3.3,z+.5,1,.4,1,'#293e4c');hydroWindowGlass(glass,z);continue;}
  if(t==='5'&&z===29&&x>=44&&x<55){B(arr,x+.5,.22,29.5,1,.44,1,'#293e4c');B(arr,x+.5,3.3,29.5,1,.4,1,'#293e4c');hydroNorthGlass(glass,x);continue;}
  if(t==='5'){
   if(x===25&&z>=11&&z<21){
    // The last sill tile stops exactly at the approved window edge. Wall cells
    // retain their existing solid collision, but no glass parts hide behind panels.
    const span=Math.min(z+1,hangarWindowEnd())-z;
    if(span>0){
     B(arr,x+.5,.28,z+span/2,1,.56,span,'#243846');
     B(arr,x+.5,3.24,z+span/2,1,.52,span,'#243846');
     B(arr,x+.5,.60,z+span/2,1,.045,span,'#3eaaa9',3);
    }
    continue;
   }
   B(arr,x+.5,.28,z+.5,1,.56,1,'#243846');B(arr,x+.5,3.24,z+.5,1,.52,1,'#243846');
   const front=z===1;if(!(x===25&&z===20))B(arr,x+.5,.60,z+.5,1,.045,1.02,'#3eaaa9',3); // No cyan sill through the solid AUX bay.
   if(x===2&&z>=54&&z<60||x===25&&z>=51&&z<53)continue; // Authored cargo/security panes replace tile glass and posts.
   if(front)G.quad(glass,[x,.56,z+.53],[x+1,.56,z+.53],[x+1,2.98,z+.53],[x,2.98,z+.53],[0,0,1],'#62baca',5);
   else G.quad(glass,[x+.5,.56,z],[x+.5,.56,z+1],[x+.5,2.98,z+1],[x+.5,2.98,z],[x<13?1:-1,0,0],'#62baca',5);
   if(!front&&z%3===0)B(arr,x+.5,1.75,z,.16,2.7,.15,'#405869');continue;
  }
  B(arr,x+.5,1.75,z+.5,.99,3.5,.99,t==='2'?'#38505b':t==='3'?'#4c484a':'#354653');
  for(const [dx,dz] of [[0,1],[0,-1],[1,0],[-1,0]])if(['0','4','6','8','9'].includes(map[z+dz]?.[x+dx])){const xx=x+.5+dx*.51,zz=z+.5+dz*.51,ww=dx?.08:.85,dd=dz?.08:.85;
   B(arr,xx,1.7,zz,ww,2.55,dd,'#2b3f4c');B(arr,xx,.65,zz,dx?.10:1,.055,dz?.10:1,'#132631');B(arr,xx,2.48,zz,dx?.10:1,.06,dz?.10:1,'#152936');
   const cyan=t!=='3'&&(x<13||x%2===0),c=cyan?'#46e6d5':'#ff934d';
   if(t==='2'||t==='3'){B(arr,xx-dz*.32,1.7,zz+dx*.32,dx?.12:.08,2.7,dz?.12:.08,c,3);B(arr,xx+dz*.32,1.7,zz-dx*.32,dx?.12:.08,2.7,dz?.12:.08,c,3);lights.push({x:xx+dx*.6,y:1.4,z:zz+dz*.6,r:5,c})}
   else if(!wallDetailReserved(x,z,dx,dz)&&!(x===50&&dx===-1&&[50,54,58].includes(z))&&(x+z)%4===0){B(arr,xx,2.8,zz,dx?.12:.72,.085,dz?.12:.72,c,3)}
   if(t==='1'&&!wallDetailReserved(x,z,dx,dz)&&!relocatedWallGrille(x,z,dx,dz)&&(x+z)%6===0){B(arr,xx+dx*.04,1.8,zz+dz*.04,dx?.13:.6,.5,dz?.13:.6,'#071923');B(arr,xx+dx*.08,1.8,zz+dz*.08,dx?.02:.48,.38,dz?.02:.48,cyan?'#12675f':'#6f421f',3);for(let n=0;n<4;n++)B(arr,xx+dx*.10,1.69+n*.065,zz+dz*.10,dx?.025:.32,.025,dz?.025:.32,c,3)}
  }
 }
 for(const p of props){B(arr,p.x,p.h/2,p.y,.96,p.h,.96,'#263b49');B(arr,p.x,p.h*.48,p.y+.49,.74,p.h*.72,.035,'#182c39');for(const x of [-.4,.4]){B(arr,p.x+x,p.h/2,p.y,.07,p.h,.99,'#51616a')}B(arr,p.x-.28,p.h*.5,p.y+.515,.06,p.h*.52,.03,p.x<13?'#40baaf':'#d67c44',3);B(arr,p.x,p.h+.015,p.y,.97,.03,.97,'#3b515f')}
 // Reactor core: vertical machinery along the wall, not a blockage in the fight space.
 B(arr,4.5,.30,36.5,3,.60,3,'#223443');B(arr,4.5,1.7,36.5,1.8,2.2,1.8,'#18283c');
 for(let i=0;i<6;i++){B(arr,4.5,.85+i*.30,37.42,1.35,.085,.045,'#66514e');B(arr,5.42,.85+i*.30,36.5,.045,.085,1.35,'#66514e');}
 for(const x of [3.35,5.65]){B(arr,x,1.5,36.5,.20,2.4,.24,'#65757d');B(arr,x,.67,36.5,.29,.10,.32,'#e7a25d',3);}
 B(arr,4.5,2.79,37.44,2.2,.36,.08,'#203641');label(arr,'CORE',3.75,2.91,37.49,.10,'#b3bdc6');
 lights.push({x:5.5,y:1.5,z:38.2,r:6,c:'#ad725a'});
 decorateHangarPressureWindow(arr,glass);decorateCargoPressureWindow(arr,glass);decorateSecurityPressureWindow(arr,glass);decorateAlignedWallGrilles(arr);
 decorateBridgeInterior(arr);
 decorateShip(arr);decorateSideSpaces(arr);decorateSystemRooms(arr);decorateHull(arr,glass);decorateEVA(arr);decorateWayfinding(arr);decorateRoomDetails(arr);decorateCryo(arr);
 for(const g of gates){for(const x of [-2.75,2.75]){B(arr,g.x+x,1.75,g.z,.48,3.5,.6,'#375866');B(arr,g.x+x,1.75,g.z+.34,.10,3.1,.04,'#47f0d8',3)}B(arr,g.x,3.18,g.z,5.8,.4,.6,'#375866');B(arr,g.x,3.18,g.z+.34,5.1,.09,.04,'#4dedd8',3);lights.push({x:g.x,y:2.6,z:g.z+1.5,r:5,c:'#3dd7c6'})}
 G.remove(staticMesh);staticMesh=G.mesh(G.bake(arr,lights,colliders));G.remove(glassMesh);glassMesh=G.mesh(glass);
}
function makeAssets(){const B=G.box;
 for(const kind of ['drone','shooter','runner','boss','guard','shield']){const a=[],boss=kind==='boss',c=boss?'#785195':kind==='guard'?'#375d87':kind==='shooter'?'#34616a':kind==='runner'?'#725942':'#44606d',accent=boss?'#c58cff':kind==='guard'?'#89c8ff':kind==='shooter'?'#53ffdd':kind==='runner'?'#ffb56c':'#ff8950';
  B(a,0,.82,0,.60,.52,.38,c);B(a,0,1.2,0,.57,.35,.42,'#3b5360');B(a,0,1.25,.22,.44,.17,.035,'#091a25');for(const x of [-.13,.13]){B(a,x,1.26,.245,.105,.065,.04,accent,3);B(a,x,1.285,.27,.07,.018,.02,'#fff1ca',3)}B(a,0,1.02,.2,.34,.04,.025,'#182b35');B(a,0,.86,.23,.18,.18,.05,accent,3);B(a,0,.86,.266,.09,.09,.025,'#eaf8ef',3);
  for(const x of [-.38,.38]){B(a,x,.9,0,.16,.26,.22,c);B(a,x,.64,.03,.13,.31,.16,'#253e4d');B(a,x,.52,.06,.15,.12,.2,accent);}
  for(const x of [-.19,.19]){B(a,x,.36,0,.17,.4,.23,'#263c49');B(a,x,.10,.06,.24,.16,.36,'#446671');B(a,x,.18,.20,.18,.06,.03,'#329992',3)}
  B(a,0,.59,0,.45,.10,.27,'#193443');B(a,0,1.4,0,.43,.06,.32,'#738692');
  if(kind==='shooter'||kind==='guard'||boss){B(a,.43,.96,.30,.20,.22,.50,'#1b3443');B(a,.43,.96,.57,.14,.13,.06,accent,3);B(a,.43,.98,.38,.22,.035,.28,'#8ceae1',3)}
  if(kind==='guard'){B(a,0,1.44,0,.6,.09,.40,'#7397aa');B(a,0,.81,.27,.38,.32,.08,'#233e5b');B(a,0,.8,.33,.21,.06,.03,'#88bded',3);}
  if(kind==='shield'){B(a,-.12,.86,.37,.85,1.2,.15,'#667579');B(a,-.12,.93,.46,.69,.90,.03,'#2b4658');B(a,-.12,1.24,.48,.55,.11,.025,'#d3aa69',3);B(a,-.12,.85,.48,.60,.045,.025,'#91cbd2',3);}
  if(kind==='runner'){B(a,0,.93,.24,.33,.055,.06,'#ffd088',3);for(const x of [-.3,.3])B(a,x,1.26,0,.13,.10,.36,'#a7805b');}
  if(boss){for(const x of [-.34,.34]){B(a,x,1.45,0,.12,.38,.24,'#a681bd');B(a,x,1.6,.13,.10,.14,.04,'#e4b8ff',3)}B(a,0,.73,.25,.34,.045,.04,'#b688e3',3)}robotMeshes[kind]=G.mesh(a);
 }
 const a=[];B(a,-1.25,1.5,0,2.45,2.9,.18,'#354652');B(a,-1.25,1.5,.12,2.12,2.5,.07,'#293e4a');for(let i=0;i<8;i++){B(a,-2.30+i*.29,.37,.18,.15,.15,.035,i%2?'#a96a36':'#1c2b34')}B(a,-.13,1.65,.20,.22,.4,.10,'#152f3c');B(a,-.13,1.65,.26,.13,.25,.025,'#58ead2',3);doorL=G.mesh(a);const b=[];B(b,1.25,1.5,0,2.45,2.9,.18,'#354652');B(b,1.25,1.5,.12,2.12,2.5,.07,'#293e4a');for(let i=0;i<8;i++)B(b,.13+i*.29,.37,.18,.15,.15,.035,i%2?'#a96a36':'#1c2b34');doorR=G.mesh(b);
 const o=[];G.sphere(o,1,'#69ffe5',3);orbMesh=G.mesh(o);const n=[];G.sphere(n,1,'#cc9dff',3);novaOrb=G.mesh(n);
 const r=[];B(r,0,.55,0,.55,1.1,.55,'#273d45');B(r,0,.97,0,.6,.12,.6,'#658087');B(r,0,.15,0,.6,.12,.6,'#658087');for(const z of [-.29,.29])B(r,0,.57,z,.3,.5,.035,'#61f5cf',3);B(r,0,1.04,0,.22,.05,.22,'#eab259',3);barrelMesh=G.mesh(r);
 const p=[];G.sphere(p,1,'#31869d',6,true);planetMesh=G.mesh(p);
 const sky=[];G.sphere(sky,170,'#102033',4);skyDome=G.mesh(sky);
 // The original bright green tile and dark cross, carried into a shallow 3D case.
 const med=[];B(med,0,.24,0,.46,.46,.13,'#61ffcb',3);
 for(const z of [-.073,.073]){B(med,0,.24,z,.105,.30,.018,'#123a39',3);B(med,0,.24,z,.30,.105,.018,'#123a39',3);}
 B(med,0,.48,0,.24,.035,.075,'#3dac91',3);medMesh=G.mesh(med);

 const loot=[];B(loot,0,.16,0,.8,.10,.55,'#243545');B(loot,0,.20,0,.73,.015,.48,'#79608e');B(loot,0,.42,0,.58,.25,.25,'#647182');B(loot,.35,.43,0,.38,.17,.19,'#bb8ced',3);B(loot,-.12,.27,0,.15,.25,.14,'#34445d');for(const z of [-.17,.17])B(loot,.1,.45,z,.65,.045,.045,'#d0a0ff',3);weaponMesh=G.mesh(loot);
 const c=[];B(c,0,.37,0,3.2,.74,.8,'#273e4b');B(c,0,.76,0,3.6,.10,1.15,'#566b78');
 // Sloped instrument faces, leaving the window above them clear.
 for(const x of [-1.1,0,1.1]){
  // A closed wedge rests in the worktop and supports the entire sloped display.
  G.quad(c,[x-.52,.815,.23],[x+.52,.815,.23],[x+.52,1.12,-.32],[x-.52,1.12,-.32],[0,.8745,.485],'#3c5661');
  G.quad(c,[x+.52,.8,-.32],[x-.52,.8,-.32],[x-.52,1.12,-.32],[x+.52,1.12,-.32],[0,0,-1],'#2a424e');
  G.quad(c,[x-.52,.8,.23],[x+.52,.8,.23],[x+.52,.815,.23],[x-.52,.815,.23],[0,0,1],'#58717a');
  // Side cheeks use triangles because the quad helper is for parallelograms.
  for(const side of [-1,1]){const xx=x+side*.52,a=[xx,.8,.23],b=[xx,.8,-.32],d=[xx,.815,.23],top=[xx,1.12,-.32];for(const p of [a,b,top,a,top,d])c.push(...p,side,0,0,56/255,80/255,91/255,1);}
  G.quad(c,[x-.48,.84,.2],[x+.48,.84,.2],[x+.48,1.12,-.3],[x-.48,1.12,-.3],[0,.87,.49],'#081d29',3);
  const R=(u,v,w,h,col)=>{const pt=(u,v)=>[x+u,.852+v*.56,.19-v];G.quad(c,pt(u,v),pt(u+w,v),pt(u+w,v+h),pt(u,v+h),[0,.87,.49],col,3);};
  R(-.4,.425,.79,.018,'#417d86');R(-.4,.37,.24,.018,'#afaf87');
  if(x===0){
   for(let j=0;j<28;j++){const a=j/28*Math.PI*2;R(Math.cos(a)*.18-.015,.21+Math.sin(a)*.145,.012,.012,'#317883');}
   R(-.25,.21,.48,.008,'#214d61');R(-.015,.05,.008,.30,'#214d61');
   for(let j=0;j<6;j++)R(-.17+j*.038,.11+j*.026,.018,.012,'#cda26c');R(.045,.28,.025,.018,'#83d5c8');
   R(.28,.08,.075,.16,'#25516b');R(.30,.10,.03,.07,'#5fb4b1');
  }else if(x<0){
   for(let j=0;j<5;j++){R(-.4,.08+j*.054,.30+(j%3)*.07,.012,'#3a8b8d');R(.10,.08+j*.054,.20-j*.025,.012,'#274e61');}
   R(.3,.08,.05,.12,'#bc865b');R(.3,.25,.05,.06,'#438776');
  }else{
   for(let j=0;j<7;j++){R(-.36+j*.075,.08,.035,.08+(j%4)*.035,j===5?'#d3a561':'#3f9198');}
   R(-.38,.30,.58,.009,'#28566a');R(-.38,.35,.58,.009,'#28566a');R(.27,.30,.10,.055,'#64a894');
  }
  for(let n=0;n<5;n++)B(c,x-.3+n*.14,.83,.38,.07,.035,.075,n===3?'#ddac65':'#35616e',3);
 }
 B(c,0,.85,.35,.25,.055,.22,'#e9a85b',3);B(c,0,.88,.35,.12,.02,.10,'#ffe5a6',3);consoleMesh=G.mesh(c);

}
function enemy(x,y,kind='drone'){const hp=kind==='shield'?6:kind==='boss'?42:kind==='turret'?6:kind==='guard'?5:kind==='shooter'?4:kind==='runner'?2:3;return{x,y,kind,facing:Math.atan2(player.x-x,player.y-y),hp,maxhp:hp,phase:Math.random()*6.28,attack:1+Math.random(),charge:0,chargeMax:.4,flash:0,stun:0,dash:0,windup:0,attackIndex:0,strafe:Math.random()<.5?-1:1}}
function isWall(x,y){return map[Math.floor(y)]?.[Math.floor(x)]!=='0'}
function blocked(x,y,r=.2){return panoramicBridgeBlocked(x,y,r)||colliders.some(c=>x>c.x-c.w/2-r&&x<c.x+c.w/2+r&&y>c.z-c.d/2-r&&y<c.z+c.d/2+r)||isWall(x-r,y-r)||isWall(x+r,y-r)||isWall(x-r,y+r)||isWall(x+r,y+r)||barrels.some(b=>b.alive&&Math.hypot(x-b.x,y-b.y)<r+.35)}
function move(obj,dx,dy,r=.22){if(!blocked(obj.x+dx,obj.y,r))obj.x+=dx;if(!blocked(obj.x,obj.y+dy,r))obj.y+=dy;}
function line(x,y,tx,ty){const d=Math.hypot(tx-x,ty-y),steps=Math.ceil(d/.1);for(let i=1;i<steps;i++)if(isWall(x+(tx-x)*i/steps,y+(ty-y)*i/steps))return false;return true}
// Leave room for each rotating pickup, including the barrel of the boss weapon.
function pickupRadius(p){return p.kind==='nova'?.58:p.kind==='parts'?.40:p.kind==='mod'?.33:p.kind==='card'?.22:.27;}
function dropPickup(p){
 const radius=pickupRadius(p),origin={x:p.x,y:p.y};let fallback=null;
 for(let ring=0;ring<=10;ring++)for(let i=0;i<(ring?24:1);i++){
  const a=i*Math.PI/12,x=origin.x+Math.cos(a)*ring*.3,y=origin.y+Math.sin(a)*ring*.3;
  if(blocked(x,y,radius))continue;
  // A drop may roll nearby, but cannot cross a wall, closed door or furniture.
  const steps=Math.ceil(Math.hypot(x-origin.x,y-origin.y)/.08);let reachable=true;
  for(let j=1;j<steps;j++)if(blocked(origin.x+(x-origin.x)*j/steps,origin.y+(y-origin.y)*j/steps,.04)){reachable=false;break;}
  if(!reachable)continue;
  const overlap=pickups.reduce((sum,q)=>sum+Math.max(0,radius+pickupRadius(q)+.10-Math.hypot(x-q.x,y-q.y)),0);
  if(!fallback||overlap<fallback.overlap)fallback={x,y,overlap};
  if(overlap===0){p.x=x;p.y=y;pickups.push(p);return p;}
 }
 // In a packed corner retain the reward at the least crowded reachable spot.
 if(fallback){p.x=fallback.x;p.y=fallback.y;}pickups.push(p);return p;
}
function spawnWave(){roomWave++;totalWaves++;nextWave=0;bolts=[];const count=room===0?3+roomWave:room===1?4+roomWave:room===2?5+roomWave:7+roomWave;const s=sectors[room],[x0,z0,x1,z1]=s.bounds;
 for(let i=0;i<count;i++){let x,y;for(let tries=0;tries<250;tries++){x=x0+1.6+Math.random()*(x1-x0-2.5);y=z0+1.6+Math.random()*(z1-z0-2.5);if(!blocked(x,y,.4)&&Math.hypot(x-player.x,y-player.y)>5&&!enemies.some(e=>Math.hypot(e.x-x,e.y-y)<1))break}if(blocked(x,y,.35)||Math.hypot(x-player.x,y-player.y)<3){const safe=findSpawn();x=safe.x;y=safe.y}let kind=room===0?'drone':i%3===0?'shooter':i%3===1?'runner':'drone';if(room===1&&roomWave===1){const slots=[[13.5,57,'guard'],[19.5,54,'shooter'],[10.5,52,'runner'],[7.5,59,'drone'],[16.5,60,'drone']];[x,y,kind]=slots[i%slots.length];}if(room===2&&roomWave===3&&i===0)kind='boss';if((room===2&&roomWave===1&&i===0)||(room===3&&roomWave===2&&i===1))kind='shield';const e=enemy(x,y,kind);e.hasCard=room===1&&roomWave===1&&i===0;enemies.push(e)}
 notice(`${sectors[room].name} · VLNA ${roomWave}/${s.waves}`,3);goal(room===2&&roomWave===3?'PORAZ STRÁŽCU NOVA · ZÍSKAJ JEHO ZBRAŇ':room===1?'KARTA OD MODRÉHO STRÁŽCU / SERVISNÁ CESTA VPRAVO':'VYČISTI SEKTOR · ZELENÉ NÁDOBY SÚ VÝBUŠNÉ');tone(420,.25,'sine',.055,1.5);hud()}
function findSpawn(){const [x0,z0,x1,z1]=sectors[room].bounds;let best={x:13.5,y:z0+3},distance=-1;for(let y=z0+1;y<z1;y++)for(let x=x0+1;x<x1;x++)if(!blocked(x+.5,y+.5,.4)){const d=Math.hypot(x+.5-player.x,y+.5-player.y);if(d>distance){distance=d;best={x:x+.5,y:y+.5}}}return best}
function saveCheckpoint(){if(tour)return;checkpoint={version:2,intro:{...intro},mission:{eva:{...eva},systems:{...shipSystems},card,power,upgraded,secretFound,medicalPowered,medicalReward,alarmTriggered,logs:[...logs],doors:sideDoors.map(d=>d.active?1:0),doorStates:Object.fromEntries(sideDoors.map(d=>[d.type,d.active?1:0])),defenses:defenses.map(e=>({...e}))},pickups:pickups.map(p=>({...p})),navReady,supplyUsed,room,roomWave,totalWaves,cleared:[...cleared],entered:[...entered],active:gates.map(g=>g.active),score,kills,unlocked,weapon,player:{...player,hp:Math.max(player.hp,75)},barrels:barrels.map(b=>b.alive)};try{localStorage.setItem('neon-breach-kokpit-clear-view-checkpoint',JSON.stringify(checkpoint))}catch{}$('continue').classList.remove('hidden')}
function resetView(){keys={};mouseDown=false;reload=cooldown=flash=hurt=hit=nextWave=flightTime=0;flow=[];flowTimer=0;enemies=[];bolts=[];particles=[];closeJournal(false);$('shipmap').classList.add('hidden');$('menu').classList.add('hidden');$('pause').classList.add('hidden');$('end').classList.add('hidden');$('cinematic').classList.add('hidden');$('helmet').classList.add('hidden');$('guide').classList.add('hidden');$('interaction').textContent='';game.className='playing';state='playing'}
function start(){tour=false;makeLevel();resetView();player={x:13,y:94,a:-Math.PI/2,pitch:0,hp:100};intro={active:true,gun:false};room=roomWave=totalWaves=score=kills=weapon=0;unlocked=false;ammo=16;magazines=[16,7];cleared=[false,false,false,false,false];entered=[true,false,false,false,false];missionGoal();showGuide('NÚDZOVÉ PREBUDENIE','Si Alex Renn, navigačný technik ARGO-09. Miestna automatika ťa prebudila zo záložnej batérie. Zober pušku zo stojana napravo pri východe. E používa predmety a dvere; M ukazuje ďalší krok.',12);saveCheckpoint();hud();lock()}
function restore(){tour=false;if(!checkpoint){start();return}const cp=JSON.parse(JSON.stringify(checkpoint));makeLevel();intro={active:false,gun:true,...cp.intro};resetView();pickups=(cp.pickups||[]).map(p=>({...p}));navReady=!!cp.navReady;supplyUsed=!!cp.supplyUsed;restoreMission(cp.mission,cp.room);if(cp.mission?.systems?.isolated===undefined&&cp.room>=3)shipSystems.isolated=true;if(cp.mission?.systems?.drive===undefined&&cp.room>=4)shipSystems.drive=true;room=cp.room;roomWave=cp.roomWave;totalWaves=cp.totalWaves;cleared=cp.cleared;entered=cp.entered;score=cp.score;kills=cp.kills;unlocked=cp.unlocked;weapon=cp.weapon;player={...cp.player,pitch:0};if(room===4&&player.x>30&&player.y<21)player={...player,x:13.5,y:8.5,a:-Math.PI/2};magazines=[16,7];ammo=weapons[weapon].cap;barrels.forEach((b,i)=>b.alive=cp.barrels[i]!==false);gates.forEach((g,i)=>g.active=cp.active[i]);refreshSystemGates();gates.forEach(g=>{g.open=g.active?1:0;for(let x=11;x<16;x++)map[g.row][x]=g.active?'0':'4'});const savedDrops=pickups;pickups=[];for(const p of savedDrops)dropPickup(p);if(blocked(player.x,player.y)){let best=null;for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const d=Math.hypot(x+.5-player.x,y+.5-player.y);if(d<4&&!blocked(x+.5,y+.5)&&(!best||d<best.d))best={x:x+.5,y:y+.5,d};}if(best){player.x=best.x;player.y=best.y;}}restoreEVA(cp.mission?.eva);if(intro.active)missionGoal();else if(room<4&&!cleared[room]){if(roomWave>0){roomWave--;totalWaves--;}spawnWave();}else missionGoal();notice('CHECKPOINT OBNOVENÝ · ZÁSOBNÍKY DOPLNENÉ',3);hud();lock()}
function enterRoom(n){room=n;roomWave=0;entered[n]=true;bolts=[];player.hp=clamp(player.hp+15,0,100);if(n===1){defenses=[enemy(23.5,58,'turret')];}saveCheckpoint();if(n<4)spawnWave();else{goal('PRÍĎ K NAVIGAČNÉMU PANELU A STLAČ E');notice('KOKPIT · POSLEDNÝ KROK DOMOV',4);hud()}}
function waveCleared(){if(tour&&room===2){bolts=[];nextWave=0;goal('HYDROPONIKA · PREHLIADKA / T ZOPAKOVAŤ BOJ');notice('SKÚŠKA ZVLÁDNUTÁ · T ZOPAKOVAŤ / E POČÍTAČ',4);hud();return;}bolts=[];player.hp=clamp(player.hp+15,0,100);if(roomWave<sectors[room].waves){nextWave=3;notice('VLNA ZVLÁDNUTÁ · +15 HP · ĎALŠIA ZA 3 SEKUNDY',3)}else{cleared[room]=true;gates[room].active=room===1?power&&shipSystems.relay:room===2?shipSystems.cooling&&shipSystems.isolated:room===3?shipSystems.drive:true;missionGoal();notice(gates[room].active?'PRIEPÁŽKA ODOMKNUTÁ · CHECKPOINT ULOŽENÝ':'SEKTOR VYČISTENÝ · DOKONČI SERVISNÝ POSTUP / M',4);tone(70,1,'sawtooth',.04,2);if(room===0)showPagerGuide();saveCheckpoint()}hud()}
function damageEnemy(e,amount){const list=enemies.includes(e)?enemies:defenses.includes(e)?defenses:null;if(!list)return;if(e.kind==='shield'&&!e.empDisabled&&amount===1&&Math.abs(angle(Math.atan2(player.x-e.x,player.y-e.y)-e.facing))<1.05){e.flash=.08;hit=.04;tone(180,.07,'triangle',.015,1.5);return;}e.hp-=amount;e.flash=.14;if(e.kind!=='boss'){e.stun=.18;e.charge=0;e.windup=0;e.attack=Math.max(e.attack,.65);}hit=.12;burst(e.x,e.y,e.kind==='boss'?'#c68bff':'#ffac6d',9);if(e.hp<=0){list.splice(list.indexOf(e),1);if(e.hasCard&&!card){dropPickup({kind:'card',x:e.x,y:e.y});notice('PRÍSTUPOVÁ KARTA · ZOBER JU KLÁVESOM E',4);}score+=e.kind==='boss'?1500:100;kills++;if(e.kind==='boss'){dropPickup({kind:'nova',x:e.x,y:e.y});notice('STRÁŽCA PADOL · ZOBER NEON NOVA KLÁVESOM E',5);tone(800,.5,'sine',.06,1.5)}else if(kills%4===0){dropPickup({kind:'med',x:e.x,y:e.y})}if(list===enemies&&!enemies.length&&alarmTimer<=0)waveCleared()}hud()}
function burst(x,y,c,n=16){for(let i=0;i<n;i++)particles.push({x,y,z:.6+Math.random()*.6,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,vz:Math.random()*3,life:.6,c})}
function explode(b){if(!b.alive)return;b.alive=false;burst(b.x,b.y,'#77ffcf',40);tone(55,.35,'sawtooth',.09,.25);for(const e of [...enemies,...defenses]){const d=Math.hypot(e.x-b.x,e.y-b.y);if(d<3.4&&line(b.x,b.y,e.x,e.y))damageEnemy(e,Math.ceil((3.4-d)*4))}const d=Math.hypot(player.x-b.x,player.y-b.y);if(d<2.7&&line(b.x,b.y,player.x,player.y))hurtPlayer(Math.ceil((2.7-d)*12));for(const other of barrels)if(other.alive&&Math.hypot(other.x-b.x,other.y-b.y)<2.4&&line(b.x,b.y,other.x,other.y))explode(other)}
function hurtPlayer(n){if(state!=='playing')return;player.hp=Math.max(0,player.hp-n);hurt=.35;tone(60,.12,'sawtooth',.045,.5);hud();if(!player.hp)finish(false)}
function switchWeapon(n){if(state!=='playing'||n===weapon||n===1&&!unlocked)return;magazines[weapon]=ammo;weapon=n;ammo=magazines[n];reload=0;cooldown=.15;tone(300,.1,'triangle',.04,1.4);hud()}
function beginReload(){if(!evaHoldingTool()&&!evaVacuum()&&state==='playing'&&!reload&&ammo<weapons[weapon].cap){reload=weapons[weapon].reload;tone(170,.12,'triangle',.04,2);hud()}}
function shoot(){if(!intro.gun||evaHoldingTool()||evaVacuum()||state!=='playing'||reload||cooldown>0)return;if(!ammo){beginReload();return}ammo--;magazines[weapon]=ammo;cooldown=weapons[weapon].delay;flash=.12;tone(weapon?300:160,.13,'sawtooth',.055,.2);tone(65,.18,'triangle',.08,.4);
 if(weapon===1){bolts.push({x:player.x,y:player.y,z:1.4,vx:Math.cos(player.a)*13,vy:Math.sin(player.a)*13,vz:Math.tan(player.pitch)*13,life:3,friendly:true,r:.18})}
 else{let best=null,distance=35;const candidates=[...enemies,...defenses,...barrels.filter(b=>b.alive).map(b=>({...b,barrel:b}))];for(const e of candidates){const d=Math.hypot(e.x-player.x,e.y-player.y),a=angle(Math.atan2(e.y-player.y,e.x-player.x)-player.a),size=e.kind==='boss'?.65:e.kind==='turret'?.48:e.barrel?.31:.39;const centre=e.kind==='boss'?1.4:e.kind==='turret'?1.1:e.barrel?.6:.85;const elevation=Math.atan2(centre-1.45,d);if(Math.abs(a)<Math.atan(size/d)+.014&&Math.abs(player.pitch-elevation)<Math.atan((e.kind==='boss'?1.15:e.barrel?.55:.72)/d)+.025&&d<distance&&shotLine(player.x,player.y,e.x,e.y,1.45,1.45+Math.tan(player.pitch)*d)){distance=d;best=e}}if(best){if(best.barrel)explode(best.barrel);else damageEnemy(best,weapons[0].damage)}}hud()}
function fireEnemy(e){const m=muzzle(e),a=Math.atan2(player.y-m.y,player.x-m.x),ring=e.kind==='boss'&&e.attackIndex%2===1;const angles=ring?Array.from({length:10},(_,i)=>i*Math.PI*2/10):e.kind==='boss'?[a-.22,a,a+.22]:[a];for(const dir of angles){const speed=ring?3.6:e.kind==='boss'?5.4:4.8;bolts.push({x:m.x,y:m.y,z:m.z,vx:Math.cos(dir)*speed,vy:Math.sin(dir)*speed,vz:0,life:5,friendly:false,r:e.kind==='boss'?.18:.14,amber:ring});}e.attackIndex++;tone(ring?180:340,.14,'sine',.025,.5);}

function updateBolts(dt){for(let i=bolts.length-1;i>=0;i--){const b=bolts[i];if(!b)continue;b.life-=dt;let dead=b.life<0;const steps=Math.ceil(Math.hypot(b.vx,b.vy)*dt/.08);for(let n=0;n<steps&&!dead;n++){b.x+=b.vx*dt/steps;b.y+=b.vy*dt/steps;b.z+=b.vz*dt/steps;const barrel=barrels.find(p=>p.alive&&Math.hypot(p.x-b.x,p.y-b.y)<.4+b.r);if(barrel){explode(barrel);dead=true;break}if(isWall(b.x,b.y)||furnitureHit(b.x,b.y,b.z)||b.z<.04||b.z>CEIL){dead=true;break}if(b.friendly){const e=[...enemies,...defenses].find(e=>Math.hypot(e.x-b.x,e.y-b.y)<(e.kind==='boss'?.64:.37)+b.r&&b.z<(e.kind==='boss'?2.6:1.55));if(e){damageEnemy(e,weapons[1].damage);for(const other of [...enemies,...defenses])if(Math.hypot(other.x-b.x,other.y-b.y)<1.4&&line(b.x,b.y,other.x,other.y))damageEnemy(other,2);dead=true}}else if(Math.hypot(player.x-b.x,player.y-b.y)<.22+b.r){hurtPlayer(12);dead=true}}
 if(dead){burst(b.x,b.y,b.friendly?'#cc9dff':'#69ffe5',6);bolts.splice(i,1)}}}
// Clearance-aware navigation: barrels, furniture and robot radius share the collision model.
function pathClear(x,y,tx,ty,r=.24){const steps=Math.max(1,Math.ceil(Math.hypot(tx-x,ty-y)/.18));for(let i=1;i<=steps;i++)if(blocked(x+(tx-x)*i/steps,y+(ty-y)*i/steps,r))return false;return true;}
function calculateFlow(){
 flow=new Int16Array(MW*MH).fill(-1);const px=Math.floor(player.x),py=Math.floor(player.y),q=[[px,py]];
 flow[py*MW+px]=0;
 for(let i=0;i<q.length;i++){const [x,y]=q[i];for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=MW||yy>=MH||flow[yy*MW+xx]>=0||blocked(xx+.5,yy+.5,.24))continue;flow[yy*MW+xx]=flow[y*MW+x]+1;q.push([xx,yy]);}}
}
function enemyMove(e,dt){
 const r=e.kind==='boss'?.35:.22;let tx=player.x,ty=player.y;
 if(!pathClear(e.x,e.y,tx,ty,r)){
  // Finish a selected corner before choosing the next cell. Otherwise robots cut into walls.
  if(e.waypoint&&Math.hypot(e.waypoint.x-e.x,e.waypoint.y-e.y)>.08&&pathClear(e.x,e.y,e.waypoint.x,e.waypoint.y,r)){tx=e.waypoint.x;ty=e.waypoint.y;}
  else{
   e.waypoint=null;const x=Math.floor(e.x),y=Math.floor(e.y),candidates=[];
   for(const [dx,dy]of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=MW||yy>=MH)continue;const v=flow[yy*MW+xx];if(v>=0&&Math.hypot(xx+.5-e.x,yy+.5-e.y)>.06&&pathClear(e.x,e.y,xx+.5,yy+.5,r))candidates.push({x:xx+.5,y:yy+.5,v});}
   candidates.sort((a,b)=>a.v-b.v);if(!candidates.length)return;
   e.waypoint=candidates[0];tx=e.waypoint.x;ty=e.waypoint.y;
  }
 }else e.waypoint=null;
 const d=Math.hypot(tx-e.x,ty-e.y);if(d<.01)return;
 const step=Math.min(d,(e.kind==='boss'?.8:e.kind==='runner'?2.8:e.kind==='shield'?1.1:e.kind==='shooter'||e.kind==='guard'?1.2:1.65)*dt);
 move(e,(tx-e.x)/d*step,(ty-e.y)/d*step,r);
}

function lock(){try{canvas.requestPointerLock()?.catch(()=>notice('NÁHĽAD: ŠÍPKY NA OTÁČANIE · MEDZERNÍK NA STREĽBU',4))}catch{notice('OTÁČANIE: ŠÍPKY · STREĽBA: MEDZERNÍK',4)}}
function pause(){if(state!=='playing')return;state='paused';keys={};mouseDown=false;game.className='playing paused';$('pause').classList.remove('hidden');if(document.pointerLockElement)document.exitPointerLock()}
function resume(){state='playing';keys={};game.className='playing';$('pause').classList.add('hidden');lock()}
function finish(win){state='ended';keys={};mouseDown=false;game.className=win?'playing ended escaped':'playing ended';$('cinematic').classList.add('hidden');$('end').classList.remove('hidden');$('endlabel').textContent=win?'MISIA DOKONČENÁ / DOMOV':'SIGNÁL STRATENÝ / CHECKPOINT PRIPRAVENÝ';$('endtitle').innerHTML=win?'VITAJ<br>DOMA.':'EŠTE JEDEN<br>POKUS.';best=Math.max(best,score);try{localStorage.setItem('neon-breach-kokpit-clear-view-best',best)}catch{}$('endstats').textContent=`${score} bodov · ${kills} robotov · ${totalWaves}/10 vĺn · rekord ${best}`;$('checkpoint').classList.toggle('hidden',win||!checkpoint);if(document.pointerLockElement)document.exitPointerLock();tone(win?600:130,.7,'sawtooth',.04,win?1.5:.25)}
function launch(){if(!shipSystems.drive||!navReady)return;if(state!=='playing'||room!==4||Math.hypot(player.x-13.5,player.y-4.8)>2.1)return;state='flight';flightTime=0;keys={};mouseDown=false;bolts=[];player.pitch=0;game.className='playing flying';$('interaction').textContent='';$('cinematic').classList.remove('hidden');player.x=bridgeLayout.flight.x;player.y=bridgeLayout.flight.z;player.a=-Math.PI/2;goal('KURZ: DOMOV / AUTOPILOT');tone(45,2,'sawtooth',.04,4);if(document.pointerLockElement)document.exitPointerLock()}
function update(dt){time+=dt;updateMessages(dt);if(state==='flight'){flightTime+=dt;player.x+=(bridgeLayout.flight.x-player.x)*dt*2;player.y+=(bridgeLayout.flight.z-player.y)*dt*2;player.a+=angle(-Math.PI/2-player.a)*dt*2;player.pitch=0;$('cinematic').innerHTML=flightTime<2?'POHON SA NABÍJA <small>AUTOPILOT AKTÍVNY</small>':flightTime<9?'WARP SKOK <small>KURZ: DOMOV</small>':'DOMOV NA DOHĽAD <small>SKOK DOKONČENÝ · VITAJ DOMA</small>';if(flightTime>16)finish(true);return}if(state!=='playing')return;
 for(const g of gates)if(g.active&&g.open<1){g.open=Math.min(1,g.open+dt*.5);if(g.open===1)for(let x=11;x<16;x++)map[g.row][x]='0'}
 cooldown=Math.max(0,cooldown-dt);flash=Math.max(0,flash-dt);hit=Math.max(0,hit-dt);hurt=Math.max(0,hurt-dt);if(reload){reload-=dt;if(reload<=0){reload=0;ammo=weapons[weapon].cap;magazines[weapon]=ammo;hud();tone(330,.08,'triangle',.03,1.5)}}
 player.a+=((keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0))*dt*2;player.pitch=clamp(player.pitch+((keys.ArrowUp?1:0)-(keys.ArrowDown?1:0))*dt*.8,-.65,.65);
 let f=(keys.KeyW?1:0)-(keys.KeyS?1:0),s=(keys.KeyD?1:0)-(keys.KeyA?1:0),n=Math.hypot(f,s)||1;const outside=evaVacuum(),speed=outside?1.65:eva.suit?2.6:(keys.ShiftLeft||keys.ShiftRight?5.5:3.4);f=f/n*speed;s=s/n*speed;const dx=Math.cos(player.a)*f-Math.sin(player.a)*s,dz=Math.sin(player.a)*f+Math.cos(player.a)*s;if(outside){const blend=1-Math.exp(-dt*6);player.suitVX=(player.suitVX||0)+(dx-(player.suitVX||0))*blend;player.suitVZ=(player.suitVZ||0)+(dz-(player.suitVZ||0))*blend;move(player,player.suitVX*dt,player.suitVZ*dt);}else{player.suitVX=player.suitVZ=0;move(player,dx*dt,dz*dt);}if(f||s)walk+=dt*speed*(outside?1.15:2);
 if(intro.active&&intro.gun&&player.y<86){intro.active=false;spawnWave();saveCheckpoint();notice('SEKTOR 07 · PAGER VĽAVO PRI VÝCHODE / E PREČÍTAŤ',5);}
 for(let n=1;n<5;n++)if(!entered[n]&&gates[n-1].open===1&&player.y<gates[n-1].row){enterRoom(n);break}
 if(mouseDown||keys.Space)shoot();
 flowTimer-=dt;if(flowTimer<=0){calculateFlow();flowTimer=.35}
 updateSideSystems(dt);updateSystems(dt);updateEVA(dt);if(state!=='playing')return;
 for(const e of [...enemies,...defenses]){
  if(e.kind==='shield'){const target=Math.atan2(player.x-e.x,player.y-e.y);e.facing+=clamp(angle(target-e.facing),-dt*.85,dt*.85);}
  e.phase+=dt*3;e.flash=Math.max(0,e.flash-dt);e.attack-=dt;e.stun=Math.max(0,e.stun-dt);if(e.stun)continue;
  const d=Math.hypot(player.x-e.x,player.y-e.y),ranged=['shooter','guard','boss','turret'].includes(e.kind),visible=shotLine(e.x,e.y,player.x,player.y,1.45,1.45);
  if(e.kind==='turret'&&!power)e.phase+=dt;
  if(e.windup>0){e.windup=Math.max(0,e.windup-dt);if(!e.windup){e.dash=.42;e.dx=(player.x-e.x)/Math.max(d,.01);e.dy=(player.y-e.y)/Math.max(d,.01);}continue;}
  if(e.dash>0){e.dash-=dt;move(e,e.dx*4.3*dt,e.dy*4.3*dt,.22);}
  else if(e.kind==='runner'&&d>2.5&&d<7&&visible&&e.attack<=0){e.windup=.4;e.attack=2.5;tone(260,.12,'triangle',.025,1.7);}
  if(e.charge>0){e.charge=Math.max(0,e.charge-dt);if(!e.charge&&visible){fireEnemy(e);e.attack=e.kind==='turret'?1.6:e.kind==='boss'?1.5:1.3+Math.random()*.35;}}
  else if(ranged&&d<18&&visible&&e.attack<=0){e.chargeMax=e.kind==='turret'?.65:e.kind==='boss'?(e.attackIndex%2?.8:.5):.4;e.charge=e.chargeMax;tone(650,.12,'sine',.014,1.2);}
  if(e.kind!=='turret'&&!e.charge&&!e.windup&&!e.dash){
   if(ranged&&visible&&d>=4.3&&d<=8){const a=Math.atan2(player.y-e.y,player.x-e.x),ox=e.x,oy=e.y;move(e,-Math.sin(a)*e.strafe*dt*.75,Math.cos(a)*e.strafe*dt*.75);if(Math.hypot(e.x-ox,e.y-oy)<dt*.1)e.strafe*=-1;}
   else if(ranged&&visible&&d<4.3){const a=Math.atan2(player.y-e.y,player.x-e.x);move(e,-Math.cos(a)*dt*.7,-Math.sin(a)*dt*.7);}
   else if(d>(ranged?6:.7)||!visible)enemyMove(e,dt);
  }
  if(e.kind!=='turret'&&visible&&d<.8&&e.attack<=0){hurtPlayer(e.kind==='runner'?8:ranged?14:11);e.attack=.85;if(state!=='playing')break;}
 }

 separateEnemies(dt);
 updateBolts(dt);if(state!=='playing')return;
 for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;p.vz-=dt*5;if(p.life<=0)particles.splice(i,1)}
 if(nextWave>0){nextWave-=dt;if(nextWave<=0)spawnWave()}
 updatePickups();$('interaction').textContent=interactionLabel();
}
// The pixel weapon overlay preserves the first version's visual identity.
const canvas=G.canvas,gunCanvas=$('weaponview'),gc=gunCanvas.getContext('2d');gunCanvas.width=480;gunCanvas.height=270;
function drawGun(){gc.clearRect(0,0,480,270);if(!intro.gun)return;if(evaHoldingTool()&&state!=='flight'&&state!=='menu'&&state!=='ended'){drawEVATool();return;}if(state==='flight'||state==='menu'||state==='ended'&&flightTime)return;const bob=Math.sin(walk)*2,drop=reload?Math.sin(reload/weapons[weapon].reload*Math.PI)*55:0;gc.save();gc.translate(240+Math.sin(walk*.5)*2,270+bob+flash*50+drop);const r=(x,y,w,h,c)=>{gc.fillStyle=c;gc.fillRect(x,y,w,h)};
 r(-47,-28,39,28,'#172b35');r(30,-29,52,29,'#182d38');r(-39,-31,29,21,'#344d59');r(40,-30,26,25,'#344d59');if(weapon){r(-27,-56,54,56,'#463662');r(-20,-71,40,40,'#8268a3');r(-30,-77,12,28,'#394655');r(18,-77,12,28,'#394655');r(-26,-72,5,21,'#bb7bff');r(22,-72,5,21,'#bb7bff');r(-14,-76,28,26,'#162536');r(-10,-71,20,17,'#ce9bff');r(-5,-68,10,11,'#f1ddff');for(let y=-45;y<-10;y+=13)r(-17,y,34,5,'#ce9bff')}
 else{r(-26,-52,65,52,'#101c2a');r(-20,-60,52,60,'#3e5966');r(-15,-68,42,60,'#6c8792');r(-12,-72,36,10,'#1a2c39');r(-9,-86,30,18,'#263d4a');r(-5,-89,22,5,'#83bac1');r(-4,-82,20,8,'#06151e');r(1,-83,10,4,'#65fff0');r(-8,-64,28,7,'#11232e');r(-6,-60,24,3,'#47e9d8');for(let y=-48;y<-10;y+=13)r(-9,y,30,5,'#1a303f');r(27,-48,8,27,'#172c38');r(29,-45,5,14,'#ff8c50');r(-20,-42,5,20,'#b2ced1')}
 if(flash){gc.fillStyle=weapon?'#ddb7ff':'#fff0be';gc.beginPath();gc.moveTo(6,-86);gc.lineTo(-12,-107);gc.lineTo(0,-103);gc.lineTo(6,-130);gc.lineTo(13,-105);gc.lineTo(26,-114);gc.lineTo(19,-91);gc.closePath();gc.fill();r(1,-110,10,24,'#ffffff')}gc.restore()}
function render(){const localLights=[];for(const b of bolts.slice(-8))localLights.push({x:b.x,y:b.z,z:b.y,r:3,c:b.friendly?'#b374ff':'#56f8d4'});for(const e of [...enemies,...defenses])if(e.charge){const m=muzzle(e);localLights.push({x:m.x,y:m.z,z:m.y,r:3,c:'#83fff0'})}if(evaVacuum()&&keys.KeyE&&eva.valve&&!eva.sealed&&interactionTarget()?.data==='weld')localLights.push({x:60.4,y:1.35,z:27,r:3,c:'#d8f4ff'});if(flash)localLights.push({x:player.x,y:1.5,z:player.y,r:5,c:weapon?'#d394ff':'#ffb45e'});G.begin(player,localLights,time);
 G.draw(skyDome,G.transform(player.x,1.45,player.y));if(flightTime>9){const t=clamp((flightTime-9)/4,0,1);G.draw(planetMesh,G.transform(20,3.5,-33,0,4+t*4));}G.draw(staticMesh);for(const g of gates){G.draw(doorL,G.transform(g.x-g.open*2.5,0,g.z));G.draw(doorR,G.transform(g.x+g.open*2.5,0,g.z))}
 G.draw(consoleMesh,G.transform(bridgeLayout.console.x,0,bridgeLayout.console.z));
 for(const b of barrels)if(b.alive)G.draw(barrelMesh,G.transform(b.x,0,b.y));
 drawSideDoors();drawSystems();drawEVA();drawCryo();for(const e of [...enemies,...defenses]){const a=e.kind==='shield'?e.facing:Math.atan2(player.x-e.x,player.y-e.y),scale=e.kind==='boss'?1.7:e.kind==='runner'?.88:1;G.draw(e.kind==='turret'?turretMesh:robotMeshes[e.kind],G.transform(e.x,Math.sin(e.phase)*.025,e.y,a,scale));if(e.charge){const m=muzzle(e);G.draw(orbMesh,G.transform(m.x,m.z,m.y,0,(.07+(1-e.charge/e.chargeMax)*.07)*scale));}if(e.windup)G.draw(orbMesh,G.transform(e.x,.92,e.y,0,.12));if(e.flash)G.draw(novaOrb,G.transform(e.x,e.kind==='boss'?1.5:.9,e.y,0,.10))}
 for(const b of bolts){G.draw(b.friendly?novaOrb:orbMesh,G.transform(b.x,b.z,b.y,0,b.r));G.draw(b.friendly?novaOrb:orbMesh,G.transform(b.x-b.vx*.025,b.z,b.y-b.vy*.025,0,b.r*.55))}
 for(const p of particles)G.draw(p.c==='#cc9dff'?novaOrb:orbMesh,G.transform(p.x,p.z,p.y,0,p.life*.065));
 for(const p of pickups)G.draw(p.kind==='parts'?partMesh:p.kind==='nova'?weaponMesh:p.kind==='card'?cardMesh:p.kind==='mod'?modMesh:medMesh,G.transform(p.x,.12+Math.sin(time*2.4+p.x)*.055,p.y,p.kind==='med'?Math.atan2(player.x-p.x,player.y-p.y):time*.35));
 if(state==='flight'&&flightTime>2&&flightTime<9){drawWarp()}
 G.glass(glassMesh);drawCryoGlass();G.finish();drawGun();drawFlightFlash();$('hitmarker').style.opacity=hit>0?1:0;$('damage').style.opacity=hurt*1.7;
}
let warpMesh;
function drawWarp(){const arr=[],speed=1+(flightTime-2)*.7;for(let i=0;i<180;i++){const a=i*2.399963,r=1+(i%16)*.45,z=-6-((time*(20+i%11)+i*2)%75),x=13.5+Math.cos(a)*r,y=1.45+Math.sin(a)*r,w=.025+(i%3)*.009,length=3+speed*(1+i%4);G.quad(arr,[x-w,y,z],[x+w,y,z],[x+w,y,z+length],[x-w,y,z+length],[0,1,0],i%4?'#83dafa':'#9992ef',3);}G.remove(warpMesh);warpMesh=G.mesh(arr);G.draw(warpMesh);}
function drawFlightFlash(){if(state!=='flight')return;let alpha=0;if(flightTime>2&&flightTime<2.65)alpha=(2.65-flightTime)/.65*.8;if(flightTime>8.8&&flightTime<9.25)alpha=Math.sin((flightTime-8.8)/.45*Math.PI)*.5;if(alpha){gc.fillStyle=`rgba(184,237,255,${alpha})`;gc.fillRect(0,0,480,270);}}

function frame(now){const dt=Math.min(.04,(now-last)/1000);last=now;update(dt);render();requestAnimationFrame(frame)}
document.addEventListener('keydown',e=>{if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();keys[e.code]=true;if(e.code==='Space')shoot();if(e.code==='KeyR')beginReload();if(e.code==='Digit1')switchWeapon(0);if(e.code==='Digit2')switchWeapon(1);if(!e.repeat&&e.code==='KeyM'){if(state==='systems')closeShipMap();else openShipMap();}if(!e.repeat&&e.code==='KeyQ')useEMP();if(!e.repeat&&e.code==='KeyT')hydroCombatTrial();if(state==='systems'&&['KeyE','Escape'].includes(e.code)){closeShipMap();return;}if(e.code==='KeyE'&&!e.repeat){if(state==='reading')closeJournal();else interact();}if(e.code==='KeyJ'&&!e.repeat){if(state==='reading')closeJournal();else openJournal();}if(e.code==='Escape'){if(state==='reading')closeJournal();else pause();}});document.addEventListener('keyup',e=>keys[e.code]=false);
document.addEventListener('mousemove',e=>{if(state==='playing'&&(document.pointerLockElement===canvas||e.buttons===1)){player.a+=e.movementX*.0025;player.pitch=clamp(player.pitch-e.movementY*.0025,-.65,.65)}});canvas.addEventListener('mousedown',e=>{if(e.button===0&&state==='playing'){if(document.pointerLockElement!==canvas)lock();mouseDown=true;shoot()}});document.addEventListener('mouseup',()=>mouseDown=false);document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement&&state==='playing')pause()});window.addEventListener('blur',pause);
$('journalClose').onclick=()=>closeJournal();$('mapClose').onclick=()=>closeShipMap();$('tour').onclick=startTour;$('evaTour').onclick=startEVATour;$('hydroTour').onclick=startHydroTour;$('start').onclick=start;$('resume').onclick=resume;$('restart').onclick=start;$('restartPause').onclick=start;$('menuPause').onclick=()=>{state='menu';keys={};mouseDown=false;game.className='';$('pause').classList.add('hidden');$('menu').classList.remove('hidden');$('continue').classList.toggle('hidden',!checkpoint);};$('checkpoint').onclick=restore;$('continue').onclick=restore;$('sound').onclick=()=>{muted=!muted;$('sound').textContent=muted?'ZVUK OFF':'ZVUK ON';if(!muted)tone(440,.1,'sine',.03,1)};

function muzzle(e){const a=e.kind==='shield'?e.facing:Math.atan2(player.x-e.x,player.y-e.y),scale=e.kind==='boss'?1.7:1;if(e.kind==='turret')return{x:e.x+Math.sin(a)*.68,y:e.y+Math.cos(a)*.68,z:1.18};return{x:e.x+(.43*Math.cos(a)+.62*Math.sin(a))*scale,y:e.y+(-.43*Math.sin(a)+.62*Math.cos(a))*scale,z:.96*scale};}
function updatePickups(){for(let i=pickups.length-1;i>=0;i--){const p=pickups[i];if(p.kind==='med'&&Math.hypot(p.x-player.x,p.y-player.y)<.75&&line(player.x,player.y,p.x,p.y)){const gained=Math.min(25,100-player.hp);player.hp=Math.min(100,player.hp+25);pickups.splice(i,1);notice(gained?`+${gained} HP · LEKÁRNIČKA`:'LEKÁRNIČKA ZOBRANÁ · ZDRAVIE PLNÉ',2);tone(620,.15,'sine',.035,1.4);hud();if(cleared[room])saveCheckpoint();}}}
function nearbyNova(){return pickups.find(p=>p.kind==='nova'&&Math.hypot(p.x-player.x,p.y-player.y)<1.65&&line(player.x,player.y,p.x,p.y));}
function atSupply(){return room===0&&Math.hypot(player.x-4.8,player.y-82)<1.8;}

function startTour(){tour=true;makeLevel();shipSystems={parts:true,relay:true,cooling:true,isolated:true,drive:true,emp:true};resetView();player={x:13.5,y:8.1,a:-Math.PI/2,pitch:0,hp:100};room=4;roomWave=0;totalWaves=0;entered=[true,true,true,true,true];cleared=[false,false,false,false,false];unlocked=false;weapon=0;ammo=16;goal('PREHLIADKA KOKPITU · WASD + MYŠ · E NAVIGÁCIA');notice('POKOJNÁ PREHLIADKA · CHECKPOINT KAMPANE ZOSTÁVA ULOŽENÝ',4);hud();lock();}
function beam(arr,a,b,w,col){const v=b.map((n,i)=>n-a[i]),len=Math.hypot(...v),u=[v[1]/len*w/2,-v[0]/len*w/2,0],z=[0,0,w/2];const p=(q,sgn,sgnz)=>q.map((n,i)=>n+u[i]*sgn+z[i]*sgnz);for(const q of [[1,1,-1,1],[-1,-1,1,-1]])G.quad(arr,p(a,q[0],q[1]),p(b,q[0],q[1]),p(b,q[2],q[3]),p(a,q[2],q[3]),[0,0,1],col);G.quad(arr,p(a,1,-1),p(b,1,-1),p(b,1,1),p(a,1,1),[1,0,0],col);G.quad(arr,p(a,-1,1),p(b,-1,1),p(b,-1,-1),p(a,-1,-1),[-1,0,0],col);}
const glyphs={
 '0':['111','101','101','101','111'],'7':['111','001','010','010','010'],
 'A':['010','101','111','101','101'],'B':['110','101','110','101','110'],
 'C':['111','100','100','100','111'],'D':['110','101','101','101','110'],
 'E':['111','100','110','100','111'],'G':['111','100','101','101','111'],
 'H':['101','101','111','101','101'],'I':['111','010','010','010','111'],
 'F':['111','100','110','100','100'],'K':['101','101','110','101','101'],'L':['100','100','100','100','111'],'P':['110','101','110','100','100'],'T':['111','010','010','010','010'],'U':['101','101','101','101','111'],'Y':['101','101','010','010','010'],'2':['111','001','111','100','111'],
 'M':['10001','11011','10101','10001','10001'],'N':['101','111','111','111','101'],
 'O':['111','101','101','101','111'],'R':['110','101','110','101','101'],
 'W':['10001','10001','10101','11011','10001'],'S':['111','100','111','001','111'],'V':['101','101','101','101','010']};
Object.assign(glyphs,{K:['101','101','110','101','101'],U:['101','101','101','101','111'],X:['101','101','010','101','101'],Y:['101','101','010','010','010'],T:['111','010','010','010','010'],P:['110','101','110','100','100'],H:['101','101','111','101','101']});
function label(arr,text,x,y,z,size,col,facing=0){let offset=0;const ca=Math.cos(facing),sa=Math.sin(facing);for(const ch of text){const g=glyphs[ch];if(!g){offset+=size*3;continue;}for(let r=0;r<5;r++)for(let c=0;c<g[r].length;c++)if(g[r][c]==='1'){const t=offset+c*size;G.box(arr,x+ca*t,y-r*size,z-sa*t,size*.86*Math.abs(ca)+.025*Math.abs(sa),size*.86,size*.86*Math.abs(sa)+.025*Math.abs(ca),col,3);}offset+=(g[0].length+1)*size;}}
function centeredLabel(arr,text,x,y,z,size,col,facing=0){let offset=0,min=Infinity,max=-Infinity;for(const ch of text){const g=glyphs[ch];if(!g){offset+=size*3;continue;}for(const row of g)for(let c=0;c<row.length;c++)if(row[c]==='1'){min=Math.min(min,offset+c*size);max=Math.max(max,offset+c*size);}offset+=(g[0].length+1)*size;}const mid=Number.isFinite(min)?(min+max)/2:0;label(arr,text,x-Math.cos(facing)*mid,y,z+Math.sin(facing)*mid,size,col,facing);}
// Local alignments from the annotated room screenshots; colours stay unchanged.
function relocatedWallGrille(x,z,dx,dz){return x===25&&dx===-1&&(z===29||z===41)||x===8&&z===10&&dz===-1||x===50&&dx===-1&&(z===52||z===58);}
function decorateAlignedWallGrilles(arr){const B=G.box;
 const face=(xx,zz,dx,dz,c,back)=>{
  B(arr,xx+dx*.04,1.8,zz+dz*.04,dx?.13:.6,.5,dz?.13:.6,'#071923');
  B(arr,xx+dx*.08,1.8,zz+dz*.08,dx?.02:.48,.38,dz?.02:.48,back,3);
  for(let n=0;n<4;n++)B(arr,xx+dx*.10,1.69+n*.065,zz+dz*.10,dx?.025:.32,.025,dz?.025:.32,c,3);
 };
 for(const z of [31.5,39.5])face(24.99,z,-1,0,'#ff934d','#6f421f');
 // The rear-left cockpit grille now sits between the x9 and x10 wall seams.
 face(9.5,9.99,0,-1,'#46e6d5','#12675f');
 // Workshop grilles sit midway between adjacent orange strips. Their frames
 // embed in the wall and their glowing bars share the strips' front plane.
 for(const z of [52.7,58.3]){
  B(arr,50.01,1.8,z,.124,.50,.60,'#071923');
  // Preserve the old black visible backing: its coloured insert stays
  // recessed behind the opaque face, while only the cyan bars protrude.
  B(arr,49.956,1.8,z,.012,.38,.48,'#12675f',3);
  for(let n=0;n<4;n++)B(arr,49.933,1.69+n*.065,z,.004,.025,.32,'#46e6d5',3);
 }
}
function wallDetailReserved(x,z,dx,dz){
 if(x>=9&&x<=18&&z>=86&&z<=97)return true;
 if(z===10&&dz===1&&x>=3&&x<=24)return true;
 // Door reveals need clear pockets for their moving leaves.
 if(['4','9'].includes(map[z+dz]?.[x+dx]))return true;
 if(x>=25&&x<=44&&z>=20&&z<=28)return true;
 if(x===25&&dx===-1&&z>=51&&z<=53)return true;
 if(x===35&&dx===-1&&z>=50&&z<=52)return true;
 if(x>=39&&x<=55&&z>=29&&z<=46)return true;
 if(x>=37&&x<=39&&z>=42&&z<=45)return true;
 if(x===39&&dx===1&&z>=55&&z<=57)return true;
 // Authored shelves and signs occupy these wall faces; keep automatic displays clear.
 if(z===49&&dz===1&&x>=29&&x<=34)return true;
 if(x===38&&dx===-1){for(const centre of crewBedZ)if(Math.abs(z+.5-centre)<1.25)return true;}
 if(z===49&&dz===1&&x>=40&&x<=46)return true;
 if(z===66&&dz===-1&&x>=26&&x<=28)return true;
 if(x===2&&dx===1&&z>=32&&z<=41)return true;
 // Reserve the full footprint of the authored arena grilles, including neighbouring tiles.
 if((x===3&&dx===1||x===24&&dx===-1)&&dz===0){for(let centre=70;centre<86;centre+=4)if(Math.abs(z+.5-centre)<1.1)return true;}
 return false;
}
function buildDeckSurfaces(arr){
 // One floor/ceiling pair per map cell: adjoining rooms cannot draw competing surfaces.
 for(let z=0;z<MH;z++)for(let x=0;x<MW;x++){
  if(x>7&&x<20&&z>1&&z<10)continue;
  if(!['0','4','6','8','9'].includes(map[z][x])||evaExterior(x,z))continue;
  let floor='#304652',ceiling='#273945';
  const within=s=>x>s.bounds[0]&&x<s.bounds[2]&&z>s.bounds[1]&&z<s.bounds[3];
  const side=sideSpaces.find(within),repair=repairRooms.find(within);
  if(side){floor=side.name==='CREW'?'#3d3c35':side.name==='MEDBAY'?'#30433e':'#233948';ceiling='#1b2e3c';}
  if(repair){floor=repair.name==='DIELŇA'?'#42382e':'#253d33';ceiling='#1c3037';}
  G.quad(arr,[x,0,z],[x+1,0,z],[x+1,0,z+1],[x,0,z+1],[0,1,0],floor,0);
  if(!evaExterior(x,z))G.quad(arr,[x,CEIL,z+1],[x+1,CEIL,z+1],[x+1,CEIL,z],[x,CEIL,z],[0,-1,0],ceiling);
 }
}
function decorateShip(arr){const B=G.box;
 // Arena wall modules alternate ventilation and inset service panels.
 for(const x of [4.05,23.95])for(let z=70;z<86;z+=4){
  B(arr,x,1.4,z,.12,1.65,1.5,'#152d3b');for(let k=0;k<7;k++)B(arr,x+(x<13?.08:-.08),.9+k*.15,z,.045,.04,1.25,'#516572');
  B(arr,x,2.6,z,.17,.10,1.6,x<13?'#3e9f9e':'#bb784c',3);
 }
 for(const [x,z]of [[7,72],[20,72],[6.5,79.5],[19.5,79.5],[10.5,75.5],[17.5,75.5]]){B(arr,x,.14,z,1.13,.28,1.13,'#182b37');B(arr,x,3.18,z,1.1,.32,1.1,'#172b38');}
 for(const x of [8.8,18.2])for(let z=70;z<86;z+=2){B(arr,x,.013,z,.06,.02,.45,x<13?'#367b7d':'#855f44',3);}
 B(arr,13.5,3.18,67.91,1.6,.38,.10,'#142836');label(arr,'07',13.26,3.30,67.985,.065,'#67bfb8');
 // Short threshold frames give the large rooms distinct entrances.
 for(const g of gates){B(arr,13.5,.015,g.z+1.1,5,.025,1.0,'#182c37',0);for(let x=11.15;x<16;x+=.4)B(arr,x,.033,g.z+1.48,.18,.02,.15,'#9c7848',3);}
 B(arr,4.1,1.25,82,.18,.9,.7,'#243f49');B(arr,4.23,1.35,82,.035,.18,.45,'#65c6b0',3);B(arr,4.25,1.35,82,.035,.47,.13,'#65c6b0',3);
 B(arr,13.5,3.18,10.91,2.2,.38,.10,'#182b39');label(arr,'BRIDGE',12.70,3.31,10.985,.07,'#69c0b8');
 // Authored pairs mirror the doorway centre; procedural tile parity cannot offset them.
 for(const x of [6.5,10.5,16.5,20.5])B(arr,x,2.8,11.03,.72,.085,.10,'#46e6d5',3);
 for(const x of [8.5,18.5]){B(arr,x,1.8,11.05,.60,.50,.13,'#071923');B(arr,x,1.8,11.12,.48,.38,.02,'#12675f',3);for(let n=0;n<4;n++)B(arr,x,1.69+n*.065,11.145,.32,.025,.025,'#46e6d5',3);}
 // A few fine screen readouts, not walls covered in emissive stripes.


}

makeMissionAssets();makeSystemsAssets();makeHydroAssets();
makeAssets();makeEVAAssets();makeLevel();player.x=12.7;player.y=82;player.a=-1.28;enemies=[enemy(14.7,77.5),enemy(11.5,71,'shooter')];if(checkpoint)$('continue').classList.remove('hidden');requestAnimationFrame(frame);
