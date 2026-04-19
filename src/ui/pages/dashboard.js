export function renderDashboard({ root, campaign }) {
  root.innerHTML = `
    <div class="grid cols-4">
      <article class="card stat-card">
        <div class="value">${campaign.sessionCount}</div>
        <div class="label">已进行场次</div>
      </article>
      <article class="card stat-card">
        <div class="value">${campaign.openClues}</div>
        <div class="label">开放线索</div>
      </article>
      <article class="card stat-card">
        <div class="value">${campaign.unresolvedThreads}</div>
        <div class="label">未回收伏笔</div>
      </article>
      <article class="card stat-card">
        <div class="value">${campaign.threatLevel}</div>
        <div class="label">威胁等级</div>
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
            <span>${campaign.coreTruth}</span>
          </div>
          <div>
            <strong>玩家当前误判</strong>
            <span>他们仍然更倾向于把失踪案看成普通走私灭口，而不是仪式准备阶段。</span>
          </div>
          <div>
            <strong>建议下一步</strong>
            <span>优先准备法医室对话分支和六码头潜入结果，避免玩家在今夜直接跳到终局。</span>
          </div>
        </div>
      </section>

      <section class="card">
        <p class="eyebrow">Session Rhythm</p>
        <h3 class="section-title">当前节奏提醒</h3>
        <div class="timeline">
          <div class="timeline-item">
            <strong>压迫感提升</strong>
            <p class="list-copy">若玩家拖延到午夜后，码头巡逻翻倍，潜入难度上升一级。</p>
          </div>
          <div class="timeline-item">
            <strong>真相推进</strong>
            <p class="list-copy">法医是把调查从“失踪案”推到“海上仪式”的最佳转折点。</p>
          </div>
          <div class="timeline-item">
            <strong>恐怖演出建议</strong>
            <p class="list-copy">在仓库区让玩家先听见水下同步呼吸，再看到异常痕迹，而不是直接见怪物。</p>
          </div>
        </div>
      </section>
    </div>
  `;
}
