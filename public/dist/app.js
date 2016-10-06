/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	/**
	 * Created by zyg on 16/8/8.
	 */
	var path = __webpack_require__(1);

	var koa = __webpack_require__(2);
	var convert = __webpack_require__(3);
	var ejsConfig = __webpack_require__(4);
	var staticConfig = __webpack_require__(5);

	var requests = __webpack_require__(6);

	var bodyParser = __webpack_require__(7);

	var router = __webpack_require__(8);

	var app = new koa();

	app.use(convert(requests()));

	ejsConfig(app, {
	  root: path.join(__dirname, 'views'),
	  layout: '',
	  viewExt: 'html',
	  cache: false,
	  debug: true
	});

	app.use(convert(staticConfig('public', {})));

	app.use(bodyParser({}));

	//简写
	app.use(convert(function* (next) {
	  this.req = this.request;
	  yield next;
	}));

	app.use(convert(router.routes())).use(convert(router.allowedMethods()));

	app.use(convert(function* (next) {
	  this.statusCode = 404;
	  this.body = 'NOT FOUND';
	}));

	module.exports = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("koa-convert");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("koa-ejs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("koa-log-requests");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	/**
	 * Created by zyg on 16/8/8.
	 */
	var path = __webpack_require__(1);
	var router = __webpack_require__(9)();

	var _ = __webpack_require__(10);

	var requireDir = __webpack_require__(11);

	var controllerDir = path.join(__dirname, './controllers');
	var controllerDirObj = requireDir(controllerDir);

	var apiDir = path.join(__dirname, './api');
	var apiDirObj = requireDir(apiDir);

	function loadRouter(r, obj, method, prePath) {
	  Object.keys(obj).map(key => {
	    var path = key === 'index' ? '' : key;

	    var fn = obj[key];

	    if (_.isPlainObject(fn)) {
	      loadRouter(r, fn, key, prePath);
	    } else {
	      console.log(`load ${ method } ${ prePath }${ path }`);
	      r[method](`${ prePath }${ path }`, fn);
	    }
	  });
	}

	loadRouter(router, controllerDirObj, 'get', '/');
	loadRouter(router, apiDirObj, 'get', '/api/');

	module.exports = router;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by zyg on 16/8/8.
	 */
	var fs = __webpack_require__(12);
	var path = __webpack_require__(1);

	const requireDir = dirPath => {
	  var r = {};

	  if (fs.existsSync(dirPath)) {

	    fs.readdirSync(dirPath).map(fileName => {
	      var k = fileName.replace('.js', '');

	      var filePath = path.join(dirPath, fileName);

	      if (fs.lstatSync(filePath).isDirectory()) {
	        return {
	          [k]: requireDir(filePath)
	        };
	      } else {
	        return {
	          [k]: __webpack_require__(13)(filePath)
	        };
	      }
	    }).reduce((init, next) => {
	      return Object.assign(init, next);
	    }, r);
	  }

	  return r;
	};

	module.exports = requireDir;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./readJson": 14,
		"./readJson.js": 14,
		"./requireDir": 11,
		"./requireDir.js": 11
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 13;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by zyg on 16/8/12.
	 */
	var fs = __webpack_require__(12);
	/**
	 * @param path 文件路径
	 */
	module.exports = jsonPath => {
	  var r = null;

	  if (fs.existsSync(jsonPath)) {

	    var str = fs.readFileSync(jsonPath).toString();

	    try {
	      r = JSON.parse(str);
	    } catch (e) {
	      console.log('readJson catch:', e);
	    }
	  }

	  return r;
	};

/***/ }
/******/ ]);