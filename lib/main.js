window.$j = (arg) => {
  switch (typeof arg) {
    case "string": // expected to be CSS selector
      console.log(nodeList = Array.from(document.querySelectorAll(arg)));
      return new DOMNodeCollection(nodeList);
  }
};


window.$j = $j;
