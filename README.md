<p align="center"><img src="./doc/logo/logo_text.png" alt="Whirl Logo" width="50%" /></p>

<p align="center"><b>Whirl is a fast, modern, lightweight and extensible 2D game engine written in JavaScript.</b></p>

<p align="center">
    ⚠️ This is an experimental development build. ⚠️
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

# Installation and Usage

Install:

```bash
# npm
npm install whirljs

# Yarn
yarn add whirljs
```

Use:

```javascript
// ES modules
import Whirl from "whirljs";

// UMD
window.Whirl;
```

Create a game:

```javascript
const game = Whirl
    .createGame()
    .start();
```

## Examples

Example usage of the various features of Whirl are included in the `examples/scripts/` directory. Feel free to change and play around with them yourself!

Simply clone the repository, [build the source](#build) and open up `examples/Sandbox/index.html` to use the in-browser code editor and get started with Whirl.

## Build from Source

Whirl takes advantage of [webpack](https://webpack.js.org/) to compile its source code down into a single, universally compatible JavaScript file.

1. Clone the repository - `git clone <repository url>`.
2. Install dependencies - `npm i` or `yarn`.
3. Build from source - `npm run build` or `yarn run build`.

Once completed, you can find the built file in `/build/whirl.js`.

## Build the Docs

**Whirl** uses [JSDoc](https://jsdoc.app/) to write and generate its documentation.

1. Clone the repository - `git clone <repository url>`.
2. Install dependencies - `npm i` or `yarn`.
3. Build the documentation - `npm run doc` or `yarn run doc`.

Once completed, you can find the generated documentation files in the `doc/` directory, with `index.html` being the home page.
