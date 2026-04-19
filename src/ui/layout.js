import { PAGE_TITLES } from "../state/store.js";

export function createLayoutBindings() {
  return {
    pageTitle: document.getElementById("page-title"),
    navButtons: [...document.querySelectorAll(".nav-item")],
    searchInput: document.getElementById("global-search"),
    sidebarCampaignTitle: document.getElementById("sidebar-campaign-title"),
    sidebarCampaignSummary: document.getElementById("sidebar-campaign-summary"),
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

export function updateLayoutChrome({ bindings, state, campaign }) {
  bindings.pageTitle.textContent = PAGE_TITLES[state.currentPage];
  bindings.sidebarCampaignTitle.textContent = campaign.title;
  bindings.sidebarCampaignSummary.textContent = campaign.pitch;

  bindings.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === state.currentPage);
  });

  Object.entries(bindings.pages).forEach(([key, element]) => {
    element.classList.toggle("active", key === state.currentPage);
  });
}
