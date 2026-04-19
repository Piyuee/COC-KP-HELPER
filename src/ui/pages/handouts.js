export function renderHandoutsLibrary({ root, handouts }) {
  root.innerHTML = `
    <div class="grid cols-3">
      ${handouts
        .map(
          (handout) => `
          <article class="card handout-card">
            <header>
              <div>
                <p class="eyebrow">${handout.type}</p>
                <h3>${handout.title}</h3>
              </div>
              <span class="pill warning">待展示</span>
            </header>
            <div class="key-value">
              <div><strong>触发条件</strong><span>${handout.reveal}</span></div>
              <div><strong>场景效果</strong><span>${handout.effect}</span></div>
            </div>
            <button class="action-button" style="margin-top: 14px;">在跑团模式中展示</button>
          </article>`
        )
        .join("")}
    </div>
  `;
}
