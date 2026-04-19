const emptyCampaign = {
  title: "",
  era: "",
  theme: "",
  pitch: "",
  coreTruth: "",
  status: "草稿",
  playerKnowledge: "",
  playerMisread: "",
  nextSuggestion: "",
  currentSceneId: "",
};

export function renderCampaigns({
  root,
  campaigns,
  editingCampaign,
  onOpenCampaign,
  onEditCampaign,
  onDeleteCampaign,
  onCancelEdit,
  onSubmitCampaign,
}) {
  const draft = editingCampaign || emptyCampaign;

  root.innerHTML = `
    <div class="workspace-columns">
      <section class="card">
        <p class="eyebrow">Campaign Library</p>
        <h3 class="section-title">案件列表</h3>
        <div class="list-stack">
          ${campaigns
            .map(
              (campaign) => `
              <article class="mini-card campaign-card">
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
                </div>
                <div class="button-row">
                  <button class="action-button primary" data-open="${campaign.id}">打开</button>
                  <button class="action-button" data-edit="${campaign.id}">编辑</button>
                  <button class="action-button danger" data-delete="${campaign.id}">删除</button>
                </div>
              </article>`
            )
            .join("")}
        </div>
      </section>

      <section class="card">
        <p class="eyebrow">${editingCampaign ? "Edit Campaign" : "New Campaign"}</p>
        <h3 class="section-title">${editingCampaign ? "编辑案件" : "新建案件"}</h3>
        <form id="campaign-form" class="entity-form">
          <label>
            <span>案件标题</span>
            <input name="title" value="${draft.title}" required />
          </label>
          <label>
            <span>时代与地点</span>
            <input name="era" value="${draft.era}" placeholder="例如：1920s 上海租界" required />
          </label>
          <label>
            <span>主题</span>
            <input name="theme" value="${draft.theme}" placeholder="都市阴谋 / 古宅 / 邪教" />
          </label>
          <label>
            <span>状态</span>
            <select name="status">
              ${["草稿", "进行中", "已归档"]
                .map((option) => `<option value="${option}" ${draft.status === option ? "selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </label>
          <label class="span-2">
            <span>一句话钩子</span>
            <textarea name="pitch" rows="3" required>${draft.pitch}</textarea>
          </label>
          <label class="span-2">
            <span>核心真相</span>
            <textarea name="coreTruth" rows="4">${draft.coreTruth}</textarea>
          </label>
          <label class="span-2">
            <span>玩家已知</span>
            <textarea name="playerKnowledge" rows="3">${draft.playerKnowledge}</textarea>
          </label>
          <label class="span-2">
            <span>玩家误判</span>
            <textarea name="playerMisread" rows="3">${draft.playerMisread}</textarea>
          </label>
          <label class="span-2">
            <span>下一步建议</span>
            <textarea name="nextSuggestion" rows="3">${draft.nextSuggestion}</textarea>
          </label>
          <div class="button-row span-2">
            <button type="submit" class="action-button primary">${editingCampaign ? "保存修改" : "创建案件"}</button>
            ${editingCampaign ? '<button type="button" id="cancel-campaign-edit" class="action-button">取消编辑</button>' : ""}
          </div>
        </form>
      </section>
    </div>
  `;

  root.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => onOpenCampaign(button.dataset.open));
  });
  root.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => onEditCampaign(button.dataset.edit));
  });
  root.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => onDeleteCampaign(button.dataset.delete));
  });

  root.querySelector("#campaign-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmitCampaign(Object.fromEntries(formData.entries()));
  });

  root.querySelector("#cancel-campaign-edit")?.addEventListener("click", onCancelEdit);
}
