window.__require = function e(t, o, n) {
function i(r, s) {
if (!o[r]) {
if (!t[r]) {
var c = r.split("/");
c = c[c.length - 1];
if (!t[c]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(c, !0);
if (a) return a(c, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var d = o[r] = {
exports: {}
};
t[r][0].call(d.exports, function(e) {
return i(t[r][1][e] || e);
}, d, d.exports, e, t, o, n);
}
return o[r].exports;
}
for (var a = "function" == typeof __require && __require, r = 0; r < n.length; r++) i(n[r]);
return i;
}({
App: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "01a716ckFRCA7HCvOGvyKMl", "App");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Initialization/Facade/InitialFacade"), i = e("../Update/UpdateController"), a = cc._decorator, r = a.ccclass, s = (a.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
console.log(" App onLoad ");
};
t.prototype.start = function() {
i.default.inst.addCompleteCallback(function(e) {
n.InitialFacade.inst.start();
}, this);
i.default.inst.checkForUpdate();
};
t.prototype.Onclick = function() {
window.alert("您已成功支付 $ 999 , 谢谢惠顾");
};
t.prototype.onDestroy = function() {
i.default.inst.destory();
};
return t = __decorate([ r ], t);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {
"../Initialization/Facade/InitialFacade": "InitialFacade",
"../Update/UpdateController": "UpdateController"
} ],
AudioManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "88c70Ktw0pBKKUTDtyQ2NkZ", "AudioManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Utils/HashMap");
window.oncanplay && (window.oncanplay = function() {
a.canPlay = !0;
});
var i = "sounds/", a = function() {
function e() {
this.audioID = {};
this.clips = new n.HashMap();
}
Object.defineProperty(e, "inst", {
get: function() {
return this.ins ? this.ins : this.ins = new e();
},
enumerable: !0,
configurable: !0
});
e.prototype.init = function(e) {
var t = this;
console.warn(" start load AudioClip ");
var o = this;
cc.loader.loadRes(i + "bgm", cc.AudioClip, function(t, n) {
if (t) console.error(t); else {
0;
o.clips.add(n.name, n);
e && e();
}
});
cc.loader.loadRes(i + "mouse_bgm", function(e, t) {
e ? console.error(e) : o.clips.add(t.name, t);
});
cc.loader.loadRes(i + "bgm_30", function(e, t) {
e ? console.error(e) : o.clips.add(t.name, t);
});
cc.loader.loadResDir(i, function(e, o, n) {
if (e) console.error(e); else for (var i = 0, a = o; i < a.length; i++) {
var r = a[i];
t.clips.has(r.name) || t.clips.add(r.name, r);
}
});
};
e.prototype.playEffect = function(t, o, n) {
var a = this;
void 0 === o && (o = !1);
if (e.canPlay) {
if (!(cc.audioEngine.getEffectsVolume() <= .05)) {
var r = this.clips.get(t);
if (r) {
this.audioID[t] = cc.audioEngine.playEffect(r, o);
cc.audioEngine.setFinishCallback(this.audioID[t], function() {
n && n();
});
} else cc.loader.loadRes(i + t, cc.AudioClip, function(e, i) {
if (e) console.error(e); else {
0;
a.clips.add(i.name, i);
a.audioID[t] = cc.audioEngine.playEffect(i, o);
cc.audioEngine.setFinishCallback(a.audioID[t], function() {
n && n();
});
}
});
}
} else this.bindTouch();
};
e.prototype.playMusic = function(t, o) {
var n = this;
void 0 === o && (o = !0);
if (e.canPlay) {
var a = this.clips.get(t);
a ? cc.audioEngine.playMusic(a, o) : cc.loader.loadRes(i + t, cc.AudioClip, function(e, t) {
if (e) console.error(e); else {
"string" == typeof t._audio && cc.loader._cache && cc.loader._cache[t._audio] && cc.loader._cache[t._audio].buffer && (t._audio = cc.loader._cache[t._audio].buffer);
n.clips.add(t.name, t);
cc.audioEngine.playMusic(t, o);
}
});
} else {
this.bindTouch();
e.PlayedList.push({
loop: !0,
volume: 1,
clipName: t,
supTime: Date.now(),
skip: !1,
isBgm: !0
});
}
};
e.prototype.bindTouch = function() {
if (!e.hasBindTouch) {
var t = this, o = function() {
cc.game.canvas.removeEventListener("touchstart", o);
e.canPlay = !0;
for (var n; (n = e.PlayedList.pop()) && t.clips.get(n.clipName) && !n.skip; ) cc.audioEngine.playMusic(t.clips.get(n.clipName), n.loop);
};
e.hasBindTouch = !0;
cc.game.canvas.addEventListener("touchstart", o);
}
};
e.PlayedList = [];
e.canPlay = !1;
e.hasBindTouch = !1;
return e;
}();
o.gAudio = a.inst;
cc._RF.pop();
}, {
"../Utils/HashMap": "HashMap"
} ],
BaseMediator: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a55f9L2TzpBioZHJUFK8aU4", "BaseMediator");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./BaseView"), i = cc._decorator, a = i.ccclass, r = (i.property, function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
Object.defineProperty(t.prototype, "View", {
get: function() {
null == this.view && (this.view = this.getComponent(n.default));
return this.view;
},
enumerable: !0,
configurable: !0
});
t.prototype.onRegister = function() {};
return t = __decorate([ a ], t);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {
"./BaseView": "BaseView"
} ],
BaseView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f61a0AuqqtLI4f73iaJBotC", "BaseView");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, a = (n.property, function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.node.scale = 0;
};
t.prototype.Show = function() {
this.node.runAction(cc.scaleTo(.1, 1));
};
t.prototype.Hide = function() {
this.node.runAction(cc.scaleTo(.1, 0));
};
t.prototype.OnClick = function() {};
t.prototype.BindMedaitor = function(e) {
var t = this.node.addComponent(e);
t.onRegister && t.onRegister();
return t;
};
return t = __decorate([ i ], t);
}(cc.Component));
o.default = a;
cc._RF.pop();
}, {} ],
CelerSDK: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "34a72Ol/DRKJb0NyonTxi8g", "CelerSDK");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../ToSingleton"), i = e("../LogHandler"), a = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.alreadySubmit = !1;
t.isNewPlayer = !0;
t.celerStartCallback = null;
return t;
}
Object.defineProperty(t.prototype, "MatchID", {
get: function() {
return this.match.matchId;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "MatchRandomSeed", {
get: function() {
return this.match.sharedRandomSeed;
},
enumerable: !0,
configurable: !0
});
t.prototype.init = function(e) {
this.alreadySubmit = !1;
CELER_X && celerSDK.onStart(this.onCelerStart.bind(this));
CELER_X && celerSDK.provideScore(function() {
return 0;
});
this.celerStartCallback = e;
CELER_X && i.LogHandler.inst.initLog(celerSDK.log);
};
t.prototype.celerXReady = function() {
console.log(" invoke celerx.ready() ");
CELER_X ? celerSDK.ready() : this.onCelerStart();
};
t.prototype.isNew = function() {
return this.isNewPlayer;
};
t.prototype.isOnCelerPlatform = function() {
return CELER_X;
};
t.prototype.onCelerStart = function() {
console.log(" celerx onStart call");
this.match = celerSDK.getMatch();
this.match || (this.match = {
matchId: "error : can not get id",
shouldLaunchTutorial: !1,
sharedRandomSeed: 1
});
console.log("match id:", this.match.matchId, ", seed:", this.match.sharedRandomSeed);
this.match && this.match.shouldLaunchTutorial ? this.isNewPlayer = !0 : this.isNewPlayer = !1;
var e = !1, t = document.getElementsByTagName("canvas")[0];
cc.director.on(cc.Director.EVENT_AFTER_DRAW, function() {
if (e) {
e = !1;
CELER_X && celerSDK.didTakeSnapshot(t.toDataURL("image/jpeg", .1));
}
});
CELER_X && celerSDK.provideCurrentFrameData(function() {
e = !0;
});
if (this.celerStartCallback) {
this.celerStartCallback();
this.celerStartCallback = null;
}
};
t.prototype.submitScore = function(e) {
if (!this.alreadySubmit) {
this.alreadySubmit = !0;
console.log(" submit score:", e, ", match id:", this.match.matchId);
CELER_X && celerSDK.submitScore(e);
}
};
return t;
}(n.SingleTon());
o.CelerSDK = a;
cc._RF.pop();
}, {
"../LogHandler": "LogHandler",
"../ToSingleton": "ToSingleton"
} ],
CustomManifest: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "904f2vQDh9ANKexRok3KYVy", "CustomManifest");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.CustomManifest = {};
cc._RF.pop();
}, {} ],
FacadeGlobal: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c46cfDkM7pInYAeGAk610m1", "FacadeGlobal");
cc._RF.pop();
}, {} ],
GameConfig: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a62daLXYOFLDYRzPtZG9Ak6", "GameConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
Object.defineProperty(t, "Url", {
get: function() {
return "https://vicat.wang/GameRes/";
},
enumerable: !0,
configurable: !0
});
t.prototype.loadConfig = function(e) {
var o = this, n = function() {
cc.loader.load(t.Url + t.Path + "?time=" + Date.now(), function(t, i) {
if (t) {
console.error(JSON.stringify(t));
setTimeout(function() {
n();
}, 100);
} else {
console.log(i);
o.config = i;
e();
}
});
}, i = function() {
o.loadConfigInNative(t.Url + t.Path + "?time=" + Date.now(), function(t, n) {
if (t) {
console.error(JSON.stringify(t));
setTimeout(function() {
i();
}, 100);
} else {
console.log(n);
o.config = JSON.parse(n);
e();
}
});
};
cc.sys.isNative ? i() : n();
};
Object.defineProperty(t.prototype, "Config", {
get: function() {
return this.config;
},
enumerable: !0,
configurable: !0
});
t.prototype.loadConfigInNative = function(e, t) {
var o = cc.loader.getXMLHttpRequest(), n = "Load text file failed: " + e;
o.open("GET", e, !0);
o.overrideMimeType && o.overrideMimeType("text/plain; charset=utf-8");
o.onload = function() {
4 === o.readyState ? 200 === o.status || 0 === o.status ? t(null, o.responseText) : t({
status: o.status,
errorMessage: n + "(wrong status)"
}) : t({
status: o.status,
errorMessage: n + "(wrong readyState)"
});
};
o.onerror = function() {
t({
status: o.status,
errorMessage: n + "(error)"
});
};
o.ontimeout = function() {
t({
status: o.status,
errorMessage: n + "(time out)"
});
};
o.send(null);
};
t.Path = "Config/gameConfig.json";
return t;
}(e("../Utils/ToSingleton").SingleTon());
o.GameConfig = n;
cc._RF.pop();
}, {
"../Utils/ToSingleton": "ToSingleton"
} ],
GameFactory: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "93d23kfnY1A76OtZSkIyJ5r", "GameFactory");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Utils/HashMap"), i = function() {
function e(e, t, o) {
this._pool = [];
this.totalSize = 0;
this.initTime = [];
this.completeHandler = o;
this.template = e;
this.totalSize = t;
this.hashKey = "ObjPool:" + this.template.name + " - " + this.totalSize;
this.initPool(t);
}
e.prototype.initPool = function(e, t) {
var o = this;
void 0 === t && (t = !1);
if (t) for (var n = 0; n < e; ++n) {
this.initTime.push(Date.now());
var i = cc.instantiate(this.template);
this.put(i);
} else for (n = 0; n < e; ++n) {
this.initTime.push(Date.now());
setTimeout(function() {
var e = cc.instantiate(o.template);
o.put(e);
}, n);
}
};
e.prototype.size = function() {
return this._pool.length;
};
e.prototype.clear = function() {
for (var e = this._pool.length, t = 0; t < e; ++t) this._pool[t].destroy && this._pool[t].destroy();
this._pool.length = 0;
};
e.prototype.put = function(e) {
if (e && -1 === this._pool.indexOf(e)) {
e.removeFromParent(!1);
for (var t = 0, o = e.getComponents(cc.Component); t < o.length; t++) {
var n = o[t];
n && n.unuse && n.unuse.apply(n);
}
this._pool.push(e);
if (this.completeHandler && this.totalSize <= this._pool.length) {
this.completeHandler();
this.completeHandler = null;
}
}
};
e.prototype.get = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
var o = this._pool.length - 1;
if (o < 0) {
console.warn(" last < 0 ");
this.initPool(1, !0);
}
o = this._pool.length - 1;
var n = this._pool[o];
this._pool.length = o;
for (var i = 0, a = n.getComponents(cc.Component); i < a.length; i++) {
var r = a[i];
r && r.reuse && r.reuse.apply(r, arguments);
}
return n;
};
return e;
}(), a = function() {
function e() {
this.count = 0;
this.totalCount = 0;
this.objPool = new n.HashMap();
this.startTime = 0;
}
Object.defineProperty(e, "inst", {
get: function() {
return this.ins ? this.ins : this.ins = new e();
},
enumerable: !0,
configurable: !0
});
e.prototype.init = function(e) {
var t = this;
this.doneCallback = e;
this.startTime = Date.now();
cc.loader.loadResDir("prefabs/", cc.Prefab, function(e, o, n) {
if (e) console.error(" Game Factory init failed:", e); else {
t.totalCount = o.length;
for (var a = function(e) {
var n = o[e], a = n.name.split("."), r = a[0], s = a[1] ? parseInt(a[1]) : 30;
console.log(" init pool:", r, ", count:", s);
setTimeout(function() {
var e = new i(n, s, t.addCount.bind(t));
t.objPool.add(r, e);
}, 10 * e);
}, r = 0; r < o.length; r++) a(r);
}
});
};
e.prototype.addCount = function() {
this.count++;
if (this.count >= this.totalCount) {
console.log(" factory cost time:", (Date.now() - this.startTime).toFixed(2) + "ms");
if (this.doneCallback) {
this.doneCallback();
this.doneCallback = null;
}
}
};
e.prototype.getObj = function(e) {
for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
if (this.objPool.has(e)) return this.objPool.get(e).get(t);
console.error(" objPool dosen't exists this obj:", e);
return null;
};
e.prototype.putObj = function(e, t) {
if (this.objPool.has(e)) return this.objPool.get(e).put(t);
console.error(" objPool dosen't exists this obj:", e);
};
return e;
}();
o.gFactory = a.inst;
cc._RF.pop();
}, {
"../Utils/HashMap": "HashMap"
} ],
GameListMediator: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "53dbbrIRD1BTITSQaxYwoou", "GameListMediator");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Command/StartUpSignal"), i = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onRegister = function() {
n.StartUpSignal.inst.addListener(this.onGameStart, this);
};
t.prototype.onGameStart = function() {
this.View.reFreshItems();
this.View.Show();
};
return t;
}(e("../../View/BaseMediator").default);
o.GameListMediator = i;
cc._RF.pop();
}, {
"../../View/BaseMediator": "BaseMediator",
"../Command/StartUpSignal": "StartUpSignal"
} ],
GameListView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d3c84j/qUlKu59AYuU4IbDX", "GameListView");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n, i = e("./GameListMediator"), a = e("../../View/BaseView"), r = e("../../Global/GameConfig"), s = e("../Command/LoadGameSignal"), c = cc._decorator, l = c.ccclass;
c.property;
(function(e) {
e[e.Normal = 0] = "Normal";
e[e.Special = 1] = "Special";
})(n || (n = {}));
var d = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.type = n.Special;
t.SELECTED_COLOR = cc.color(12, 130, 254);
t.iconCache = {};
return t;
}
t.prototype.onLoad = function() {
var t = this;
e.prototype.onLoad.call(this);
this.type = n.Special;
this.updateType();
this.SpecialNode.on(cc.Node.EventType.TOUCH_START, function() {
t.Special.color = t.SELECTED_COLOR;
}, this);
this.SpecialNode.on(cc.Node.EventType.TOUCH_CANCEL, function() {
t.updateType();
}, this);
this.SpecialNode.on(cc.Node.EventType.TOUCH_END, function() {
t.type = n.Special;
t.updateType();
t.reFreshItems();
}, this);
this.NormalNode.on(cc.Node.EventType.TOUCH_START, function() {
t.Normal.color = t.SELECTED_COLOR;
}, this);
this.NormalNode.on(cc.Node.EventType.TOUCH_END, function() {
t.type = n.Normal;
t.updateType();
t.reFreshItems();
}, this);
this.NormalNode.on(cc.Node.EventType.TOUCH_CANCEL, function() {
t.updateType();
}, this);
this.Icon.active = !1;
this.Icon.getChildByName("new").scale = 0;
this.BindMedaitor(i.GameListMediator);
};
t.prototype.updateType = function() {
if (this.type == n.Special) {
this.Special.color = this.SELECTED_COLOR;
this.Normal.color = cc.Color.WHITE;
} else {
this.Special.color = cc.Color.WHITE;
this.Normal.color = this.SELECTED_COLOR;
}
};
Object.defineProperty(t.prototype, "ScrollView", {
get: function() {
return this.getComponent(cc.ScrollView);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Content", {
get: function() {
return this.ScrollView.content;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Icon", {
get: function() {
return this.node.getChildByName("Icon");
},
enumerable: !0,
configurable: !0
});
t.prototype.getIconSprite = function(e) {
return e.getChildByName("Mask").getChildByName("icon512").getComponent(cc.Sprite);
};
Object.defineProperty(t.prototype, "Selection", {
get: function() {
return this.node.getChildByName("TypeSelection");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Normal", {
get: function() {
return this.Selection.getChildByName("Normal").getChildByName("Label");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Special", {
get: function() {
return this.Selection.getChildByName("Special").getChildByName("Label");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "NormalNode", {
get: function() {
return this.Selection.getChildByName("Normal");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "SpecialNode", {
get: function() {
return this.Selection.getChildByName("Special");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "isSpecial", {
get: function() {
return this.type == n.Special;
},
enumerable: !0,
configurable: !0
});
t.prototype.reFreshItems = function() {
var e = this.isSpecial ? r.GameConfig.inst.Config.specialGames : r.GameConfig.inst.Config.normalGames, t = r.GameConfig.inst.Config.new, o = e.length;
this.Content.removeAllChildren();
console.log(" reFreshItems: ", n[this.type]);
var i = this;
function a(t, o) {
o %= e.length;
if (i.iconCache[e[o]]) c(t, i.iconCache[e[o]], o); else {
("" == r.GameConfig.Url ? cc.loader.loadRes.bind(cc.loader) : cc.loader.load.bind(cc.loader))(r.GameConfig.Url + "Icons/" + e[o] + ".jpg?time=" + Date.now(), function(n, a) {
if (n) console.error(n); else {
i.iconCache[e[o]] = a;
c(t, a, o);
}
});
}
}
function c(o, n, a) {
i.getIconSprite(o).spriteFrame = new cc.SpriteFrame(n);
o.name = e[a];
o.targetOff(i);
o.runAction(cc.sequence(cc.scaleTo(.1, 1), cc.callFunc(function() {
t.indexOf(o.name) >= 0 && o.getChildByName("new").runAction(cc.scaleTo(.1, 1));
o.on(cc.Node.EventType.TOUCH_END, function() {
s.LoadGameSignal.inst.dispatchTwo(o.name, i.isSpecial);
}, i);
})));
}
for (;this.Content.childrenCount < o; ) {
var l = cc.instantiate(this.Icon);
l.getChildByName("new").scale = 0;
l.active = !0;
l.scale = 0;
this.Content.addChild(l);
a(l, this.Content.childrenCount - 1);
}
};
return t = __decorate([ l ], t);
}(a.default);
o.default = d;
cc._RF.pop();
}, {
"../../Global/GameConfig": "GameConfig",
"../../View/BaseView": "BaseView",
"../Command/LoadGameSignal": "LoadGameSignal",
"./GameListMediator": "GameListMediator"
} ],
GamePageMediator: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7e8acJlozlMP4X8hBSdAuDZ", "GamePageMediator");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../View/BaseMediator"), i = e("../Command/LoadGameSignal"), a = e("../../Global/GameConfig"), r = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
Object.defineProperty(t.prototype, "WebView", {
get: function() {
return this.node.getChildByName("GameView");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "CloseButton", {
get: function() {
return this.node.getChildByName("Close");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "RefreshButton", {
get: function() {
return this.node.getChildByName("Refresh");
},
enumerable: !0,
configurable: !0
});
t.prototype.onRegister = function() {
this.WebView.on("error", this.onGameLoadFail, this);
this.WebView.on("loaded", this.onGameLoadSuccess, this);
this.WebView.on("loading", this.onGameLoadProgress, this);
this.CloseButton.on(cc.Node.EventType.TOUCH_END, this.Close, this);
this.RefreshButton.on(cc.Node.EventType.TOUCH_END, this.Refresh, this);
i.LoadGameSignal.inst.addListenerTwo(this.startLoadGame, this);
};
t.prototype.Refresh = function() {
if (null != this.webViewNode && 0 != cc.isValid(this.webViewNode, !0)) {
var e = this.webViewNode.getComponent(cc.WebView);
e && (e.url = e.url + Date.now());
}
};
t.prototype.Close = function() {
this.WebView.active = !1;
this.webViewNode.removeComponent(cc.WebView);
this.webViewNode.destroy();
this.webViewNode = null;
this.View.Hide();
this.CloseButton.active = !1;
this.RefreshButton.active = !1;
};
t.prototype.startLoadGame = function(e, t) {
console.log(" load game:", e, ", special:", t);
var o = t ? a.GameConfig.inst.Config.specialPath : a.GameConfig.inst.Config.normalPath;
this.WebView.active = !0;
null != this.webViewNode && this.webViewNode.destroy && this.webViewNode.destroy();
this.webViewNode = new cc.Node();
this.webViewNode.width = this.WebView.width;
this.webViewNode.height = this.WebView.height;
this.WebView.addChild(this.webViewNode);
var n = this.webViewNode.addComponent(cc.WebView);
n.url = a.GameConfig.inst.Config.Url + o + e + "?time=" + Date.now();
console.log(n.url);
this.View.Show();
this.CloseButton.active = !0;
this.RefreshButton.active = !0;
};
t.prototype.onGameLoadSuccess = function() {
console.log(" game load success ");
};
t.prototype.onGameLoadFail = function() {
console.log(" game load fail ");
};
t.prototype.onGameLoadProgress = function() {
console.log(" game load progress ");
};
return t;
}(n.default);
o.GamePageMediator = r;
cc._RF.pop();
}, {
"../../Global/GameConfig": "GameConfig",
"../../View/BaseMediator": "BaseMediator",
"../Command/LoadGameSignal": "LoadGameSignal"
} ],
GamePageView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a3eaaSESYJIDrxr49BFyoKN", "GamePageView");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../View/BaseView"), i = e("./GamePageMediator"), a = cc._decorator, r = a.ccclass, s = (a.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
Object.defineProperty(t.prototype, "BlockEvent", {
get: function() {
return this.getComponent(cc.BlockInputEvents);
},
enumerable: !0,
configurable: !0
});
t.prototype.onLoad = function() {
console.log(" Game PageView Onload ");
e.prototype.onLoad.call(this);
this.BindMedaitor(i.GamePageMediator);
this.BlockEvent.enabled = !1;
};
t.prototype.Show = function() {
e.prototype.Show.call(this);
this.BlockEvent.enabled = !0;
};
t.prototype.Hide = function() {
e.prototype.Hide.call(this);
this.BlockEvent.enabled = !1;
};
return t = __decorate([ r ], t);
}(n.default));
o.default = s;
cc._RF.pop();
}, {
"../../View/BaseView": "BaseView",
"./GamePageMediator": "GamePageMediator"
} ],
HashMap: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4b0e7DzcRNJnZXTYCWgDaDU", "HashMap");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this._list = new Array();
this.clear();
}
e.prototype.getIndexByKey = function(e) {
for (var t = this._list.length, o = 0; o < t; o++) {
if (this._list[o].key == e) return o;
}
return -1;
};
e.prototype.keyOf = function(e) {
for (var t = this._list.length, o = 0; o < t; o++) {
var n = this._list[o];
if (n.value.hashKey && e.hashKey && n.value.hashKey === e.hashKey || n.value == e) return n.key;
}
return null;
};
Object.defineProperty(e.prototype, "keys", {
get: function() {
for (var e = new Array(), t = 0, o = this._list; t < o.length; t++) {
var n = o[t];
n && e.push(n.key);
}
return e;
},
enumerable: !0,
configurable: !0
});
e.prototype.add = function(e, t) {
var o = {
key: e,
value: t
}, n = this.getIndexByKey(e);
-1 != n ? this._list[n] = o : this._list.push(o);
};
Object.defineProperty(e.prototype, "values", {
get: function() {
return this._list;
},
enumerable: !0,
configurable: !0
});
e.prototype.remove = function(e) {
var t = this.getIndexByKey(e);
if (-1 != t) {
var o = this._list[t];
this._list.splice(t, 1);
return o;
}
return null;
};
e.prototype.has = function(e) {
return -1 != this.getIndexByKey(e);
};
e.prototype.get = function(e) {
var t = this.getIndexByKey(e);
if (-1 != t) {
return this._list[t].value;
}
return null;
};
Object.defineProperty(e.prototype, "length", {
get: function() {
return this._list.length;
},
enumerable: !0,
configurable: !0
});
e.prototype.sort = function(e) {
this._list.sort(e);
};
e.prototype.forEachKeyValue = function(e) {
for (var t = this._list.length, o = 0; o < t; o++) {
e(this._list[o]);
}
};
e.prototype.forEach = function(e) {
for (var t = this._list.length, o = 0; o < t; o++) {
var n = this._list[o];
e(n.key, n.value);
}
};
e.prototype.clear = function() {
this._list = [];
};
return e;
}();
o.HashMap = n;
cc._RF.pop();
}, {} ],
InitialFacade: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cbbbcO7od5PrqaPNOs8dFh3", "InitialFacade");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Command/InititalCommond"), i = e("../Command/StartGameCommond"), a = e("../Command/LoadAudioCommond"), r = e("../Command/LoadPrefabCommond"), s = e("../../Utils/Celer/CelerSDK"), c = e("../Command/LoadConfigCommond"), l = function() {
function e(e) {
this.loadTime = {};
this.steps = [];
this.facade = puremvc.Facade.getInstance(e);
}
Object.defineProperty(e, "inst", {
get: function() {
return this.instance ? this.instance : this.instance = new e(e.MULTITON_KEY);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "Facade", {
get: function() {
console.assert(null == this.facade, " facade is null");
return this.facade;
},
enumerable: !0,
configurable: !0
});
e.prototype.register = function() {
var t = this;
this.facade.registerCommand(e.INITIALIZATION, n.InitialCommond);
this.facade.registerCommand(e.START_UP, i.StartGameCommond);
s.CelerSDK.inst.init(function() {
t.facade.sendNotification(e.START_UP, t);
});
};
e.prototype.unregister = function() {
this.facade.removeCommand(e.INITIALIZATION);
this.facade.removeCommand(e.START_UP);
};
e.prototype.start = function() {
this.register();
for (var t = 0, o = e.TOTAL_STEPS; t < o.length; t++) {
var n = o[t];
this.loadTime[n] = Date.now();
}
this.facade.sendNotification(e.INITIALIZATION, this);
console.log(" start ");
};
Object.defineProperty(e.prototype, "LoadPercent", {
get: function() {
return this.steps.length / e.TOTAL_STEPS.length;
},
enumerable: !0,
configurable: !0
});
e.prototype.step = function(t) {
console.log(" initialization step:", t);
if (this.steps.indexOf(t) < 0) {
this.steps.push(t);
this.steps.sort();
e.TOTAL_STEPS.sort();
var o = this.steps.join("-"), n = e.TOTAL_STEPS.join("-");
console.log(" cur-steps：", o, ", total:", n, ", ", t, " cost:", (Date.now() - this.loadTime[t]).toFixed(2), "ms");
}
};
e.MULTITON_KEY = "INITIAL_FCADE";
e.INITIALIZATION = "initialization";
e.START_UP = "startup";
e.TOTAL_STEPS = [ a.LoadAudioCommond.STEP, r.LoadPrefabCommond.STEP, c.LoadConfigCommond.STEP ];
return e;
}();
o.InitialFacade = l;
cc._RF.pop();
}, {
"../../Utils/Celer/CelerSDK": "CelerSDK",
"../Command/InititalCommond": "InititalCommond",
"../Command/LoadAudioCommond": "LoadAudioCommond",
"../Command/LoadConfigCommond": "LoadConfigCommond",
"../Command/LoadPrefabCommond": "LoadPrefabCommond",
"../Command/StartGameCommond": "StartGameCommond"
} ],
InititalCommond: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a28caT/H41F74cWxJYqN9pz", "InititalCommond");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./LoadPrefabCommond"), i = e("./LoadAudioCommond"), a = e("./LoadConfigCommond"), r = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.initializeMacroCommand = function() {
console.log("initializeMacroCommand");
this.addSubCommand(n.LoadPrefabCommond);
this.addSubCommand(i.LoadAudioCommond);
this.addSubCommand(a.LoadConfigCommond);
};
return t;
}(puremvc.MacroCommand);
o.InitialCommond = r;
cc._RF.pop();
}, {
"./LoadAudioCommond": "LoadAudioCommond",
"./LoadConfigCommond": "LoadConfigCommond",
"./LoadPrefabCommond": "LoadPrefabCommond"
} ],
LoadAudioCommond: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d4f3eGYUlBES5d8aEvuPQna", "LoadAudioCommond");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.execute = function(e) {
console.log(" start load audio...");
if (e) {
var o = e.getBody();
o && o.step ? o.step(t.STEP) : console.error(" load Audio: body is null");
} else console.error(" LoadAudioCommond: notification is null");
};
t.STEP = "LoadAudio";
return t;
}(puremvc.SimpleCommand);
o.LoadAudioCommond = n;
cc._RF.pop();
}, {} ],
LoadConfigCommond: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6b0eeyqdrZLF5W59XFgDMPO", "LoadConfigCommond");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Global/GameConfig"), i = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.execute = function(e) {
console.log(" start load config...");
if (e) {
var o = e.getBody();
o && o.step ? n.GameConfig.inst.loadConfig(function() {
o.step(t.STEP);
}) : console.error(" load Config: body is null");
} else console.error(" LoadConfigCommond: notification is null");
};
t.STEP = "LoadConfig";
return t;
}(puremvc.SimpleCommand);
o.LoadConfigCommond = i;
cc._RF.pop();
}, {
"../../Global/GameConfig": "GameConfig"
} ],
LoadGameSignal: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2e9d8ajhhdKJ4lLQ2rxKUIp", "LoadGameSignal");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
return t;
}(e("../../Utils/Signal").BaseSignal);
o.LoadGameSignal = n;
cc._RF.pop();
}, {
"../../Utils/Signal": "Signal"
} ],
LoadPrefabCommond: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8b33fPnvCZEJ7bc/zCVv9My", "LoadPrefabCommond");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Factory/GameFactory"), i = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.execute = function(e) {
console.log(" start load prefab...");
n.gFactory.init(function() {
if (e) {
var o = e.getBody();
o && o.step && o.step(t.STEP);
}
});
};
t.STEP = "LoadPrefab";
return t;
}(puremvc.SimpleCommand);
o.LoadPrefabCommond = i;
cc._RF.pop();
}, {
"../../Factory/GameFactory": "GameFactory"
} ],
LoadingMediator: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c1bc0VPwENA360VfVAc2oOS", "LoadingMediator");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../View/BaseMediator"), i = e("../../GamePlay/Command/StartUpSignal"), a = cc._decorator, r = a.ccclass, s = (a.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onRegister = function() {
i.StartUpSignal.inst.addListener(this.onGameStart, this);
};
t.prototype.onGameStart = function() {
this.View.Hide();
};
return t = __decorate([ r ], t);
}(n.default));
o.default = s;
cc._RF.pop();
}, {
"../../GamePlay/Command/StartUpSignal": "StartUpSignal",
"../../View/BaseMediator": "BaseMediator"
} ],
LoadingView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "29f9dxDYNRCYIEmZoZYTWke", "LoadingView");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../View/BaseView"), i = e("./LoadingMediator"), a = e("../Facade/InitialFacade"), r = e("../../GamePlay/Command/StartUpSignal"), s = e("../../Update/UpdateController"), c = cc._decorator, l = c.ccclass, d = (c.property, 
function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.progress = 0;
t.StartX = -410;
t.EndX = -138;
return t;
}
Object.defineProperty(t.prototype, "Title", {
get: function() {
return this.Progress.getChildByName("Title").getComponent(cc.Label);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Progress", {
get: function() {
return this.node.getChildByName("Progress");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Bar", {
get: function() {
return this.Progress.getChildByName("Mask").getChildByName("bar");
},
enumerable: !0,
configurable: !0
});
t.prototype.onLoad = function() {
var e = this;
console.log(" Loading View onLoad ");
this.node.scale = 1;
this.Bar.x = this.StartX;
this.BindMedaitor(i.default);
this.Progress.opacity = 0;
s.default.inst.addCompleteCallback(function(t) {
e.Progress.runAction(cc.fadeIn(.3));
}, this);
};
t.prototype.update = function(e) {
this.progress += .3 * e;
this.progress = Math.min(this.progress, a.InitialFacade.inst.LoadPercent);
this.Title.string = "Loading " + (100 * this.progress).toFixed(0) + "%";
this.Bar.x = (this.EndX - this.StartX) * this.progress + this.StartX;
if (this.Bar.x >= this.EndX) {
setTimeout(function() {
r.StartUpSignal.inst.dispatch();
}, 500);
this.enabled = !1;
}
};
return t = __decorate([ l ], t);
}(n.default));
o.default = d;
cc._RF.pop();
}, {
"../../GamePlay/Command/StartUpSignal": "StartUpSignal",
"../../Update/UpdateController": "UpdateController",
"../../View/BaseView": "BaseView",
"../Facade/InitialFacade": "InitialFacade",
"./LoadingMediator": "LoadingMediator"
} ],
LogHandler: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a4747QIvUBIo6Ktpx/xQwuB", "LogHandler");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(e) {
__extends(t, e);
function t() {
var o = e.call(this) || this;
o.logFunc = console.log;
o.logMsg = null;
o.frameTimes = 0;
o.now = 0;
o.Frame = 20;
o.totalFrames = 0;
o.startTime = 0;
if (window.addEventListener) for (var n = 0, i = t.LISTENNING_EVENTS; n < i.length; n++) {
var a = i[n], r = "trigger" + a.charAt(0).toLocaleUpperCase() + a.substring(1);
o[r] && "function" == typeof o[r] && window.addEventListener(a, o[r].bind(o));
}
return o;
}
t.prototype.dumpFrameInfo = function() {
var e = (Date.now() - this.startTime) / 1e3, t = e / this.totalFrames;
this.log(" total frames:", this.totalFrames, " ,total cost time:", e + "s", " , per frame cost time ave:" + t + "s");
};
t.prototype.log = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
this.addLog.apply(this, e);
this.sendLog();
};
t.prototype.initLog = function(e) {
var o = this;
cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function() {
o.frameTimes = 0;
o.now = Date.now();
o.startTime = Date.now();
}, this);
cc.director.on(cc.Director.EVENT_AFTER_DRAW, function() {
o.frameTimes++;
o.totalFrames++;
if (o.frameTimes >= o.Frame) {
o.frameTimes = 0;
o.now = Date.now();
}
}, this);
this.logFunc = e;
console.error = function() {
for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
t.inst.log("[ERROR]", e);
};
console.warn = function() {
for (var e, o = [], n = 0; n < arguments.length; n++) o[n] = arguments[n];
(e = t.inst).log.apply(e, [ "[WARN]" ].concat(o));
};
console.log = function() {
for (var e, o = [], n = 0; n < arguments.length; n++) o[n] = arguments[n];
(e = t.inst).log.apply(e, [ "[INFO]" ].concat(o));
};
};
t.prototype.formatLogArguments = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
for (var o = "", n = 0; n < arguments.length; n++) {
var i = typeof arguments[n];
"string" == i || "number" == i ? o += " " + arguments[n] : "object" == i ? o += " " + JSON.stringify(arguments[n]) : "boolean" == i && arguments[n].toString && (o += arguments[n].toString());
}
return o;
};
t.prototype.addLog = function() {
for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
null == this.logMsg && (this.logMsg = {});
var n = this.formatLogArguments.apply(this, e), i = this.getFullTime(new Date());
this.logMsg[i] = t.VERSION + n;
};
t.prototype.getFullTime = function(e) {
var t = "";
t += e.getFullYear();
var o = e.getMonth();
t += "-" + (o >= 10 ? o : "0" + o);
var n = e.getDate();
t += "-" + (n >= 10 ? n : "0" + n);
var i = e.getHours();
t += "  " + (i >= 10 ? i : "0" + i);
var a = e.getMinutes();
t += ":" + (a >= 10 ? a : "0" + a);
var r = e.getSeconds();
return t += ":" + (r >= 10 ? r : "0" + r);
};
t.prototype.sendLog = function() {
if (this.logFunc && null != this.logMsg) {
this.logFunc(JSON.stringify(this.logMsg));
this.logMsg = null;
}
};
t.prototype.triggerClose = function(e) {
this.addLog("triggerClose");
this.sendLog();
};
t.prototype.triggerLoad = function(e) {
this.addLog("triggerLoad");
this.sendLog();
};
t.prototype.triggerUnload = function(e) {
this.addLog("triggerUnload");
this.sendLog();
};
t.prototype.triggerOnunload = function(e) {
this.addLog("triggerUnload");
this.sendLog();
};
t.prototype.triggerError = function(e) {
this.addLog("triggerError");
this.addLog(e.message);
this.sendLog();
};
t.prototype.triggerFocus = function(e) {
this.addLog("triggerFocus");
this.sendLog();
};
t.prototype.triggerBlur = function(e) {
this.addLog("triggerBlur");
this.sendLog();
};
t.prototype.triggerAbort = function(e) {
this.addLog("triggerAbort");
this.sendLog();
};
t.prototype.triggerSuspend = function(e) {
this.addLog("triggerSuspend");
this.sendLog();
};
t.prototype.beforeunload = function(e) {
this.addLog("beforeunload");
this.sendLog();
};
t.VERSION = "Game template : ";
t.LISTENNING_EVENTS = [ "error" ];
return t;
}(e("./ToSingleton").SingleTon());
o.LogHandler = n;
cc._RF.pop();
}, {
"./ToSingleton": "ToSingleton"
} ],
Random: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "114f9Vox8JGQbohBr4HFlkf", "Random");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.seededRandom = function(e, t, o) {
return t + 1e6 * ((1711 * e + 88888) % 302654 / 302654 + (1722 * e + 55555) % 302665 / 302665 + (1755 * e + 23333) % 302766 / 302766) % 1e6 / 1e6 * (o - t);
};
e.getRandom = function(e, t) {
void 0 === e && (e = 0);
void 0 === t && (t = 1);
var o = this.randomSeed, n = this.seededRandom(o, e, t), i = Math.floor(this.seededRandom(o, 1, 302766));
this.randomSeed += i;
return n;
};
e.setRandomSeed = function(e) {
this.randomSeed = e;
this.sharedSeed = e;
};
e.randomRoundToInt = function(e, t) {
void 0 === e && (e = 0);
void 0 === t && (t = 1);
return Math.round(this.getRandom(e, t));
};
e.randomSeed = 0;
e.sharedSeed = 0;
return e;
}();
o.Random = n;
cc._RF.pop();
}, {} ],
Signal: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5e03fyVNOZPs7lLvT6ttunM", "Signal");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.listenerMap = [];
t.onceListenerMap = [];
return t;
}
t.prototype.doDispatch = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
this.excuteListener.apply(this, e);
this.excuteOnce.apply(this, e);
};
t.prototype.excuteListener = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
if (this.listenerMap && this.listenerMap.length > 0) for (var o = 0, n = this.listenerMap; o < n.length; o++) {
var i = n[o];
i.callback.apply(i.target, e);
}
};
t.prototype.excuteOnce = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
if (this.onceListenerMap && this.onceListenerMap.length > 0) {
for (var o = 0, n = this.onceListenerMap; o < n.length; o++) {
var i = n[o];
i.callback.apply(i.target, e);
}
this.onceListenerMap.length = 0;
}
};
t.prototype.listen = function(e, t) {
this.listenerMap.push({
callback: e,
target: t
});
};
t.prototype.listenOnce = function(e, t) {
this.onceListenerMap.push({
callback: e,
target: t
});
};
t.prototype.removeListener = function(e, t) {
if (this.listenerMap && this.listenerMap.length > 0) for (var o = 0; o < this.listenerMap.length; ++o) {
var n = this.listenerMap[o];
if (n.callback == e && n.target == t) {
this.listenerMap.splice(o, 1);
--o;
}
}
};
t.prototype.removeTarget = function(e) {
if (this.listenerMap && this.listenerMap.length > 0) for (var t = 0; t < this.listenerMap.length; ++t) {
if (this.listenerMap[t].target == e) {
this.listenerMap.splice(t, 1);
--t;
}
}
};
t.prototype.dispatch = function() {
this.doDispatch(null);
};
t.prototype.dispatchOne = function(e) {
this.doDispatch(e);
};
t.prototype.dispatchTwo = function(e, t) {
this.doDispatch(e, t);
};
t.prototype.dispatchThree = function(e, t, o) {
this.doDispatch(e, t, o);
};
t.prototype.dispatchFour = function(e, t, o, n) {
this.doDispatch(e, t, o, n);
};
t.prototype.dispatchFive = function(e, t, o, n, i) {
this.doDispatch(e, t, o, n, i);
};
t.prototype.addListener = function(e, t) {
this.listen(e, t);
};
t.prototype.addOnce = function(e, t) {
this.listenOnce(e, t);
};
t.prototype.addListenerOne = function(e, t) {
this.listen(e, t);
};
t.prototype.addListenerTwo = function(e, t) {
this.listen(e, t);
};
t.prototype.addListenerThree = function(e, t) {
this.listen(e, t);
};
t.prototype.addListenerFour = function(e, t) {
this.listen(e, t);
};
t.prototype.addListenerFive = function(e, t) {
this.listen(e, t);
};
t.prototype.addOnceOne = function(e, t) {
this.listenOnce(e, t);
};
t.prototype.addOnceTwo = function(e, t) {
this.listenOnce(e, t);
};
t.prototype.addOnceThree = function(e, t) {
this.listenOnce(e, t);
};
t.prototype.addOnceFour = function(e, t) {
this.listenOnce(e, t);
};
t.prototype.addOnceFive = function(e, t) {
this.listenOnce(e, t);
};
return t;
}(e("./ToSingleton").SingleTon());
o.BaseSignal = n;
cc._RF.pop();
}, {
"./ToSingleton": "ToSingleton"
} ],
StartGameCommond: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1db594KvoJIVbc+cwfogrGn", "StartGameCommond");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.execute = function(e) {
console.log("--------- excute StartGameCommond ---------");
};
return t;
}(puremvc.SimpleCommand);
o.StartGameCommond = n;
cc._RF.pop();
}, {} ],
StartUpSignal: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "bee7cVgpK5NVqEf3r3y6HBN", "StartUpSignal");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
return t;
}(e("../../Utils/Signal").BaseSignal);
o.StartUpSignal = n;
cc._RF.pop();
}, {
"../../Utils/Signal": "Signal"
} ],
StepManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "83709TvPtJOVayPDGaPh6Ov", "StepManager");
(function() {
function e() {
this.totalStep = [];
this.curStep = [];
}
e.prototype.register = function(e, t) {
this.completeCallback = e;
this.totalStep = t;
};
e.prototype.nextStep = function(e) {
if (this.totalStep.indexOf(e) < 0) console.error(" 没有这一步：", e); else if (this.curStep.indexOf(e) >= 0) console.warn(" 步骤已完成：", e); else {
this.curStep.push(e);
this.curStep.sort(function(e, t) {
return e > t ? -1 : 1;
});
this.totalStep.sort(function(e, t) {
return e > t ? -1 : 1;
});
console.log(" cur step:", this.curStep.join(","));
console.log(" total step:", this.totalStep.join(","));
if (this.curStep.join(",") == this.totalStep.join(",")) {
console.log(" step done");
this.totalStep.length = 0;
this.completeCallback();
this.completeCallback = null;
}
}
};
})();
cc._RF.pop();
}, {} ],
Time: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "87a24xcV95AoII6L5W1ABoI", "Time");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.timeFormat = function(e) {
var t = Math.floor(e / 60), o = Math.floor(e % 60), n = "00";
o < 10 && (n = "0" + o);
return t + "/" + n;
};
return e;
}();
o.Time = n;
cc._RF.pop();
}, {} ],
ToSingleton: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b07299nlSpOIIxOkIMBhUY9", "ToSingleton");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.SingleTon = function() {
return function() {
function e() {}
Object.defineProperty(e, "inst", {
get: function() {
return this.ins ? this.ins : this.ins = new this();
},
enumerable: !0,
configurable: !0
});
return e;
}();
};
cc._RF.pop();
}, {} ],
UpdateController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c0a4d36k/VOErgQUUlyZ9eP", "UpdateController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Utils/ToSingleton"), i = cc._decorator, a = i.ccclass, r = (i.property, 
function(e) {
__extends(t, e);
function t() {
var t = e.call(this) || this;
t.assetsManager = null;
t.STORAGE_PATH = (window.jsb && jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "arcade-remote-asset";
t.MANIFEST_PAth = "";
t.isUpdating = !1;
t.manifest = null;
t.completeCallback = [];
t.startCallback = [];
t.errorCallback = [];
t.progressCallback = [];
t.init();
return t;
}
t.prototype.init = function() {
if (window.jsb) {
this.assetsManager = new jsb.AssetsManager(this.MANIFEST_PAth, this.STORAGE_PATH, this.versionCompareHandle);
this.assetsManager.setVerifyCallback(this.verifyCallback.bind(this));
cc.sys.os === cc.sys.OS_ANDROID && this.assetsManager.setMaxConcurrentTask(2);
}
};
t.prototype.setManifest = function(e) {
this.manifest = e;
};
t.prototype.addCompleteCallback = function(e, t) {
this.completeCallback.push({
target: t,
callback: e
});
};
t.prototype.addErrorCallback = function(e, t) {
this.errorCallback.push({
target: e,
callback: t
});
};
t.prototype.addStartCallback = function(e, t) {
this.startCallback.push({
target: e,
callback: t
});
};
t.prototype.addProgressCallback = function(e, t) {
this.progressCallback.push({
target: e,
callback: t
});
};
t.prototype.onError = function(e, t) {
void 0 === t && (t = !1);
console.log(" this.errorCallback:", this.errorCallback.length, "error:", e);
for (var o = 0, n = this.errorCallback; o < n.length; o++) {
var i = n[o];
i.callback.apply(i.target, [ e, t ]);
}
};
t.prototype.onComplete = function(e, t) {
void 0 === t && (t = !1);
console.log(" this.completeCallback:", this.completeCallback.length);
for (var o = 0, n = this.completeCallback; o < n.length; o++) {
var i = n[o];
i.callback.apply(i.target, [ e, t ]);
}
};
t.prototype.onStart = function(e) {
console.log(" this.startCallback:", this.startCallback.length);
for (var t = 0, o = this.startCallback; t < o.length; t++) {
var n = o[t];
n.callback.apply(n.target, [ e ]);
}
};
t.prototype.onProgress = function(e, t) {
for (var o = 0, n = this.progressCallback; o < n.length; o++) {
var i = n[o];
i.callback.apply(i.target, [ e, t ]);
}
};
t.prototype.loadCustomManifest = function(e) {
if (null != this.assetsManager && this.assetsManager.getState() == jsb.AssetsManager.State.UNINITED) {
var t = new jsb.Manifest(e, this.STORAGE_PATH);
this.assetsManager.loadLocalManifest(t, this.STORAGE_PATH);
}
};
t.prototype.checkForUpdate = function() {
if (null != this.assetsManager) {
if (this.isUpdating) return "Version update is on process...";
console.log(" start check for update ...");
if (this.assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
var e = this.manifest.nativeUrl;
console.log(" native url:", e);
cc.loader.md5Pipe && (e = cc.loader.md5Pipe.transformURL(e));
this.assetsManager.loadLocalManifest(e);
}
if (!this.assetsManager.getLocalManifest() || !this.assetsManager.getLocalManifest().isLoaded()) {
this.onError("Failed to load local manifest ...");
return "Failed to load local manifest ...";
}
this.assetsManager.setEventCallback(this.checkUpdateCallback.bind(this));
this.assetsManager.checkUpdate();
this.isUpdating = !0;
} else this.onComplete("no need to update.");
};
t.prototype.checkUpdateCallback = function(e) {
cc.log("Code: " + e.getEventCode());
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.onError("No local manifest file found, hot update skipped.");
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.onError("Fail to download manifest file, hot update skipped.");
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.onComplete("Already up to date with the latest remote version.");
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
this.isUpdating = !1;
var t = this.assetsManager.getLocalManifest() ? this.assetsManager.getLocalManifest().getVersion() : " null", o = this.assetsManager.getRemoteManifest() ? this.assetsManager.getRemoteManifest().getVersion() : " null";
this.onStart("Old version " + t + " ,New version " + o + " found, please try to update. (" + this.assetsManager.getTotalBytes() + ")");
this.updateVersion();
break;

default:
return;
}
this.assetsManager.setEventCallback(null);
};
t.prototype.getUpdateDescription = function() {
return "";
};
t.prototype.updateVersion = function() {
if (null != this.assetsManager && !this.isUpdating) if ([ jsb.AssetsManager.State.UPDATING, jsb.AssetsManager.State.UNZIPPING, jsb.AssetsManager.State.UP_TO_DATE ].indexOf(this.assetsManager.getState())) this.onComplete("no need to update", !1); else {
if (this.assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
var e = this.manifest.nativeUrl;
cc.loader.md5Pipe && (e = cc.loader.md5Pipe.transformURL(e));
this.assetsManager.loadLocalManifest(e);
}
this.assetsManager.setEventCallback(this.updateCallback.bind(this));
console.log(" start update ...:", this.assetsManager.getState());
this.assetsManager.update();
this.isUpdating = !0;
}
};
t.prototype.updateCallback = function(e) {
var t = !1, o = !1;
console.log("update event code:", e.getEventCode());
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.onError("No local manifest file found, hot update skipped.");
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
this.onProgress(e.getMessage() ? "Updated file:" + e.getMessage() : "", e.getPercent());
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.onError("Fail to download manifest file, hot update skipped.");
o = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.onComplete("Already up to date with the latest remote version.");
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
this.onComplete("Update finished. " + e.getMessage(), !0);
t = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.onError("Update failed. " + e.getMessage(), !0);
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
this.onError("Asset update error: " + e.getAssetId() + ", " + e.getMessage());
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
this.onError(e.getMessage());
}
if (o) {
this.assetsManager.setEventCallback(null);
this.isUpdating = !1;
}
if (t) {
this.assetsManager.setEventCallback(null);
var n = jsb.fileUtils.getSearchPaths(), i = this.assetsManager.getLocalManifest().getSearchPaths();
console.log(JSON.stringify(i));
Array.prototype.unshift.apply(n, i);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(n));
jsb.fileUtils.setSearchPaths(n);
}
};
t.prototype.restart = function() {
cc.audioEngine.stopAll();
cc.game.restart();
};
t.prototype.retry = function() {
null != this.assetsManager && 0 == this.isUpdating && this.assetsManager.downloadFailedAssets();
};
t.prototype.versionCompareHandle = function(e, t) {
cc.log("JS Custom Version Compare: version A is " + e + ", version B is " + t);
for (var o = e.split("."), n = t.split("."), i = 0; i < o.length; ++i) {
var a = parseInt(o[i]), r = parseInt(n[i] || "0");
if (a !== r) return a - r;
}
return n.length > o.length ? -1 : 0;
};
t.prototype.verifyCallback = function(e, t) {
var o = t.compressed, n = t.md5, i = t.path;
t.size;
if (o) {
"Verification passed : " + i;
return !0;
}
"Verification passed : " + i + " (" + n + ")";
return !0;
};
t.prototype.destory = function() {
this.assetsManager && this.assetsManager.setEventCallback(null);
this.startCallback = [];
this.completeCallback = [];
this.errorCallback = [];
this.progressCallback = [];
};
return t = __decorate([ a ], t);
}(n.SingleTon()));
o.default = r;
cc._RF.pop();
}, {
"../Utils/ToSingleton": "ToSingleton"
} ],
UpdateViewMediator: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "39563Es+yBIdpAFlB9gDsh3", "UpdateViewMediator");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../View/BaseMediator"), i = cc._decorator, a = i.ccclass, r = (i.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onRegister = function() {};
return t = __decorate([ a ], t);
}(n.default));
o.default = r;
cc._RF.pop();
}, {
"../View/BaseMediator": "BaseMediator"
} ],
UpdateView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a7e01lnazFOtosvOohD8Qg9", "UpdateView");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../View/BaseView"), i = e("./UpdateController"), a = cc._decorator, r = a.ccclass, s = a.property, c = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.manifest = null;
return t;
}
Object.defineProperty(t.prototype, "Progress", {
get: function() {
return this.node.getChildByName("UpdateProgress").getComponent(cc.ProgressBar);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "RestartButton", {
get: function() {
return this.node.getChildByName("RestartButton");
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "ButtonTitle", {
get: function() {
return this.RestartButton.getChildByName("Title").getComponent(cc.Label);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Description", {
get: function() {
return this.node.getChildByName("Description").getComponent(cc.Label);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "ProgressMsg", {
get: function() {
return this.node.getChildByName("ProgressMsg").getComponent(cc.Label);
},
enumerable: !0,
configurable: !0
});
t.prototype.Hide = function() {
var e = this;
this.node.runAction(cc.sequence(cc.scaleTo(.1, 0), cc.callFunc(function() {
e.node.active = !1;
})));
};
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.manifest && i.default.inst.setManifest(this.manifest);
this.RestartButton.scale = 0;
i.default.inst.addCompleteCallback(this.onComplete, this);
i.default.inst.addErrorCallback(this, this.onError);
i.default.inst.addProgressCallback(this, this.onProgress);
i.default.inst.addStartCallback(this, this.onStart);
};
t.prototype.onComplete = function(e, t) {
console.log(" update complete:", e);
t ? this.showButton("Restart", i.default.inst.restart) : this.Hide();
};
t.prototype.showButton = function(e, t) {
var o = this;
this.ButtonTitle.string = e;
this.RestartButton.stopAllActions();
this.RestartButton.runAction(cc.sequence(cc.scaleTo(.1, 1), cc.callFunc(function() {
o.RestartButton.on(cc.Node.EventType.TOUCH_END, function() {
t();
o.RestartButton.targetOff(o);
o.RestartButton.runAction(cc.scaleTo(.1, 0));
}, o);
})));
};
t.prototype.onError = function(e, t) {
console.log("update error:", e);
t ? this.showButton("Retry", i.default.inst.retry) : this.Hide();
};
t.prototype.onProgress = function(e, t) {
this.Progress.progress = t;
this.ProgressMsg.string = e;
};
t.prototype.setDesprition = function() {
this.Description.string = i.default.inst.getUpdateDescription();
};
t.prototype.onStart = function(e) {
console.log(" startUpdate:", e);
this.Show();
this.setDesprition();
};
__decorate([ s({
type: cc.Asset
}) ], t.prototype, "manifest", void 0);
return t = __decorate([ r ], t);
}(n.default);
o.default = c;
cc._RF.pop();
}, {
"../View/BaseView": "BaseView",
"./UpdateController": "UpdateController"
} ]
}, {}, [ "App", "GameFactory", "LoadGameSignal", "StartUpSignal", "GameListMediator", "GameListView", "GamePageMediator", "GamePageView", "FacadeGlobal", "GameConfig", "InititalCommond", "LoadAudioCommond", "LoadConfigCommond", "LoadPrefabCommond", "StartGameCommond", "InitialFacade", "LoadingMediator", "LoadingView", "AudioManager", "StepManager", "CustomManifest", "UpdateController", "UpdateView", "UpdateViewMediator", "CelerSDK", "HashMap", "LogHandler", "Random", "Signal", "Time", "ToSingleton", "BaseMediator", "BaseView" ]);