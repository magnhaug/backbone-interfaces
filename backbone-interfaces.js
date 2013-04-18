(function(Backbone) {

    // Support `new Backbone.Interface({foo: function(){}})`.
    Backbone.Interface = function(){
        _.extend.apply(this.__proto__, arguments);
    };

    // Support `Backbone.Interface.extend({foo: function(){}})`, support extending interfaces.
    Backbone.Interface.extend = function(){
        return _.extend.apply(this.__proto__, arguments);
    };

    Backbone.Interface.verify = function(interface, clazz){
        _.each(_.functions(interface), function(fname){
            if ( ! _.isFunction(clazz[fname])){
                throw new Backbone.Interface.InterfaceNotImplementedException(fname);
            }
        });
    };

    // Custom exception for better exception handling
    Backbone.Interface.InterfaceNotImplementedException = function(fname){
        this.missingFunction = fname;
    };

    // When calling .implements() add the interfaces to a list of initialize-time checks to be done.
    Backbone.Model.implements = Backbone.Collection.implements = Backbone.Router.implements = Backbone.View.implements = function() {
        Array.prototype.push.apply(this._interfaces = this._interfaces || [], arguments);
        return this;
    };

    // Check for implementations of all functions in all implemented interfaces.
    function verify(){
        var clazz = this,
            interfaces = clazz.__proto__.constructor._interfaces;
        _.each(interfaces, function(interface){
            Backbone.Interface.verify(interface, clazz);
        });
    }

    // When instantiating an object, perform implementation checks.
    Backbone.Model      = Backbone.Model.extend({ initialize: verify });
    Backbone.Collection = Backbone.Collection.extend({ initialize: verify });
    Backbone.Router     = Backbone.Router.extend({ initialize: verify });
    Backbone.View       = Backbone.View.extend({ initialize: verify });
})(Backbone);
