(this["webpackJsonptype-oh"]=this["webpackJsonptype-oh"]||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),c=n(4),a=n.n(c),u=(n(12),n(1)),i=n(6);var l=function(e,t,n){return e[n]?e.charCodeAt(n)===t.charCodeAt(n)?"yay":"nay":"empty"},s=function(e){return 32===e.charCodeAt(0)},f=function(e){switch(e){case"yay":return"#c7b798";case"nay":return"#f56c42";default:return"#808080"}},d=function(){return o.a.createElement("h1",{style:{margin:"4rem"}},"Type-OH")},p=function(e){var t=e.testText,n=e.isRunning,c=e.onStart,a=e.onFinish,d=e.latestWPM,p=Object(r.useRef)(null),h=Object(r.useState)(""),b=Object(u.a)(h,2),m=b[0],g=b[1],y=Object(r.useState)(!1),v=Object(u.a)(y,2),j=v[0],O=v[1];Object(r.useEffect)((function(){""!==t&&m.length===t.length&&n&&(a(m),w())}),[m,t,n,a]),Object(r.useEffect)((function(){return g("")}),[t]),Object(r.useEffect)((function(){var e=function(e){13!==e.keyCode||j||E()};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]);var E=function(){p&&p.current&&p.current.focus()},w=function(){p&&p.current&&p.current.blur()};return t?o.a.createElement(r.Fragment,null,o.a.createElement("div",{onClick:E,style:{position:"relative",maxWidth:720,fontSize:"calc(10px + 2vmin)",textAlign:"center",wordSpacing:"0.25rem"}},t.split("").map((function(e,n){var r=l(m,t,n),c=f(r),a=s(e)&&"nay"===r,u=n===m.length-1,d=0===m.length,p=j?{borderLeft:d&&0===n?"solid 2px ".concat("#c7b798"):"none",borderRight:"solid 2px ".concat(u&&!d?"#c7b798":"#282d33"),borderRadius:u||d?0:8}:{borderRight:"solid 2px transparent",borderLeft:d&&0===n?"solid 2px transparent":"none",borderRadius:8};return o.a.createElement("span",{key:n,style:Object(i.a)({color:c,backgroundColor:a?"#f56c42":"transparent"},p)},e)})),!j&&o.a.createElement("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"grid",placeItems:"center",backgroundColor:"#282d33",opacity:.8,verticalAlign:"center",cursor:"pointer"}},"Click here to start typing! (or press Enter)"),!j&&d&&o.a.createElement("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"grid",placeItems:"center",backgroundColor:"#282d33",color:"#c7b798",fontSize:24,pointerEvents:"none"}},d)),o.a.createElement("input",{ref:p,value:m,onChange:function(e){n||c(),g(e.target.value)},onFocus:function(){return O(!0)},onBlur:function(){return O(!1)},style:{position:"absolute",top:"-999999px",left:"-999999px"}})):null},h=n(2),b=n.n(h),m=n(5),g="qwertyuiopasdfghjkl;zxcvbnm,.-QWERTYUIOPASDFGHJKL:ZXCVBNM<>_()|!@#$%&/'\"*{}[]^~`]\\?=+1234567890",y=function(e,t,n){var o=Object(r.useState)([]),c=Object(u.a)(o,2),a=c[0],i=c[1];return Object(r.useEffect)((function(){n||("words"!==t||n||function(){var t=Object(m.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://random-word-api.herokuapp.com/word?number=".concat(e)).then((function(e){return e.json()})).then((function(e){i(e)})).catch((function(e){console.log(e),i("failed to retreive words".split(" "))}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()(),"chars"!==t||n||i(function(e){for(var t=[],n=0;n<e;n++){for(var r="",o=0;o<5;o++){var c=Math.floor(Math.random()*g.length);r+=g[c]}t.push(r)}return t}(e)))}),[e,t,n]),a.join(" ")};var v=function(){var e=Object(r.useState)("chars"),t=Object(u.a)(e,2),n=t[0],c=(t[1],Object(r.useState)(!1)),a=Object(u.a)(c,2),i=a[0],l=a[1],s=Object(r.useState)(null),f=Object(u.a)(s,2),h=f[0],b=f[1],m=Object(r.useState)(null),g=Object(u.a)(m,2),v=g[0],j=g[1],O=y(15,n,i),E=function(e){return h?Math.round(15/((e-h)/6e4)):0};return o.a.createElement(r.Fragment,null,o.a.createElement("main",{style:{display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#282d33",height:"100vh",color:"white"}},o.a.createElement(d,null),o.a.createElement(p,{testText:O,isRunning:i,onStart:function(){l(!0),b(Date.now())},onFinish:function(e){console.log(e),l(!1),j(E(Date.now())),b(null)},latestWPM:v})))};a.a.render(o.a.createElement(v,null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.abf3b746.chunk.js.map