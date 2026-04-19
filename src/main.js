import { mockData } from "./data/mock-data.js";
import { createStore } from "./state/store.js";
import { createLayoutBindings, updateLayoutChrome } from "./ui/layout.js";
import { renderSearchResults } from "./ui/search.js";
import { renderDashboard } from "./ui/pages/dashboard.js";
import { renderCampaigns } from "./ui/pages/campaigns.js";
import { renderWorkspace } from "./ui/pages/workspace.js";
import { renderRunning } from "./ui/pages/running.js";
import { renderCluePropsLibrary } from "./ui/pages/clue-props.js";
import { renderReference } from "./ui/pages/reference.js";

const store = createStore(mockData);
const bindings = createLayoutBindings();

const workspaceEntityMap = {
  scenes: "scenes",
  clues: "clues",
  npcs: "npcs",
  clueProps: "clueProps",
};

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function confirmDelete(message) {
  return window.confirm(message);
}

function renderApp() {
  const state = store.getState();
  const data = store.getData();
  const campaign = store.getCampaign();
  const bundle = store.getCampaignBundle();
  const currentEntityType = workspaceEntityMap[state.workspaceTab];
  const editingCampaign = state.editingCampaignId ? data.campaigns.find((item) => item.id === state.editingCampaignId) : null;
  const editingEntity = currentEntityType && state.editingEntityId ? store.getEntity(currentEntityType, state.editingEntityId) : null;

  updateLayoutChrome({ bindings, state, campaign, bundle });

  renderDashboard({
    root: bindings.pages.dashboard,
    campaign,
    bundle,
  });

  renderCampaigns({
    root: bindings.pages.campaigns,
    campaigns: data.campaigns,
    editingCampaign,
    onOpenCampaign: (campaignId) => {
      store.setState({
        currentCampaignId: campaignId,
        currentPage: "workspace",
        editingCampaignId: null,
        editingEntityId: null,
      });
      renderApp();
    },
    onEditCampaign: (campaignId) => {
      store.setState({ editingCampaignId: campaignId });
      renderApp();
    },
    onDeleteCampaign: (campaignId) => {
      if (!confirmDelete("删除案件会同时移除其场景、线索、NPC、线索道具和跑团记录，确定继续吗？")) return;
      store.removeCampaign(campaignId);
      renderApp();
    },
    onCancelEdit: () => {
      store.setState({ editingCampaignId: null });
      renderApp();
    },
    onSubmitCampaign: (payload) => {
      store.upsertCampaign(payload);
      renderApp();
    },
  });

  renderWorkspace({
    root: bindings.pages.workspace,
    campaign,
    bundle,
    workspaceTab: state.workspaceTab,
    editingEntity,
    onTabChange: (workspaceTab) => {
      store.setState({
        workspaceTab,
        editingEntityId: null,
      });
      renderApp();
    },
    onUpdateCampaignMeta: (payload) => {
      store.upsertCampaign(payload, campaign.id);
      renderApp();
    },
    onEditEntity: (entityId) => {
      store.setState({ editingEntityId: entityId });
      renderApp();
    },
    onDeleteEntity: (entityId) => {
      const label = state.workspaceTab === "scenes" ? "场景" : state.workspaceTab === "clues" ? "线索" : state.workspaceTab === "npcs" ? "NPC" : "线索道具";
      if (!confirmDelete(`确定删除这条${label}吗？`)) return;
      store.removeEntity(currentEntityType, entityId);
      renderApp();
    },
    onSubmitEntity: (payload) => {
      store.upsertEntity(currentEntityType, payload);
      renderApp();
    },
    onCancelEntityEdit: () => {
      store.setState({ editingEntityId: null });
      renderApp();
    },
  });

  renderRunning({
    root: bindings.pages.running,
    campaign,
    bundle,
    draftLogText: state.draftLogText,
    onDraftLogChange: (draftLogText) => {
      store.setState({ draftLogText });
    },
    onAddLog: (text) => {
      store.addSessionLog(text);
      renderApp();
    },
    onRemoveLog: (logId) => {
      if (!confirmDelete("确定删除这条跑团记录吗？")) return;
      store.removeSessionLog(logId);
      renderApp();
    },
  });

  renderCluePropsLibrary({
    root: bindings.pages.clueProps,
    clueProps: bundle.clueProps,
  });

  renderReference({
    root: bindings.pages.reference,
    reference: data.reference,
  });

  renderSearchResults({
    root: bindings.pages[state.currentPage],
    query: state.searchQuery,
    campaign,
    npcs: bundle.npcs,
    clues: bundle.clues,
    clueProps: bundle.clueProps,
  });
}

bindings.navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    store.setState({
      currentPage: button.dataset.page,
      editingCampaignId: null,
      editingEntityId: null,
    });
    renderApp();
  });
});

bindings.searchInput.addEventListener("input", (event) => {
  store.setState({ searchQuery: event.target.value });
  renderApp();
});

bindings.newCampaignButton.addEventListener("click", () => {
  store.setState({
    currentPage: "campaigns",
    editingCampaignId: null,
    editingEntityId: null,
  });
  renderApp();
});

bindings.exportButton.addEventListener("click", () => {
  downloadTextFile("coc-kp-helper-export.json", store.exportData());
});

bindings.importButton.addEventListener("click", () => {
  bindings.importFileInput.click();
});

bindings.importFileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    store.importData(text);
    renderApp();
  } catch (error) {
    window.alert("导入失败：文件格式不正确。");
  }
  event.target.value = "";
});

bindings.resetButton.addEventListener("click", () => {
  if (!confirmDelete("恢复示例会覆盖当前本地数据，确定继续吗？")) return;
  store.resetToSeed();
  renderApp();
});

renderApp();
