Backbone-interfaces
===================

An extension to Backbone making it possible to program with Java-like runtime-enforced interfaces

Example usage
---

Automatic initialization-time interface implementation verification:
```javascript
var MyInterface     = Backbone.Interface.extend({foo: function(){}});
var GoodClass       = Backbone.Model.extend({foo: function(){console.log("foo");} });
var BadClass        = Backbone.Model.extend({});

GoodClass.implements(MyInterface);
BadClass.implements(MyInterface);

new GoodClass(); // Ok
new BadClass();  // Throws InterfaceNotImplementedException
```

Runtime manual interface implementation verification:
```javascript
var MyInterface     = Backbone.Interface.extend({f: function(){}});
var GoodClass       = Backbone.Model.extend({f: function(){console.log("foo");} });
var GoodInstance    = new GoodClass();
var BadClass        = Backbone.Model.extend({});
var BadInstance     = new BadClass();

Backbone.Interface.verify(MyInterface, GoodInstance); // Ok
Backbone.Interface.verify(MyInterface, BadInstance);  // Throws InterfaceNotImplementedException
```
