import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Footer extends LitElement {
  @property({ type: Object }) config?: {
    logo?: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
    contact_info?: {
      email?: string;
      phone?: string;
      address?: string;
    };
    copyright_text?: string;
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .dl-footer {
      background: rgba(14, 14, 14, 0.98);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 4rem 2rem 2rem;
    }

    .footer-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .footer-logo img {
      height: 50px;
      width: auto;
    }

    .footer-description {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .footer-title {
      color: var(--text-secondary, #fff);
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
    }

    .contact-item svg {
      width: 20px;
      height: 20px;
      color: var(--color-primary, #c7844f);
    }

    .footer-bottom {
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .dl-footer {
        padding: 3rem 1rem 1.5rem;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `;

  render() {
    const config = this.config || {};
    const logo = config.logo || "";
    const description = config.description || "";
    const email = config.email || config.contact_info?.email || "";
    const phone = config.phone || config.contact_info?.phone || "";
    const address = config.address || config.contact_info?.address || "";
    const copyrightText = config.copyright_text || "";

    // Debug logging
    console.log("Footer config:", config);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Address:", address);

    // Helper to get localized text
    const getLocalizedText = (value: any, key: string = "ar") => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object") {
        return value[key] || value["ar"] || value["en"] || "";
      }
      return "";
    };

    return html`
      <footer class="dl-footer">
        <div class="footer-container">
          <div class="footer-content">
            <!-- Brand Section -->
            <div class="footer-section">
              <div class="footer-logo">
                ${logo ? html`<img src="${logo}" alt="Logo" />` : html`<span class="logo-text">Brand</span>`}
              </div>
              <p class="footer-description">${getLocalizedText(description)}</p>
            </div>

            <!-- Contact Section -->
            <div class="footer-section">
              <h3 class="footer-title">Contact Us</h3>
              <div class="contact-info">
                ${
                  email
                    ? html`
                        <div class="contact-item">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>${email}</span>
                        </div>
                      `
                    : ""
                }
                ${
                  phone
                    ? html`
                        <div class="contact-item">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span>${phone}</span>
                        </div>
                      `
                    : ""
                }
                ${
                  address
                    ? html`
                        <div class="contact-item">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>${getLocalizedText(address)}</span>
                        </div>
                      `
                    : ""
                }
              </div>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <p>${getLocalizedText(copyrightText)}</p>
          </div>
        </div>
      </footer>
    `;
  }
}
