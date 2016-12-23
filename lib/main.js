const DOMNodeCollection = require('./dom_node_collection.js');

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
