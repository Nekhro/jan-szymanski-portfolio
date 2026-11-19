(() => {
  const root = document.querySelector("#project-detail");
  if (!root) return;

  const projects = window.PORTFOLIO_PROJECTS || [];
  const id = new URLSearchParams(location.search).get("id");
  const project = projects.find(p => p.id === id);

  if (!project) {
    root.innerHTML = `<a class="project-back" href="index.html#work">← Back to work</a><h1>Project not found.</h1><p class="project-loading">The project may have been renamed or removed.</p>`;
    return;
  }

  document.title = `${project.title} — Jan Szymański`;

  // Remove the cover and any repeated images from the gallery.
  const seen = new Set([project.cover]);
  const gallery = (project.gallery || []).filter(item => {
    if (!item.src || seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });

  // Keep the cover available as the first lightbox image.
  const lightboxImages = [
    { src: project.cover, caption: project.title },
    ...gallery
  ];

  root.innerHTML = `
    <a class="project-back" href="index.html#work">← Back to selected work</a>
    <div class="project-hero-title">
      <h1>${project.title}</h1>
      <div class="project-meta">${project.discipline || project.category}<br>${project.year || ""}<br>${project.role || ""}</div>
    </div>

    <button class="project-cover-trigger" data-index="0" aria-label="Enlarge cover image" style="display:block;width:100%;border:0;padding:0;background:transparent;text-align:left;cursor:zoom-in;">
      <img class="project-cover" src="${project.cover}" alt="${project.title}">
    </button>

    <div class="project-intro">
      <h2>${project.summary || ""}</h2>
      <div><p>${project.description || ""}</p></div>
    </div>

    ${gallery.length ? `<div class="project-gallery">${gallery.map((item, i) => `
      <button class="gallery-item ${gallery.length === 1 || (gallery.length > 2 && i === 0) ? "wide" : ""}" data-index="${i + 1}" aria-label="Enlarge image ${i + 2}">
        <img src="${item.src}" alt="${item.caption || project.title}" loading="lazy">
      </button>`).join("")}</div>` : ""}

    <div class="project-next"><span>Back to portfolio</span><a href="index.html#work">Explore more work ↗</a></div>
  `;

  const lightbox = document.querySelector("#lightbox");
  const lbImg = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");
  let current = 0;

  function show(index) {
    current = (index + lightboxImages.length) % lightboxImages.length;
    lbImg.src = lightboxImages[current].src;
    lbImg.alt = lightboxImages[current].caption || project.title;
    caption.textContent = lightboxImages[current].caption || project.title;
  }

  function open(index) {
    if (!lightboxImages.length) return;
    show(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  root.querySelectorAll(".project-cover-trigger, .gallery-item").forEach(btn =>
    btn.addEventListener("click", () => open(Number(btn.dataset.index)))
  );

  lightbox.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
