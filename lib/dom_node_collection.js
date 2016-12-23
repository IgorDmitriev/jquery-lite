class DOMNodeCollection {
  constructor (HTMLElements) {
    this.HTMLElements = HTMLElements;

    this.length = HTMLElements.length;
    HTMLElements.forEach( (el, idx) => {
      this[idx] = el;
    });
  }

  each (cb) {
    for (let i = 0; i < this.length; i++) {
      cb(this[i]);
    }
  }

  html (string) {
    if (typeof string !== "undefined") {
      this.each(el => {
        el.innerHTML = string;
      });

      return this;
    } else {
      return this[0].innerHTML;
    }
  }

  empty () {
    this.html("");

    return this;
  }

  append (el) {
    if (el instanceof DOMNodeCollection) {
      const outerHTMLs = [];
      el.each((outerEl) => {
        outerHTMLs.push(outerEl.outerHTML);
      });

      const outerHTML = outerHTMLs.join("");

      this.each((innerEl) => {
        innerEl.innerHTML += outerHTML;
      });

    } else if (el instanceof HTMLElement) {
      this.each((innerEl) => {
        innerEl.innerHTML += el.outerHTML;
      });

    } else if (typeof el === 'string') {
      this.each((innerEl) => {
        innerEl.innerHTML += el;
      });

    } else {
      return undefined;
    }

    return this;
  }

  attr (attrName, value) {
    if (typeof value === "undefined") {
      return this[0].getAttribute(attrName);
    } else {
      this.each(el => {
        el.setAttribute(attrName, value);
      });
      return this;
    }
  }

  addClass (className) {
    this.each(el => {
      el.classList.add(className);
    });

    return this;
  }

  removeClass (className) {
    this.each(el => {
      el.classList.remove(className);
    });

    return this;
  }

  children () {
    const childrenHTMLElements = [];

    this.each(el => {
      childrenHTMLElements.push(...el.children);
    });

    return new DOMNodeCollection(childrenHTMLElements);
  }

  parent () {
    const parentsHTMLElements = [];

    this.each(el => {
      if (!parentsHTMLElements.includes(el.parentElement)) {
        parentsHTMLElements.push(el.parentElement);
      }
    });

    return new DOMNodeCollection(parentsHTMLElements);
  }

  find (selector) {
    const resultHTMLElements = [];

    this.each(el => {
      resultHTMLElements.push(...el.querySelectorAll(selector));
    });

    return new DOMNodeCollection(resultHTMLElements)  ;
  }

  remove () {
    this.each(el =>  {
      el.innerHTML = "";
    });

    this.HTMLElements.forEach( (el, idx) => {
      this[idx] = undefined;
    });

    this.HTMLElements = [];
    this.length = 0;

    return this;
  }

  on (eventName, cb) {
    this.each(el =>  {
      el.addEventListener(eventName, cb);

      //create callbacks property and store callbacks there by eventType
      if (typeof el.callbacks === "undefined") {
        el.callbacks = {};
      }
      el.callbacks[eventName] = cb;
    });
  }

  off (eventName) {
    this.each(el => {
      el.removeEventListener(eventName, el.callbacks[eventName]);
    });
  }
}

window.DOMNodeCollection = DOMNodeCollection;
module.exports = DOMNodeCollection;
