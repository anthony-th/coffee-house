export const createElement = (tag, classes = [], textContent = '', attributes = {}, isHTML = false) => {
  const element = document.createElement(tag);
  if (classes.length > 0) element.classList.add(...classes);
  if (isHTML) {
    element.innerHTML = textContent;
  } else if (textContent) {
    element.textContent = textContent;
  }
  for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
  }
  return element;
}