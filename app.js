const $ = (id) => document.getElementById(id);
const uid = (p='id') => `${p}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
const splitList = s => s.split(',').map(x=>x.trim()).filter(Boolean);
const svgToDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
const assetLibrary = {
'floral-corner':{label:'Floral Corner',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M5 35C20 20 30 14 42 10M14 45C28 30 40 22 55 14" stroke="#B77955" stroke-width="2.4" fill="none"/><circle cx="14" cy="30" r="8" fill="#E7A6B8"/><circle cx="32" cy="16" r="7" fill="#F0C987"/><circle cx="45" cy="23" r="6" fill="#C8D7A1"/><ellipse cx="58" cy="20" rx="8" ry="4" fill="#A8C686" transform="rotate(30 58 20)"/></svg>`)},
'thin-frame':{label:'Thin Frame',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="3" y="3" width="94" height="94" rx="5" fill="none" stroke="#B77955" stroke-width="2.4"/><rect x="7" y="7" width="86" height="86" rx="4" fill="none" stroke="#EAD7C3" stroke-width="1.4" stroke-dasharray="3 2"/></svg>`)},
'confetti-small':{label:'Confetti Small',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="15" cy="20" r="4" fill="#E7A6B8"/><circle cx="38" cy="12" r="3" fill="#F0C987"/><circle cx="74" cy="22" r="4" fill="#A8C686"/><path d="M22 58l8-8M58 55V43M35 82h10M70 72l8 6" stroke="#B77955" stroke-width="3"/></svg>`)},
'gold-stars':{label:'Gold Stars',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#F0C987"><path d="M18 22l4 10 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z"/><path d="M68 18l4 10 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z"/><path d="M52 60l4 10 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z"/></g></svg>`)},
'balloons':{label:'Balloons',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="30" cy="28" rx="14" ry="18" fill="#E7A6B8"/><ellipse cx="54" cy="22" rx="14" ry="18" fill="#F0C987"/><ellipse cx="72" cy="33" rx="13" ry="17" fill="#A8C686"/><path d="M30 46c0 16 4 26 10 44M54 40c-2 18-6 33-10 50M72 50c-2 12-8 24-14 40" stroke="#B77955" stroke-width="2" fill="none"/></svg>`)},
'ribbon-bottom':{label:'Ribbon Bottom',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M4 30h92v28H57l-7 12-7-12H4z" fill="#B77955" opacity=".92"/><path d="M10 37h80" stroke="#F4E8DB" stroke-width="2"/></svg>`)}
};

const schemaV1 = `{
  "version": "1.0",
  "canvas": { "ratio": "9:16", "background": "#F7F3EA" },
  "elements": [
    { "id": "event-title", "type": "text", "role": "eventTitle", "x": 10, "y": 6, "w": 80, "h": 10, "text": "כותרת האירוע", "color": "#1F2937", "fontFamily": "Heebo", "fontSize": 34, "fontWeight": 700, "align": "center" },
    { "id": "photo", "type": "photo", "x": 12, "y": 20, "w": 76, "h": 38, "objectFit": "cover", "borderRadius": 6 },
    { "id": "greeting", "type": "text", "role": "greeting", "x": 10, "y": 62, "w": 80, "h": 22, "text": "טקסט הברכה המדויק", "color": "#374151", "fontFamily": "Heebo", "fontSize": 26, "fontWeight": 400, "align": "center" },
    { "id": "guest-name", "type": "text", "role": "guestName", "x": 12, "y": 88, "w": 76, "h": 7, "text": "שם האורח", "color": "#1F2937", "fontFamily": "Heebo", "fontSize": 24, "fontWeight": 600, "align": "center" }
  ],
  "notes": []
}`;

const defaultTestCase = {
  guestName:'יניב',
  greeting:'שירי היקרה, מאחלים לך המון אושר, אהבה ושמחה בכל יום מחדש.',
  eventTitle:'יום הולדת לשירי',
  ratio:'9:16',
  allowedColors:['#F7F3EA','#1F2937','#B77955','#FFFFFF'],
  allowedFonts:['Heebo','Arial','Georgia'],
  allowedAssets:['floral-corner','thin-frame','confetti-small','gold-stars','balloons','ribbon-bottom'],
  imageDataUrl:null,
  protectedAreas:[{id:'pa1',x:0,y:0,w:100,h:4,label:'שול עליון'}]
};

const defaultBlocks = [
  ['Role','אתה מעצב קומפוזיציות לכרטיסי ברכה לאירועים. אינך משנה את תוכן האורח; אתה רק מתכנן את הפריסה והעיצוב.'],
  ['Goal','צור מפרט JSON אחד שניתן להעביר ישירות ל-Renderer. שאף לתוצאה אסתטית, מאוזנת וקריאה.'],
  ['Event constraints','השתמש רק ביחס הכרטיס, בצבעים, בגופנים וב-assets שמופיעים ב-Current test input.'],
  ['Content rules','חובה לשמור את טקסט הברכה, שם האורח וכותרת האירוע בדיוק כפי שנמסרו. אין לתקן, לקצר, לתרגם או לשכתב.'],
  ['Image rules','אם קיימת תמונה, מותר לבצע רק crop/resize/position. אין לשנות פנים, גוף, שיער, זקן, הבעה או זהות. אם אין תמונה, אין ליצור אלמנט photo.'],
  ['Graphic asset rules','אם אתה משתמש ב-asset, assetId חייב להיות אחד מה-assets המותרים. אין להמציא assets.'],
  ['Color rules','כל צבע מפורש ב-output חייב להיות מתוך allowedColors.'],
  ['Typography rules','כל fontFamily חייב להיות מתוך allowedFonts. התאם גודל טקסט לאורך התוכן ואל תחרוג ממסגרת האלמנט.'],
  ['Validator constraints','כל x,y,w,h הם באחוזים 0-100. אסור לאלמנטים לצאת מגבולות הקנבס. הימנע מחפיפות משמעותיות ומ-Protected Areas.'],
  ['Variation rules','בחר קומפוזיציה מעניינת אך עקבית עם המגבלות. אל תוסיף טקסט שלא נמסר.'],
  ['Output schema','{{SCHEMA}}'],
  ['Current test input','{{TEST_INPUT}}']
].map(([title,content])=>({id:uid('block'),title,content,enabled:true}));

let state = {
  testCase: structuredClone(defaultTestCase), blocks: structuredClone(defaultBlocks), schema:schemaV1,
  rawMode:false, rawPrompt:'', aiResponse:'', notes:'', expName:'P01 – baseline', promptVersion:'P01', showBoxes:true,
  history: JSON.parse(localStorage.getItem('design-ai-lab-history-v1') || '[]')
};

state.aiResponse = '';

function getTestInput(){const t=state.testCase;return JSON.stringify({eventTitle:t.eventTitle,guestName:t.guestName,greeting:t.greeting,hasImage:Boolean(t.imageDataUrl),ratio:t.ratio,allowedColors:t.allowedColors,allowedFonts:t.allowedFonts,allowedAssets:t.allowedAssets,protectedAreas:t.protectedAreas},null,2)}
function composedPrompt(){return state.blocks.filter(b=>b.enabled).map(b=>`## ${b.title}\n${b.content.replaceAll('{{SCHEMA}}',state.schema).replaceAll('{{TEST_INPUT}}',getTestInput())}`).join('\n\n')}
function currentPrompt(){return state.rawMode ? state.rawPrompt : composedPrompt()}
function parseResponse(){try{const t=state.aiResponse.trim();const m=t.match(/```(?:json)?\s*([\s\S]*?)```/i);return {data:JSON.parse(m?m[1]:t),error:''}}catch(e){return {data:null,error:e.message}}}
function intersects(a,b){return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y}
function validate(out,error){if(error||!out)return [{level:'error',message:`Parsing נכשל: ${error}`}]; const items=[]; const t=state.testCase;if(!out.canvas||!Array.isArray(out.elements))return [{level:'error',message:'חסרים canvas או elements.'}];
 if(out.canvas.ratio&&out.canvas.ratio!==t.ratio)items.push({level:'error',message:`יחס הכרטיס ${out.canvas.ratio} שונה מהיחס המותר ${t.ratio}.`});
 if(out.canvas.background&&!t.allowedColors.includes(out.canvas.background))items.push({level:'warning',message:`צבע הרקע ${out.canvas.background} אינו ברשימת הצבעים המותרים.`});
 const roleText={eventTitle:t.eventTitle,guestName:t.guestName,greeting:t.greeting};
 out.elements.forEach(el=>{if([el.x,el.y,el.w,el.h].some(v=>typeof v!=='number')){items.push({level:'error',message:`${el.id}: חסרות קואורדינטות מספריות.`});return} if(el.x<0||el.y<0||el.w<=0||el.h<=0||el.x+el.w>100||el.y+el.h>100)items.push({level:'error',message:`${el.id}: האלמנט יוצא מגבולות הקנבס.`});
 if(el.color&&!t.allowedColors.includes(el.color))items.push({level:'warning',message:`${el.id}: צבע ${el.color} אינו מורשה.`}); if(el.background&&!t.allowedColors.includes(el.background))items.push({level:'warning',message:`${el.id}: צבע רקע ${el.background} אינו מורשה.`}); if(el.fontFamily&&!t.allowedFonts.includes(el.fontFamily))items.push({level:'warning',message:`${el.id}: גופן ${el.fontFamily} אינו מורשה.`}); if(el.assetId&&!t.allowedAssets.includes(el.assetId))items.push({level:'error',message:`${el.id}: asset ${el.assetId} אינו מורשה.`}); if(el.role&&roleText[el.role]!==undefined&&el.text!==roleText[el.role])items.push({level:'error',message:`${el.id}: הטקסט עבור ${el.role} אינו זהה לקלט המקורי.`}); t.protectedAreas.forEach(a=>{if(intersects(el,a))items.push({level:'warning',message:`${el.id}: חופף ל-Protected Area “${a.label}”.`})})});
 const roles=new Set(out.elements.filter(e=>e.type==='text').map(e=>e.role)); ['eventTitle','guestName','greeting'].forEach(role=>{if(!roles.has(role))items.push({level:'error',message:`חסר אלמנט טקסט בתפקיד ${role}.`})}); if(!t.imageDataUrl&&out.elements.some(e=>e.type==='photo'))items.push({level:'warning',message:'ה-output כולל photo למרות שלא נטענה תמונה.'}); if(!items.length)items.push({level:'ok',message:'ה-JSON עבר את בדיקות V0.'}); return items}

function bindInputs(){
 $('eventTitle').value=state.testCase.eventTitle;$('guestName').value=state.testCase.guestName;$('greeting').value=state.testCase.greeting;$('ratio').value=state.testCase.ratio;$('allowedColors').value=state.testCase.allowedColors.join(', ');$('allowedFonts').value=state.testCase.allowedFonts.join(', ');$('allowedAssets').value=state.testCase.allowedAssets.join(', ');$('schema').value=state.schema;$('aiResponse').value=state.aiResponse;$('notes').value=state.notes;$('expName').value=state.expName;$('promptVersion').value=state.promptVersion;$('rawMode').checked=state.rawMode;$('showBoxes').checked=state.showBoxes;$('removeImage').hidden=!state.testCase.imageDataUrl;$('imageBtn').textContent=state.testCase.imageDataUrl?'החלף תמונה':'טען תמונה';renderAll();
}
function syncFromInputs(){state.testCase.eventTitle=$('eventTitle').value;state.testCase.guestName=$('guestName').value;state.testCase.greeting=$('greeting').value;state.testCase.ratio=$('ratio').value;state.testCase.allowedColors=splitList($('allowedColors').value);state.testCase.allowedFonts=splitList($('allowedFonts').value);state.testCase.allowedAssets=splitList($('allowedAssets').value);state.schema=$('schema').value;state.aiResponse=$('aiResponse').value;state.notes=$('notes').value;state.expName=$('expName').value;state.promptVersion=$('promptVersion').value;state.showBoxes=$('showBoxes').checked;renderPrompt();renderResponse()}

function renderPrompt(){const c=$('blocks');c.innerHTML=''; if(state.rawMode){c.hidden=true;$('rawPrompt').hidden=false;$('rawPrompt').value=state.rawPrompt}else{c.hidden=false;$('rawPrompt').hidden=true;state.blocks.forEach((b,i)=>{const d=document.createElement('div');d.className=`prompt-block ${b.enabled?'':'disabled'}`;d.draggable=true;d.innerHTML=`<div class="block-head"><span class="drag">⋮⋮</span><input class="block-title" value="${esc(b.title)}"><label class="mini-switch"><input type="checkbox" ${b.enabled?'checked':''}><span>${b.enabled?'ON':'OFF'}</span></label></div><textarea rows="4">${escText(b.content)}</textarea><div class="block-actions"><button data-act="up">↑</button><button data-act="down">↓</button><button data-act="dup">שכפל</button><button data-act="del">מחק</button></div>`;
 let dragFrom=null;d.addEventListener('dragstart',()=>dragFrom=i);d.addEventListener('dragover',e=>e.preventDefault());d.addEventListener('drop',()=>{if(window.__dragIndex!==undefined){moveBlock(window.__dragIndex,i);window.__dragIndex=undefined}});d.addEventListener('dragstart',()=>window.__dragIndex=i);
 const ins=d.querySelectorAll('input');ins[0].addEventListener('input',e=>{state.blocks[i].title=e.target.value;renderPromptLength()});ins[1].addEventListener('change',e=>{state.blocks[i].enabled=e.target.checked;renderPrompt()});d.querySelector('textarea').addEventListener('input',e=>{state.blocks[i].content=e.target.value;renderPromptLength()});d.querySelector('[data-act=up]').onclick=()=>moveBlock(i,i-1);d.querySelector('[data-act=down]').onclick=()=>moveBlock(i,i+1);d.querySelector('[data-act=dup]').onclick=()=>{state.blocks.splice(i+1,0,{...state.blocks[i],id:uid('block'),title:state.blocks[i].title+' copy'});renderPrompt()};d.querySelector('[data-act=del]').onclick=()=>{state.blocks.splice(i,1);renderPrompt()};c.appendChild(d)})}renderPromptLength()}
function moveBlock(from,to){if(to<0||to>=state.blocks.length||from===to)return;const [x]=state.blocks.splice(from,1);state.blocks.splice(to,0,x);renderPrompt()}
function renderPromptLength(){$('promptLength').textContent=`${currentPrompt().length.toLocaleString()} תווים`}

function assetImgHtml(assetId){const meta=assetLibrary[assetId];return meta?`<img class="asset-render" src="${meta.svg}" alt="${esc(assetId)}">`:`<div class="asset-placeholder">${esc(assetId||'ASSET')}</div>`}
function renderAssetLibrary(){const host=$('assetLibrary');if(!host)return;host.innerHTML='';Object.entries(assetLibrary).forEach(([id,meta])=>{const d=document.createElement('div');d.className='asset-chip';d.innerHTML=`<div class="asset-thumb">${assetImgHtml(id)}</div><div class="asset-name">${id}</div><div class="muted">${state.testCase.allowedAssets.includes(id)?'מותר בניסוי':'לא כלול כעת'}</div>`;host.appendChild(d)})}
function renderProtected(){const host=$('protectedAreas');host.innerHTML='';state.testCase.protectedAreas.forEach((a,i)=>{const r=document.createElement('div');r.className='area-row';r.innerHTML=`<input value="${esc(a.label)}">${['x','y','w','h'].map(k=>`<label>${k}<input type="number" data-k="${k}" value="${a[k]}"></label>`).join('')}<button>×</button>`;r.children[0].addEventListener('input',e=>{a.label=e.target.value;renderResponse()});r.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('input',e=>{a[e.target.dataset.k]=Number(e.target.value);renderResponse()}));r.querySelector('button').onclick=()=>{state.testCase.protectedAreas.splice(i,1);renderProtected();renderResponse()};host.appendChild(r)})}

function renderResponse(){const {data,error}=parseResponse();const tag=$('parseTag');tag.textContent=error?'INVALID JSON':'PARSED';tag.className=`tag ${error?'bad':'good'}`;const vals=validate(data,error);$('validation').innerHTML=vals.map(v=>`<div class="validation ${v.level}"><span>${v.level==='error'?'×':v.level==='warning'?'!':'✓'}</span>${esc(v.message)}</div>`).join('');renderCanvas(data)}
function renderCanvas(out){const c=$('canvas');const t=state.testCase;c.innerHTML='';c.style.aspectRatio=t.ratio==='1:1'?'1 / 1':t.ratio==='4:5'?'4 / 5':'9 / 16';c.style.background=(out&&out.canvas&&out.canvas.background)||t.allowedColors[0]||'#fff';t.protectedAreas.forEach(a=>{const d=document.createElement('div');d.className='protected';d.style.cssText=`left:${a.x}%;top:${a.y}%;width:${a.w}%;height:${a.h}%`;d.innerHTML=`<span>${esc(a.label)}</span>`;c.appendChild(d)}); if(!out){c.innerHTML+='<div class="preview-error">אין JSON תקין לרינדור</div>';return} (out.elements||[]).forEach(el=>{const d=document.createElement('div');d.dataset.type=el.type;d.title=`${el.id} · ${el.x},${el.y},${el.w},${el.h}`;Object.assign(d.style,{position:'absolute',left:`${el.x}%`,top:`${el.y}%`,width:`${el.w}%`,height:`${el.h}%`,color:el.color||'',background:el.background||'',fontFamily:el.fontFamily||'',fontSize:el.fontSize?`${Math.max(10,Math.min(36,el.fontSize*.72))}px`:'',fontWeight:el.fontWeight||'',textAlign:el.align==='start'?'start':el.align==='end'?'end':'center',borderRadius:el.borderRadius?`${el.borderRadius}%`:'',outline:state.showBoxes?'1px dashed rgba(37,99,235,.65)':'none',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:el.align==='start'?'flex-start':el.align==='end'?'flex-end':'center',padding:el.type==='text'?'2px':'0',whiteSpace:'pre-wrap',lineHeight:'1.15'}); if(state.showBoxes)d.insertAdjacentHTML('beforeend',`<span class="box-label">${esc(el.id)}</span>`);if(el.type==='photo'){if(t.imageDataUrl){const img=document.createElement('img');img.src=t.imageDataUrl;img.alt='תמונת אורח';img.style.cssText=`width:100%;height:100%;object-fit:${el.objectFit||'cover'}`;d.appendChild(img)}else d.insertAdjacentHTML('beforeend','<div class="photo-placeholder">PHOTO</div>')}else if(el.type==='text')d.append(document.createTextNode(el.text||''));else if(el.type==='emoji')d.insertAdjacentHTML('beforeend',`<span style="font-size:2em">${esc(el.emoji||'✨')}</span>`);else if(el.type==='asset')d.insertAdjacentHTML('beforeend',assetImgHtml(el.assetId));c.appendChild(d)})}

function renderHistory(){const h=state.history;$('historyCount').textContent=h.length;const g=$('historyGrid');if(!h.length){g.innerHTML='<div class="empty">עדיין לא נשמרו ניסויים.</div>';return}g.innerHTML='';h.forEach((exp,i)=>{const card=document.createElement('article');card.className='history-card';card.innerHTML=`<div><strong>${esc(exp.name)}</strong><div class="muted">${esc(exp.promptVersion)} · ${new Date(exp.createdAt).toLocaleString('he-IL')}</div></div><p>${esc(exp.notes||'ללא הערות')}</p><div class="row"><button class="primary" data-load>טען ניסוי</button><button data-del>מחק</button></div>`;card.querySelector('[data-load]').onclick=()=>loadExperiment(exp);card.querySelector('[data-del]').onclick=()=>{state.history.splice(i,1);persistHistory();renderHistory()};g.appendChild(card)})}
function saveExperiment(){syncFromInputs();const exp={id:uid('exp'),name:state.expName||'Untitled experiment',createdAt:new Date().toISOString(),promptVersion:state.promptVersion,testCase:structuredClone(state.testCase),blocks:structuredClone(state.blocks),rawMode:state.rawMode,rawPrompt:state.rawPrompt,schema:state.schema,aiResponse:state.aiResponse,notes:state.notes};state.history.unshift(exp);persistHistory();renderHistory();flash('נשמר')}
function loadExperiment(exp){state={...state,testCase:structuredClone(exp.testCase),blocks:structuredClone(exp.blocks),rawMode:exp.rawMode,rawPrompt:exp.rawPrompt,schema:exp.schema,aiResponse:exp.aiResponse,notes:exp.notes,expName:exp.name,promptVersion:exp.promptVersion};showLab();bindInputs();renderProtected()}
function persistHistory(){localStorage.setItem('design-ai-lab-history-v1',JSON.stringify(state.history));$('historyCount').textContent=state.history.length}
function exportExperiment(){syncFromInputs();const data={name:state.expName,promptVersion:state.promptVersion,testCase:state.testCase,blocks:state.blocks,rawMode:state.rawMode,rawPrompt:state.rawPrompt,schema:state.schema,aiResponse:state.aiResponse,notes:state.notes};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${(state.expName||'experiment').replace(/[^a-zA-Z0-9-_א-ת]+/g,'_')}.json`;a.click();URL.revokeObjectURL(url)}
function importExperiment(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);state.testCase=d.testCase||structuredClone(defaultTestCase);state.blocks=d.blocks||structuredClone(defaultBlocks);state.rawMode=Boolean(d.rawMode);state.rawPrompt=d.rawPrompt||'';state.schema=d.schema||schemaV1;state.aiResponse=d.aiResponse||'';state.notes=d.notes||'';state.expName=d.name||'Imported';state.promptVersion=d.promptVersion||'import';bindInputs();renderProtected()}catch{alert('קובץ JSON לא תקין')}};r.readAsText(file)}
function showLab(){$('labView').hidden=false;$('historyView').hidden=true;$('tabLab').className='primary';$('tabHistory').className=''}
function showHistory(){$('labView').hidden=true;$('historyView').hidden=false;$('tabLab').className='';$('tabHistory').className='primary';renderHistory()}
function flash(msg){const old=$('saveExp').textContent;$('saveExp').textContent=msg;setTimeout(()=>$('saveExp').textContent=old,800)}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function escText(s=''){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function renderAll(){renderAssetLibrary();renderProtected();renderPrompt();renderResponse();renderHistory()}

['eventTitle','guestName','greeting','ratio','allowedColors','allowedFonts','allowedAssets','schema','aiResponse','notes','expName','promptVersion','showBoxes'].forEach(id=>$(id).addEventListener(id==='ratio'||id==='showBoxes'?'change':'input',syncFromInputs));
$('rawMode').onchange=e=>{state.rawMode=e.target.checked;if(state.rawMode)state.rawPrompt=composedPrompt();renderPrompt()};$('rawPrompt').oninput=e=>{state.rawPrompt=e.target.value;renderPromptLength()};$('addBlock').onclick=()=>{state.blocks.push({id:uid('block'),title:'New block',enabled:true,content:'כתוב כאן הוראה חדשה.'});renderPrompt()};$('copyPrompt').onclick=async()=>{await navigator.clipboard.writeText(currentPrompt());$('copyPrompt').textContent='הועתק';setTimeout(()=>$('copyPrompt').textContent='העתק Prompt',900)};$('resetSchema').onclick=()=>{state.schema=schemaV1;$('schema').value=schemaV1;renderPromptLength()};$('addProtected').onclick=()=>{state.testCase.protectedAreas.push({id:uid('pa'),x:0,y:0,w:20,h:10,label:'אזור חדש'});renderProtected();renderResponse()};
$('imageBtn').onclick=()=>$('imageFile').click();$('imageFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{state.testCase.imageDataUrl=r.result;$('removeImage').hidden=false;$('imageBtn').textContent='החלף תמונה';renderResponse();renderPromptLength()};r.readAsDataURL(f)};$('removeImage').onclick=()=>{state.testCase.imageDataUrl=null;$('removeImage').hidden=true;$('imageBtn').textContent='טען תמונה';renderResponse();renderPromptLength()};
$('saveExp').onclick=saveExperiment;$('exportExp').onclick=exportExperiment;$('importExp').onclick=()=>$('importFile').click();$('importFile').onchange=e=>e.target.files[0]&&importExperiment(e.target.files[0]);$('tabLab').onclick=showLab;$('tabHistory').onclick=showHistory;

bindInputs();