(function(g){"use strict";

var a="kd-",b=["control","alt","shift","meta"],c=new Set(["fn","function"]),d={cmd:"meta",command:"meta",ctrl:"control",ctl:"control",option:"alt",opt:"alt",esc:"escape",return:"enter",spacebar:"space"," ":"space",del:"delete",bksp:"backspace","arrow-up":"arrowup","arrow-down":"arrowdown","arrow-left":"arrowleft","arrow-right":"arrowright",up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright"},e={Space:"space",Escape:"escape",Backspace:"backspace",Enter:"enter",NumpadEnter:"num-enter",Tab:"tab",CapsLock:"capslock",Delete:"delete",Insert:"insert",Home:"home",End:"end",PageUp:"pageup",PageDown:"pagedown",ArrowUp:"arrowup",ArrowDown:"arrowdown",ArrowLeft:"arrowleft",ArrowRight:"arrowright",ShiftLeft:"shift",ShiftRight:"shift",ControlLeft:"control",ControlRight:"control",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta",ContextMenu:"contextmenu",PrintScreen:"printscreen",ScrollLock:"scrolllock",Pause:"pause",NumLock:"numlock",Minus:"minus",Equal:"equal",BracketLeft:"bracket-left",BracketRight:"bracket-right",Backslash:"backslash",Semicolon:"semicolon",Quote:"quote",Backquote:"backquote",Comma:"comma",Period:"period",Slash:"slash",NumpadAdd:"num-add",NumpadSubtract:"num-subtract",NumpadMultiply:"num-multiply",NumpadDivide:"num-divide",NumpadDecimal:"num-decimal"};

function f(q){var r=String(q).toLowerCase();
if(r===" ")return d[r];
r=r.trim();
return d[r]||r}
function h(q){var r=String(q).split("+").map(f).filter(Boolean);
if(r.some(function(s){return c.has(s)}))return"";
var t=b.filter(function(s){return r.includes(s)}),u=r.filter(function(s){return!b.includes(s)});
return t.concat(u).join("+")}
function i(q,r){if(e[q])return e[q];
if(/^Key[A-Z]$/.test(q))return q.slice(3).toLowerCase();
if(/^Digit[0-9]$/.test(q))return q.slice(5);
if(/^Numpad[0-9]$/.test(q))return"num-"+q.slice(6);
if(/^F([1-9]|1[0-9]|2[0-4])$/.test(q))return q.toLowerCase();
return f(r||"")}
function j(q){var r=i(q.code,q.key);
if(!r)return"";
var s=[q.ctrlKey&&"control",q.altKey&&"alt",q.shiftKey&&"shift",q.metaKey&&"meta"].filter(Boolean);
if(b.includes(r)){if(!s.includes(r))s.push(r);
return h(s.join("+"))}return h(s.concat(r).join("+"))}
function k(q,r){q=String(q||"");
if(q.startsWith(a))q=q.slice(a.length);
var s=q.split("--"),t=s.shift();
if(!t||!r)return null;
t=h(t);
if(!t)return null;
return{shortcut:t,action:r.toLowerCase(),label:s.join("--")}}
function l(q,r){q.dispatchEvent(new CustomEvent("keydownjs:trigger",{detail:r}))}
function z(q){return Boolean(q&&(q.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(q.tagName)))}
function m(q){q=q||{};
this.root=q.root||document;
this.ignoreRepeat=q.ignoreRepeat??false;
this.preventDefault=q.preventDefault??false;
this.autoPreventDefault=q.autoPreventDefault??true;
this.bindings=new Map;
this.actions=new Map;
this.pointerPosition=null;
this.pointerTarget=null;
this.handleKeydown=this.handleKeydown.bind(this);
this.handlePointerMove=this.handlePointerMove.bind(this);
this.registerAction("show",function(r){r.element.style.display=r.element.dataset.kdDisplay||"block"});
this.registerAction("hide",function(r){r.element.style.display="none"});
this.registerAction("toggle",function(r){var s=r.element;
s.style.display=s.style.display==="none"?s.dataset.kdDisplay||"block":"none"});
this.registerAction("click",function(r){r.controller.resolveClickTarget(r.element).click()})}
m.prototype.registerAction=function(q,r){if(typeof r!=="function")throw new TypeError("Action handler must be a function.");
this.actions.set(String(q).toLowerCase(),r);
return this};

m.prototype.refresh=function(){var q=this;
this.bindings.clear();
this.root.querySelectorAll("[data-kd-sc][data-kd-ac]").forEach(function(r){var s=k(r.dataset.kdSc,r.dataset.kdAc);
if(!s)return;
if(q.autoPreventDefault&&r.dataset.kdPreventDefault===undefined)r.dataset.kdPreventDefault="true";
var t=q.bindings.get(s.shortcut)||[];
t.push(Object.assign({element:r},s));
q.bindings.set(s.shortcut,t)});
return this};

m.prototype.handlePointerMove=function(q){this.pointerPosition={x:q.clientX,y:q.clientY};
this.pointerTarget=q.target||null};

m.prototype.resolveClickTarget=function(q){var r=this.root.ownerDocument||this.root,s=this.pointerPosition||{},t=s.x,u=s.y;
if(Number.isFinite(t)&&Number.isFinite(u)&&typeof r.elementFromPoint==="function")return r.elementFromPoint(t,u)||this.pointerTarget||q;
return this.pointerTarget||q};

m.prototype.start=function(){this.refresh();
this.root.addEventListener("keydown",this.handleKeydown);
this.root.addEventListener("pointermove",this.handlePointerMove);
return this};

m.prototype.stop=function(){this.root.removeEventListener("keydown",this.handleKeydown);
this.root.removeEventListener("pointermove",this.handlePointerMove);
return this};

m.prototype.handleKeydown=function(q){if(this.ignoreRepeat&&q.repeat)return;
if(z(q.target))return;
var r=this,s=j(q);
if(!s)return;
var t=this.bindings.get(s);
if(!t)return;
var u=[];
t.forEach(function(v){var w=r.actions.get(v.action);
if(!w)return;
var x=Object.assign({event:q,shortcut:s,controller:r},v);
w(x);
l(v.element,x);
u.push(v)});
if(!u.length)return;
if((this.preventDefault||u.some(function(v){return v.element.dataset.kdPreventDefault==="true"}))&&typeof q.preventDefault==="function")q.preventDefault()};

function n(q){return new m(q)}
function o(){if(!p.controller)p.controller=n().start();
return p.controller}
var p={KeydownJS:m,createKeydown:n,normalizeKeyName:f,normalizeShortcut:h,codeToKey:i,eventToShortcut:j,parseBinding:k,start:o,controller:null};

g.keydownJS=p;
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",o);
else o()
})(window);
