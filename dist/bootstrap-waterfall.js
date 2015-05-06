+function(t){"use strict";function i(i){this.$pins=i,this.tasks=[],this.timerId=null,this.deferred=new t.Deferred}function n(t){this.img=t,this.initialWidth=t.width,this.initialHeight=t.height}function e(i){return this.each(function(){var n=t(this),e=n.data("mystist.waterfall"),s="object"==typeof i&&i;e||n.data("mystist.waterfall",e=new o(this,s)),"string"==typeof i&&e[i]()})}var s=s||{indexOf:function(t,i,n){if(null==t)return-1;var e=0,o=t.length;if(n){if("number"!=typeof n)return e=s.sortedIndex(t,i),t[e]===i?e:-1;e=0>n?Math.max(0,o+n):n}for(;o>e;e++)if(t[e]===i)return e;return-1},now:Date.now||function(){return(new Date).getTime()},throttle:function(t,i,n){var e,o,r,a=null,l=0;n||(n={});var h=function(){l=n.leading===!1?0:s.now(),a=null,r=t.apply(e,o),a||(e=o=null)};return function(){var c=s.now();l||n.leading!==!1||(l=c);var u=i-(c-l);return e=this,o=arguments,0>=u||u>i?(clearTimeout(a),a=null,l=c,r=t.apply(e,o),a||(e=o=null)):a||n.trailing===!1||(a=setTimeout(h,u)),r}},debounce:function(t,i,n){var e,o,r,a,l,h=function(){var c=s.now()-a;i>c&&c>0?e=setTimeout(h,i-c):(e=null,n||(l=t.apply(r,o),e||(r=o=null)))};return function(){r=this,o=arguments,a=s.now();var c=n&&!e;return e||(e=setTimeout(h,i)),c&&(l=t.apply(r,o),r=o=null),l}}},o=function(i,n){this.$element=t(i),this.options=t.extend({},o.DEFAULTS,n),this.$fakePin=null,this.$container=null,this.$pins=null,this.pinWidth=null,this.imgWidth=null,this.lefts=[],this.tops=[],this.scrollCallback=this.scrollCallback(),this.resizeCallback=this.resizeCallback(),this.compassTimerId=null,this.init().calculateWidth().calculatePosition().sail().bindResize().compassWatch()};o.VERSION="0.2.0",o.DEFAULTS={},o.prototype.init=function(){return this.initPins().initAttributes(),this},o.prototype.initPins=function(){var i=this.$element.children().length>0?this.$element.children().remove():t(this.$element.data("bootstrap-waterfall-template"));return i.each(function(){var i=t(this).find("img:eq(0)");i.length>0&&(t(this).data("bootstrap-waterfall-src",i.attr("src")),i.attr("src","data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="))}),this.$pins=i,this},o.prototype.initAttributes=function(){return this.$fakePin=this.$pins.first().clone(),this.$container=t("<div />").css("position","relative"),this.$element.html(this.$container),this},o.prototype.calculateWidth=function(){var t=this.$fakePin.clone();return this.$container.append(t.css("opacity",0)),this.pinWidth=t.outerWidth(!0),this.imgWidth=t.find("img:eq(0)").width(),t.remove(),this},o.prototype.calculatePosition=function(){for(var t=parseInt(this.$container.width()/this.pinWidth,10),i=[],n=[],e=0;t>e;e++)i.push(e*this.pinWidth),n.push(0);return this.lefts=i,this.tops=n,this},o.prototype.scrollCallback=function(){return s.throttle(t.proxy(function(){r.isWantMore.call(this)&&this.unbindScroll().sail()},this),500)},o.prototype.sail=function(){var n=r.getToLoadPins.call(this),e=new i(n);return e.load().run().deferred.done(t.proxy(function(){this.ship(n)},this)),this},o.prototype.ship=function(t){return this.render(t).updateHeight().bindScroll(),this},o.prototype.render=function(i){var n=this;return i.each(function(){n.placePin(t(this))}),this},o.prototype.placePin=function(t){var i=s.indexOf(this.tops,Math.min.apply(null,this.tops)),n=r.getPosition.call(this,i);return t.css({position:"absolute",left:n.left,top:n.top}),t.data("bootstrap-waterfall-pin")&&r.setImageHeight.call(this,t),t.data("bootstrap-waterfall-src")&&(r.makeImageAvailable.call(this,t),t.removeData("bootstrap-waterfall-src")),this.$container.append(t),r.updatePosition.call(this,i,t),this},o.prototype.updateHeight=function(){var t=s.indexOf(this.tops,Math.max.apply(null,this.tops));return this.$container.height(this.tops[t]),this},o.prototype.resizeCallback=function(){return s.debounce(t.proxy(function(){this.unbindScroll().calculateWidth().calculatePosition().ship(r.getLoadedPins.call(this))},this),777)},o.prototype.compassWatch=function(){return this.compassTimerId=setInterval(t.proxy(function(){this.$element.closest("body").length<1&&this.destroy()},this),777),this},o.prototype.destroy=function(){return this.unbindScroll().unbindResize().compassUnwatch().$element.empty().removeData("mystist.waterfall"),this},o.prototype.bindScroll=function(){return t(window).on("scroll",this.scrollCallback),this},o.prototype.unbindScroll=function(){return t(window).off("scroll",this.scrollCallback),this},o.prototype.bindResize=function(){return t(window).on("resize",this.resizeCallback),this},o.prototype.unbindResize=function(){return t(window).off("resize",this.resizeCallback),this},o.prototype.compassUnwatch=function(){return clearInterval(this.compassTimerId),this.compassTimerId=null,this};var r={getToLoadPins:function(){var i=parseInt(this.$container.width()/this.pinWidth,10),n=3*i,e=this.$pins.map(function(){return t(this).find("img").length>0&&t(this).data("bootstrap-waterfall-src")?t(this):void 0});return e.slice(0,n)},getLoadedPins:function(){var i=this.$pins.map(function(){return t(this).find("img").length>0&&!t(this).data("bootstrap-waterfall-src")?t(this):void 0});return i},isWantMore:function(){return t(window).scrollTop()+t(window).height()>a.getDocHeight()-377?!0:!1},getPosition:function(t){var i={left:this.lefts[t],top:this.tops[t]};return i},setImageHeight:function(t){var i=t.data("bootstrap-waterfall-pin"),n=this.imgWidth*i.img.height/i.img.width;t.find("img:eq(0)").css({height:n,width:"auto"})},makeImageAvailable:function(t){t.find("img:eq(0)").attr("src",t.data("bootstrap-waterfall-src"))},updatePosition:function(t,i){this.tops[t]+=i.outerHeight(!0)}};i.prototype.load=function(){var i=this;return this.$pins.each(function(){var e=new Image;e.src=t(this).data("bootstrap-waterfall-src");var s=new n(e);i.tasks.push(s),t(this).data("bootstrap-waterfall-pin",s)}),this},i.prototype.run=function(){return this.timerId=setInterval(t.proxy(function(){this.isDone()?this.stop():this.check()},this),40),this},i.prototype.isDone=function(){return 0===this.tasks.length?!0:!1},i.prototype.stop=function(){clearInterval(this.timerId),this.timerId=null,this.deferred.resolve()},i.prototype.check=function(){for(var t=0;t<this.tasks.length;t++){var i=this.tasks[t];i.isLoaded()&&this.tasks.splice(t--,1)}},n.prototype.isLoaded=function(){return this.img.width!==this.initialWidth||this.img.height!==this.initialHeight||this.img.width*this.img.height>1024?!0:!1};var a={getDocHeight:function(){var t=document;return Math.max(t.body.scrollHeight,t.documentElement.scrollHeight,t.body.offsetHeight,t.documentElement.offsetHeight,t.body.clientHeight,t.documentElement.clientHeight)}},l=t.fn.waterfall;t.fn.waterfall=e,t.fn.waterfall.Constructor=o,t.fn.waterfall.noConflict=function(){return t.fn.waterfall=l,this}}(jQuery);