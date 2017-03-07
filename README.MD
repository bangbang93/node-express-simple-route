# express-simple route

## usage
just simple add
```javascript
require('express-simple-route')(path.join(__dirname, 'routes'), app);
```
to your app.js

or use the second param to specific base route

```javascript
require('express-simple-route')(path.join(__dirname, 'routes'), app, '/api');
```

it will load all js file under "routes" directory.

in those js file ,write express route looks like
 
```javascript
var router = require('express').Router();

router.get('/', function (req, res, next){
	res.send('success');
});

router.post('/', function (req, res, next){
	res.send('post example');
});
```

and named this file "example.js"

all request /example will enter this router;