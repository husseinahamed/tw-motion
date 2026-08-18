import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { localizedString } from "../../utils/localizedString";

export default class InstagramGallery extends LitElement {
  @property({ type: String }) position: string = "default";
  @property({ type: Object }) config?: {
    is_color: boolean;
    color_bg: string;
    color_title: string;
    color_btn_bg: string;
    color_btn_text: string;
    main_title?: string;
    btn_text?: string;
    btn_url?: string;
    images_collection?: Array<{
      image: string;
      image_url?: string;
    }>;
  };
  @property({ type: Object }) theme?: {
    settings: {
      get(key: string): any;
    };
  };

  // Use central localizedString helper

  static styles = css`
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

    .lu-desktop-grid:has(.lu-gallery-item:hover)
      .lu-gallery-column:nth-child(2),
    .lu-desktop-grid:has(.lu-gallery-item:hover)
      .lu-gallery-column:nth-last-child(2) {
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
      *,
      ::before,
      ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;

  render() {
    if (!this.config) return html``;

    const comp = this.config;
    const sectionId = `gallery-${this.position}`;

    // إعداد متغيرات الألوان الديناميكية حسب رغبة المستخدم
    const inlineStyles = comp.is_color
      ? `--gallery-bg: ${comp.color_bg || "#fff"}; --gallery-heading-color: ${comp.color_title || "#111"}; --gallery-btn-bg: ${comp.color_btn_bg || "#111"}; --gallery-btn-text: ${comp.color_btn_text || "#fff"};`
      : "";

    const images = comp.images_collection || [];
    const desktopColumns = 5;
    const mobileColumns = 2;

    return html`
      <section
        class="lu-image-gallery ${comp.is_color ? "is-custom-color" : ""}"
        id="${sectionId}"
        style="${inlineStyles}"
      >
        <div class="lu-container">
          <div class="lu-gallery-header">
            ${
              comp.main_title
                ? html`
                    <h2 class="lu-gallery-heading">
                      ${localizedString(comp.main_title)}
                    </h2>
                  `
                : ""
            }
            ${
              comp.btn_text
                ? html`
                    <a
                      href="${comp.btn_url || "#"}"
                      class="lu-gallery-btn"
                      target="_blank"
                      aria-label="${localizedString(comp.btn_text)}"
                    >
                      ${localizedString(comp.btn_text)}
                    </a>
                  `
                : ""
            }
          </div>

          ${
            images.length > 0
              ? html`
                  <!-- نسخة الديسكتوب -->
                  <div class="lu-gallery-grid lu-desktop-grid">
                    ${Array.from({ length: desktopColumns }).map(
                (_, col: number) => {
                  const distance = Math.min(col, desktopColumns - 1 - col);
                  return html`
                    <div
                      class="lu-gallery-column"
                      style="--col-distance: ${distance};"
                    >
                      ${images.map((item: any, index: number) => {
                      if (index % desktopColumns === col) {
                        return this.renderGalleryItem(item, localizedString(comp.main_title));
                      }
                      return "";
                    })}
                    </div>
                  `;
                },
              )}
                  </div>

                  <!-- نسخة الموبايل -->
                  <div class="lu-gallery-grid lu-mobile-grid">
                    ${Array.from({ length: mobileColumns }).map(
                (_, col: number) => {
                  const distance = Math.min(col, mobileColumns - 1 - col);
                  return html`
                    <div
                      class="lu-gallery-column"
                      style="--col-distance: ${distance};"
                    >
                      ${images.map((item: any, index: number) => {
                      if (index % mobileColumns === col) {
                        return this.renderGalleryItem(item, localizedString(comp.main_title));
                      }
                      return "";
                    })}
                    </div>
                  `;
                },
              )}
                  </div>
                `
              : ""
          }
        </div>
      </section>
    `;
  }

  renderGalleryItem(
    item: { image: string; image_url?: string },
    mainTitle?: string,
  ) {
    if (!item.image) {
      return html`
        <div class="lu-gallery-item">
          <div class="lu-gallery-placeholder"></div>
        </div>
      `;
    }

    if (item.image_url && item.image_url !== "#") {
      return html`
        <a
          href="${item.image_url}"
          class="lu-gallery-item"
          target="_blank"
          aria-label="Gallery image link"
        >
          <img
            src="${item.image}"
            alt="${mainTitle || "Gallery Image"}"
            loading="lazy"
          />
        </a>
      `;
    }

    return html`
      <div class="lu-gallery-item">
        <img
          src="${item.image}"
          alt="${mainTitle || "Gallery Image"}"
          loading="lazy"
        />
      </div>
    `;
  }
}
