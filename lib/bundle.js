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

	const $l = function (arg) {
	  if (arg instanceof HTMLElement) return new DOMNodeCollection(arg);

	  if (typeof arg === 'function') {
	    if (document.readyState === 'complete') return arg();
	    document.addEventListener('DOMContentLoaded', arg);
	    return;
	  }

	  const nodeList = document.querySelectorAll(arg);
	  const HTMLElements = Array.from(nodeList);
	  const collection = new DOMNodeCollection(HTMLElements);

	  return collection;
	};

	$l.extend = function (...objects) {
	  return Object.assign(...objects);
	};

	$l.ajax = function (options) {
	  const opts = $l.extend({
	    data: {},
	    success: ((xhr) => console.log(JSON.parse(xhr.response))),
	    error: ((xhr) => console.log("Error", xhr.statusText)),
	    url: document.URL,
	    method: 'GET',
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	  }, options);

	  const xhr = new XMLHttpRequest();

	  xhr.open(opts.type || opts.method, opts.url);

	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      opts.success(JSON.parse(xhr.response));
	    } else {
	      opts.error(xhr);

	    }
	  };

	  xhr.send(opts.data);
	};

	window.$l = $l;

	$l($l.ajax({
	     url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
	     success(data) {
	       console.log("We have your weather!");
	       console.log(data);
	     },
	     error() {
	       console.error("An error occurred.");
	     },
	  }));


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor (HTMLElements) {
	    this.HTMLElements = HTMLElements;

	    this.length = HTMLElements.length;
	    HTMLElements.forEach( (el, idx) => {
	      this[idx] = el;
	    });
	  }

	  each (cb) {
	    for (let i = 0; i < this.length; i++) {
	      cb(this[i]);
	    }
	  }

	  html (string) {
	    if (typeof string !== "undefined") {
	      this.each(el => {
	        el.innerHTML = string;
	      });

	      return this;
	    } else {
	      return this[0].innerHTML;
	    }
	  }

	  empty () {
	    this.html("");

	    return this;
	  }

	  append (el) {
	    if (el instanceof DOMNodeCollection) {
	      const outerHTMLs = [];
	      el.each((outerEl) => {
	        outerHTMLs.push(outerEl.outerHTML);
	      });

	      const outerHTML = outerHTMLs.join("");

	      this.each((innerEl) => {
	        innerEl.innerHTML += outerHTML;
	      });

	    } else if (el instanceof HTMLElement) {
	      this.each((innerEl) => {
	        innerEl.innerHTML += el.outerHTML;
	      });

	    } else if (typeof el === 'string') {
	      this.each((innerEl) => {
	        innerEl.innerHTML += el;
	      });

	    } else {
	      return undefined;
	    }

	    return this;
	  }

	  attr (attrName, value) {
	    if (typeof value === "undefined") {
	      return this[0].getAttribute(attrName);
	    } else {
	      this.each(el => {
	        el.setAttribute(attrName, value);
	      });
	      return this;
	    }
	  }

	  addClass (className) {
	    this.each(el => {
	      el.classList.add(className);
	    });

	    return this;
	  }

	  removeClass (className) {
	    this.each(el => {
	      el.classList.remove(className);
	    });

	    return this;
	  }

	  children () {
	    const childrenHTMLElements = [];

	    this.each(el => {
	      childrenHTMLElements.push(...el.children);
	    });

	    return new DOMNodeCollection(childrenHTMLElements);
	  }

	  parent () {
	    const parentsHTMLElements = [];

	    this.each(el => {
	      if (!parentsHTMLElements.includes(el.parentElement)) {
	        parentsHTMLElements.push(el.parentElement);
	      }
	    });

	    return new DOMNodeCollection(parentsHTMLElements);
	  }

	  find (selector) {
	    const resultHTMLElements = [];

	    this.each(el => {
	      resultHTMLElements.push(...el.querySelectorAll(selector));
	    });

	    return new DOMNodeCollection(resultHTMLElements)  ;
	  }

	  remove () {
	    this.each(el =>  {
	      el.innerHTML = "";
	    });

	    this.HTMLElements.forEach( (el, idx) => {
	      this[idx] = undefined;
	    });

	    this.HTMLElements = [];
	    this.length = 0;

	    return this;
	  }

	  on (eventName, cb) {
	    this.each(el =>  {
	      el.addEventListener(eventName, cb);

	      //create callbacks property and store callbacks there by eventType
	      if (typeof el.callbacks === "undefined") {
	        el.callbacks = {};
	      }
	      el.callbacks[eventName] = cb;
	    });
	  }

	  off (eventName) {
	    this.each(el => {
	      el.removeEventListener(eventName, el.callbacks[eventName]);
	    });
	  }
	}

	window.DOMNodeCollection = DOMNodeCollection;
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);