/* Viral Dead Turnstile + Tracking (vanilla JS)
   - Supports carousels for: TikTok embeds, Instagram embeds, Blog posts (cards)
   - Auto-rotate, pause on hover, dots + prev/next, keyboard arrows
   - Tracking:
      * outbound clicks get UTM params appended (if configured)
      * click events sent via navigator.sendBeacon to /api/track (optional)
      * falls back to console if endpoint missing
*/

(function () {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function safeUrl(url) {
    try { return new URL(url, window.location.origin); } catch { return null; }
  }

  function appendUTM(href, utm) {
    const u = safeUrl(href);
    if (!u) return href;
    const params = u.searchParams;
    Object.entries(utm || {}).forEach(([k,v]) => { if (v) params.set(k, v); });
    u.search = params.toString();
    return u.toString();
  }

  function beacon(payload) {
    try {
      const endpoint = (window.VD_TRACKING && window.VD_TRACKING.endpoint) || "/api/track";
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        const ok = navigator.sendBeacon(endpoint, new Blob([body], {type:"application/json"}));
        if (!ok) console.log("Tracking beacon failed:", payload);
      } else {
        fetch(endpoint, {method:"POST", headers:{"Content-Type":"application/json"}, body, keepalive:true})
          .catch(()=>console.log("Tracking fetch failed:", payload));
      }
    } catch (e) {
      console.log("Tracking error:", e, payload);
    }
  }

  function trackClick(meta) {
    const payload = {
      type: "click",
      ts: new Date().toISOString(),
      page: window.location.pathname,
      ref: document.referrer || "",
      ...meta
    };
    // local fallback (useful even if endpoint is not deployed yet)
    try {
      const key = "vd_clicks";
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      arr.push(payload);
      localStorage.setItem(key, JSON.stringify(arr).slice(-200000)); // cap size
    } catch {}
    beacon(payload);
  }

  function wireOutboundTracking(root=document) {
    const utm = (window.VD_TRACKING && window.VD_TRACKING.utm) || {};
    qsa("a[data-track]", root).forEach(a => {
      a.addEventListener("click", () => {
        const dest = appendUTM(a.getAttribute("href") || "", utm);
        a.setAttribute("href", dest);
        trackClick({
          label: a.getAttribute("data-track"),
          href: dest,
          carousel: a.closest("[data-turnstile]")?.getAttribute("data-name") || ""
        });
      }, {passive:true});
    });
  }

  function setupTurnstile(root) {
    const track = qs(".ts-track", root);
    const slides = qsa(".ts-slide", root);
    const prevBtn = qs("[data-prev]", root);
    const nextBtn = qs("[data-next]", root);
    const dotsWrap = qs("[data-dots]", root);
    const intervalMs = Number(root.getAttribute("data-interval") || 5000);

    let index = 0;
    let timer = null;

    // Build dots
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.className = "ts-dot";
      b.type = "button";
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(b);
      return b;
    });

    function render() {
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
    }

    function clamp(i) {
      const n = slides.length;
      return (i % n + n) % n;
    }

    function goTo(i, userAction = false) {
      index = clamp(i);
      render();
      if (userAction) restart();
    }

    function start() {
      if (prefersReduced) return;
      stop();
      timer = setInterval(() => goTo(index + 1, false), intervalMs);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function restart() {
      stop();
      start();
    }

    prevBtn?.addEventListener("click", () => goTo(index - 1, true));
    nextBtn?.addEventListener("click", () => goTo(index + 1, true));

    // Pause on hover/focus
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    // Keyboard arrows
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(index - 1, true);
      if (e.key === "ArrowRight") goTo(index + 1, true);
    });

    renderstart: render();
    start();
  }

  async function loadJSON(path) {
    const res = await fetch(path, {cache:"no-store"});
    if (!res.ok) throw new Error("Failed " + path);
    return await res.json();
  }

  function buildTikTokSlide(item) {
    // TikTok embed: simplest is iframe to /embed URL. Many TikTok URLs are share URLs; user should provide embed_url.
    const embed = item.embed_url || item.url || "";
    const caption = item.caption || "";
    const hashtags = (item.hashtags || []).join(" ");
    const img = item.image || "/assets/placeholder.jpg";
    const cta = item.cta_url || item.url || "#";

    return `
      <div class="ts-slide">
        <div class="ts-media">
          ${embed ? `<iframe src="${embed}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; fullscreen" title="TikTok"></iframe>`
                  : `<img src="${img}" alt="">`}
          <div class="ts-meta">
            <h3>${escapeHtml(item.title || "TikTok clip")}</h3>
            <p>${escapeHtml(caption)}</p>
            <p class="ts-tags">${escapeHtml(hashtags)}</p>
            <a data-track="tiktok_cta" href="${cta}" class="ts-btnlink">Go →</a>
          </div>
        </div>
      </div>
    `;
  }

  function buildInstagramSlide(item) {
    // Instagram embeds are commonly via blockquote + script; iframes also work with /embed.
    const embed = item.embed_url || item.url || "";
    const caption = item.caption || "";
    const hashtags = (item.hashtags || []).join(" ");
    const img = item.image || "/assets/placeholder.jpg";
    const cta = item.cta_url || item.url || "#";

    return `
      <div class="ts-slide">
        <div class="ts-media">
          ${embed ? `<iframe src="${embed}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; fullscreen" title="Instagram"></iframe>`
                  : `<img src="${img}" alt="">`}
          <div class="ts-meta">
            <h3>${escapeHtml(item.title || "Instagram post")}</h3>
            <p>${escapeHtml(caption)}</p>
            <p class="ts-tags">${escapeHtml(hashtags)}</p>
            <a data-track="instagram_cta" href="${cta}" class="ts-btnlink">Open →</a>
          </div>
        </div>
      </div>
    `;
  }

  function buildBlogSlide(item) {
    const img = item.image || "/assets/placeholder.jpg";
    const hashtags = (item.hashtags || []).join(" ");
    const url = item.url || "#";
    return `
      <div class="ts-slide">
        <article class="post-card">
          <img src="${img}" alt="">
          <div class="inner">
            <div class="kicker">${escapeHtml(item.category || "Blog")}</div>
            <h3>${escapeHtml(item.title || "Post")}</h3>
            <p>${escapeHtml(item.excerpt || "")}</p>
            <p class="ts-tags">${escapeHtml(hashtags)}</p>
            <div class="row">
              <div class="meta">${escapeHtml(item.read_time || "")}</div>
              <a data-track="blog_read" class="btn" href="${url}">Read →</a>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  async function autobuild() {
    // Build carousels declared with data-autobuild="tiktok|instagram|blog"
    const nodes = qsa("[data-autobuild]");
    for (const shell of nodes) {
      const type = shell.getAttribute("data-autobuild");
      const source = shell.getAttribute("data-source");
      const track = qs(".ts-track", shell);
      if (!track || !source) continue;
      try {
        const payload = await loadJSON(source);
        const items = payload.items || [];
        if (!items.length) continue;

        const html = items.map(item => {
          if (type === "tiktok") return buildTikTokSlide(item);
          if (type === "instagram") return buildInstagramSlide(item);
          return buildBlogSlide(item);
        }).join("\n");

        track.innerHTML = html;
        // rebuild dots fresh
        const dotsWrap = qs("[data-dots]", shell);
        if (dotsWrap) dotsWrap.innerHTML = "";
        // attach turnstile
        setupTurnstile(shell);
        wireOutboundTracking(shell);
      } catch (e) {
        console.log("Autobuild failed for", type, source, e);
      }
    }
  }

  window.VDTurnstile = {
    trackClick,
    wireOutboundTracking,
  };

  document.addEventListener("DOMContentLoaded", () => {
    autobuild().then(() => {
      // also init any static turnstiles (no autobuild)
      qsa("[data-turnstile]:not([data-autobuild])").forEach(setupTurnstile);
      wireOutboundTracking(document);
    });
  });
})();