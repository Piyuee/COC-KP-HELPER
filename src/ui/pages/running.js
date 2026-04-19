export function renderRunning({
  root,
  campaign,
  bundle,
  draftLogText,
  onDraftLogChange,
  onAddLog,
  onRemoveLog,
}) {
  if (!campaign) {
    root.innerHTML = `
      <section class="card empty-state">
        <p class="eyebrow">Running Mode</p>
        <h3 class="section-title">还没有案件</h3>
        <p class="muted-copy">创建案件后，这里会变成跑团时的快速记录面板。</p>
      </section>
    `;
    return;
  }

  const currentScene = bundle.scenes.find((scene) => scene.id === campaign.currentSceneId);
  const activeClues = bundle.clues.filter((item) => item.status !== "已获得");

  root.innerHTML = `
    <div class="running-grid">
      <div class="workspace-columns">
        <section class="card">
          <p class="eyebrow">Running Mode</p>
          <h3 class="section-title">当前场景：${currentScene?.title || "未指定"}</h3>
          <div class="key-value">
            <div><strong>场景简介</strong><span>${currentScene?.summary || "请在案件总览中选择当前场景。"}</span></div>
            <div><strong>氛围</strong><span>${currentScene?.atmosphere || "未填写"}</span></div>
            <div><strong>待推进线索</strong><span>${activeClues.map((item) => item.title).join(" / ") || "无"}</span></div>
            <div><strong>备用线索提醒</strong><span>${currentScene?.fallback || "未填写"}</span></div>
          </div>
        </section>

        <section class="card">
          <p class="eyebrow">Quick Log</p>
          <h3 class="section-title">追加本场记录</h3>
          <form id="running-log-form" class="entity-form single-column">
            <label class="span-2">
              <span>记录内容</span>
              <textarea name="logText" rows="5" placeholder="例如：玩家决定先去法医室施压，希望直接拿到尸检原件。">${draftLogText}</textarea>
            </label>
            <div class="button-row span-2">
              <button type="submit" class="action-button primary">写入记录</button>
            </div>
          </form>
        </section>
      </div>

      <section class="card">
        <p class="eyebrow">Session Log</p>
        <h3 class="section-title">本场动态记录</h3>
        <div class="list-stack">
          ${
            bundle.sessionLogs.length
              ? bundle.sessionLogs
                  .map(
                    (entry) => `
                    <article class="log-card">
                      <div class="log-card-header">
                        <strong>${entry.createdAt}</strong>
                        <button class="list-button danger-text" data-delete-log="${entry.id}">删除</button>
                      </div>
                      <p class="muted-copy">${entry.text}</p>
                    </article>
                  `
                  )
                  .join("")
              : `<article class="log-card"><p class="muted-copy">还没有跑团记录。</p></article>`
          }
        </div>
      </section>
    </div>
  `;

  const textArea = root.querySelector('textarea[name="logText"]');
  textArea.addEventListener("input", (event) => onDraftLogChange(event.target.value));

  root.querySelector("#running-log-form").addEventListener("submit", (event) => {
    event.preventDefault();
    onAddLog(new FormData(event.currentTarget).get("logText") || "");
  });

  root.querySelectorAll("[data-delete-log]").forEach((button) => {
    button.addEventListener("click", () => onRemoveLog(button.dataset.deleteLog));
  });
}
