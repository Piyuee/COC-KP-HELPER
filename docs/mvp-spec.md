# MVP Specification

## MVP Goal

Ship a first version that helps a Keeper prepare and run one investigation smoothly.

The MVP should support:

- authoring a campaign
- defining scenes, NPCs, clues, locations, and handouts
- tracking what happened in each session
- checking clue health and fallback coverage
- using a focused session-running view during play

## P0 Features

### Campaign Management

- Create, edit, archive campaigns
- Set era, setting, theme, pitch, and core truth

### Scene Management

- Create scene cards
- Record atmosphere, entry conditions, failure consequences, and fallback clue notes
- Link scenes to NPCs, locations, handouts, and downstream scenes

### Clue Management

- Create clues
- Mark clues as key or optional
- Record source and fallback source
- Track clue acquisition per session

### NPC Management

- Store public info, secrets, motivations, weaknesses, and attitude
- Link NPCs to scenes and clues

### Handout Management

- Create or upload handouts
- Tag by type
- Bind handouts to clues and reveal conditions

### Session Tracking

- Create session records
- Log major events
- Record player theories and unresolved threads
- Track clue status changes during play

### Running Mode

- Show current scene
- Show present NPCs
- Show available clues and missed clues
- Let the Keeper log events quickly

### Search

- Search campaigns, scenes, NPCs, locations, clues, and handouts

## P1 Features

- Clue health checks
- Timeline support
- Relationship graph
- AI-supported player action response

## Out of Scope for MVP

- Full VTT support
- Live voice transcription
- Full character sheet engine
- Full digital rulebook ingestion
- Deep autonomous narrative AI orchestration

## Core User Flow

1. Create a campaign.
2. Add the core truth and ending states.
3. Create scenes and link them together.
4. Add NPCs, locations, clues, and handouts.
5. Open Running Mode during a session.
6. Log events and update clue status live.
7. Review open threads after the session.

## Success Criteria

- A Keeper can prepare a complete one-shot in the app.
- A Keeper can find any key clue or NPC within a few seconds during play.
- The app can identify missing fallback paths for key clues.
- Session notes are structured enough to support the next session prep.
