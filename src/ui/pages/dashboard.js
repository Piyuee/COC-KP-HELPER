export function renderDashboard({ root, campaign, bundle }) {
  if (!campaign) {
    root.innerHTML = `
      <section class="card empty-state">
        <p class="eyebrow">Dashboard</p>
        <h3 class="section-title">还没有案件</h3>
        <p class="muted-copy">从右上角“新建案件”开始，先录入一个调查主题和核心真相。</p>
      </section>
    `;
    return;
  }

  const obtainedClues = bundle.clues.filter((item) => item.status === "已获得").length;
  const unresolvedThreads = bundle.clues.filter((item) => item.status !== "已获得").length;
  const currentScene = bundle.scenes.find((scene) => scene.id === campaign.currentSceneId);

  root.innerHTML = `
    <div class="grid cols-4">
      <article class="card stat-card">
        <div class="value">${bundle.sessionLogs.length}</div>
        <div class="label">场次记录</div>
      </article>
      <article class="card stat-card">
        <div class="value">${bundle.scenes.length}</div>
        <div class="label">场景数量</div>
      </article>
      <article class="card stat-card">
        <div class="value">${obtainedClues}/${bundle.clues.length}</div>
        <div class="label">线索获取</div>
      </article>
      <article class="card stat-card">
        <div class="value">${unresolvedThreads}</div>
        <div class="label">待推进线索</div>
      </article>
    </div>

    <div class="workspace-columns" style="margin-top: 18px;">
      <section class="card">
        <p class="eyebrow">Campaign Snapshot</p>
        <h3 class="section-title">${campaign.title}</h3>
        <p class="muted-copy">${campaign.pitch}</p>
        <div class="chip-row">
          <span class="chip">${campaign.era}</span>
          <span class="chip">${campaign.theme}</span>
          <span class="chip">${campaign.status}</span>
        </div>
        <div class="key-value" style="margin-top: 18px;">
          <div>
            <strong>核心真相</strong>
            <span>${campaign.coreTruth || "暂未填写"}</span>
          </div>
          <div>
            <strong>玩家已知</strong>
            <span>${campaign.playerKnowledge || "暂未填写"}</span>
          </div>
          <div>
            <strong>玩家误判</strong>
            <span>${campaign.playerMisread || "暂未填写"}</span>
          </div>
          <div>
            <strong>下一步建议</strong>
            <span>${campaign.nextSuggestion || "暂未填写"}</span>
          </div>
        </div>
      </section>

      <section class="card">
        <p class="eyebrow">Keeper Focus</p>
        <h3 class="section-title">当前使用提示</h3>
        <div class="timeline">
          <div class="timeline-item">
            <strong>当前场景</strong>
            <p class="list-copy">${currentScene ? currentScene.title : "尚未指定当前场景"}</p>
          </div>
          <div class="timeline-item">
            <strong>关键线索未获得</strong>
            <p class="list-copy">${bundle.clues
              .filter((item) => item.type.includes("关键") && item.status !== "已获得")
              .map((item) => item.title)
              .join(" / ") || "无"}</p>
          </div>
          <div class="timeline-item">
            <strong>最近记录</strong>
            <p class="list-copy">${bundle.sessionLogs[0]?.text || "还没有跑团记录。可去“跑团模式”快速追加。"} </p>
          </div>
        </div>
      </section>
    </div>
  `;
}
