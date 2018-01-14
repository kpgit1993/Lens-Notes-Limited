/*
 * jQuery Slideshow Plugin for WYSIWYG Web Builder 9
 * Copyright Pablo Software solutions 2013
 * http://www.wysiwygwebbuilder.com/
 */
(function(a){a.fn.slideshow=function(c){return this.each(function(){a.slideshow(this,c)})};a.slideshow=function(c,b){var d={effect:"none",effectlength:2E3,easing:"linear",fullscreen:!1,direction:"",interval:2E3,type:"sequence",param:null,maxItems:10,current:1,last:0,captionShow:{},captionHide:{}};b&&"string"==typeof b?"nextimage"==b?(a.slideshow.killTimer(c),a.slideshow.nextimage(c)):"previmage"==b&&(a.slideshow.killTimer(c),a.slideshow.previmage(c)):(b&&(state=a.extend(d,b)),a.slideshow.init(c,state))};
a.slideshow.init=function(c,b){var d=a(".caption_text").length;b.images=a(c).find(".image");a.each(b.images,function(c){a(b.images[c]).css("zIndex",0).css("position","absolute").css("top","0").css("left","0");d&&(a(b.images[c]).data("title",a(b.images[c]).attr("title")),a(b.images[c]).removeAttr("title"))});b.random=!1;b.reverse=!1;"random"==b.effect&&(b.random=!0);a(c).data("state",b);a.isEmptyObject(b.captionShow)||a(c).mouseover(function(){a(c).find(".caption_background").stop().animate(b.captionShow,
500)});a.isEmptyObject(b.captionHide)||a(c).mouseout(function(){a(c).find(".caption_background").stop().animate(b.captionHide,500)});var e=b.interval;"kenburns"==b.effect&&(e=1);0!=e&&(e=setTimeout(function(){a.slideshow.imagetransition(c)},e),a(c).data("timerId",e));b.fullscreen&&(a.slideshow.resize(c),a(window).resize(function(){a.slideshow.resize(c)}))};a.slideshow.killTimer=function(c){c=a(c).data("timerId");clearInterval(c)};a.slideshow.nextimage=function(c){state=a(c).data("state");0!=state.interval&&
(state.current=state.last);state.interval=0;a.slideshow.next(state);a.slideshow.imagetransition(c)};a.slideshow.previmage=function(c){state=a(c).data("state");0!=state.interval&&(state.current=state.last);state.interval=0;0<=state.current-1?(state.current-=1,state.last=state.current+1):(state.current=state.images.length-1,state.last=0);a.slideshow.imagetransition(c)};a.slideshow.next=function(a){if("sequence"==a.type)a.current+1<a.images.length?(a.current+=1,a.last=a.current-1):(a.current=0,a.last=
a.images.length-1);else if("random"==a.type)for(a.last=a.current;a.current==a.last;)a.current=Math.floor(Math.random()*a.images.length)};a.slideshow.imagetransition=function(c){state=a(c).data("state");if(state.random){var b="fade slide puff blind drop zoom clip shuffle blast blocks rain swirl squares bars".split(" "),d=["left","up","down","right"],e=["horizontal","vertical"];state.effect=b[Math.floor(Math.random()*b.length)];if("slide"==state.effect||"drop"==state.effect)state.direction=d[Math.floor(Math.random()*
d.length)];if("clip"==state.effect||"blinds"==state.effect||"bars"==state.effect)state.direction=e[Math.floor(Math.random()*e.length)]}for(b=0;b<state.images.length;b++)a(state.images[b]).css("display","none");a(state.images[state.last]).css("display","block").css("zIndex","0");if("none"==state.effect)a(state.images[state.current]).css("zIndex","1").show(),a(state.images[state.last]).css("display","none");else if("fade"==state.effect)a(state.images[state.last]).fadeOut(state.effectlength),a(state.images[state.current]).css("zIndex",
"1").css("display","block").hide().fadeIn(state.effectlength);else if("slide"==state.effect)a(state.images[state.current]).css("zIndex","1").show("slide",{direction:state.direction,easing:state.easing},state.effectlength);else if("puff"==state.effect)a(state.images[state.current]).css("zIndex","1").show("puff",{easing:state.easing},state.effectlength);else if("blind"==state.effect)a(state.images[state.current]).css("zIndex","1").show("blind",{direction:state.direction,easing:state.easing},state.effectlength);
else if("clip"==state.effect)a(state.images[state.current]).css("zIndex","1").show("clip",{direction:state.direction,easing:state.easing},state.effectlength);else if("drop"==state.effect)a(state.images[state.current]).css("zIndex","1").show("drop",{direction:state.direction,easing:state.easing},state.effectlength);else if("fold"==state.effect)a(state.images[state.current]).css("zIndex","1").show("fold",{easing:state.easing},state.effectlength);else if("kenburns"==state.effect){var d=a(c).outerWidth(),
b=a(c).outerHeight(),e=Math.ceil(d/10),f=d,g=b,h=Math.floor(4*Math.random()),l=Math.floor(2*Math.random()),k=1;f<d+e?k=g<b+e?Math.max((b+e)/g,(d+e)/f):(d+e)/f:g<b+e&&(k=(b+e)/g);f*=k;g*=k;0==h||3==h?(leftStart=-e,leftEnd=d-f+e):(leftStart=d-f+e,leftEnd=-e);1==h||3==h?(topStart=-e,topEnd=b-g+e):(topStart=b-g+e,topEnd=-e);1==l?(widthStart=1.2*f,widthEnd=f,heightStart=1.2*g,heightEnd=g):(widthStart=f,widthEnd=1.2*f,heightStart=g,heightEnd=1.2*g);a(state.images[state.current]).css("display","block").css("zIndex",
"1").css({opacity:0,position:"absolute",left:Math.ceil(leftStart),top:Math.ceil(topStart),width:Math.ceil(widthStart),height:Math.ceil(heightStart)}).animate({opacity:1},2E3).animate({left:Math.ceil(leftEnd),top:Math.ceil(topEnd),width:Math.ceil(widthEnd),height:Math.ceil(heightEnd)},{duration:state.effectlength,queue:!1}).css({width:d,height:b})}else if("zoom"==state.effect)e=a(state.images[state.last]).outerWidth(),f=a(state.images[state.last]).outerHeight(),d=a(c).outerWidth(),b=a(c).outerHeight(),
d=(d-e)/2,g=(b-f)/2,b={top:g,left:d,width:e,height:f},d={width:0,height:0,top:g+f/2,left:d+e/2},a(state.images[state.current]).animate(d,0,null),a(state.images[state.current]).css("display","block").css("zIndex","1"),a(state.images[state.current]).animate(b,state.effectlength,null);else if("zoominout"==state.effect)e=a(state.images[state.last]).outerWidth(),f=a(state.images[state.last]).outerHeight(),d=a(c).outerWidth(),b=a(c).outerHeight(),d=(d-e)/2,g=(b-f)/2,b={top:g,left:d,width:e,height:f},d=
{width:0,height:0,top:g+f/2,left:d+e/2},a(state.images[state.last]).animate(d,state.effectlength,null),a(state.images[state.current]).animate(d,0,null),a(state.images[state.current]).css("display","block").css("zIndex","1"),a(state.images[state.current]).animate(b,state.effectlength,null);else{if("shuffle"==state.effect){b=a(c).outerWidth();d=a(c).outerHeight();a(state.images[state.last]).css("zIndex","1");a(state.images[state.current]).css("zIndex","0");a(state.images[state.current]).show();a(state.images[state.current]).animate({translateX:b,
translateY:-d,rotate:45},{duration:state.effectlength/2,easing:state.easing,queue:!0,complete:function(){a(state.images[state.last]).css("zIndex","0");a(state.images[state.current]).css("zIndex","1");a(state.images[state.current]).animate({rotate:"0deg",translateX:"0",translateY:"0"},{duration:state.effectlength/2,easing:state.easing,queue:!0,complete:function(){var b=a(state.images[state.current]).data("title");a(c).find(".caption_text").text(b);0!=state.interval&&(a.slideshow.next(state),b=setTimeout(function(){a.slideshow.imagetransition(c)},
state.interval),a(c).data("timerId",b))}})}});return}"rotate"==state.effect?(a(state.images[state.last]).animate({rotate:180,scale:10,opacity:"hide"},{duration:state.effectlength,easing:state.easing}),a(state.images[state.current]).css("zIndex","1"),a(state.images[state.current]).css({scale:10,rotate:-180}),a(state.images[state.current]).animate({opacity:"show",rotate:0,scale:1},{duration:state.effectlength,easing:state.easing})):"blast"==state.effect?(a(state.images[state.last]).css("zIndex","1"),
a(state.images[state.last]).css("zIndex","0"),a(state.images[state.last]).hide("blast",{easing:state.easing},state.effectlength),a(state.images[state.last]).css("visibility","visible"),a(state.images[state.current]).show("blast",{easing:state.easing},state.effectlength)):"blocks"==state.effect?a(state.images[state.current]).css("zIndex","1").show("squares",{easing:state.easing,fx:"random"},state.effectlength):"rain"==state.effect?(a(state.images[state.current]).css("zIndex","1").show("squares",{easing:state.easing,
fx:"rain",reverse:state.reverse},state.effectlength),state.reverse=!state.reverse):"swirl"==state.effect?(a(state.images[state.current]).css("zIndex","1").show("squares",{easing:state.easing,fx:"swirl",reverse:state.reverse},state.effectlength),state.reverse=!state.reverse):"squares"==state.effect?(a(state.images[state.current]).css("zIndex","1").show("squares",{easing:state.easing,fx:"none",reverse:state.reverse},state.effectlength),state.reverse=!state.reverse):"bars"==state.effect?a(state.images[state.current]).css("zIndex",
"1").show("bars",{direction:state.direction,easing:state.easing},state.effectlength):a(state.images[state.current]).css("zIndex","1").show(state.effect,{},state.effectlength)}b=a(state.images[state.current]).data("title");a(c).find(".caption_text").text(b);0!=state.interval&&(a.slideshow.next(state),b=setTimeout(function(){a.slideshow.imagetransition(c)},state.interval),a(c).data("timerId",b))};a.slideshow.resize=function(c){var b=0,d=0;"undefined"!=typeof window.innerWidth?(b=window.innerWidth,d=
window.innerHeight):"undefined"!=typeof document.documentElement&&"undefined"!=typeof document.documentElement.clientWidth&&0!=document.documentElement.clientWidth?(b=document.documentElement.clientWidth,d=document.documentElement.clientHeight):(b=document.getElementsByTagName("body")[0].clientWidth,d=document.getElementsByTagName("body")[0].clientHeight);a(c).css("height",d);a(c).css("width","100%");a(c).css("left","0");a(c).css("top","0");a(c).find(".image").each(function(c){c=d;var f=b;f/c>a(this).width()/
a(this).height()?a(this).css({height:c+"px",width:"auto"}):a(this).css({height:"auto",width:f+"px"});a(this).css({left:(b-a(this).width())/2+"px",top:(d-a(this).height())/2+"px"})})}})(jQuery);