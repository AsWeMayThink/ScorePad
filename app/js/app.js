import { LitElement, css, html } from 'lit-element';
import Navigo from 'navigo';

export class ScorePad extends LitElement {
  static get properties() {
    // All of the properties of this component and a type for each (used when converting
    // attributes to property values).
    return { name: { type: String } };
  }

  static get styles() {
    return css`
      p {
        color: red;
      }
    `;
  }

  constructor() {
    super();

    let root = null;
    let useHash = true; // Defaults to: false
    let hash = '#!'; // Defaults to: '#'
    this.router = new Navigo(root, useHash, hash);

    this.router
        .on({
            ':id': function (params) {
              // A scoresheet was specified, validate it.
              console.log('scoresheet id');
              fetch(`/api/scoresheet/${params.id}`).then((response) => {
                console.log(response.json());
              });
            },
            '*': function () {
              // No scoresheet specified. Create a new one.
              console.log('no id');
              fetch(`/api/scoresheet`, {
                method: 'post'
              }).then((response) => {
                console.log(response.json());
              });
            }
        })
        .resolve();

    // Set initial values (if any) for component properties.
    this.name = 'World';
  }

  render() {
    return html`
      <p>Hello, ${this.name}!</p>
    `;
  }
}

// Note: Your element must have a hypen in the name (for example, "hello-world"). It's a requirement
// so that our components don't collide with future additions to HTML.
customElements.define('scorepad-app', ScorePad);