/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2013 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
(function(a){var b=a("#page"),c=a(window),d=function(a,b,c){this.service=a;this.elem=b;this.enabled=(this.data=c)&&0<c.length;this.initialized=!1;this.visible=!0};d.HIDDEN_CLASS="se_invi";d.prototype.clone=function(a){a.hasClass(d.HIDDEN_CLASS)||a.addClass(d.HIDDEN_CLASS);a.registerGenericScrollEffect(d,this.data)};d.prototype.initialize=function(){this.referenceOffset=this.data[0]["in"][1];this.elemWidth=this.elem.width();this.elemHeight=this.elem.height();var a=Muse.Browser.Features.checkCSSFeature("backface-visibility");
a&&this.elem.css((a===!0?"":"-"+a.toLowerCase()+"-")+"backface-visibility","hidden");for(var b,a=0,c;c=this.data[a];a++)c.length=c["in"][1]-c["in"][0],c.startPosition=b?{left:b.startPosition.left+b.length*b.speed[0],top:b.startPosition.top+b.length*b.speed[1]}:{left:-c.length*c.speed[0],top:-c.length*c.speed[1]},b=c};d.prototype.update=function(a,b,c){var h=this.elementLeft-this.service.getHorizontalScroll(),g=this.elementTop-this.referenceOffset,f=a.startPosition.left+a.speed[0]*b,b=a.startPosition.top+
a.speed[1]*b,i={display:this.initialized?"inline":"hidden"};if("number"==typeof a.speed[0])i.left=h+f;if("number"==typeof a.speed[1])i.top=g-b;(this.visible=this.getVisible(i.left,i.top,c))?this.elem.css(i):this.elem.css("display","none");if(!this.initialized&&this.elem.hasClass(d.HIDDEN_CLASS))this.elem.removeClass(d.HIDDEN_CLASS),this.initialized=!0};d.prototype.getVisible=function(a,b,c){var d=Math.max(this.elemWidth,this.elemHeight)+100;return(void 0===a||a+d>0&&a-d<c.windowWidth)&&(void 0===
b||b+d>0&&b-d<c.windowHeight)};var f=function(a,b,c){this.service=a;this.elem=b;this.data=c;if(this.useBackgroundFixedOptimization())this.elem.css("background-attachment","fixed"),this.enabled=!1;this.elem.data("hasBackgroundPositionScrollEffect",!0)};f.BG_NORMAL=0;f.BG_COVER=1;f.BG_CONTAIN=2;f.prototype.useBackgroundFixedOptimization=function(){if(!c.data("scrollWrapper").isStandard())return!1;return 0==this.data[0].speed[0]&&0==this.data[0].speed[1]&&0==this.data[1].speed[0]&&0==this.data[1].speed[1]};
f.prototype.initialize=function(){var b=null;this.service.getElementEffect(this.elem,d);for(var c=0,h;h=this.data[c];c++)h.speed[0]-=0,h.speed[1]-=1,h.length=h["in"][1]-h["in"][0],h.startPosition=null==b?{left:-h.length*h.speed[0],top:-h.length*h.speed[1]}:{left:b.startPosition.left+b.length*b.speed[0],top:b.startPosition.top+b.length*b.speed[1]},b=h;if(!Muse.Browser.Features.checkCSSFeature("background-size")&&this.elem.hasClass("museBGSize")&&0<a("> .museBgSizePolyfill",this.elem).length)this.polyfillElement=
a(a(".museBgSizePolyfill img",this.elem)[0]);this.bgMode=this.getBgMode();this.backgroundOffsetAvailable=!1;this.elem.on("resized",this,this.onElementResize);this.backgroundPosition=this.getBackgroundPosition();this.getBackgroundOffset();if(this.elem.hasClass("browser_width"))b=Muse.Utils.getStyleSheetRuleById(Muse.Utils.getPageStyleSheet(),this.elem.attr("id")),this.originalWidth=Muse.Utils.tryParse(Muse.Utils.getRuleProperty(b,"width"),parseInt)};f.prototype.onElementResize=function(a){var a=a.data,
b=a.service.getEffectProgress(),c=a.service.getEffectInterval(a,b);a.update(c,b-c["in"][0])};f.prototype.hasOriginalWidth=function(){return Muse.Utils.isDefined(this.originalWidth)&&-1!=this.originalWidth};f.prototype.getDeltaWidth=function(){if(!this.hasOriginalWidth())return 0;return(this.elem.innerWidth()-this.originalWidth)*this.backgroundPosition.multiplier.x};f.prototype.getBackgroundModeDisplayRatio=function(){switch(this.bgMode){case f.BG_CONTAIN:return Math.min(this.elem.innerWidth()/this.backgroundSize.width,
this.elem.innerHeight()/this.backgroundSize.height);case f.BG_COVER:return Math.max(this.elem.innerWidth()/this.backgroundSize.width,this.elem.innerHeight()/this.backgroundSize.height);default:return 1}};f.prototype.update=function(a,b){if(this.backgroundOffsetAvailable){var c=this.getBackgroundModeDisplayRatio()-1,d=Math.floor(this.bgOffset.x-c*this.backgroundPosition.multiplier.x*this.backgroundSize.width+this.getDeltaWidth())+a.startPosition.left+a.speed[0]*b,c=Math.floor(this.bgOffset.y-c*this.backgroundPosition.multiplier.y*
this.backgroundSize.height)-(a.startPosition.top+a.speed[1]*b);this.polyfillElement?(d={"margin-left":d+"px","margin-top":c+"px",left:0,top:0},this.polyfillElement.css(d)):(d={"background-attachment":"scroll","background-position":d+"px "+c+"px"},this.elem.css(d))}};f.prototype.getBackgroundOffset=function(){var a=Muse.Utils.tryParse(this.backgroundPosition.x,parseFloat,0),b=Muse.Utils.tryParse(this.backgroundPosition.y,parseFloat,0);if(!Muse.Utils.endsWith(this.backgroundPosition.x,"%")&&!Muse.Utils.endsWith(this.backgroundPosition.y,
"%"))this.onBackgroundOffsetAvailable(a,b);else{var c=this;this.getBackgroundSize(function(d){c.backgroundSize=d;if(Muse.Utils.endsWith(c.backgroundPosition.x,"%")){var h=Muse.Utils.firstDefined(c.originalWidth,c.elem.innerWidth());a=a/100*(h-Muse.Utils.firstDefined(d.width,h))}Muse.Utils.endsWith(c.backgroundPosition.y,"%")&&(h=c.elem.innerHeight(),b=b/100*(h-Muse.Utils.firstDefined(d.height,h)));c.onBackgroundOffsetAvailable(a,b)})}};f.prototype.onBackgroundOffsetAvailable=function(a,b){this.bgOffset=
{x:a,y:b};this.backgroundOffsetAvailable=!0;var c=this.service.getEffectProgress(),d=this.service.getEffectInterval(this,c);this.update(d,c-d["in"][0])};f.prototype.getBgMode=function(){var a=(this.elem.get(0).currentStyle||window.getComputedStyle(this.elem.get(0),null))["background-size"]||this.elem.css("background-size");if(!a||!a.match)return f.BG_NORMAL;if(a.match(/cover/gi))return f.BG_COVER;if(a.match(/contain/))return f.BG_CONTAIN;return f.BG_NORMAL};f.prototype.isValidBackgroundPosition=function(a){return Muse.Utils.endsWith(a,
"%")||Muse.Utils.endsWith(a,"px")};f.prototype.getBackgroundPosition=function(){var a=this.elem.css("background-position");if(!a){var b=this.elem.css("background-position-x"),c=this.elem.css("background-position-y");b&&(a=b+" "+(c||""))}if(!a||!a.split)return{x:"0%",y:"0%"};a=a.replace(/(?:left|top)/gi,"0%").replace(/center/gi,"50%").replace(/(?:right|bottom)/gi,"100%");a=a.replace(/^\s+|\s+$/gi,"");a=a.split(" ");1==a.length&&a.push("50%");if(!this.isValidBackgroundPosition(a[0])||!this.isValidBackgroundPosition(a[1]))Muse.Assert.fail("Invalid measurement unit for background position. Expecting px or %.");
else return{x:a[0],y:a[1],multiplier:{x:Muse.Utils.endsWith(a[0],"%")?Muse.Utils.tryParse(a[0],parseInt,0)/100:0,y:Muse.Utils.endsWith(a[1],"%")?Muse.Utils.tryParse(a[1],parseInt,0)/100:0}}};f.prototype.getBackgroundSize=function(b){var c=this.polyfillElement?this.polyfillElement.attr("src"):this.elem.css("background-image");if(!c&&!c.replace)b();else{var c=c.replace(/^url\("?|"?\)$/gi,""),d=new Image;a(d).one("load",function(){b({width:d.width,height:d.height})});d.src=c}};var h=function(a,b,c){this.service=
a;this.elem=b;this.data=c};h.prototype.update=function(){};var j=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.hasPreInitClass=this.elem.hasClass(j.PRE_INITIT_CLASS_NAME)};j.PRE_INITIT_CLASS_NAME="pre_init";j.HIDDEN_Z_INDEX=-1E4;j.prototype.initialize=function(){Muse.Assert.assert(3==this.data.length,"Opacity Scroll Effect should have 3 intervals");var a=this.data[0],b=this.data[1],c=this.data[2];0<a.fade&&(a["in"][1]-=a.fade,this.data.splice(1,0,{"in":[a["in"][1],a["in"][1]+a.fade],
opacity:[a.opacity,b.opacity],rate:(b.opacity-a.opacity)/a.fade}));0<c.fade&&(c["in"][0]+=c.fade,this.data.splice(this.data.length-1,0,{"in":[c["in"][0]-c.fade,c["in"][0]],opacity:[b.opacity,c.opacity],rate:(c.opacity-b.opacity)/c.fade}));this.hasPositionEffect=(this.positionEffect=this.service.getElementEffect(this.elem,d))&&this.positionEffect.enabled};j.prototype.setElementOpacity=function(a){this.elem.fadeTo(0,a/100);var b=0===a;if(void 0===this.previousOpacity||b&&0!==this.previousOpacity||!b&&
0===this.previousOpacity)this.elem.css({visibility:b?"hidden":"","z-index":b?j.HIDDEN_Z_INDEX:""});this.previousOpacity=a};j.prototype.update=function(a,b){var c=0;if(!this.hasPositionEffect||this.positionEffect.visible)c="number"!=typeof a.opacity?a.opacity[0]+a.rate*b:a.opacity,c=Math.max(Math.min(c,100),0);this.setElementOpacity(c);if(this.hasPreInitClass)this.elem.removeClass(j.PRE_INITIT_CLASS_NAME),this.hasPreInitClass=!1};var g=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.widget=
this.elem.data("widget");this.lastChangeIntervalProgress=0;this.lastInterval=null};g.prototype.initialize=function(){this.noOfSlides=this.widget.slides.$element.length;if(this.isLinkToScrollEffect=this.isLinkToScrollInterval(this.data[1]))this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0],Muse.Assert.assert(2==this.data.length||Infinity!=this.data[1].intervalLength,"In a 3 interval configuration, why do we have middle interval with length = Infinity?")};g.prototype.update=function(a,
b){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):this.isLinkToScrollInterval(a)?(this.play=void 0,this.jump(b)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+a.play);if(!1===a.play&&this.isLinkToScrollEffect&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.jump(0);break;case 2:this.jump(this.data[1].intervalLength);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=
a};g.prototype.isLinkToScrollInterval=function(a){return"number"==typeof a.play};g.prototype.jump=function(a){var b=(Math.floor(a/this.data[1].play)-Math.floor(this.lastChangeIntervalProgress/this.data[1].play))%this.noOfSlides;if(0!=b){for(var c=0<b?b:-b,d=0;d<c;d++)0<b?this.widget.next():this.widget.previous();this.lastChangeIntervalProgress=a}};g.prototype.start=function(){var b;a(this.widget).one("wp-slideshow-before-play",function(){b=this.options.displayInterval;this.options.displayInterval=
0});a(this.widget).one("wp-slideshow-play",function(){Muse.Assert.assert(void 0!==b,"Why do we got a play event fired before beforePlay event?");this.options.displayInterval=b});this.widget.play()};g.prototype.stop=function(){this.widget.stop()};var k=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.stage=null;this.play=!1;this.lastInterval=null};k.prototype.initialize=function(){this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0];Muse.Assert.assert(2==this.data.length||
Infinity!=this.data[1].intervalLength,"In a 3 interval configuration, why do we have middle interval with length = Infinity?");this.iframe=this.elem.children()[0];this.iframeWindow=this.iframe.contentWindow;if(this.iframeWindow.AdobeEdge)this.updateStage(this);else{var b=this;a(this.iframe).bind("load",function(){b.updateStage(b)})}};k.prototype.updateStage=function(a){a.iframeWindow.AdobeEdge.bootstrapCallback(function(b){a.onCompositionReady(b,a)})};k.prototype.onCompositionReady=function(a,b){b.stage=
b.iframeWindow.AdobeEdge.compositions[a].getStage();for(var c in b.stage.timelines)b.stage.autoPlay[c]=!1;b.lastUpdateInterval&&b.lastUpdateIntervalProgress&&setTimeout(function(){b.update(b.lastUpdateInterval,b.lastUpdateIntervalProgress)},10)};k.prototype.update=function(a,b){if(this.stage){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):"number"==typeof a.play?(this.play=!0,this.seek(b*1E3/a.play)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+
a.play);if(!1===a.play&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.seek(0);break;case 2:this.seek(this.data[1].intervalLength*1E3/this.data[1].play);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=a}else this.lastUpdateInterval=a,this.lastUpdateIntervalProgress=b};k.prototype.start=function(){this.stage.play()};k.prototype.stop=function(){this.stage.stop(this.stage.getTimelinePosition())};k.prototype.seek=function(a){this.stage.seek(a%
this.stage.getDuration())};var i=function(){this.effects=[];this.initialCSSProperties={};this.pagePaddingTop=Muse.Utils.tryParse(a("body").css("padding-top"),parseInt,0)+Muse.Utils.tryParse(a("#page").css("border-top-width"),parseInt,0);this.scrollY=this.scrollX=0;c.on("scrolled",this,this.onUpdate)};i.prototype.getEffectProgress=function(){return Math.max(0,this.scrollY)};i.prototype.getHorizontalScroll=function(){return this.scrollX-b.offset().left};i.prototype.getEnvironmentSettings=function(){return{windowWidth:window.innerWidth||
c.width(),windowHeight:window.innerHeight||c.height()}};i.prototype.onUpdate=function(a){var b=a.data,c=0,d,h=b.getEnvironmentSettings();b.scrollX=a.x;b.scrollY=a.y;for(c=0;c<b.effects.length;c++)a=b.getEffectProgress(),d=b.getEffectInterval(b.effects[c],a),b.effects[c].update(d,a-d["in"][0],h)};i.prototype.getEffectInterval=function(a,b){for(var c=0,d;d=a.data[c]["in"];c++)if(d[0]<b&&b<=d[1])return a.data[c];Muse.Assert.fail("Why do we have a progress value that does not fit in any interval?");return null};
i.prototype.registerEffect=function(a,c,d){var h=a.attr("id")||a.attr("data-muse-tempuid")||a.attr("data-muse-tempuid",this.getRandomUID()).attr("data-muse-tempuid"),g=this,f=new c(this,a,d);if(!1!==f.enabled)"undefined"==typeof this.initialCSSProperties[h]&&(this.initialCSSProperties[h]={left:Muse.Utils.tryParse(a.css("left"),parseInt,0)+Muse.Utils.tryParse(b.css("border-left-width"),parseInt,0),top:Muse.Utils.tryParse(a.css("top"),parseInt,0)+this.pagePaddingTop}),f.elementLeft=this.initialCSSProperties[h].left,
f.elementTop=this.initialCSSProperties[h].top,f.type=c,f.data[0]["in"][0]=-100,f.initialize&&f.initialize(),setTimeout(function(){var a=g.getEffectProgress(),b=g.getEffectInterval(f,a);f.update(b,a-b["in"][0],g.getEnvironmentSettings())},0),this.effects.push(f)};i.prototype.getElementEffect=function(a,b){for(var c=m.effects.length,d=0;d<c;d++){var h=m.effects[d];if(h.elem.is(a)&&h.type==b)return h}};i.prototype.getRandomUID=function(){return Math.round(Math.random()*1E6)};var m=new i;a.fn.registerPositionScrollEffect=
function(b){return a(this).registerGenericScrollEffect(d,b)};a.fn.registerBackgroundPositionScrollEffect=function(b){return a(this).registerGenericScrollEffect(f,b)};a.fn.registerRotateScrollEffect=function(b){return a(this).registerGenericScrollEffect(h,b)};a.fn.registerOpacityScrollEffect=function(b){return a(this).registerGenericScrollEffect(j,b)};a.fn.registerSlideshowScrollEffect=function(b){return a(this).registerGenericScrollEffect(g,b)};a.fn.registerEdgeAnimateScrollEffect=function(b){return a(this).registerGenericScrollEffect(k,
b)};a.fn.registerGenericScrollEffect=function(b,c){m.registerEffect(a(this),b,c);a(this).data("hasScrollEffect",!0);return this};a.fn.clearScrollEffects=function(){a(this).data("hasScrollEffect",!1);for(var b=0;b<m.effects.length;)m.effects[b].elem.is(this)?m.effects.splice(b,1):b++};a.fn.cloneScrollEffectsFrom=function(a){for(var b=m.effects.length,c=0;c<b;c++){var d=m.effects[c];d.elem.is(a)&&d.clone&&d.clone(this)}}})(jQuery);
(function(a){var b=a(window),c=a(document),d=a("html"),f=a("body"),h=a("#page"),j=function(a,b){this.wrapper=a;this.onScrollFn=b;this.type="StandardScrollProvider"};j.prototype.activate=function(){b.scroll(this,this.onUpdate);b.resize(this,this.onUpdate);this.onUpdate()};j.prototype.deactivate=function(){b.off("scroll",this.onUpdate);b.off("resize",this.onUpdate)};j.prototype.scrollTop=function(){return b.scrollTop()};j.prototype.scrollLeft=function(){return b.scrollLeft()};j.prototype.onUpdate=function(a){a=
a&&a.data||this;a.onScrollFn(a.scrollLeft(),a.scrollTop())};j.prototype.scrollTo=function(a,b){window.scrollTo(a,b);this.onScrollFn(a,b)};j.prototype.scrollHeight=function(){return(document.documentElement||document.body).scrollHeight};j.prototype.scrollWidth=function(){return(document.documentElement||document.body).scrollWidth};var g=function(b,c){this.wrapper=b;this.onScrollFn=c;this.moveStarted=!1;this.animation=null;this.scrollOffset={x:0,y:0};this.speed={x:0,y:0};this.lastTouch={x:0,y:0};this.metaViewPort=
a("meta[name=viewport]");this.enabled=!0;this.type="WebkitScrollProvider";this.touchListeners=[]};g.DECELERATION_RATE=1.5;g.SCALE=1;g.LOCK_X=!1;g.LOCK_Y=!1;g.HTML_WRAPPER_ID="webit_scroll_provider_wrapper";g.IFRAME_BODY_CLASS="WebkitScrollProviderIframeBodyHelperClass";g.IFRAME_DATA="WebkitScrollProviderIframeData";g.prototype.available=function(){return this.enabled&&"ontouchstart"in window&&jQuery.browser.SafariMobile};g.prototype.activate=function(){h.wrap('<div id="'+g.HTML_WRAPPER_ID+'" />');
this.htmlWrapper=a("#"+g.HTML_WRAPPER_ID+"");this.docProps={paddingTop:Muse.Utils.getCSSIntValue(f,"padding-top")+Muse.Utils.getCSSIntValue(f,"margin-top"),paddingBottom:Muse.Utils.getCSSIntValue(f,"padding-bottom")+Muse.Utils.getCSSIntValue(f,"margin-bottom"),paddingLeft:Muse.Utils.getCSSIntValue(h,"margin-left"),paddingRight:Muse.Utils.getCSSIntValue(h,"margin-right")};this.htmlWrapper.css("padding-top",this.docProps.paddingTop);this.htmlWrapper.css("padding-bottom",this.docProps.paddingBottom);
this.htmlWrapper.css("width","100%");this.htmlWrapper.css("min-width",h.outerWidth());this.htmlWrapper.addClass("html");d.removeClass("html");f.addClass("scroll_wrapper");b.scroll(this,this.onWindowScroll);b.on("orientationchange",this,this.orientationChange);this.addTouchListeners(c);a("input,textarea").on("touchstart",this,this.onElementTouchStart);a("input,textarea").on("focus",this,this.onElementFocus);a("input,textarea").on("blur",this,this.onElementBlur);var i=this;a(".animationContainer").each(function(){var b=
a(this);b.load(function(){var c=b.contents();i.addTouchListeners(c);a("body",c).addClass(g.IFRAME_BODY_CLASS);a("body",c).data(g.IFRAME_DATA,b)})})};g.prototype.onElementTouchStart=function(a){a.data.inFormFieldEditMode=!0};g.prototype.onElementFocus=function(a){a=a.data;if(a.stopTimeout)clearTimeout(a.stopTimeout),a.stopTimeout=0};g.prototype.onElementBlur=function(a){var b=a.data;b.stopTimeout=setTimeout(function(){b.stopTimeout=0;b.inFormFieldEditMode=!1},200)};g.prototype.addTouchListeners=function(a){a.on("touchstart",
this,this.touchStartHandler);a.on("touchmove",this,this.touchMoveHandler);a.on("touchend",this,this.touchEndHandler);this.touchListeners.push(a)};g.prototype.removeTouchListeners=function(){for(var a=0,b,c=this.touchListeners.length;a<c;a++)b=this.touchListeners[a],b.off("touchstart",this.touchStartHandler),b.off("touchmove",this.touchMoveHandler),b.off("touchend",this.touchEndHandler);this.touchListeners.splice(0,this.touchListeners.length)};g.prototype.deactivate=function(){b.off("scroll",this.onWindowScroll);
b.off("orientationchange",this.orientationChange);this.removeTouchListeners();f.removeClass("scroll_wrapper");d.addClass("html");h.unwrap();a("input,textarea").off("touchstart",this.onElementTouchStart);a("input,textarea").off("focus",this.onElementFocus);a("input,textarea").off("blur",this.onElementBlur)};g.prototype.onWindowScroll=function(a){var a=a.data,c=b.scrollLeft(),d=b.scrollTop();if(!a.inFormFieldEditMode&&(0!=c||0!=d))window.scrollTo(0,0),a.scrollTo(c,d)};g.prototype.orientationChange=
function(a){a=a.data;a.animation&&a.animation.stop(!1,!1);a.scrollTo(a.scrollOffset.x,a.scrollOffset.y)};g.prototype.canStartScroll=function(a){return!a.tagName.match(/input|textarea|select/i)};g.prototype.getIFrameScrollOffset=function(b){b=a("body",a(b).parents());if(b.hasClass(g.IFRAME_BODY_CLASS))return b.data(g.IFRAME_DATA).offset()};g.prototype.touchStartHandler=function(a){var b=a.data,c=a.originalEvent;Muse.Assert.assert(!b.moveStarted,"Starting touch tracking while already tracking movement?");
if(b.canStartScroll(a.target))b.animation&&b.animation.stop(!1,!1),b.speed.y=b.speed.x=0,a=b.getIFrameScrollOffset(a.target),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+(a?a.left:0),b.moveStarted=!0};g.prototype.touchMoveHandler=function(a){var b=a.data,c=a.originalEvent;a.preventDefault();if(b.moveStarted)a=b.getIFrameScrollOffset(a.target),b.scrollByDelta(b.lastTouch.x-c.targetTouches[0].pageX-(a?a.left:0),b.lastTouch.y-c.targetTouches[0].pageY-(a?a.top:
0)),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+(a?a.left:0)};g.prototype.touchEndHandler=function(b){var c=b.data;if(c.moveStarted){c.moveStarted=!1;var d=20/g.DECELERATION_RATE,h=c.speed.x,f=c.speed.y,b=(1.71+0.0020*Math.sqrt(Math.pow(d*h,2)+Math.pow(d*f,2)))/g.DECELERATION_RATE*1E3/1.71,j=0,k=0;c.animation=a({progress:0}).animate({progress:1},{duration:b,easing:"linear",step:function(a){j=c.decelerate(a);c.scrollByDelta(Math.round((j-k)*d*h),Math.round((j-
k)*d*f));k=j}})}};g.prototype.decelerate=function(a){return(1-a)*(1-a)*(1-a)*0+3*(1-a)*(1-a)*a*1+3*(1-a)*a*a*1+a*a*a*1};g.prototype.scrollByDelta=function(a,b){this.scrollTo(g.SCALE*(this.scrollOffset.x+a),g.SCALE*(this.scrollOffset.y+b));g.LOCK_X||(this.speed.x=0.75*a*g.SCALE);g.LOCK_Y||(this.speed.y=0.75*b*g.SCALE)};g.prototype.scrollTop=function(){return this.scrollOffset.y};g.prototype.scrollLeft=function(){return this.scrollOffset.x};g.prototype.scrollHeight=function(){return this.htmlWrapper.outerHeight()};
g.prototype.scrollWidth=function(){return this.htmlWrapper.outerWidth()};g.prototype.scrollTo=function(a,b){g.LOCK_X||(this.scrollOffset.x=Math.min(Math.max(0,a),Math.max(0,this.scrollWidth()-window.innerWidth)));g.LOCK_Y||(this.scrollOffset.y=Math.min(Math.max(0,b),Math.max(0,this.scrollHeight()-window.innerHeight)));this.speed.x=this.speed.y=0;f.css({top:(g.LOCK_Y?0:-this.scrollOffset.y)+"px",left:(g.LOCK_X?0:-this.scrollOffset.x)+"px"});this.onScrollFn(0,this.scrollOffset.y)};var k=function(){this.STANDARD_PROVIDER=
new j(this,this.onScroll);this.WEBKIT_PROVIDER=new g(this,this.onScroll);this.provider=this.getProvider();this.provider.activate()};k.prototype.getProvider=function(){if(this.WEBKIT_PROVIDER.available())return this.WEBKIT_PROVIDER;return this.STANDARD_PROVIDER};k.prototype.isStandard=function(){return this.STANDARD_PROVIDER===this.getProvider()};k.prototype.onScroll=function(a,c){var d=jQuery.Event("scrolled");d.x=a;d.y=c;b.trigger(d)};k.prototype.scrollTop=function(){return this.provider.scrollTop()};
k.prototype.scrollLeft=function(){return this.provider.scrollLeft()};k.prototype.scrollTo=function(a,b){this.provider.scrollTo(a,b)};k.prototype.scrollHeight=function(){return this.provider.scrollHeight()};k.prototype.scrollWidth=function(){return this.provider.scrollWidth()};c.ready(function(){b.data("scrollWrapper",new k)})})(jQuery);