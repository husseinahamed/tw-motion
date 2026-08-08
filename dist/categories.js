import { LitElement as b, css as f, html as i } from "lit";
import { property as h } from "lit/decorators.js";
var m = Object.defineProperty, c = (g, t, s, v) => {
  for (var e = void 0, n = g.length - 1, o; n >= 0; n--)
    (o = g[n]) && (e = o(t, s, e) || e);
  return e && m(t, s, e), e;
};
const u = class u extends b {
  constructor() {
    super(...arguments), this.position = "default", this.leftIndex = 0, this.rightIndex = 0, this.slides = [1, 2, 3];
  }
  connectedCallback() {
    super.connectedCallback(), this.startAutoplay();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopAutoplay();
  }
  startAutoplay() {
    var t;
    if ((t = this.config) != null && t.ds_autoplay) {
      const s = (this.config.ds_autoplay_speed || 4) * 1e3;
      this.autoplayTimer = setInterval(() => {
        this.goNext();
      }, s);
    }
  }
  stopAutoplay() {
    this.autoplayTimer && clearInterval(this.autoplayTimer);
  }
  goNext() {
    this.leftIndex = (this.leftIndex + 1) % this.slides.length, this.rightIndex = (this.rightIndex + 1) % this.slides.length;
  }
  goPrev() {
    this.leftIndex = (this.leftIndex - 1 + this.slides.length) % this.slides.length, this.rightIndex = (this.rightIndex - 1 + this.slides.length) % this.slides.length;
  }
  renderSide(t) {
    var n, o;
    const s = this.config || {}, v = t === "left" ? this.leftIndex : this.rightIndex, e = (o = (n = this.theme) == null ? void 0 : n.settings) == null ? void 0 : o.get("animation_repeat");
    return i`
      <div class="ds-inner overflow-hidden" 
           data-sal="fade"
           data-sal-duration="600"
           data-sal-delay="150"
           data-sal-easing="ease-out-cubic"
           ?data-sal-repeat="${e}">

        <!-- Background Slides -->
        <div class="swiper ds-bg" id="ds-bg-${t}-${this.position}">
          <div class="swiper-wrapper">
            ${this.slides.map((l, r) => {
      const a = s[`ds_${t}_${l}_bg`], p = s[`ds_${t}_${l}_label`];
      return a ? i`
                <div class="swiper-slide slide-item ${r === v ? "active" : ""}">
                  <div class="ds-ratio">
                    <img src="${a}" alt="${p || ""}" loading="lazy">
                  </div>
                </div>
              ` : i``;
    })}
          </div>
        </div>

        <!-- Thumbnails Slides -->
        <div class="swiper ds-thumbs" id="ds-thumbs-${t}-${this.position}" 
             data-sal="zoom-in"
             data-sal-duration="800"
             data-sal-delay="150"
             data-sal-easing="ease-out-back"
             ?data-sal-repeat="${e}">
          <div class="swiper-wrapper">
            ${this.slides.map((l, r) => {
      const a = s[`ds_${t}_${l}_thumb`], p = s[`ds_${t}_${l}_link`], x = s[`ds_${t}_${l}_label`];
      return a ? i`
                <div class="swiper-slide slide-item ${r === v ? "active" : ""}">
                  <div class="ds-ratio">
                    ${p && p !== "#" ? i`
                      <a class="ds-thumb-link" href="${p}">
                        <img src="${a}" alt="${x || ""}" loading="lazy">
                      </a>
                    ` : i`
                      <img src="${a}" alt="${x || ""}" loading="lazy">
                    `}
                  </div>
                </div>
              ` : i``;
    })}
          </div>
        </div>

        <!-- Text Slides -->
        <div class="ds-vertical-text">
          <div class="swiper ds-text" id="ds-text-${t}-${this.position}">
            <div class="swiper-wrapper">
              ${this.slides.map((l, r) => {
      const a = s[`ds_${t}_${l}_label`];
      return a ? i`
                  <div class="swiper-slide slide-item ${r === v ? "active" : ""}">
                    <h2 data-sal="slide-up"
                        data-sal-duration="700"
                        data-sal-delay="300"
                        data-sal-easing="ease-out-cubic"
                        ?data-sal-repeat="${e}" 
                        class="ds-label">${a}</h2>
                  </div>
                ` : i``;
    })}
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="ds-nav ds-nav--${t}" 
             data-sal="fade"
             data-sal-duration="600"
             data-sal-delay="450"
             data-sal-easing="ease-out-cubic"
             ?data-sal-repeat="${e}">
          <button type="button" class="ds-prev" @click="${() => this.goPrev()}">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
              <path d="M0.304702 6.58676C-0.10157 6.20323 -0.10157 5.58037 0.304702 5.19684L5.50499 0.287648C5.91127 -0.0958827 6.57105 -0.0958827 6.97732 0.287648C7.3836 0.671179 7.3836 1.29403 6.97732 1.67756L3.54838 4.91149H13.5199C14.0952 4.91149 14.56 5.35025 14.56 5.89333C14.56 6.43641 14.0952 6.87517 13.5199 6.87517H3.55163L6.97407 10.1091C7.38035 10.4926 7.38035 11.1155 6.97407 11.499C6.5678 11.8825 5.90801 11.8825 5.50174 11.499L0.301452 6.58983L0.304702 6.58676Z" fill="currentColor"/>
            </svg>
          </button>
          <button type="button" class="ds-next" @click="${() => this.goNext()}">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
              <path d="M14.2553 6.58676C14.6616 6.20323 14.6616 5.58037 14.2553 5.19684L9.05501 0.287648C8.64873 -0.0958827 7.98895 -0.0958827 7.58267 0.287648C7.1764 0.671179 7.1764 1.29403 7.58267 1.67756L11.0116 4.91149H1.04006C0.464776 4.91149 0 5.35025 0 5.89333C0 6.43641 0.464776 6.87517 1.04006 6.87517H11.0084L7.58592 10.1091C7.17965 10.4926 7.17965 11.1155 7.58592 11.499C7.9922 11.8825 8.65198 11.8825 9.05826 11.499L14.2585 6.58983L14.2553 6.58676Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

      </div>
    `;
  }
  render() {
    return i`
      <section
        section-id="${this.position}"
        id="ds-showcase-${this.position}"
        class="ds-showcase"
        @mouseenter="${() => this.stopAutoplay()}"
        @mouseleave="${() => this.startAutoplay()}"
      >
        <div class="ds-control">
          <div class="ds-columns">
            ${this.renderSide("left")}
            ${this.renderSide("right")}
          </div>
        </div>
      </section>
    `;
  }
};
u.styles = f`
    :host {
      display: block;
      width: 100%;
    }

    .ds-showcase {
      position: relative;
      width: 100%;
      padding-block: 20px;
    }

    .ds-columns {
      display: flex;
      gap: 0;
    }

    .ds-inner {
      position: relative;
      flex: 1 1 50%;
      min-width: 0;
      overflow: hidden;
    }

    .ds-bg,
    .ds-thumbs,
    .ds-text {
      width: 100%;
    }

    .ds-bg {
      position: relative;
    }

    .ds-ratio {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
    }

    .ds-ratio img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .ds-bg .ds-ratio img {
      filter: blur(6px);
      transform: scale(1.08);
    }

    .ds-thumbs {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 280px;
      z-index: 2;
      box-shadow: 0 10px 30px rgba(0,0,0,.3);
      border-radius: 8px;
    }

    .ds-thumbs .ds-ratio {
      border-radius: 8px;
    }

    .ds-vertical-text {
      position: absolute;
      bottom: 24px;
      right: 40%;
      z-index: 2;
      height: 70px;
      overflow: hidden;
    }

    .ds-text {
      height: 70px;
    }

    .ds-label {
      color: var(--text-secondary, #fff);
      font-size: 1.6rem;
      font-weight: 500;
      text-shadow: 0 2px 10px rgba(0,0,0,.4);
      margin: 0;
    }

    .ds-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 3;
      display: flex;
    }

    .ds-nav--left {
      inset-inline-start: 24px;
    }

    .ds-nav--right {
      inset-inline-end: 24px;
    }

    .ds-nav--left .ds-next,
    .ds-nav--right .ds-prev {
      display: none;
    }

    .ds-prev,
    .ds-next {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,.25);
      backdrop-filter: blur(4px);
      color: var(--text-secondary, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background .3s ease;
      transform: rotate(180deg);
    }

    .ds-prev:hover,
    .ds-next:hover {
      background: var(--color-primary);
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }

    @media (max-width: 768px) {
      .ds-columns {
        flex-direction: column;
      }
      .ds-thumbs {
        width: 160px;
      }
      .ds-vertical-text {
        inset-inline-start: 14px;
        bottom: 14px;
      }
      .ds-label {
        font-size: 1.1rem;
      }
      .ds-nav--left {
        inset-inline-start: 12px;
      }
      .ds-nav--right {
        inset-inline-end: 12px;
      }
      .ds-prev,
      .ds-next {
        width: 36px;
        height: 36px;
        transform: rotate(180deg);
      }
    }

    .slide-item {
      display: none;
    }
    .slide-item.active {
      display: block;
    }
  `;
let d = u;
c([
  h({ type: String })
], d.prototype, "position");
c([
  h({ type: Object })
], d.prototype, "config");
c([
  h({ type: Object })
], d.prototype, "theme");
c([
  h({ type: Number })
], d.prototype, "leftIndex");
c([
  h({ type: Number })
], d.prototype, "rightIndex");
typeof d < "u" && d.registerSallaComponent("salla-categories");
export {
  d as default
};
