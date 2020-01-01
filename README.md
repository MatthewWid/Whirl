<p align="center"><img src="./doc/logo/logo_text.png" alt="Whirl Logo" width="50%" /></p>

<p align="center"><b>Whirl is a fast, modern, lightweight and extensible 2D game engine written in JavaScript.</b></p>

<p align="center">
    ⚠️ This is the <code>3.0.0-alpha.5</code> development build. ⚠️
    <br>
    <sup>Certain features may be missing and security, stability and performance may be unsuitable for a production environment.
    <br>
    <a href="https://github.com/MatthewWid/Whirl/tree/stable">See the current stable release for the latest production-ready build</a>.
    <br>
    <a href="https://trello.com/b/YRtEiuLV/whirl-game-engine">See the Trello board for upcoming features and fixes</a>.</sup>
</p>

# Features

**Whirl**'s aim is to allow you to to quickly and easily create games in the browser; allowing you to create, extend and import game objects and plugins, making its functionality highly extendable outside of its many already included core features.

Some features offered by the **Whirl** game engine are:

- **Dynamic custom event system** that allows for the creation and broadcasting of events across game objects.
- **Child-parent tree architecture** of game objects that allows you to easily organise your game world into a managable hierarchy of objects.
- **State-like world system** that makes it easy to load, unload and switch your scene or level instantly.
- **Modularised viewport manager** that enables you to create multiple game viewports and screens _without_ the need for multiple canvas elements, stacked HTML elements or duplicate game instances.
- **Flexibility-first approach** that makes it easy to create your own custom plugins and game objects that can be exported and reused - objects are flexible, modular and easy to work with.

# Examples

Example usage of the various features of **Whirl** are included in the `/examples/` directory.

Feel free to change and play around with the examples yourself!

Simply clone the repository, build the source ([See the "Build" section](#build)) and open up `/index.html` in any one of the examples to start tinkering.

# Build

**Whirl** takes advantage of [webpack](https://webpack.js.org/) to compile its source code down into a single, universally compatible JavaScript file.

1. Clone the repository - `git clone <repository url>`.
2. Install build dependencies - `npm install` or `yarn`.
3. Build from source - `npm run prod` or `yarn prod`.

Once completed, you can find the built file in `/build/whirl.js`. Simply include it with a script tag,

    <script src="whirl.js"></script>

or import as a module,

    const Whirl = require("./whirl");

From there you are free to get started and explore the powerful features of the **Whirl game engine**. Happy coding!
