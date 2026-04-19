const entityConfig = {
  scenes: {
    title: "场景",
    collectionKey: "scenes",
    fields: [
      { name: "title", label: "场景名", type: "input", required: true },
      { name: "type", label: "场景类型", type: "input", placeholder: "调查 / 社交 / 潜入" },
      { name: "summary", label: "场景简介", type: "textarea", rows: 3 },
      { name: "atmosphere", label: "氛围描述", type: "textarea", rows: 3 },
      { name: "clueNote", label: "关键线索", type: "textarea", rows: 3 },
      { name: "fallback", label: "补救线索", type: "textarea", rows: 3 },
      { name: "npcIds", label: "关联 NPC", type: "multiselect", optionKey: "npcs", optionLabel: "name" },
      { name: "cluePropIds", label: "关联线索道具", type: "multiselect", optionKey: "clueProps", optionLabel: "title" },
    ],
    renderCard(item, context) {
      const npcNames = item.npcIds.map((id) => context.npcs.find((npc) => npc.id === id)?.name).filter(Boolean);
      const cluePropTitles = item.cluePropIds
        .map((id) => context.clueProps.find((clueProp) => clueProp.id === id)?.title)
        .filter(Boolean);
      return `
        <article class="scene-card">
          <header>
            <div>
              <p class="eyebrow">${item.type || "场景"}</p>
              <h3>${item.title}</h3>
            </div>
          </header>
          <p class="muted-copy">${item.summary || "暂无简介"}</p>
          <div class="key-value compact">
            <div><strong>氛围</strong><span>${item.atmosphere || "未填写"}</span></div>
            <div><strong>线索</strong><span>${item.clueNote || "未填写"}</span></div>
            <div><strong>补救</strong><span>${item.fallback || "未填写"}</span></div>
            <div><strong>NPC</strong><span>${npcNames.join(" / ") || "未关联"}</span></div>
            <div><strong>线索道具</strong><span>${cluePropTitles.join(" / ") || "未关联"}</span></div>
          </div>
          <div class="button-row">
            <button class="action-button" data-edit-entity="${item.id}">编辑</button>
            <button class="action-button danger" data-delete-entity="${item.id}">删除</button>
          </div>
        </article>
      `;
    },
  },
  clues: {
    title: "线索",
    collectionKey: "clues",
    fields: [
      { name: "title", label: "线索名", type: "input", required: true },
      { name: "type", label: "线索类型", type: "input", placeholder: "关键线索 / 关联线索" },
      { name: "source", label: "来源", type: "input" },
      { name: "status", label: "状态", type: "select", options: ["未获得", "进行中", "已获得"] },
      { name: "content", label: "内容", type: "textarea", rows: 3 },
      { name: "fallback", label: "备用来源", type: "textarea", rows: 2 },
      { name: "leadsTo", label: "导向", type: "input" },
    ],
    renderCard(item) {
      return `
        <article class="clue-card">
          <header>
            <div>
              <p class="eyebrow">${item.type || "线索"}</p>
              <h3>${item.title}</h3>
            </div>
            <span class="pill ${item.status === "已获得" ? "warning" : item.status === "未获得" ? "danger" : ""}">${item.status || "未获得"}</span>
          </header>
          <div class="key-value compact">
            <div><strong>内容</strong><span>${item.content || "未填写"}</span></div>
            <div><strong>来源</strong><span>${item.source || "未填写"}</span></div>
            <div><strong>备用来源</strong><span>${item.fallback || "未填写"}</span></div>
            <div><strong>导向</strong><span>${item.leadsTo || "未填写"}</span></div>
          </div>
          <div class="button-row">
            <button class="action-button" data-edit-entity="${item.id}">编辑</button>
            <button class="action-button danger" data-delete-entity="${item.id}">删除</button>
          </div>
        </article>
      `;
    },
  },
  npcs: {
    title: "NPC",
    collectionKey: "npcs",
    fields: [
      { name: "name", label: "姓名", type: "input", required: true },
      { name: "role", label: "身份 / 职业", type: "input" },
      { name: "attitude", label: "当前态度", type: "input" },
      { name: "publicInfo", label: "公开信息", type: "textarea", rows: 3 },
      { name: "secret", label: "隐藏秘密", type: "textarea", rows: 3 },
      { name: "motivation", label: "动机", type: "textarea", rows: 2 },
      { name: "clue", label: "可透露线索", type: "textarea", rows: 2 },
    ],
    renderCard(item) {
      return `
        <article class="npc-card">
          <header>
            <div>
              <p class="eyebrow">${item.role || "NPC"}</p>
              <h3>${item.name}</h3>
            </div>
            <span class="pill">${item.attitude || "未设定"}</span>
          </header>
          <div class="key-value compact">
            <div><strong>公开信息</strong><span>${item.publicInfo || "未填写"}</span></div>
            <div><strong>秘密</strong><span>${item.secret || "未填写"}</span></div>
            <div><strong>动机</strong><span>${item.motivation || "未填写"}</span></div>
            <div><strong>可透露线索</strong><span>${item.clue || "未填写"}</span></div>
          </div>
          <div class="button-row">
            <button class="action-button" data-edit-entity="${item.id}">编辑</button>
            <button class="action-button danger" data-delete-entity="${item.id}">删除</button>
          </div>
        </article>
      `;
    },
  },
  clueProps: {
    title: "线索道具",
    collectionKey: "clueProps",
    fields: [
      { name: "title", label: "标题", type: "input", required: true },
      { name: "type", label: "类型", type: "input", placeholder: "报纸 / 信件 / 档案" },
      { name: "reveal", label: "揭示时机", type: "textarea", rows: 2 },
      { name: "effect", label: "作用", type: "textarea", rows: 3 },
    ],
    renderCard(item) {
      return `
        <article class="clue-prop-card">
          <header>
            <div>
              <p class="eyebrow">${item.type || "线索道具"}</p>
              <h3>${item.title}</h3>
            </div>
          </header>
          <div class="key-value compact">
            <div><strong>揭示时机</strong><span>${item.reveal || "未填写"}</span></div>
            <div><strong>作用</strong><span>${item.effect || "未填写"}</span></div>
          </div>
          <div class="button-row">
            <button class="action-button" data-edit-entity="${item.id}">编辑</button>
            <button class="action-button danger" data-delete-entity="${item.id}">删除</button>
          </div>
        </article>
      `;
    },
  },
};

function renderField(field, draft, context) {
  const value = draft[field.name] ?? (field.type === "multiselect" ? [] : "");
  if (field.type === "textarea") {
    return `
      <label class="${field.name === "summary" || field.name === "atmosphere" || field.name === "clueNote" || field.name === "fallback" || field.name === "publicInfo" || field.name === "secret" || field.name === "effect" || field.name === "reveal" || field.name === "content" ? "span-2" : ""}">
        <span>${field.label}</span>
        <textarea name="${field.name}" rows="${field.rows || 3}" ${field.required ? "required" : ""}>${value}</textarea>
      </label>
    `;
  }

  if (field.type === "select") {
    return `
      <label>
        <span>${field.label}</span>
        <select name="${field.name}">
          ${field.options
            .map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`)
            .join("")}
        </select>
      </label>
    `;
  }

  if (field.type === "multiselect") {
    const options = context[field.optionKey];
    return `
      <fieldset class="entity-multiselect span-2">
        <legend>${field.label}</legend>
        <div class="checkbox-grid">
          ${options
            .map((option) => {
              const label = option[field.optionLabel];
              const checked = value.includes(option.id) ? "checked" : "";
              return `
                <label class="checkbox-item">
                  <input type="checkbox" name="${field.name}" value="${option.id}" ${checked} />
                  <span>${label}</span>
                </label>
              `;
            })
            .join("")}
        </div>
      </fieldset>
    `;
  }

  return `
    <label>
      <span>${field.label}</span>
      <input
        name="${field.name}"
        value="${value}"
        placeholder="${field.placeholder || ""}"
        ${field.required ? "required" : ""}
      />
    </label>
  `;
}

function normalizeFormData(form, fields) {
  const output = {};
  const formData = new FormData(form);
  fields.forEach((field) => {
    if (field.type === "multiselect") {
      output[field.name] = formData.getAll(field.name);
    } else {
      output[field.name] = formData.get(field.name) || "";
    }
  });
  return output;
}

export function renderWorkspace({
  root,
  campaign,
  bundle,
  workspaceTab,
  editingEntity,
  onTabChange,
  onUpdateCampaignMeta,
  onEditEntity,
  onDeleteEntity,
  onSubmitEntity,
  onCancelEntityEdit,
}) {
  if (!campaign) {
    root.innerHTML = `
      <section class="card empty-state">
        <p class="eyebrow">Workspace</p>
        <h3 class="section-title">请选择或创建案件</h3>
        <p class="muted-copy">案件工作台会在这里展示结构化内容和编辑表单。</p>
      </section>
    `;
    return;
  }

  const config = entityConfig[workspaceTab];
  const collection = config ? bundle[config.collectionKey] : [];
  const draft =
    editingEntity ||
    (workspaceTab === "overview"
      ? campaign
      : config.fields.reduce((acc, field) => {
          acc[field.name] = field.type === "multiselect" ? [] : "";
          return acc;
        }, {}));

  const listMarkup =
    workspaceTab === "overview"
      ? `
      <article class="card">
        <p class="eyebrow">Campaign Overview</p>
        <h3 class="section-title">${campaign.title}</h3>
        <div class="key-value">
          <div><strong>核心真相</strong><span>${campaign.coreTruth || "未填写"}</span></div>
          <div><strong>玩家已知</strong><span>${campaign.playerKnowledge || "未填写"}</span></div>
          <div><strong>玩家误判</strong><span>${campaign.playerMisread || "未填写"}</span></div>
          <div><strong>下一步建议</strong><span>${campaign.nextSuggestion || "未填写"}</span></div>
          <div><strong>当前场景</strong><span>${bundle.scenes.find((scene) => scene.id === campaign.currentSceneId)?.title || "未指定"}</span></div>
        </div>
      </article>
    `
      : collection.length
      ? collection.map((item) => config.renderCard(item, bundle)).join("")
      : `<article class="mini-card empty-state"><p class="muted-copy">当前还没有${config.title}，右侧表单可以直接新增。</p></article>`;

  const editorMarkup =
    workspaceTab === "overview"
      ? `
      <form id="overview-form" class="entity-form">
        <label class="span-2">
          <span>核心真相</span>
          <textarea name="coreTruth" rows="4">${draft.coreTruth || ""}</textarea>
        </label>
        <label class="span-2">
          <span>玩家已知</span>
          <textarea name="playerKnowledge" rows="3">${draft.playerKnowledge || ""}</textarea>
        </label>
        <label class="span-2">
          <span>玩家误判</span>
          <textarea name="playerMisread" rows="3">${draft.playerMisread || ""}</textarea>
        </label>
        <label class="span-2">
          <span>下一步建议</span>
          <textarea name="nextSuggestion" rows="3">${draft.nextSuggestion || ""}</textarea>
        </label>
        <label class="span-2">
          <span>当前场景</span>
          <select name="currentSceneId">
            <option value="">未指定</option>
            ${bundle.scenes
              .map(
                (scene) =>
                  `<option value="${scene.id}" ${campaign.currentSceneId === scene.id ? "selected" : ""}>${scene.title}</option>`
              )
              .join("")}
          </select>
        </label>
        <div class="button-row span-2">
          <button class="action-button primary" type="submit">保存总览信息</button>
        </div>
      </form>
    `
      : `
      <form id="entity-form" class="entity-form">
        ${config.fields.map((field) => renderField(field, draft, bundle)).join("")}
        <div class="button-row span-2">
          <button type="submit" class="action-button primary">${editingEntity ? "保存修改" : `新增${config.title}`}</button>
          ${editingEntity ? '<button type="button" id="cancel-entity-edit" class="action-button">取消编辑</button>' : ""}
        </div>
      </form>
    `;

  root.innerHTML = `
    <section class="card">
      <p class="eyebrow">Campaign Workspace</p>
      <h3 class="section-title">${campaign.title}</h3>
      <div class="tabs">
        <button class="tab-button ${workspaceTab === "overview" ? "active" : ""}" data-tab="overview">总览</button>
        <button class="tab-button ${workspaceTab === "scenes" ? "active" : ""}" data-tab="scenes">场景</button>
        <button class="tab-button ${workspaceTab === "clues" ? "active" : ""}" data-tab="clues">线索</button>
        <button class="tab-button ${workspaceTab === "npcs" ? "active" : ""}" data-tab="npcs">NPC</button>
        <button class="tab-button ${workspaceTab === "clueProps" ? "active" : ""}" data-tab="clueProps">线索道具</button>
      </div>
      <div class="workspace-columns">
        <section>
          <div class="list-stack">${listMarkup}</div>
        </section>
        <section class="card editor-panel">
          <p class="eyebrow">${workspaceTab === "overview" ? "Overview Editor" : editingEntity ? "Edit Entity" : "New Entity"}</p>
          <h3 class="section-title">${workspaceTab === "overview" ? "编辑案件总览" : editingEntity ? `编辑${config.title}` : `新增${config.title}`}</h3>
          ${editorMarkup}
        </section>
      </div>
    </section>
  `;

  root.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => onTabChange(button.dataset.tab));
  });

  if (workspaceTab === "overview") {
    root.querySelector("#overview-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      onUpdateCampaignMeta(Object.fromEntries(formData.entries()));
    });
    return;
  }

  root.querySelectorAll("[data-edit-entity]").forEach((button) => {
    button.addEventListener("click", () => onEditEntity(button.dataset.editEntity));
  });
  root.querySelectorAll("[data-delete-entity]").forEach((button) => {
    button.addEventListener("click", () => onDeleteEntity(button.dataset.deleteEntity));
  });
  root.querySelector("#entity-form").addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmitEntity(normalizeFormData(event.currentTarget, config.fields));
  });
  root.querySelector("#cancel-entity-edit")?.addEventListener("click", onCancelEntityEdit);
}
