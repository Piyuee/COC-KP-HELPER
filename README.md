# COC KP Helper

A product planning starter repository for a Call of Cthulhu 7th Edition Keeper assistant app.

COC 7版守秘人辅助应用的产品规划起始仓库。

The repository now includes a usable static frontend that supports local editing and persistence.

这个仓库现在已经包含一个可直接使用的静态前端版本，支持本地编辑和持久化保存。

## Goal

COC KP Helper is designed to help Keepers:

- build investigation scenarios with coherent clue structures
- track scenes, NPCs, locations, clue props, and secrets
- respond quickly to player actions during live sessions
- avoid stalled investigations by preparing fallback clue paths
- keep session notes, timelines, and unresolved threads organized

COC KP Helper 的目标是帮助守秘人：

- 构建逻辑清晰、线索自洽的调查剧本
- 管理场景、NPC、地点、线索道具和秘密信息
- 在跑团过程中快速响应玩家行动
- 通过备用线索设计避免调查卡死
- 整理场次记录、时间线和未解决的剧情线索

## Repository Structure

- `index.html` - static app shell for the first-version UI
- `src/app.js` - direct-open runtime entry used by the browser
- `src/main.js` - frontend entry and render orchestration
- `docs/product-brief.md` - product positioning and information architecture
- `docs/mvp-spec.md` - MVP scope, priorities, and core flows
- `docs/data-model.md` - initial relational data model proposal
- `docs/frontend-architecture.md` - frontend structure and refactor notes
- `docs/development-roadmap.md` - upcoming development path and milestone priorities
- `docs/产品介绍手册.md` - Chinese product handbook
- `docs/使用手册.md` - Chinese user manual

- `index.html` - 第一版页面的静态入口
- `src/app.js` - 浏览器直接打开时使用的运行时入口
- `src/main.js` - 前端入口与渲染调度
- `docs/product-brief.md` - 产品定位与信息架构
- `docs/mvp-spec.md` - MVP 范围、优先级和核心流程
- `docs/data-model.md` - 初版关系型数据模型设计
- `docs/frontend-architecture.md` - 前端结构与重构说明
- `docs/development-roadmap.md` - 后续开发路线图与里程碑优先级
- `docs/产品介绍手册.md` - 中文产品介绍手册
- `docs/使用手册.md` - 中文使用手册

## Planned MVP

- Campaign management
- Scene cards
- Clue graph
- NPC management
- Clue prop management
- Session running mode
- Search across core entities

- 案件管理
- 场景卡片
- 线索图谱
- NPC 管理
- 线索道具管理
- 跑团模式
- 核心实体搜索

## How To Use

1. Open `index.html` directly in a browser, or serve the repo with a simple static server.
2. Create a campaign from the top-right `新建案件` button.
3. Use the workspace tabs to maintain scenes, clues, NPCs, and clue props.
4. Use `跑团模式` to append session notes during play.
5. Export your data regularly as JSON.

## 如何使用

1. 直接用浏览器打开 `index.html`，或用简单静态服务运行仓库。
2. 点击右上角 `新建案件` 创建案件。
3. 在案件工作台里维护场景、线索、NPC 和线索道具。
4. 在 `跑团模式` 中记录跑团过程。
5. 记得定期导出 JSON 备份。

## Link Audit

Run this command to check clickable bindings and local links:

```bash
node scripts/link-audit.js
```

可以用这条命令检查可点击入口是否已绑定、以及本地文档链接是否有效：

```bash
node scripts/link-audit.js
```

## Next Steps

1. Confirm product scope and MVP boundaries.
2. Pick a stack for the first implementation.
3. Convert the data model into migrations or schema files.
4. Design the first UI flows around campaign setup and session running.

1. 明确产品范围和 MVP 边界。
2. 确定首版技术栈。
3. 将数据模型转换成 schema 或迁移文件。
4. 设计案件创建和跑团模式的首批页面流程。
