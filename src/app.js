const data = {
  campaigns: [
    {
      id: "misty-ledger",
      title: "雾港账簿",
      era: "1920s 上海租界",
      theme: "都市阴谋 / 邪教渗透",
      pitch: "一名记者失踪后，玩家们在会计账簿里发现一串指向港口仪式的付款记录。",
      coreTruth:
        "真正操控失踪案的不是帮派，而是借航运公司掩护的密教。他们需要在月蚀夜完成一次海上召唤。",
      status: "进行中",
      sessionCount: 4,
      openClues: 4,
      unresolvedThreads: 3,
      threatLevel: "高",
    },
    {
      id: "silent-manor",
      title: "寂静庄园",
      era: "1933 英格兰乡野",
      theme: "古宅 / 家族秘密",
      pitch: "继承人邀请调查员前往偏僻庄园，却在第一晚失踪。",
      coreTruth:
        "庄园中的回声并非闹鬼，而是祖先留下的仪式装置在模仿死者声音，引导后代继续献祭。",
      status: "草稿",
      sessionCount: 0,
      openClues: 0,
      unresolvedThreads: 0,
      threatLevel: "中",
    },
  ],
  scenes: [
    {
      id: "newspaper-office",
      title: "《晨钟报》编辑部",
      type: "调查",
      summary: "记者最后出现的地方。桌面很整洁，只有被刻意撕走的一页速记本。",
      atmosphere: "昏黄吊灯、油墨味和深夜未散的烟雾，空气里残留着急促离开的痕迹。",
      clueNote: "可找到被压在打字机下的港口仓单编号。",
      fallback: "若玩家没搜到，编辑会在紧张时提到记者最近总去六码头。",
      npcs: ["许主编", "夜班排字工"],
      handouts: ["被撕裂的速记页", "仓单副本"],
    },
    {
      id: "dock-six",
      title: "六码头仓库",
      type: "潜入",
      summary: "夜里封锁的仓库区，巡逻比平常多，海风里夹着异样腥味。",
      atmosphere: "雾气吞掉远处汽笛声，脚步与海浪回响混杂，仿佛有什么在水下同步呼吸。",
      clueNote: "账簿上的付款对象与仓库登记簿上的假名一致。",
      fallback: "如果没有潜入成功，可从码头苦力口中得知今晚会有秘密装船。",
      npcs: ["巡夜警员", "码头苦力", "仓库管理员"],
      handouts: ["仓库登记簿影印件"],
    },
    {
      id: "forensic-room",
      title: "租界巡捕房法医室",
      type: "社交",
      summary: "法医表面冷静配合，实际隐瞒了一份与海水腐蚀有关的尸检异常。",
      atmosphere: "金属器械冰冷反光，福尔马林味压得人说话也想压低声音。",
      clueNote: "尸体肺部残留并不符合普通溺亡。",
      fallback: "法医若被识破恐惧，会主动请求保护并交出原始记录。",
      npcs: ["陈法医"],
      handouts: ["尸检原始记录"],
    },
  ],
  clues: [
    {
      id: "ledger-payments",
      title: "异常港口付款记录",
      type: "关键线索",
      source: "《晨钟报》编辑部",
      content: "账簿显示连续三周有匿名款项流向六码头 17 号仓库。",
      fallback: "编辑口供 / 港务处复印记录",
      leadsTo: "六码头仓库",
      status: "已获得",
    },
    {
      id: "corroded-lungs",
      title: "不符合常理的肺部腐蚀",
      type: "关键线索",
      source: "法医室",
      content: "死者肺部存在细小盐晶和未知粘膜损伤，像是在半清醒状态下接触海水。",
      fallback: "法医坦白 / 尸检照片",
      leadsTo: "海上仪式假设",
      status: "未获得",
    },
    {
      id: "warehouse-alias",
      title: "仓库登记簿假名",
      type: "关联线索",
      source: "六码头仓库",
      content: "登记人使用的假名与失踪记者追踪的一位航运会计相匹配。",
      fallback: "码头苦力闲谈",
      leadsTo: "航运公司会计",
      status: "进行中",
    },
  ],
  npcs: [
    {
      id: "editor-xu",
      name: "许主编",
      role: "报社编辑",
      attitude: "警惕但愿意合作",
      publicInfo: "担心报社牵连政治势力，因此极力淡化记者失踪。",
      secret: "他曾收过匿名警告信，知道记者在调查港口走私。",
      motivation: "保护报社和自己的职位。",
      clue: "若被说服，会交出失踪前最后一份选题草稿。",
    },
    {
      id: "chen-coroner",
      name: "陈法医",
      role: "巡捕房法医",
      attitude: "表面镇定，实际恐惧",
      publicInfo: "坚持尸体只是普通溺亡。",
      secret: "真正的尸检结果让他联想到三年前未公开的海祭案。",
      motivation: "不想再被卷入超出理解范围的案件。",
      clue: "如果获得保护承诺，他会交出原始尸检记录。",
    },
    {
      id: "dock-clerk",
      name: "韩管理员",
      role: "仓库管理员",
      attitude: "敌对",
      publicInfo: "严词否认仓库夜间有异常活动。",
      secret: "他知道月蚀夜要装运的其实是祭器与被选中的祭品。",
      motivation: "保住密教提供的利益与地位。",
      clue: "若被逼入绝境，会泄露装船时间。",
    },
  ],
  handouts: [
    {
      title: "被撕裂的速记页",
      type: "纸质线索",
      reveal: "编辑部搜查成功时",
      effect: "让玩家意识到记者不是随意失踪，而是已经接近某个名单。",
    },
    {
      title: "尸检原始记录",
      type: "医疗档案",
      reveal: "说服或威压法医后",
      effect: "把调查从普通谋杀转向异常仪式与海上活动。",
    },
    {
      title: "仓库登记簿影印件",
      type: "记录文书",
      reveal: "潜入仓库或贿赂苦力后",
      effect: "建立假名、账簿和仓库的关联。",
    },
  ],
  runningLog: [
    "玩家已确认记者最后一次公开露面在《晨钟报》编辑部。",
    "他们怀疑法医隐瞒尸检结论，但尚未提出直接威胁。",
    "当前最危险的选择是今晚直接前往六码头仓库。",
  ],
  reference: [
    {
      title: "成功等级",
      body: "常规成功：掷骰结果小于等于技能值；困难成功：小于等于一半；极难成功：小于等于五分之一。",
    },
    {
      title: "奖励骰与惩罚骰",
      body: "重掷十位骰后取更优或更差结果。适合描述环境优势、准备充分或极端不利局面。",
    },
    {
      title: "SAN 损失提示",
      body: "先决定冲击强度，再区分已知人类恐怖与神话恐怖。若损失超过当前理智的五分之一，应立即考虑临时疯狂。",
    },
  ],
};

const state = {
  currentPage: "dashboard",
  currentCampaignId: "misty-ledger",
  workspaceTab: "overview",
  searchQuery: "",
};

const pageTitle = document.getElementById("page-title");
const navButtons = [...document.querySelectorAll(".nav-item")];
const pageEls = {
  dashboard: document.getElementById("page-dashboard"),
  campaigns: document.getElementById("page-campaigns"),
  workspace: document.getElementById("page-workspace"),
  running: document.getElementById("page-running"),
  handouts: document.getElementById("page-handouts"),
  reference: document.getElementById("page-reference"),
};

function getCampaign() {
  return data.campaigns.find((campaign) => campaign.id === state.currentCampaignId) || data.campaigns[0];
}

function renderDashboard() {
  const campaign = getCampaign();
  pageEls.dashboard.innerHTML = `
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

function renderCampaigns() {
  pageEls.campaigns.innerHTML = `
    <div class="grid cols-2">
      ${data.campaigns
        .map(
          (campaign) => `
          <article class="card campaign-card">
            <header>
              <div>
                <p class="eyebrow">${campaign.era}</p>
                <h3>${campaign.title}</h3>
              </div>
              <span class="pill ${campaign.status === "进行中" ? "warning" : ""}">${campaign.status}</span>
            </header>
            <p class="campaign-meta">${campaign.pitch}</p>
            <div class="chip-row">
              <span class="chip">${campaign.theme}</span>
              <span class="chip">场次 ${campaign.sessionCount}</span>
              <span class="chip">线索 ${campaign.openClues}</span>
            </div>
            <footer>
              <button class="action-button primary" data-open-campaign="${campaign.id}">进入案件工作台</button>
            </footer>
          </article>`
        )
        .join("")}
    </div>
  `;

  pageEls.campaigns.querySelectorAll("[data-open-campaign]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentCampaignId = button.dataset.openCampaign;
      state.currentPage = "workspace";
      switchPage("workspace");
    });
  });
}

function renderWorkspace() {
  const campaign = getCampaign();
  const tabContent = {
    overview: `
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
    `,
    scenes: `
      <div class="list-stack">
        ${data.scenes
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
    `,
    clues: `
      <div class="list-stack">
        ${data.clues
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
    `,
    npcs: `
      <div class="grid cols-3">
        ${data.npcs
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
    `,
    handouts: `
      <div class="grid cols-3">
        ${data.handouts
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
    `,
  };

  pageEls.workspace.innerHTML = `
    <section class="card">
      <p class="eyebrow">Campaign Workspace</p>
      <h3 class="section-title">${campaign.title}</h3>
      <div class="tabs">
        <button class="tab-button ${state.workspaceTab === "overview" ? "active" : ""}" data-tab="overview">总览</button>
        <button class="tab-button ${state.workspaceTab === "scenes" ? "active" : ""}" data-tab="scenes">场景</button>
        <button class="tab-button ${state.workspaceTab === "clues" ? "active" : ""}" data-tab="clues">线索</button>
        <button class="tab-button ${state.workspaceTab === "npcs" ? "active" : ""}" data-tab="npcs">NPC</button>
        <button class="tab-button ${state.workspaceTab === "handouts" ? "active" : ""}" data-tab="handouts">手outs</button>
      </div>
      <div class="panel active">
        ${tabContent[state.workspaceTab]}
      </div>
    </section>
  `;

  pageEls.workspace.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.workspaceTab = button.dataset.tab;
      renderWorkspace();
    });
  });
}

function renderRunning() {
  pageEls.running.innerHTML = `
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
          ${data.runningLog.map((entry) => `<article class="log-card">${entry}</article>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderHandouts() {
  pageEls.handouts.innerHTML = `
    <div class="grid cols-3">
      ${data.handouts
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

function renderReference() {
  pageEls.reference.innerHTML = `
    <div class="grid cols-3">
      ${data.reference
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

function renderSearchResults() {
  const query = state.searchQuery.trim().toLowerCase();
  document.querySelectorAll(".search-results").forEach((el) => el.remove());
  if (!query) return;

  const campaign = getCampaign();
  const searchable = [
    ...data.npcs.map((npc) => ({ type: "NPC", title: npc.name, body: `${npc.role} · ${npc.publicInfo}` })),
    ...data.clues.map((clue) => ({ type: "线索", title: clue.title, body: `${clue.source} · ${clue.content}` })),
    ...data.handouts.map((handout) => ({ type: "手outs", title: handout.title, body: `${handout.type} · ${handout.effect}` })),
    { type: "案件", title: campaign.title, body: campaign.pitch },
  ].filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(query));

  const results = document.createElement("div");
  results.className = "search-results";
  results.innerHTML = searchable.length
    ? searchable
        .map(
          (item) => `
          <article class="search-hit">
            <strong>${item.type} · ${item.title}</strong>
            <p class="small-copy">${item.body}</p>
          </article>`
        )
        .join("")
    : `<article class="search-hit"><strong>没有命中结果</strong><p class="small-copy">试试搜索“法医”“港口”“账簿”之类的关键词。</p></article>`;

  pageEls[state.currentPage].prepend(results);
}

function updateSidebar() {
  const campaign = getCampaign();
  document.getElementById("sidebar-campaign-title").textContent = campaign.title;
  document.getElementById("sidebar-campaign-summary").textContent = campaign.pitch;
}

function switchPage(page) {
  state.currentPage = page;
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  Object.entries(pageEls).forEach(([key, el]) => el.classList.toggle("active", key === page));

  const titles = {
    dashboard: "概览",
    campaigns: "案件库",
    workspace: "案件工作台",
    running: "跑团模式",
    handouts: "手outs库",
    reference: "规则速查",
  };

  pageTitle.textContent = titles[page];
  updateSidebar();
  renderAll();
}

function renderAll() {
  renderDashboard();
  renderCampaigns();
  renderWorkspace();
  renderRunning();
  renderHandouts();
  renderReference();
  renderSearchResults();
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.page));
});

document.getElementById("global-search").addEventListener("input", (event) => {
  state.searchQuery = event.target.value;
  renderAll();
});

updateSidebar();
renderAll();
