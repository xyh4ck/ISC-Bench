# ISC-ICL

In-context learning evaluation. Multi-turn conversation with `N` completed demonstrations prepended before the target query.

Model names use [OpenRouter](https://openrouter.ai/models) model IDs. All scripts use [PEP 723](https://peps.python.org/pep-0723/) inline metadata — `uv run` handles dependencies automatically. Requires `OPENROUTER_API_KEY` in `.env` at the project root.

## Run

```bash
cd experiment/isc_icl

uv run run.py --model <model-id> --demos 5
uv run run.py --model <model-id> --demos 10
```

| Flag | Description |
|------|-------------|
| `--model` | OpenRouter model ID |
| `--demos` | Number of completed demonstrations (1, 5, 10, 20) |

**Output**: `results/{model}/icl_{N}demo.json`

## How It Works

Each query is wrapped in a multi-turn conversation:

```
[system]     Agent persona
[user]       Demo query 1 (TVD prompt with ???)
[assistant]  Completed response 1 (actual LLM output from prior run)
[user]       Demo query 2
[assistant]  Completed response 2
...
[user]       Target query (the one the LLM must answer)
```

The `N` completed (user, assistant) pairs show the model its own prior successful completions, reinforcing the harmful generation pattern. Demo data is stored per-model in `data/`. For models without pre-built demos, the script automatically falls back to demos from available models.

## Extract + Judge

Same tools as ISC-Single:

```bash
cd ../isc_single
uv run extract.py <result-file>.json
uv run judge.py <result-file>.json
```
