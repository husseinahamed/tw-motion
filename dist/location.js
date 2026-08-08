import { LitElement as z, css as j, html as l } from "lit";
import { property as p } from "lit/decorators.js";
var B = Object.defineProperty, h = (u, t, e, r) => {
  for (var i = void 0, o = u.length - 1, s; o >= 0; o--)
    (s = u[o]) && (i = s(t, e, i) || i);
  return i && B(t, e, i), i;
};
const y = class y extends z {
  constructor() {
    super(...arguments), this.position = "default", this.activeCountry = "", this.activeCity = "";
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
      var i, o, s;
      e[i = r.country] ?? (e[i] = {}), (o = e[r.country])[s = r.city] ?? (o[s] = []), e[r.country][r.city].push(r);
    }), e;
  }
  getCountryFlags(t) {
    const e = {};
    return t.forEach((r) => {
      var i;
      e[i = r.country] ?? (e[i] = r.country_flag);
    }), e;
  }
  render() {
    var C;
    if (!this.config) return l``;
    const t = this.config, e = this.position, r = t.branches || [], i = this.getGroupedBranches(r), o = this.getCountryFlags(r), s = Object.keys(i);
    s.length > 0 && !this.activeCountry && (this.activeCountry = s[0]);
    const d = this.activeCountry && i[this.activeCountry] ? Object.keys(i[this.activeCountry]) : [];
    d.length > 0 && (!this.activeCity || !d.includes(this.activeCity)) && (this.activeCity = d[0]);
    const $ = t.special_color ? t.main_title_color || "inherit" : "var(--color-primary)", w = t.special_color ? t.sub_title_color || "inherit" : "var(--text-primary)", g = t.special_color && t.tabs_color || "#e7e3e3", b = t.special_color ? t.tabs_active_color || "inherit" : "var(--color-primary)", v = t.special_color ? t.country_color_not_active || "inherit" : "var(--text-primary)", f = t.special_color ? t.country_color_active || "inherit" : "var(--text-secondary)", x = t.special_color ? t.branch_color || "inherit" : "var(--text-primary)";
    return l`
      <section class="store-branches store-branches-${e}">
        
        ${t.main_title ? l`
          <h2 class="main-heading" style="color: ${$};">
            ${t.main_title}
          </h2>
        ` : ""}

        ${t.sub_title ? l`
          <p class="sub-heading" style="color: ${w};">
            ${t.sub_title}
          </p>
        ` : ""}

        <div class="container">
          <div class="countries-tabs">
            ${s.map((n) => {
      const c = n === this.activeCountry;
      return l`
                <button 
                  class="country-tab ${c ? "active" : ""}" 
                  style="background: ${c ? b : g}; color: ${c ? f : v};"
                  @click="${() => {
        this.activeCountry = n;
        const k = Object.keys(i[n]);
        this.activeCity = k[0] || "";
      }}"
                >
                  <img src="${o[n]}" class="country-flag" alt="${n}">
                  <span>${n}</span>
                </button>
              `;
    })}
          </div>

          <div class="grid-layout">
            <div class="cities-tabs">
              ${d.map((n) => {
      const c = n === this.activeCity, _ = c ? b : g, m = c ? f : v;
      return l`
                  <button 
                    class="city-tab ${c ? "active" : ""}" 
                    style="background: ${_}; color: ${m};"
                    @click="${() => this.activeCity = n}"
                  >
                    <i class="sicon-map-location city-icon" style="color: ${m};"></i>
                    <span>${n}</span>
                  </button>
                `;
    })}
            </div>

            <div class="branches-content">
              ${this.activeCountry && this.activeCity && ((C = i[this.activeCountry]) != null && C[this.activeCity]) ? i[this.activeCountry][this.activeCity].map((n) => l`
                  <div class="branch-item">
                    <h4 class="branch-title" style="color: ${x};">${n.branch_name}</h4>
                    <div class="branch-address" style="color: ${x};">
                      <i class="sicon-location-target" style="font-size: 1.25rem;"></i>
                      <span>${n.branch_address}</span>
                    </div>
                    <div class="branch-map">
                      <iframe src="${n.map_url}" loading="lazy"></iframe>
                    </div>
                  </div>
                `) : ""}
            </div>
          </div>
        </div>

      </section>
    `;
  }
};
y.styles = j`
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
      font-family: 'Marhey', sans-serif;
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
      transition: background 0.3s ease, color 0.3s ease;
    }

    .country-flag {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 0 2px rgba(0,0,0,.2);
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
let a = y;
h([
  p({ type: String })
], a.prototype, "position");
h([
  p({ type: Object })
], a.prototype, "config");
h([
  p({ type: Object })
], a.prototype, "theme");
h([
  p({ type: String })
], a.prototype, "activeCountry");
h([
  p({ type: String })
], a.prototype, "activeCity");
typeof a < "u" && a.registerSallaComponent("salla-location");
export {
  a as default
};
