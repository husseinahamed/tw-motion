import { LitElement as h, css as b, html as n } from "lit";
import { property as l } from "lit/decorators.js";
var m = Object.defineProperty, d = (p, o, e, s) => {
  for (var t = void 0, i = p.length - 1, a; i >= 0; i--)
    (a = p[i]) && (t = a(o, e, t) || t);
  return t && m(o, e, t), t;
};
const c = class c extends h {
  constructor() {
    super(...arguments), this.sectionId = "default", this.activeIndex = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.startAutoplay();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopAutoplay();
  }
  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      var e;
      const o = ((e = this.config) == null ? void 0 : e.all_categories) || [];
      o.length > 0 && (this.activeIndex = (this.activeIndex + 1) % o.length);
    }, 2500);
  }
  stopAutoplay() {
    this.autoplayTimer && clearInterval(this.autoplayTimer);
  }
  render() {
    var s;
    const o = ((s = this.config) == null ? void 0 : s.all_categories) || [], e = (t, i = "ar") => typeof t == "string" ? t : t && typeof t == "object" && (t[i] || t.ar || t.en) || "";
    return n`
      <section id="main-banner" class="dl-main-banner relative overflow-hidden" section-id="${this.sectionId}">
        
        <div 
          class="swiper mainSwiper overflow-hidden"
          @mouseenter="${() => this.stopAutoplay()}"
          @mouseleave="${() => this.startAutoplay()}"
        >
          <div class="swiper-wrapper">
            ${o.map((t, i) => n`
              <div class="swiper-slide relative ${i === this.activeIndex ? "active" : ""}">
                <div class="cc-gradient"></div>
                <img class="w-full h-full" src="${t.imgCatebanner}" alt="${e(t.catName)}" />
                <div class="text-wrapper absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-[9]">
                  <p class="text-lg md:text-2xl font-bold text-text-secondary line-clamp-3 text-center">
                    ${e(t.desCate)}
                  </p>
                </div>
              </div>
            `)}
          </div>
        </div>

        <!-- Thumbnails -->
        <div class="swiper thumbsSwiper overflow-hidden">
          <div class="swiper-wrapper">
            ${o.map((t, i) => {
      const a = i === this.activeIndex;
      return n`
                <div class="swiper-slide">
                  <div 
                    class="mood-card group/btn relative w-40 h-40 rounded-full border border-white/30 hover:border-white/60 bg-black/20 hover:bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden ${a ? "active" : ""}" 
                    role="button"
                    @mouseenter="${() => {
        this.stopAutoplay(), this.activeIndex = i;
      }}"
                    @mouseleave="${() => this.startAutoplay()}"
                  >
                    <div class="glow-ring absolute inset-0 rounded-full border border-transparent transition-all duration-700 ease-out group-hover/btn:border-white/60 group-hover/btn:opacity-100 group-hover/btn:scale-110"></div>
                    
                    <img class="card-image absolute inset-0 rounded-full w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover/btn:opacity-100" src="${t.imgCate}" alt="${e(t.catName)}" />
                    
                    <div class="card-content relative z-10 text-center transition-all duration-700 group-hover/btn:opacity-0">
                      <span class="label text-lg md:text-2xl font-bold uppercase tracking-widest text-text-secondary">
                        ${e(t.catName)}
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
};
c.styles = b`
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
      box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.2);
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
      font-family: 'Marhey', sans-serif;
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
      background: linear-gradient(to bottom, rgba(14,14,14,0.6) 0%, transparent 40%, rgba(14,14,14,0.9) 100%);
      z-index: 1;
    }
  `;
let r = c;
d([
  l({ type: String })
], r.prototype, "sectionId");
d([
  l({ type: Object })
], r.prototype, "config");
d([
  l({ type: Number })
], r.prototype, "activeIndex");
typeof r < "u" && r.registerSallaComponent("salla-main_banner");
export {
  r as default
};
