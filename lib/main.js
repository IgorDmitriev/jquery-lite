const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function (arg) {
  // console.log(arg);

  if (arg instanceof HTMLElement) return new DOMNodeCollection(arg);

  const nodeList = document.querySelectorAll(arg);
  const HTMLElements = Array.from(nodeList);
  const collection = new DOMNodeCollection(HTMLElements);

  return collection;
};
