const DOMNodeCollection = require('./dom_node_collection.js');

const docReadyQueue = [];
let docReady = false;


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
    case "function":
      if(!docReady) {
        docReadyQueue.push(arg);
      } else {
        arg();
      }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  docReady = true;
  docReadyQueue.forEach(func => func());
});

window.$j = $j;
