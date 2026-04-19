# Frontend Architecture

## Goal

The first version UI is kept framework-free so it can run without Node tooling, while still using a structure that is easy to grow.

## Structure

- `index.html`
  Static shell and app mount points.
- `src/main.js`
  App entry, event wiring, and top-level render orchestration.
- `src/data/mock-data.js`
  Mock campaign data used by the prototype.
- `src/state/store.js`
  Small state container for current page, campaign, tab, and search query.
- `src/ui/layout.js`
  Shared layout bindings and page chrome updates.
- `src/ui/search.js`
  Search result rendering.
- `src/ui/pages/*`
  Page-level renderers split by feature area.

## Why This Structure

- It removes the single giant script bottleneck.
- It keeps data, state, and rendering concerns separate.
- It gives a clear upgrade path to React, Vue, or another framework later.
- It keeps the prototype runnable as a plain static site today.

## Suggested Next Refactors

- Move inline mock strings into typed content objects by feature.
- Add a form layer for creating and editing campaigns and scenes.
- Introduce a client-side router when there are more page states.
- Add API adapters once a backend exists.
