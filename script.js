
const clock = document.querySelector("#clock");
const windows = [...document.querySelectorAll(".window")];
const openers = [...document.querySelectorAll("[data-window]")];
const pixelSomya = document.querySelector("#pixelSomya");
const speechBubble = document.querySelector("#speechBubble");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatLog = document.querySelector("#chatLog");
const quickAsks = [...document.querySelectorAll("[data-question]")];
let topZ = 40;
let audioContext;
let speechTimer;
let avatarDrag = {
  active: false,
  moved: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  startLeft: 0,
  startTop: 0
};



const knowledgeBase = [
  {
    topic: "About Somya",
    keywords: ["name", "who is", "intro", "summary", "profile", "bio", "background", "what do you do", "who are you", "who is somya", "summarize", "marketing experience"],
    answer: "I'm Somya Nayak, a full-stack marketer with 6+ years of experience. I've scaled a SaaS startup's revenue by 5x in 2 months, built and led GTM operations from scratch, and grew my agency to $1K/month. I connect strategy, product, and execution to drive scalable growth."
  },
  {
    topic: "Current Role",
    keywords: ["current", "present", "intempt", "product marketing", "job", "role", "working now", "work now", "works now", "current company", "latest role", "founding marketer", "where does somya work", "what did you do at intempt"],
    answer: "I am currently a Product Marketing Manager at Intempt (Sep 2024 - Present). As a founding marketer, I worked directly with the founder to set up all GTM ops from scratch, built a high-performing team of 4, and led strategy and execution across channels."
  },
  {
    topic: "Experience",
    keywords: ["experience", "work", "career", "timeline", "companies", "past roles", "previous jobs", "work history", "professional journey", "employment"],
    answer: "My experience includes Product Marketing Manager at Intempt, Founder & CEO at Marvedge, B2B Marketing Manager at Interactly, B2B ABM Intern at HighRadius, and Chief Marketing Officer at Svapak."
  },
  {
    topic: "Marvedge",
    keywords: ["marvedge", "agency", "founder", "ceo", "mrr", "startup", "zero to", "$1k", "1k", "team of 8", "sdr", "data analysts", "editors", "designers", "scale marvedge", "$1k mrr"],
    answer: "At Marvedge (Dec 2023 - Sep 2024), I started from scratch and scaled the agency to $1K MRR. I managed a high-performing team of 8, which included SDRs, data analysts, editors, and designers."
  },
  {
    topic: "Interactly",
    keywords: ["interactly", "5x", "revenue", "b2b marketing manager", "five x", "growth in 2 months", "founder led", "led marketing", "achievements", "biggest achievements"],
    answer: "At Interactly (June 2023 - Mar 2024), I worked directly with the founder as the B2B Marketing Manager and successfully led marketing initiatives that grew their revenue by 5x in just 2 months."
  },
  {
    topic: "HighRadius",
    keywords: ["highradius", "abm", "outbound", "crm", "cold calling", "linkedin outreach", "email", "email marketing", "client meetings", "mid market", "b2b leads", "b2b outbound"],
    answer: "At HighRadius (Feb 2022 - May 2023), I was a B2B ABM Intern for the Mid Market. I handled cold calling, LinkedIn outreach, email marketing, B2B outbound leads, CRM management, and client meetings."
  },
  {
    topic: "Svapak",
    keywords: ["svapak", "cmo", "doctors", "social media", "local doctors", "10 doctors", "10+", "team of 4", "chief marketing officer"],
    answer: "At Svapak (Feb 2020 - Dec 2023), I served as Chief Marketing Officer. I signed 10+ local doctors for social media marketing services and managed a marketing team of 4 to handle all operations."
  },
  {
    topic: "Skills",
    keywords: ["skills", "expertise", "stack", "tools", "strengths", "good at", "specialize", "capabilities", "marketing skills", "hard skills", "core skills"],
    answer: "Somya's core expertise includes GTM Operations, Social Media Marketing, AI SEO, PPC Ads, Growth Operations, B2B outbound, CRM, team leadership, and marketing systems."
  },
  {
    topic: "Education",
    keywords: ["education", "degree", "college", "university", "mba", "btech", "b.tech", "soa", "iter", "srm", "qualification", "studied", "academic"],
    answer: "Somya has a B.Tech from SOA ITER, completed from 2019 to 2023, and an MBA in Marketing from SRM University, completed from 2023 to 2025."
  },
  {
    topic: "Languages",
    keywords: ["language", "languages", "speak", "english", "hindi", "odia", "fluent"],
    answer: "Somya speaks English, Hindi, and Odia."
  },
  {
    topic: "Contact",
    keywords: ["contact", "email", "linkedin", "reach", "hire", "social", "connect", "mail", "get in touch", "x", "instagram", "youtube"],
    answer: "You can contact Somya at somyanayak281@gmail.com or on LinkedIn at somyarajannayak. His X, Instagram, and YouTube links are in the Socials window."
  },
  {
    topic: "GTM Operations",
    keywords: ["gtm", "go to market", "go-to-market", "gtm ops", "operations", "launch", "pipeline", "strategy execution"],
    answer: "Somya's GTM work is about building the operating system for growth: channel strategy, outbound motion, CRM discipline, team workflows, and execution loops that help early traction become repeatable revenue."
  },
  {
    topic: "AI SEO",
    keywords: ["seo", "ai seo", "search", "content", "organic", "ranking", "google"],
    answer: "AI SEO is part of Somya's expertise stack. He positions it as a growth lever alongside GTM ops, social media marketing, PPC ads, outbound, and CRM."
  },
  {
    topic: "PPC Ads",
    keywords: ["ppc", "ads", "paid ads", "paid marketing", "campaign", "ad campaign", "performance marketing"],
    answer: "Somya lists PPC Ads as one of his core expertise areas, alongside AI SEO, SMM, GTM operations, and growth operations."
  },
  {
    topic: "Social Media Marketing",
    keywords: ["smm", "social media marketing", "social media", "instagram marketing", "content marketing"],
    answer: "Social Media Marketing is one of Somya's strongest profile themes. At Svapak, he signed 10+ local doctors for SMM services and managed marketing operations with a team of 4."
  },
  {
    topic: "Leadership",
    keywords: ["leadership", "team", "managed", "manager", "built team", "team size", "people", "hiring"],
    answer: "Somya has led teams at multiple stages: a team of 4 at Intempt, a team of 8 at Marvedge, and a marketing team of 4 at Svapak."
  },
  {
    topic: "Best Fit",
    keywords: ["fit", "hire for", "best for", "why hire", "suitable", "candidate", "good candidate"],
    answer: "Somya is a strong fit for founder-led startups, SaaS growth teams, product marketing, GTM operations, B2B outbound, and roles that need someone to build marketing systems from scratch."
  },
  {
    topic: "Achievements",
    keywords: ["achievement", "achievements", "impact", "result", "results", "metrics", "wins", "accomplishments", "proof", "numbers", "case study"],
    answer: "Key wins: 6+ years in marketing, scaled two SaaS products as founding marketer, closed a $357K deal through social media marketing, drove 5x revenue in two months at a B2B SaaS, generated $600K+ through paid ads, built teams from scratch twice, grew a 22K+ follower personal brand with 12M+ organic views, scaled 100K+ followers, and contributed to $500K+ revenue growth."
  },
  {
    topic: "Paid Ads Results",
    keywords: ["paid ads", "google ads", "facebook ads", "linkedin ads", "ads revenue", "$600k", "600k", "performance marketing"],
    answer: "Somya generated $600K+ in revenue through paid ads across Google, Facebook, and LinkedIn."
  },
  {
    topic: "Personal Brand",
    keywords: ["personal brand", "followers", "views", "organic", "22k", "12m", "100k", "audience"],
    answer: "Somya has built a strong organic personal brand with 22K+ followers and 12M+ cumulative views. He has also scaled 100K+ followers across brand/campaign growth work."
  },
  {
    topic: "Big Deals",
    keywords: ["deal", "$357k", "357k", "closed", "social media deal", "large deal"],
    answer: "Somya closed a $357K deal through social media marketing and also helped 5x revenue in two months at one B2B SaaS."
  },
  {
    topic: "Availability",
    keywords: ["available", "availability", "freelance", "consulting", "open to work", "job search"],
    answer: "Somya is currently Product Marketing Manager at Intempt. For availability, the best move is to contact him directly at somyanayak281@gmail.com or on LinkedIn."
  }
];

const knowledgeAliases = {
  "product marketing manager": ["pmm", "product marketing"],
  "business to business": ["b2b"],
  "go to market": ["gtm", "go-to-market"],
  "social media marketing": ["smm"],
  "pay per click": ["ppc"],
  "search engine optimization": ["seo"],
  "customer relationship management": ["crm"]
};

const stopWords = new Set([
  "a", "an", "and", "are", "about", "can", "could", "do", "does", "for", "from", "give", "he", "his", "i", "is", "me", "of", "on", "please", "show", "somya", "tell", "the", "to", "want", "what", "when", "where", "which", "who", "why", "with", "you"
]);

function updateClock() {
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  clock.dateTime = now.toISOString();
}

function playTone(type = "open") {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  gain.connect(audioContext.destination);

  const notes = type === "close" ? [520, 390] : type === "trash" ? [260, 196, 146] : [420, 630, 840];
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.045);
    oscillator.connect(gain);
    oscillator.start(now + index * 0.045);
    oscillator.stop(now + index * 0.045 + 0.075);
  });
}

function bringForward(win) {
  topZ += 1;
  if (topZ >= 8998) topZ = 40;
  win.style.zIndex = topZ;
}

function openWindow(id, shouldPlaySound = true) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.add("open");
  bringForward(win);
  if (shouldPlaySound) {
    playTone(id === "trash" ? "trash" : "open");
  }
}

function closeWindow(win) {
  win.classList.remove("open");
  playTone("close");
}

function clamp(value, bound1, bound2) {
  const min = Math.min(bound1, bound2);
  const max = Math.max(bound1, bound2);
  return Math.min(Math.max(value, min), max);
}

function makeDraggable(win) {
  const titlebar = win.querySelector(".window-titlebar");
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  let dragging = false;

  if (titlebar) {
    titlebar.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button") || event.target.closest("a")) return;
      
      const computed = window.getComputedStyle(win);
      if (computed.transform !== 'none' && computed.transform !== '') {
        const rect = win.getBoundingClientRect();
        win.style.transform = 'none';
        win.style.left = `${rect.left}px`;
        win.style.top = `${rect.top}px`;
      }

      dragging = true;
      bringForward(win);
      startX = event.clientX;
      startY = event.clientY;
      startLeft = win.offsetLeft;
      startTop = win.offsetTop;
      try {
        titlebar.setPointerCapture(event.pointerId);
      } catch (e) {}
    });

    titlebar.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      const maxLeft = Math.max(0, window.innerWidth - win.offsetWidth);
      const maxTop = Math.max(0, window.innerHeight - win.offsetHeight);
      
      const clampLeft = clamp(startLeft + deltaX, 0, maxLeft);
      const clampTop = clamp(startTop + deltaY, 0, maxTop);

      if (window.innerWidth <= 768) {
        win.style.setProperty('left', `${clampLeft}px`, 'important');
        win.style.setProperty('top', `${clampTop}px`, 'important');
      } else {
        win.style.left = `${clampLeft}px`;
        win.style.top = `${clampTop}px`;
      }
    });

    titlebar.addEventListener("pointerup", (event) => {
      if (!dragging) return;
      dragging = false;
      try {
        titlebar.releasePointerCapture(event.pointerId);
      } catch (e) {}
    });
  }

  win.addEventListener("pointerdown", () => bringForward(win));
}

openers.forEach((button) => {
  button.addEventListener("click", () => openWindow(button.dataset.window));
});

windows.forEach((win) => {
  makeDraggable(win);
  const closeBtn = win.querySelector("[data-close]");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeWindow(win));
  }
});



function sayHello(message = "Hey, I'm Mini Somya. Click me to chat.", shouldPlaySound = true) {
  const safeMessage = typeof message === "string"
    ? message
    : "Hey, I'm Mini Somya. Click me to chat.";
  speechBubble.textContent = safeMessage;
  pixelSomya.classList.add("talking");
  if (shouldPlaySound) {
    playTone("open");
  }
  clearTimeout(speechTimer);
  speechTimer = setTimeout(() => {
    pixelSomya.classList.remove("talking");
  }, 4600);
}

function showPersistentGreeting() {
  clearTimeout(speechTimer);
  speechBubble.textContent = "Hey, I'm Mini Somya. Click me to chat.";
  pixelSomya.classList.add("talking");
}

function openChatFromAvatar() {
  openWindow("chat");
  sayHello("Chat with Mini Somya. Ask me anything about Somya.");
  setTimeout(() => chatInput.focus(), 80);
}

function placeAvatar(left, top) {
  const maxLeft = window.innerWidth - pixelSomya.offsetWidth - 8;
  const maxTop = window.innerHeight - pixelSomya.offsetHeight - 86;
  pixelSomya.style.left = `${clamp(left, 8, maxLeft)}px`;
  pixelSomya.style.top = `${clamp(top, 48, maxTop)}px`;
  pixelSomya.style.bottom = "auto";
  pixelSomya.style.transform = "none";
}

pixelSomya.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  avatarDrag.active = true;
  avatarDrag.moved = false;
  avatarDrag.pointerId = event.pointerId;
  avatarDrag.startX = event.clientX;
  avatarDrag.startY = event.clientY;
  avatarDrag.startLeft = pixelSomya.offsetLeft;
  avatarDrag.startTop = pixelSomya.offsetTop;
  pixelSomya.setPointerCapture(event.pointerId);
  pixelSomya.classList.add("dragging");
});

pixelSomya.addEventListener("pointermove", (event) => {
  if (!avatarDrag.active || event.pointerId !== avatarDrag.pointerId) return;
  const deltaX = event.clientX - avatarDrag.startX;
  const deltaY = event.clientY - avatarDrag.startY;
  if (Math.abs(deltaX) + Math.abs(deltaY) > 6) {
    avatarDrag.moved = true;
  }
  placeAvatar(avatarDrag.startLeft + deltaX, avatarDrag.startTop + deltaY);
});

pixelSomya.addEventListener("pointerup", (event) => {
  if (!avatarDrag.active || event.pointerId !== avatarDrag.pointerId) return;
  pixelSomya.releasePointerCapture(event.pointerId);
  pixelSomya.classList.remove("dragging");
  const wasMoved = avatarDrag.moved;
  avatarDrag.active = false;
  avatarDrag.pointerId = null;
  if (!wasMoved) {
    openChatFromAvatar();
  }
});

pixelSomya.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openChatFromAvatar();
  }
});

function addMessage(text, sender = "bot") {
  const message = document.createElement("div");
  message.className = `chat-message ${sender}`;

  if (sender === "bot") {
    const avatar = document.createElement("span");
    avatar.className = "mini-avatar";
    avatar.setAttribute("aria-hidden", "true");
    message.append(avatar);
  }

  const bubble = document.createElement("p");
  bubble.textContent = text;
  message.append(bubble);
  chatLog.append(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function normalizeText(text) {
  let normalized = text
    .toLowerCase()
    .replace(/[$]/g, " dollar ")
    .replace(/[^a-z0-9+.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  Object.entries(knowledgeAliases).forEach(([expanded, aliases]) => {
    aliases.forEach((alias) => {
      if (normalized.includes(alias)) {
        normalized += ` ${expanded}`;
      }
    });
  });

  return normalized;
}

function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 1 && !stopWords.has(word));
}

function scoreEntry(question, entry) {
  const normalizedQuestion = normalizeText(question);
  const questionTokens = tokenize(question);
  const keywordScore = entry.keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedQuestion.includes(normalizedKeyword)) {
      return score + normalizedKeyword.length + 8;
    }
    const keywordTokens = tokenize(keyword);
    const overlap = keywordTokens.filter((token) => questionTokens.includes(token)).length;
    return score + overlap * 4;
  }, 0);
  const topicScore = tokenize(entry.topic).filter((token) => questionTokens.includes(token)).length * 5;
  return keywordScore + topicScore;
}

function getRelatedTopics(question) {
  const ranked = knowledgeBase
    .map((entry) => ({ topic: entry.topic, score: scoreEntry(question, entry) }))
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 3)
    .map((entry) => entry.topic);

  return ranked.length ? ranked.join(", ") : "current role, experience, skills, education, achievements, GTM work, or contact details";
}

function answerQuestion(question) {
  const trimmedQuestion = question.trim();
  if (!trimmedQuestion) return;

  addMessage(trimmedQuestion, "user");
  const rankedMatches = knowledgeBase
    .map((entry) => ({ ...entry, score: scoreEntry(trimmedQuestion, entry) }))
    .sort((a, b) => b.score - a.score);
  const bestMatch = rankedMatches[0];

  const answer = bestMatch && bestMatch.score >= 6
    ? bestMatch.answer
    : `I know Somya's profile best. Try asking about ${getRelatedTopics(trimmedQuestion)}.`;

  setTimeout(() => {
    addMessage(answer, "bot");
    sayHello(answer.length > 92 ? "I answered that in the chat window." : answer, false);
  }, 260);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  answerQuestion(chatInput.value);
  chatInput.value = "";
});

quickAsks.forEach((button) => {
  button.addEventListener("click", () => {
    answerQuestion(button.dataset.question);
  });
});

updateClock();
setInterval(updateClock, 1000);

// Start persistent greeting immediately since boot screen is removed
showPersistentGreeting();

// Avatar dismiss logic
const dismissAvatarBtn = document.getElementById('dismissAvatar');
if (dismissAvatarBtn && pixelSomya) {
  dismissAvatarBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent dragging/clicking on the avatar body
    pixelSomya.style.display = 'none';
  });
}

// --- Mobile 3-Bar Hamburger Menu Logic ---
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileNavMenu = document.getElementById('mobileNavMenu');

if (mobileNavToggle && mobileNavMenu) {
  mobileNavToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNavMenu.classList.contains('open');
    if (isOpen) {
      mobileNavMenu.classList.remove('open');
      mobileNavToggle.classList.remove('open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileNavMenu.classList.add('open');
      mobileNavToggle.classList.add('open');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', (e) => {
    if (!mobileNavMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
      mobileNavMenu.classList.remove('open');
      mobileNavToggle.classList.remove('open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const mobileNavItems = mobileNavMenu.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileNavMenu.classList.remove('open');
      mobileNavToggle.classList.remove('open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Resources Hub Multi-Level Filter & Sort Logic ---
const resourceList = document.getElementById('resourceList');
const resourceSearch = document.getElementById('resourceSearch');
const resourceCount = document.getElementById('resourceCount');
const sortSelect = document.getElementById('sortSelect');
const toolBtns = document.querySelectorAll('.tool-btn');
const typeBtns = document.querySelectorAll('.type-btn');

const leadMagnets = [
  {
    id: "chatgpt-life-ruining-prompts",
    title: "ChatGPT reveals what’s RUINING your life 😳",
    description: "A psychologically brutal exercise to identify your limiting beliefs, analyze your patterns, and predict your future. Not for the faint of heart.",
    tool: "chatgpt",          // 'chatgpt', 'claude', 'gemini', 'multi-tool'
    type: "prompts",          // 'prompts', 'guides', 'workflows', 'systems', 'tools'
    date: "2026-07-25",
    popularity: 200,
    link: "/resources/chatgpt-life-ruining-prompts/"
  },
  {
    id: "chatgpt-secret-codes",
    title: "ChatGPT Secret Codes: 100 Prompt Shortcuts ⚡",
    description: "100 powerful slash commands and shortcut codes organized by category — writing, learning, brainstorming, analysis, coding, and more.",
    tool: "chatgpt",
    type: "prompts",
    date: "2026-07-25",
    popularity: 190,
    link: "/resources/chatgpt-secret-codes/"
  },
  {
    id: "claude-secret-codes",
    title: "Claude Secret Codes: 100 Prompt Shortcuts ⚡",
    description: "100 advanced slash commands and shortcut codes for Claude AI — writing, artifacts, reasoning, learning, analysis, creative, and coding.",
    tool: "claude",
    type: "prompts",
    date: "2026-07-25",
    popularity: 185,
    link: "/resources/claude-secret-codes/"
  },
  {
    id: "chatgpt-discount-codes",
    title: "ChatGPT Can Find You Discount Codes For Anything You're About To Buy 💸",
    description: "Two prompts that hunt down active promo codes, test them at checkout automatically, and maximize your savings before you hit buy.",
    tool: "chatgpt",
    type: "prompts",
    date: "2026-07-22",
    popularity: 175,
    link: "/resources/chatgpt-discount-codes/"
  },
  {
    id: "claude-digital-identity-takedown",
    title: "Claude: Removing Your Digital Identity 🛡️",
    description: "Locate exposed personal data across people-search sites and generate custom data deletion & DMCA takedown requests in one afternoon.",
    tool: "claude",
    type: "guides",
    date: "2026-07-17",
    popularity: 165,
    link: "/resources/claude-digital-identity-takedown/"
  },
  {
    id: "turn-claude-into-marketing-agency",
    title: "Turn Claude Into a Million Dollar Marketing Agency 🚀",
    description: "46 modular marketing skills & battle-tested frameworks to equip Claude for copywriting, paid ads, SEO audits, email flows, and CRO.",
    tool: "claude",
    type: "tools",
    date: "2026-04-18",
    popularity: 195,
    link: "/resources/turn-claude-into-marketing-agency/"
  }
];

let activeToolFilter = 'all';
let activeTypeFilter = 'all';

function renderResources(items) {
  if (!resourceList) return;
  resourceList.innerHTML = '';
  
  if (resourceCount) {
    const count = items.length;
    resourceCount.innerText = `Showing ${count} ${count === 1 ? 'resource' : 'resources'}`;
  }

  if (items.length === 0) {
    resourceList.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--ink); opacity: 0.6; font-family: system-ui, sans-serif;">No resources found matching your active filters or search query.</div>';
    return;
  }

  items.forEach(item => {
    const a = document.createElement('a');
    a.className = 'resource-row';
    a.href = item.link;
    
    a.innerHTML = `
      <span class="resource-badge">${item.type.toUpperCase()}</span>
      <h3 class="resource-title">${item.title}</h3>
      <p class="resource-summary">${item.description}</p>
      <div class="resource-arrow">-&gt;</div>
    `;
    
    resourceList.appendChild(a);
  });
}

function filterAndSortResources() {
  if (!resourceList) return;
  const searchTerm = resourceSearch ? resourceSearch.value.toLowerCase().trim() : '';
  const sortMode = sortSelect ? sortSelect.value : 'popular';

  let filtered = leadMagnets.filter(item => {
    const matchesTool = activeToolFilter === 'all' || item.tool === activeToolFilter;
    const matchesType = activeTypeFilter === 'all' || item.type === activeTypeFilter;
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm) || 
      item.description.toLowerCase().includes(searchTerm) ||
      item.tool.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm);

    return matchesTool && matchesType && matchesSearch;
  });

  // Sort logic
  if (sortMode === 'popular') {
    filtered.sort((a, b) => b.popularity - a.popularity);
  } else if (sortMode === 'newest') {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortMode === 'alphabetical') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderResources(filtered);
}

if (resourceList) {
  if (resourceSearch) {
    resourceSearch.addEventListener('input', filterAndSortResources);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', filterAndSortResources);
  }

  if (toolBtns.length > 0) {
    toolBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toolBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        activeToolFilter = btn.dataset.tool;
        filterAndSortResources();
      });
    });
  }

  if (typeBtns.length > 0) {
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        activeTypeFilter = btn.dataset.type;
        filterAndSortResources();
      });
    });
  }

  // Initial render
  filterAndSortResources();
}
