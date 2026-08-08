import { LitElement as v, css as w, html as o } from "lit";
import { property as l } from "lit/decorators.js";
var k = Object.defineProperty, c = (p, n, i, h) => {
  for (var t = void 0, a = p.length - 1, s; a >= 0; a--)
    (s = p[a]) && (t = s(n, i, t) || t);
  return t && k(n, i, t), t;
};
const d = class d extends v {
  constructor() {
    super(...arguments), this.isMobile = !1, this.isMenuOpen = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.checkMobile(), window.addEventListener("resize", () => this.checkMobile());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("resize", () => this.checkMobile());
  }
  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  render() {
    const n = this.config || {}, i = n.logo || "", h = n.menu_items || [], t = n.show_search !== !1, a = n.show_cart !== !1, s = n.show_account !== !1, b = (e, g = "ar") => typeof e == "string" ? e : e && typeof e == "object" && (e[g] || e.ar || e.en) || "", u = [
      { label: "الرئيسية", url: "#main-banner" },
      { label: "الأقسام", url: "#sections" },
      { label: "موقعنا", url: "#location" }
    ], f = window.location.pathname, m = h.filter((e) => new URL(e.url, window.location.origin).pathname === f);
    return o`
      <header class="dl-header">
        <div class="header-container">
          <!-- Logo -->
          <div class="logo">
            ${i ? o`<img src="${i}" alt="Logo" />` : o`<span class="logo-text">Brand</span>`}
          </div>

          <!-- Desktop Navigation -->
          <nav class="nav-menu">
            ${u.map((e) => o`
              <a href="${e.url}" class="nav-link">${e.label}</a>
            `)}
            ${m.map((e) => o`
              <a href="${e.url}" class="nav-link">${b(e.label)}</a>
            `)}
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            ${t ? o`
              <button class="action-btn" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            ` : ""}
            ${s ? o`
              <button class="action-btn" aria-label="Account">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            ` : ""}
            ${a ? o`
              <button class="action-btn" aria-label="Cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            ` : ""}
          </div>

          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" @click="${() => this.toggleMenu()}" aria-label="Menu">
            ${this.isMenuOpen ? o`
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ` : o`
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            `}
          </button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu ${this.isMenuOpen ? "open" : ""}">
          ${u.map((e) => o`
            <a href="${e.url}" class="mobile-nav-link">${e.label}</a>
          `)}
          ${m.map((e) => o`
            <a href="${e.url}" class="mobile-nav-link">${b(e.label)}</a>
          `)}
        </div>
      </header>
    `;
  }
};
d.styles = w`
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
      content: '';
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
let r = d;
c([
  l({ type: Object })
], r.prototype, "config");
c([
  l({ type: Boolean })
], r.prototype, "isMobile");
c([
  l({ type: Boolean })
], r.prototype, "isMenuOpen");
typeof r < "u" && r.registerSallaComponent("salla-header");
export {
  r as default
};
