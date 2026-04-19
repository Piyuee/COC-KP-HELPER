export function renderCluePropsLibrary({ root, clueProps }) {
  if (!clueProps.length) {
    root.innerHTML = `
      <section class="card empty-state">
        <p class="eyebrow">线索道具</p>
        <h3 class="section-title">当前案件还没有线索道具</h3>
        <p class="muted-copy">你可以在案件工作台的“线索道具”标签中添加线索道具。</p>
      </section>
    `;
    return;
  }

  root.innerHTML = `
    <div class="grid cols-3">
      ${clueProps
        .map(
          (clueProp) => `
          <article class="card clue-prop-card">
            <header>
              <div>
                <p class="eyebrow">${clueProp.type}</p>
                <h3>${clueProp.title}</h3>
              </div>
              <span class="pill warning">待展示</span>
            </header>
            <div class="key-value">
              <div><strong>触发条件</strong><span>${clueProp.reveal}</span></div>
              <div><strong>场景效果</strong><span>${clueProp.effect}</span></div>
            </div>
            <button class="action-button" style="margin-top: 14px;">在跑团模式中展示</button>
          </article>`
        )
        .join("")}
    </div>
  `;
}
