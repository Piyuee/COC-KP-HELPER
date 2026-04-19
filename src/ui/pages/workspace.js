function renderOverview(campaign) {
  return `
    <div class="two-col">
      <article class="card">
        <p class="eyebrow">Overview</p>
        <h3 class="section-title">${campaign.title}</h3>
        <p class="muted-copy">${campaign.pitch}</p>
        <div class="key-value">
          <div><strong>时代与地点</strong><span>${campaign.era}</span></div>
          <div><strong>主题</strong><span>${campaign.theme}</span></div>
          <div><strong>核心真相</strong><span>${campaign.coreTruth}</span></div>
          <div><strong>玩家已知</strong><span>记者失踪、港口收款异常、码头夜间活动增加。</span></div>
          <div><strong>玩家误判</strong><span>他们把案件理解为帮派斗争，还没把海上异象和失踪案连起来。</span></div>
        </div>
      </article>

      <article class="card">
        <p class="eyebrow">Health Check</p>
        <h3 class="section-title">线索健康检查</h3>
        <div class="timeline">
          <div class="timeline-item">
            <strong>唯一关键线索风险</strong>
            <p class="list-copy">法医线目前是最佳真相推进点，但已设置“保护承诺”与“尸检照片”作为回补路径。</p>
          </div>
          <div class="timeline-item">
            <strong>高风险场景</strong>
            <p class="list-copy">六码头仓库可能让玩家过早直面终局，需要准备失败撤离和追踪后续。</p>
          </div>
          <div class="timeline-item">
            <strong>待补内容</strong>
            <p class="list-copy">建议为航运公司会计再加一个白天接触场景，降低调查过于单线的风险。</p>
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderScenes(scenes) {
  return `
    <div class="list-stack">
      ${scenes
        .map(
          (scene) => `
          <article class="scene-card">
            <header>
              <div>
                <p class="eyebrow">${scene.type}</p>
                <h3>${scene.title}</h3>
              </div>
              <span class="pill">${scene.npcs.length} NPC</span>
            </header>
            <p class="muted-copy">${scene.summary}</p>
            <div class="key-value">
              <div><strong>氛围描述</strong><span>${scene.atmosphere}</span></div>
              <div><strong>关键线索</strong><span>${scene.clueNote}</span></div>
              <div><strong>补救线索</strong><span>${scene.fallback}</span></div>
              <div><strong>关联对象</strong><span>${scene.npcs.join(" / ")}</span></div>
              <div><strong>手outs</strong><span>${scene.handouts.join(" / ")}</span></div>
            </div>
          </article>`
        )
        .join("")}
    </div>
  `;
}

function renderClues(clues) {
  return `
    <div class="list-stack">
      ${clues
        .map(
          (clue) => `
          <article class="clue-card">
            <header>
              <div>
                <p class="eyebrow">${clue.type}</p>
                <h3>${clue.title}</h3>
              </div>
              <span class="pill ${clue.status === "未获得" ? "danger" : clue.status === "已获得" ? "warning" : ""}">${clue.status}</span>
            </header>
            <div class="key-value">
              <div><strong>内容</strong><span>${clue.content}</span></div>
              <div><strong>来源</strong><span>${clue.source}</span></div>
              <div><strong>备用来源</strong><span>${clue.fallback}</span></div>
              <div><strong>导向</strong><span>${clue.leadsTo}</span></div>
            </div>
          </article>`
        )
        .join("")}
    </div>
  `;
}

function renderNpcs(npcs) {
  return `
    <div class="grid cols-3">
      ${npcs
        .map(
          (npc) => `
          <article class="npc-card">
            <header>
              <div>
                <p class="eyebrow">${npc.role}</p>
                <h3>${npc.name}</h3>
              </div>
              <span class="pill">${npc.attitude}</span>
            </header>
            <div class="key-value">
              <div><strong>公开信息</strong><span>${npc.publicInfo}</span></div>
              <div><strong>隐藏秘密</strong><span>${npc.secret}</span></div>
              <div><strong>动机</strong><span>${npc.motivation}</span></div>
              <div><strong>可透露线索</strong><span>${npc.clue}</span></div>
            </div>
          </article>`
        )
        .join("")}
    </div>
  `;
}

function renderHandouts(handouts) {
  return `
    <div class="grid cols-3">
      ${handouts
        .map(
          (handout) => `
          <article class="handout-card">
            <header>
              <div>
                <p class="eyebrow">${handout.type}</p>
                <h3>${handout.title}</h3>
              </div>
            </header>
            <div class="key-value">
              <div><strong>揭示时机</strong><span>${handout.reveal}</span></div>
              <div><strong>作用</strong><span>${handout.effect}</span></div>
            </div>
          </article>`
        )
        .join("")}
    </div>
  `;
}

export function renderWorkspace({ root, campaign, scenes, clues, npcs, handouts, workspaceTab, onTabChange }) {
  const tabContent = {
    overview: renderOverview(campaign),
    scenes: renderScenes(scenes),
    clues: renderClues(clues),
    npcs: renderNpcs(npcs),
    handouts: renderHandouts(handouts),
  };

  root.innerHTML = `
    <section class="card">
      <p class="eyebrow">Campaign Workspace</p>
      <h3 class="section-title">${campaign.title}</h3>
      <div class="tabs">
        <button class="tab-button ${workspaceTab === "overview" ? "active" : ""}" data-tab="overview">总览</button>
        <button class="tab-button ${workspaceTab === "scenes" ? "active" : ""}" data-tab="scenes">场景</button>
        <button class="tab-button ${workspaceTab === "clues" ? "active" : ""}" data-tab="clues">线索</button>
        <button class="tab-button ${workspaceTab === "npcs" ? "active" : ""}" data-tab="npcs">NPC</button>
        <button class="tab-button ${workspaceTab === "handouts" ? "active" : ""}" data-tab="handouts">手outs</button>
      </div>
      <div class="panel active">
        ${tabContent[workspaceTab]}
      </div>
    </section>
  `;

  root.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => onTabChange(button.dataset.tab));
  });
}
