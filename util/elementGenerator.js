const generateElement = (type) => {
  const element = {
    domObj: document.createElement(type),
    build: () => {
      return element.domObj;
    },

    style: (style) => {
      element.domObj.style = style;
      return element;
    },

    className: (className) => {
      element.domObj.className = className;
      return element;
    },

    id: (id) => {
      element.domObj.id = id;
      return element;
    },
    title: (title) => {
      element.domObj.title = title;
      return element;
    },
    addEventListener: (type, callback) => {
      element.domObj.addEventListener(type, callback);
      return element;
    },
    appendChild: (node) => {
      element.domObj.appendChild(node);
      return element;
    },
    innerText: (innerText) => {
      element.domObj.innerText = innerText;
      return element;
    },
    type: (type) => {
      element.domObj.type = type;
      return element;
    },
    accept: (accept) => {
      element.domObj.accept = accept;
      return element;
    },
    name: (name) => {
      element.domObj.name = name;
      return element;
    },
    multiple: (multiple) => {
      element.domObj.multiple = multiple;
      return element;
    },
  };
  return element;
};

export { generateElement };
