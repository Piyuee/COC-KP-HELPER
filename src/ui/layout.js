import { PAGE_TITLES } from "../state/store.js";

export function createLayoutBindings() {
  return {
    pageTitle: document.getElementById("page-title"),
    navButtons: [...document.querySelectorAll(".nav-item")],
    searchInput: document.getElementById("global-search"),
    newCampaignButton: document.getElementById("new-campaign-button"),
    exportButton: document.getElementById("export-button"),
    importButton: document.getElementById("import-button"),
    resetButton: document.getElementById("reset-button"),
    importFileInput: document.getElementById("import-file-input"),
    sidebarCampaignTitle: document.getElementById("sidebar-campaign-title"),
    sidebarCampaignSummary: document.getElementById("sidebar-campaign-summary"),
    sidebarOpenClues: document.getElementById("sidebar-open-clues"),
    sidebarOpenThreads: document.getElementById("sidebar-open-threads"),
    pages: {
      dashboard: document.getElementById("page-dashboard"),
      campaigns: document.getElementById("page-campaigns"),
      workspace: document.getElementById("page-workspace"),
      running: document.getElementById("page-running"),
      handouts: document.getElementById("page-handouts"),
      reference: document.getElementById("page-reference"),
    },
  };
}

export function updateLayoutChrome({ bindings, state, campaign, bundle }) {
  bindings.pageTitle.textContent = PAGE_TITLES[state.currentPage];
  bindings.sidebarCampaignTitle.textContent = campaign?.title || "尚未创建案件";
  bindings.sidebarCampaignSummary.textContent = campaign?.pitch || "点击“新建案件”开始构建你的第一场调查。";
  bindings.sidebarOpenClues.textContent = `开放线索 ${bundle?.clues?.length || 0}`;
  bindings.sidebarOpenThreads.textContent = `未回收伏笔 ${(bundle?.clues || []).filter((item) => item.status !== "已获得").length}`;

  bindings.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === state.currentPage);
  });

  Object.entries(bindings.pages).forEach(([key, element]) => {
    element.classList.toggle("active", key === state.currentPage);
  });
}
