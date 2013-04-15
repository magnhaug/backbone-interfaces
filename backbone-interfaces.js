(function(Backbone) {

    // When calling .implements() add the interfaces to a list of initialize-time checks to be done.
	Backbone.Model.implements = Backbone.Collection.implements = Backbone.Router.implements = Backbone.View.implements = function() {
        Array.prototype.push.apply(this._interfaces = this._interfaces || [], arguments);
        return this;
	};

    // When instantiating an object, perform implementation checks.
	Backbone.Model = Backbone.Model.extend({
		initialize: function(){
			var clazz = this,
                interfaces = clazz.__proto__.constructor._interfaces;
			_.each(interfaces, function(interface){
				_.each(_.functions(interface), function(fname){
					if ( ! _.isFunction(clazz[fname])){
						throw "Did not correctly implement '" + fname + "()' from an implemented interface!";
					}
				});
			});
		}
	});

    // Support `new Backbone.Interface({foo: function(){}})`
    Backbone.Interface = function(attrs){
        _.extend(this.__proto__, attrs);
        return this;
    };

    // Support `Backbone.Interface.extend({foo: function(){}})`
    Backbone.Interface.extend = function(){
        return _.extend.apply(this.__proto__, arguments);
    };
})(Backbone);
