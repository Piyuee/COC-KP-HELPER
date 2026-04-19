export function renderReference({ root, reference }) {
  root.innerHTML = `
    <div class="grid cols-3">
      ${reference
        .map(
          (item) => `
          <article class="card">
            <p class="eyebrow">Quick Reference</p>
            <h3 class="section-title">${item.title}</h3>
            <p class="muted-copy">${item.body}</p>
          </article>`
        )
        .join("")}
    </div>
  `;
}
