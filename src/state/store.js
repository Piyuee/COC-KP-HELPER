export const PAGE_TITLES = {
  dashboard: "概览",
  campaigns: "案件库",
  workspace: "案件工作台",
  running: "跑团模式",
  handouts: "手outs库",
  reference: "规则速查",
};

const defaultState = {
  currentPage: "dashboard",
  currentCampaignId: "misty-ledger",
  workspaceTab: "overview",
  searchQuery: "",
};

export function createStore(initialData) {
  const state = { ...defaultState };

  function getState() {
    return state;
  }

  function setState(patch) {
    Object.assign(state, patch);
  }

  function getCampaign() {
    return (
      initialData.campaigns.find((campaign) => campaign.id === state.currentCampaignId) ||
      initialData.campaigns[0]
    );
  }

  return {
    getState,
    setState,
    getCampaign,
  };
}
