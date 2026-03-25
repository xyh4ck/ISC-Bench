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

## Harmful Content Details

- **Type of harmful content** (e.g., toxic language, lethal compounds, functional exploits, bioweapon sequences):

- **Domain** (e.g., cybersecurity, chemistry, biology, pharmacology, AI safety):

- **Brief explanation** (1-2 sentences — what did the model generate and why is it harmful?):


## Method
<!-- How did you trigger ISC? -->
- [ ] Used an existing ISC-Bench template (`templates/`)
- [ ] Modified an existing template (describe changes)
- [ ] Designed a custom TVD task from scratch
- [ ] Conversational (no code, just professional task framing)
- [ ] Other (describe below)


## Checklist
- [ ] Evidence is publicly accessible or attached
- [ ] **No adversarial prompt was used** — you did NOT rely on automated prompt optimization, white-box attacks, or any jailbreak technique. ISC is about the phenomenon where models voluntarily produce harmful content within a legitimate professional task, without any obvious attack.
- [ ] The model generated harmful content as a functional requirement of the task
- [ ] Content would be refused if requested directly (without task framing)

> **What counts as ISC?** You only need to do one of two things:
> - **Directed generation**: embed a harmful query into the task data (e.g., a test case the model must complete)
> - **Undirected generation**: provide no harmful query at all — the model generates harmful content entirely on its own to fulfill the task
>
> If the model produces harmful content under either condition, that's ISC. For more details, please [read our paper](../../paper.pdf).
