export function renderRunning({ root, runningLog }) {
  root.innerHTML = `
    <div class="running-grid">
      <div class="workspace-columns">
        <section class="card">
          <p class="eyebrow">Running Mode</p>
          <h3 class="section-title">当前场景：六码头仓库</h3>
          <div class="key-value">
            <div><strong>当前在场 NPC</strong><span>巡夜警员 / 码头苦力 / 韩管理员</span></div>
            <div><strong>当前可用线索</strong><span>仓库登记簿假名、装船时间、祭器木箱编号</span></div>
            <div><strong>风险</strong><span>若玩家闹出动静，密教成员会提前转移祭器并切断后续追踪。</span></div>
          </div>
          <div class="three-col" style="margin-top: 18px;">
            <button class="action-button primary">响应玩家行动</button>
            <button class="action-button">生成替代线索</button>
            <button class="action-button">记录本场事件</button>
          </div>
        </section>

        <section class="card">
          <p class="eyebrow">Quick Suggestions</p>
          <h3 class="section-title">现场建议</h3>
          <div class="timeline">
            <div class="timeline-item">
              <strong>如果玩家要潜入</strong>
              <p class="list-copy">优先给出“聆听 / 潜行 / 侦查”三种切入，不要立刻要求单一检定。</p>
            </div>
            <div class="timeline-item">
              <strong>如果玩家抓住管理员</strong>
              <p class="list-copy">他不会直接说出召唤，但会因“船还没到潮位”这句口误暴露时间压力。</p>
            </div>
            <div class="timeline-item">
              <strong>如果玩家撤退</strong>
              <p class="list-copy">让他们看到一辆深夜驶向法租界的运货车，为下一场追踪留出口。</p>
            </div>
          </div>
        </section>
      </div>

      <section class="card">
        <p class="eyebrow">Session Log</p>
        <h3 class="section-title">本场动态记录</h3>
        <div class="list-stack">
          ${runningLog.map((entry) => `<article class="log-card">${entry}</article>`).join("")}
        </div>
      </section>
    </div>
  `;
}
