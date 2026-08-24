/* ════════════════════════════════════════════════════════════════
   Scripts.js — Aakash Shrestha Portfolio
   All site behavior lives here: data rendering, theme, nav,
   scroll reveal, quote widget, and the "wow factor" interactions
   (tilt cards, spotlight, parallax blobs, ripple, custom cursor).
   ════════════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ── Icons ─────────────────────────────────────────────────────── */
  const ICONS = {
    github: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    linkedin: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    globe: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
    figma: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/><path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"/><path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"/><path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"/><path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"/></svg>`,
  };

 function setupLoader() {
   // Repeat visits this session (tab): loader already played once —
   // skip it entirely and show the page immediately.
   if (document.documentElement.classList.contains("no-loader")) {
     document.body.classList.add("page-entered");
     return;
   }

   document.body.classList.add("loading");
   document.fonts.ready.then(() => {
     document.body.classList.add("fonts-loaded");
   });

   window.addEventListener("load", () => {
     const delay = reduceMotion ? 300 : 2400;
     setTimeout(() => {
       const loader = document.getElementById("loader");
       loader.classList.add("hide");
       loader.setAttribute("aria-hidden", "true");
       document.body.classList.remove("loading");
       document.body.classList.add("page-entered");
       try {
         sessionStorage.setItem("loaderShown", "1");
       } catch (e) {}
     }, delay);
   });
 }
  /* ── Fetch data & render ───────────────────────────────────────── */
  async function init() {
    setupLoader();
    let data;
    try {
      const res = await fetch("data.json");
      if (!res.ok) throw new Error("no data.json");
      data = await res.json();
    } catch (e) {
      data = getFallbackData();
    }
    render(data);
    setupTheme();
    setupNav();
    setupReveal();
    setupCursor();
    setupTilt();
    setupSpotlight();
    setupParallaxBlobs();
    setupRipple();
    setupKeyboardA11y();
    document.getElementById("footer-year").textContent =
      new Date().getFullYear();
  }

  function render(d) {
    // Hero
    document.getElementById("hero-greeting").textContent =
      d.introduction.greeting;
    document.getElementById("hero-name").textContent = d.introduction.name;
    document.getElementById("hero-title").textContent = d.introduction.title;
    document.getElementById("hero-tagline").textContent =
      d.introduction.tagline;
    document.getElementById("hero-avatar").src = d.introduction.avatar;
    document.getElementById("hero-avatar").alt =
      `Portrait of ${d.introduction.name}`;
    document.getElementById("footer-name").textContent = d.introduction.name;
    document.title = `${d.introduction.name} — ${d.introduction.title}`;

    // About
    document.getElementById("about-bio").textContent = d.about.bio;
    const hlList = document.getElementById("about-highlights");
    d.about.highlights.forEach((h) => {
      const li = document.createElement("li");
      li.className = "flex items-center gap-3 text-muted";
      li.innerHTML = `<span aria-hidden="true" style="color:var(--accent)">▸</span> ${h}`;
      hlList.appendChild(li);
    });
    const cvBtn = document.getElementById("cv-btn");
    cvBtn.href = d.about.cv;
    cvBtn.setAttribute("download", "Aakash-Shrestha.pdf");

    // Skills — staggered entrance + animated indicator dot per tag
    const sg = document.getElementById("skills-grid");
    d.skills.forEach((cat, i) => {
      const div = document.createElement("div");
      div.className = "card reveal rounded-2xl p-6 tilt-card";
      div.style.setProperty("--reveal-delay", `${i * 0.08}s`);
      div.innerHTML = `
            <h3 style="color:var(--accent)" class="font-heading font-bold text-sm uppercase tracking-widest mb-4">${cat.category}</h3>
            <div class="flex flex-wrap gap-2" role="list" aria-label="${cat.category} skills">
              ${cat.items
                .map(
                  (s, j) =>
                    `<span class="skill-item" role="listitem" style="--i:${j}"><span class="skill-dot" aria-hidden="true"></span>${s}</span>`,
                )
                .join("")}
            </div>`;
      sg.appendChild(div);
    });

    // Experience
    const el = document.getElementById("exp-list");
    d.experiences.forEach((exp, i) => {
      const div = document.createElement("div");
      div.className = "reveal flex gap-6 timeline-item";
      div.innerHTML = `
            <div class="relative flex flex-col items-center" style="width:12px;flex-shrink:0;">
              <div class="timeline-dot"></div>
              ${i < d.experiences.length - 1 ? '<div class="timeline-line" style="position:absolute;top:18px;bottom:-24px;left:5px;width:2px;background:linear-gradient(to bottom,var(--accent),transparent);opacity:0.2;"></div>' : ""}
            </div>
            <div class="card rounded-2xl p-6 flex-1 mb-6">
              <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 class="font-heading font-bold text-lg">${exp.role}</h3>
                  <p style="color:var(--accent)" class="font-semibold text-sm">${exp.company}</p>
                </div>
                <span class="text-muted text-sm font-medium">${exp.period}</span>
              </div>
              <p class="text-muted text-sm leading-relaxed mb-4">${exp.description}</p>
              <div class="flex flex-wrap gap-2">${exp.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
            </div>`;
      el.appendChild(div);
    });

    // Projects
    const pg = document.getElementById("projects-grid");
    const LIMIT = 6;

    d.projects.forEach((p) => {
      const links = [];
      if (p.github)
        links.push(
          `<a href="${p.github}" target="_blank" rel="noopener" class="proj-btn" aria-label="View ${p.title} source on GitHub">${ICONS.github} GitHub</a>`,
        );
      if (p.web)
        links.push(
          `<a href="${p.web}" target="_blank" rel="noopener" class="proj-btn" aria-label="View live demo of ${p.title}">${ICONS.globe} Live</a>`,
        );
      if (p.figma)
        links.push(
          `<a href="${p.figma}" target="_blank" rel="noopener" class="proj-btn" aria-label="View ${p.title} design in Figma">${ICONS.figma} Figma</a>`,
        );
      const div = document.createElement("div");
      div.className =
        "card reveal rounded-2xl overflow-hidden flex flex-col project-card tilt-card";
      div.innerHTML = `
    <div class="proj-img-wrap h-44">
      <img src="${p.image}" alt="Screenshot of ${p.title}" class="w-full h-full object-cover" loading="lazy" decoding="async"/>
    </div>
    <div class="p-6 flex flex-col flex-1">
      <h3 class="font-heading font-bold text-lg mb-2">${p.title}</h3>
      <p class="text-muted text-sm leading-relaxed mb-4 flex-1">${p.description}</p>
      <div class="flex flex-wrap gap-2 mb-4">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="flex flex-wrap gap-2">${links.join("")}</div>
    </div>`;
      pg.appendChild(div);
    });

    // Hide cards beyond the limit initially
    const allCards = pg.querySelectorAll(".project-card");
    allCards.forEach((card, i) => {
      if (i >= LIMIT) card.style.display = "none";
    });

    // Toggle button logic
    const toggleBtn = document.getElementById("toggle-projects");
    let expanded = false;

    if (d.projects.length <= LIMIT) {
      toggleBtn.style.display = "none";
    }

    toggleBtn.addEventListener("click", () => {
      expanded = !expanded;
      allCards.forEach((card, i) => {
        if (i >= LIMIT) card.style.display = expanded ? "" : "none";
      });
      toggleBtn.textContent = expanded ? "Show Less" : "Show More";
      toggleBtn.setAttribute("aria-expanded", String(expanded));
      if (!expanded) {
        document
          .getElementById("projects")
          .scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        setupTilt(); // re-bind tilt on newly-visible cards
        setupReveal();
      }
    });

    // Social
    const sl = document.getElementById("social-links");
    d.social.forEach((s) => {
      if (s.icon === "mail") return;
      const a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "social-btn";
      a.title = s.platform;
      a.setAttribute(
        "aria-label",
        `Visit ${s.platform} profile (opens in new tab)`,
      );
      a.innerHTML = ICONS[s.icon] || "";
      sl.appendChild(a);
    });
    document.getElementById("email-btn").href =
      "mailto:aakash.cerestha90@gmail.com";

    QUOTES = d.quotes || [];
    if (QUOTES.length) renderQuote(getDailyQuote());
  }

  /* ── Theme ─────────────────────────────────────────────────────── */
  function setupTheme() {
    const saved = localStorage.getItem("theme") || "dark";
    applyTheme(saved);

    document.querySelectorAll("[data-theme]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const t = btn.dataset.theme;
        applyTheme(t);
        localStorage.setItem("theme", t);
      });
    });
  }
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll(".theme-pill").forEach((b) => {
      const active = b.dataset.theme === theme;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  }

  /* ── Nav active + mobile ───────────────────────────────────────── */
  function setupNav() {
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");

    const closeMenu = () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    };
    const toggleMenu = () => {
      const isOpen = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    };

    btn.addEventListener("click", toggleMenu);
    menu
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Active link on scroll (throttled via rAF)
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");
    let ticking = false;

    function updateActive() {
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      links.forEach((l) => {
        const isActive = l.getAttribute("href") === `#${cur}`;
        l.classList.toggle("active", isActive);
        if (isActive) l.setAttribute("aria-current", "true");
        else l.removeAttribute("aria-current");
      });
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateActive);
          ticking = true;
        }
      },
      { passive: true },
    );
    updateActive();
  }

  /* ── Reveal on scroll ──────────────────────────────────────────── */
  function setupReveal() {
    if (reduceMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("visible"));
      return;
    }
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));

    // Timeline items get an extra "in-view" pulse on their dot
    const dots = document.querySelectorAll(".timeline-item");
    if (dots.length) {
      const dotObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.querySelector(".timeline-dot")?.classList.add("pulse");
            }
          });
        },
        { threshold: 0.4 },
      );
      dots.forEach((d) => dotObs.observe(d));
    }
  }

  /* ── Daily Dev Quote ───────────────────────────────────────────── */
  let QUOTES = [];

  function getDailyQuote() {
    const day = Math.floor(Date.now() / 86400000);
    return QUOTES[day % QUOTES.length];
  }

  function renderQuote(quote) {
    const textEl = document.getElementById("quote-text");
    const authorEl = document.getElementById("quote-author");
    if (!textEl || !authorEl) return;
    textEl.classList.remove("quote-animate");
    void textEl.offsetWidth;
    textEl.classList.add("quote-animate");
    authorEl.classList.remove("quote-animate");
    void authorEl.offsetWidth;
    authorEl.classList.add("quote-animate");
    textEl.textContent = `"${quote.text}"`;
    authorEl.textContent = `— ${quote.author}`;
  }

  function newQuote() {
    if (!QUOTES.length) return;
    const current = document.getElementById("quote-text").textContent;
    let quote;
    do {
      quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    } while (`"${quote.text}"` === current && QUOTES.length > 1);
    renderQuote(quote);
  }

  function copyQuote() {
    const text = document.getElementById("quote-text").textContent;
    const author = document.getElementById("quote-author").textContent;
    const msg = document.getElementById("copy-msg");
    navigator.clipboard
      .writeText(`${text} ${author}`)
      .then(() => {
        msg.textContent = "✅ Copied to clipboard!";
        setTimeout(() => (msg.textContent = ""), 2000);
      })
      .catch(() => {
        msg.textContent = "❌ Copy failed";
        setTimeout(() => (msg.textContent = ""), 2000);
      });
  }
  // Exposed for the inline onclick handlers in index.html
  window.newQuote = newQuote;
  window.copyQuote = copyQuote;

  /* ── Cursor ────────────────────────────────────────────────────── */
  function setupCursor() {
    const cur = document.getElementById("cursor");
    if (window.matchMedia("(pointer: coarse)").matches || reduceMotion) return;
    document.addEventListener("mousemove", (e) => {
      cur.style.opacity = "1";
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    });
    document.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cur.style.width = "20px";
        cur.style.height = "20px";
        cur.style.opacity = "0.5";
      });
      el.addEventListener("mouseleave", () => {
        cur.style.width = "10px";
        cur.style.height = "10px";
        cur.style.opacity = "1";
      });
    });
  }

  /* ── Tilt effect for cards (GPU-friendly transform only) ─────────── */
  function setupTilt() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document
      .querySelectorAll(".tilt-card:not([data-tilt-bound])")
      .forEach((card) => {
        card.setAttribute("data-tilt-bound", "true");
        card.style.willChange = "transform";
        let rafId = null;
        card.addEventListener("mousemove", (e) => {
          if (rafId) return;
          rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(0)`;
            rafId = null;
          });
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
  }

  /* ── Cursor-reactive spotlight on cards ───────────────────────────── */
  function setupSpotlight() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ── Subtle parallax on the background blobs ──────────────────────── */
  function setupParallaxBlobs() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    const blobs = document.querySelectorAll(".blob");
    if (!blobs.length) return;
    let rafId = null;
    window.addEventListener("mousemove", (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const xRatio = e.clientX / window.innerWidth - 0.5;
        const yRatio = e.clientY / window.innerHeight - 0.5;
        blobs.forEach((b, i) => {
          const strength = (i + 1) * 14;
          b.style.transform = `translate3d(${xRatio * strength}px, ${yRatio * strength}px, 0)`;
        });
        rafId = null;
      });
    });
  }

  /* ── Button ripple micro-interaction ──────────────────────────────── */
  function setupRipple() {
    document
      .querySelectorAll(".cta-btn, .proj-btn, .theme-pill, .social-btn")
      .forEach((btn) => {
        btn.addEventListener("click", function (e) {
          if (reduceMotion) return;
          const rect = btn.getBoundingClientRect();
          const ripple = document.createElement("span");
          ripple.className = "ripple";
          ripple.style.left = `${e.clientX - rect.left}px`;
          ripple.style.top = `${e.clientY - rect.top}px`;
          btn.appendChild(ripple);
          ripple.addEventListener("animationend", () => ripple.remove());
        });
      });
  }

  /* ── Keyboard accessibility niceties ──────────────────────────────── */
  function setupKeyboardA11y() {
    // Only show focus rings for keyboard users
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") document.body.classList.add("kb-nav");
    });
    document.addEventListener("mousedown", () => {
      document.body.classList.remove("kb-nav");
    });
  }

  /* ── Fallback data ─────────────────────────────────────────────── */
  function getFallbackData() {
    return {
      introduction: {
        greeting: "Hello, I'm",
        name: "Aakash Shrestha",
        title: "Full Stack Developer & UI/UX Designer",
        tagline:
          "I craft digital experiences that are fast, beautiful, and human.",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alex",
      },
      about: {
        bio: "I am a BSc. CSIT student at Godawari College. I am passionate about coding and enjoy exploring new technologies in my free time. I am always eager to learn and grow, aiming to build a successful career while making a positive impact through my work. I actively look for opportunities to challenge myself and contribute meaningfully.",
        highlights: [
          "Entry-level Backend Developer",
          "Quick learner and team collaborator",
          "Open to internship and junior roles",
          "Actively seeking growth opportunities",
        ],
        cv: "docs/Aakash-Shrestha-cv.pdf",
      },
      skills: [
        {
          category: "Frontend",
          items: ["HTML", "CSS", "React", "Next", "Javascript"],
        },
        {
          category: "Backend",
          items: ["Node.js", "Express", "Nest", "MongoDB", "MySQL"],
        },
        { category: "Design", items: ["Figma"] },
        { category: "DevOps", items: ["Docker"] },
      ],
      experiences: [
        {
          role: "Backend Developer Intern",
          company: "Lunar IT Solution",
          period: "Nov 2025 — Feb 2026",
          description:
            "Worked as a Backend Developer Intern building RESTful APIs with Node.js and Express, managing data with MySQL. Assisted in authentication, debugging, and collaborating with frontend developers for seamless API integration.",
          tags: ["Reactjs", "Node.js", "Express", "MySQL"],
        },
      ],
      projects: [
        {
          title: "MERN Authentication System",
          description:
            "Built a secure authentication system using the MERN stack with user registration, login, and JWT-based authorization. Implemented protected routes and password hashing to ensure secure user access.",
          image: "images/p1.png",
          tags: ["React", "Node.js", "Express", "MongoDB"],
          github: "https://github.com/aakashstha1/MERN_Authentication.git",
          web: "https://mern-authentication-ppit.onrender.com/signup",
          figma: null,
        },
        {
          title: "EduPal-FYP",
          description:
            "Developed a full-stack e-learning platform with user authentication, course management, and interactive learning features to enhance digital education experience.",
          image: "images/p2.png",
          tags: ["React", "Node.js", "Express", "MongoDB"],
          github: "https://github.com/aakashstha1/EduPal_FYP.git",
          web: null,
          figma: null,
        },
        {
          title: "Blog-WriteWaves",
          description:
            "Created a full-stack blog platform using MySQL for database management, supporting post creation, editing, and user-based content management.",
          image: "images/p5.png",
          tags: ["Reactjs", "Node.js", "Express", "MySQL"],
          github: "https://github.com/aakashstha1/Blog_App.git",
          web: null,
          figma: null,
        },
        {
          title: "Movie Recommender",
          description:
            "Developed a movie recommendation system using Python that suggests movies based on user preferences and similarity algorithms.",
          image: "images/p6.png",
          tags: ["Python", "Streamlit", "Pandas", "Numpy"],
          github: "https://github.com/aakashstha1/movie_recommender.git",
          web: null,
          figma: null,
        },
        {
          title: "Time Capsule",
          description:
            "Built a digital time capsule application allowing users to securely store and seal text, images, audio, and video files for future access.",
          image: "images/p7.png",
          tags: ["Reactjs", "MongoDB", "Node.js", "Express"],
          github: "https://github.com/aakashstha1/Time-Capsule.git",
          web: "https://time-capsule-4fhl.onrender.com/",
          figma: null,
        },
        {
          title: "Quizzy",
          description:
            "Developed an interactive quiz game using Next.js with dynamic questions, score tracking, and responsive UI for engaging user experience.",
          image: "images/p8.png",
          tags: ["Next.js", "Open Trivia Database API", "React"],
          github: "https://github.com/aakashstha1/quizzy.git",
          web: "https://quizzy-dpxq.onrender.com",
          figma: null,
        },
      ],
      social: [
        {
          platform: "GitHub",
          url: "https://github.com/aakashstha1",
          icon: "github",
        },
        {
          platform: "LinkedIn",
          url: "https://www.linkedin.com/in/aakash-shrestha-3514b0268/",
          icon: "linkedin",
        },
        { platform: "X", url: "https://twitter.com", icon: "x" },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/aakash_shrestha1/",
          icon: "instagram",
        },
        {
          platform: "Facebook",
          url: "https://www.facebook.com/aakash.stha.3",
          icon: "facebook",
        },
        {
          platform: "Email",
          url: "mailto:aakash.cerestha90@gmail.com",
          icon: "mail",
        },
      ],
    };
  }

  document.addEventListener("DOMContentLoaded", init);
})();
