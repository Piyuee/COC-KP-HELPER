# Frontend Architecture

## Goal

The current frontend is framework-free so it can run without Node tooling, while still supporting real editing workflows and local persistence.

## Structure

- `index.html`
  Static shell and app mount points.
- `src/main.js`
  App entry, event wiring, import/export hooks, and top-level render orchestration.
- `src/data/mock-data.js`
  Seed data used as the initial sample workspace.
- `src/state/store.js`
  UI state, localStorage persistence, CRUD helpers, and import/export logic.
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
- It keeps the app runnable as a plain static site today.
- It already supports single-user local CRUD without a backend.

## Suggested Next Refactors

- Add validation and richer field types for linked entities.
- Introduce route-level state when the app moves beyond a single-page layout.
- Add API adapters once a backend exists.
- Replace localStorage persistence with a real storage layer when multi-device sync is needed.
