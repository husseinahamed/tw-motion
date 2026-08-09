import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class MainBanner extends LitElement {
  @property({ type: String }) sectionId: string = "default";
  @property({ type: Object }) config?: {
    all_categories?: Array<{
      imgCatebanner: string;
      desCate: string;
      imgCate: string;
      catName: string;
    }>;
  };

  @property({ type: Number }) private activeIndex: number = 0;
  private autoplayTimer?: any;

  connectedCallback() {
    super.connectedCallback();
    this.startAutoplay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      const categories = this.config?.all_categories || [];
      if (categories.length > 0) {
        this.activeIndex = (this.activeIndex + 1) % categories.length;
      }
    }, 2500);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .dl-main-banner {
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    .mainSwiper {
      width: 100%;
      height: 95vh;
      position: relative;
      overflow: hidden;
    }

    .swiper-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
    }

    .swiper-slide {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      pointer-events: none;
    }

    .swiper-slide.active {
      opacity: 1;
      pointer-events: auto;
    }

    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .text-wrapper {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -25%);
      z-index: 9;
    }

    .text-lg {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    @media (min-width: 768px) {
      .md\\:text-2xl {
        font-size: 1.5rem;
        line-height: 2rem;
      }
    }

    .font-bold {
      font-weight: 700;
    }

    .text-text-secondary {
      color: var(--text-secondary, #fff);
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .text-center {
      text-align: center;
    }

    .thumbsSwiper {
      height: fit-content;
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      margin: auto;
      padding: 20px 0;
      z-index: 10;
      display: flex;
      gap: 20px;
    }

    .thumbsSwiper .swiper-slide {
      position: relative;
      height: auto;
      width: auto !important;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      opacity: 1;
    }

    .mood-card {
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05);
      width: 130px;
      height: 130px;
      position: relative;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.5s ease;
      cursor: pointer;
      overflow: hidden;
    }

    .mood-card:hover {
      border-color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .mood-card {
        width: 80px;
        height: 80px;
      }
    }

    .glow-ring {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      border: 1px solid transparent;
      transition: all 0.7s ease-out;
      box-shadow: inset 0 0 30px rgba(255, 255, 255, 0);
    }

    .mood-card:hover .glow-ring,
    .mood-card.active .glow-ring {
      border-color: rgba(255, 255, 255, 0.6);
      opacity: 1;
      transform: scale(1.1);
      box-shadow:
        inset 0 0 30px rgba(255, 255, 255, 0.2),
        0 0 30px rgba(255, 255, 255, 0.2);
    }

    .card-image {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.7s ease;
      z-index: 0;
    }

    .mood-card:hover .card-image,
    .mood-card.active .card-image {
      opacity: 1;
    }

    .card-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      transition: all 0.7s ease;
    }

    .mood-card:hover .card-content,
    .mood-card.active .card-content {
      opacity: 0;
    }

    .label {
      font-family: "Marhey", sans-serif;
      display: block;
      font-size: 1.125rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-secondary, #fff);
    }

    @media (min-width: 768px) {
      .label {
        font-size: 1.5rem;
      }
    }

    .cc-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(14, 14, 14, 0.6) 0%,
        transparent 40%,
        rgba(14, 14, 14, 0.9) 100%
      );
      z-index: 1;
    }
  `;

  render() {
    const categories = this.config?.all_categories || [];

    // Helper to get localized text
    const getLocalizedText = (value: any, key: string = "ar") => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object") {
        return value[key] || value["ar"] || value["en"] || "";
      }
      return "";
    };

    return html`
      <section
        id="main-banner"
        class="dl-main-banner relative overflow-hidden"
        section-id="${this.sectionId}"
      >
        <div
          class="swiper mainSwiper overflow-hidden"
          @mouseenter="${() => this.stopAutoplay()}"
          @mouseleave="${() => this.startAutoplay()}"
        >
          <div class="swiper-wrapper">
            ${categories.map(
              (category: any, index: number) => html`
                <div
                  class="swiper-slide relative ${index === this.activeIndex ? "active" : ""}"
                >
                  <div class="cc-gradient"></div>
                  <img
                    class="w-full h-full"
                    src="${category.imgCatebanner}"
                    alt="${getLocalizedText(category.catName)}"
                  />
                  <div
                    class="text-wrapper absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-[9]"
                  >
                    <p
                      class="text-lg md:text-2xl font-bold text-text-secondary line-clamp-3 text-center"
                    >
                      ${getLocalizedText(category.desCate)}
                    </p>
                  </div>
                </div>
              `,
            )}
          </div>
        </div>

        <!-- Thumbnails -->
        <div class="swiper thumbsSwiper overflow-hidden">
          <div class="swiper-wrapper">
            ${categories.map((category: any, index: number) => {
              const isActive = index === this.activeIndex;
              return html`
                <div class="swiper-slide">
                  <div
                    class="mood-card group/btn relative w-40 h-40 rounded-full border border-white/30 hover:border-white/60 bg-black/20 hover:bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden ${isActive ? "active" : ""}"
                    role="button"
                    @mouseenter="${() => {
                      this.stopAutoplay();
                      this.activeIndex = index;
                    }}"
                    @mouseleave="${() => this.startAutoplay()}"
                  >
                    <div
                      class="glow-ring absolute inset-0 rounded-full border border-transparent transition-all duration-700 ease-out group-hover/btn:border-white/60 group-hover/btn:opacity-100 group-hover/btn:scale-110"
                    ></div>

                    <img
                      class="card-image absolute inset-0 rounded-full w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover/btn:opacity-100"
                      src="${category.imgCate}"
                      alt="${getLocalizedText(category.catName)}"
                    />

                    <div
                      class="card-content relative z-10 text-center transition-all duration-700 group-hover/btn:opacity-0"
                    >
                      <span
                        class="label text-lg md:text-2xl font-bold uppercase tracking-widest text-text-secondary"
                      >
                        ${getLocalizedText(category.catName)}
                      </span>
                    </div>
                  </div>
                </div>
              `;
            })}
          </div>
        </div>
      </section>
    `;
  }
}
