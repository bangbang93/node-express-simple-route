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

module.exports = router;
```

and named this file "example.js"

all request /example will enter this router;

## aliases
```javascript
var router = require('express').Router();

router.get('/', function (req, res, next){
	res.send('success');
});

router.post('/', function (req, res, next){
	res.send('post example');
});

router.alias = ['user', 'users'];

module.exports = router;
```

this will run like 
```js
app.use('/user', router);
app.use('/users', router);
```