const $ = (id) => document.getElementById(id);
const uid = (p='id') => `${p}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
const splitList = s => s.split(',').map(x=>x.trim()).filter(Boolean);
const svgToDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
const fontLibrary = ['Heebo','Assistant','Rubik','Alef','Frank Ruhl Libre','Secular One','Noto Sans Hebrew','Noto Serif Hebrew'];
const maskLibrary = {
  'rectangle':{label:'Rectangle',clipPath:'none',radius:'0'},
  'rounded':{label:'Rounded',clipPath:'none',radius:'10%'},
  'oval':{label:'Oval',clipPath:'ellipse(49% 48% at 50% 50%)'},
  'arch':{label:'Arch',clipPath:'polygon(0 22%,8% 10%,20% 3%,50% 0,80% 3%,92% 10%,100% 22%,100% 100%,0 100%)'},
  'diagonal':{label:'Diagonal',clipPath:'polygon(0 10%,100% 0,92% 100%,0 90%)'},
  'organic-wave-1':{label:'Organic Wave 1',clipPath:'polygon(0 10%,14% 5%,30% 9%,47% 3%,66% 8%,83% 2%,100% 7%,100% 91%,86% 97%,68% 92%,50% 98%,31% 91%,14% 96%,0 90%)'},
  'organic-wave-2':{label:'Organic Wave 2',clipPath:'polygon(0 4%,18% 10%,35% 5%,52% 11%,70% 4%,86% 9%,100% 3%,100% 96%,82% 90%,65% 96%,47% 89%,28% 95%,12% 89%,0 94%)'},
  'blob':{label:'Blob',clipPath:'polygon(8% 18%,25% 6%,48% 10%,69% 3%,90% 18%,96% 40%,89% 62%,96% 82%,76% 96%,52% 90%,29% 97%,8% 82%,3% 59%,9% 39%)'},
  'brush-edge':{label:'Brush Edge',clipPath:'polygon(0 8%,8% 4%,14% 11%,23% 5%,31% 10%,39% 3%,48% 9%,57% 4%,68% 11%,77% 5%,88% 10%,100% 3%,100% 95%,90% 91%,82% 97%,73% 90%,62% 96%,52% 89%,42% 95%,32% 90%,22% 97%,12% 91%,0 96%)'}
};
const shapeLibrary = {
  'wave-top':{label:'Wave Top',clipPath:'polygon(0 0,100% 0,100% 68%,84% 74%,67% 66%,48% 78%,30% 68%,14% 76%,0 70%)'},
  'wave-bottom':{label:'Wave Bottom',clipPath:'polygon(0 30%,14% 24%,30% 32%,48% 22%,67% 34%,84% 26%,100% 32%,100% 100%,0 100%)'},
  'diagonal-panel':{label:'Diagonal Panel',clipPath:'polygon(0 0,100% 0,74% 100%,0 82%)'},
  'soft-blob':{label:'Soft Blob',clipPath:'polygon(8% 20%,28% 4%,55% 9%,78% 3%,96% 24%,90% 52%,98% 78%,72% 96%,45% 89%,20% 97%,3% 72%,9% 46%)'},
  'arch-panel':{label:'Arch Panel',clipPath:'polygon(0 26%,7% 14%,20% 6%,50% 0,80% 6%,93% 14%,100% 26%,100% 100%,0 100%)'},
  'ribbon':{label:'Ribbon',clipPath:'polygon(0 12%,43% 12%,50% 0,57% 12%,100% 12%,92% 50%,100% 88%,57% 88%,50% 100%,43% 88%,0 88%,8% 50%)'},
  'circle':{label:'Circle',clipPath:'circle(48% at 50% 50%)'},
  'pill':{label:'Pill',clipPath:'inset(0 round 999px)'},
  'brush-band':{label:'Brush Band',clipPath:'polygon(0 20%,7% 12%,16% 22%,27% 10%,38% 18%,49% 9%,60% 20%,72% 11%,84% 21%,100% 12%,96% 82%,84% 73%,72% 86%,60% 76%,49% 88%,37% 74%,25% 85%,13% 75%,0 84%)'}
};
const assetLibrary = {
'floral-corner':{label:'Floral Corner',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M5 35C20 20 30 14 42 10M14 45C28 30 40 22 55 14" stroke="#B77955" stroke-width="2.4" fill="none"/><circle cx="14" cy="30" r="8" fill="#E7A6B8"/><circle cx="32" cy="16" r="7" fill="#F0C987"/><circle cx="45" cy="23" r="6" fill="#C8D7A1"/><ellipse cx="58" cy="20" rx="8" ry="4" fill="#A8C686" transform="rotate(30 58 20)"/></svg>`)},
'thin-frame':{label:'Thin Frame',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="3" y="3" width="94" height="94" rx="5" fill="none" stroke="#B77955" stroke-width="2.4"/><rect x="7" y="7" width="86" height="86" rx="4" fill="none" stroke="#EAD7C3" stroke-width="1.4" stroke-dasharray="3 2"/></svg>`)},
'confetti-small':{label:'Confetti Small',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="15" cy="20" r="4" fill="#E7A6B8"/><circle cx="38" cy="12" r="3" fill="#F0C987"/><circle cx="74" cy="22" r="4" fill="#A8C686"/><path d="M22 58l8-8M58 55V43M35 82h10M70 72l8 6" stroke="#B77955" stroke-width="3"/></svg>`)},
'gold-stars':{label:'Gold Stars',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#F0C987"><path d="M18 22l4 10 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z"/><path d="M68 18l4 10 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z"/><path d="M52 60l4 10 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z"/></g></svg>`)},
'balloons':{label:'Balloons',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="30" cy="28" rx="14" ry="18" fill="#E7A6B8"/><ellipse cx="54" cy="22" rx="14" ry="18" fill="#F0C987"/><ellipse cx="72" cy="33" rx="13" ry="17" fill="#A8C686"/><path d="M30 46c0 16 4 26 10 44M54 40c-2 18-6 33-10 50M72 50c-2 12-8 24-14 40" stroke="#B77955" stroke-width="2" fill="none"/></svg>`)},
'ribbon-bottom':{label:'Ribbon Bottom',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M4 30h92v28H57l-7 12-7-12H4z" fill="#B77955" opacity=".92"/><path d="M10 37h80" stroke="#F4E8DB" stroke-width="2"/></svg>`)},
'heart-divider':{label:'Heart Divider',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><path d="M2 20h72M126 20h72" stroke="#B77955" stroke-width="2"/><path d="M100 31C82 19 88 5 100 16C112 5 118 19 100 31Z" fill="none" stroke="#B77955" stroke-width="3"/></svg>`)},
'botanical-cluster':{label:'Botanical Cluster',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><path d="M10 108C35 80 48 50 58 12M42 77C58 68 74 59 91 42" stroke="#B77955" stroke-width="2.5" fill="none"/><g fill="#1F2937"><ellipse cx="31" cy="82" rx="8" ry="18" transform="rotate(-45 31 82)"/><ellipse cx="48" cy="58" rx="8" ry="18" transform="rotate(-25 48 58)"/><ellipse cx="72" cy="52" rx="7" ry="16" transform="rotate(55 72 52)"/></g><g fill="#B77955"><ellipse cx="54" cy="33" rx="7" ry="16" transform="rotate(15 54 33)"/><circle cx="92" cy="41" r="5"/><circle cx="101" cy="31" r="4"/></g></svg>`)},
'geometric-corner':{label:'Geometric Corner',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M0 0h62L0 62z" fill="#1F2937"/><path d="M0 0h48L0 48z" fill="#B77955" opacity=".9"/><path d="M0 72L72 0" stroke="#FFFFFF" stroke-width="3"/></svg>`)},
'brush-swoosh':{label:'Brush Swoosh',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60"><path d="M5 36C35 13 80 16 109 27C137 38 156 25 176 12" fill="none" stroke="#B77955" stroke-width="12" stroke-linecap="round" opacity=".85"/><path d="M8 44C48 29 95 35 139 28" fill="none" stroke="#B77955" stroke-width="3" opacity=".45"/></svg>`)},
'dot-grid':{label:'Dot Grid',svg:svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#B77955">${[20,40,60,80].flatMap(x=>[20,40,60,80].map(y=>`<circle cx="${x}" cy="${y}" r="3"/>`)).join('')}</g></svg>`)}
};

const schemaV1 = `{
  "version": "2.0",
  "canvas": { "ratio": "9:16", "background": "#F7F3EA" },
  "elements": [
    { "id": "bg-wave", "type": "shape", "shapeId": "wave-bottom", "x": 0, "y": 70, "w": 100, "h": 30, "fill": "#1F2937", "zIndex": 1 },
    { "id": "photo", "type": "photo", "x": 4, "y": 34, "w": 92, "h": 48, "maskId": "organic-wave-1", "crop": { "x": 50, "y": 45, "zoom": 1.08 }, "zIndex": 5 },
    { "id": "event-title", "type": "text", "role": "eventTitle", "x": 8, "y": 6, "w": 84, "h": 10, "text": "כותרת האירוע", "color": "#B77955", "fontFamily": "Frank Ruhl Libre", "fontSize": 38, "fontWeight": 700, "align": "center", "zIndex": 20 },
    { "id": "greeting", "type": "text", "role": "greeting", "x": 10, "y": 18, "w": 80, "h": 16, "text": "טקסט הברכה המדויק", "color": "#1F2937", "fontFamily": "Heebo", "fontSize": 27, "fontWeight": 400, "align": "center", "lineHeight": 1.15, "zIndex": 20 },
    { "id": "decor", "type": "asset", "assetId": "botanical-cluster", "x": 68, "y": 76, "w": 35, "h": 24, "rotation": -8, "opacity": 0.95, "zIndex": 30 },
    { "id": "guest-name", "type": "text", "role": "guestName", "x": 15, "y": 90, "w": 70, "h": 6, "text": "שם האורח", "color": "#FFFFFF", "fontFamily": "Assistant", "fontSize": 23, "fontWeight": 600, "align": "center", "zIndex": 40 }
  ],
  "notes": []
}`;

const defaultTestCase = {
  guestName:'יניב',
  greeting:'שירי היקרה, מאחלים לך המון אושר, אהבה ושמחה בכל יום מחדש.',
  eventTitle:'יום הולדת לשירי',
  ratio:'9:16',
  palette:{base:'#F7F3EA',secondary:'#FFFFFF',dominant:'#1F2937',accent:'#B77955'},
  allowedFonts:[...fontLibrary],
  allowedAssets:['floral-corner','thin-frame','confetti-small','gold-stars','balloons','ribbon-bottom','heart-divider','botanical-cluster','geometric-corner','brush-swoosh','dot-grid'],
  allowedMasks:Object.keys(maskLibrary),
  allowedShapes:Object.keys(shapeLibrary),
  imageDataUrl:null,
  protectedAreas:[{id:'pa1',x:0,y:0,w:100,h:4,label:'שול עליון'}]
};

const defaultBlocks = [
  ['Role','אתה מעצב קומפוזיציות לכרטיסי ברכה לאירועים. אינך משנה את תוכן האורח; אתה רק מתכנן את הפריסה והעיצוב.'],
  ['Goal','צור מפרט JSON אחד שניתן להעביר ישירות ל-Renderer. שאף לתוצאה אסתטית, מאוזנת וקריאה.'],
  ['Event constraints','השתמש רק ביחס הכרטיס, בפלטת הצבעים, בגופנים וב-assets שמופיעים ב-Current test input.'],
  ['Content rules','חובה לשמור את טקסט הברכה, שם האורח וכותרת האירוע בדיוק כפי שנמסרו. אין לתקן, לקצר, לתרגם או לשכתב.'],
  ['Image rules','אם קיימת תמונה, מותר לבצע רק crop/resize/position. אין לשנות פנים, גוף, שיער, זקן, הבעה או זהות. אם אין תמונה, אין ליצור אלמנט photo.'],
  ['Graphic asset rules','אם אתה משתמש ב-asset, assetId חייב להיות אחד מה-assets המותרים. אין להמציא assets.'],
  ['Color rules','כל צבע מפורש ב-output חייב להיות אחד מערכי palette. משמעות תפקידי הצבעים: base = צבע הבסיס של הכרטיס, בדרך כלל צבע הרקע או המשטח הגדול ביותר; secondary = צבע משני שתומך בבסיס ומשמש למשטחים, מסגרות או פרטים משלימים; dominant = הצבע המרכזי שמגדיר את האופי החזותי של הכרטיס ומשמש לכותרות או אלמנטים גרפיים מרכזיים; accent = צבע הדגשה לשימוש מצומצם בפרטים קטנים, נקודות מוקד או אלמנטים שרוצים להבליט. אין חובה להשתמש בכל ארבעת הצבעים, אך אין להשתמש בצבעים מחוץ לפלטה. יש לשמור על ניגודיות וקריאות של הטקסט.'],
  ['Typography rules','כל fontFamily חייב להיות מתוך allowedFonts. התאם גודל טקסט לאורך התוכן ואל תחרוג ממסגרת האלמנט.'],
  ['Renderer capabilities','ה-Renderer תומך בשכבות zIndex, rotation, flipX/flipY, opacity; בתמונה: maskId ו-crop עם x,y,zoom; ב-shape: shapeId, fill, stroke, strokeWidth; בטקסט: lineHeight, letterSpacing וגם segments לעיצוב חלקים שונים בלי לשנות את הטקסט. השתמש ביכולות האלה כדי ליצור קומפוזיציה עשירה ולא פריסה של מלבנים בלבד.'],
  ['Validator constraints','כל x,y,w,h הם באחוזים. טקסט ותמונה צריכים להישאר בתוך הקנבס; shapes ו-assets יכולים לגלוש מעט מעבר לקצה לצורך קומפוזיציה. הימנע מ-Protected Areas.'],
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

function paletteValues(t){return Object.values(t.palette||{}).filter(Boolean)}
function normalizeTestCase(t){const n={...structuredClone(defaultTestCase),...t};if(!n.palette){const c=t?.allowedColors||[];n.palette={base:c[0]||'#F7F3EA',secondary:c[3]||c[1]||'#FFFFFF',dominant:c[1]||'#1F2937',accent:c[2]||'#B77955'}}delete n.allowedColors;return n}
function getTestInput(){const t=state.testCase;return JSON.stringify({eventTitle:t.eventTitle,guestName:t.guestName,greeting:t.greeting,hasImage:Boolean(t.imageDataUrl),ratio:t.ratio,palette:t.palette,allowedFonts:t.allowedFonts,allowedAssets:t.allowedAssets,allowedMasks:t.allowedMasks,allowedShapes:t.allowedShapes,protectedAreas:t.protectedAreas},null,2)}
function composedPrompt(){return state.blocks.filter(b=>b.enabled).map(b=>`## ${b.title}\n${b.content.replaceAll('{{SCHEMA}}',state.schema).replaceAll('{{TEST_INPUT}}',getTestInput())}`).join('\n\n')}
function currentPrompt(){return state.rawMode ? state.rawPrompt : composedPrompt()}
function parseResponse(){try{const t=state.aiResponse.trim();const m=t.match(/```(?:json)?\s*([\s\S]*?)```/i);return {data:JSON.parse(m?m[1]:t),error:''}}catch(e){return {data:null,error:e.message}}}
function intersects(a,b){return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y}
function validate(out,error){if(error||!out)return [{level:'error',message:`Parsing נכשל: ${error}`}]; const items=[]; const t=state.testCase;if(!out.canvas||!Array.isArray(out.elements))return [{level:'error',message:'חסרים canvas או elements.'}];
 if(out.canvas.ratio&&out.canvas.ratio!==t.ratio)items.push({level:'error',message:`יחס הכרטיס ${out.canvas.ratio} שונה מהיחס המותר ${t.ratio}.`});
 const allowedPalette=paletteValues(t);if(out.canvas.background&&!allowedPalette.includes(out.canvas.background))items.push({level:'warning',message:`צבע הרקע ${out.canvas.background} אינו בפלטת הצבעים.`});
 const roleText={eventTitle:t.eventTitle,guestName:t.guestName,greeting:t.greeting};
 out.elements.forEach(el=>{if([el.x,el.y,el.w,el.h].some(v=>typeof v!=='number')){items.push({level:'error',message:`${el.id}: חסרות קואורדינטות מספריות.`});return} const visual=el.type==='shape'||el.type==='asset';if(el.w<=0||el.h<=0||(!visual&&(el.x<0||el.y<0||el.x+el.w>100||el.y+el.h>100))||(visual&&(el.x<-25||el.y<-25||el.x+el.w>125||el.y+el.h>125)))items.push({level:'error',message:`${el.id}: האלמנט חורג מעבר לטווח המותר.`});
 if(el.color&&!allowedPalette.includes(el.color))items.push({level:'warning',message:`${el.id}: צבע ${el.color} אינו בפלטה.`}); if(el.background&&!allowedPalette.includes(el.background))items.push({level:'warning',message:`${el.id}: צבע רקע ${el.background} אינו בפלטה.`}); if(el.fill&&!allowedPalette.includes(el.fill))items.push({level:'warning',message:`${el.id}: fill ${el.fill} אינו בפלטה.`}); if(el.stroke&&!allowedPalette.includes(el.stroke))items.push({level:'warning',message:`${el.id}: stroke ${el.stroke} אינו בפלטה.`}); if(el.fontFamily&&!t.allowedFonts.includes(el.fontFamily))items.push({level:'warning',message:`${el.id}: גופן ${el.fontFamily} אינו מורשה.`}); (el.segments||[]).forEach(s=>{if(s.fontFamily&&!t.allowedFonts.includes(s.fontFamily))items.push({level:'warning',message:`${el.id}: גופן segment ${s.fontFamily} אינו מורשה.`});if(s.color&&!allowedPalette.includes(s.color))items.push({level:'warning',message:`${el.id}: צבע segment ${s.color} אינו בפלטה.`})}); if(el.assetId&&!t.allowedAssets.includes(el.assetId))items.push({level:'error',message:`${el.id}: asset ${el.assetId} אינו מורשה.`}); if(el.maskId&&!(t.allowedMasks||[]).includes(el.maskId))items.push({level:'error',message:`${el.id}: mask ${el.maskId} אינו מורשה.`}); if(el.shapeId&&!(t.allowedShapes||[]).includes(el.shapeId))items.push({level:'error',message:`${el.id}: shape ${el.shapeId} אינו מורשה.`}); const renderedText=el.text!==undefined?el.text:(el.segments||[]).map(s=>s.text||'').join(''); if(el.role&&roleText[el.role]!==undefined&&renderedText!==roleText[el.role])items.push({level:'error',message:`${el.id}: הטקסט עבור ${el.role} אינו זהה לקלט המקורי.`}); t.protectedAreas.forEach(a=>{if(intersects(el,a))items.push({level:'warning',message:`${el.id}: חופף ל-Protected Area “${a.label}”.`})})});
 const roles=new Set(out.elements.filter(e=>e.type==='text').map(e=>e.role)); ['eventTitle','guestName','greeting'].forEach(role=>{if(!roles.has(role))items.push({level:'error',message:`חסר אלמנט טקסט בתפקיד ${role}.`})}); if(!t.imageDataUrl&&out.elements.some(e=>e.type==='photo'))items.push({level:'warning',message:'ה-output כולל photo למרות שלא נטענה תמונה.'}); if(!items.length)items.push({level:'ok',message:'ה-JSON עבר את בדיקות V0.'}); return items}

function bindInputs(){
 state.testCase=normalizeTestCase(state.testCase);$('eventTitle').value=state.testCase.eventTitle;$('guestName').value=state.testCase.guestName;$('greeting').value=state.testCase.greeting;$('ratio').value=state.testCase.ratio;$('paletteBase').value=state.testCase.palette.base;$('paletteSecondary').value=state.testCase.palette.secondary;$('paletteDominant').value=state.testCase.palette.dominant;$('paletteAccent').value=state.testCase.palette.accent;$('allowedFonts').value=state.testCase.allowedFonts.join(', ');$('allowedAssets').value=state.testCase.allowedAssets.join(', ');$('allowedMasks').value=(state.testCase.allowedMasks||Object.keys(maskLibrary)).join(', ');$('allowedShapes').value=(state.testCase.allowedShapes||Object.keys(shapeLibrary)).join(', ');$('schema').value=state.schema;$('aiResponse').value=state.aiResponse;$('notes').value=state.notes;$('expName').value=state.expName;$('promptVersion').value=state.promptVersion;$('rawMode').checked=state.rawMode;$('showBoxes').checked=state.showBoxes;$('removeImage').hidden=!state.testCase.imageDataUrl;$('imageBtn').textContent=state.testCase.imageDataUrl?'החלף תמונה':'טען תמונה';$('imagePromptNotice').hidden=!state.testCase.imageDataUrl;renderAll();
}
function syncFromInputs(){state.testCase.eventTitle=$('eventTitle').value;state.testCase.guestName=$('guestName').value;state.testCase.greeting=$('greeting').value;state.testCase.ratio=$('ratio').value;state.testCase.palette={base:$('paletteBase').value.trim(),secondary:$('paletteSecondary').value.trim(),dominant:$('paletteDominant').value.trim(),accent:$('paletteAccent').value.trim()};state.testCase.allowedFonts=splitList($('allowedFonts').value);state.testCase.allowedAssets=splitList($('allowedAssets').value);state.testCase.allowedMasks=splitList($('allowedMasks').value);state.testCase.allowedShapes=splitList($('allowedShapes').value);state.schema=$('schema').value;state.aiResponse=$('aiResponse').value;state.notes=$('notes').value;state.expName=$('expName').value;state.promptVersion=$('promptVersion').value;state.showBoxes=$('showBoxes').checked;renderPrompt();renderResponse()}

function renderPrompt(){const c=$('blocks');c.innerHTML=''; if(state.rawMode){c.hidden=true;$('rawPrompt').hidden=false;$('rawPrompt').value=state.rawPrompt}else{c.hidden=false;$('rawPrompt').hidden=true;state.blocks.forEach((b,i)=>{const d=document.createElement('div');d.className=`prompt-block ${b.enabled?'':'disabled'}`;d.draggable=true;d.innerHTML=`<div class="block-head"><span class="drag">⋮⋮</span><input class="block-title" value="${esc(b.title)}"><label class="mini-switch"><input type="checkbox" ${b.enabled?'checked':''}><span>${b.enabled?'ON':'OFF'}</span></label></div><textarea rows="4">${escText(b.content)}</textarea><div class="block-actions"><button data-act="up">↑</button><button data-act="down">↓</button><button data-act="dup">שכפל</button><button data-act="del">מחק</button></div>`;
 let dragFrom=null;d.addEventListener('dragstart',()=>dragFrom=i);d.addEventListener('dragover',e=>e.preventDefault());d.addEventListener('drop',()=>{if(window.__dragIndex!==undefined){moveBlock(window.__dragIndex,i);window.__dragIndex=undefined}});d.addEventListener('dragstart',()=>window.__dragIndex=i);
 const ins=d.querySelectorAll('input');ins[0].addEventListener('input',e=>{state.blocks[i].title=e.target.value;renderPromptLength()});ins[1].addEventListener('change',e=>{state.blocks[i].enabled=e.target.checked;renderPrompt()});d.querySelector('textarea').addEventListener('input',e=>{state.blocks[i].content=e.target.value;renderPromptLength()});d.querySelector('[data-act=up]').onclick=()=>moveBlock(i,i-1);d.querySelector('[data-act=down]').onclick=()=>moveBlock(i,i+1);d.querySelector('[data-act=dup]').onclick=()=>{state.blocks.splice(i+1,0,{...state.blocks[i],id:uid('block'),title:state.blocks[i].title+' copy'});renderPrompt()};d.querySelector('[data-act=del]').onclick=()=>{state.blocks.splice(i,1);renderPrompt()};c.appendChild(d)})}renderPromptLength()}
function moveBlock(from,to){if(to<0||to>=state.blocks.length||from===to)return;const [x]=state.blocks.splice(from,1);state.blocks.splice(to,0,x);renderPrompt()}
function renderPromptLength(){$('promptLength').textContent=`${currentPrompt().length.toLocaleString()} תווים`}

function assetImgHtml(assetId){const meta=assetLibrary[assetId];return meta?`<img class="asset-render" src="${meta.svg}" alt="${esc(assetId)}">`:`<div class="asset-placeholder">${esc(assetId||'ASSET')}</div>`}
function libraryChip(host,id,label,preview,allowed){const d=document.createElement('div');d.className='asset-chip';d.innerHTML=`<div class="asset-thumb">${preview}</div><div class="asset-name">${esc(id)}</div><div class="muted">${allowed?'מותר בניסוי':'לא כלול כעת'}</div>`;host.appendChild(d)}
function renderAssetLibrary(){
 const ah=$('assetLibrary'),mh=$('maskLibrary'),sh=$('shapeLibrary'),fh=$('fontLibrary');[ah,mh,sh,fh].forEach(x=>{if(x)x.innerHTML='' });
 Object.entries(assetLibrary).forEach(([id,meta])=>libraryChip(ah,id,meta.label,assetImgHtml(id),state.testCase.allowedAssets.includes(id)));
 Object.entries(maskLibrary).forEach(([id,meta])=>libraryChip(mh,id,meta.label,`<div class="shape-preview" style="clip-path:${meta.clipPath};border-radius:${meta.radius||0}"></div>`,(state.testCase.allowedMasks||[]).includes(id)));
 Object.entries(shapeLibrary).forEach(([id,meta])=>libraryChip(sh,id,meta.label,`<div class="shape-preview" style="clip-path:${meta.clipPath}"></div>`,(state.testCase.allowedShapes||[]).includes(id)));
 fontLibrary.forEach(f=>{const d=document.createElement('div');d.className='font-chip';d.innerHTML=`<div class="font-sample" style="font-family:'${esc(f)}'">שירי היקרה</div><div class="asset-name">${esc(f)}</div>`;fh.appendChild(d)});
}
function renderProtected(){const host=$('protectedAreas');host.innerHTML='';state.testCase.protectedAreas.forEach((a,i)=>{const r=document.createElement('div');r.className='area-row';r.innerHTML=`<input value="${esc(a.label)}">${['x','y','w','h'].map(k=>`<label>${k}<input type="number" data-k="${k}" value="${a[k]}"></label>`).join('')}<button>×</button>`;r.children[0].addEventListener('input',e=>{a.label=e.target.value;renderResponse()});r.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('input',e=>{a[e.target.dataset.k]=Number(e.target.value);renderResponse()}));r.querySelector('button').onclick=()=>{state.testCase.protectedAreas.splice(i,1);renderProtected();renderResponse()};host.appendChild(r)})}

function renderResponse(){const {data,error}=parseResponse();const tag=$('parseTag');tag.textContent=error?'INVALID JSON':'PARSED';tag.className=`tag ${error?'bad':'good'}`;const vals=validate(data,error);$('validation').innerHTML=vals.map(v=>`<div class="validation ${v.level}"><span>${v.level==='error'?'×':v.level==='warning'?'!':'✓'}</span>${esc(v.message)}</div>`).join('');renderCanvas(data)}
function applyTransform(el,d){const sx=el.flipX?-1:1,sy=el.flipY?-1:1;d.style.transform=`rotate(${el.rotation||0}deg) scale(${sx},${sy})`;d.style.opacity=el.opacity??1;d.style.zIndex=el.zIndex??10}
function renderCanvas(out){
 const c=$('canvas'),t=state.testCase;c.innerHTML='';c.style.aspectRatio=t.ratio==='1:1'?'1 / 1':t.ratio==='4:5'?'4 / 5':'9 / 16';c.style.background=(out&&out.canvas&&out.canvas.background)||t.palette?.base||'#fff';
 t.protectedAreas.forEach(a=>{const d=document.createElement('div');d.className='protected';d.style.cssText=`left:${a.x}%;top:${a.y}%;width:${a.w}%;height:${a.h}%;z-index:999`;d.innerHTML=`<span>${esc(a.label)}</span>`;c.appendChild(d)});
 if(!out){c.innerHTML+='<div class="preview-error">אין JSON תקין לרינדור</div>';return}
 (out.elements||[]).forEach(el=>{
  const d=document.createElement('div');d.dataset.type=el.type;d.title=`${el.id} · ${el.x},${el.y},${el.w},${el.h}`;
  Object.assign(d.style,{position:'absolute',left:`${el.x}%`,top:`${el.y}%`,width:`${el.w}%`,height:`${el.h}%`,color:el.color||'',background:el.background||'',fontFamily:el.fontFamily||'',fontSize:el.fontSize?`${Math.max(9,Math.min(46,el.fontSize*.72))}px`:'',fontWeight:el.fontWeight||'',textAlign:el.align==='start'?'start':el.align==='end'?'end':'center',borderRadius:el.borderRadius?`${el.borderRadius}%`:'',outline:state.showBoxes?'1px dashed rgba(37,99,235,.65)':'none',overflow:el.type==='asset'?'visible':'hidden',padding:el.type==='text'?'2px':'0',whiteSpace:'pre-wrap',lineHeight:String(el.lineHeight||1.15),letterSpacing:el.letterSpacing?`${el.letterSpacing}px`:''});
  applyTransform(el,d);
  if(state.showBoxes)d.insertAdjacentHTML('beforeend',`<span class="box-label">${esc(el.id)}</span>`);
  if(el.type==='photo'){
   const mask=maskLibrary[el.maskId||'rectangle'];if(mask){d.style.clipPath=mask.clipPath;d.style.borderRadius=mask.radius||d.style.borderRadius}
   if(t.imageDataUrl){const img=document.createElement('img');img.src=t.imageDataUrl;img.alt='תמונת אורח';const crop=el.crop||{};img.style.cssText=`width:100%;height:100%;object-fit:${el.objectFit||'cover'};object-position:${crop.x??50}% ${crop.y??50}%;transform:scale(${crop.zoom||1});transform-origin:${crop.x??50}% ${crop.y??50}%`;d.appendChild(img)}else d.insertAdjacentHTML('beforeend','<div class="photo-placeholder">PHOTO</div>')
  }else if(el.type==='shape'){
   const shape=shapeLibrary[el.shapeId];if(shape)d.style.clipPath=shape.clipPath;d.style.background=el.fill||el.background||t.palette?.secondary||'#fff';if(el.stroke){d.style.border=`${el.strokeWidth||1}px solid ${el.stroke}`}
  }else if(el.type==='text'){
   d.style.display='flex';d.style.flexDirection='column';d.style.alignItems=el.align==='start'?'flex-start':el.align==='end'?'flex-end':'center';d.style.justifyContent=el.verticalAlign==='start'?'flex-start':el.verticalAlign==='end'?'flex-end':'center';d.dir='rtl';
   if(Array.isArray(el.segments)&&el.segments.length){el.segments.forEach(s=>{const sp=document.createElement('span');sp.textContent=s.text||'';sp.style.display=s.inline?'inline':'block';sp.style.fontFamily=s.fontFamily||el.fontFamily||'';sp.style.fontSize=s.fontSize?`${Math.max(9,Math.min(48,s.fontSize*.72))}px`:'';sp.style.fontWeight=s.fontWeight||'';sp.style.color=s.color||el.color||'';sp.style.lineHeight=String(s.lineHeight||el.lineHeight||1.15);d.appendChild(sp)})}else d.append(document.createTextNode(el.text||''));
  }else if(el.type==='emoji'){d.style.display='grid';d.style.placeItems='center';d.insertAdjacentHTML('beforeend',`<span style="font-size:${el.fontSize||32}px">${esc(el.emoji||'✨')}</span>`)}
  else if(el.type==='asset'){d.insertAdjacentHTML('beforeend',assetImgHtml(el.assetId))}
  c.appendChild(d)
 })
}

function renderHistory(){const h=state.history;$('historyCount').textContent=h.length;const g=$('historyGrid');if(!h.length){g.innerHTML='<div class="empty">עדיין לא נשמרו ניסויים.</div>';return}g.innerHTML='';h.forEach((exp,i)=>{const card=document.createElement('article');card.className='history-card';card.innerHTML=`<div><strong>${esc(exp.name)}</strong><div class="muted">${esc(exp.promptVersion)} · ${new Date(exp.createdAt).toLocaleString('he-IL')}</div></div><p>${esc(exp.notes||'ללא הערות')}</p><div class="row"><button class="primary" data-load>טען ניסוי</button><button data-del>מחק</button></div>`;card.querySelector('[data-load]').onclick=()=>loadExperiment(exp);card.querySelector('[data-del]').onclick=()=>{state.history.splice(i,1);persistHistory();renderHistory()};g.appendChild(card)})}
function saveExperiment(){syncFromInputs();const exp={id:uid('exp'),name:state.expName||'Untitled experiment',createdAt:new Date().toISOString(),promptVersion:state.promptVersion,testCase:structuredClone(state.testCase),blocks:structuredClone(state.blocks),rawMode:state.rawMode,rawPrompt:state.rawPrompt,schema:state.schema,aiResponse:state.aiResponse,notes:state.notes};state.history.unshift(exp);persistHistory();renderHistory();flash('נשמר')}
function loadExperiment(exp){state={...state,testCase:normalizeTestCase(exp.testCase),blocks:structuredClone(exp.blocks),rawMode:exp.rawMode,rawPrompt:exp.rawPrompt,schema:exp.schema,aiResponse:exp.aiResponse,notes:exp.notes,expName:exp.name,promptVersion:exp.promptVersion};showLab();bindInputs();renderProtected()}
function persistHistory(){localStorage.setItem('design-ai-lab-history-v1',JSON.stringify(state.history));$('historyCount').textContent=state.history.length}
function exportExperiment(){syncFromInputs();const data={name:state.expName,promptVersion:state.promptVersion,testCase:state.testCase,blocks:state.blocks,rawMode:state.rawMode,rawPrompt:state.rawPrompt,schema:state.schema,aiResponse:state.aiResponse,notes:state.notes};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${(state.expName||'experiment').replace(/[^a-zA-Z0-9-_א-ת]+/g,'_')}.json`;a.click();URL.revokeObjectURL(url)}
function importExperiment(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);state.testCase=normalizeTestCase(d.testCase||structuredClone(defaultTestCase));state.blocks=d.blocks||structuredClone(defaultBlocks);state.rawMode=Boolean(d.rawMode);state.rawPrompt=d.rawPrompt||'';state.schema=d.schema||schemaV1;state.aiResponse=d.aiResponse||'';state.notes=d.notes||'';state.expName=d.name||'Imported';state.promptVersion=d.promptVersion||'import';bindInputs();renderProtected()}catch{alert('קובץ JSON לא תקין')}};r.readAsText(file)}
function showLab(){$('labView').hidden=false;$('historyView').hidden=true;$('tabLab').className='primary';$('tabHistory').className=''}
function showHistory(){$('labView').hidden=true;$('historyView').hidden=false;$('tabLab').className='';$('tabHistory').className='primary';renderHistory()}
function flash(msg){const old=$('saveExp').textContent;$('saveExp').textContent=msg;setTimeout(()=>$('saveExp').textContent=old,800)}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function escText(s=''){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function renderAll(){renderAssetLibrary();renderProtected();renderPrompt();renderResponse();renderHistory()}

['eventTitle','guestName','greeting','ratio','paletteBase','paletteSecondary','paletteDominant','paletteAccent','allowedFonts','allowedAssets','allowedMasks','allowedShapes','schema','aiResponse','notes','expName','promptVersion','showBoxes'].forEach(id=>$(id).addEventListener(id==='ratio'||id==='showBoxes'?'change':'input',syncFromInputs));
$('rawMode').onchange=e=>{state.rawMode=e.target.checked;if(state.rawMode)state.rawPrompt=composedPrompt();renderPrompt()};$('rawPrompt').oninput=e=>{state.rawPrompt=e.target.value;renderPromptLength()};$('addBlock').onclick=()=>{state.blocks.push({id:uid('block'),title:'New block',enabled:true,content:'כתוב כאן הוראה חדשה.'});renderPrompt()};$('copyPrompt').onclick=async()=>{await navigator.clipboard.writeText(currentPrompt());$('copyPrompt').textContent='הועתק';setTimeout(()=>$('copyPrompt').textContent='העתק Prompt',900)};$('resetSchema').onclick=()=>{state.schema=schemaV1;$('schema').value=schemaV1;renderPromptLength()};$('addProtected').onclick=()=>{state.testCase.protectedAreas.push({id:uid('pa'),x:0,y:0,w:20,h:10,label:'אזור חדש'});renderProtected();renderResponse()};
$('imageBtn').onclick=()=>$('imageFile').click();$('imageFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{state.testCase.imageDataUrl=r.result;$('removeImage').hidden=false;$('imageBtn').textContent='החלף תמונה';$('imagePromptNotice').hidden=false;renderResponse();renderPromptLength()};r.readAsDataURL(f)};$('removeImage').onclick=()=>{state.testCase.imageDataUrl=null;$('removeImage').hidden=true;$('imageBtn').textContent='טען תמונה';$('imagePromptNotice').hidden=true;renderResponse();renderPromptLength()};
$('saveExp').onclick=saveExperiment;$('exportExp').onclick=exportExperiment;$('importExp').onclick=()=>$('importFile').click();$('importFile').onchange=e=>e.target.files[0]&&importExperiment(e.target.files[0]);$('tabLab').onclick=showLab;$('tabHistory').onclick=showHistory;

bindInputs();