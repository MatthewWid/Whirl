# Installation

**MobSin** is designed to be capable of running offline and in the browser.

You will need [Browserify](http://browserify.org/) to compile the source down into a single, usable Javascript file.  
If you're developing with the purpose of contributing to MobSin, you may also want [Watchify](https://github.com/browserify/watchify).

**1. Clone the repository:**

```bash
git clone https://github.com/MatthewWid/MobSin.git
```

**2. Navigate to the root directory:**

```bash
cd "MobSin"
```

**3. Install dependencies:**

```bash
npm install
```

**4. Build the source:**

```bash
npm run build
```

or with Watchify:

```bash
npm run build-watch
```

You can now see that a file called `mobsin.js` has appeared in the `/build/` directory.

# Usage

Once you have a copy of the compiled source you can include it into your project...

```html
<script src="mobsin.js"></script>
```

*or*

```javascript
const MobSin = require("mobsin.js");
```