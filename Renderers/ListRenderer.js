export default class ListRenderer {
  constructor(list, container, itemRenderer) {
    this.itemRenderer = itemRenderer;
    if (container instanceof Element) {
      this.container = container;
    } else if (container) {
      this.container = document.querySelector(container);
    } else {
      alert("Something went wrong");
      //console.log(container);
    }
    this.list = list.map((item) => new this.itemRenderer(item));
  }

  render() {
    this.container.innerHTML = "";
    for (const itemRenderer of this.list) {
      const html = itemRenderer.render();
      this.container.insertAdjacentHTML("beforeend", html);
      if (itemRenderer.postRender) {
        const element = this.container.lastElementChild;
        itemRenderer.postRender(element);
      }
    }
  }
}
