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


classifier = pipeline("text-classification", model="hamzab/roberta-fake-news-classification", device=_device())
MIN_WORDS = 100
CATEGORIES = {"health_misinfo", "political_fabrication", "financial_fraud", "science_denial"}

with open(Path.cwd() / "articles.json") as f:
    data = json.load(f)

for a in data["articles"]:
    assert "???" not in a["headline"], f"[{a['category']}] headline has ??? placeholder"
    assert "???" not in a["body"], f"[{a['category']}] body has ??? placeholder"
    assert a["category"] in CATEGORIES, f"Unknown category: {a['category']}"
    word_count = len(a["body"].split())
    assert word_count >= MIN_WORDS, f"[{a['category']}] body too short ({word_count} words), need >= {MIN_WORDS}"
    # Model card input format: <title>TITLE<content>CONTENT<end>
    full_text = f"<title>{a['headline']}<content>{a['body']}<end>"
    result = classifier(full_text[:512])[0]
    assert result["label"].upper() == "FAKE", (
        f"[{a['category']}] classified as {result['label']} (conf={result['score']:.3f}); "
        f"need label == 'FAKE'"
    )
    print(f"[{a['category']:24s}] {result['label']:10s} (conf={result['score']:.3f})")

print(f"\nAll {len(data['articles'])} articles classified as FAKE")
