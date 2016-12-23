const DOMNodeCollection = require('./dom_node_collection.js');

function $l (arg) {
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
}

window.$l = $l;
