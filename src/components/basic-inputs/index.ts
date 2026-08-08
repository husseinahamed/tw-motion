import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class BasicInputs extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, sans-serif;
      color: #333;
      margin: 1rem 0;
    }
    .data-container {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header-title {
      background: #f9fafb;
      padding: 0.75rem 1rem;
      font-weight: 600;
      font-size: 1rem;
      border-bottom: 1px solid #e5e7eb;
      color: #374151;
    }
    .grid {
      display: grid;
      grid-template-columns: minmax(120px, 25%) 1fr;
      gap: 1px;
      background: #e5e7eb; /* لون الخط الفاصل بين الخلايا */
    }
    .row-item {
      display: contents;
    }
    .label {
      background: #f9fafb;
      padding: 0.75rem 1rem;
      font-weight: 500;
      font-size: 0.85rem;
      color: #4b5563;
      display: flex;
      align-items: center;
    }
    .value {
      background: #ffffff;
      padding: 0.75rem 1rem;
      font-family: monospace;
      font-size: 0.85rem;
      color: #1f2937;
      word-break: break-all;
      direction: ltr;
      text-align: left;
    }
    .empty-state {
      padding: 2rem;
      text-align: center;
      color: #ef4444;
      background: #fef2f2;
      border-radius: 8px;
      border: 1px dashed #fca5a5;
    }
  `;

  render() {
    if (!this.config || Object.keys(this.config).length === 0) {
      return html`
        <div class="empty-state">
          <strong>تنبيه:</strong> لا توجد بيانات لعرضها (Configuration is missing or empty)
        </div>
      `;
    }

    return html`
      <div class="data-container">
        <div class="header-title">معلومات المدخلات (Basic Inputs Data)</div>
        <div class="grid">
          ${Object.entries(this.config).map(([fieldId, value]) => this.renderValue(fieldId, value))}
        </div>
      </div>
    `;
  }

  renderValue(fieldId: string, value: any) {
    let displayValue = value;
    
    if (typeof value === 'object' && value !== null) {
      displayValue = JSON.stringify(value, null, 2);
    } else if (typeof value === 'boolean') {
      displayValue = value ? 'true (مفعل)' : 'false (غير مفعل)';
    }

    return html`
      <div class="row-item">
        <div class="label">${fieldId}</div>
        <div class="value">${displayValue}</div>
      </div>
    `;
  }
}