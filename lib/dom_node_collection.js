class DOMNodeCollection {
  constructor(nodeList) {
    this.nodeList = nodeList;
  }

  each(cb) {
    // this.nodeList.forEach(node => cb(node));
    this.nodeList.forEach(cb)
  }

  html(html) {
    if (html) {
      this.each(node => node.innerHTML = html);
    } else {
      return this.nodeList[0].innerHTML;
    }
  }

  empty() {
    // this.nodeList.forEach( node => node.html = "" );
    this.html(''); // passes in empty string to html func in order to clear nodeList
  }

  append(children) {
    if (typeof children === 'string') {
      this.each(node => { node.innerHTML += children; });
    } else if (children instanceof HTMLElement) {
      this.each(node => { node.innerHTML += children.outerHTML; });
    } else if (children instanceof DOMNodeCollection) {
      children.each(child => {
        this.each(node => { node.innerHTML += child.outerHTML; });
      });
    }
  }

  attr(attribute, value) {
    if (value) {
      this.each(node => { node.attributes = value; });
    } else {
      return this.htmlElements[0].attributes;
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(toggleClass) {
    this.each(node => node.classList.toggle(toggleClass));
  }

  children() {
    let childNodes = [];
    this.each((node) => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];
    this.each(({ parentNode }) => {
      if (!parentNode.visited) { // prevents duplicate parents
        parentNodes.push(parentNode);
        parentNode.visited = true;
      }
    });

    parentNodes.forEach((node) => {
      node.visited = false; // reset 'visited' attribute
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let finds = [];
    this.each((node) => {
      const nodeList = node.querySelectorAll(selector);
      finds = finds.concat(Array.from(nodeList));
    });

    return new DomNodeCollection(finds);
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }


}


module.exports = DOMNodeCollection;
