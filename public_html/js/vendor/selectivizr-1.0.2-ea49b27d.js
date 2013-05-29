/*
selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms 
of the MIT license.

selectivizr.com
*/
/* 
  
Notes about this source
-----------------------

 * The #DEBUG_START and #DEBUG_END comments are used to mark blocks of code
   that will be removed prior to building a final release version (using a
   pre-compression script)
  
  
References:
-----------
 
 * CSS Syntax          : http://www.w3.org/TR/2003/WD-css3-syntax-20030813/#style
 * Selectors           : http://www.w3.org/TR/css3-selectors/#selectors
 * IE Compatability    : http://msdn.microsoft.com/en-us/library/cc351024(VS.85).aspx
 * W3C Selector Tests  : http://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/html/tests/
 
*/
(function(e){function O(e){return e.replace(v,A).replace(m,function(e,t,n){var r=n.split(",");for(var i=0,s=r.length;i<s;i++){var o=I(r[i])+L,u=[];r[i]=o.replace(g,function(e,t,n,r,i){if(t)return u.length>0&&(D(o.substring(0,i),u),u=[]),t;var s=n?_(n):M(r);return s?(u.push(s),"."+s.className):e})}return t+r.join(",")})}function M(e){return!S||S.test(e)?{className:H(e),applyClass:!0}:null}function _(t){var r=!0,s=H(t.slice(1)),o=t.substring(0,5)==":not(",a,f;o&&(t=t.slice(5,-1));var l=t.indexOf("(");l>-1&&(t=t.substring(0,l));if(t.charAt(0)==":")switch(t.slice(1)){case"root":r=function(e){return o?e!=n:e==n};break;case"target":if(i==8){r=function(t){var n=function(){var e=location.hash,n=e.slice(1);return o?e==k||t.id!=n:e!=k&&t.id==n};return U(e,"hashchange",function(){q(t,s,n())}),n()};break}return!1;case"checked":r=function(e){return E.test(e.type)&&U(e,"propertychange",function(){event.propertyName=="checked"&&q(e,s,e.checked!==o)}),e.checked!==o};break;case"disabled":o=!o;case"enabled":r=function(e){return w.test(e.tagName)?(U(e,"propertychange",function(){event.propertyName=="$disabled"&&q(e,s,e.$disabled===o)}),u.push(e),e.$disabled=e.disabled,e.disabled===o):t==":enabled"?o:!o};break;case"focus":a="focus",f="blur";case"hover":a||(a="mouseenter",f="mouseleave"),r=function(e){return U(e,o?f:a,function(){q(e,s,!0)}),U(e,o?a:f,function(){q(e,s,!1)}),o};break;default:if(!d.test(t))return!1}return{className:s,applyClass:r}}function D(e,t){var n,r=e.replace(y,k);if(r==k||r.charAt(r.length-1)==L)r+="*";try{n=o(r)}catch(i){B("Selector '"+e+"' threw exception '"+i+"'")}if(n)for(var s=0,u=n.length;s<u;s++){var a=n[s],f=a.className;for(var l=0,c=t.length;l<c;l++){var h=t[l];P(a,h)||h.applyClass&&(h.applyClass===!0||h.applyClass(a)===!0)&&(f=R(f,h.className,!0))}a.className=f}}function P(e,t){return(new RegExp("(^|\\s)"+t.className+"(\\s|$)")).test(e.className)}function H(e){return l+"-"+(i==6&&f?a++:e.replace(b,function(e){return e.charCodeAt(0)}))}function B(t){e.console&&e.console.log(t)}function j(e){return e.replace(C,A)}function F(e){return j(e).replace(N,L)}function I(e){return F(e.replace(x,A).replace(T,A))}function q(e,t,n){var r=e.className,i=R(r,t,n);i!=r&&(e.className=i,e.parentNode.className+=k)}function R(e,t,n){var r=RegExp("(^|\\s)"+t+"(\\s|$)"),i=r.test(e);return n?i?e:e+L+t:i?j(e.replace(r,A)):e}function U(e,t,n){e.attachEvent("on"+t,n)}function z(){if(e.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){return null}}function W(e){return r.open("GET",e,!1),r.send(),r.status==200?r.responseText:k}function X(e,t){function n(e){return e.substring(0,e.indexOf("/",8))}if(/^https?:\/\//i.test(e))return n(t)==n(e)?e:null;if(e.charAt(0)=="/")return n(t)+e;var r=t.split(/[?#]/)[0];return e.charAt(0)!="?"&&r.charAt(r.length-1)!="/"&&(r=r.substring(0,r.lastIndexOf("/")+1)),r+e}function V(e){return e?W(e).replace(c,k).replace(h,function(t,n,r,i,s){return V(X(r||s,e))}).replace(p,function(t,n,r){return n=n||k," url("+n+X(r,e)+n+") "}):k}function $(){var e,n,r=t.getElementsByTagName("BASE"),i=r.length>0?r[0].href:t.location.href;for(var s=0;s<t.styleSheets.length;s++)n=t.styleSheets[s],n.href!=k&&(e=X(n.href,i),e&&(n.cssText=O(V(e))));u.length>0&&setInterval(function(){for(var e=0,t=u.length;e<t;e++){var n=u[e];n.disabled!==n.$disabled&&(n.disabled?(n.disabled=!1,n.$disabled=!0,n.disabled=!0):n.$disabled=n.disabled)}},250)}function J(e,r){var i=!1,s=!0,o=function(n){if(n.type=="readystatechange"&&t.readyState!="complete")return;(n.type=="load"?e:t).detachEvent("on"+n.type,o,!1),!i&&(i=!0)&&r.call(e,n.type||n)},u=function(){try{n.doScroll("left")}catch(e){setTimeout(u,50);return}o("poll")};if(t.readyState=="complete")r.call(e,k);else{if(t.createEventObject&&n.doScroll){try{s=!e.frameElement}catch(a){}s&&u()}U(t,"readystatechange",o),U(e,"load",o)}}return})(this);