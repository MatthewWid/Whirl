/**
 * Contains constructors for mixins that are used as properties for various game objects and your own custom game objects.
 * 
 * When creating custom objects they must have an instance property called `mixins` that contains an array of mixin constructors. Then in your object constructor function you simply need to call `Mixin.apply(this);` to merge the given mixins into your object.
 * 
 * You can also create your own mixins using the base `Mixin` class that all other classes must inherit from. A custom mixin needs to `extend` `Mixin` and have a static property `_namespace` that represents the property name on the object that it will be attached to.
 * 
 * @namespace mixins
 * @memberof Whirl
 * 
 * @example
 * const {mixins: {Mixin, Event}} = Whirl;
 * 
 * // Add the `Event` mixin to `MyObject`
 * class MyObject {
 * 	mixins = [Event];
 * 
 * 	constructor() {
 * 		Mixin.apply(this);
 * 	}
 * }
 * 
 * @example
 * const {mixins: {Mixin}} = Whirl;
 * 
 * // Create a custom mixin `LogMixin`
 * class LogMixin extends Mixin {
 * 	static _namespace = "log"; // Attach under the `log` property
 * 
 * 	sayHi() {
 * 		console.log("Hello world!");
 * 	}
 * }
 * 
 * // Create class `MyObject` and give it our `LogMixin`
 * class MyObject {
 * 	mixins = [LogMixin];
 * 
 * 	constructor() {
 * 		Mixin.apply(this);
 * 	}
 * }
 * 
 * // Instantiate our `MyObject` class
 * const obj = new MyObject();
 * 
 * // Call our `sayHi` method under our defined `log` namespace
 * obj.log.sayHi(); // Output "Hello world" to console
 */
module.exports = {
	Mixin: require("./Mixin.js"),
	Event: require("./EventMixin/"),
	Child: require("./ChildMixin/"),
};
