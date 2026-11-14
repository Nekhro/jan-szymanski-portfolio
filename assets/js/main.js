(() => {
  const grid = document.querySelector("#project-grid");
  if (!grid) return;
  const projects = window.PORTFOLIO_PROJECTS || [];
  const filters = document.querySelectorAll(".filter-btn");
  const allCount = document.querySelector("#all-count");
  if (allCount) allCount.textContent = String(projects.length).padStart(2, "0");

  function render(filter = "All") {
    const visible = projects.filter(p => filter === "All" || p.category === filter);
    grid.innerHTML = visible.map((p, i) => `
      <article class="project-card">
        <a class="project-thumb" href="project.html?id=${encodeURIComponent(p.id)}" aria-label="View ${p.title}">
          <img src="${p.cardImage || p.cover}" alt="${p.title}" loading="lazy">
          <span class="thumb-overlay"><span>View project</span><b>↗</b></span>
        </a>
        <div class="project-card-info">
          <div><h3>${p.title}</h3><p>${p.discipline || p.category}</p></div>
          <span class="project-number">${String(i + 1).padStart(2, "0")}</span>
        </div>
      </article>`).join("");
  }
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.toggle("selected", b === btn));
    render(btn.dataset.filter);
  }));
  render();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
})();
