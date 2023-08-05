/* eslint-disable no-console */
import './style.scss';
import { getAllProducts, queryProduct } from './utils/Client';
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

queryProduct('73d5c91e-f247-4196-b78e-bda9ffc55acf')
  .then(({ body }) => {
    console.log(body);
  })
  .catch(console.error);

getAllProducts()
  .then(({ body }) => {
    console.log('allProducts', body.results);
  })
  .catch(console.error);