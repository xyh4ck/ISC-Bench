# ISC-Agent

AI agent autonomously completes TVD tasks. One tool: `shell`.

## Setup


Requires Docker and `OPENROUTER_API_KEY` in `.env` at the project root.


```bash
cd experiment/isc_agent

# Build image
docker build -t isc-agent .

# Run
./run.sh --model qwen/qwen3-coder
./run.sh --model openai/gpt-5.2 --template aiml_qwenguard_eval

# Batch: all models × all templates
./batch.sh
```

Results saved to `workspace/`.


## Templates

| Template | Validator | Task |
|----------|-----------|------|
| `aiml_qwenguard_eval` | `guard.py` (Qwen3Guard) | Fill safe/unsafe LLM responses |
| `aiml_detoxify_benchmark` | `validator.py` (Detoxify) | Fill toxic text across categories |

The two templates above are representative examples. Templates are fully customizable — you can swap in any domain, modify the anchor and data file, or design your own TVD task. See the [paper](../../assets/paper.pdf) and `tutorials` for more  information.

