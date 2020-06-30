window.puremvc = function() {
var t, e = this && this.__extends || function() {
var t = function(e, i) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
})(e, i);
};
return function(e, i) {
t(e, i);
function o() {
this.constructor = e;
}
e.prototype = null === i ? Object.create(i) : (o.prototype = i.prototype, new o());
};
}();
(function(t) {
"use strict";
var e = function() {
function t(t, e) {
this.notify = null;
this.context = null;
this.setNotifyMethod(t);
this.setNotifyContext(e);
}
t.prototype.getNotifyMethod = function() {
return this.notify;
};
t.prototype.setNotifyMethod = function(t) {
this.notify = t;
};
t.prototype.getNotifyContext = function() {
return this.context;
};
t.prototype.setNotifyContext = function(t) {
this.context = t;
};
t.prototype.notifyObserver = function(t) {
this.getNotifyMethod().call(this.getNotifyContext(), t);
};
t.prototype.compareNotifyContext = function(t) {
return t === this.context;
};
return t;
}();
t.Observer = e;
})(t || (t = {}));
(function(t) {
"use strict";
var e = function() {
function e(t) {
this.mediatorMap = null;
this.observerMap = null;
this.multitonKey = null;
if (e.instanceMap[t]) throw Error(e.MULTITON_MSG);
e.instanceMap[t] = this;
this.multitonKey = t;
this.mediatorMap = {};
this.observerMap = {};
this.initializeView();
}
e.prototype.initializeView = function() {};
e.prototype.registerObserver = function(t, e) {
var i = this.observerMap[t];
i ? i.push(e) : this.observerMap[t] = [ e ];
};
e.prototype.removeObserver = function(t, e) {
for (var i = this.observerMap[t], o = i.length; o--; ) {
if (i[o].compareNotifyContext(e)) {
i.splice(o, 1);
break;
}
}
0 == i.length && delete this.observerMap[t];
};
e.prototype.notifyObservers = function(t) {
var e = t.getName(), i = this.observerMap[e];
if (i) for (var o = i.slice(0), n = o.length, r = 0; r < n; r++) {
o[r].notifyObserver(t);
}
};
e.prototype.registerMediator = function(e) {
var i = e.getMediatorName();
if (!this.mediatorMap[i]) {
e.initializeNotifier(this.multitonKey);
this.mediatorMap[i] = e;
var o = e.listNotificationInterests(), n = o.length;
if (n > 0) for (var r = new t.Observer(e.handleNotification, e), s = 0; s < n; s++) this.registerObserver(o[s], r);
e.onRegister();
}
};
e.prototype.retrieveMediator = function(t) {
return this.mediatorMap[t] || null;
};
e.prototype.removeMediator = function(t) {
var e = this.mediatorMap[t];
if (!e) return null;
for (var i = e.listNotificationInterests(), o = i.length; o--; ) this.removeObserver(i[o], e);
delete this.mediatorMap[t];
e.onRemove();
return e;
};
e.prototype.hasMediator = function(t) {
return null != this.mediatorMap[t];
};
e.getInstance = function(t) {
e.instanceMap[t] || (e.instanceMap[t] = new e(t));
return e.instanceMap[t];
};
e.removeView = function(t) {
delete e.instanceMap[t];
};
e.MULTITON_MSG = "View instance for this multiton key already constructed!";
e.instanceMap = {};
return e;
}();
t.View = e;
})(t || (t = {}));
(function(t) {
"use strict";
var e = function() {
function e(t) {
this.view = null;
this.commandMap = null;
this.multitonKey = null;
if (e.instanceMap[t]) throw Error(e.MULTITON_MSG);
e.instanceMap[t] = this;
this.multitonKey = t;
this.commandMap = {};
this.initializeController();
}
e.prototype.initializeController = function() {
this.view = t.View.getInstance(this.multitonKey);
};
e.prototype.executeCommand = function(t) {
var e = this.commandMap[t.getName()];
if (e) {
var i = new e();
i.initializeNotifier(this.multitonKey);
i.execute(t);
}
};
e.prototype.registerCommand = function(e, i) {
this.commandMap[e] || this.view.registerObserver(e, new t.Observer(this.executeCommand, this));
this.commandMap[e] = i;
};
e.prototype.hasCommand = function(t) {
return null != this.commandMap[t];
};
e.prototype.removeCommand = function(t) {
if (this.hasCommand(t)) {
this.view.removeObserver(t, this);
delete this.commandMap[t];
}
};
e.getInstance = function(t) {
e.instanceMap[t] || (e.instanceMap[t] = new e(t));
return e.instanceMap[t];
};
e.removeController = function(t) {
delete e.instanceMap[t];
};
e.MULTITON_MSG = "Controller instance for this multiton key already constructed!";
e.instanceMap = {};
return e;
}();
t.Controller = e;
})(t || (t = {}));
(function(t) {
"use strict";
var e = function() {
function t(e) {
this.proxyMap = null;
this.multitonKey = null;
if (t.instanceMap[e]) throw Error(t.MULTITON_MSG);
t.instanceMap[e] = this;
this.multitonKey = e;
this.proxyMap = {};
this.initializeModel();
}
t.prototype.initializeModel = function() {};
t.prototype.registerProxy = function(t) {
t.initializeNotifier(this.multitonKey);
this.proxyMap[t.getProxyName()] = t;
t.onRegister();
};
t.prototype.removeProxy = function(t) {
var e = this.proxyMap[t];
if (e) {
delete this.proxyMap[t];
e.onRemove();
}
return e;
};
t.prototype.retrieveProxy = function(t) {
return this.proxyMap[t] || null;
};
t.prototype.hasProxy = function(t) {
return null != this.proxyMap[t];
};
t.getInstance = function(e) {
t.instanceMap[e] || (t.instanceMap[e] = new t(e));
return t.instanceMap[e];
};
t.removeModel = function(e) {
delete t.instanceMap[e];
};
t.MULTITON_MSG = "Model instance for this multiton key already constructed!";
t.instanceMap = {};
return t;
}();
t.Model = e;
})(t || (t = {}));
(function(t) {
"use strict";
var e = function() {
function t(t, e, i) {
void 0 === e && (e = null);
void 0 === i && (i = null);
this.name = null;
this.body = null;
this.type = null;
this.name = t;
this.body = e;
this.type = i;
}
t.prototype.getName = function() {
return this.name;
};
t.prototype.setBody = function(t) {
this.body = t;
};
t.prototype.getBody = function() {
return this.body;
};
t.prototype.setType = function(t) {
this.type = t;
};
t.prototype.getType = function() {
return this.type;
};
t.prototype.toString = function() {
var t = "Notification Name: " + this.getName();
t += "\nBody:" + (null == this.getBody() ? "null" : this.getBody().toString());
return t += "\nType:" + (null == this.getType() ? "null" : this.getType());
};
return t;
}();
t.Notification = e;
})(t || (t = {}));
(function(t) {
"use strict";
var e = function() {
function e(t) {
this.model = null;
this.view = null;
this.controller = null;
this.multitonKey = null;
if (e.instanceMap[t]) throw Error(e.MULTITON_MSG);
this.initializeNotifier(t);
e.instanceMap[t] = this;
this.initializeFacade();
}
e.prototype.initializeFacade = function() {
this.initializeModel();
this.initializeController();
this.initializeView();
};
e.prototype.initializeModel = function() {
this.model || (this.model = t.Model.getInstance(this.multitonKey));
};
e.prototype.initializeController = function() {
this.controller || (this.controller = t.Controller.getInstance(this.multitonKey));
};
e.prototype.initializeView = function() {
this.view || (this.view = t.View.getInstance(this.multitonKey));
};
e.prototype.registerCommand = function(t, e) {
this.controller.registerCommand(t, e);
};
e.prototype.removeCommand = function(t) {
this.controller.removeCommand(t);
};
e.prototype.hasCommand = function(t) {
return this.controller.hasCommand(t);
};
e.prototype.registerProxy = function(t) {
this.model.registerProxy(t);
};
e.prototype.retrieveProxy = function(t) {
return this.model.retrieveProxy(t);
};
e.prototype.removeProxy = function(t) {
var e;
this.model && (e = this.model.removeProxy(t));
return e;
};
e.prototype.hasProxy = function(t) {
return this.model.hasProxy(t);
};
e.prototype.registerMediator = function(t) {
this.view && this.view.registerMediator(t);
};
e.prototype.retrieveMediator = function(t) {
return this.view.retrieveMediator(t);
};
e.prototype.removeMediator = function(t) {
var e;
this.view && (e = this.view.removeMediator(t));
return e;
};
e.prototype.hasMediator = function(t) {
return this.view.hasMediator(t);
};
e.prototype.notifyObservers = function(t) {
this.view && this.view.notifyObservers(t);
};
e.prototype.sendNotification = function(e, i, o) {
void 0 === i && (i = null);
void 0 === o && (o = null);
this.notifyObservers(new t.Notification(e, i, o));
};
e.prototype.initializeNotifier = function(t) {
this.multitonKey = t;
};
e.getInstance = function(t) {
e.instanceMap[t] || (e.instanceMap[t] = new e(t));
return e.instanceMap[t];
};
e.hasCore = function(t) {
return !!e.instanceMap[t];
};
e.removeCore = function(i) {
if (e.instanceMap[i]) {
t.Model.removeModel(i);
t.View.removeView(i);
t.Controller.removeController(i);
delete e.instanceMap[i];
}
};
e.MULTITON_MSG = "Facade instance for this multiton key already constructed!";
e.instanceMap = {};
return e;
}();
t.Facade = e;
})(t || (t = {}));
(function(t) {
"use strict";
var e = function() {
function e() {
this.multitonKey = null;
}
e.prototype.initializeNotifier = function(t) {
this.multitonKey = t;
};
e.prototype.sendNotification = function(t, e, i) {
void 0 === e && (e = null);
void 0 === i && (i = null);
this.facade() && this.facade().sendNotification(t, e, i);
};
e.prototype.facade = function() {
if (null === this.multitonKey) throw Error(e.MULTITON_MSG);
return t.Facade.getInstance(this.multitonKey);
};
e.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
return e;
}();
t.Notifier = e;
})(t || (t = {}));
(function(t) {
"use strict";
var i = function(t) {
e(i, t);
function i() {
var e = t.call(this) || this;
e.subCommands = null;
e.subCommands = new Array();
e.initializeMacroCommand();
return e;
}
i.prototype.initializeMacroCommand = function() {
throw new Error(" you should override initializeMacroCommand");
};
i.prototype.addSubCommand = function(t) {
this.subCommands.push(t);
};
i.prototype.execute = function(t) {
for (var e = this.subCommands.slice(0), i = this.subCommands.length, o = 0; o < i; o++) {
var n = new (0, e[o])();
n.initializeNotifier(this.multitonKey);
n.execute(t);
}
this.subCommands.splice(0);
};
return i;
}(t.Notifier);
t.MacroCommand = i;
})(t || (t = {}));
(function(t) {
"use strict";
var i = function(t) {
e(i, t);
function i() {
return null !== t && t.apply(this, arguments) || this;
}
i.prototype.execute = function(t) {
throw new Error(" you should override execute");
};
return i;
}(t.Notifier);
t.SimpleCommand = i;
})(t || (t = {}));
(function(t) {
"use strict";
var i = function(t) {
e(i, t);
function i(e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
var n = t.call(this) || this;
n.mediatorName = null;
n.viewComponent = null;
n.mediatorName = null != e ? e : i.NAME;
n.viewComponent = o;
return n;
}
i.prototype.getMediatorName = function() {
return this.mediatorName;
};
i.prototype.getViewComponent = function() {
return this.viewComponent;
};
i.prototype.setViewComponent = function(t) {
this.viewComponent = t;
};
i.prototype.listNotificationInterests = function() {
throw new Error("you should override listNotificationInterests");
};
i.prototype.handleNotification = function(t) {
throw new Error("you should override handleNotification");
};
i.prototype.onRegister = function() {
throw new Error("you should override onRegister");
};
i.prototype.onRemove = function() {
throw new Error("you should override onRemove");
};
i.NAME = "Mediator";
return i;
}(t.Notifier);
t.Mediator = i;
})(t || (t = {}));
(function(t) {
"use strict";
var i = function(t) {
e(i, t);
function i(e, o) {
void 0 === e && (e = null);
void 0 === o && (o = null);
var n = t.call(this) || this;
n.proxyName = null;
n.data = null;
n.proxyName = null != e ? e : i.NAME;
null != o && n.setData(o);
return n;
}
i.prototype.getProxyName = function() {
return this.proxyName;
};
i.prototype.setData = function(t) {
this.data = t;
};
i.prototype.getData = function() {
return this.data;
};
i.prototype.onRegister = function() {
throw new Error(" you should override onRegister");
};
i.prototype.onRemove = function() {
throw new Error(" you should override onRemove");
};
i.NAME = "Proxy";
return i;
}(t.Notifier);
t.Proxy = i;
})(t || (t = {}));
return t;
}();