/* global __dirname */
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');

// db models
var User = require('./api/models/UserModel.js');

// api controllers
var UserCtrl = require('./api/controllers/UserController.js');
var ProductCtrl = require('./api/controllers/ProductController.js');
var OrderCtrl = require('./api/controllers/OrderController.js');

// passport config
passport.use(new LocalStrategy(function (username, password, done) {
	User.findOne({ username: username }).exec(function (err, user) {
		if (err) {
			console.log(err);
			return done(err);
		}
		if (!user) {
			return done('user not found', false);
		}
		user.verifyPassword(password).then(function (isMatch) {
			if (!isMatch) {
				return done('incorrect credentials', false);
			}
			return done(null, user.toJSON());
		});
	});
}));

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id).exec(function (err, user) {
		if (err) { return done(err); }
		done(null, user);
	});
});

// api endpoint protection helper method
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.status(403).send('Not logged in');
	}
};


// server config
var app = express();
var port = 8888;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: 'timespentchoosingasessionsecretisnotwasted',
	saveUninitialized: false,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


// API endpoints
app.post('/api/signup', UserCtrl.signup);

app.post('/api/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return res.status(401).json(err);
		}
		if (!user) {
			return res.status(401).json(info);
		}
		req.login(user, function (err) {
			if (err) {
				return res.status(401).json(err);
			}
			return res.status(200).json(user);
		});

	})(req, res, next);
});

app.post('/api/loginFromLocal', function (req, res, next) {
	var localUser = req.body.user;
	delete req.user;
	User.findById(localUser._id).exec(function (err, user) {
		if (err) {
			console.log(err);
		}
		req.login(user, function (err) {
			if (err) {
				return res.status(401).json(err);
			}
			return res.status(200).json(user);
		});
	});
});


app.get('/api/logout', function (req, res) {
	req.logout();
	res.status(200).redirect('/#/');
});

app.get('/api/productDetails/:id', ProductCtrl.getProductDetails);

app.get('/api/getProductList', ProductCtrl.getProductList);

app.post('/api/cartDetails', ProductCtrl.populateCart);

app.post('/api/placeOrder', OrderCtrl.saveOrder);

// admin endpoints protected by isAuthenticated middleware
app.post('/api/admin/addProduct', isAuthenticated, ProductCtrl.addProduct);

app.get('/api/admin/allProducts', isAuthenticated, ProductCtrl.getAllProducts);

app.delete('/api/admin/deleteProduct/:id', isAuthenticated, ProductCtrl.deleteProduct);

app.put('/api/admin/updateProduct/:id', isAuthenticated, ProductCtrl.updateProduct);

// find logged in user's orders
app.get('/api/myOrders/:id', isAuthenticated, OrderCtrl.findMyOrders);

app.get('/api/orderDetails/:id', isAuthenticated, OrderCtrl.getOrderDetails);

var mongoUri = 'mongodb://localhost:27017/devecommerce';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
	console.log('Connected to mongo at', mongoUri);
});

app.listen(port, function () {
	console.log('Listening on port', port);
});