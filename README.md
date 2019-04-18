<p align="center"><img src="./doc/logo/logo_text.png" alt="drawing" width="50%" /></p>

<p align="center"><b>Whirl is a powerful, lightweight and extensible 2D game engine written in Javascript.</b></p>

<p align="center"><sup><i>This project is still a work in progress and has not yet reached completion.<br>Everything is subject to change.</i></sup></p>

# Features

**Whirl**'s aim is to allow you to to quickly and easily create games in the browser; allowing you to create, extend and import game objects and plugins, making its functionality highly extendable outside of its many already included core features.

Some features offered by the **Whirl** game engine are:

* A **dynamic custom events system** that allows for the creation and broadcasting of events across game objects.
* A **child-parent tree architecture** of game objects that allows you to easily organise your game world into a simple hierarchy.
* A **state-like world system** that makes it easy to load, unload and switch your scene or level instantly.
* A **modularised viewport manager** that enables you to create multiple game viewports and screens *without* the need for multiple canvasses and extra HTML elements.
* **Standardised object importation methods** that make it easy to create your own custom plugins and special game objects that can be imported and used in your games.

# Examples

Example usage of the various features of **Whirl** are included in the `/examples/` directory.

These examples are fully commented so you can easily understand what is going on and how it's working. Feel free to change and play around with the examples yourself!

Simply clone the repository, build the source ([See the "Build" section](#build)) and open up `/index.html` in any one of the examples to start tinkering.

# Build

**Whirl** takes advantage of [Browserify](http://browserify.org/) to compile its source code down into a single, usable Javascript file.

1. Clone the repository with `git clone <URL>`.
2. Navigate to the root directory in your terminal.
3. `npm install` the dependencies\*.
4. Run `npm run build` to compile the source into `\build\Whirl.js`.

Once compiled, you can simply include `Whirl.js` into your HTML page with a script tag:

    <script src="Whirl.js"></script>
    
From there you are free to use the plethora of features offered by **Whirl**. Happy coding!

<sup>\* <i>You may need to globally install Browserify and Watchify to be able to compile successfully.</i></sup>
