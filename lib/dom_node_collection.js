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
}


module.exports = DOMNodeCollection;
