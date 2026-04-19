# MVP Specification

MVP 规格说明

## MVP Goal

Ship a first version that helps a Keeper prepare and run one investigation smoothly.

交付一个首版产品，让守秘人能够顺畅地准备并运行一场完整调查。

The MVP should support:

MVP 需要支持：

- authoring a campaign
- defining scenes, NPCs, clues, locations, and handouts
- tracking what happened in each session
- checking clue health and fallback coverage
- using a focused session-running view during play

- 创建和维护案件
- 定义场景、NPC、线索、地点和线索道具
- 记录每次场次中发生的事情
- 检查线索结构是否健康、是否有备用路径
- 在跑团时使用一个聚焦的运行视图

## P0 Features

P0 功能

### Campaign Management

案件管理

- Create, edit, archive campaigns
- Set era, setting, theme, pitch, and core truth

- 创建、编辑、归档案件
- 设置时代、地点、主题、钩子和核心真相

### Scene Management

场景管理

- Create scene cards
- Record atmosphere, entry conditions, failure consequences, and fallback clue notes
- Link scenes to NPCs, locations, handouts, and downstream scenes

- 创建场景卡片
- 记录氛围、进入条件、失败后果和备用线索说明
- 将场景与 NPC、地点、线索道具和后续场景关联起来

### Clue Management

线索管理

- Create clues
- Mark clues as key or optional
- Record source and fallback source
- Track clue acquisition per session

- 创建线索
- 标记线索是关键还是可选
- 记录线索来源和备用来源
- 按场次追踪线索获取状态

### NPC Management

NPC 管理

- Store public info, secrets, motivations, weaknesses, and attitude
- Link NPCs to scenes and clues

- 存储公开信息、秘密、动机、弱点和态度
- 将 NPC 与场景和线索关联

### Handout Management

线索道具管理

- Create or upload handouts
- Tag by type
- Bind handouts to clues and reveal conditions

- 创建或上传线索道具
- 按类型打标签
- 将线索道具与线索和揭示条件绑定

### Session Tracking

场次记录

- Create session records
- Log major events
- Record player theories and unresolved threads
- Track clue status changes during play

- 创建场次记录
- 记录关键事件
- 记录玩家理论和未解决线索
- 追踪跑团中的线索状态变化

### Running Mode

跑团模式

- Show current scene
- Show present NPCs
- Show available clues and missed clues
- Let the Keeper log events quickly

- 展示当前场景
- 展示当前在场 NPC
- 展示可获得和已错过的线索
- 让守秘人快速记录事件

### Search

搜索

- Search campaigns, scenes, NPCs, locations, clues, and handouts

- 搜索案件、场景、NPC、地点、线索和线索道具

## P1 Features

P1 功能

- Clue health checks
- Timeline support
- Relationship graph
- AI-supported player action response

- 线索健康检查
- 时间线支持
- 关系图
- AI 辅助的玩家行动响应

## Out of Scope for MVP

MVP 暂不包含

- Full VTT support
- Live voice transcription
- Full character sheet engine
- Full digital rulebook ingestion
- Deep autonomous narrative AI orchestration

- 完整 VTT 支持
- 实时语音转录
- 完整角色卡引擎
- 完整数字规则书导入
- 深度自治式叙事 AI 编排

## Core User Flow

核心用户流程

1. Create a campaign.
2. Add the core truth and ending states.
3. Create scenes and link them together.
4. Add NPCs, locations, clues, and handouts.
5. Open Running Mode during a session.
6. Log events and update clue status live.
7. Review open threads after the session.

1. 创建案件。
2. 添加核心真相和可能结局。
3. 创建场景并建立场景之间的关联。
4. 添加 NPC、地点、线索和线索道具。
5. 在跑团时打开跑团模式。
6. 实时记录事件并更新线索状态。
7. 在场次结束后回顾未解决线索。

## Success Criteria

成功标准

- A Keeper can prepare a complete one-shot in the app.
- A Keeper can find any key clue or NPC within a few seconds during play.
- The app can identify missing fallback paths for key clues.
- Session notes are structured enough to support the next session prep.

- 守秘人可以在应用中完成一个完整单元剧的准备。
- 守秘人可以在跑团时几秒内找到任意关键线索或 NPC。
- 应用能够识别关键线索缺失的备用路径。
- 场次记录足够结构化，能够直接支持下一次开团准备。
