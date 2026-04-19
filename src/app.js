(function () {
  const STORAGE_KEY = "coc-kp-helper-data-v1";
  const LEGACY_KEYS = {
    clueProps: "handouts",
    cluePropIds: "handoutIds",
  };

  const PAGE_TITLES = {
    dashboard: "概览",
    campaigns: "案件库",
    workspace: "案件工作台",
    running: "跑团模式",
    sceneDescriptions: "场景描述库",
    clueProps: "线索道具库",
    reference: "规则速查",
  };

  const seedData = {
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
        currentSceneId: "dock-six",
        playerKnowledge: "记者失踪、账簿异常、六码头夜间活动频繁。",
        playerMisread: "玩家仍将案件理解为走私灭口，而非仪式准备。",
        nextSuggestion: "准备法医摊牌和仓库潜入的两套节奏，避免玩家过早撞向终局。",
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
        currentSceneId: "",
        playerKnowledge: "玩家尚未开始调查。",
        playerMisread: "无。",
        nextSuggestion: "先补一条白天探索庄园与一条夜间恐怖演出路径。",
      },
    ],
    scenes: [
      {
        id: "newspaper-office",
        campaignId: "misty-ledger",
        title: "《晨钟报》编辑部",
        type: "调查",
        summary: "记者最后出现的地方。桌面很整洁，只有被刻意撕走的一页速记本。",
        atmosphere: "昏黄吊灯、油墨味和深夜未散的烟雾，空气里残留着急促离开的痕迹。",
        clueNote: "可找到被压在打字机下的港口仓单编号。",
        fallback: "若玩家没搜到，编辑会在紧张时提到记者最近总去六码头。",
        clueIds: ["ledger-payments"],
        npcIds: ["editor-xu"],
        cluePropIds: ["torn-note"],
      },
      {
        id: "dock-six",
        campaignId: "misty-ledger",
        title: "六码头仓库",
        type: "潜入",
        summary: "夜里封锁的仓库区，巡逻比平常多，海风里夹着异样腥味。",
        atmosphere: "雾气吞掉远处汽笛声，脚步与海浪回响混杂，仿佛有什么在水下同步呼吸。",
        clueNote: "账簿上的付款对象与仓库登记簿上的假名一致。",
        fallback: "如果没有潜入成功，可从码头苦力口中得知今晚会有秘密装船。",
        clueIds: ["warehouse-alias"],
        npcIds: ["dock-clerk"],
        cluePropIds: ["warehouse-register"],
      },
      {
        id: "forensic-room",
        campaignId: "misty-ledger",
        title: "租界巡捕房法医室",
        type: "社交",
        summary: "法医表面冷静配合，实际隐瞒了一份与海水腐蚀有关的尸检异常。",
        atmosphere: "金属器械冰冷反光，福尔马林味压得人说话也想压低声音。",
        clueNote: "尸体肺部残留并不符合普通溺亡。",
        fallback: "法医若被识破恐惧，会主动请求保护并交出原始记录。",
        clueIds: ["corroded-lungs"],
        npcIds: ["chen-coroner"],
        cluePropIds: ["coroner-report"],
      },
    ],
    clues: [
      {
        id: "ledger-payments",
        campaignId: "misty-ledger",
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
        campaignId: "misty-ledger",
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
        campaignId: "misty-ledger",
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
        campaignId: "misty-ledger",
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
        campaignId: "misty-ledger",
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
        campaignId: "misty-ledger",
        name: "韩管理员",
        role: "仓库管理员",
        attitude: "敌对",
        publicInfo: "严词否认仓库夜间有异常活动。",
        secret: "他知道月蚀夜要装运的其实是祭器与被选中的祭品。",
        motivation: "保住密教提供的利益与地位。",
        clue: "若被逼入绝境，会泄露装船时间。",
      },
    ],
    clueProps: [
      {
        id: "torn-note",
        campaignId: "misty-ledger",
        title: "被撕裂的速记页",
        type: "纸质线索",
        template: "私人信件",
        reveal: "编辑部搜查成功时",
        effect: "让玩家意识到记者不是随意失踪，而是已经接近某个名单。",
        contentText:
          "六码头，17号仓。账本不是假的，假的是名字。别相信那个穿深色雨衣的人，他和港口会计是一伙的。",
      },
      {
        id: "coroner-report",
        campaignId: "misty-ledger",
        title: "尸检原始记录",
        type: "医疗档案",
        template: "医疗报告",
        reveal: "说服或威压法医后",
        effect: "把调查从普通谋杀转向异常仪式与海上活动。",
        contentText:
          "肺部存在异常盐晶沉积，呼吸道有细小撕裂。按常理不符合单纯溺亡。死者生前可能在清醒状态下短时间接触高盐水环境。",
      },
      {
        id: "warehouse-register",
        campaignId: "misty-ledger",
        title: "仓库登记簿影印件",
        type: "记录文书",
        template: "档案记录",
        reveal: "潜入仓库或贿赂苦力后",
        effect: "建立假名、账簿和仓库的关联。",
        contentText:
          "4月17日 夜班入库：木箱三件，登记人“周启仁”。备注：午夜前不得开封，优先装船。",
      },
    ],
    sceneDescriptions: [
      {
        id: "desc-dock-fog",
        campaignId: "misty-ledger",
        title: "六码头外侧的夜雾",
        sceneId: "dock-six",
        sortOrder: 1,
        tag: "开场描写",
        usageNote: "玩家第一次靠近码头外围时朗读，用来压低节奏、制造水下未知感。",
        content:
          "雾从江面缓慢推上来，把仓库、吊臂和远处的灯火一层层吞没。你们只能听见铁链轻轻碰撞的声音，还有某种像呼吸一样的潮汐节奏，正从六码头深处一下一下传出来。",
      },
      {
        id: "desc-coroner-room",
        campaignId: "misty-ledger",
        title: "法医室的冷白灯",
        sceneId: "forensic-room",
        sortOrder: 1,
        tag: "压迫感",
        usageNote: "玩家进入法医室时可直接朗读，也适合在摊牌前重复一句加强气氛。",
        content:
          "冷白色的灯把每一件金属器械都照得过分清楚，像是故意提醒你们这里每一道切口都曾真实发生。空气里有一股洗不掉的福尔马林味，让人本能地想把声音压低。",
      },
    ],
    sessionLogs: [
      {
        id: "log-1",
        campaignId: "misty-ledger",
        createdAt: "2026-04-19 19:00",
        text: "玩家已确认记者最后一次公开露面在《晨钟报》编辑部。",
      },
      {
        id: "log-2",
        campaignId: "misty-ledger",
        createdAt: "2026-04-19 19:40",
        text: "他们怀疑法医隐瞒尸检结论，但尚未提出直接威胁。",
      },
      {
        id: "log-3",
        campaignId: "misty-ledger",
        createdAt: "2026-04-19 20:15",
        text: "当前最危险的选择是今晚直接前往六码头仓库。",
      },
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

  const defaultUiState = {
    currentPage: "dashboard",
    currentCampaignId: "misty-ledger",
    workspaceTab: "overview",
    searchQuery: "",
    editingCampaignId: null,
    editingEntityId: null,
    editingSceneDescriptionId: null,
    draftLogText: "",
    flashMessage: null,
    relationFocus: null,
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function makeId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function nowLabel() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  function normalizeCampaign(campaign) {
    return {
      currentSceneId: "",
      playerKnowledge: "",
      playerMisread: "",
      nextSuggestion: "",
      status: "草稿",
      ...campaign,
    };
  }

  function normalizeEntityList(list, fallbackCampaignId, prefix, extraDefaults) {
    return (list || []).map((item, index) => ({
      id: item.id || `${prefix}-${index + 1}`,
      campaignId: item.campaignId || fallbackCampaignId,
      ...extraDefaults,
      ...item,
    }));
  }

  function normalizePersistedData(raw) {
    const seed = clone(seedData);
    if (!raw) return seed;

    const firstCampaignId = (raw.campaigns && raw.campaigns[0] && raw.campaigns[0].id) || seed.campaigns[0].id;
    const campaigns = (raw.campaigns || seed.campaigns).map(normalizeCampaign);
    return {
      campaigns,
      scenes: normalizeEntityList(raw.scenes || seed.scenes, firstCampaignId, "scene", {
        title: "",
        type: "",
        summary: "",
        atmosphere: "",
        clueNote: "",
        fallback: "",
        clueIds: [],
        npcIds: [],
        cluePropIds: [],
      }).map((scene) => ({
        ...scene,
        clueIds: Array.isArray(scene.clueIds) ? scene.clueIds : [],
        npcIds: Array.isArray(scene.npcIds) ? scene.npcIds : [],
        cluePropIds: Array.isArray(scene.cluePropIds)
          ? scene.cluePropIds
          : Array.isArray(scene[LEGACY_KEYS.cluePropIds])
          ? scene[LEGACY_KEYS.cluePropIds]
          : [],
      })),
      clues: normalizeEntityList(raw.clues || seed.clues, firstCampaignId, "clue", {
        title: "",
        type: "",
        source: "",
        content: "",
        fallback: "",
        leadsTo: "",
        status: "未获得",
      }),
      npcs: normalizeEntityList(raw.npcs || seed.npcs, firstCampaignId, "npc", {
        name: "",
        role: "",
        attitude: "",
        publicInfo: "",
        secret: "",
        motivation: "",
        clue: "",
      }),
      clueProps: normalizeEntityList(raw.clueProps || raw[LEGACY_KEYS.clueProps] || seed.clueProps, firstCampaignId, "clueProp", {
        title: "",
        type: "",
        template: "通用纸张",
        reveal: "",
        effect: "",
        contentText: "",
      }).map((clueProp) => ({
        ...clueProp,
        template: inferCluePropTemplate(clueProp),
      })),
      sceneDescriptions: normalizeEntityList(raw.sceneDescriptions || seed.sceneDescriptions, firstCampaignId, "sceneDescription", {
        title: "",
        sceneId: "",
        sortOrder: 1,
        tag: "",
        usageNote: "",
        content: "",
      }).map((entry) => ({
        ...entry,
        sortOrder: Number.isFinite(Number(entry.sortOrder)) ? Number(entry.sortOrder) : 1,
      })),
      sessionLogs: normalizeEntityList(raw.sessionLogs || seed.sessionLogs, firstCampaignId, "log", {
        createdAt: nowLabel(),
        text: "",
      }),
      reference: clone(seed.reference),
    };
  }

  function loadData() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return normalizePersistedData(raw ? JSON.parse(raw) : null);
    } catch (error) {
      return clone(seedData);
    }
  }

  const state = { ...defaultUiState };
  const data = loadData();

  function persist() {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        campaigns: data.campaigns,
        scenes: data.scenes,
        clues: data.clues,
        npcs: data.npcs,
        clueProps: data.clueProps,
        sceneDescriptions: data.sceneDescriptions,
        sessionLogs: data.sessionLogs,
      })
    );
  }

  function getCampaign() {
    return data.campaigns.find((campaign) => campaign.id === state.currentCampaignId) || data.campaigns[0] || null;
  }

  function getCampaignBundle(campaignId) {
    const targetCampaignId = campaignId || state.currentCampaignId;
    return {
      campaign: data.campaigns.find((campaign) => campaign.id === targetCampaignId) || null,
      scenes: data.scenes.filter((item) => item.campaignId === targetCampaignId),
      clues: data.clues.filter((item) => item.campaignId === targetCampaignId),
      npcs: data.npcs.filter((item) => item.campaignId === targetCampaignId),
      clueProps: data.clueProps.filter((item) => item.campaignId === targetCampaignId),
      sceneDescriptions: data.sceneDescriptions.filter((item) => item.campaignId === targetCampaignId),
      sessionLogs: data.sessionLogs
        .filter((item) => item.campaignId === targetCampaignId)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    };
  }

  function getEntity(entityType, entityId) {
    return data[entityType].find((item) => item.id === entityId) || null;
  }

  function createLayoutBindings() {
    return {
      pageTitle: document.getElementById("page-title"),
      navButtons: [...document.querySelectorAll(".nav-item")],
      searchInput: document.getElementById("global-search"),
      newCampaignButton: document.getElementById("new-campaign-button"),
      exportButton: document.getElementById("export-button"),
      importButton: document.getElementById("import-button"),
      resetButton: document.getElementById("reset-button"),
      importFileInput: document.getElementById("import-file-input"),
      feedbackBanner: document.getElementById("feedback-banner"),
      sidebarCampaignTitle: document.getElementById("sidebar-campaign-title"),
      sidebarCampaignSummary: document.getElementById("sidebar-campaign-summary"),
      sidebarOpenClues: document.getElementById("sidebar-open-clues"),
      sidebarOpenThreads: document.getElementById("sidebar-open-threads"),
      pages: {
        dashboard: document.getElementById("page-dashboard"),
        campaigns: document.getElementById("page-campaigns"),
        workspace: document.getElementById("page-workspace"),
        running: document.getElementById("page-running"),
        sceneDescriptions: document.getElementById("page-scene-descriptions"),
        clueProps: document.getElementById("page-clue-props"),
        reference: document.getElementById("page-reference"),
      },
    };
  }

  function updateLayoutChrome(bindings, campaign, bundle) {
    bindings.pageTitle.textContent = PAGE_TITLES[state.currentPage];
    bindings.sidebarCampaignTitle.textContent = campaign ? campaign.title : "尚未创建案件";
    bindings.sidebarCampaignSummary.textContent = campaign
      ? campaign.pitch
      : "点击“新建案件”开始构建你的第一场调查。";
    bindings.sidebarOpenClues.textContent = `开放线索 ${bundle.clues.length}`;
    bindings.sidebarOpenThreads.textContent = `未回收伏笔 ${bundle.clues.filter((item) => item.status !== "已获得").length}`;

    bindings.navButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.page === state.currentPage);
    });

    Object.entries(bindings.pages).forEach(([key, element]) => {
      element.classList.toggle("active", key === state.currentPage);
    });

    if (state.flashMessage) {
      bindings.feedbackBanner.textContent = state.flashMessage.text;
      bindings.feedbackBanner.className = `feedback-banner ${state.flashMessage.type || ""}`.trim();
    } else {
      bindings.feedbackBanner.textContent = "";
      bindings.feedbackBanner.className = "feedback-banner hidden";
    }
  }

  function setFlash(text, type) {
    state.flashMessage = { text: text, type: type || "success" };
    if (setFlash._timer) clearTimeout(setFlash._timer);
    setFlash._timer = setTimeout(() => {
      state.flashMessage = null;
      renderApp();
    }, 2600);
  }

  function formatEntityList(items, labelKey) {
    const names = items.map((item) => item[labelKey]).filter(Boolean);
    if (!names.length) return "未命名";
    if (names.length <= 3) return names.join(" / ");
    return `${names.slice(0, 3).join(" / ")} 等 ${names.length} 项`;
  }

  function inferCluePropTemplate(clueProp) {
    const template = String(clueProp.template || "").trim();
    if (template) return template;

    const haystack = `${clueProp.title || ""} ${clueProp.type || ""}`.toLowerCase();
    if (haystack.includes("报") || haystack.includes("新闻") || haystack.includes("剪报")) return "报纸剪报";
    if (haystack.includes("尸检") || haystack.includes("医疗") || haystack.includes("法医") || haystack.includes("病历"))
      return "医疗报告";
    if (haystack.includes("档案") || haystack.includes("记录") || haystack.includes("登记") || haystack.includes("文书"))
      return "档案记录";
    if (haystack.includes("信") || haystack.includes("便条") || haystack.includes("速记")) return "私人信件";
    return "通用纸张";
  }

  function getTemplateTone(template) {
    return {
      "通用纸张": "普通资料",
      "报纸剪报": "旧报纸版式",
      "私人信件": "私人书信版式",
      "档案记录": "档案夹版式",
      "医疗报告": "医务记录版式",
    }[template || "通用纸张"];
  }

  function renderCluePropPreview(clueProp) {
    const template = inferCluePropTemplate(clueProp);
    const contentText = clueProp.contentText || "这里会显示线索道具正文预览。";
    const templateKey =
      {
        "通用纸张": "generic",
        "报纸剪报": "newspaper",
        "私人信件": "letter",
        "档案记录": "dossier",
        "医疗报告": "medical",
      }[template] || "generic";

    const headerMarkup =
      template === "报纸剪报"
        ? `<div class="clue-prop-template-head"><span>剪报存档</span><strong>${clueProp.title}</strong></div>`
        : template === "私人信件"
        ? `<div class="clue-prop-template-head"><span>私人信件</span><strong>${clueProp.title}</strong></div>`
        : template === "档案记录"
        ? `<div class="clue-prop-template-head"><span>档案记录</span><strong>${clueProp.title}</strong></div>`
        : template === "医疗报告"
        ? `<div class="clue-prop-template-head"><span>医疗报告</span><strong>${clueProp.title}</strong></div>`
        : `<div class="clue-prop-template-head"><span>线索资料</span><strong>${clueProp.title}</strong></div>`;

    return `
      <div class="clue-prop-preview">
        <div class="clue-prop-preview-meta">
          <p class="eyebrow">预览</p>
          <span class="pill">${template}</span>
        </div>
        <div class="clue-prop-paper template-${templateKey}">
          ${headerMarkup}
          <div class="clue-prop-paper-body">${contentText}</div>
          <div class="clue-prop-paper-foot">${getTemplateTone(template)}</div>
        </div>
      </div>
    `;
  }

  function getSortedSceneDescriptions(items) {
    return [...items].sort((a, b) => {
      const orderDiff = (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0);
      if (orderDiff !== 0) return orderDiff;
      return String(a.title || "").localeCompare(String(b.title || ""), "zh-CN");
    });
  }

  function getMaxSceneDescriptionOrder(campaignId, sceneId) {
    return data.sceneDescriptions
      .filter((item) => item.campaignId === campaignId && (item.sceneId || "") === (sceneId || ""))
      .reduce((max, item) => Math.max(max, Number(item.sortOrder) || 0), 0);
  }

  function renumberSceneDescriptionGroup(campaignId, sceneId) {
    getSortedSceneDescriptions(
      data.sceneDescriptions.filter((item) => item.campaignId === campaignId && (item.sceneId || "") === (sceneId || ""))
    ).forEach((item, index) => {
      item.sortOrder = index + 1;
    });
  }

  function getHealthCheck(campaign, bundle) {
    if (!campaign) return [];
    const issues = [];
    const keyClues = bundle.clues.filter((item) => String(item.type || "").includes("关键"));
    const scenesByKeyClue = new Map(
      keyClues.map((clue) => [clue.id, bundle.scenes.filter((scene) => (scene.clueIds || []).includes(clue.id))])
    );

    if (!bundle.scenes.length) {
      issues.push({ title: "没有场景", body: "建议至少建立 2 到 3 个核心调查场景，避免案件结构过空。" });
    }
    if (!bundle.clues.length) {
      issues.push({ title: "没有线索", body: "当前案件还没有任何线索，玩家会缺少推进调查的抓手。" });
    }
    if (campaign.currentSceneId && !bundle.scenes.some((scene) => scene.id === campaign.currentSceneId)) {
      issues.push({ title: "当前场景失效", body: "当前场景指向了一个不存在的场景，建议重新指定跑团入口。" });
    } else if (!campaign.currentSceneId) {
      issues.push({ title: "未指定当前场景", body: "跑团模式更依赖当前场景，建议在总览里先指定一个。" });
    }
    if (keyClues.length === 1) {
      issues.push({
        title: "仅有一条关键线索",
        body: `当前只有「${keyClues[0].title}」被标记为关键线索，建议至少再准备一条主推进抓手。`,
      });
    }

    const missingFallbackKeyClues = keyClues.filter((item) => !String(item.fallback || "").trim());
    if (missingFallbackKeyClues.length) {
      issues.push({
        title: "关键线索缺少补救",
        body: `这些关键线索目前还没有备用来源：${formatEntityList(missingFallbackKeyClues, "title")}。`,
      });
    }

    const unlinkedKeyClues = keyClues.filter((item) => !(scenesByKeyClue.get(item.id) || []).length);
    if (unlinkedKeyClues.length) {
      issues.push({
        title: "关键线索未落到场景",
        body: `这些关键线索还没有挂到具体场景：${formatEntityList(unlinkedKeyClues, "title")}。`,
      });
    }

    const keyCluesWithoutLead = keyClues.filter((item) => !String(item.leadsTo || "").trim());
    if (keyCluesWithoutLead.length) {
      issues.push({
        title: "关键线索缺少导向",
        body: `这些关键线索还没有说明会把调查带向哪里：${formatEntityList(keyCluesWithoutLead, "title")}。`,
      });
    }

    const keyClueSceneSet = new Set(
      keyClues.flatMap((item) => (scenesByKeyClue.get(item.id) || []).map((scene) => scene.id))
    );
    if (keyClues.length >= 2 && keyClueSceneSet.size === 1) {
      const onlyScene = bundle.scenes.find((scene) => scene.id === [...keyClueSceneSet][0]);
      issues.push({
        title: "关键线索过度集中",
        body: `多条关键线索都集中在「${onlyScene?.title || "同一场景"}」，建议分散到不同调查入口。`,
      });
    }

    const clueLessScenes = bundle.scenes.filter((item) => !(item.clueIds || []).length && !String(item.clueNote || "").trim());
    if (clueLessScenes.length) {
      issues.push({
        title: "存在空场景",
        body: `这些场景既没有关联线索，也没有填写关键线索说明：${formatEntityList(clueLessScenes, "title")}。`,
      });
    }

    const orphanNpcs = bundle.npcs.filter(
      (npc) => String(npc.clue || npc.publicInfo || npc.secret || "").trim() && !bundle.scenes.some((scene) => (scene.npcIds || []).includes(npc.id))
    );
    if (orphanNpcs.length) {
      issues.push({
        title: "NPC 没有出场路径",
        body: `这些 NPC 已写了信息，但没有挂到场景里：${formatEntityList(orphanNpcs, "name")}。`,
      });
    }

    const orphanClueProps = bundle.clueProps.filter(
      (clueProp) =>
        String(clueProp.effect || clueProp.contentText || clueProp.reveal || "").trim() &&
        !bundle.scenes.some((scene) => (scene.cluePropIds || []).includes(clueProp.id))
    );
    if (orphanClueProps.length) {
      issues.push({
        title: "线索道具没有出现场景",
        body: `这些线索道具已经写好，但没有挂到场景里：${formatEntityList(orphanClueProps, "title")}。`,
      });
    }

    return issues.slice(0, 8);
  }

  function uniqueById(items) {
    const seen = new Set();
    return items.filter((item) => {
      if (!item || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

  function getRelationNodeMeta(type) {
    return {
      scene: { title: "场景", eyebrow: "Scene Node", workspaceTab: "scenes" },
      clue: { title: "线索", eyebrow: "Clue Node", workspaceTab: "clues" },
      npc: { title: "NPC", eyebrow: "NPC Node", workspaceTab: "npcs" },
      clueProp: { title: "线索道具", eyebrow: "Prop Node", workspaceTab: "clueProps" },
    }[type];
  }

  function getRelationEntity(bundle, focus) {
    if (!focus) return null;
    if (focus.type === "scene") return bundle.scenes.find((item) => item.id === focus.id) || null;
    if (focus.type === "clue") return bundle.clues.find((item) => item.id === focus.id) || null;
    if (focus.type === "npc") return bundle.npcs.find((item) => item.id === focus.id) || null;
    if (focus.type === "clueProp") return bundle.clueProps.find((item) => item.id === focus.id) || null;
    return null;
  }

  function getRelationSummary(type, entity) {
    if (!entity) return "";
    if (type === "scene") return entity.summary || entity.atmosphere || "这个场景还没有补充说明。";
    if (type === "clue") return entity.content || entity.fallback || "这条线索还没有补充说明。";
    if (type === "npc") return entity.publicInfo || entity.secret || "这个 NPC 还没有补充说明。";
    if (type === "clueProp") return entity.effect || entity.contentText || "这个线索道具还没有补充说明。";
    return "";
  }

  function getRelationNodeTitle(type, entity) {
    if (!entity) return "";
    return type === "npc" ? entity.name : entity.title;
  }

  function getFocusBadge(type, entity) {
    if (!entity) return "";
    if (type === "scene") return entity.type || "场景";
    if (type === "clue") return entity.status || entity.type || "线索";
    if (type === "npc") return entity.role || "NPC";
    if (type === "clueProp") return entity.type || "线索道具";
    return "";
  }

  function renderRelationEditor(bundle, focus, entity) {
    if (!entity || !focus) return "";

    if (focus.type === "scene") {
      return `
        <form class="relation-editor" data-relation-editor="true">
          <div class="relation-detail-group-head">
            <strong>快速调整关联</strong>
            <span class="relation-count">场景关系</span>
          </div>
          <fieldset class="entity-multiselect">
            <legend>关联线索</legend>
            <div class="checkbox-grid">
              ${
                bundle.clues.length
                  ? bundle.clues
                      .map(
                        (clue) => `
                        <label class="checkbox-item">
                          <input type="checkbox" name="clueIds" value="${clue.id}" ${(entity.clueIds || []).includes(clue.id) ? "checked" : ""} />
                          <span>${clue.title}</span>
                        </label>`
                      )
                      .join("")
                  : `<p class="relation-empty span-2">当前还没有线索。</p>`
              }
            </div>
          </fieldset>
          <fieldset class="entity-multiselect">
            <legend>关联 NPC</legend>
            <div class="checkbox-grid">
              ${
                bundle.npcs.length
                  ? bundle.npcs
                      .map(
                        (npc) => `
                        <label class="checkbox-item">
                          <input type="checkbox" name="npcIds" value="${npc.id}" ${(entity.npcIds || []).includes(npc.id) ? "checked" : ""} />
                          <span>${npc.name}</span>
                        </label>`
                      )
                      .join("")
                  : `<p class="relation-empty span-2">当前还没有 NPC。</p>`
              }
            </div>
          </fieldset>
          <fieldset class="entity-multiselect">
            <legend>关联线索道具</legend>
            <div class="checkbox-grid">
              ${
                bundle.clueProps.length
                  ? bundle.clueProps
                      .map(
                        (clueProp) => `
                        <label class="checkbox-item">
                          <input type="checkbox" name="cluePropIds" value="${clueProp.id}" ${(entity.cluePropIds || []).includes(clueProp.id) ? "checked" : ""} />
                          <span>${clueProp.title}</span>
                        </label>`
                      )
                      .join("")
                  : `<p class="relation-empty span-2">当前还没有线索道具。</p>`
              }
            </div>
          </fieldset>
          <div class="button-row tight">
            <button type="submit" class="action-button primary">保存关系调整</button>
          </div>
        </form>
      `;
    }

    const sceneIds =
      focus.type === "clue"
        ? bundle.scenes.filter((scene) => (scene.clueIds || []).includes(entity.id)).map((scene) => scene.id)
        : focus.type === "npc"
        ? bundle.scenes.filter((scene) => (scene.npcIds || []).includes(entity.id)).map((scene) => scene.id)
        : bundle.scenes.filter((scene) => (scene.cluePropIds || []).includes(entity.id)).map((scene) => scene.id);

    return `
      <form class="relation-editor" data-relation-editor="true">
        <div class="relation-detail-group-head">
          <strong>快速调整挂接场景</strong>
          <span class="relation-count">${sceneIds.length}</span>
        </div>
        <fieldset class="entity-multiselect">
          <legend>当前节点出现在哪些场景</legend>
          <div class="checkbox-grid">
            ${
              bundle.scenes.length
                ? bundle.scenes
                    .map(
                      (scene) => `
                      <label class="checkbox-item">
                        <input type="checkbox" name="sceneIds" value="${scene.id}" ${sceneIds.includes(scene.id) ? "checked" : ""} />
                        <span>${scene.title}</span>
                      </label>`
                    )
                    .join("")
                : `<p class="relation-empty span-2">当前还没有场景。</p>`
            }
          </div>
        </fieldset>
        <p class="small-copy">保存后，这个${getRelationNodeMeta(focus.type).title}会被批量挂接到你勾选的场景里。</p>
        <div class="button-row tight">
          <button type="submit" class="action-button primary">保存挂接关系</button>
        </div>
      </form>
    `;
  }

  function applyRelationBoardUpdate(bundle, focus, form) {
    const entity = getRelationEntity(bundle, focus);
    if (!entity) return;

    const formData = new FormData(form);

    if (focus.type === "scene") {
      entity.clueIds = formData.getAll("clueIds");
      entity.npcIds = formData.getAll("npcIds");
      entity.cluePropIds = formData.getAll("cluePropIds");
      persist();
      setFlash(`已更新场景「${entity.title}」的关联关系。`, "success");
      return;
    }

    const selectedSceneIds = new Set(formData.getAll("sceneIds"));
    bundle.scenes.forEach((scene) => {
      const key = focus.type === "clue" ? "clueIds" : focus.type === "npc" ? "npcIds" : "cluePropIds";
      const currentIds = new Set(scene[key] || []);
      if (selectedSceneIds.has(scene.id)) {
        currentIds.add(entity.id);
      } else {
        currentIds.delete(entity.id);
      }
      scene[key] = [...currentIds];
    });
    persist();
    setFlash(`已更新${getRelationNodeMeta(focus.type).title}「${getRelationNodeTitle(focus.type, entity)}」的场景挂接。`, "success");
  }

  function getRelationFocus(bundle, campaign) {
    const existing = getRelationEntity(bundle, state.relationFocus);
    if (existing && state.relationFocus) return state.relationFocus;
    if (campaign?.currentSceneId && bundle.scenes.some((scene) => scene.id === campaign.currentSceneId)) {
      return { type: "scene", id: campaign.currentSceneId };
    }
    if (bundle.scenes[0]) return { type: "scene", id: bundle.scenes[0].id };
    if (bundle.clues[0]) return { type: "clue", id: bundle.clues[0].id };
    if (bundle.npcs[0]) return { type: "npc", id: bundle.npcs[0].id };
    if (bundle.clueProps[0]) return { type: "clueProp", id: bundle.clueProps[0].id };
    return null;
  }

  function getRelationGroups(bundle, focus) {
    const entity = getRelationEntity(bundle, focus);
    if (!entity) return [];

    let scenes = [];
    let clues = [];
    let npcs = [];
    let clueProps = [];

    if (focus.type === "scene") {
      scenes = [entity];
      clues = uniqueById((entity.clueIds || []).map((id) => bundle.clues.find((item) => item.id === id)));
      npcs = uniqueById((entity.npcIds || []).map((id) => bundle.npcs.find((item) => item.id === id)));
      clueProps = uniqueById((entity.cluePropIds || []).map((id) => bundle.clueProps.find((item) => item.id === id)));
    }

    if (focus.type === "clue") {
      scenes = uniqueById(bundle.scenes.filter((scene) => (scene.clueIds || []).includes(entity.id)));
      npcs = uniqueById(
        scenes.flatMap((scene) => (scene.npcIds || []).map((id) => bundle.npcs.find((item) => item.id === id)))
      );
      clueProps = uniqueById(
        scenes.flatMap((scene) => (scene.cluePropIds || []).map((id) => bundle.clueProps.find((item) => item.id === id)))
      );
      clues = [entity];
    }

    if (focus.type === "npc") {
      scenes = uniqueById(bundle.scenes.filter((scene) => (scene.npcIds || []).includes(entity.id)));
      clues = uniqueById(
        scenes.flatMap((scene) => (scene.clueIds || []).map((id) => bundle.clues.find((item) => item.id === id)))
      );
      clueProps = uniqueById(
        scenes.flatMap((scene) => (scene.cluePropIds || []).map((id) => bundle.clueProps.find((item) => item.id === id)))
      );
      npcs = [entity];
    }

    if (focus.type === "clueProp") {
      scenes = uniqueById(bundle.scenes.filter((scene) => (scene.cluePropIds || []).includes(entity.id)));
      clues = uniqueById(
        scenes.flatMap((scene) => (scene.clueIds || []).map((id) => bundle.clues.find((item) => item.id === id)))
      );
      npcs = uniqueById(
        scenes.flatMap((scene) => (scene.npcIds || []).map((id) => bundle.npcs.find((item) => item.id === id)))
      );
      clueProps = [entity];
    }

    return [
      { type: "scene", label: "关联场景", items: uniqueById(scenes).filter((item) => item.id !== (focus.type === "scene" ? entity.id : null)) },
      { type: "clue", label: "关联线索", items: uniqueById(clues).filter((item) => item.id !== (focus.type === "clue" ? entity.id : null)) },
      { type: "npc", label: "关联 NPC", items: uniqueById(npcs).filter((item) => item.id !== (focus.type === "npc" ? entity.id : null)) },
      {
        type: "clueProp",
        label: "关联线索道具",
        items: uniqueById(clueProps).filter((item) => item.id !== (focus.type === "clueProp" ? entity.id : null)),
      },
    ];
  }

  function renderRelationBoard(bundle, campaign) {
    const focus = getRelationFocus(bundle, campaign);
    if (!focus) {
      return `
        <article class="card">
          <p class="eyebrow">Relation Board</p>
          <h3 class="section-title">案件关系板</h3>
          <p class="muted-copy">先添加场景、线索、NPC 或线索道具，关系板才会出现。</p>
        </article>
      `;
    }

    const entity = getRelationEntity(bundle, focus);
    const meta = getRelationNodeMeta(focus.type);
    const groups = getRelationGroups(bundle, focus);
    const sections = [
      { type: "scene", label: "场景", items: bundle.scenes },
      { type: "clue", label: "线索", items: bundle.clues },
      { type: "npc", label: "NPC", items: bundle.npcs },
      { type: "clueProp", label: "线索道具", items: bundle.clueProps },
    ];

    return `
      <article class="card">
        <p class="eyebrow">Relation Board</p>
        <h3 class="section-title">案件关系板</h3>
        <div class="relation-board">
          <section class="relation-browser">
            ${sections
              .map(
                (section) => `
                <div class="relation-section">
                  <div class="relation-section-head">
                    <strong>${section.label}</strong>
                    <span class="pill">${section.items.length}</span>
                  </div>
                  <div class="relation-node-grid">
                    ${
                      section.items.length
                        ? section.items
                            .map(
                              (item) => `
                              <button
                                type="button"
                                class="relation-node-button ${focus.type === section.type && focus.id === item.id ? "active" : ""}"
                                data-focus-node="true"
                                data-node-type="${section.type}"
                                data-node-id="${item.id}"
                              >
                                <span class="relation-node-title">${section.type === "npc" ? item.name : item.title}</span>
                                <span class="relation-node-meta">${
                                  section.type === "scene"
                                    ? item.type || "场景"
                                    : section.type === "clue"
                                    ? item.status || item.type || "线索"
                                    : section.type === "npc"
                                    ? item.role || "NPC"
                                    : item.type || "线索道具"
                                }</span>
                              </button>`
                            )
                            .join("")
                        : `<div class="relation-empty">暂无${section.label}</div>`
                    }
                  </div>
                </div>`
              )
              .join("")}
          </section>
          <section class="relation-detail">
            <div class="relation-detail-head">
              <div>
                <p class="eyebrow">${meta.eyebrow}</p>
                <h4 class="relation-detail-title">${focus.type === "npc" ? entity.name : entity.title}</h4>
              </div>
              <span class="pill warning">${getFocusBadge(focus.type, entity)}</span>
            </div>
            <p class="muted-copy">${getRelationSummary(focus.type, entity)}</p>
            <div class="button-row tight">
              <button
                type="button"
                class="action-button"
                data-open-node="true"
                data-node-type="${focus.type}"
                data-node-id="${entity.id}"
              >
                跳到对应编辑项
              </button>
            </div>
            ${renderRelationEditor(bundle, focus, entity)}
            <div class="relation-group-list">
              ${groups
                .map(
                  (group) => `
                  <div class="relation-detail-group">
                    <div class="relation-detail-group-head">
                      <strong>${group.label}</strong>
                      <span class="relation-count">${group.items.length}</span>
                    </div>
                    ${
                      group.items.length
                        ? group.items
                            .map(
                              (item) => `
                              <button
                                type="button"
                                class="relation-link"
                                data-open-node="true"
                                data-node-type="${group.type}"
                                data-node-id="${item.id}"
                              >
                                <span>${group.type === "npc" ? item.name : item.title}</span>
                                <span class="small-copy">打开</span>
                              </button>`
                            )
                            .join("")
                        : `<p class="relation-empty">暂无${group.label}</p>`
                    }
                  </div>`
                )
                .join("")}
            </div>
          </section>
        </div>
      </article>
    `;
  }

  function renderSearchResults(root, campaign, npcs, clues, clueProps, sceneDescriptions) {
    root.querySelectorAll(".search-results").forEach((el) => el.remove());

    const normalizedQuery = state.searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return;

    const searchable = [
      ...npcs.map((npc) => ({ type: "NPC", title: npc.name, body: `${npc.role} · ${npc.publicInfo}` })),
      ...clues.map((clue) => ({ type: "线索", title: clue.title, body: `${clue.source} · ${clue.content}` })),
      ...clueProps.map((clueProp) => ({ type: "线索道具", title: clueProp.title, body: `${clueProp.type} · ${clueProp.effect}` })),
      ...sceneDescriptions.map((entry) => ({ type: "场景描述", title: entry.title, body: `${entry.tag} · ${entry.content}` })),
      ...(campaign ? [{ type: "案件", title: campaign.title, body: campaign.pitch }] : []),
    ].filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(normalizedQuery));

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

    root.prepend(results);
  }

  function renderDashboard(root, campaign, bundle) {
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
    const healthIssues = getHealthCheck(campaign, bundle);

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
            <div><strong>核心真相</strong><span>${campaign.coreTruth || "未填写"}</span></div>
            <div><strong>玩家已知</strong><span>${campaign.playerKnowledge || "未填写"}</span></div>
            <div><strong>玩家误判</strong><span>${campaign.playerMisread || "未填写"}</span></div>
            <div><strong>下一步建议</strong><span>${campaign.nextSuggestion || "未填写"}</span></div>
          </div>
        </section>
        <section class="card">
          <p class="eyebrow">Keeper Focus</p>
          <h3 class="section-title">健康检查与当前提示</h3>
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
              <p class="list-copy">${bundle.sessionLogs[0] ? bundle.sessionLogs[0].text : "还没有跑团记录。可去“跑团模式”快速追加。"}</p>
            </div>
          </div>
          <div class="issue-list" style="margin-top: 16px;">
            ${
              healthIssues.length
                ? healthIssues
                    .map(
                      (issue) => `
                      <article class="issue-item">
                        <strong>${issue.title}</strong>
                        <span class="small-copy">${issue.body}</span>
                      </article>`
                    )
                    .join("")
                : `<article class="issue-item"><strong>健康检查通过</strong><span class="small-copy">当前案件已经具备基础的跑团结构，没有发现明显的断线风险。</span></article>`
            }
          </div>
        </section>
      </div>
    `;
  }

  function renderCampaigns(root, editingCampaign) {
    const draft = editingCampaign || {
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

    root.innerHTML = `
      <div class="workspace-columns">
        <section class="card">
          <p class="eyebrow">Campaign Library</p>
          <h3 class="section-title">案件列表</h3>
          <div class="list-stack">
            ${data.campaigns
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
                  <div class="chip-row"><span class="chip">${campaign.theme}</span></div>
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
            <label><span>案件标题</span><input name="title" value="${draft.title}" required /></label>
            <label><span>时代与地点</span><input name="era" value="${draft.era}" placeholder="例如：1920s 上海租界" required /></label>
            <label><span>主题</span><input name="theme" value="${draft.theme}" placeholder="都市阴谋 / 古宅 / 邪教" /></label>
            <label><span>状态</span>
              <select name="status">
                ${["草稿", "进行中", "已归档"]
                  .map((option) => `<option value="${option}" ${draft.status === option ? "selected" : ""}>${option}</option>`)
                  .join("")}
              </select>
            </label>
            <label class="span-2"><span>一句话钩子</span><textarea name="pitch" rows="3" required>${draft.pitch}</textarea></label>
            <label class="span-2"><span>核心真相</span><textarea name="coreTruth" rows="4">${draft.coreTruth}</textarea></label>
            <label class="span-2"><span>玩家已知</span><textarea name="playerKnowledge" rows="3">${draft.playerKnowledge}</textarea></label>
            <label class="span-2"><span>玩家误判</span><textarea name="playerMisread" rows="3">${draft.playerMisread}</textarea></label>
            <label class="span-2"><span>下一步建议</span><textarea name="nextSuggestion" rows="3">${draft.nextSuggestion}</textarea></label>
            <div class="button-row span-2">
              <button type="submit" class="action-button primary">${editingCampaign ? "保存修改" : "创建案件"}</button>
              ${editingCampaign ? '<button type="button" id="cancel-campaign-edit" class="action-button">取消编辑</button>' : ""}
            </div>
          </form>
        </section>
      </div>
    `;

    root.querySelectorAll("[data-open]").forEach((button) => {
      button.addEventListener("click", () => {
        state.currentCampaignId = button.dataset.open;
        state.currentPage = "workspace";
        state.editingCampaignId = null;
        state.editingEntityId = null;
        renderApp();
      });
    });

    root.querySelectorAll("[data-edit]").forEach((button) => {
      button.addEventListener("click", () => {
        state.editingCampaignId = button.dataset.edit;
        renderApp();
      });
    });

    root.querySelectorAll("[data-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!window.confirm("删除案件会同时移除其场景、线索、NPC、线索道具和跑团记录，确定继续吗？")) return;
        removeCampaign(button.dataset.delete);
        renderApp();
      });
    });

    root.querySelector("#campaign-form").addEventListener("submit", (event) => {
      event.preventDefault();
      upsertCampaign(Object.fromEntries(new FormData(event.currentTarget).entries()));
      renderApp();
    });

    const cancelButton = root.querySelector("#cancel-campaign-edit");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        state.editingCampaignId = null;
        renderApp();
      });
    }
  }

  const entityConfig = {
    scenes: {
      title: "场景",
      collectionKey: "scenes",
      fields: [
        { name: "title", label: "场景名", type: "input", required: true },
        { name: "type", label: "场景类型", type: "input", placeholder: "调查 / 社交 / 潜入" },
        { name: "summary", label: "场景简介", type: "textarea", rows: 3, wide: true },
        { name: "atmosphere", label: "氛围描述", type: "textarea", rows: 3, wide: true },
        { name: "clueNote", label: "关键线索", type: "textarea", rows: 3, wide: true },
        { name: "fallback", label: "补救线索", type: "textarea", rows: 3, wide: true },
        { name: "clueIds", label: "关联线索", type: "multiselect", optionKey: "clues", optionLabel: "title" },
        { name: "npcIds", label: "关联 NPC", type: "multiselect", optionKey: "npcs", optionLabel: "name" },
        { name: "cluePropIds", label: "关联线索道具", type: "multiselect", optionKey: "clueProps", optionLabel: "title" },
      ],
      renderCard(item, bundle) {
        const clueTitles = (item.clueIds || []).map((id) => bundle.clues.find((clue) => clue.id === id)?.title).filter(Boolean);
        const npcNames = (item.npcIds || []).map((id) => bundle.npcs.find((npc) => npc.id === id)?.name).filter(Boolean);
        const cluePropTitles = (item.cluePropIds || [])
          .map((id) => bundle.clueProps.find((clueProp) => clueProp.id === id)?.title)
          .filter(Boolean);
        return `
          <article class="scene-card">
            <header><div><p class="eyebrow">${item.type || "场景"}</p><h3>${item.title}</h3></div></header>
            <p class="muted-copy">${item.summary || "暂无简介"}</p>
            <div class="key-value compact">
              <div><strong>氛围</strong><span>${item.atmosphere || "未填写"}</span></div>
              <div><strong>线索</strong><span>${item.clueNote || "未填写"}</span></div>
              <div><strong>关联线索</strong><span>${clueTitles.join(" / ") || "未关联"}</span></div>
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
        { name: "content", label: "内容", type: "textarea", rows: 3, wide: true },
        { name: "fallback", label: "备用来源", type: "textarea", rows: 2, wide: true },
        { name: "leadsTo", label: "导向", type: "input" },
      ],
      renderCard(item) {
        return `
          <article class="clue-card">
            <header>
              <div><p class="eyebrow">${item.type || "线索"}</p><h3>${item.title}</h3></div>
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
        { name: "publicInfo", label: "公开信息", type: "textarea", rows: 3, wide: true },
        { name: "secret", label: "隐藏秘密", type: "textarea", rows: 3, wide: true },
        { name: "motivation", label: "动机", type: "textarea", rows: 2, wide: true },
        { name: "clue", label: "可透露线索", type: "textarea", rows: 2, wide: true },
      ],
      renderCard(item) {
        return `
          <article class="npc-card">
            <header>
              <div><p class="eyebrow">${item.role || "NPC"}</p><h3>${item.name}</h3></div>
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
        { name: "template", label: "展示模板", type: "select", options: ["通用纸张", "报纸剪报", "私人信件", "档案记录", "医疗报告"] },
        { name: "reveal", label: "揭示时机", type: "textarea", rows: 2, wide: true },
        { name: "effect", label: "作用", type: "textarea", rows: 3, wide: true },
        { name: "contentText", label: "正文内容", type: "textarea", rows: 8, wide: true },
      ],
      renderCard(item) {
        return `
          <article class="clue-prop-card">
            <header><div><p class="eyebrow">${item.type || "线索道具"}</p><h3>${item.title}</h3></div></header>
            <div class="key-value compact">
              <div><strong>展示模板</strong><span>${inferCluePropTemplate(item)}</span></div>
              <div><strong>揭示时机</strong><span>${item.reveal || "未填写"}</span></div>
              <div><strong>作用</strong><span>${item.effect || "未填写"}</span></div>
            </div>
            ${renderCluePropPreview(item)}
            <div class="button-row">
              <button class="action-button" data-edit-entity="${item.id}">编辑</button>
              <button class="action-button danger" data-delete-entity="${item.id}">删除</button>
            </div>
          </article>
        `;
      },
    },
  };

  function renderField(field, draft, bundle) {
    const value = draft[field.name] != null ? draft[field.name] : field.type === "multiselect" ? [] : "";

    if (field.type === "textarea") {
      return `
        <label class="${field.wide ? "span-2" : ""}">
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
      const options = bundle[field.optionKey];
      return `
        <fieldset class="entity-multiselect span-2">
          <legend>${field.label}</legend>
          <div class="checkbox-grid">
            ${options
              .map((option) => {
                const checked = value.includes(option.id) ? "checked" : "";
                return `
                  <label class="checkbox-item">
                    <input type="checkbox" name="${field.name}" value="${option.id}" ${checked} />
                    <span>${option[field.optionLabel]}</span>
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
        <input name="${field.name}" value="${value}" placeholder="${field.placeholder || ""}" ${field.required ? "required" : ""} />
      </label>
    `;
  }

  function normalizeFormData(form, fields) {
    const formData = new FormData(form);
    const output = {};
    fields.forEach((field) => {
      output[field.name] = field.type === "multiselect" ? formData.getAll(field.name) : formData.get(field.name) || "";
    });
    return output;
  }

  function renderWorkspace(root, campaign, bundle, editingEntity) {
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

    const config = entityConfig[state.workspaceTab];
    const collection = config ? bundle[config.collectionKey] : [];
    const healthIssues = getHealthCheck(campaign, bundle);
    const draft =
      editingEntity ||
      (state.workspaceTab === "overview"
        ? campaign
        : config.fields.reduce((acc, field) => {
            acc[field.name] = field.type === "multiselect" ? [] : "";
            return acc;
          }, {}));

    const listMarkup =
      state.workspaceTab === "overview"
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
        <article class="card">
          <p class="eyebrow">Health Check</p>
          <h3 class="section-title">调查健康检查</h3>
          <div class="issue-list">
            ${
              healthIssues.length
                ? healthIssues
                    .map(
                      (issue) => `
                      <article class="issue-item">
                        <strong>${issue.title}</strong>
                        <span class="small-copy">${issue.body}</span>
                      </article>`
                    )
                    .join("")
                : `<article class="issue-item"><strong>结构正常</strong><span class="small-copy">当前案件已有场景、线索和基本补救路径，可以继续细化细节。</span></article>`
            }
          </div>
        </article>
        ${renderRelationBoard(bundle, campaign)}
      `
        : collection.length
        ? collection.map((item) => config.renderCard(item, bundle)).join("")
        : `<article class="mini-card empty-state"><p class="muted-copy">当前还没有${config.title}，右侧表单可以直接新增。</p></article>`;

    const editorMarkup =
      state.workspaceTab === "overview"
        ? `
        <form id="overview-form" class="entity-form">
          <label class="span-2"><span>核心真相</span><textarea name="coreTruth" rows="4">${draft.coreTruth || ""}</textarea></label>
          <label class="span-2"><span>玩家已知</span><textarea name="playerKnowledge" rows="3">${draft.playerKnowledge || ""}</textarea></label>
          <label class="span-2"><span>玩家误判</span><textarea name="playerMisread" rows="3">${draft.playerMisread || ""}</textarea></label>
          <label class="span-2"><span>下一步建议</span><textarea name="nextSuggestion" rows="3">${draft.nextSuggestion || ""}</textarea></label>
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
          <div class="button-row span-2"><button class="action-button primary" type="submit">保存总览信息</button></div>
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
          <button class="tab-button ${state.workspaceTab === "overview" ? "active" : ""}" data-tab="overview">总览</button>
          <button class="tab-button ${state.workspaceTab === "scenes" ? "active" : ""}" data-tab="scenes">场景</button>
          <button class="tab-button ${state.workspaceTab === "clues" ? "active" : ""}" data-tab="clues">线索</button>
          <button class="tab-button ${state.workspaceTab === "npcs" ? "active" : ""}" data-tab="npcs">NPC</button>
          <button class="tab-button ${state.workspaceTab === "clueProps" ? "active" : ""}" data-tab="clueProps">线索道具</button>
        </div>
        <div class="workspace-columns">
          <section><div class="list-stack">${listMarkup}</div></section>
          <section class="card editor-panel">
            <p class="eyebrow">${state.workspaceTab === "overview" ? "Overview Editor" : editingEntity ? "Edit Entity" : "New Entity"}</p>
            <h3 class="section-title">${state.workspaceTab === "overview" ? "编辑案件总览" : editingEntity ? `编辑${config.title}` : `新增${config.title}`}</h3>
            ${editorMarkup}
          </section>
        </div>
      </section>
    `;

    root.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.workspaceTab = button.dataset.tab;
        state.editingEntityId = null;
        renderApp();
      });
    });

    if (state.workspaceTab === "overview") {
      root.querySelectorAll("[data-focus-node]").forEach((button) => {
        button.addEventListener("click", () => {
          state.relationFocus = {
            type: button.dataset.nodeType,
            id: button.dataset.nodeId,
          };
          renderApp();
        });
      });

      root.querySelectorAll("[data-open-node]").forEach((button) => {
        button.addEventListener("click", () => {
          const tabMap = {
            scene: "scenes",
            clue: "clues",
            npc: "npcs",
            clueProp: "clueProps",
          };
          state.relationFocus = {
            type: button.dataset.nodeType,
            id: button.dataset.nodeId,
          };
          state.workspaceTab = tabMap[button.dataset.nodeType] || "overview";
          state.editingEntityId = button.dataset.nodeId;
          renderApp();
        });
      });

      const relationEditor = root.querySelector("[data-relation-editor]");
      if (relationEditor) {
        relationEditor.addEventListener("submit", (event) => {
          event.preventDefault();
          const focus = getRelationFocus(bundle, campaign);
          if (!focus) return;
          applyRelationBoardUpdate(bundle, focus, event.currentTarget);
          renderApp();
        });
      }

      root.querySelector("#overview-form").addEventListener("submit", (event) => {
        event.preventDefault();
        upsertCampaign(Object.fromEntries(new FormData(event.currentTarget).entries()), campaign.id);
        renderApp();
      });
      return;
    }

    root.querySelectorAll("[data-edit-entity]").forEach((button) => {
      button.addEventListener("click", () => {
        state.editingEntityId = button.dataset.editEntity;
        renderApp();
      });
    });

    root.querySelectorAll("[data-delete-entity]").forEach((button) => {
      button.addEventListener("click", () => {
        const label =
          state.workspaceTab === "scenes" ? "场景" : state.workspaceTab === "clues" ? "线索" : state.workspaceTab === "npcs" ? "NPC" : "线索道具";
        if (!window.confirm(`确定删除这条${label}吗？`)) return;
        removeEntity(state.workspaceTab, button.dataset.deleteEntity);
        renderApp();
      });
    });

    root.querySelector("#entity-form").addEventListener("submit", (event) => {
      event.preventDefault();
      upsertEntity(state.workspaceTab, normalizeFormData(event.currentTarget, config.fields), state.editingEntityId);
      renderApp();
    });

    const cancelButton = root.querySelector("#cancel-entity-edit");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        state.editingEntityId = null;
        renderApp();
      });
    }
  }

  function renderRunning(root, campaign, bundle) {
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
    const currentSceneDescriptions = currentScene
      ? getSortedSceneDescriptions(bundle.sceneDescriptions.filter((item) => item.sceneId === currentScene.id))
      : [];

    root.innerHTML = `
      <div class="running-grid">
        <div class="workspace-columns">
          <section class="card">
            <p class="eyebrow">Running Mode</p>
            <h3 class="section-title">当前场景：${currentScene ? currentScene.title : "未指定"}</h3>
            <div class="entity-form single-column" style="margin-bottom: 14px;">
              <label class="span-2">
                <span>快速切换当前场景</span>
                <select id="running-scene-select" name="runningSceneId">
                  <option value="">未指定</option>
                  ${bundle.scenes
                    .map(
                      (scene) =>
                        `<option value="${scene.id}" ${campaign.currentSceneId === scene.id ? "selected" : ""}>${scene.title}</option>`
                    )
                    .join("")}
                </select>
              </label>
            </div>
            <div class="key-value">
              <div><strong>场景简介</strong><span>${currentScene ? currentScene.summary : "请在案件总览中选择当前场景。"}</span></div>
              <div><strong>氛围</strong><span>${currentScene ? currentScene.atmosphere : "未填写"}</span></div>
              <div><strong>待推进线索</strong><span>${activeClues.map((item) => item.title).join(" / ") || "无"}</span></div>
              <div><strong>备用线索提醒</strong><span>${currentScene ? currentScene.fallback : "未填写"}</span></div>
            </div>
          </section>
          <section class="card">
            <p class="eyebrow">Quick Log</p>
            <h3 class="section-title">追加本场记录</h3>
            <form id="running-log-form" class="entity-form single-column">
              <label class="span-2">
                <span>记录内容</span>
                <textarea name="logText" rows="5" placeholder="例如：玩家决定先去法医室施压，希望直接拿到尸检原件。">${state.draftLogText}</textarea>
              </label>
              <div class="button-row span-2"><button type="submit" class="action-button primary">写入记录</button></div>
            </form>
          </section>
        </div>
        <section class="card">
          <p class="eyebrow">Clue Control</p>
          <h3 class="section-title">线索快速状态切换</h3>
          <div class="quick-status-list">
            ${
              bundle.clues.length
                ? bundle.clues
                    .map(
                      (clue) => `
                      <article class="quick-status-item">
                        <div class="quick-status-head">
                          <div>
                            <strong>${clue.title}</strong>
                            <p class="small-copy">${clue.source || "未填写来源"}</p>
                          </div>
                          <span class="pill ${clue.status === "已获得" ? "warning" : clue.status === "未获得" ? "danger" : ""}">${clue.status}</span>
                        </div>
                        <div class="status-switcher">
                          ${["未获得", "进行中", "已获得"]
                            .map(
                              (status) =>
                                `<button type="button" class="${clue.status === status ? "active" : ""}" data-clue-id="${clue.id}" data-clue-status="${status}">${status}</button>`
                            )
                            .join("")}
                        </div>
                      </article>`
                    )
                    .join("")
                : `<article class="quick-status-item"><strong>还没有线索</strong><p class="small-copy">先去案件工作台补充线索，再回来做现场切换。</p></article>`
            }
          </div>
        </section>
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
                      </article>`
                    )
                    .join("")
                : `<article class="log-card"><p class="muted-copy">还没有跑团记录。</p></article>`
            }
          </div>
        </section>
        <section class="card">
          <p class="eyebrow">Read-Aloud Notes</p>
          <h3 class="section-title">当前场景备用描述</h3>
          <div class="list-stack">
            ${
              currentSceneDescriptions.length
                ? currentSceneDescriptions
                    .map(
                      (entry) => `
                      <article class="scene-description-card compact">
                        <header>
                          <div>
                            <p class="eyebrow">${entry.tag || "场景描述"}</p>
                            <h3>${entry.title}</h3>
                          </div>
                        </header>
                        <p class="muted-copy">${entry.usageNote || "未填写使用时机。"}</p>
                        <div class="scene-description-body">${entry.content || "未填写正文。"}</div>
                      </article>`
                    )
                    .join("")
                : `<article class="log-card"><p class="muted-copy">当前场景还没有备用描述。你可以去“场景描述库”提前准备。</p></article>`
            }
          </div>
        </section>
      </div>
    `;

    const textarea = root.querySelector('textarea[name="logText"]');
    textarea.addEventListener("input", (event) => {
      state.draftLogText = event.target.value;
    });

    root.querySelector("#running-scene-select").addEventListener("change", (event) => {
      upsertCampaign({ currentSceneId: event.target.value }, campaign.id);
      setFlash("已更新当前场景。", "success");
      renderApp();
    });

    root.querySelector("#running-log-form").addEventListener("submit", (event) => {
      event.preventDefault();
      addSessionLog(new FormData(event.currentTarget).get("logText") || "");
      renderApp();
    });

    root.querySelectorAll("[data-delete-log]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!window.confirm("确定删除这条跑团记录吗？")) return;
        data.sessionLogs = data.sessionLogs.filter((item) => item.id !== button.dataset.deleteLog);
        persist();
        setFlash("已删除跑团记录。", "warning");
        renderApp();
      });
    });

    root.querySelectorAll("[data-clue-id][data-clue-status]").forEach((button) => {
      button.addEventListener("click", () => {
        updateClueStatus(button.dataset.clueId, button.dataset.clueStatus);
        setFlash(`线索状态已更新为“${button.dataset.clueStatus}”。`, "success");
        renderApp();
      });
    });
  }

  function renderCluePropsLibrary(root, clueProps) {
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
                <div><p class="eyebrow">${clueProp.type}</p><h3>${clueProp.title}</h3></div>
                <span class="pill warning">待展示</span>
              </header>
              <div class="key-value">
                <div><strong>展示模板</strong><span>${inferCluePropTemplate(clueProp)}</span></div>
                <div><strong>触发条件</strong><span>${clueProp.reveal}</span></div>
                <div><strong>场景效果</strong><span>${clueProp.effect}</span></div>
              </div>
              ${renderCluePropPreview(clueProp)}
            </article>`
          )
          .join("")}
      </div>
    `;
  }

  function renderSceneDescriptions(root, campaign, bundle) {
    if (!campaign) {
      root.innerHTML = `
        <section class="card empty-state">
          <p class="eyebrow">Scene Description Library</p>
          <h3 class="section-title">还没有案件</h3>
          <p class="muted-copy">先创建案件，再把备用场景描述整理进来。</p>
        </section>
      `;
      return;
    }

    const editingDescription = state.editingSceneDescriptionId
      ? bundle.sceneDescriptions.find((item) => item.id === state.editingSceneDescriptionId) || null
      : null;

    const draft = editingDescription || {
      title: "",
      sceneId: "",
      sortOrder: getMaxSceneDescriptionOrder(campaign.id, ""),
      tag: "",
      usageNote: "",
      content: "",
    };

    const groupedDescriptions = [
      ...bundle.scenes.map((scene) => ({
        key: scene.id,
        title: scene.title,
        eyebrow: scene.type || "场景",
        items: getSortedSceneDescriptions(bundle.sceneDescriptions.filter((entry) => entry.sceneId === scene.id)),
      })),
      {
        key: "unbound",
        title: "未绑定场景",
        eyebrow: "Loose Notes",
        items: getSortedSceneDescriptions(bundle.sceneDescriptions.filter((entry) => !entry.sceneId)),
      },
    ].filter((group) => group.items.length);

    root.innerHTML = `
      <div class="workspace-columns">
        <section class="card">
          <p class="eyebrow">Scene Description Library</p>
          <h3 class="section-title">${campaign.title} 的备用描述</h3>
          <div class="scene-description-groups">
            ${
              bundle.sceneDescriptions.length
                ? groupedDescriptions
                    .map(
                      (group) => `
                      <section class="scene-description-group">
                        <div class="scene-description-group-head">
                          <div>
                            <p class="eyebrow">${group.eyebrow}</p>
                            <h3>${group.title}</h3>
                          </div>
                          <span class="pill">${group.items.length}</span>
                        </div>
                        <div class="list-stack">
                          ${group.items
                            .map(
                              (entry) => `
                              <article class="scene-description-card">
                                <header>
                                  <div>
                                    <p class="eyebrow">${entry.tag || "场景描述"} · 顺位 ${entry.sortOrder || 1}</p>
                                    <h3>${entry.title}</h3>
                                  </div>
                                  <span class="pill">${group.title}</span>
                                </header>
                                <p class="muted-copy">${entry.usageNote || "未填写使用说明。"}</p>
                                <div class="scene-description-body">${entry.content || "未填写正文。"}</div>
                                <div class="button-row">
                                  <button class="action-button" data-move-scene-description="${entry.id}" data-direction="up">上移</button>
                                  <button class="action-button" data-move-scene-description="${entry.id}" data-direction="down">下移</button>
                                  <button class="action-button" data-edit-scene-description="${entry.id}">编辑</button>
                                  <button class="action-button danger" data-delete-scene-description="${entry.id}">删除</button>
                                </div>
                              </article>
                            `
                            )
                            .join("")}
                        </div>
                      </section>`
                    )
                    .join("")
                : `<article class="mini-card empty-state"><p class="muted-copy">还没有备用场景描述，右侧表单可以直接新增。</p></article>`
            }
          </div>
        </section>
        <section class="card editor-panel">
          <p class="eyebrow">${editingDescription ? "Edit Description" : "New Description"}</p>
          <h3 class="section-title">${editingDescription ? "编辑场景描述" : "新增场景描述"}</h3>
          <form id="scene-description-form" class="entity-form">
            <label><span>标题</span><input name="title" value="${draft.title || ""}" required /></label>
            <label>
              <span>绑定场景</span>
              <select name="sceneId">
                <option value="">未绑定</option>
                ${bundle.scenes
                  .map((scene) => `<option value="${scene.id}" ${draft.sceneId === scene.id ? "selected" : ""}>${scene.title}</option>`)
                  .join("")}
              </select>
            </label>
            <label><span>顺位</span><input name="sortOrder" type="number" min="1" value="${draft.sortOrder || 1}" /></label>
            <label><span>标签</span><input name="tag" value="${draft.tag || ""}" placeholder="开场描写 / 压迫感 / 转场说明" /></label>
            <label><span>使用说明</span><input name="usageNote" value="${draft.usageNote || ""}" placeholder="什么时候朗读，或者用于什么效果" /></label>
            <label class="span-2">
              <span>描述正文</span>
              <textarea name="content" rows="10" required>${draft.content || ""}</textarea>
            </label>
            <div class="button-row span-2">
              <button type="submit" class="action-button primary">${editingDescription ? "保存修改" : "新增描述"}</button>
              ${editingDescription ? '<button type="button" id="cancel-scene-description-edit" class="action-button">取消编辑</button>' : ""}
            </div>
          </form>
        </section>
      </div>
    `;

    root.querySelector("#scene-description-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
      upsertSceneDescription(payload, state.editingSceneDescriptionId);
      renderApp();
    });

    root.querySelectorAll("[data-edit-scene-description]").forEach((button) => {
      button.addEventListener("click", () => {
        state.editingSceneDescriptionId = button.dataset.editSceneDescription;
        renderApp();
      });
    });

    root.querySelectorAll("[data-delete-scene-description]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!window.confirm("确定删除这条场景描述吗？")) return;
        removeSceneDescription(button.dataset.deleteSceneDescription);
        renderApp();
      });
    });

    root.querySelectorAll("[data-move-scene-description]").forEach((button) => {
      button.addEventListener("click", () => {
        moveSceneDescription(button.dataset.moveSceneDescription, button.dataset.direction);
        renderApp();
      });
    });

    const cancelButton = root.querySelector("#cancel-scene-description-edit");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        state.editingSceneDescriptionId = null;
        renderApp();
      });
    }
  }

  function renderReference(root) {
    root.innerHTML = `
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

  function upsertCampaign(payload, campaignId) {
    if (campaignId) {
      const target = data.campaigns.find((item) => item.id === campaignId);
      Object.assign(target, payload);
      setFlash("案件信息已保存。", "success");
    } else {
      const created = normalizeCampaign({
        id: makeId("campaign"),
        ...payload,
      });
      data.campaigns.unshift(created);
      state.currentCampaignId = created.id;
      state.currentPage = "workspace";
      setFlash(`已创建案件「${created.title}」。`, "success");
    }
    state.editingCampaignId = null;
    persist();
  }

  function updateClueStatus(clueId, status) {
    const clue = data.clues.find((item) => item.id === clueId);
    if (!clue) return;
    clue.status = status;
    persist();
  }

  function removeCampaign(campaignId) {
    data.campaigns = data.campaigns.filter((item) => item.id !== campaignId);
    data.scenes = data.scenes.filter((item) => item.campaignId !== campaignId);
    data.clues = data.clues.filter((item) => item.campaignId !== campaignId);
    data.npcs = data.npcs.filter((item) => item.campaignId !== campaignId);
    data.clueProps = data.clueProps.filter((item) => item.campaignId !== campaignId);
    data.sceneDescriptions = data.sceneDescriptions.filter((item) => item.campaignId !== campaignId);
    data.sessionLogs = data.sessionLogs.filter((item) => item.campaignId !== campaignId);
    state.currentCampaignId = data.campaigns[0] ? data.campaigns[0].id : null;
    state.editingCampaignId = null;
    state.editingEntityId = null;
    state.editingSceneDescriptionId = null;
    persist();
    setFlash("案件已删除。", "warning");
  }

  function upsertEntity(entityType, payload, entityId) {
    const collectionName = entityType;
    const collection = data[collectionName];
    const defaults =
      entityType === "scenes"
        ? { clueIds: [], npcIds: [], cluePropIds: [] }
        : entityType === "clues"
        ? { status: "未获得" }
        : entityType === "clueProps"
        ? { template: "通用纸张" }
        : {};

    if (entityId) {
      const target = collection.find((item) => item.id === entityId);
      Object.assign(target, defaults, payload);
    } else {
      collection.unshift({
        id: makeId(entityType.slice(0, -1)),
        campaignId: state.currentCampaignId,
        ...defaults,
        ...payload,
      });
    }
    state.editingEntityId = null;
    persist();
    setFlash(entityId ? "内容已保存。" : "已新增内容。", "success");
  }

  function removeEntity(entityType, entityId) {
    data[entityType] = data[entityType].filter((item) => item.id !== entityId);
    if (entityType === "npcs") {
      data.scenes.forEach((scene) => {
        scene.npcIds = (scene.npcIds || []).filter((id) => id !== entityId);
      });
    }
    if (entityType === "clueProps") {
      data.scenes.forEach((scene) => {
        scene.cluePropIds = (scene.cluePropIds || []).filter((id) => id !== entityId);
      });
    }
    if (entityType === "scenes") {
      data.campaigns.forEach((campaign) => {
        if (campaign.currentSceneId === entityId) campaign.currentSceneId = "";
      });
      data.sceneDescriptions.forEach((entry) => {
        if (entry.sceneId === entityId) entry.sceneId = "";
      });
    }
    state.editingEntityId = null;
    persist();
    setFlash("内容已删除。", "warning");
  }

  function upsertSceneDescription(payload, descriptionId) {
    const normalizedPayload = {
      ...payload,
      sceneId: payload.sceneId || "",
      sortOrder: Math.max(1, Number(payload.sortOrder) || 1),
    };

    if (descriptionId) {
      const target = data.sceneDescriptions.find((item) => item.id === descriptionId);
      if (!target) return;
      const previousSceneId = target.sceneId || "";
      Object.assign(target, normalizedPayload);
      renumberSceneDescriptionGroup(state.currentCampaignId, previousSceneId);
      renumberSceneDescriptionGroup(state.currentCampaignId, target.sceneId || "");
      setFlash("场景描述已保存。", "success");
    } else {
      const nextOrder = normalizedPayload.sortOrder || getMaxSceneDescriptionOrder(state.currentCampaignId, normalizedPayload.sceneId) + 1;
      data.sceneDescriptions.unshift({
        id: makeId("sceneDescription"),
        campaignId: state.currentCampaignId,
        ...normalizedPayload,
        sortOrder: nextOrder,
      });
      renumberSceneDescriptionGroup(state.currentCampaignId, normalizedPayload.sceneId || "");
      setFlash("已新增场景描述。", "success");
    }
    state.editingSceneDescriptionId = null;
    persist();
  }

  function removeSceneDescription(descriptionId) {
    const target = data.sceneDescriptions.find((item) => item.id === descriptionId);
    data.sceneDescriptions = data.sceneDescriptions.filter((item) => item.id !== descriptionId);
    if (target) renumberSceneDescriptionGroup(state.currentCampaignId, target.sceneId || "");
    state.editingSceneDescriptionId = null;
    persist();
    setFlash("场景描述已删除。", "warning");
  }

  function moveSceneDescription(descriptionId, direction) {
    const target = data.sceneDescriptions.find((item) => item.id === descriptionId);
    if (!target) return;
    const group = getSortedSceneDescriptions(
      data.sceneDescriptions.filter((item) => item.campaignId === state.currentCampaignId && (item.sceneId || "") === (target.sceneId || ""))
    );
    const currentIndex = group.findIndex((item) => item.id === descriptionId);
    if (currentIndex === -1) return;
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= group.length) return;
    const current = group[currentIndex];
    const other = group[swapIndex];
    const tempOrder = current.sortOrder;
    current.sortOrder = other.sortOrder;
    other.sortOrder = tempOrder;
    renumberSceneDescriptionGroup(state.currentCampaignId, target.sceneId || "");
    persist();
    setFlash(`已调整场景描述「${target.title}」的顺序。`, "success");
  }

  function addSessionLog(text) {
    if (!String(text).trim()) return;
    data.sessionLogs.unshift({
      id: makeId("log"),
      campaignId: state.currentCampaignId,
      createdAt: nowLabel(),
      text: String(text).trim(),
    });
    state.draftLogText = "";
    persist();
    setFlash("已写入新的跑团记录。", "success");
  }

  function downloadTextFile(filename, content) {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const bindings = createLayoutBindings();

  function renderApp() {
    const campaign = getCampaign();
    const bundle = getCampaignBundle();
    const editingCampaign = state.editingCampaignId
      ? data.campaigns.find((item) => item.id === state.editingCampaignId) || null
      : null;
    const entityType =
      state.workspaceTab === "scenes"
        ? "scenes"
        : state.workspaceTab === "clues"
        ? "clues"
        : state.workspaceTab === "npcs"
        ? "npcs"
        : state.workspaceTab === "clueProps"
        ? "clueProps"
        : null;
    const editingEntity = entityType && state.editingEntityId ? getEntity(entityType, state.editingEntityId) : null;

    updateLayoutChrome(bindings, campaign, bundle);
    renderDashboard(bindings.pages.dashboard, campaign, bundle);
    renderCampaigns(bindings.pages.campaigns, editingCampaign);
    renderWorkspace(bindings.pages.workspace, campaign, bundle, editingEntity);
    renderRunning(bindings.pages.running, campaign, bundle);
    renderSceneDescriptions(bindings.pages.sceneDescriptions, campaign, bundle);
    renderCluePropsLibrary(bindings.pages.clueProps, bundle.clueProps);
    renderReference(bindings.pages.reference);
    renderSearchResults(bindings.pages[state.currentPage], campaign, bundle.npcs, bundle.clues, bundle.clueProps, bundle.sceneDescriptions);
  }

  bindings.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentPage = button.dataset.page;
      state.editingCampaignId = null;
      state.editingEntityId = null;
      state.editingSceneDescriptionId = null;
      renderApp();
    });
  });

  bindings.searchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value;
    renderApp();
  });

  bindings.newCampaignButton.addEventListener("click", () => {
    state.currentPage = "campaigns";
    state.editingCampaignId = null;
    state.editingEntityId = null;
    state.editingSceneDescriptionId = null;
    renderApp();
  });

  bindings.exportButton.addEventListener("click", () => {
    downloadTextFile(
      "coc-kp-helper-export.json",
      JSON.stringify(
        {
          campaigns: data.campaigns,
          scenes: data.scenes,
          clues: data.clues,
          npcs: data.npcs,
          clueProps: data.clueProps,
          sceneDescriptions: data.sceneDescriptions,
          sessionLogs: data.sessionLogs,
        },
        null,
        2
      )
    );
    setFlash("数据已导出为 JSON 文件。", "success");
    renderApp();
  });

  bindings.importButton.addEventListener("click", () => {
    bindings.importFileInput.click();
  });

  bindings.importFileInput.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const normalized = normalizePersistedData(parsed);
      data.campaigns = normalized.campaigns;
      data.scenes = normalized.scenes;
      data.clues = normalized.clues;
      data.npcs = normalized.npcs;
      data.clueProps = normalized.clueProps;
      data.sceneDescriptions = normalized.sceneDescriptions;
      data.sessionLogs = normalized.sessionLogs;
      data.reference = normalized.reference;
      state.currentCampaignId = data.campaigns[0] ? data.campaigns[0].id : null;
      state.currentPage = data.campaigns.length ? "dashboard" : "campaigns";
      state.workspaceTab = "overview";
      state.editingCampaignId = null;
      state.editingEntityId = null;
      state.editingSceneDescriptionId = null;
      state.searchQuery = "";
      state.draftLogText = "";
      persist();
      setFlash("数据导入成功。", "success");
      renderApp();
    } catch (error) {
      window.alert("导入失败：文件格式不正确。");
    }
    event.target.value = "";
  });

  bindings.resetButton.addEventListener("click", () => {
    if (!window.confirm("恢复示例会覆盖当前本地数据，确定继续吗？")) return;
    const restored = clone(seedData);
    data.campaigns = restored.campaigns;
    data.scenes = restored.scenes;
    data.clues = restored.clues;
    data.npcs = restored.npcs;
    data.clueProps = restored.clueProps;
    data.sceneDescriptions = restored.sceneDescriptions;
    data.sessionLogs = restored.sessionLogs;
    data.reference = restored.reference;
    state.currentCampaignId = restored.campaigns[0].id;
    state.currentPage = "dashboard";
    state.workspaceTab = "overview";
    state.editingCampaignId = null;
    state.editingEntityId = null;
    state.editingSceneDescriptionId = null;
    state.searchQuery = "";
    state.draftLogText = "";
    persist();
    setFlash("已恢复示例数据。", "warning");
    renderApp();
  });

  persist();
  renderApp();
})();
