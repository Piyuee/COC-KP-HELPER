export function renderSearchResults({ root, query, campaign, npcs, clues, handouts }) {
  root.querySelectorAll(".search-results").forEach((el) => el.remove());

  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return;

  const searchable = [
    ...npcs.map((npc) => ({ type: "NPC", title: npc.name, body: `${npc.role} · ${npc.publicInfo}` })),
    ...clues.map((clue) => ({ type: "线索", title: clue.title, body: `${clue.source} · ${clue.content}` })),
    ...handouts.map((handout) => ({ type: "手outs", title: handout.title, body: `${handout.type} · ${handout.effect}` })),
    { type: "案件", title: campaign.title, body: campaign.pitch },
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
