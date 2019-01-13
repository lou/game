parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"BSXI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.populateKeysMap=exports.keysMap=void 0;var e={};exports.keysMap=e;var o=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter","Space"],r=function(){o.includes(event.code)&&(e[event.code]="keydown"==event.type)};exports.populateKeysMap=r;
},{}],"Dryx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ctx=exports.canvas=void 0;var e=document.getElementById("board");exports.canvas=e;var t=e.getContext("2d");exports.ctx=t;
},{}],"NO7M":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.collision=void 0;var e=function(e,t){var i=t.x+t.width>=e.x&&t.x<=e.x+e.width,o=t.y+t.height>=e.y&&t.y<=e.y+e.height;return i&&o};exports.collision=e;
},{}],"iqpj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resetShip=exports.drawShip=exports.munitions=exports.ship=void 0;var e=require("./canvas"),t=require("./keys"),i=require("./collision");function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},r=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),r.forEach(function(t){o(e,t,i[t])})}return e}function o(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var n={speed:6,width:30,height:30,x:e.canvas.width/2-20,y:e.canvas.height-60,hit:!1,opacity:1},c=r({},n);exports.ship=c;var a=function(){t.keysMap.ArrowUp&&(c.y-=c.speed),t.keysMap.ArrowDown&&(c.y+=c.speed),t.keysMap.ArrowLeft&&(c.x-=c.speed),t.keysMap.ArrowRight&&(c.x+=c.speed),c.x=Math.max(Math.min(c.x,e.canvas.width-c.width),0),c.y=Math.max(Math.min(c.y,e.canvas.height-c.height),0)},p=[];exports.munitions=p;var s={width:3,height:3,speed:-10,power:1},h=function(){p.forEach(function(t,i){y(t,i),t.y+=t.speed,e.ctx.fillStyle="rgb(0, 0, 0)",e.ctx.fillRect(t.x,t.y,t.width,t.height)})},y=function(e,t){e.y<=0&&p.splice(t,1)},u=function(){t.keysMap.Space&&p.push(r({},s,{x:c.x+c.width/2-2,y:c.y}))},f=-1,l=function(){c.hit?(c.opacity+=.08*f,c.opacity<=.2&&(f=1),c.opacity>=1&&(f=-1)):c.opacity=1},x=function(){a(),u(),h(),l(),e.ctx.fillStyle="rgb(0, 0, 0, ".concat(c.opacity,")"),e.ctx.fillRect(c.x,c.y,c.width,c.height)};exports.drawShip=x;var d=function(){exports.ship=c=r({},n)};exports.resetShip=d;
},{"./canvas":"Dryx","./keys":"BSXI","./collision":"NO7M"}],"FO+Z":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.random=void 0;var e=function(e,r){return Math.random()*(e-r)+r};exports.random=e;
},{}],"AP9e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resetLife=exports.generateLife=exports.drawLife=exports.life=exports.lifeDefault=void 0;var e=require("./canvas"),t=require("./ship"),r=require("./collision"),i=require("./game"),o=require("./utils");function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},i=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),i.forEach(function(t){n(e,t,r[t])})}return e}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c={width:16,height:16,collided:!1,y:50,x:200,speed:.5};exports.lifeDefault=c;var f=l({},c);exports.life=f;var s=function(){(0,r.collision)(f,t.ship)&&(i.game.lifes+=1,f.y=-100,f.collided=!0),f.y+=f.speed},a=function(){f.collided||(s(),e.ctx.fillStyle="black",e.ctx.fillRect(f.x,f.y,f.width,f.height),e.ctx.font="8px sans-serif",e.ctx.fillStyle="white",e.ctx.fillText("♥",f.x+4,f.y+11))};exports.drawLife=a;var u=function(){(f.y<0||f.y>e.canvas.height)&&(f.x=(0,o.random)(10,e.canvas.width-20),f.y=(0,o.random)(-200,-800),f.speed=(0,o.random)(1,3),f.collided=!1)};exports.generateLife=u;var p=function(){exports.life=f=l({},c)};exports.resetLife=p;
},{"./canvas":"Dryx","./ship":"iqpj","./collision":"NO7M","./game":"QcRT","./utils":"FO+Z"}],"QcRT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateLevel=exports.gameOver=exports.reset=exports.drawStatusBar=exports.game=exports.gameDefault=exports.statusBar=void 0;var e=require("./life"),t=require("./ship"),r=require("./enemies");function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},s=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),s.forEach(function(t){a(e,t,r[t])})}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var n=document.getElementById("status-bar");exports.statusBar=n;var o=document.getElementById("lifes"),u=document.getElementById("stage"),i=document.getElementById("score"),c={lifes:1,stage:0,paused:!0,over:!1,score:0};exports.gameDefault=c;var l=s({},c);exports.game=l;var p={lifes:null,stage:null,score:null},f=function(){l.lifes!==p.lifes&&(o.innerHTML="♥ ".concat(l.lifes),p.lifes=l.lifes),l.stage!==p.stage&&(u.innerText="Stage ".concat(l.stage),p.stage=l.stage),l.score!==p.score&&(i.innerText=l.score.toLocaleString(),p.score=l.score)};exports.drawStatusBar=f;var g=function(){(0,t.resetShip)(),(0,e.resetLife)(),(0,r.resetEnemies)(),exports.game=l=s({},c,{paused:!1})};exports.reset=g;var m=function(){l.paused=!0,l.over=!0};exports.gameOver=m;var d=function(){l.stage+=1,(0,e.generateLife)(),(0,r.generateEnemies)()};exports.updateLevel=d;
},{"./life":"AP9e","./ship":"iqpj","./enemies":"0Hh9"}],"0Hh9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resetEnemies=exports.drawEnemies=exports.generateEnemies=void 0;var e=require("../canvas"),t=require("../ship"),i=require("../collision"),n=require("../game"),r=require("../utils");function o(e){return c(e)||a(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}var u=30,p=[],h=function(){p=[].concat(o(p),o(o(Array(u+n.game.stage).keys()).map(function(i){return{speed:(0,r.random)(.1,Math.min(1+n.game.stage,t.ship.speed-1)),width:20,height:20,armor:10,points:{hit:1,shotDown:10},x:(0,r.random)(0,e.canvas.width-20),y:(0,r.random)(-1e3,-30)}})))};exports.generateEnemies=h;var f=function(e){!t.ship.hit&&(0,i.collision)(e,t.ship)&&(t.ship.hit=!0,n.game.lifes-=1,setTimeout(function(){t.ship.hit=!1},2e3))},l=function(e,r){t.munitions.forEach(function(o,s){(0,i.collision)(e,o)&&(e.armor-=o.power,n.game.score+=e.points.hit,e.armor<=0&&(n.game.score+=e.points.shotDown,p.splice(r,1)),t.munitions.splice(s,1))})},m=function(){p.forEach(function(e,t){d(e,t),f(e),l(e,t),e.y+=e.speed})},g=function(){p.length<=u&&(0,n.updateLevel)(),m(),p.forEach(function(t){e.ctx.fillStyle="rgb(50, 50, 50)",e.ctx.fillRect(t.x,t.y,t.width,t.height)})};exports.drawEnemies=g;var d=function(t,i){t.y>e.canvas.height&&p.splice(i,1)},y=function(){p=[]};exports.resetEnemies=y;
},{"../canvas":"Dryx","../ship":"iqpj","../collision":"NO7M","../game":"QcRT","../utils":"FO+Z"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./keys"),n=require("./canvas"),a=require("./enemies"),t=require("./life"),s=require("./ship"),r=require("./game"),i=document.getElementById("game-status"),u=function(){n.ctx.clearRect(0,0,n.canvas.width,n.canvas.height),(0,a.drawEnemies)(),(0,t.drawLife)(),(0,s.drawShip)(),(0,r.drawStatusBar)(),c()},d=function n(){setTimeout(function(){r.game.over&&e.keysMap.Enter&&(0,r.reset)(),0===r.game.lifes&&(0,r.gameOver)(),u(),r.game.paused||requestAnimationFrame(n)},1e3/60)},c=function(){r.game.paused?(i.style.display="block",r.game.over?i.innerHTML="\n        GAME OVER\n        <br />\n        Press Enter to Restart\n      ":i.innerHTML="\n        &#10074;&#10074; Paused\n        <br />\n        Press Enter to resume\n      "):i.style.display="none"},o=function(){r.game.paused=!1,d()},m=function(){r.game.paused=!0,d()},p=function(){r.game.paused?o():m()};n.canvas.addEventListener("click",function(){n.canvas.focus()}),n.canvas.addEventListener("focus",function(){r.game.paused&&o()}),n.canvas.addEventListener("blur",function(){r.game.paused||m()}),window.addEventListener("keydown",function(){"Enter"===event.code&&p(),(0,e.populateKeysMap)()}),window.addEventListener("keyup",function(){(0,e.populateKeysMap)()});
},{"./keys":"BSXI","./canvas":"Dryx","./enemies":"0Hh9","./life":"AP9e","./ship":"iqpj","./game":"QcRT"}]},{},["Focm"], null)
//# sourceMappingURL=/game/dist/src.f21c0226.map