# mongoose-express-error-handler
Mongoose Express error handler plugin.  
This module convert the mongoose validation error in a bad request response and show all the validation errors without all the anoying stack trace.
## How to use it.
To use this module just add the reference to you javascript file.

```javascript
const mongooseExpressErrorHandler = require('mongoose-express-error-handler');
```

Then just add the plugin to your express app.

```javascript
const express = require('express');
const app = express();
app.use(mongooseExpressErrorHandler);
```

## Version history.

### 1.1.1
 - Added this documentation.

### 1.1.0
 - Simpler handle to express "SyntaxError". It will be inproved.

### 1.0.0
 - Handle the mongoose validation errors and cast errors.