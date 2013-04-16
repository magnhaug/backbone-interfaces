Backbone-interfaces
===================

An extension to Backbone making it possible to program with Java-like runtime-enforced interfaces

Example usage
---

```javascript
var MyInterface     = Backbone.Interface.extend({foo: function(){}});
var GoodClass       = Backbone.Model.extend({foo: function(){console.log("foo");} });
var BadClass        = Backbone.Model.extend({});

GoodClass.implements(MyInterface);
BadClass.implements(MyInterface);

new GoodClass(); // Ok
new BadClass();  // Throws InterfaceNotImplementedException
```
