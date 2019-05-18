<p align="center"><img src="./doc/logo/logo_text.png" alt="drawing" width="50%" /></p>

<p align="center"><b>Whirl is a modern, lightweight and extensible 2D game engine written in Javascript.</b></p>

<p align="center"><sup><i>This project is still a work in progress and has not yet reached completion.<br>Everything is subject to change.</i></sup></p>

# Features

**Whirl**'s aim is to allow you to to quickly and easily create games in the browser; allowing you to create, extend and import game objects and plugins, making its functionality highly extendable outside of its many already included core features.

Some features offered by the **Whirl** game engine are:

* **Dynamic custom event system** that allows for the creation and broadcasting of events across game objects.
* **Child-parent tree architecture** of game objects that allows you to easily organise your game world into a managable hierarchy of objects.
* **State-like world system** that makes it easy to load, unload and switch your scene or level instantly.
* **Modularised viewport manager** that enables you to create multiple game viewports and screens *without* the need for multiple canvas elements, stacked HTML elements or game instances.
* **Standardised object importation methods** that make it easy to create your own custom plugins and special game objects that can be imported and used in your games - your objects are modular and reusable.

# Documentation

Whirl is (almost) fully documented from it's event system to all of its given classes. The documentation contains details on **installation** and all default **game classes**, **in-built libraries**, **constants**, **object systems** and more.

[**See the documentation.**](https://matthewwid.github.io/Whirl/)

# Examples

Example usage of the various features of **Whirl** are included in the `/examples/` directory.

These examples are fully commented so you can easily understand what is going on and how it's working. Feel free to change and play around with the examples yourself!

Simply clone the repository, build the source ([See the "Build" section](#build)) and open up `/index.html` in any one of the examples to start tinkering.

# Build

**Whirl** takes advantage of [webpack](https://webpack.js.org/) to compile its source code down into a single, usable Javascript file.

1. Clone the repository - `git clone <... Whirl.git>`.
2. Navigate into the root directory - `cd Whirl`.
3. Install the dependencies - `npm install` or `yarn`.
4. Build the source - `npm run prod` or `yarn prod`.

Once completed, you can find the built file in `/build/whirl.js` and simply include it with a script tag:

    <script src="whirl.js"></script>
    
Or import as a module:

    const Whirl = require("whirl");
    
From there you are free to use the plethora of features offered by **Whirl**. Happy coding!
