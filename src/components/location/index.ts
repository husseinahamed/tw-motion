import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Location extends LitElement {
  @property({ type: String }) position: string = "default";
  @property({ type: Object }) config?: {
    is_color?: boolean;
    main_title?: string;
    sub_title?: string;
    special_color?: boolean;
    main_title_color?: string;
    sub_title_color?: string;
    tabs_color?: string;
    tabs_active_color?: string;
    country_color_not_active?: string;
    country_color_active?: string;
    branch_color?: string;
    squra_color?: string;
    branches?: Array<{
      country: string;
      country_flag: string;
      city: string;
      branch_name: string;
      branch_address: string;
      map_url: string;
    }>;
  };
  @property({ type: Object }) theme?: {
    settings: {
      get(key: string): any;
    };
  };

  @property({ type: String }) private activeCountry: string = "";
  @property({ type: String }) private activeCity: string = "";

  // Helper function to get localized text
  private getLocalizedText(value: any): string {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      // Try to get the current language, fallback to 'ar' then 'en'
      const currentLang = (window as any).salla?.lang?.getLocale?.() || "ar";
      return value[currentLang] || value["ar"] || value["en"] || "";
    }
    return "";
  }

  firstUpdated() {
    const branches = this.config?.branches || [];
    if (branches.length > 0) {
      const grouped = this.getGroupedBranches(branches);
      const countries = Object.keys(grouped);
      if (countries.length > 0) {
        this.activeCountry = countries[0];
        const cities = Object.keys(grouped[this.activeCountry]);
        if (cities.length > 0) {
          this.activeCity = cities[0];
        }
      }
    }
  }

  getGroupedBranches(branches: any[]) {
    const grouped: Record<string, Record<string, any[]>> = {};
    branches.forEach((item) => {
      grouped[item.country] ??= {};
      grouped[item.country][item.city] ??= [];
      grouped[item.country][item.city].push(item);
    });
    return grouped;
  }

  getCountryFlags(branches: any[]) {
    const flags: Record<string, string> = {};
    branches.forEach((item) => {
      flags[item.country] ??= item.country_flag;
    });
    return flags;
  }

  static styles = css`
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

  render() {
    if (!this.config) return html``;

    const c = this.config;
    const position = this.position;
    const branches = c.branches || [];
    const grouped = this.getGroupedBranches(branches);
    const countryFlags = this.getCountryFlags(branches);
    const countries = Object.keys(grouped);

    if (countries.length > 0 && !this.activeCountry) {
      this.activeCountry = countries[0];
    }

    const cities =
      this.activeCountry && grouped[this.activeCountry]
        ? Object.keys(grouped[this.activeCountry])
        : [];

    if (
      cities.length > 0 &&
      (!this.activeCity || !cities.includes(this.activeCity))
    ) {
      this.activeCity = cities[0];
    }

    // Dynamic Colors configuration
    const mainTitleColor = c.special_color
      ? c.main_title_color || "inherit"
      : "var(--color-primary)";
    const subTitleColor = c.special_color
      ? c.sub_title_color || "inherit"
      : "var(--text-primary)";
    const tabsBg = c.special_color ? c.tabs_color || "#e7e3e3" : "#e7e3e3";
    const tabsActiveBg = c.special_color
      ? c.tabs_active_color || "inherit"
      : "var(--color-primary)";
    const colorNotActive = c.special_color
      ? c.country_color_not_active || "inherit"
      : "var(--text-primary)";
    const colorActive = c.special_color
      ? c.country_color_active || "inherit"
      : "var(--text-secondary)";
    const branchTextColor = c.special_color
      ? c.branch_color || "inherit"
      : "var(--text-primary)";

    return html`
      <section class="store-branches store-branches-${position}">
        ${
          c.main_title
            ? html`
                <h2 class="main-heading" style="color: ${mainTitleColor};">
                  ${this.getLocalizedText(c.main_title)}
                </h2>
              `
            : ""
        }
        ${
          c.sub_title
            ? html`
                <p class="sub-heading" style="color: ${subTitleColor};">
                  ${this.getLocalizedText(c.sub_title)}
                </p>
              `
            : ""
        }

        <div class="container">
          <div class="countries-tabs">
            ${countries.map((country) => {
              const isActive = country === this.activeCountry;
              const currentBg = isActive ? tabsActiveBg : tabsBg;
              const currentColor = isActive ? colorActive : colorNotActive;
              return html`
                <button
                  class="country-tab ${isActive ? "active" : ""}"
                  style="background: ${currentBg}; color: ${currentColor};"
                  @click="${() => {
                    this.activeCountry = country;
                    const newCities = Object.keys(grouped[country]);
                    this.activeCity = newCities[0] || "";
                  }}"
                >
                  <img
                    src="${countryFlags[country]}"
                    class="country-flag"
                    alt="${this.getLocalizedText(country)}"
                  />
                  <span>${this.getLocalizedText(country)}</span>
                </button>
              `;
            })}
          </div>

          <div class="grid-layout">
            <div class="cities-tabs">
              ${cities.map((city) => {
                const isActive = city === this.activeCity;
                const currentBg = isActive ? tabsActiveBg : tabsBg;
                const currentColor = isActive ? colorActive : colorNotActive;
                return html`
                  <button
                    class="city-tab ${isActive ? "active" : ""}"
                    style="background: ${currentBg}; color: ${currentColor};"
                    @click="${() => (this.activeCity = city)}"
                  >
                    <i
                      class="sicon-map-location city-icon"
                      style="color: ${currentColor};"
                    ></i>
                    <span>${this.getLocalizedText(city)}</span>
                  </button>
                `;
              })}
            </div>

            <div class="branches-content">
              ${
                this.activeCountry &&
                this.activeCity &&
                grouped[this.activeCountry]?.[this.activeCity]
                  ? grouped[this.activeCountry][this.activeCity].map(
                      (branch) => html`
                        <div class="branch-item">
                          <h4
                            class="branch-title"
                            style="color: ${branchTextColor};"
                          >
                            ${this.getLocalizedText(branch.branch_name)}
                          </h4>
                          <div
                            class="branch-address"
                            style="color: ${branchTextColor};"
                          >
                            <i
                              class="sicon-location-target"
                              style="font-size: 1.25rem;"
                            ></i>
                            <span
                              >${this.getLocalizedText(branch.branch_address)}</span
                            >
                          </div>
                          <div class="branch-map">
                            <iframe
                              src="${branch.map_url}"
                              loading="lazy"
                            ></iframe>
                          </div>
                        </div>
                      `,
                    )
                  : ""
              }
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
