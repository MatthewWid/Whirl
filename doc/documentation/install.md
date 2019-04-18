# Installation

**Whirl** is designed to be capable of running offline and in the browser.

You will need [Browserify](http://browserify.org/) to compile the source down into a single, usable Javascript file.  
If you're developing with the purpose of contributing to Whirl, you may also want [Watchify](https://github.com/browserify/watchify).

**1. Clone the repository:**

```bash
git clone https://github.com/MatthewWid/Whirl.git
```

**2. Navigate to the root directory:**

```bash
cd "Whirl"
```

**3. Install dependencies:**

```bash
npm install
```

**4. Build the source:**

```bash
npm run build
```

You should now see that a file called `whirl.js` has appeared in the `/build/` directory.

# Usage

Once you have a copy of the compiled source you can include it into your project:

```html
<script src="whirl.js"></script>
```

*or*

```javascript
const Whirl = require("whirl.js");
```

Alternatively, you can simply open the `index.html` file in any of the example projects in the `/examples/` directory to quickly mess around with and observe what the engine is capable of.
