!function(t){t.fn.slabText=function(e){var n={fontRatio:.78,forceNewCharCount:!0,wrapAmpersand:!0,headerBreakpoint:null,viewportBreakpoint:null,noResizeEvent:!1,resizeThrottleTime:300,maxFontSize:999,postTweak:!0,precision:3,minCharsPerLine:0};return t("body").addClass("slabtexted"),this.each(function(){e&&t.extend(n,e);var i=t(this),a=t("span.slabtext",i).length,r=a?[]:String(t.trim(i.text())).replace(/\s{2,}/g," ").split(" "),s=null,o=null,l=n.fontRatio,h=n.forceNewCharCount,p=n.headerBreakpoint,d=n.viewportBreakpoint,f=n.postTweak,c=n.precision,w=n.resizeThrottleTime,g=n.minCharsPerLine,m=null,u=t(window).width(),v=i.find("a:first").attr("href")||i.attr("href"),x=v?i.find("a:first").attr("title"):"";if(!(!a&&g&&r.join(" ").length<g)){var b=function(){var t=jQuery('<div style="display:none;font-size:1em;margin:0;padding:0;height:auto;line-height:1;border:0;">&nbsp;</div>').appendTo(i),e=t.height();return t.remove(),e},z=function(){var e,w=i.width();if(0!==w){if(i.removeClass("slabtextdone slabtextinactive"),d&&d>u||p&&p>w)return void i.addClass("slabtextinactive");if(e=b(),a||!h&&e==s)s=e;else{s=e;var m,z,C,T=Math.min(60,Math.floor(w/(s*l))),k=0,y=[],j="",F="",B="";if(T!=o){for(o=T;k<r.length;){for(F="";F.length<o&&(j=F,F+=r[k]+" ",!(++k>=r.length)););g&&(m=r.slice(k).join(" "),m.length<g&&(F+=m,j=F,k=r.length+2)),z=o-j.length,C=F.length-o,C>z&&j.length>=(g||2)?(B=j,k--):B=F,B=t("<div/>").text(B).html(),n.wrapAmpersand&&(B=B.replace(/&amp;/g,'<span class="amp">&amp;</span>')),B=t.trim(B),y.push('<span class="slabtext">'+B+"</span>")}i.html(y.join(" ")),v&&i.wrapInner('<a href="'+v+'" '+(x?'title="'+x+'" ':"")+"/>")}}t("span.slabtext",i).each(function(){var e,i,a,r=t(this),o=r.text(),l=o.split(" ").length>1;f&&r.css({"word-spacing":0,"letter-spacing":0}),i=w/r.width(),a=parseFloat(this.style.fontSize)||s,r.css("font-size",Math.min((a*i).toFixed(c),n.maxFontSize)+"px"),e=f?w-r.width():!1,e&&r.css((l?"word":"letter")+"-spacing",(e/(l?o.split(" ").length-1:o.length)).toFixed(c)+"px")}),i.addClass("slabtextdone")}};z(),n.noResizeEvent||t(window).resize(function(){t(window).width()!=u&&(u=t(window).width(),clearTimeout(m),m=setTimeout(z,w))})}})}}(jQuery);