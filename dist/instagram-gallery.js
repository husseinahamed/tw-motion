import { LitElement as h, css as b, html as r } from "lit";
import { property as c } from "lit/decorators.js";
var v = Object.defineProperty, u = (p, l, a, y) => {
  for (var e = void 0, t = p.length - 1, n; t >= 0; t--)
    (n = p[t]) && (e = n(l, a, e) || e);
  return e && v(l, a, e), e;
};
const m = class m extends h {
  constructor() {
    super(...arguments), this.position = "default";
  }
  render() {
    if (!this.config) return r``;
    const l = this.config, a = `gallery-${this.position}`, y = l.is_color ? `--gallery-bg: ${l.color_bg || "#fff"}; --gallery-heading-color: ${l.color_title || "#111"}; --gallery-btn-bg: ${l.color_btn_bg || "#111"}; --gallery-btn-text: ${l.color_btn_text || "#fff"};` : "", e = l.images_collection || [], t = 5, n = 2;
    return r`
      <section class="lu-image-gallery ${l.is_color ? "is-custom-color" : ""}" id="${a}" style="${y}">
        <div class="lu-container">

          <div class="lu-gallery-header">
            ${l.main_title ? r`
              <h2 class="lu-gallery-heading">${l.main_title}</h2>
            ` : ""}

            ${l.btn_text ? r`
              <a href="${l.btn_url || "#"}" class="lu-gallery-btn" target="_blank" aria-label="${l.btn_text}">
                ${l.btn_text}
              </a>
            ` : ""}
          </div>

          ${e.length > 0 ? r`
            <!-- نسخة الديسكتوب -->
            <div class="lu-gallery-grid lu-desktop-grid">
              ${Array.from({ length: t }).map((f, i) => {
      const s = Math.min(i, t - 1 - i);
      return r`
                  <div class="lu-gallery-column" style="--col-distance: ${s};">
                    ${e.map((g, d) => d % t === i ? this.renderGalleryItem(g, l.main_title) : "")}
                  </div>
                `;
    })}
            </div>

            <!-- نسخة الموبايل -->
            <div class="lu-gallery-grid lu-mobile-grid">
              ${Array.from({ length: n }).map((f, i) => {
      const s = Math.min(i, n - 1 - i);
      return r`
                  <div class="lu-gallery-column" style="--col-distance: ${s};">
                    ${e.map((g, d) => d % n === i ? this.renderGalleryItem(g, l.main_title) : "")}
                  </div>
                `;
    })}
            </div>
          ` : ""}

        </div>
      </section>
    `;
  }
  renderGalleryItem(l, a) {
    return l.image ? l.image_url && l.image_url !== "#" ? r`
        <a href="${l.image_url}" class="lu-gallery-item" target="_blank" aria-label="Gallery image link">
          <img src="${l.image}" alt="${a || "Gallery Image"}" loading="lazy">
        </a>
      ` : r`
      <div class="lu-gallery-item">
        <img src="${l.image}" alt="${a || "Gallery Image"}" loading="lazy">
      </div>
    ` : r`
        <div class="lu-gallery-item">
          <div class="lu-gallery-placeholder"></div>
        </div>
      `;
  }
};
m.styles = b`
    :host {
      display: block;
      width: 100%;
    }

    .lu-image-gallery {
      --gallery-bg: var(--text-secondary, #fff);
      --gallery-heading-color: var(--color-primary, #111);
      --gallery-btn-bg: var(--color-primary, #111);
      --gallery-btn-text: var(--text-secondary, #fff);

      background-color: var(--gallery-bg);
      padding: 60px 0;
      text-align: center;
    }

    .lu-image-gallery.is-custom-color {
      background-color: var(--gallery-bg);
    }

    .lu-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .lu-gallery-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }

    .lu-gallery-heading {
      font-size: 1.8rem;
      font-weight: bold;
      color: var(--gallery-heading-color);
      margin: 0;
    }

    .lu-gallery-btn {
      display: inline-block;
      padding: 10px 28px;
      border-radius: 100px;
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      background-color: var(--gallery-btn-bg);
      color: var(--gallery-btn-text) !important;
      transition: opacity 0.3s ease;
    }

    .lu-gallery-btn:hover {
      opacity: 0.85;
    }

    .lu-gallery-grid {
      --offset-unit: 50px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .lu-mobile-grid {
      display: none;
    }

    .lu-gallery-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1 1 0;
      min-width: 0;
      margin-top: calc(var(--col-distance, 0) * var(--offset-unit));
      transition: margin-top 0.5s ease;
    }

    .lu-desktop-grid:has(.lu-gallery-item:hover) .lu-gallery-column {
      margin-top: calc(1 * var(--offset-unit));
    }

    .lu-desktop-grid:has(.lu-gallery-item:hover) .lu-gallery-column:first-child,
    .lu-desktop-grid:has(.lu-gallery-item:hover) .lu-gallery-column:last-child {
      margin-top: calc(2 * var(--offset-unit));
    }

    .lu-desktop-grid:has(.lu-gallery-item:hover) .lu-gallery-column:nth-child(2),
    .lu-desktop-grid:has(.lu-gallery-item:hover) .lu-gallery-column:nth-last-child(2) {
      margin-top: 0;
    }

    .lu-gallery-item {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      border-radius: 6px;
    }

    .lu-gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    .lu-gallery-item:hover img {
      transform: scale(1.05);
    }

    .lu-gallery-placeholder {
      width: 100%;
      height: 100%;
      background-color: #f3f3f3;
    }

    @media screen and (max-width: 767px) {
      .lu-image-gallery {
        padding: 40px 0;
      }

      .lu-gallery-grid {
        --offset-unit: 16px;
        gap: 8px;
      }

      .lu-gallery-column {
        gap: 8px;
      }

      .lu-desktop-grid {
        display: none;
      }

      .lu-mobile-grid {
        display: flex;
      }

      .lu-gallery-heading {
        font-size: 1.4rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, ::before, ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;
let o = m;
u([
  c({ type: String })
], o.prototype, "position");
u([
  c({ type: Object })
], o.prototype, "config");
u([
  c({ type: Object })
], o.prototype, "theme");
typeof o < "u" && o.registerSallaComponent("salla-instagram-gallery");
export {
  o as default
};
