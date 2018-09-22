// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function () { "use strict";
var $hxEnums = {},$_;
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var echo_Echo = function() {
	this.times = new haxe_ds_IntMap();
	this.systems = new haxe_ds_List();
	this.views = new haxe_ds_List();
	this.entities = new haxe_ds_List();
	this.systemsMap = new haxe_ds_IntMap();
	this.viewsMap = new haxe_ds_IntMap();
	this.entitiesMap = new haxe_ds_IntMap();
	this.__id = ++echo_Echo.__echoSequence;
};
echo_Echo.__name__ = true;
echo_Echo.__addComponentStack = function(id,stack) {
	if(echo_Echo.__componentStack == null) {
		echo_Echo.__componentStack = [];
	}
	echo_Echo.__componentStack[id] = stack;
};
echo_Echo.prototype = {
	toString: function() {
		var ret = "#" + this.__id + " ( " + this.systems.length + " ) { " + this.views.length + " } [ " + this.entities.length + " ]";
		ret += " : " + this.times.h[-2] + " ms";
		var _g_head = this.systems.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			ret += "\n        (" + Std.string(val) + ") : " + this.times.h[val.__id] + " ms";
		}
		var _g_head1 = this.views.h;
		while(_g_head1 != null) {
			var val1 = _g_head1.item;
			_g_head1 = _g_head1.next;
			ret += "\n    {" + Std.string(val1) + "} [" + val1.entities.length + "]";
		}
		return ret;
	}
	,update: function(dt) {
		var engineUpdateStartTimestamp = new Date().getTime();
		var _g_head = this.systems.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var systemUpdateStartTimestamp = new Date().getTime();
			val.update(dt);
			var this1 = this.times;
			var key = val.__id;
			var value = new Date().getTime() - systemUpdateStartTimestamp | 0;
			this1.h[key] = value;
		}
		var this2 = this.times;
		var value1 = new Date().getTime() - engineUpdateStartTimestamp | 0;
		this2.h[-2] = value1;
	}
	,addSystem: function(s) {
		if(!this.systemsMap.h.hasOwnProperty(s.__id)) {
			this.systemsMap.h[s.__id] = s;
			this.systems.add(s);
			s.activate(this);
		}
	}
	,addView: function(v) {
		if(!this.viewsMap.h.hasOwnProperty(v.__id)) {
			this.viewsMap.h[v.__id] = v;
			this.views.add(v);
			v.activate(this);
		}
	}
	,id: function(add) {
		if(add == null) {
			add = true;
		}
		var id = ++echo_Echo.__componentSequence;
		if(add) {
			this.entitiesMap.h[id] = id;
			this.entities.add(id);
		}
		return id;
	}
	,remove: function(id) {
		if(this.entitiesMap.h.hasOwnProperty(id)) {
			var _g_head = this.views.h;
			while(_g_head != null) {
				var val = _g_head.item;
				_g_head = _g_head.next;
				val.removeIfMatch(id);
			}
			this.entitiesMap.remove(id);
			this.entities.remove(id);
		}
		var _g1 = 0;
		var _g = echo_Echo.__componentStack.length;
		while(_g1 < _g) echo_Echo.__componentStack[_g1++](id);
	}
};
var ComponentMap_$Example_$Animal = function() { };
ComponentMap_$Example_$Animal.__name__ = true;
ComponentMap_$Example_$Animal.get = function(i) {
	return ComponentMap_$Example_$Animal.STACK;
};
var ComponentMap_$Example_$Position = function() { };
ComponentMap_$Example_$Position.__name__ = true;
ComponentMap_$Example_$Position.get = function(i) {
	return ComponentMap_$Example_$Position.STACK;
};
var ComponentMap_$Example_$Sprite = function() { };
ComponentMap_$Example_$Sprite.__name__ = true;
ComponentMap_$Example_$Sprite.get = function(i) {
	return ComponentMap_$Example_$Sprite.STACK;
};
var ComponentMap_$Example_$Timeout = function() { };
ComponentMap_$Example_$Timeout.__name__ = true;
ComponentMap_$Example_$Timeout.get = function(i) {
	return ComponentMap_$Example_$Timeout.STACK;
};
var ComponentMap_$Example_$Velocity = function() { };
ComponentMap_$Example_$Velocity.__name__ = true;
ComponentMap_$Example_$Velocity.get = function(i) {
	return ComponentMap_$Example_$Velocity.STACK;
};
var Example = function() { };
Example.__name__ = true;
Example.main = function() {
	var canvas = window.document.createElement("code");
	var stat = window.document.createElement("pre");
	window.document.body.appendChild(canvas);
	window.document.body.appendChild(stat);
	var size = Std.parseInt(window.getComputedStyle(window.document.body).fontSize);
	var w = window.innerWidth / size > Example.MAX_WIDTH ? Example.MAX_WIDTH : Math.floor(window.innerWidth / size);
	var h = window.innerHeight / size > Example.MAX_HEIGHT ? Example.MAX_HEIGHT : Math.floor(window.innerHeight / size);
	Example.echo = new echo_Echo();
	Example.echo.addSystem(new Movement(w,h));
	Example.echo.addSystem(new Interaction());
	Example.echo.addSystem(new Render(w,h,size,canvas));
	Example.echo.addSystem(new InteractionEvent());
	var _g1 = 0;
	var _g = h;
	while(_g1 < _g) {
		var y = _g1++;
		var _g3 = 0;
		var _g2 = w;
		while(_g3 < _g2) {
			var x = _g3++;
			if(Math.random() > .5) {
				Example.grass(x,y);
			} else if(Math.random() > .2) {
				Example.tree(x,y);
			} else {
				Example.flower(x,y);
			}
		}
	}
	var _g11 = 0;
	var _g4 = Example.RABBITS_POPULATION;
	while(_g11 < _g4) {
		_g11++;
		Example.rabbit(Std.random(w),Std.random(h));
	}
	Example.tiger(Std.random(w),Std.random(h));
	window.setInterval(function() {
		Example.echo.update(.050);
		stat.innerHTML = Example.echo.toString();
	},50);
};
Example.grass = function(x,y) {
	var codes = ["&#x1F33E","&#x1F33F"];
	var id = Example.echo.id();
	ComponentMap_$Example_$Position.STACK.h[id] = new Vec2(x,y);
	var this1 = ComponentMap_$Example_$Sprite.STACK;
	var value = codes[Std.random(codes.length)];
	var this2 = window.document.createElement("span");
	this2.style.position = "absolute";
	this2.innerHTML = value;
	this1.h[id] = this2;
	if(Example.echo.entitiesMap.h.hasOwnProperty(id)) {
		var _g_head = Example.echo.views.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			val.addIfMatch(id);
		}
	}
};
Example.tree = function(x,y) {
	var codes = ["&#x1F332","&#x1F333"];
	var id = Example.echo.id();
	ComponentMap_$Example_$Position.STACK.h[id] = new Vec2(x,y);
	var this1 = ComponentMap_$Example_$Sprite.STACK;
	var value = codes[Std.random(codes.length)];
	var this2 = window.document.createElement("span");
	this2.style.position = "absolute";
	this2.innerHTML = value;
	this1.h[id] = this2;
	if(Example.echo.entitiesMap.h.hasOwnProperty(id)) {
		var _g_head = Example.echo.views.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			val.addIfMatch(id);
		}
	}
};
Example.flower = function(x,y) {
	var codes = ["&#x1F337","&#x1F339","&#x1F33B"];
	var id = Example.echo.id();
	ComponentMap_$Example_$Position.STACK.h[id] = new Vec2(x,y);
	var this1 = ComponentMap_$Example_$Sprite.STACK;
	var value = codes[Std.random(codes.length)];
	var this2 = window.document.createElement("span");
	this2.style.position = "absolute";
	this2.innerHTML = value;
	this1.h[id] = this2;
	if(Example.echo.entitiesMap.h.hasOwnProperty(id)) {
		var _g_head = Example.echo.views.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			val.addIfMatch(id);
		}
	}
};
Example.rabbit = function(x,y) {
	var this1 = new Vec2(x,y);
	var vel = Example.randomVelocity(1);
	var this2 = window.document.createElement("span");
	this2.style.position = "absolute";
	this2.innerHTML = "&#x1F407;";
	var id = Example.echo.id();
	ComponentMap_$Example_$Position.STACK.h[id] = this1;
	ComponentMap_$Example_$Velocity.STACK.h[id] = vel;
	ComponentMap_$Example_$Sprite.STACK.h[id] = this2;
	ComponentMap_$Example_$Animal.STACK.h[id] = Animal.Rabbit;
	if(Example.echo.entitiesMap.h.hasOwnProperty(id)) {
		var _g_head = Example.echo.views.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			val.addIfMatch(id);
		}
	}
};
Example.tiger = function(x,y) {
	var this1 = new Vec2(x,y);
	var vel = Example.randomVelocity(10);
	var this2 = window.document.createElement("span");
	this2.style.position = "absolute";
	this2.innerHTML = "&#x1F405;";
	var spr = this2;
	spr.style.fontSize = "200%";
	var id = Example.echo.id();
	ComponentMap_$Example_$Position.STACK.h[id] = this1;
	ComponentMap_$Example_$Velocity.STACK.h[id] = vel;
	ComponentMap_$Example_$Sprite.STACK.h[id] = spr;
	ComponentMap_$Example_$Animal.STACK.h[id] = Animal.Tiger;
	if(Example.echo.entitiesMap.h.hasOwnProperty(id)) {
		var _g_head = Example.echo.views.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			val.addIfMatch(id);
		}
	}
};
Example.event = function(x,y,type) {
	var code;
	switch(type) {
	case "heart":
		code = "&#x1F498;";
		break;
	case "skull":
		code = "&#x1F480;";
		break;
	default:
		code = "";
	}
	var id = Example.echo.id();
	ComponentMap_$Example_$Position.STACK.h[id] = new Vec2(x,y);
	var this1 = ComponentMap_$Example_$Sprite.STACK;
	var this2 = window.document.createElement("span");
	this2.style.position = "absolute";
	this2.innerHTML = code;
	this1.h[id] = this2;
	ComponentMap_$Example_$Timeout.STACK.h[id] = new Timeout(3.0);
	if(Example.echo.entitiesMap.h.hasOwnProperty(id)) {
		var _g_head = Example.echo.views.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			val.addIfMatch(id);
		}
	}
};
Example.randomVelocity = function(speed) {
	var d = Math.random() * Math.PI * 2;
	return new Vec2(Math.cos(d) * speed,Math.sin(d) * speed);
};
var Vec2 = function(x,y) {
	this.x = x != null ? x : .0;
	this.y = y != null ? y : .0;
};
Vec2.__name__ = true;
var Animal = $hxEnums["Animal"] = { __ename__ : true, __constructs__ : ["Rabbit","Tiger"]
	,Rabbit: {_hx_index:0,__enum__:"Animal"}
	,Tiger: {_hx_index:1,__enum__:"Animal"}
};
var Timeout = function(t) {
	this.t = this.timeout = t;
};
Timeout.__name__ = true;
var echo_System = function() {
	this.__id = -1;
};
echo_System.__name__ = true;
echo_System.prototype = {
	activate: function(echo1) {
		this.echo = echo1;
	}
	,update: function(dt) {
	}
	,toString: function() {
		return "System";
	}
};
var Movement = function(w,h) {
	echo_System.call(this);
	this.__id = 4;
	this.w = w;
	this.h = h;
};
Movement.__name__ = true;
Movement.__super__ = echo_System;
Movement.prototype = $extend(echo_System.prototype,{
	update: function(dt) {
		var _gthis = this;
		var _g_head = this.bodies.entities.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var pos = ComponentMap_$Example_$Position.STACK.h[val];
			var vel = ComponentMap_$Example_$Velocity.STACK.h[val];
			pos.x += vel.x * dt;
			pos.y += vel.y * dt;
			if(pos.x >= _gthis.w) {
				pos.x -= _gthis.w;
			}
			if(pos.x < 0) {
				pos.x += _gthis.w;
			}
			if(pos.y >= _gthis.h) {
				pos.y -= _gthis.h;
			}
			if(pos.y < 0) {
				pos.y += _gthis.h;
			}
		}
	}
	,activate: function(echo) {
		this.echo = echo;
		if(!echo.viewsMap.h.hasOwnProperty(3)) {
			echo.addView(new View_$Example_$Position_$Example_$Velocity());
		}
		this.bodies = echo.viewsMap.h[3];
	}
	,toString: function() {
		return "Example.Movement";
	}
});
var Render = function(w,h,size,canvas) {
	echo_System.call(this);
	this.__id = 3;
	this.world = [];
	var _g1 = 0;
	var _g = h;
	while(_g1 < _g) {
		var y = _g1++;
		this.world[y] = [];
		var _g3 = 0;
		var _g2 = w;
		while(_g3 < _g2) {
			var x = _g3++;
			var span = window.document.createElement("span");
			span.style.position = "absolute";
			span.style.left = "" + x * size + "px";
			span.style.top = "" + y * size + "px";
			this.world[y][x] = span;
			canvas.appendChild(span);
		}
		canvas.appendChild(window.document.createElement("br"));
	}
};
Render.__name__ = true;
Render.__super__ = echo_System;
Render.prototype = $extend(echo_System.prototype,{
	appendVisual: function(pos,spr) {
		this.world[pos.y | 0][pos.x | 0].appendChild(spr);
	}
	,removeVisual: function(id) {
		ComponentMap_$Example_$Sprite.STACK.h[id].remove();
	}
	,updateDynamicVisual: function(dt,vel,pos,spr) {
		this.world[pos.y | 0][pos.x | 0].appendChild(spr);
	}
	,update: function(dt) {
		var _g_head = this.view_example_position_example_sprite_example_velocity.entities.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			this.updateDynamicVisual(dt,ComponentMap_$Example_$Velocity.STACK.h[val],ComponentMap_$Example_$Position.STACK.h[val],ComponentMap_$Example_$Sprite.STACK.h[val]);
		}
	}
	,activate: function(echo) {
		var _gthis = this;
		this.echo = echo;
		this.__appendVisual = function(_id_) {
			_gthis.appendVisual(ComponentMap_$Example_$Position.STACK.h[_id_],ComponentMap_$Example_$Sprite.STACK.h[_id_]);
		};
		this.__removeVisual = function(_id_1) {
			_gthis.removeVisual(_id_1);
		};
		if(!echo.viewsMap.h.hasOwnProperty(2)) {
			echo.addView(new View_$Example_$Position_$Example_$Sprite());
		}
		this.visuals = echo.viewsMap.h[2];
		if(!echo.viewsMap.h.hasOwnProperty(4)) {
			echo.addView(new View_$Example_$Position_$Example_$Sprite_$Example_$Velocity());
		}
		this.view_example_position_example_sprite_example_velocity = echo.viewsMap.h[4];
		this.visuals.onAdded.push(this.__appendVisual);
		this.visuals.onRemoved.push(this.__removeVisual);
		var _g_head = this.visuals.entities.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			this.__appendVisual(val);
		}
	}
	,toString: function() {
		return "Example.Render";
	}
});
var Interaction = function() {
	echo_System.call(this);
	this.__id = 2;
};
Interaction.__name__ = true;
Interaction.__super__ = echo_System;
Interaction.prototype = $extend(echo_System.prototype,{
	update: function(dt) {
		var _gthis = this;
		var del = [];
		var _g_head = this.animals.entities.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var a1 = ComponentMap_$Example_$Animal.STACK.h[val];
			var pos1 = ComponentMap_$Example_$Position.STACK.h[val];
			var _g_head1 = _gthis.animals.entities.h;
			while(_g_head1 != null) {
				var val1 = _g_head1.item;
				_g_head1 = _g_head1.next;
				var a2 = ComponentMap_$Example_$Animal.STACK.h[val1];
				if(val != val1 && _gthis.isInteract(pos1,ComponentMap_$Example_$Position.STACK.h[val1],1.0)) {
					if(a1 == Animal.Tiger && a2 == Animal.Rabbit) {
						console.log("test/Example.hx:237:","eat " + val1);
						Example.event(pos1.x,pos1.y,"skull");
						del.push(val1);
					}
					if(a1 == Animal.Rabbit && a2 == Animal.Rabbit) {
						if(Lambda.count(_gthis.animals.entities,function(i) {
							return ComponentMap_$Example_$Animal.STACK.h[i] == Animal.Rabbit;
						}) < Example.RABBITS_POPULATION) {
							Example.rabbit(pos1.x,pos1.y);
							Example.event(pos1.x,pos1.y,"heart");
						}
					}
				}
			}
		}
		var _g = 0;
		while(_g < del.length) this.echo.remove(del[_g++]);
	}
	,isInteract: function(pos1,pos2,radius) {
		if(Math.abs(pos1.x - pos2.x) < radius) {
			return Math.abs(pos1.y - pos2.y) < radius;
		} else {
			return false;
		}
	}
	,activate: function(echo) {
		this.echo = echo;
		if(!echo.viewsMap.h.hasOwnProperty(1)) {
			echo.addView(new View_$Example_$Animal_$Example_$Position());
		}
		this.animals = echo.viewsMap.h[1];
	}
	,toString: function() {
		return "Example.Interaction";
	}
});
var InteractionEvent = function() {
	echo_System.call(this);
	this.__id = 1;
};
InteractionEvent.__name__ = true;
InteractionEvent.__super__ = echo_System;
InteractionEvent.prototype = $extend(echo_System.prototype,{
	update: function(dt) {
		var _g_head = this.view_example_sprite_example_timeout.entities.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var t = ComponentMap_$Example_$Timeout.STACK.h[val];
			var s = ComponentMap_$Example_$Sprite.STACK.h[val];
			s.style.opacity = "" + t.t / t.timeout;
			t.t -= dt;
			if(t.t <= .0) {
				s.style.opacity = ".0";
				this.echo.remove(val);
			}
		}
	}
	,activate: function(echo) {
		this.echo = echo;
		if(!echo.viewsMap.h.hasOwnProperty(0)) {
			echo.addView(new View_$Example_$Sprite_$Example_$Timeout());
		}
		this.view_example_sprite_example_timeout = echo.viewsMap.h[0];
	}
	,toString: function() {
		return "Example.InteractionEvent";
	}
});
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var _ = it.iterator();
		while(_.hasNext()) {
			_.next();
			++n;
		}
	} else {
		var x = it.iterator();
		while(x.hasNext()) if(pred(x.next())) {
			++n;
		}
	}
	return n;
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var echo_ViewBase = function() {
	this.entities = new haxe_ds_List();
	this.onRemoved = [];
	this.onAdded = [];
	this.__id = -1;
	this.entitiesMap = new haxe_ds_IntMap();
};
echo_ViewBase.__name__ = true;
echo_ViewBase.prototype = {
	activate: function(echo1) {
		this.echo = echo1;
		var _g_head = echo1.entities.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			this.addIfMatch(val);
		}
	}
	,isMatch: function(id) {
		return false;
	}
	,addIfMatch: function(id) {
		if(!this.entitiesMap.h.hasOwnProperty(id) && this.isMatch(id)) {
			this.entitiesMap.h[id] = id;
			this.entities.add(id);
			var i = 0;
			var l = this.onAdded.length;
			while(i < l) {
				var listener = this.onAdded[i];
				if(listener != null) {
					listener(id);
					++i;
				} else {
					this.onAdded.splice(i,1);
					--l;
				}
			}
		}
	}
	,removeIfMatch: function(id) {
		if(this.entitiesMap.h.hasOwnProperty(id)) {
			var i = 0;
			var l = this.onRemoved.length;
			while(i < l) {
				var listener = this.onRemoved[i];
				if(listener != null) {
					listener(id);
					++i;
				} else {
					this.onRemoved.splice(i,1);
					--l;
				}
			}
			this.entities.remove(id);
			this.entitiesMap.remove(id);
		}
	}
	,toString: function() {
		return "ViewBase";
	}
};
var View_$Example_$Animal_$Example_$Position = function() {
	echo_ViewBase.call(this);
	this.__id = 1;
};
View_$Example_$Animal_$Example_$Position.__name__ = true;
View_$Example_$Animal_$Example_$Position.__super__ = echo_ViewBase;
View_$Example_$Animal_$Example_$Position.prototype = $extend(echo_ViewBase.prototype,{
	isMatch: function(id) {
		if(ComponentMap_$Example_$Animal.STACK.h[id] != null) {
			return ComponentMap_$Example_$Position.STACK.h[id] != null;
		} else {
			return false;
		}
	}
	,toString: function() {
		return "Example.Animal,Example.Position";
	}
});
var View_$Example_$Position_$Example_$Sprite = function() {
	echo_ViewBase.call(this);
	this.__id = 2;
};
View_$Example_$Position_$Example_$Sprite.__name__ = true;
View_$Example_$Position_$Example_$Sprite.__super__ = echo_ViewBase;
View_$Example_$Position_$Example_$Sprite.prototype = $extend(echo_ViewBase.prototype,{
	isMatch: function(id) {
		if(ComponentMap_$Example_$Position.STACK.h[id] != null) {
			return ComponentMap_$Example_$Sprite.STACK.h[id] != null;
		} else {
			return false;
		}
	}
	,toString: function() {
		return "Example.Position,Example.Sprite";
	}
});
var View_$Example_$Position_$Example_$Sprite_$Example_$Velocity = function() {
	echo_ViewBase.call(this);
	this.__id = 4;
};
View_$Example_$Position_$Example_$Sprite_$Example_$Velocity.__name__ = true;
View_$Example_$Position_$Example_$Sprite_$Example_$Velocity.__super__ = echo_ViewBase;
View_$Example_$Position_$Example_$Sprite_$Example_$Velocity.prototype = $extend(echo_ViewBase.prototype,{
	isMatch: function(id) {
		if(ComponentMap_$Example_$Position.STACK.h[id] != null && ComponentMap_$Example_$Sprite.STACK.h[id] != null) {
			return ComponentMap_$Example_$Velocity.STACK.h[id] != null;
		} else {
			return false;
		}
	}
	,toString: function() {
		return "Example.Position,Example.Sprite,Example.Velocity";
	}
});
var View_$Example_$Position_$Example_$Velocity = function() {
	echo_ViewBase.call(this);
	this.__id = 3;
};
View_$Example_$Position_$Example_$Velocity.__name__ = true;
View_$Example_$Position_$Example_$Velocity.__super__ = echo_ViewBase;
View_$Example_$Position_$Example_$Velocity.prototype = $extend(echo_ViewBase.prototype,{
	isMatch: function(id) {
		if(ComponentMap_$Example_$Position.STACK.h[id] != null) {
			return ComponentMap_$Example_$Velocity.STACK.h[id] != null;
		} else {
			return false;
		}
	}
	,toString: function() {
		return "Example.Position,Example.Velocity";
	}
});
var View_$Example_$Sprite_$Example_$Timeout = function() {
	echo_ViewBase.call(this);
	this.__id = 0;
};
View_$Example_$Sprite_$Example_$Timeout.__name__ = true;
View_$Example_$Sprite_$Example_$Timeout.__super__ = echo_ViewBase;
View_$Example_$Sprite_$Example_$Timeout.prototype = $extend(echo_ViewBase.prototype,{
	isMatch: function(id) {
		if(ComponentMap_$Example_$Sprite.STACK.h[id] != null) {
			return ComponentMap_$Example_$Timeout.STACK.h[id] != null;
		} else {
			return false;
		}
	}
	,toString: function() {
		return "Example.Sprite,Example.Timeout";
	}
});
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
};
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	,iterator: function() {
		return new haxe_ds__$List_ListIterator(this.h);
	}
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
var haxe_ds__$List_ListIterator = function(head) {
	this.head = head;
};
haxe_ds__$List_ListIterator.__name__ = true;
haxe_ds__$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s += "\t";
				var tmp = n + "(";
				var _g = [];
				var _g1 = 0;
				var _g2 = con.__params__;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(js_Boot.__string_rec(o[p],s));
				}
				return tmp + _g.join(",") + ")";
			} else {
				return n;
			}
		}
		if((o instanceof Array)) {
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g11 = 0;
			var _g3 = l;
			while(_g11 < _g3) {
				var i1 = _g11++;
				str += (i1 > 0 ? "," : "") + js_Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = (e1 instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
ComponentMap_$Example_$Animal.STACK = new haxe_ds_IntMap();
var _e = ComponentMap_$Example_$Animal.STACK;
echo_Echo.__addComponentStack(2,function(key) {
	return _e.remove(key);
});
ComponentMap_$Example_$Position.STACK = new haxe_ds_IntMap();
var _e = ComponentMap_$Example_$Position.STACK;
echo_Echo.__addComponentStack(3,function(key) {
	return _e.remove(key);
});
ComponentMap_$Example_$Sprite.STACK = new haxe_ds_IntMap();
var _e = ComponentMap_$Example_$Sprite.STACK;
echo_Echo.__addComponentStack(1,function(key) {
	return _e.remove(key);
});
ComponentMap_$Example_$Timeout.STACK = new haxe_ds_IntMap();
var _e = ComponentMap_$Example_$Timeout.STACK;
echo_Echo.__addComponentStack(0,function(key) {
	return _e.remove(key);
});
ComponentMap_$Example_$Velocity.STACK = new haxe_ds_IntMap();
var _e = ComponentMap_$Example_$Velocity.STACK;
echo_Echo.__addComponentStack(4,function(key) {
	return _e.remove(key);
});
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
echo_Echo.__echoSequence = -1;
echo_Echo.__componentSequence = -1;
Example.RABBITS_POPULATION = 64;
Example.MAX_WIDTH = 60;
Example.MAX_HEIGHT = 40;
Render.__meta__ = { fields : { appendVisual : { onadded : null}, removeVisual : { onremoved : null}, updateDynamicVisual : { update : null}}};
Example.main();
})();
