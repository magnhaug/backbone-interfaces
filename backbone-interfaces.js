(function(Backbone) {

	Backbone.Model.implements = Backbone.Collection.implements = Backbone.Router.implements = Backbone.View.implements = function(interface) {
		var interfaces = this._interfaces || [];
		interfaces.push(interface);

		this._interfaces = interfaces;
		return this;
	};

	Backbone.Model = Backbone.Model.extend({
		initialize: function(){
			var interfaces = this.__proto__.constructor._interfaces; // TODO get from all interfaces;

			var base = this;
			_.each(interfaces, 		function(interface){
				_.each(_.functions(interface), 	function(fname){
					if ( ! _.isFunction(base[fname])){
						throw "Did not correctly implement '" + fname + "()' from an implemented interface!";
					}
				});
			});
		}
	});

	Backbone.Interface = function(attrs){
		_.extend(this.__proto__, attrs);
		return this;
	};
})(Backbone);
