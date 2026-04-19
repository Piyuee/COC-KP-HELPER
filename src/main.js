import { mockData } from "./data/mock-data.js";
import { createStore } from "./state/store.js";
import { createLayoutBindings, updateLayoutChrome } from "./ui/layout.js";
import { renderSearchResults } from "./ui/search.js";
import { renderDashboard } from "./ui/pages/dashboard.js";
import { renderCampaigns } from "./ui/pages/campaigns.js";
import { renderWorkspace } from "./ui/pages/workspace.js";
import { renderRunning } from "./ui/pages/running.js";
import { renderHandoutsLibrary } from "./ui/pages/handouts.js";
import { renderReference } from "./ui/pages/reference.js";

const store = createStore(mockData);
const bindings = createLayoutBindings();

function renderApp() {
  const state = store.getState();
  const campaign = store.getCampaign();

  updateLayoutChrome({ bindings, state, campaign });

  renderDashboard({
    root: bindings.pages.dashboard,
    campaign,
  });

  renderCampaigns({
    root: bindings.pages.campaigns,
    campaigns: mockData.campaigns,
    onOpenCampaign: (campaignId) => {
      store.setState({
        currentCampaignId: campaignId,
        currentPage: "workspace",
      });
      renderApp();
    },
  });

  renderWorkspace({
    root: bindings.pages.workspace,
    campaign,
    scenes: mockData.scenes,
    clues: mockData.clues,
    npcs: mockData.npcs,
    handouts: mockData.handouts,
    workspaceTab: state.workspaceTab,
    onTabChange: (workspaceTab) => {
      store.setState({ workspaceTab });
      renderApp();
    },
  });

  renderRunning({
    root: bindings.pages.running,
    runningLog: mockData.runningLog,
  });

  renderHandoutsLibrary({
    root: bindings.pages.handouts,
    handouts: mockData.handouts,
  });

  renderReference({
    root: bindings.pages.reference,
    reference: mockData.reference,
  });

  renderSearchResults({
    root: bindings.pages[state.currentPage],
    query: state.searchQuery,
    campaign,
    npcs: mockData.npcs,
    clues: mockData.clues,
    handouts: mockData.handouts,
  });
}

bindings.navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    store.setState({ currentPage: button.dataset.page });
    renderApp();
  });
});

bindings.searchInput.addEventListener("input", (event) => {
  store.setState({ searchQuery: event.target.value });
  renderApp();
});

renderApp();
