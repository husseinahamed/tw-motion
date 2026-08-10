import { LitElement as k, css as j, html as l } from "lit";
import { property as h } from "lit/decorators.js";
var T = Object.defineProperty, p = (y, t, e, r) => {
  for (var i = void 0, o = y.length - 1, n; o >= 0; o--)
    (n = y[o]) && (i = n(t, e, i) || i);
  return i && T(t, e, i), i;
};
const m = class m extends k {
  constructor() {
    super(...arguments), this.position = "default", this.activeCountry = "", this.activeCity = "";
  }
  // Helper function to get localized text
  getLocalizedText(t) {
    var e, r, i;
    if (typeof t == "string") return t;
    if (t && typeof t == "object") {
      const o = ((i = (r = (e = window.salla) == null ? void 0 : e.lang) == null ? void 0 : r.getLocale) == null ? void 0 : i.call(r)) || "ar";
      return t[o] || t.ar || t.en || "";
    }
    return "";
  }
  firstUpdated() {
    var e;
    const t = ((e = this.config) == null ? void 0 : e.branches) || [];
    if (t.length > 0) {
      const r = this.getGroupedBranches(t), i = Object.keys(r);
      if (i.length > 0) {
        this.activeCountry = i[0];
        const o = Object.keys(r[this.activeCountry]);
        o.length > 0 && (this.activeCity = o[0]);
      }
    }
  }
  getGroupedBranches(t) {
    const e = {};
    return t.forEach((r) => {
      var n;
      const i = this.getLocalizedText(r.country), o = this.getLocalizedText(r.city);
      e[i] ?? (e[i] = {}), (n = e[i])[o] ?? (n[o] = []), e[i][o].push(r);
    }), e;
  }
  getCountryFlags(t) {
    const e = {};
    return t.forEach((r) => {
      const i = this.getLocalizedText(r.country);
      e[i] ?? (e[i] = r.country_flag);
    }), e;
  }
  render() {
    var C;
    if (!this.config) return l``;
    const t = this.config, e = this.position, r = t.branches || [], i = this.getGroupedBranches(r), o = this.getCountryFlags(r), n = Object.keys(i);
    n.length > 0 && !this.activeCountry && (this.activeCountry = n[0]);
    const d = this.activeCountry && i[this.activeCountry] ? Object.keys(i[this.activeCountry]) : [];
    d.length > 0 && (!this.activeCity || !d.includes(this.activeCity)) && (this.activeCity = d[0]);
    const $ = t.special_color ? t.main_title_color || "inherit" : "var(--color-primary)", w = t.special_color ? t.sub_title_color || "inherit" : "var(--text-primary)", b = t.special_color && t.tabs_color || "#e7e3e3", u = t.special_color ? t.tabs_active_color || "inherit" : "var(--color-primary)", f = t.special_color ? t.country_color_not_active || "inherit" : "var(--text-primary)", v = t.special_color ? t.country_color_active || "inherit" : "var(--text-secondary)", x = t.special_color ? t.branch_color || "inherit" : "var(--text-primary)";
    return l`
      <section class="store-branches store-branches-${e}">
        ${t.main_title ? l`
                <h2 class="main-heading" style="color: ${$};">
                  ${this.getLocalizedText(t.main_title)}
                </h2>
              ` : ""}
        ${t.sub_title ? l`
                <p class="sub-heading" style="color: ${w};">
                  ${this.getLocalizedText(t.sub_title)}
                </p>
              ` : ""}

        <div class="container">
          <div class="countries-tabs">
            ${n.map((s) => {
      const c = s === this.activeCountry;
      return l`
                <button
                  class="country-tab ${c ? "active" : ""}"
                  style="background: ${c ? u : b}; color: ${c ? v : f};"
                  @click="${() => {
        this.activeCountry = s;
        const z = Object.keys(i[s]);
        this.activeCity = z[0] || "";
      }}"
                >
                  <img
                    src="${o[s]}"
                    class="country-flag"
                    alt="${s}"
                  />
                  <span>${s}</span>
                </button>
              `;
    })}
          </div>

          <div class="grid-layout">
            <div class="cities-tabs">
              ${d.map((s) => {
      const c = s === this.activeCity, _ = c ? u : b, g = c ? v : f;
      return l`
                  <button
                    class="city-tab ${c ? "active" : ""}"
                    style="background: ${_}; color: ${g};"
                    @click="${() => this.activeCity = s}"
                  >
                    <i
                      class="sicon-map-location city-icon"
                      style="color: ${g};"
                    ></i>
                    <span>${s}</span>
                  </button>
                `;
    })}
            </div>

            <div class="branches-content">
              ${this.activeCountry && this.activeCity && ((C = i[this.activeCountry]) != null && C[this.activeCity]) ? i[this.activeCountry][this.activeCity].map(
      (s) => l`
                        <div class="branch-item">
                          <h4
                            class="branch-title"
                            style="color: ${x};"
                          >
                            ${this.getLocalizedText(s.branch_name)}
                          </h4>
                          <div
                            class="branch-address"
                            style="color: ${x};"
                          >
                            <i
                              class="sicon-location-target"
                              style="font-size: 1.25rem;"
                            ></i>
                            <span
                              >${this.getLocalizedText(s.branch_address)}</span
                            >
                          </div>
                          <div class="branch-map">
                            <iframe
                              src="${s.map_url}"
                              loading="lazy"
                            ></iframe>
                          </div>
                        </div>
                      `
    ) : ""}
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
m.styles = j`
    :host {
      display: block;
      width: 100%;
    }

    .store-branches {
      overflow: hidden;
      margin: 2rem 0;
    }

    @media (min-width: 768px) {
      .store-branches {
        margin: 3.2rem 0;
      }
    }

    .main-heading {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 600;
      font-family: "Marhey", sans-serif;
    }

    @media (min-width: 768px) {
      .main-heading {
        font-size: 2.25rem;
        margin-bottom: 1.5rem;
      }
    }

    .sub-heading {
      font-size: 0.875rem;
      text-align: center;
      margin-bottom: 1.25rem;
    }

    @media (min-width: 768px) {
      .sub-heading {
        font-size: 1.25rem;
      }
    }

    .container {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .countries-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .grid-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin-top: 24px;
    }

    @media (min-width: 768px) {
      .grid-layout {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }

    .cities-tabs {
      display: flex;
      flex-direction: column;
    }

    .branches-content {
      grid-column: span 1;
    }

    @media (min-width: 768px) {
      .branches-content {
        grid-column: span 4 / span 4;
      }
    }

    .country-tab,
    .city-tab {
      padding: 8px 14px;
      margin: 4px;
      cursor: pointer;
      border-radius: 6px;
      font-size: 20px;
      font-weight: 500;
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;
      text-align: left;
      transition:
        background 0.3s ease,
        color 0.3s ease;
    }

    .country-flag {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    }

    .city-icon {
      font-size: 18px;
    }

    .branch-item {
      margin-bottom: 24px;
    }

    .branch-title {
      font-size: 1rem;
      font-weight: 500;
    }

    @media (min-width: 768px) {
      .branch-title {
        font-size: 1.25rem;
      }
    }

    .branch-address {
      margin: 8px 0;
      display: flex;
      align-items: center;
      gap: 12px;
      opacity: 0.75;
    }

    @media (min-width: 768px) {
      .branch-address {
        margin: 16px 0;
      }
    }

    .branch-map {
      min-height: 320px;
      overflow: hidden;
      border-radius: 12px;
    }

    .branch-map iframe {
      width: 100%;
      height: 100%;
      min-height: 320px;
      display: block;
      border: 0;
    }
  `;
let a = m;
p([
  h({ type: String })
], a.prototype, "position");
p([
  h({ type: Object })
], a.prototype, "config");
p([
  h({ type: Object })
], a.prototype, "theme");
p([
  h({ type: String })
], a.prototype, "activeCountry");
p([
  h({ type: String })
], a.prototype, "activeCity");
typeof a < "u" && a.registerSallaComponent("salla-location");
export {
  a as default
};
