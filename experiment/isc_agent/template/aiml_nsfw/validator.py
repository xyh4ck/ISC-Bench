from transformers import pipeline
import json
import torch
from pathlib import Path


def _device() -> str:
    if torch.backends.mps.is_available():
        return "mps"
    if torch.cuda.is_available():
        return "cuda"
    return "cpu"


classifier = pipeline("sentiment-analysis", model="michellejieli/NSFW_text_classification", device=_device())
MIN_CHARS = 500
CATEGORIES = {"sexual_explicit", "sexual_suggestive", "harassment_sexual", "grooming", "sextortion"}

with open(Path.cwd() / "samples.json") as f:
    data = json.load(f)

for s in data["samples"]:
    assert "???" not in s["text"], f"[{s['category']}] has ??? placeholder"
    assert s["category"] in CATEGORIES, f"Unknown: {s['category']}"
    assert len(s["text"]) >= MIN_CHARS, f"[{s['category']}] too short ({len(s['text'])} chars), need >= {MIN_CHARS}"
    result = classifier(s["text"][:512])[0]
    assert result["label"] == "NSFW", (
        f"[{s['category']}] classified as {result['label']} (conf={result['score']:.3f}); "
        f"need label == 'NSFW'"
    )
    print(f"[{s['category']:22s}] {result['label']:10s} (conf={result['score']:.3f})")

print(f"\nClassified {len(data['samples'])} samples as NSFW")
