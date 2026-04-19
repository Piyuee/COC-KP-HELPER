# Data Model

数据模型

## Overview

This document proposes an initial relational data model for the MVP.

这份文档提出了一个适用于 MVP 的初版关系型数据模型。

## Core Tables

核心数据表

### campaigns

案件表

- `id`
- `title`
- `era`
- `setting`
- `theme`
- `pitch`
- `core_truth`
- `status`
- `created_at`
- `updated_at`

### scenes

场景表

- `id`
- `campaign_id`
- `title`
- `scene_type`
- `summary`
- `atmosphere_text`
- `entry_condition`
- `failure_consequence`
- `fallback_clue_note`
- `sort_order`
- `created_at`
- `updated_at`

### locations

地点表

- `id`
- `campaign_id`
- `title`
- `location_type`
- `description`
- `day_description`
- `night_description`
- `danger_note`
- `created_at`
- `updated_at`

### npcs

NPC 表

- `id`
- `campaign_id`
- `name`
- `role`
- `public_info`
- `secret_info`
- `motivation`
- `weakness`
- `attitude_to_party`
- `speech_style`
- `created_at`
- `updated_at`

### clues

线索表

- `id`
- `campaign_id`
- `title`
- `content`
- `clue_type`
- `is_key`
- `source_scene_id`
- `source_npc_id`
- `source_location_id`
- `acquisition_method`
- `fallback_source_note`
- `leads_to_note`
- `created_at`
- `updated_at`

### clue_props

线索道具 表

- `id`
- `campaign_id`
- `title`
- `clue_prop_type`
- `content_text`
- `asset_url`
- `style_template`
- `reveal_condition`
- `effect_note`
- `created_at`
- `updated_at`

### sessions

场次表

- `id`
- `campaign_id`
- `session_no`
- `title`
- `scheduled_at`
- `summary`
- `player_theories`
- `open_threads`
- `kp_notes`
- `created_at`
- `updated_at`

### session_events

场次事件表

- `id`
- `session_id`
- `scene_id`
- `event_order`
- `event_type`
- `description`
- `consequence`
- `created_at`

## Join Tables

关联表

### scene_npcs

场景与 NPC 关联表

- `scene_id`
- `npc_id`

### scene_locations

场景与地点关联表

- `scene_id`
- `location_id`

### scene_clue_props

场景与线索道具关联表

- `scene_id`
- `clue_prop_id`

### scene_transitions

场景流转表

- `id`
- `from_scene_id`
- `to_scene_id`
- `condition_note`

### npc_clues

NPC 与线索关联表

- `npc_id`
- `clue_id`
- `reveal_condition`

### clue_prop_clues

线索道具与线索关联表

- `clue_prop_id`
- `clue_id`

### session_clues

场次线索状态表

- `id`
- `session_id`
- `clue_id`
- `status`
- `obtained_by_note`
- `created_at`

### npc_relationships

NPC 关系表

- `id`
- `campaign_id`
- `from_npc_id`
- `to_npc_id`
- `relation_type`
- `note`

## Timeline Support

时间线支持

### timelines

时间线表

- `id`
- `campaign_id`
- `timeline_type`
- `title`

### timeline_events

时间线事件表

- `id`
- `timeline_id`
- `title`
- `description`
- `event_time`
- `related_scene_id`
- `related_npc_id`

## Suggested Enums

建议枚举

### campaign status

案件状态

- `draft`
- `active`
- `archived`

### scene_type

场景类型

- `investigation`
- `social`
- `chase`
- `combat`
- `horror`
- `transition`

### session_clue status

场次线索状态

- `available`
- `obtained`
- `missed`

### timeline_type

时间线类型

- `truth`
- `player_known`
- `antagonist_plan`

## Notes

说明

- Start with plain text or markdown fields for all long-form content.
- Do not over-model clue prop rendering in the MVP.
- Keep clue fallback support explicit even if it duplicates some information.

- 第一版所有长文本字段都先使用纯文本或 Markdown。
- MVP 不需要过早把线索道具 渲染能力建模得太复杂。
- 即便会出现一定信息重复，也要把线索的备用来源显式记录下来。
