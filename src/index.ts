import './style.scss';
import { createElement } from './utils/createElement';

class App {
  root: Element;

  constructor(root: HTMLElement) {
    this.root = document.getElementById('root') ?? createElement('div', { id: 'root' }, root);
  }

  run() {
    createElement('h1', { className: 'title', textContent: 'Hello!' }, this.root);
  }
}

const app = new App(document.body);
app.run();
