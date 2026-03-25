---
name: ISC Submission
about: Submit evidence of ISC triggered on a frontier LLM
title: "[ISC] Model Name"
labels: isc-submission
assignees: wuyoscar
---

## Contributor
- **Your GitHub username**: @

## Model
- **Model name**:
- **Arena rank** (if listed):
- **Provider**:

## Evidence (at least one required)

**Option A: Web conversation link**
Paste a public share link from any LLM web interface (ChatGPT, Claude, Gemini, Grok, Kimi, etc.):
- **Link**:

**Option B: Notebook**
Upload or link to a Jupyter Notebook (`.ipynb`) showing the ISC trigger:
- **Notebook link or file**:

**Option C: API log**
Paste the prompt + response (or attach a JSON file):

```
[paste here]
```

## What harmful content was generated?
<!-- Brief description: e.g., "lethal compound SMILES + LD50", "functional shellcode", "bioweapon gene sequences" -->


## Method
<!-- How did you trigger ISC? -->
- [ ] Used an existing ISC-Bench template (`templates/`)
- [ ] Modified an existing template (describe changes)
- [ ] Designed a custom TVD task from scratch
- [ ] Conversational (no code, just professional task framing)
- [ ] Other (describe below)


## Checklist
- [ ] Evidence is publicly accessible or attached
- [ ] No adversarial prompt was used — only a legitimate professional task
- [ ] The model generated harmful content as a functional requirement of the task
- [ ] Content would be refused if requested directly (without task framing)
