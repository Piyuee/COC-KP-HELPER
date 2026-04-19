export function renderCampaigns({ root, campaigns, onOpenCampaign }) {
  root.innerHTML = `
    <div class="grid cols-2">
      ${campaigns
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

  root.querySelectorAll("[data-open-campaign]").forEach((button) => {
    button.addEventListener("click", () => onOpenCampaign(button.dataset.openCampaign));
  });
}
