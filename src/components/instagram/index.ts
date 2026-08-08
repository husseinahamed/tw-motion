import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Instagram extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
    :host {
      display: block;
    }
    .instagram {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .instagram-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .instagram-content {
      color: #666;
    }
  `;

  render() {
    return html`
      <div class="instagram">
        <h3 class="instagram-title">${this.config?.title || 'Instagram'}</h3>
        <div class="instagram-content">
          ${this.config?.content || 'This is a new Instagram component'}
        </div>
      </div>
    `;
  }
}
