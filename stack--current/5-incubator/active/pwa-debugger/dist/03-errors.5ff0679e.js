!function(e,o,r,t,n){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},f="function"==typeof i[t]&&i[t],u=f.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(o,r){if(!u[o]){if(!e[o]){var n="function"==typeof i[t]&&i[t];if(!r&&n)return n(o,!0);if(f)return f(o,!0);if(l&&"string"==typeof o)return l(o);var d=Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}a.resolve=function(r){var t=e[o][1][r];return null!=t?t:r},a.cache={};var s=u[o]=new c.Module(o);e[o][0].call(s.exports,a,s,s.exports,this)}return u[o].exports;function a(e){var o=a.resolve(e);return!1===o?{}:c(o)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=u,c.parent=f,c.register=function(o,r){e[o]=[function(e,o){o.exports=r},{}]},Object.defineProperty(c,"root",{get:function(){return i[t]}}),i[t]=c;for(var d=0;d<o.length;d++)c(o[d])}({"5OYww":[function(e,o,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var t=e("@offirmo-private/soft-execution-context"),n=e("@offirmo-private/soft-execution-context--browser");let i="padding: .5em; background-color: red; color: white; font-weight: bold;";async function f(){let e=(0,t.getRootSXC)();e.emitter.on("final-error",function({SXC:e,err:o,CHANNEL:r}){try{if(console.group('%cSXC "final-error" event!',i),"dev"===r){console.error("%c↑ error! (no report since dev)",i,{SXC:e,err:o});return}console.groupEnd()}catch(e){console.log("%c RECURSIVE CRASH!!! SXC ERROR HANDLING CAN ABSOLUTELY NOT CRASH!!! FIX THIS!!!",i),console.log(e)}}),(0,n.listenToErrorEvents)(),(0,n.listenToUnhandledRejections)(),e.xTry("init:SXC",({logger:e,SXC:o})=>{e.debug("Root SXC is now decorated with error details ✔",o.getErrorDetails())})}r.default=f},{"@offirmo-private/soft-execution-context":"iE00d","@offirmo-private/soft-execution-context--browser":"eXTgB","@parcel/transformer-js/src/esmodule-helpers.js":"fCxzd"}],fCxzd:[function(e,o,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,o){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(o,r)||Object.defineProperty(o,r,{enumerable:!0,get:function(){return e[r]}})}),o},r.export=function(e,o,r){Object.defineProperty(e,o,{enumerable:!0,get:r})}},{}]},[],0,"parcelRequire375b");
//# sourceMappingURL=03-errors.5ff0679e.js.map