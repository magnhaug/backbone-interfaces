(function(Backbone) {

    // Support `new Backbone.Interface({foo: function(){}})`.
    Backbone.Interface = function(){
        _.extend.apply(this.__proto__, arguments);
    };

    // Support `Backbone.Interface.extend({foo: function(){}})`, support extending interfaces.
    Backbone.Interface.extend = function(){
        return _.extend.apply(this.__proto__, arguments);
    };

    // When calling .implements() add the interfaces to a list of initialize-time checks to be done.
    Backbone.Model.implements = Backbone.Collection.implements = Backbone.Router.implements = Backbone.View.implements = function() {
        Array.prototype.push.apply(this._interfaces = this._interfaces || [], arguments);
        return this;
    };

    // Check for implementations of all functions in all implemented interfaces.
    var verify = function(){
        var clazz = this,
            interfaces = clazz.__proto__.constructor._interfaces;
        _.each(interfaces, function(interface){
            _.each(_.functions(interface), function(fname){
                if ( ! _.isFunction(clazz[fname])){
                    throw "Did not correctly implement '" + fname + "()' from an implemented interface!";
                }
            });
        });
    };

    // When instantiating an object, perform implementation checks.
    var initialize = function(){
        verify.apply(this, arguments);
    };
    Backbone.Model      = Backbone.Model.extend({ initialize: initialize });
    Backbone.Collection = Backbone.Collection.extend({ initialize: initialize });
    Backbone.Router     = Backbone.Router.extend({ initialize: initialize });
    Backbone.View       = Backbone.View.extend({ initialize: initialize });
})(Backbone);
