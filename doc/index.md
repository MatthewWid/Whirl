<h1>MobSin <small>2D Javascript Game Engine</small></h1>

---

## Overview

**MobSin** is a powerful, lightweight and extensible 2D game engine written in Javascript.

It aims to provide you with the tools necessary to quickly and efficiently create games for the browser.

## Getting Started

It is extremely easy to get started with **MobSin**.

You can put something on the screen in under twenty lines of code and from there *the world is your oyster*.

Visit the [Getting Started](getting-started) section for a simple and easy setup guide that introduces you to creating a basic game.

## Install

**MobSin** takes advantage of [Browserify](http://browserify.org/) to compile its source code down into a single, usable Javascript file.

1. Clone [the repository](https://github.com/MatthewWid/MobSin) with `git clone <URL>`.
2. Navigate to the root directory in your terminal.
3. `npm install` the dependencies.\*
4. Run `npm run build` to compile the source into `\build\mobsin.js`.

Once compiled, you can simply include `mobsin.js` into your HTML page with a script tag:

```html
<script src="mobsin.js"></script>
```

From there you are free to use the plethora of features offered by the **MobSin** game engine. Happy coding!

<sup>\*You may need to globally install Browserify and Watchify to be able to compile successfully.</sup>