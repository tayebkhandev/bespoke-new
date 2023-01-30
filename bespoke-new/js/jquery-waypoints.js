(function(){var a=[].indexOf||function(b){for(var a=0,c=this.length;a<c;a++)if(a in this&&this[a]===b)return a;return -1},b=[].slice;!function(a,b){"function"==typeof define&&define.amd?define("waypoints",["jquery"],function(c){return b(c,a)}):b(a.jQuery,a)}(this,function(c,d){var g,h,i,j,k,l,m,n,o,p,q,r,s,t,e,f;return g=c(d),n=a.call(d,"ontouchstart")>=0,j={horizontal:{},vertical:{}},k=1,m={},l="waypoints-context-id",q="resize.waypoints",r="scroll.waypoints",s=1,t="waypoints-waypoint-ids",e="waypoint",f="waypoints",h=function(){function a(a){var b=this;this.$element=a,this.element=a[0],this.didResize=!1,this.didScroll=!1,this.id="context"+k++,this.oldScroll={x:a.scrollLeft(),y:a.scrollTop()},this.waypoints={horizontal:{},vertical:{}},this.element[l]=this.id,m[this.id]=this,a.bind(r,function(){var a;if(!(b.didScroll||n))return b.didScroll=!0,a=function(){return b.doScroll(),b.didScroll=!1},d.setTimeout(a,c[f].settings.scrollThrottle)}),a.bind(q,function(){var a;if(!b.didResize)return b.didResize=!0,a=function(){return c[f]("refresh"),b.didResize=!1},d.setTimeout(a,c[f].settings.resizeThrottle)})}return a.prototype.doScroll=function(){var a,b=this;return a={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},!n||a.vertical.oldScroll&&a.vertical.newScroll||c[f]("refresh"),c.each(a,function(f,a){var g,e,d;return d=[],g=(e=a.newScroll>a.oldScroll)?a.forward:a.backward,c.each(b.waypoints[f],function(f,b){var c,e;return a.oldScroll<(c=b.offset)&&c<=a.newScroll?d.push(b):a.newScroll<(e=b.offset)&&e<=a.oldScroll?d.push(b):void 0}),d.sort(function(a,b){return a.offset-b.offset}),e||d.reverse(),c.each(d,function(b,a){if(a.options.continuous||b===d.length-1)return a.trigger([g])})}),this.oldScroll={x:a.horizontal.newScroll,y:a.vertical.newScroll}},a.prototype.refresh=function(){var d,b,a,e=this;return a=c.isWindow(this.element),b=this.$element.offset(),this.doScroll(),d={horizontal:{contextOffset:a?0:b.left,contextScroll:a?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:a?0:b.top,contextScroll:a?0:this.oldScroll.y,contextDimension:a?c[f]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}},c.each(d,function(a,b){return c.each(e.waypoints[a],function(i,a){var d,f,e,g,h;if(d=a.options.offset,e=a.offset,f=c.isWindow(a.element)?0:a.$element.offset()[b.offsetProp],c.isFunction(d)?d=d.apply(a.element):"string"==typeof d&&(d=parseFloat(d),a.options.offset.indexOf("%")> -1&&(d=Math.ceil(b.contextDimension*d/100))),a.offset=f-b.contextOffset+b.contextScroll-d,(!a.options.onlyOnScroll||null==e)&&a.enabled){if(null!==e&&e<(g=b.oldScroll)&&g<=a.offset)return a.trigger([b.backward]);if(null!==e&&e>(h=b.oldScroll)&&h>=a.offset||null===e&&b.oldScroll>=a.offset)return a.trigger([b.forward])}})})},a.prototype.checkEmpty=function(){if(c.isEmptyObject(this.waypoints.horizontal)&&c.isEmptyObject(this.waypoints.vertical))return this.$element.unbind([q,r].join(" ")),delete m[this.id]},a}(),i=function(){function a(b,d,a){var g,h;"bottom-in-view"===(a=c.extend({},c.fn[e].defaults,a)).offset&&(a.offset=function(){var a;return a=c[f]("viewportHeight"),c.isWindow(d.element)||(a=d.$element.height()),a-c(this).outerHeight()}),this.$element=b,this.element=b[0],this.axis=a.horizontal?"horizontal":"vertical",this.callback=a.handler,this.context=d,this.enabled=a.enabled,this.id="waypoints"+s++,this.offset=null,this.options=a,d.waypoints[this.axis][this.id]=this,j[this.axis][this.id]=this,(g=null!=(h=this.element[t])?h:[]).push(this.id),this.element[t]=g}return a.prototype.trigger=function(a){if(this.enabled&&(null!=this.callback&&this.callback.apply(this.element,a),this.options.triggerOnce))return this.destroy()},a.prototype.disable=function(){return this.enabled=!1},a.prototype.enable=function(){return this.context.refresh(),this.enabled=!0},a.prototype.destroy=function(){return delete j[this.axis][this.id],delete this.context.waypoints[this.axis][this.id],this.context.checkEmpty()},a.getWaypointsByElement=function(b){var d,a;return(a=b[t])?(d=c.extend({},j.horizontal,j.vertical),c.map(a,function(a){return d[a]})):[]},a}(),p={init:function(b,a){return null==a&&(a={}),null==a.handler&&(a.handler=b),this.each(function(){var f,d,b,g;return f=c(this),b=null!=(g=a.context)?g:c.fn[e].defaults.context,c.isWindow(b)||(b=f.closest(b)),b=c(b),d=m[b[0][l]],d||(d=new h(b)),new i(f,d,a)}),c[f]("refresh"),this},disable:function(){return p._invoke.call(this,"disable")},enable:function(){return p._invoke.call(this,"enable")},destroy:function(){return p._invoke.call(this,"destroy")},prev:function(a,b){return p._traverse.call(this,a,b,function(b,a,c){if(a>0)return b.push(c[a-1])})},next:function(a,b){return p._traverse.call(this,a,b,function(c,a,b){if(a<b.length-1)return c.push(b[a+1])})},_traverse:function(b,a,g){var e,f;return null==b&&(b="vertical"),null==a&&(a=d),f=o.aggregate(a),e=[],this.each(function(){return g(e,c.inArray(this,f[b]),f[b])}),this.pushStack(e)},_invoke:function(a){return this.each(function(){var b;return b=i.getWaypointsByElement(this),c.each(b,function(c,b){return b[a](),!0})}),this}},c.fn[e]=function(){var d,a;return(a=arguments[0],d=2<=arguments.length?b.call(arguments,1):[],p[a])?p[a].apply(this,d):c.isFunction(a)?p.init.apply(this,arguments):c.isPlainObject(a)?p.init.apply(this,[null,a]):a?c.error("The "+a+" method does not exist in jQuery Waypoints."):c.error("jQuery Waypoints needs a callback function or handler option.")},c.fn[e].defaults={context:d,continuous:!0,enabled:!0,horizontal:!1,offset:0,triggerOnce:!1},o={refresh:function(){return c.each(m,function(b,a){return a.refresh()})},viewportHeight:function(){var a;return null!=(a=d.innerHeight)?a:g.height()},aggregate:function(d){var a,b,e;return(a=j,d&&(a=null!=(e=m[c(d)[0][l]])?e.waypoints:void 0),a)?(b={horizontal:[],vertical:[]},c.each(b,function(d,e){return c.each(a[d],function(b,a){return e.push(a)}),e.sort(function(a,b){return a.offset-b.offset}),b[d]=c.map(e,function(a){return a.element}),b[d]=c.unique(b[d])}),b):[]},above:function(a){return null==a&&(a=d),o._filter(a,"vertical",function(a,b){return b.offset<=a.oldScroll.y})},below:function(a){return null==a&&(a=d),o._filter(a,"vertical",function(a,b){return b.offset>a.oldScroll.y})},left:function(a){return null==a&&(a=d),o._filter(a,"horizontal",function(a,b){return b.offset<=a.oldScroll.x})},right:function(a){return null==a&&(a=d),o._filter(a,"horizontal",function(a,b){return b.offset>a.oldScroll.x})},enable:function(){return o._invoke("enable")},disable:function(){return o._invoke("disable")},destroy:function(){return o._invoke("destroy")},extendFn:function(a,b){return p[a]=b},_invoke:function(b){var a;return a=c.extend({},j.vertical,j.horizontal),c.each(a,function(c,a){return a[b](),!0})},_filter:function(d,e,f){var b,a;return(b=m[c(d)[0][l]])?(a=[],c.each(b.waypoints[e],function(d,c){if(f(b,c))return a.push(c)}),a.sort(function(a,b){return a.offset-b.offset}),c.map(a,function(a){return a.element})):[]}},c[f]=function(){var c,a;return(a=arguments[0],c=2<=arguments.length?b.call(arguments,1):[],o[a])?o[a].apply(null,c):o.aggregate.call(null,a)},c[f].settings={resizeThrottle:100,scrollThrottle:30},g.load(function(){return c[f]("refresh")})})}).call(this)
