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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = function (arg) {
	  // console.log(arg);

	  if (arg instanceof HTMLElement) return new DOMNodeCollection(arg);

	  const nodeList = document.querySelectorAll(arg);
	  const HTMLElements = Array.from(nodeList);
	  const collection = new DOMNodeCollection(HTMLElements);

	  return collection;
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor (HTMLElements) {
	    this.HTMLElements = HTMLElements;
	  }

	  html (string) {
	    if (typeof string !== "undefined") {
	      this.HTMLElements.forEach(el => {
	        el.innerHTML = string;
	      });
	      return this;
	    } else {
	      return this.HTMLElements[0].innerHTML;
	    }
	  }

	  empty () {

	  }

	  append () {

	  }

	  attr () {

	  }

	  addClass () {

	  }

	  removeClass () {

	  }

	  children () {

	  }

	  parent () {

	  }

	  find () {

	  }

	  remove () {

	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);