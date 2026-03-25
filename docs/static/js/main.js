// ISC-Bench Project Website — main.js

// ====== ISC Cases Data ======
const ISC_CASES = {
  "Claude Opus 4.6": { demos: [{ link: "https://claude.ai/share/407d33f5-4655-4479-b3e3-0a6dc6639d34", by: "wuyoscar" }] },
  "Claude Opus 4.5": { demos: [{ link: "https://claude.ai/share/1e3e997c-0315-46f1-9cbd-37157314a7ef", by: "wuyoscar" }] },
  "Claude Sonnet 4.6": { demos: [{ link: "https://claude.ai/share/cc972f9b-a558-4bca-8bc6-0e6d65590793", by: "wuyoscar" }] },
  "Gemini 3 Pro": { demos: [{ link: "https://gemini.google.com/share/320bf34b0334", by: "wuyoscar" }] },
  "GPT-5.2 Chat": { demos: [{ link: "https://chatgpt.com/share/69a3f6e1-24d8-800c-9581-3d1a7180ee55", by: "wuyoscar" }] },
  "o3": { demos: [{ link: "https://chatgpt.com/share/69c3b0a7-3554-839a-95a5-d22d60758dc9", by: "wuyoscar" }] },
  "Grok 4.1": { demos: [{ link: "https://grok.com/share/c2hhcmQtMi1jb3B5_54de710c-9331-4fca-a953-6c35775156fb", by: "wuyoscar" }] },
  "Kimi K2.5 Thinking": { demos: [{ link: "https://www.kimi.com/share/19ca8616-9e32-810d-8000-0000647caebf", by: "wuyoscar" }] },
  "Qwen 3 Max Preview": { demos: [{ link: "https://chat.qwen.ai/s/f1e5d846-018e-4a3d-94ff-418e34559497?fev=0.2.9", by: "wuyoscar" }] },
  "DeepSeek V3.2": { demos: [{ link: "https://chat.deepseek.com/share/pbzirkyhfkvapyc3g0", by: "wuyoscar" }] },
  "GLM-5": { demos: [{ link: "https://chat.z.ai/s/79e38d45-d370-4c03-8fb2-6ff3427046cc", by: "wuyoscar" }] },
  "Qwen 3.5 397B": { demos: [{ link: "https://chat.qwen.ai/s/f4faf33a-a6b3-4503-8c9b-6d57ee39c0c6?fev=0.2.16", by: "HanxunH" }] },
  "Qwen 3 Max 2025-09-23": { demos: [{ link: "https://chat.qwen.ai/s/c4247247-ddfd-43f1-bae6-1f703b29de27?fev=0.2.16", by: "HanxunH" }] },
  "ERNIE 5.0": { demos: [{ link: "https://ernie.baidu.com/share/TlRKBSn5kT", by: "HanxunH" }] },
};

// Top 50 Arena models
const ARENA_TOP50 = [
  { rank: 1, name: "Claude Opus 4.6 Thinking", org: "Anthropic", score: 1502 },
  { rank: 2, name: "Claude Opus 4.6", org: "Anthropic", score: 1501 },
  { rank: 3, name: "Gemini 3.1 Pro Preview", org: "Google", score: 1493 },
  { rank: 4, name: "Grok 4.20 Beta", org: "xAI", score: 1492 },
  { rank: 5, name: "Gemini 3 Pro", org: "Google", score: 1486 },
  { rank: 6, name: "GPT-5.4 High", org: "OpenAI", score: 1485 },
  { rank: 7, name: "GPT-5.2 Chat", org: "OpenAI", score: 1482 },
  { rank: 8, name: "Grok 4.20 Reasoning", org: "xAI", score: 1481 },
  { rank: 9, name: "Gemini 3 Flash", org: "Google", score: 1475 },
  { rank: 10, name: "Claude Opus 4.5 Thinking", org: "Anthropic", score: 1474 },
  { rank: 11, name: "Grok 4.1 Thinking", org: "xAI", score: 1472 },
  { rank: 12, name: "Claude Opus 4.5", org: "Anthropic", score: 1469 },
  { rank: 13, name: "Claude Sonnet 4.6", org: "Anthropic", score: 1465 },
  { rank: 14, name: "Qwen 3.5 Max Preview", org: "Alibaba", score: 1464 },
  { rank: 15, name: "GPT-5.3 Chat", org: "OpenAI", score: 1464 },
  { rank: 16, name: "Gemini 3 Flash Thinking", org: "Google", score: 1463 },
  { rank: 17, name: "GPT-5.4", org: "OpenAI", score: 1463 },
  { rank: 18, name: "Dola Seed 2.0 Preview", org: "ByteDance", score: 1462 },
  { rank: 19, name: "Grok 4.1", org: "xAI", score: 1461 },
  { rank: 20, name: "GPT-5.1 High", org: "OpenAI", score: 1455 },
  { rank: 21, name: "GLM-5", org: "Z.ai", score: 1455 },
  { rank: 22, name: "Kimi K2.5 Thinking", org: "Moonshot", score: 1453 },
  { rank: 23, name: "Claude Sonnet 4.5", org: "Anthropic", score: 1453 },
  { rank: 24, name: "Claude Sonnet 4.5 Thinking", org: "Anthropic", score: 1453 },
  { rank: 25, name: "ERNIE 5.0", org: "Baidu", score: 1452 },
  { rank: 26, name: "Qwen 3.5 397B", org: "Alibaba", score: 1452 },
  { rank: 27, name: "ERNIE 5.0 Preview", org: "Baidu", score: 1450 },
  { rank: 28, name: "Claude Opus 4.1 Thinking", org: "Anthropic", score: 1449 },
  { rank: 29, name: "Gemini 2.5 Pro", org: "Google", score: 1448 },
  { rank: 30, name: "Claude Opus 4.1", org: "Anthropic", score: 1447 },
  { rank: 31, name: "Mimo V2 Pro", org: "Xiaomi", score: 1445 },
  { rank: 32, name: "GPT-4.5 Preview", org: "OpenAI", score: 1444 },
  { rank: 33, name: "ChatGPT 4o Latest", org: "OpenAI", score: 1443 },
  { rank: 34, name: "GLM-4.7", org: "Z.ai", score: 1443 },
  { rank: 35, name: "GPT-5.2 High", org: "OpenAI", score: 1442 },
  { rank: 36, name: "GPT-5.2", org: "OpenAI", score: 1440 },
  { rank: 37, name: "GPT-5.1", org: "OpenAI", score: 1439 },
  { rank: 38, name: "Gemini 3.1 Flash Lite Preview", org: "Google", score: 1438 },
  { rank: 39, name: "Qwen 3 Max Preview", org: "Alibaba", score: 1435 },
  { rank: 40, name: "GPT-5 High", org: "OpenAI", score: 1434 },
  { rank: 41, name: "Kimi K2.5 Instant", org: "Moonshot", score: 1433 },
  { rank: 42, name: "o3", org: "OpenAI", score: 1432 },
  { rank: 43, name: "Grok 4.1 Fast Reasoning", org: "xAI", score: 1431 },
  { rank: 44, name: "Kimi K2 Thinking Turbo", org: "Moonshot", score: 1430 },
  { rank: 45, name: "Amazon Nova Experimental", org: "Amazon", score: 1429 },
  { rank: 46, name: "GPT-5 Chat", org: "OpenAI", score: 1426 },
  { rank: 47, name: "GLM-4.6", org: "Z.ai", score: 1426 },
  { rank: 48, name: "DeepSeek V3.2 Thinking", org: "DeepSeek", score: 1425 },
  { rank: 49, name: "DeepSeek V3.2", org: "DeepSeek", score: 1425 },
  { rank: 50, name: "Qwen 3 Max 2025-09-23", org: "Alibaba", score: 1424 },
];

// ====== Populate Leaderboard ======
function populateLeaderboard() {
  const tbody = document.querySelector("#leaderboard tbody");
  if (!tbody) return;

  ARENA_TOP50.forEach(model => {
    const isc = ISC_CASES[model.name];
    const tr = document.createElement("tr");

    const statusHTML = isc
      ? '<span class="status-jailbroken">🔴</span>'
      : '<span class="status-safe">🟢</span>';

    let demoHTML = "";
    let byHTML = "";
    if (isc) {
      demoHTML = isc.demos.map((d, i) =>
        `<a href="${d.link}" target="_blank">🔗${isc.demos.length > 1 ? `₊${i+1}` : ""}</a>`
      ).join(" ");
      byHTML = isc.demos.map(d =>
        `<a href="https://github.com/${d.by}" target="_blank">@${d.by}</a>`
      ).join(" ");
    }

    tr.innerHTML = `
      <td>${model.rank}</td>
      <td><strong>${model.name}</strong> <span style="color:var(--text-dim);font-size:12px">${model.org}</span></td>
      <td>${model.score}</td>
      <td>${statusHTML}</td>
      <td>${demoHTML}</td>
      <td>${byHTML}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ====== Populate Demos ======
function populateDemos() {
  const grid = document.getElementById("demo-grid");
  if (!grid) return;

  const providerIcons = {
    "claude": "🟣", "gemini": "🔵", "gpt": "⚪", "chatgpt": "⚪",
    "grok": "🟠", "kimi": "🌙", "qwen": "🔮", "deepseek": "🔍",
    "glm": "💎", "ernie": "🔷", "o3": "⚪",
  };

  Object.entries(ISC_CASES).forEach(([name, data]) => {
    const demo = data.demos[0];
    const key = Object.keys(providerIcons).find(k => name.toLowerCase().includes(k)) || "";
    const icon = providerIcons[key] || "🤖";

    const card = document.createElement("div");
    card.className = "demo-card";
    card.innerHTML = `
      <div class="demo-icon">${icon}</div>
      <div class="demo-info">
        <h4>${name}</h4>
        <p>by @${demo.by}</p>
      </div>
      <a href="${demo.link}" target="_blank">View →</a>
    `;
    grid.appendChild(card);
  });
}

// ====== Nav Toggle ======
function toggleNav() {
  document.querySelector(".nav-links").classList.toggle("active");
}

// ====== Copy BibTeX ======
function copyBibtex() {
  const text = document.getElementById("bibtex").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
  });
}

// ====== Scroll animations ======
function observeSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section, .stat-card, .fw-card, .domain-card, .demo-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ====== Nav scroll effect ======
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 100) {
    nav.style.borderBottomColor = "var(--border)";
    nav.style.background = "rgba(10, 10, 15, 0.95)";
  } else {
    nav.style.background = "rgba(10, 10, 15, 0.85)";
  }
});

// ====== Init ======
document.addEventListener("DOMContentLoaded", () => {
  populateLeaderboard();
  populateDemos();
  observeSections();
});
