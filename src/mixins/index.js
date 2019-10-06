/**
 * Contains constructors for mixins that are used as properties for various game objects and your own custom game objects.
 * 
 * When creating custom objects they must have an instance property called `mixins` that contains an array of mixin constructors. Then in your object constructor function you simply need to call `Mixin.apply(this);` to merge the given mixins into your object.
 * 
 * You can also create your own mixins using the base `Mixin` class that all other classes must inherit from. A custom mixin needs to `extend` `Mixin` and have a static property `_namespace` that represents the property name on the object that it will be attached to.
 * 
 * @namespace mixins
 * @memberof Whirl
 */
module.exports = {
	Mixin: require("./Mixin.js"),
	Event: require("./EventMixin/"),
	Child: require("./ChildMixin/"),
};
