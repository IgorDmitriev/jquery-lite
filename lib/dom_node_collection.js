class DOMNodeCollection {
  constructor (HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  html (string) {
    if (typeof string !== "undefined") {
      this.HTMLElements.forEach(el => {
        el.innerHTML = string;
      });
      return this;
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  empty () {

  }

  append () {

  }

  attr () {

  }

  addClass () {

  }

  removeClass () {

  }

  children () {

  }

  parent () {

  }

  find () {

  }

  remove () {

  }
}

module.exports = DOMNodeCollection;
