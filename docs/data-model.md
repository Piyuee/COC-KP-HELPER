# Data Model

## Overview

This document proposes an initial relational data model for the MVP.

## Core Tables

### campaigns

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

### handouts

- `id`
- `campaign_id`
- `title`
- `handout_type`
- `content_text`
- `asset_url`
- `style_template`
- `reveal_condition`
- `effect_note`
- `created_at`
- `updated_at`

### sessions

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

- `id`
- `session_id`
- `scene_id`
- `event_order`
- `event_type`
- `description`
- `consequence`
- `created_at`

## Join Tables

### scene_npcs

- `scene_id`
- `npc_id`

### scene_locations

- `scene_id`
- `location_id`

### scene_handouts

- `scene_id`
- `handout_id`

### scene_transitions

- `id`
- `from_scene_id`
- `to_scene_id`
- `condition_note`

### npc_clues

- `npc_id`
- `clue_id`
- `reveal_condition`

### handout_clues

- `handout_id`
- `clue_id`

### session_clues

- `id`
- `session_id`
- `clue_id`
- `status`
- `obtained_by_note`
- `created_at`

### npc_relationships

- `id`
- `campaign_id`
- `from_npc_id`
- `to_npc_id`
- `relation_type`
- `note`

## Timeline Support

### timelines

- `id`
- `campaign_id`
- `timeline_type`
- `title`

### timeline_events

- `id`
- `timeline_id`
- `title`
- `description`
- `event_time`
- `related_scene_id`
- `related_npc_id`

## Suggested Enums

### campaign status

- `draft`
- `active`
- `archived`

### scene_type

- `investigation`
- `social`
- `chase`
- `combat`
- `horror`
- `transition`

### session_clue status

- `available`
- `obtained`
- `missed`

### timeline_type

- `truth`
- `player_known`
- `antagonist_plan`

## Notes

- Start with plain text or markdown fields for all long-form content.
- Do not over-model handout rendering in the MVP.
- Keep clue fallback support explicit even if it duplicates some information.
