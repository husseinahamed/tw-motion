import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Header extends LitElement {
  @property({ type: Object }) config?: {
    logo?: string;
    menu_items?: Array<{
      label: string;
      url: string;
    }>;
    show_search?: boolean;
    show_cart?: boolean;
    show_account?: boolean;
  };

  @property({ type: Boolean }) isMobile: boolean = false;
  @property({ type: Boolean }) isMenuOpen: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this.checkMobile();
    window.addEventListener("resize", () => this.checkMobile());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", () => this.checkMobile());
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .dl-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(14, 14, 14, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
    }

    .logo img {
      height: 50px;
      width: auto;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      color: var(--text-secondary, #fff);
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: var(--color-primary, #c7844f);
    }

    .nav-link::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-primary, #c7844f);
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .action-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary, #fff);
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s ease;
    }

    .action-btn:hover {
      color: var(--color-primary, #c7844f);
    }

    .action-btn svg {
      width: 24px;
      height: 24px;
    }

    .mobile-menu-btn {
      display: none;
      background: transparent;
      border: none;
      color: var(--text-secondary, #fff);
      cursor: pointer;
      padding: 0.5rem;
    }

    .mobile-menu-btn svg {
      width: 28px;
      height: 28px;
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(14, 14, 14, 0.98);
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .mobile-menu.open {
      display: block;
    }

    .mobile-nav-link {
      display: block;
      color: var(--text-secondary, #fff);
      text-decoration: none;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 1.1rem;
    }

    .mobile-nav-link:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }

      .header-container {
        padding: 1rem;
      }
    }
  `;

  render() {
    const config = this.config || {};
    const logo = config.logo || "";
    const menuItems = config.menu_items || [];
    const showSearch = config.show_search !== false;
    const showCart = config.show_cart !== false;
    const showAccount = config.show_account !== false;

    // Helper to get localized text
    const getLocalizedText = (value: any, key: string = "ar") => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object") {
        return value[key] || value["ar"] || value["en"] || "";
      }
      return "";
    };

    // Fixed menu items
    const fixedMenuItems = [
      { label: "الرئيسية", url: "#main-banner" },
      { label: "الأقسام", url: "#sections" },
      { label: "موقعنا", url: "#location" },
    ];

    // Get current page path
    const currentPath = window.location.pathname;

    // Filter menu items to show only those on the same page
    const currentPageMenuItems = menuItems.filter((item: any) => {
      const itemPath = new URL(item.url, window.location.origin).pathname;
      return itemPath === currentPath;
    });

    return html`
      <header class="dl-header">
        <div class="header-container">
          <!-- Logo -->
          <div class="logo">
            ${logo ? html`<img src="${logo}" alt="Logo" />` : html`<span class="logo-text">Brand</span>`}
          </div>

          <!-- Desktop Navigation -->
          <nav class="nav-menu">
            ${fixedMenuItems.map(
              (item: any) => html`
                <a href="${item.url}" class="nav-link">${item.label}</a>
              `,
            )}
            ${currentPageMenuItems.map(
              (item: any) => html`
                <a href="${item.url}" class="nav-link"
                  >${getLocalizedText(item.label)}</a
                >
              `,
            )}
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            ${
              showSearch
                ? html`
                    <button class="action-btn" aria-label="Search">
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  `
                : ""
            }
            ${
              showAccount
                ? html`
                    <button class="action-btn" aria-label="Account">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </button>
                  `
                : ""
            }
            ${
              showCart
                ? html`
                    <button class="action-btn" aria-label="Cart">
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  `
                : ""
            }
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="mobile-menu-btn"
            @click="${() => this.toggleMenu()}"
            aria-label="Menu"
          >
            ${
              this.isMenuOpen
                ? html`
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  `
                : html`
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
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  `
            }
          </button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu ${this.isMenuOpen ? "open" : ""}">
          ${fixedMenuItems.map(
            (item: any) => html`
              <a href="${item.url}" class="mobile-nav-link">${item.label}</a>
            `,
          )}
          ${currentPageMenuItems.map(
            (item: any) => html`
              <a href="${item.url}" class="mobile-nav-link"
                >${getLocalizedText(item.label)}</a
              >
            `,
          )}
        </div>
      </header>
    `;
  }
}
