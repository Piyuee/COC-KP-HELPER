const STORAGE_KEY = "coc-kp-helper-data-v1";

export const PAGE_TITLES = {
  dashboard: "概览",
  campaigns: "案件库",
  workspace: "案件工作台",
  running: "跑团模式",
  handouts: "手outs库",
  reference: "规则速查",
};

const defaultUiState = {
  currentPage: "dashboard",
  currentCampaignId: "misty-ledger",
  workspaceTab: "overview",
  searchQuery: "",
  editingCampaignId: null,
  editingEntityId: null,
  draftLogText: "",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function nowLabel() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadPersistedData(seedData) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(seedData);
    const parsed = JSON.parse(raw);
    return {
      campaigns: parsed.campaigns || clone(seedData.campaigns),
      scenes: parsed.scenes || clone(seedData.scenes),
      clues: parsed.clues || clone(seedData.clues),
      npcs: parsed.npcs || clone(seedData.npcs),
      handouts: parsed.handouts || clone(seedData.handouts),
      sessionLogs: parsed.sessionLogs || clone(seedData.sessionLogs),
      reference: clone(seedData.reference),
    };
  } catch (error) {
    return clone(seedData);
  }
}

function savePersistedData(data) {
  const payload = {
    campaigns: data.campaigns,
    scenes: data.scenes,
    clues: data.clues,
    npcs: data.npcs,
    handouts: data.handouts,
    sessionLogs: data.sessionLogs,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function createStore(seedData) {
  const state = { ...defaultUiState };
  const data = loadPersistedData(seedData);

  function getState() {
    return state;
  }

  function getData() {
    return data;
  }

  function persist() {
    savePersistedData(data);
  }

  function setState(patch) {
    Object.assign(state, patch);
  }

  function getCampaign() {
    return data.campaigns.find((campaign) => campaign.id === state.currentCampaignId) || data.campaigns[0];
  }

  function getCampaignBundle(campaignId = state.currentCampaignId) {
    return {
      campaign: data.campaigns.find((campaign) => campaign.id === campaignId),
      scenes: data.scenes.filter((item) => item.campaignId === campaignId),
      clues: data.clues.filter((item) => item.campaignId === campaignId),
      npcs: data.npcs.filter((item) => item.campaignId === campaignId),
      handouts: data.handouts.filter((item) => item.campaignId === campaignId),
      sessionLogs: data.sessionLogs
        .filter((item) => item.campaignId === campaignId)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    };
  }

  function upsertCampaign(payload, campaignId = state.editingCampaignId) {
    if (campaignId) {
      const target = data.campaigns.find((item) => item.id === campaignId);
      Object.assign(target, payload);
      if (state.currentCampaignId === campaignId && payload.title) {
        state.currentCampaignId = campaignId;
      }
    } else {
      const newCampaign = {
        id: makeId("campaign"),
        currentSceneId: "",
        playerKnowledge: "",
        playerMisread: "",
        nextSuggestion: "",
        ...payload,
      };
      data.campaigns.unshift(newCampaign);
      state.currentCampaignId = newCampaign.id;
      state.currentPage = "workspace";
    }
    state.editingCampaignId = null;
    persist();
  }

  function removeCampaign(campaignId) {
    data.campaigns = data.campaigns.filter((item) => item.id !== campaignId);
    data.scenes = data.scenes.filter((item) => item.campaignId !== campaignId);
    data.clues = data.clues.filter((item) => item.campaignId !== campaignId);
    data.npcs = data.npcs.filter((item) => item.campaignId !== campaignId);
    data.handouts = data.handouts.filter((item) => item.campaignId !== campaignId);
    data.sessionLogs = data.sessionLogs.filter((item) => item.campaignId !== campaignId);
    state.currentCampaignId = data.campaigns[0]?.id || null;
    state.editingCampaignId = null;
    state.editingEntityId = null;
    persist();
  }

  function getEntityCollection(entityType) {
    return data[entityType];
  }

  function getEntity(entityType, entityId) {
    return getEntityCollection(entityType).find((item) => item.id === entityId) || null;
  }

  function upsertEntity(entityType, payload, entityId = state.editingEntityId) {
    const collection = getEntityCollection(entityType);
    if (entityId) {
      const target = collection.find((item) => item.id === entityId);
      Object.assign(target, payload);
    } else {
      collection.unshift({
        id: makeId(entityType.slice(0, -1)),
        campaignId: state.currentCampaignId,
        ...payload,
      });
    }
    state.editingEntityId = null;
    persist();
  }

  function removeEntity(entityType, entityId) {
    data[entityType] = data[entityType].filter((item) => item.id !== entityId);
    if (entityType === "npcs") {
      data.scenes.forEach((scene) => {
        scene.npcIds = (scene.npcIds || []).filter((id) => id !== entityId);
      });
    }
    if (entityType === "handouts") {
      data.scenes.forEach((scene) => {
        scene.handoutIds = (scene.handoutIds || []).filter((id) => id !== entityId);
      });
    }
    if (entityType === "scenes") {
      data.campaigns.forEach((campaign) => {
        if (campaign.currentSceneId === entityId) campaign.currentSceneId = "";
      });
    }
    state.editingEntityId = null;
    persist();
  }

  function addSessionLog(text) {
    if (!text.trim()) return;
    data.sessionLogs.unshift({
      id: makeId("log"),
      campaignId: state.currentCampaignId,
      createdAt: nowLabel(),
      text: text.trim(),
    });
    state.draftLogText = "";
    persist();
  }

  function removeSessionLog(logId) {
    data.sessionLogs = data.sessionLogs.filter((item) => item.id !== logId);
    persist();
  }

  function exportData() {
    return JSON.stringify(
      {
        campaigns: data.campaigns,
        scenes: data.scenes,
        clues: data.clues,
        npcs: data.npcs,
        handouts: data.handouts,
        sessionLogs: data.sessionLogs,
      },
      null,
      2
    );
  }

  function importData(raw) {
    const parsed = JSON.parse(raw);
    data.campaigns = parsed.campaigns || [];
    data.scenes = parsed.scenes || [];
    data.clues = parsed.clues || [];
    data.npcs = parsed.npcs || [];
    data.handouts = parsed.handouts || [];
    data.sessionLogs = parsed.sessionLogs || [];
    state.currentCampaignId = data.campaigns[0]?.id || null;
    state.currentPage = data.campaigns.length ? "dashboard" : "campaigns";
    state.workspaceTab = "overview";
    state.editingCampaignId = null;
    state.editingEntityId = null;
    persist();
  }

  function resetToSeed() {
    const restored = clone(seedData);
    data.campaigns = restored.campaigns;
    data.scenes = restored.scenes;
    data.clues = restored.clues;
    data.npcs = restored.npcs;
    data.handouts = restored.handouts;
    data.sessionLogs = restored.sessionLogs;
    state.currentCampaignId = restored.campaigns[0]?.id || null;
    state.currentPage = "dashboard";
    state.workspaceTab = "overview";
    state.editingCampaignId = null;
    state.editingEntityId = null;
    state.searchQuery = "";
    state.draftLogText = "";
    persist();
  }

  persist();

  return {
    getState,
    setState,
    getData,
    getCampaign,
    getCampaignBundle,
    getEntity,
    upsertCampaign,
    removeCampaign,
    upsertEntity,
    removeEntity,
    addSessionLog,
    removeSessionLog,
    exportData,
    importData,
    resetToSeed,
  };
}
