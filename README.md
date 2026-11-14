# Jan Szymański — Portfolio

A responsive, framework-free portfolio site prepared for GitHub Pages.

## Publish with GitHub Pages

1. Create a repository on GitHub (for example, `jan-szymanski-portfolio`).
2. Upload the **contents** of this folder to the repository root (so `index.html` is at the root).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

Your site will be published at the GitHub Pages URL shown in Settings → Pages.

## Before publishing

- Contact email and LinkedIn profile are already configured in `index.html`. No ArtStation link is included.
- Review project descriptions and metadata in `assets/js/projects.js`. Project groupings and short descriptions are an initial editorial pass based on the supplied image filenames and visible artwork; adjust titles, credits, dates and role details where needed.
- The original animated GIFs are included and will animate in the project gallery.

## Editing projects

All project cards and project detail galleries are driven by `assets/js/projects.js`. Each project has an `id`, `title`, `category`, `discipline`, `cover`, `cardImage`, `summary`, `description` and `gallery`.

Supported categories: `UI`, `3D`, `Art Direction`, `Other`.

Add image files to `assets/images/` and reference them with paths such as `assets/images/my-image.jpg`.
