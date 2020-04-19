class CssClass {
  constructor(params) {
    this._name = params.name;
    this._style = params.style;
  }

  addStyle(el) {
    this._style.push(el);
  }

  deleteStyle(el) {
    let tmp = this._style.indexOf(el);
    this._style.splice(tmp, 1);
  }

  consructStyle() {
    let str = "";
    for (let i = 0; i < this._style.length; i++) {
      str += this._style[i] + "; ";
    }
    return str;
  }

  getCSS() {
    let str = `.${this._name} {${this.consructStyle()}}`;
    return str;
  }
}

let objWrap = {
  name: "wrap",
  style: ["display: flex"],
};

objWrapStyle = new CssClass(objWrap);

let objBlock = {
  name: "block",
  style: ["width: 300px", "margin: 10px"],
};

objBlockStyle = new CssClass(objBlock);

let objImg_style = {
  name: "img",
  style: ["width: 100%"],
};

objImgStyle = new CssClass(objImg_style);

let objText = {
  name: "text",
  style: ["qwerty"],
};

objTextStyle = new CssClass(objText);
objTextStyle.addStyle("text-align: justify"); //додавання стилю в масив стилей
objTextStyle.deleteStyle("qwerty"); //видалення стилю з масиву стилей

let strStyle = `<style>${objWrapStyle.getCSS()} ${objBlockStyle.getCSS()} ${objImgStyle.getCSS()} ${objTextStyle.getCSS()}</style>`;

class HtmlElement {
  constructor(params) {
    this._name = params.name;
    this._ifClosed = params.ifClosed;
    this._description = params.description;
    this._atributes = params.atributes;
    this._tag = params.tag;
    this._class = params.class;
  }

  addAtributes(el) {
    this._atributes.push(el);
  }

  getPushEl(el) {
    this._tag.push(el);
  }

  getUnshiftEl(el) {
    this._tag.unshift(el);
  }

  fixTag() {
    let strTag = "";

    for (let i = 0; i < this._tag.length; i++) {
      strTag += this._tag[i].getHtml();
    }

    return strTag;
  }

  fixAtributes() {
    let strAtributes = "";
    for (let i = 0; i < this._atributes.length; i++) {
      strAtributes += this._atributes[i] + " ";
    }

    return strAtributes;
  }

  getHtml() {
    let str = `<${this._name} class="${this._class}" ${this.fixAtributes()}>
                ${this._description} ${this.fixTag()}`;

    if (!this._isClosed) {
      str += `</${this._name}>`;
    }
    return str;
  }
}

let objA = {
  name: "a",
  ifClosed: false,
  description: "More...",
  atributes: ['href="https://www.pravda.com.ua/"', 'target="_blank"'],
  tag: [],
  class: "",
};

let tagA = new HtmlElement(objA);

let objP = {
  name: "p",
  ifClosed: false,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi delectus at totam esse eos, beatae aspernatur, minima illo quam perspiciatis. Ut sit numquam facere? Harum earum veniam possimus quam.Ipsam dignissimos expedita error fugit provident optio unde fuga commodi ducimus quod soluta mollitia, tenetur consectetur tempora corporis facilis quisquam, id suscipit ut magni. Ipsum quaerat amet laborum dicta voluptate.",
  atributes: [],
  tag: [],
  class: "text",
};

let tagP = new HtmlElement(objP);
tagP.getPushEl(tagA);

let objImg = {
  name: "img",
  ifClosed: true,
  description: "",
  atributes: ['alt="img"'],
  tag: [],
  class: "img",
};

let tagImg = new HtmlElement(objImg);
tagImg.addAtributes('src="img/1.jpg"');

let objH3 = {
  name: "h3",
  ifClosed: false,
  description: "What is Lorem Impus?",
  atributes: [],
  tag: [],
  class: "",
};

let tagH3 = new HtmlElement(objH3);

let objNews = {
  name: "div",
  ifClosed: false,
  description: "",
  atributes: [],
  tag: [tagH3, tagImg, tagP],
  class: "block",
};

let tagNews = new HtmlElement(objNews);

let objMain = {
  name: "div",
  ifClosed: false,
  description: "",
  atributes: [],
  tag: [tagNews],
  class: "wrap",
};

let tagMain = new HtmlElement(objMain);
tagMain.getUnshiftEl(tagNews);
let strHtml = tagMain.getHtml();

let array = [strStyle, strHtml];

class HtmlBlock {
  constructor(array) {
    this._style = array[0];
    this._html = array[1];
  }

  getCode() {
    return `${this._style} ${this._html}`;
  }
}

let code = new HtmlBlock(array);

document.write(code.getCode());

