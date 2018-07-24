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

  addClass(value) {
    this.each(node => { node.classList.add(value); });
  }


}


module.exports = DOMNodeCollection;
