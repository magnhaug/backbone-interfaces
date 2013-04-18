describe("Backbone interfaces", function() {

    function assertInterfaceImplemententationSuccess(Class){
        // Will throw if it fails
        new Class();
    }

    function assertInterfaceImplementationFailed(Class){
        try{
            new Class();
        } catch (e){
            // Expected exception
            if (e instanceof Backbone.Interface.InterfaceNotImplementedException){
                return true;
            }
        }
        this.fail();
    }

    it("should expose `.implements()` function on all Backbone class types", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});

        Backbone.View.extend({}).implements(MyInterface);
        Backbone.Model.extend({}).implements(MyInterface);
        Backbone.Router.extend({}).implements(MyInterface);
        Backbone.Collection.extend({}).implements(MyInterface);
    });

    it("should fail to instantiate class if interface is not implemented", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var Class           = Backbone.Model.extend({});

        Class.implements(MyInterface);
        assertInterfaceImplementationFailed(Class);
    });

    it("should succeed if interface is implemented correctly with `Backbone.Interface.extend({})`", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var Class           = Backbone.Model.extend({f: function(){}});

        Class.implements(MyInterface);
        assertInterfaceImplemententationSuccess(Class);
    });

    it("should succeed if interface is implemented correctly with `new Backbone.Interface({})`", function() {
        var MyInterface     = new Backbone.Interface({f: function(){}});
        var Class           = Backbone.Model.extend({f: function(){}});

        Class.implements(MyInterface);
        assertInterfaceImplemententationSuccess(Class);
    });

    it("should succeed if interface is implemented correctly in superclass", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var SuperClass      = Backbone.Model.extend({f: function(){}});
        var SubClass        = SuperClass.extend({});

        SuperClass.implements(MyInterface);
        assertInterfaceImplemententationSuccess(SuperClass);
    });

    it("should succeed if interface is implemented correctly in subclass", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var SuperClass      = Backbone.Model.extend({});
        var SubClass = SuperClass.extend({f: function(){}});

        SuperClass.implements(MyInterface);
        assertInterfaceImplemententationSuccess(SubClass);
    });

    it("should fail to instantiate superclass if interface is only implemented in subclass", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var SuperClass      = Backbone.Model.extend({});
        var SubClass        = SuperClass.extend({f: function(){}});

        SuperClass.implements(MyInterface);
        assertInterfaceImplementationFailed(SuperClass)
    });

    it("should succeed if implementing several interfaces correctly", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var MyInterface2    = Backbone.Interface.extend({g: function(){}});
        var Class           = Backbone.Model.extend({f: function () { }, g: function(){}});

        Class.implements(MyInterface, MyInterface2);
        assertInterfaceImplemententationSuccess(Class);
    });

    it("should fail to instantiate class if not implementing one of several interfaces correctly", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var MyInterface2    = Backbone.Interface.extend({g: function(){}});
        var Class           = Backbone.Model.extend({g: function(){}});

        Class.implements(MyInterface, MyInterface2);
        assertInterfaceImplementationFailed(Class);
    });

    it("should not poison the base Interface prototype", function() {
        var MyInterface     = Backbone.Interface.extend({f: function(){}});
        var MyInterface2    = Backbone.Interface.extend({g: function(){}});
        var Class           = Backbone.Model.extend({g: function(){}});

        Class.implements(MyInterface2);
        assertInterfaceImplemententationSuccess(Class);
    });

    it("should handle composite interfaces", function() {
        var MyInterface             = Backbone.Interface.extend({f: function(){}});
        var MyInterface2            = Backbone.Interface.extend({g: function(){}});
        var MyCompositeInterface    = Backbone.Interface.extend(MyInterface, MyInterface2);
        var Class                   = Backbone.Model.extend({g: function(){}});

        Class.implements(MyCompositeInterface);
        assertInterfaceImplementationFailed(Class);
    });

    it("should handle runtime verifications successfully", function() {
        var MyInterface             = Backbone.Interface.extend({f: function(){}});
        var Class                   = Backbone.Model.extend({f: function(){}});
        var Instance                = new Class();

        Backbone.Interface.verify(MyInterface, Instance);
    });

    it("should handle runtime verifications that fails", function() {
        var MyInterface             = Backbone.Interface.extend({f: function(){}});
        var Class                   = Backbone.Model.extend({});
        var Instance                = new Class();

        try{
            Backbone.Interface.verify(Instance, MyInterface);
        } catch (e){
            if (e instanceof Backbone.Interface.InterfaceNotImplementedException){
                return;
            }
        }
        this.fail();
    });
});