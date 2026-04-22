// ISC-Bench — ISC Arena Website
// Auto-fetches data from GitHub repo for real-time updates

const REPO_RAW = "https://raw.githubusercontent.com/wuyoscar/ISC-Bench/main";

// ====== Fallback data (used if fetch fails) ======
const FALLBACK_CASES = {
  "Claude Opus 4.7 Thinking": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/claudeopus47-agent-qwenguard", by: "wuyoscar" }] },
  "Claude Opus 4.6": { demos: [{ link: "https://claude.ai/share/407d33f5-4655-4479-b3e3-0a6dc6639d34", by: "wuyoscar" }] },
  "Claude Opus 4.5": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/claudeopus45-share", by: "wuyoscar" }] },
  "Claude Sonnet 4.6": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/claudesonnet46-share", by: "wuyoscar" }] },
  "Gemini 3 Pro": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-13-gemini3pro", by: "wuyoscar" }] },
  "GPT-5.2 Chat": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-29-gpt52chat", by: "wuyoscar" }] },
  "o3": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/o3-share", by: "wuyoscar" }] },
  "Grok 4.1": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-grok41-redacted", by: "wuyoscar" }] },
  "Kimi K2.5 Thinking": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/kimi-k25-thinking-share", by: "wuyoscar" }] },
  "Qwen 3 Max Preview": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-4-qwen3max", by: "wuyoscar" }] },
  "DeepSeek V3.2": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/deepseek-v32-share", by: "wuyoscar" }] },
  "GLM-5": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/glm5-share", by: "wuyoscar" }] },
  "Qwen 3.5 397B": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-3-qwen35397b", by: "HanxunH" }] },
  "Qwen 3 Max 2025-09-23": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/qwen3-max-20250923-share", by: "HanxunH" }] },
  "ERNIE 5.0": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-5-ernie5", by: "HanxunH" }] },
  "Grok 4.1 Thinking": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/grok41fast-guard-attack-v2", by: "wuyoscar" }] },
  "Grok 4.1 Fast Reasoning": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/grok41fast-guard-attack-v2", by: "wuyoscar" }] },
  "Gemini 3 Flash Thinking": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/gemini3flash-guard-attack-v2", by: "wuyoscar" }] },
  "GPT-5.1 High": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/gpt51-guard-attack-v2", by: "wuyoscar" }] },
  "GPT-5.1": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/gpt51-guard-attack-v2", by: "wuyoscar" }] },
  "Claude Opus 4.1": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/claudeopus41-guard-attack-v2", by: "wuyoscar" }] },
  "Claude Opus 4.1 Thinking": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/claudeopus41-guard-attack-v2", by: "wuyoscar" }] },
  "GPT-5.2": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/gpt52-guard-attack-v2", by: "wuyoscar" }] },
  "GPT-5.2 High": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/gpt52-guard-attack-v2", by: "wuyoscar" }] },
  "DeepSeek V3.2 Thinking": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/deepseekv32-guard-attack-v2", by: "wuyoscar" }] },
  "Qwen 3.5 Max Preview": { demos: [{ link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/qwen35maxpreview-web-share", by: "wuyoscar" }] },
};

// ====== Dynamic Data Fetch ======
async function fetchJSON(path) {
  try {
    const resp = await fetch(`${REPO_RAW}/${path}?t=${Date.now()}`);
    if (!resp.ok) throw new Error(resp.status);
    return await resp.json();
  } catch (e) {
    console.warn(`Failed to fetch ${path}, using fallback:`, e);
    return null;
  }
}

async function loadData() {
  const [arenaData, iscData] = await Promise.all([
    fetchJSON("assets/arena_cache.json"),
    fetchJSON("assets/isc_cases.json"),
  ]);

  const arena = arenaData || [];
  const cases = iscData || FALLBACK_CASES;

  window._allModels = arena;
  window._allCases = cases;
  window._currentPage = 1;
  window._perPage = 25;
  renderPage(1, arena, cases);
  populateDemos(cases);
  updateStats(arena, cases);
}

// ====== Pagination ======
function renderPage(page, models, cases) {
  const perPage = window._perPage;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageModels = models.slice(start, end);
  window._currentPage = page;
  populateLeaderboard(pageModels, cases);
  renderPagination(models.length, perPage, page);
}

function renderPagination(total, perPage, current) {
  const totalPages = Math.ceil(total / perPage);
  let container = document.getElementById("pagination-nav");
  if (!container) {
    container = document.createElement("nav");
    container.id = "pagination-nav";
    container.className = "pagination is-centered is-small mt-4";
    container.setAttribute("role", "navigation");
    const tableContainer = document.querySelector(".table-container");
    if (tableContainer) tableContainer.parentNode.insertBefore(container, tableContainer.nextSibling);
  }

  let html = '<ul class="pagination-list">';

  // Previous
  if (current > 1) {
    html += `<li><a class="pagination-link" onclick="renderPage(${current-1}, window._allModels, window._allCases)">&laquo;</a></li>`;
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - 2 && i <= current + 2)) {
      html += `<li><a class="pagination-link ${i === current ? 'is-current' : ''}" onclick="renderPage(${i}, window._allModels, window._allCases)">${i}</a></li>`;
    } else if (i === current - 3 || i === current + 3) {
      html += '<li><span class="pagination-ellipsis">&hellip;</span></li>';
    }
  }

  // Next
  if (current < totalPages) {
    html += `<li><a class="pagination-link" onclick="renderPage(${current+1}, window._allModels, window._allCases)">&raquo;</a></li>`;
  }

  html += '</ul>';
  container.innerHTML = html;
}

// ====== Leaderboard ======
function populateLeaderboard(models, cases) {
  const tbody = document.getElementById("leaderboard-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  models.forEach(model => {
    const displayName = slugToDisplay(model.name);
    const isc = cases[displayName];
    const tr = document.createElement("tr");

    let statusHTML, demoHTML = "", byHTML = "";
    if (isc) {
      statusHTML = '<span class="badge-jailbroken"><i class="fas fa-unlock"></i> Triggered</span>';
      demoHTML = isc.demos.map((d, i) =>
        `<a href="${d.link}" target="_blank" title="View conversation">🔗${isc.demos.length > 1 ? `₊${i+1}` : ""}</a>`
      ).join(" ");
      byHTML = isc.demos.map(d =>
        `<a href="https://github.com/${d.by}" target="_blank">@${d.by}</a>`
      ).join("<br>");
    } else {
      statusHTML = '<span class="badge-safe"><i class="fas fa-hourglass-half"></i> Pending</span>';
    }

    tr.innerHTML = `
      <td class="has-text-centered"><strong>${model.rank}</strong></td>
      <td><span class="model-name">${displayName}</span><span class="model-org">${model.org}</span></td>
      <td class="has-text-centered">${model.score ?? "—"}</td>
      <td class="has-text-centered">${statusHTML}</td>
      <td class="has-text-centered">${demoHTML}</td>
      <td class="has-text-centered">${byHTML}</td>
    `;
    tr.dataset.name = displayName.toLowerCase();
    tr.dataset.status = isc ? "jailbroken" : "safe";
    tbody.appendChild(tr);
  });
}

// ====== Demo Cards (Marquee) ======
// Curated live-case showcase. Hand-picked, not auto-populated from isc_cases.json.
// Each entry: { name, domain (for favicon), by, link, tag? }
const CURATED_DEMOS = [
  // Row 1 — frontier Large Models, mixed labs + Kimi presence
  { name: "Claude Opus 4.7 Thinking", domain: "anthropic.com", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/claudeopus47-agent-qwenguard", tag: "agentic · 12 langs" },
  { name: "Gemini 3.1 Pro Preview", domain: "google.com", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-42-gemini31pro-agent-qwenguard", tag: "agentic TVD" },
  { name: "GPT-5.4 High", domain: "openai.com", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-57-gpt54-moderation-api", tag: "moderation API" },
  { name: "Kimi K2.6 (zh)", domain: "moonshot.ai", by: "wuyoscar", link: "https://www.kimi.com/share/19db5b43-c122-86e0-8000-0000aa1d70ff", tag: "web share · zh" },
  // Row 2 — more frontier variety + Kimi second demo
  { name: "Grok 4.20 Beta", domain: "x.ai", by: "HanxunH", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-9-grok420beta", tag: "guard test-gen" },
  { name: "DeepSeek V3.2", domain: "deepseek.com", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/deepseek-v32-share", tag: "single-turn" },
  { name: "Kimi K2.6 (zh)", domain: "moonshot.ai", by: "wuyoscar", link: "https://www.kimi.com/share/19db5b4b-3752-8323-8000-00001e3951e5", tag: "web share · zh" },
  { name: "Qwen 3.5 Max Preview", domain: "alibabacloud.com", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/qwen35maxpreview-web-share", tag: "web" },
  // Row 3 — more coverage, includes older Kimi variants
  { name: "Claude Opus 4.6 Thinking", domain: "anthropic.com", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/claudeopus46thinking-guard-attack", tag: "adversarial prompts" },
  { name: "Kimi K2.5 Thinking", domain: "moonshot.ai", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/kimi-k25-thinking-share", tag: "share" },
  { name: "Kimi K2.5 Instant", domain: "moonshot.ai", by: "fresh-ma", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/issue-31-kimik25instant", tag: "long-form" },
  { name: "GLM-5", domain: "z.ai", by: "wuyoscar", link: "https://github.com/wuyoscar/ISC-Bench/tree/main/community/glm5-share", tag: "share" },
  { name: "Grok 4.1", domain: "x.ai", by: "wuyoscar", link: "https://grok.com/share/c2hhcmQtMi1jb3B5_54de710c-9331-4fca-a953-6c35775156fb", tag: "web share" },
];

function populateDemos(_cases) {
  const container = document.getElementById("demo-grid");
  if (!container) return;
  container.innerHTML = "";

  function makeCard(d) {
    const icon = d.domain
      ? `<img src="https://www.google.com/s2/favicons?domain=${d.domain}&sz=64" width="22" style="vertical-align:middle;border-radius:4px;">`
      : "🤖";
    const tagHTML = d.tag ? `<span class="demo-tag">${d.tag}</span>` : "";
    return `<a href="${d.link}" target="_blank" rel="noopener" class="demo-card">
      <div class="demo-icon">${icon}</div>
      <div class="demo-info">
        <h4>${d.name}</h4>
        <p>by @${d.by}${tagHTML}</p>
      </div>
      <span class="demo-link">View →</span>
    </a>`;
  }

  // Split CURATED_DEMOS into N rows roughly evenly.
  const ROW_COUNT = 3;
  const rowSize = Math.ceil(CURATED_DEMOS.length / ROW_COUNT);
  const rowItems = Array.from({ length: ROW_COUNT }, (_, i) =>
    CURATED_DEMOS.slice(i * rowSize, (i + 1) * rowSize)
  ).filter(arr => arr.length > 0);

  // Alternate direction per row. Base speed per row (px/frame), slightly varied.
  const BASE_SPEEDS = [0.55, 0.65, 0.50];
  const STEP_PX = 330; // per-arrow-click nudge (~ one card + gap)

  rowItems.forEach((items, rowIdx) => {
    const wrap = document.createElement("div");
    wrap.className = "marquee-row-wrap";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "marquee-arrow marquee-arrow-prev";
    prev.setAttribute("aria-label", "Scroll left");
    prev.textContent = "‹";

    const row = document.createElement("div");
    row.className = "marquee-row";
    const inner = document.createElement("div");
    inner.className = "marquee-inner";
    // Duplicate once so the JS-driven loop can wrap seamlessly.
    const html = items.map(makeCard).join("");
    inner.innerHTML = html + html;
    row.appendChild(inner);

    const next = document.createElement("button");
    next.type = "button";
    next.className = "marquee-arrow marquee-arrow-next";
    next.setAttribute("aria-label", "Scroll right");
    next.textContent = "›";

    wrap.appendChild(prev);
    wrap.appendChild(row);
    wrap.appendChild(next);
    container.appendChild(wrap);

    // JS rAF scroller (replaces CSS keyframe animation).
    const direction = rowIdx % 2 === 0 ? 1 : -1; // row 0: left→right scroll, row 1: right→left, row 2: left→right
    const speed = BASE_SPEEDS[rowIdx % BASE_SPEEDS.length];
    const singleWidth = () => inner.scrollWidth / 2;

    let offset = direction > 0 ? 0 : singleWidth();
    let paused = false;

    function wrapOffset(o, w) {
      if (w <= 0) return 0;
      return ((o % w) + w) % w;
    }

    function tick() {
      if (!paused) {
        const w = singleWidth();
        if (w > 0) {
          offset = wrapOffset(offset + direction * speed, w);
          inner.style.transform = `translateX(${-offset}px)`;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Hover pause
    wrap.addEventListener("mouseenter", () => { paused = true; });
    wrap.addEventListener("mouseleave", () => { paused = false; });

    // Arrow nudges (pause briefly, then resume)
    let resumeTimer = null;
    function nudge(delta) {
      const w = singleWidth();
      if (w <= 0) return;
      offset = wrapOffset(offset + delta, w);
      inner.style.transform = `translateX(${-offset}px)`;
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 1200);
    }
    prev.addEventListener("click", () => nudge(-STEP_PX));
    next.addEventListener("click", () => nudge(STEP_PX));
  });
}

// ====== Update Stats ======
function updateStats(arena, cases) {
  const confirmed = Object.keys(cases).length;
  const total = arena.length || 100;

  // Update stat cards if they exist
  document.querySelectorAll(".stat-num").forEach(el => {
    if (el.textContent === "56") return; // keep templates count
    if (el.textContent === "8") return;  // keep domains count
  });

  // Update arena subtitle
  const subtitle = document.querySelector("#arena .subtitle");
  if (subtitle) {
    subtitle.innerHTML = `Real-time tracking of ISC across <strong>${total}</strong> Arena-ranked models.
      Every <span class="has-text-danger">red dot</span> is a confirmed case.
      <strong class="has-text-danger">${confirmed}</strong> triggered so far.`;
  }
}

// ====== Search + Filter ======
function setupSearch() {
  const searchInput = document.getElementById("arenaSearch");
  const filterSelect = document.getElementById("arenaFilter");
  if (!searchInput || !filterSelect) return;

  function applyFilter() {
    const query = searchInput.value.toLowerCase();
    const filter = filterSelect.value;
    const allModels = window._allModels || [];
    const cases = window._allCases || {};

    const filtered = allModels.filter(m => {
      const name = slugToDisplay(m.name).toLowerCase();
      const isc = cases[slugToDisplay(m.name)];
      const nameMatch = name.includes(query) || m.org.toLowerCase().includes(query);
      const statusMatch = filter === "all" || (filter === "jailbroken" && isc) || (filter === "safe" && !isc);
      return nameMatch && statusMatch;
    });

    window._filteredModels = filtered;
    window._currentPage = 1;
    populateLeaderboard(filtered.slice(0, window._perPage), cases);
    renderPagination(filtered.length, window._perPage, 1);
  }

  // Override renderPage to use filtered if available
  const origRenderPage = window.renderPage;
  window.renderPage = function(page, models, cases) {
    const src = window._filteredModels || models;
    const perPage = window._perPage;
    const start = (page - 1) * perPage;
    populateLeaderboard(src.slice(start, start + perPage), cases);
    renderPagination(src.length, perPage, page);
    window._currentPage = page;
  };

  searchInput.addEventListener("input", applyFilter);
  filterSelect.addEventListener("change", applyFilter);
}

// ====== Name Conversion ======
const DISPLAY_NAMES = {
  "claude-opus-4-7-thinking": "Claude Opus 4.7 Thinking",
  "claude-opus-4-6-thinking": "Claude Opus 4.6 Thinking",
  "claude-opus-4-6": "Claude Opus 4.6",
  "gemini-3.1-pro-preview": "Gemini 3.1 Pro Preview",
  "grok-4.20-beta1": "Grok 4.20 Beta",
  "gemini-3-pro": "Gemini 3 Pro",
  "gpt-5.4-high": "GPT-5.4 High",
  "gpt-5.2-chat-latest-20260210": "GPT-5.2 Chat",
  "grok-4.20-beta-0309-reasoning": "Grok 4.20 Reasoning",
  "gemini-3-flash": "Gemini 3 Flash",
  "claude-opus-4-5-20251101-thinking-32k": "Claude Opus 4.5 Thinking",
  "grok-4.1-thinking": "Grok 4.1 Thinking",
  "claude-opus-4-5-20251101": "Claude Opus 4.5",
  "claude-sonnet-4-6": "Claude Sonnet 4.6",
  "qwen3.5-max-preview": "Qwen 3.5 Max Preview",
  "gpt-5.3-chat-latest": "GPT-5.3 Chat",
  "gemini-3-flash (thinking-minimal)": "Gemini 3 Flash Thinking",
  "gpt-5.4": "GPT-5.4",
  "dola-seed-2.0-preview": "Dola Seed 2.0 Preview",
  "grok-4.1": "Grok 4.1",
  "gpt-5.1-high": "GPT-5.1 High",
  "glm-5": "GLM-5",
  "kimi-k2.5-thinking": "Kimi K2.5 Thinking",
  "claude-sonnet-4-5-20250929": "Claude Sonnet 4.5",
  "claude-sonnet-4-5-20250929-thinking-32k": "Claude Sonnet 4.5 Thinking",
  "ernie-5.0-0110": "ERNIE 5.0",
  "qwen3.5-397b-a17b": "Qwen 3.5 397B",
  "ernie-5.0-preview-1203": "ERNIE 5.0 Preview",
  "claude-opus-4-1-20250805-thinking-16k": "Claude Opus 4.1 Thinking",
  "gemini-2.5-pro": "Gemini 2.5 Pro",
  "claude-opus-4-1-20250805": "Claude Opus 4.1",
  "mimo-v2-pro": "Mimo V2 Pro",
  "gpt-4.5-preview-2025-02-27": "GPT-4.5 Preview",
  "chatgpt-4o-latest-20250326": "ChatGPT 4o Latest",
  "glm-4.7": "GLM-4.7",
  "gpt-5.2-high": "GPT-5.2 High",
  "gpt-5.2": "GPT-5.2",
  "gpt-5.1": "GPT-5.1",
  "gemini-3.1-flash-lite-preview": "Gemini 3.1 Flash Lite",
  "qwen3-max-preview": "Qwen 3 Max Preview",
  "gpt-5-high": "GPT-5 High",
  "kimi-k2.5-instant": "Kimi K2.5 Instant",
  "o3-2025-04-16": "o3",
  "grok-4-1-fast-reasoning": "Grok 4.1 Fast Reasoning",
  "kimi-k2-thinking-turbo": "Kimi K2 Thinking Turbo",
  "amazon-nova-experimental-chat-26-02-10": "Amazon Nova Experimental",
  "gpt-5-chat": "GPT-5 Chat",
  "glm-4.6": "GLM-4.6",
  "deepseek-v3.2-exp-thinking": "DeepSeek V3.2 Thinking",
  "deepseek-v3.2": "DeepSeek V3.2",
  "qwen3-max-2025-09-23": "Qwen 3 Max 2025-09-23",
};

function slugToDisplay(slug) {
  return DISPLAY_NAMES[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ====== Nav ======
document.addEventListener("DOMContentLoaded", () => {
  // Burger menu toggle
  document.querySelectorAll(".navbar-burger").forEach(el => {
    el.addEventListener("click", () => {
      const target = document.getElementById(el.dataset.target);
      el.classList.toggle("is-active");
      target.classList.toggle("is-active");
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".fade-in").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Copy BibTeX
  window.copyBibtex = function() {
    const text = document.getElementById("bibtex").textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector(".copy-btn span:last-child");
      if (btn) { btn.textContent = "Copied!"; setTimeout(() => { btn.textContent = "Copy"; }, 2000); }
    });
  };

  // Load data + search
  loadData().then(() => setupSearch());
});
