const DOMNodeCollection = require('./dom_node_collection.js');

window.$j = (arg) => {
  switch (typeof arg) {
    case "string": // CSS selectors are expected to be strings
      let nodeList = Array.from(document.querySelectorAll(arg));
      return new DOMNodeCollection(nodeList);
    case "object": // HTML elements are expected to be objects
      if (arg instanceof HTMLElement) {
        let nodeList = [arg];
        return new DOMNodeCollection(nodeList);
      }
  }
};


window.$j = $j;
