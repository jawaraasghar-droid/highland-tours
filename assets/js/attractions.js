(function () {
  function toCamel(slug) {
    return slug.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
  }

  function renderTeaser() {
    const grid = document.getElementById("attractions-teaser-grid");
    if (!grid) return;
    const items = (window.HR_ATTRACTIONS || []).slice(0, 4);
    items.forEach(function (item) {
      const card = document.createElement("a");
      card.className = "card reveal";
      card.href = "attractions.html#attraction-" + item.slug;

      const frame = window.HR_buildMediaFrame(item.image, item.name, item.name);
      card.appendChild(frame);

      const body = document.createElement("div");
      body.className = "card-body";
      const h4 = document.createElement("h4");
      h4.style.margin = "0";
      h4.textContent = item.name;
      body.appendChild(h4);
      card.appendChild(body);

      grid.appendChild(card);
    });
  }

  function renderAccordion() {
    const container = document.getElementById("attractions-accordion");
    if (!container) return;
    const items = window.HR_ATTRACTIONS || [];

    items.forEach(function (item) {
      const wrap = document.createElement("div");
      wrap.className = "accordion-item";
      wrap.id = "attraction-" + item.slug;

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "accordion-trigger";
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", "panel-" + item.slug);

      const label = document.createElement("span");
      label.setAttribute("data-i18n", "attractions." + toCamel(item.slug) + ".name");
      label.textContent = item.name;

      const chevron = document.createElement("span");
      chevron.className = "chevron";
      chevron.setAttribute("aria-hidden", "true");
      chevron.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><path d="M6 9l6 6 6-6"></path></svg>';

      trigger.appendChild(label);
      trigger.appendChild(chevron);

      const panel = document.createElement("div");
      panel.className = "accordion-panel";
      panel.id = "panel-" + item.slug;
      panel.hidden = true;

      const frame = window.HR_buildMediaFrame(item.image, item.name, item.name);
      const textWrap = document.createElement("div");
      const blurb = document.createElement("p");
      blurb.setAttribute("data-i18n", "attractions." + toCamel(item.slug) + ".blurb");
      blurb.textContent = item.blurb;
      textWrap.appendChild(blurb);

      panel.appendChild(frame);
      panel.appendChild(textWrap);

      trigger.addEventListener("click", function () {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        container.querySelectorAll(".accordion-trigger").forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
        });
        container.querySelectorAll(".accordion-panel").forEach(function (p) {
          p.hidden = true;
        });
        if (!isOpen) {
          trigger.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });

      wrap.appendChild(trigger);
      wrap.appendChild(panel);
      container.appendChild(wrap);
    });

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const trigger = target.querySelector(".accordion-trigger");
        if (trigger) trigger.click();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderTeaser();
    renderAccordion();
  });
})();
