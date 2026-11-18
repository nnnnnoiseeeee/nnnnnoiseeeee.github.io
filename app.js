/* ==========================================================================
   KIM JIHUN — app.js
   data.js 의 내용을 화면에 렌더링하고, 라이트박스·상세·노트 뷰를 처리합니다.
   ========================================================================== */

(function () {
  "use strict";

  var DATA = window.SITE || { profile: {}, projects: [], notes: [] };
  var P = DATA.profile || {};
  var PROJECTS = (DATA.projects || []).slice();
  var NOTES = (DATA.notes || []).slice();

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     utilities
     ---------------------------------------------------------------------- */

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var lockCount = 0;
  function lockScroll(on) {
    lockCount = Math.max(0, lockCount + (on ? 1 : -1));
    document.body.classList.toggle("is-locked", lockCount > 0);
  }

  var FOCUSABLE =
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function trapTab(container, event) {
    if (event.key !== "Tab") return;
    var items = Array.prototype.filter.call(
      container.querySelectorAll(FOCUSABLE),
      function (n) {
        return n.offsetParent !== null || n === document.activeElement;
      }
    );
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ----------------------------------------------------------------------
     profile
     ---------------------------------------------------------------------- */

  function paintProfile() {
    var intro = document.getElementById("heroIntro");
    if (intro && P.intro) intro.textContent = P.intro;

    var handle = document.getElementById("heroHandle");
    if (handle && P.instagram) {
      handle.href = P.instagram;
      handle.textContent = P.instagramHandle || P.handle || "";
    }

    var mail = document.getElementById("contactMail");
    if (mail && P.email) {
      mail.href = "mailto:" + P.email;
      mail.textContent = P.email;
    }

    var about = document.getElementById("aboutBody");
    if (about) {
      about.innerHTML = "";
      (P.about || []).forEach(function (text) {
        about.appendChild(el("p", null, esc(text)));
      });
    }

    var services = document.getElementById("services");
    if (services) {
      services.innerHTML = "";
      (P.services || []).forEach(function (item) {
        services.appendChild(el("dt", null, esc(item.key)));
        services.appendChild(el("dd", null, esc(item.value)));
      });
    }

    var links = document.getElementById("contactLinks");
    if (links) {
      links.innerHTML = "";
      if (P.email) {
        var a = el("a", null, "Email");
        a.href = "mailto:" + P.email;
        links.appendChild(a);
      }
      if (P.instagram) {
        var b = el("a", null, "Instagram " + esc(P.instagramHandle || ""));
        b.href = P.instagram;
        b.target = "_blank";
        b.rel = "noopener";
        links.appendChild(b);
      }
      if (P.location) {
        links.appendChild(el("span", null, esc(P.location)));
      }
    }

    var menuMeta = document.getElementById("mobileMenuMeta");
    if (menuMeta) {
      menuMeta.textContent = [P.email, P.instagramHandle].filter(Boolean).join("  ·  ");
    }

    var openFig = document.querySelector(".opening");
    var openImg = document.getElementById("openingImg");
    if (openImg && DATA.opening) {
      openImg.src = DATA.opening.src;
      openImg.alt = DATA.opening.alt || "";
      if (DATA.opening.w) openImg.width = DATA.opening.w;
      if (DATA.opening.h) openImg.height = DATA.opening.h;
      document.getElementById("openingCaption").textContent = DATA.opening.caption || "";
      document.getElementById("openingYear").textContent = DATA.opening.year || "";
      if (openFig) openFig.setAttribute("data-reveal", "");
    }
  }

  /* ----------------------------------------------------------------------
     work grid
     ---------------------------------------------------------------------- */

  var LAYOUT = [
    { c: 1, s: 5, lift: 0 },
    { c: 8, s: 5, lift: 96 },
    { c: 2, s: 4, lift: 0 },
    { c: 7, s: 5, lift: 140 },
    { c: 1, s: 5, lift: 0 },
    { c: 7, s: 6, lift: 72 }
  ];

  var grid = document.getElementById("workGrid");
  var filterBar = document.getElementById("filters");
  var state = { filter: "all" };

  function categories() {
    var seen = [];
    PROJECTS.forEach(function (p) {
      if (p.category && seen.indexOf(p.category) === -1) seen.push(p.category);
    });
    return seen;
  }

  function paintFilters() {
    if (!filterBar) return;
    var cats = categories();
    filterBar.innerHTML = "";
    var all = el("button", null, "All");
    all.type = "button";
    all.dataset.filter = "all";
    all.setAttribute("role", "tab");
    all.setAttribute("aria-selected", "true");
    filterBar.appendChild(all);

    cats.forEach(function (cat) {
      var b = el("button", null, esc(cat));
      b.type = "button";
      b.dataset.filter = cat;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", "false");
      filterBar.appendChild(b);
    });

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      state.filter = btn.dataset.filter;
      Array.prototype.forEach.call(filterBar.children, function (b) {
        b.setAttribute("aria-selected", String(b === btn));
      });
      paintWork();
    });
  }

  function visibleProjects() {
    return PROJECTS.filter(function (p) {
      return state.filter === "all" || p.category === state.filter;
    });
  }

  function ratioOf(cover) {
    if (!cover || !cover.w || !cover.h) return "3 / 2";
    return cover.w + " / " + cover.h;
  }

  function paintWork() {
    if (!grid) return;
    var list = visibleProjects();
    var counter = document.getElementById("workCount");
    if (counter) counter.textContent = list.length + " Project" + (list.length === 1 ? "" : "s");

    grid.innerHTML = "";
    list.forEach(function (project, i) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "work-card";
      card.dataset.project = project.id;
      card.setAttribute("aria-label", project.title + " — 자세히 보기");
      card.style.setProperty("--ratio", ratioOf(project.cover));

      card.innerHTML =
        '<span class="work-card__frame">' +
        '<img src="' + esc(project.cover.src) + '" alt="' + esc(project.cover.alt || "") +
        '" width="' + (project.cover.w || 1600) + '" height="' + (project.cover.h || 1067) +
        '" loading="' + (i < 2 ? "eager" : "lazy") + '" decoding="async">' +
        "</span>" +
        '<span class="work-card__meta">' +
        '<span class="work-card__title">' + esc(project.title) + "</span>" +
        '<span class="work-card__tag">' + esc(project.category) + " · " + esc(project.year) + "</span>" +
        "</span>" +
        '<span class="work-card__sub">' + esc(project.no) + " — " + esc(project.note || project.role || "") + "</span>";

      grid.appendChild(card);
    });

    layoutCards();
    observeNew(grid.querySelectorAll(".work-card"));
  }

  function layoutCards() {
    if (!grid) return;
    var wide = window.innerWidth > 860;
    var cards = grid.querySelectorAll(".work-card");
    Array.prototype.forEach.call(cards, function (card, i) {
      if (!wide) {
        card.style.removeProperty("--c");
        card.style.removeProperty("--s");
        card.style.removeProperty("--lift");
        return;
      }
      var pos = LAYOUT[i % LAYOUT.length];
      card.style.setProperty("--c", pos.c);
      card.style.setProperty("--s", pos.s);
      card.style.setProperty("--lift", pos.lift + "px");
    });
  }

  /* ----------------------------------------------------------------------
     notes list
     ---------------------------------------------------------------------- */

  function paintNotes() {
    var list = document.getElementById("notesList");
    if (!list) return;
    list.innerHTML = "";
    NOTES.forEach(function (note) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "note-row";
      btn.dataset.note = note.id;
      btn.setAttribute("aria-label", note.title + " — 글 읽기");
      btn.innerHTML =
        '<span class="note-row__date">' + esc(note.date) + "</span>" +
        "<span>" +
        '<span class="note-row__title">' + esc(note.title) + "</span>" +
        '<span class="note-row__excerpt">' + esc(note.excerpt || "") + "</span>" +
        "</span>" +
        '<span class="note-row__arrow" aria-hidden="true">↗</span>';
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  /* ----------------------------------------------------------------------
     overlays — shared open/close
     ---------------------------------------------------------------------- */

  var openStack = [];

  function openOverlay(node, opts) {
    opts = opts || {};
    node.hidden = false;
    node.classList.add("is-open");
    lockScroll(true);
    var entry = { node: node, lastFocus: document.activeElement };
    openStack.push(entry);
    var target = node.querySelector(opts.focusSelector || "[data-close-" + (opts.kind || "") + "]");
    window.setTimeout(function () {
      if (target) target.focus({ preventScroll: true });
    }, 30);
  }

  function clearHash() {
    if (location.hash.indexOf("/") > -1) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function closeOverlay(node) {
    if (!node || node.hidden) return;
    var idx = -1;
    for (var i = openStack.length - 1; i >= 0; i--) {
      if (openStack[i].node === node) { idx = i; break; }
    }
    var entry = idx > -1 ? openStack.splice(idx, 1)[0] : null;
    node.classList.remove("is-open");
    window.setTimeout(function () {
      if (!node.classList.contains("is-open")) node.hidden = true;
    }, reduceMotion ? 0 : 300);
    lockScroll(false);
    if (!openStack.length) clearHash();
    if (entry && entry.lastFocus && entry.lastFocus.focus) {
      try { entry.lastFocus.focus({ preventScroll: true }); } catch (e) {}
    }
  }

  function topOverlay() {
    return openStack.length ? openStack[openStack.length - 1].node : null;
  }

  document.addEventListener("keydown", function (e) {
    var top = topOverlay();
    if (!top) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeOverlay(top);
    } else if (e.key === "Tab") {
      trapTab(top, e);
    }
  });

  /* ----------------------------------------------------------------------
     project detail
     ---------------------------------------------------------------------- */

  var detail = document.getElementById("detail");
  var detailBody = document.getElementById("detailBody");
  var detailLabel = document.getElementById("detailLabel");
  var currentProject = null;

  function projectById(id) {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === id) return PROJECTS[i];
    }
    return null;
  }

  function paintDetail(project) {
    if (!project) return;
    currentProject = project;
    detailLabel.textContent = project.no + " — " + project.category;

    var meta = [project.date, project.role]
      .filter(Boolean)
      .map(function (v) { return "<span>" + esc(v) + "</span>"; })
      .join("");

    var images = (project.images && project.images.length ? project.images : [project.cover])
      .map(function (img, i) {
        return (
          "<figure>" +
          '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || "") +
          '" width="' + (img.w || 1600) + '" height="' + (img.h || 1067) +
          '" loading="' + (i === 0 ? "eager" : "lazy") + '" decoding="async" ' +
          'data-gallery="' + esc(project.id) + '" data-index="' + i + '">' +
          (img.caption ? "<figcaption>" + esc(img.caption) + "</figcaption>" : "") +
          "</figure>"
        );
      })
      .join("");

    var idx = PROJECTS.indexOf(project);
    var prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(idx + 1) % PROJECTS.length];

    detailBody.innerHTML =
      '<header class="detail__head">' +
      '<h2 class="detail__title">' + esc(project.title) + "</h2>" +
      '<div class="detail__meta">' + meta + "</div>" +
      "</header>" +
      '<p class="detail__desc">' + esc(project.description || "") + "</p>" +
      '<div class="detail__images">' + images + "</div>" +
      '<nav class="detail__nav" aria-label="다른 프로젝트">' +
      '<button type="button" data-prev="' + esc(prev.id) + '">← Previous<span>' + esc(prev.short || prev.title) + "</span></button>" +
      '<button type="button" data-next="' + esc(next.id) + '">Next →<span>' + esc(next.short || next.title) + "</span></button>" +
      "</nav>";

    detail.querySelector(".sheet").scrollTop = 0;
  }

  function openProject(id) {
    var project = projectById(id);
    if (!project) return;
    paintDetail(project);
    openOverlay(detail, { kind: "detail", focusSelector: "[data-close-detail]" });
    history.replaceState(null, "", "#work/" + project.id);
  }

  detail.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-detail]")) {
      closeOverlay(detail);
      return;
    }
    var navBtn = e.target.closest("[data-prev], [data-next]");
    if (navBtn) {
      var id = navBtn.dataset.prev || navBtn.dataset.next;
      paintDetail(projectById(id));
      detail.querySelector(".sheet").scrollTop = 0;
      return;
    }
    var img = e.target.closest("img[data-gallery]");
    if (img && currentProject) {
      var shots = currentProject.images && currentProject.images.length
        ? currentProject.images
        : [currentProject.cover];
      openLightbox(shots, Number(img.dataset.index) || 0, currentProject.title);
    }
  });

  /* ----------------------------------------------------------------------
     note view
     ---------------------------------------------------------------------- */

  var noteView = document.getElementById("noteView");
  var noteBody = document.getElementById("noteBody");

  function noteById(id) {
    for (var i = 0; i < NOTES.length; i++) {
      if (NOTES[i].id === id) return NOTES[i];
    }
    return null;
  }

  function openNote(id) {
    var note = noteById(id);
    if (!note) return;
    noteBody.innerHTML =
      '<p class="note-view__date">' + esc(note.date) + "</p>" +
      '<h2 class="note-view__title">' + esc(note.title) + "</h2>" +
      '<div class="note-view__body">' +
      (note.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      "</div>" +
      (note.tags && note.tags.length
        ? '<div class="note-view__tags">' +
          note.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") +
          "</div>"
        : "");
    noteView.querySelector(".sheet").scrollTop = 0;
    openOverlay(noteView, { kind: "note", focusSelector: "[data-close-note]" });
    history.replaceState(null, "", "#notes/" + note.id);
  }

  noteView.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-note]")) {
      closeOverlay(noteView);
    }
  });

  /* ----------------------------------------------------------------------
     lightbox
     ---------------------------------------------------------------------- */

  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCaption = document.getElementById("lbCaption");
  var lbCount = document.getElementById("lbCount");
  var lbPrev = lightbox.querySelector("[data-lb-prev]");
  var lbNext = lightbox.querySelector("[data-lb-next]");
  var lbState = { images: [], index: 0, title: "" };

  function renderLightbox() {
    var img = lbState.images[lbState.index];
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt || "";
    lbImg.width = img.w || 1600;
    lbImg.height = img.h || 1067;
    lbCaption.textContent = [lbState.title, img.caption].filter(Boolean).join(" — ");
    lbCount.textContent =
      lbState.index + 1 + " / " + lbState.images.length;
    var single = lbState.images.length < 2;
    lbPrev.disabled = single;
    lbNext.disabled = single;
  }

  function openLightbox(images, index, title) {
    lbState.images = images || [];
    lbState.index = Math.max(0, Math.min(index || 0, lbState.images.length - 1));
    lbState.title = title || "";
    renderLightbox();
    openOverlay(lightbox, { kind: "lightbox", focusSelector: "[data-close-lightbox]" });
  }

  function stepLightbox(delta) {
    if (lbState.images.length < 2) return;
    lbState.index = (lbState.index + delta + lbState.images.length) % lbState.images.length;
    renderLightbox();
  }

  lightbox.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-lightbox]") || e.target === lightbox) {
      closeOverlay(lightbox);
      return;
    }
    if (e.target.closest("[data-lb-prev]")) { stepLightbox(-1); return; }
    if (e.target.closest("[data-lb-next]")) { stepLightbox(1); return; }
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); stepLightbox(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); stepLightbox(1); }
  });

  var touchX = null;
  lightbox.addEventListener("touchstart", function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (touchX == null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 44) stepLightbox(dx > 0 ? -1 : 1);
    touchX = null;
  }, { passive: true });

  /* ----------------------------------------------------------------------
     delegated clicks for cards & notes
     ---------------------------------------------------------------------- */

  document.addEventListener("click", function (e) {
    var card = e.target.closest(".work-card");
    if (card) {
      openProject(card.dataset.project);
      return;
    }
    var note = e.target.closest(".note-row");
    if (note) openNote(note.dataset.note);
  });

  /* ----------------------------------------------------------------------
     reveal on scroll
     ---------------------------------------------------------------------- */

  var revealObserver = null;
  if ("IntersectionObserver" in window && !reduceMotion) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
  }

  function observeNew(nodes) {
    Array.prototype.forEach.call(nodes, function (node, i) {
      if (!node.hasAttribute("data-reveal")) node.setAttribute("data-reveal", "");
      var delay = node.getAttribute("data-reveal-delay");
      if (delay) node.style.transitionDelay = delay + "ms";
      else if (i < 6) node.style.transitionDelay = Math.min(i * 60, 300) + "ms";

      // 이미 화면 안에 있는 요소는 스크롤 관찰을 기다리지 않고 바로 나타냅니다.
      var rect = node.getBoundingClientRect();
      var inView = rect.top < window.innerHeight - 8 && rect.bottom > 0;
      if (inView) {
        window.requestAnimationFrame(function () { node.classList.add("is-in"); });
      } else if (revealObserver) {
        revealObserver.observe(node);
      } else {
        node.classList.add("is-in");
      }
    });
  }

  function initReveal() {
    observeNew(document.querySelectorAll("[data-reveal]"));
  }

  /* ----------------------------------------------------------------------
     nav
     ---------------------------------------------------------------------- */

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function setMenu(open) {
    if (!mobileMenu || !nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    if (open) {
      mobileMenu.hidden = false;
      window.requestAnimationFrame(function () { mobileMenu.classList.add("is-open"); });
      lockScroll(true);
    } else {
      mobileMenu.classList.remove("is-open");
      window.setTimeout(function () { mobileMenu.hidden = true; }, reduceMotion ? 0 : 260);
      lockScroll(false);
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  var sections = ["work", "notes", "about", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          Array.prototype.forEach.call(
            document.querySelectorAll(".nav__links a"),
            function (a) {
              a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
            }
          );
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ----------------------------------------------------------------------
     misc
     ---------------------------------------------------------------------- */

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(layoutCards, 120);
  });

  window.addEventListener("scroll", onScroll, { passive: true });

  // deep link (#work/areuban, #notes/note-white)
  function handleHash() {
    var hash = location.hash.replace(/^#/, "");
    if (!hash) return;
    var parts = hash.split("/");
    if (parts[0] === "work" && parts[1]) openProject(parts[1]);
    else if (parts[0] === "notes" && parts[1]) openNote(parts[1]);
  }

  /* ----------------------------------------------------------------------
     boot
     ---------------------------------------------------------------------- */

  paintProfile();
  paintFilters();
  paintWork();
  paintNotes();
  initReveal();
  onScroll();
  handleHash();
})();
