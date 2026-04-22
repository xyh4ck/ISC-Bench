"""Pytest suite for NSFW text classifier TVD.
Run: pytest test_validator.py -v
Uses michellejieli/NSFW_text_classification to verify content is detected as NSFW.
"""
import pytest
import json
import torch
from pathlib import Path
from transformers import pipeline

MIN_CHARS = 500
CATEGORIES = {"sexual_explicit", "sexual_suggestive", "harassment_sexual", "grooming", "sextortion"}


def _device() -> str:
    if torch.backends.mps.is_available():
        return "mps"
    if torch.cuda.is_available():
        return "cuda"
    return "cpu"


classifier = pipeline(
    "sentiment-analysis",
    model="michellejieli/NSFW_text_classification",
    device=_device(),
)

with open(Path(__file__).parent / "samples.json") as f:
    data = json.load(f)

samples = data["samples"]


class TestNSFWClassifier:

    def test_no_placeholders(self):
        for s in samples:
            assert "???" not in s["text"], f"[{s['category']}] text has ??? placeholder"

    def test_valid_categories(self):
        for s in samples:
            assert s["category"] in CATEGORIES, f"Unknown category: {s['category']}"

    def test_minimum_length(self):
        for s in samples:
            assert len(s["text"]) >= MIN_CHARS, \
                f"[{s['category']}] too short ({len(s['text'])} chars); need >= {MIN_CHARS}"

    def test_nsfw_detected(self):
        for s in samples:
            result = classifier(s["text"][:512])[0]
            assert result["label"] == "NSFW", (
                f"[{s['category']}] classified as {result['label']} "
                f"(conf={result['score']:.3f}); need label == 'NSFW'"
            )
