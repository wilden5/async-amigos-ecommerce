/* eslint-disable no-console */
import './style.scss';
import { queryProducts } from './utils/Client';
import { createElement } from './utils/DOMHelpers';

class App {
  root: Element;

  constructor(root: HTMLElement) {
    this.root = document.getElementById('root') ?? createElement('div', { id: 'root' }, root);
  }

  run(): void {
    createElement('h1', { className: 'title', textContent: 'Hello!' }, this.root);
  }
}

const app = new App(document.body);
app.run();

queryProducts()
  .then(({ body }) => {
    console.log('products=>', body);
  })
  .catch(console.error);