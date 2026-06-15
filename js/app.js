/* ============================================================
   iFlick SIM — App Logic
   ============================================================ */

const TOTAL = 23;
const STORAGE_KEY = 'iflick_sim_v1';

// ── State ──────────────────────────────────────────────────────
let currentPanel = 0;
const visited = new Set();

// Breadcrumb labels for each panel
const META = [
  { section: 'Pengenalan',         label: 'Selamat Datang' },
  { section: 'Pengenalan',         label: 'Panduan Guna SIM' },
  { section: 'Pengenalan',         label: 'Hasil Pembelajaran' },
  { section: 'Induksi',            label: 'Apakah Import Kursus?' },
  { section: 'Induksi',            label: 'Import vs Restore vs Backup' },
  { section: 'Induksi',            label: 'Gambaran Keseluruhan' },
  { section: 'Induksi',            label: 'Quiz Induksi' },
  { section: 'Unit 1',             label: '1.1 Dashboard & My Courses' },
  { section: 'Unit 1',             label: '1.2 New Course' },
  { section: 'Unit 1',             label: '1.3 Isi Maklumat Kursus' },
  { section: 'Unit 1',             label: 'Aktiviti 1 — Susun Langkah' },
  { section: 'Unit 2',             label: '2.1 Course Management' },
  { section: 'Unit 2',             label: '2.2 Pilih Import' },
  { section: 'Unit 2',             label: '2.3 Pilih Kursus Sumber' },
  { section: 'Unit 2',             label: '2.4 Import Settings' },
  { section: 'Unit 2',             label: '2.5 Schema Settings' },
  { section: 'Unit 2',             label: '2.6 Semak & Sahkan' },
  { section: 'Unit 2',             label: '2.7 Proses Import' },
  { section: 'Unit 2',             label: '2.8 Import Selesai' },
  { section: 'Unit 2',             label: 'Aktiviti 2 — Padankan Langkah' },
  { section: 'Penutup',            label: 'Rumusan' },
  { section: 'Penutup',            label: 'Penilaian Kendiri' },
  { section: 'Penutup',            label: 'Tahniah! 🎉' },
];

// Which sidebar section each panel belongs to (0=Pengenalan,1=Induksi,2=Unit1,3=Unit2,4=Penutup)
const PANEL_SECTION = [0,0,0, 1,1,1,1, 2,2,2,2, 3,3,3,3,3,3,3,3,3, 4,4,4];

// ── Boot ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initAccordion();
  renderSidebar();
  showPanel(currentPanel);
  initDragDrop();
  buildMiniDots();
});

// ── Persistence ────────────────────────────────────────────────
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      current: currentPanel,
      visited: [...visited],
    }));
  } catch (e) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    currentPanel = data.current || 0;
    (data.visited || []).forEach(v => visited.add(v));
  } catch (e) {}
}

function confirmResetProgress() {
  if (!confirm('Padam semua kemajuan dan mulakan dari awal?\n\nTindakan ini tidak boleh dibatalkan.')) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  visited.clear();
  currentPanel = 0;
  initAccordion();
  renderSidebar();
  showPanel(0);
}

// ── Panel display ──────────────────────────────────────────────
function showPanel(idx) {
  // Hide all
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById('panel-' + idx);
  if (target) {
    target.classList.add('active');
    // Scroll content to top
    const wrap = document.getElementById('panelsWrap');
    if (wrap) wrap.scrollTop = 0;
  }

  visited.add(idx);
  currentPanel = idx;

  openSectionForPanel(idx);
  updateSidebar();
  updateHeader();
  updateNavButtons();
  updateMiniDots();
  saveProgress();
}

function goToPanel(idx) {
  if (idx < 0 || idx >= TOTAL) return;
  showPanel(idx);
  // Close sidebar on mobile
  closeSidebarMobile();
}

function navigate(dir) {
  const next = currentPanel + dir;
  if (next >= 0 && next < TOTAL) goToPanel(next);
}

// ── Accordion ─────────────────────────────────────────────────
function initAccordion() {
  // Collapse all except the section containing the current panel
  const activeSec = PANEL_SECTION[currentPanel] ?? 0;
  document.querySelectorAll('.nav-section').forEach(sec => {
    const idx = parseInt(sec.dataset.section);
    const body = sec.querySelector('.acc-body');
    const title = sec.querySelector('.acc-toggle');
    if (idx !== activeSec) {
      body && body.classList.add('collapsed');
      title && title.classList.add('collapsed');
    }
  });
}

function toggleSection(titleEl) {
  const body = titleEl.nextElementSibling;
  const isCollapsed = body.classList.contains('collapsed');
  body.classList.toggle('collapsed', !isCollapsed);
  titleEl.classList.toggle('collapsed', !isCollapsed);
}

function openSectionForPanel(panelIdx) {
  const targetSec = PANEL_SECTION[panelIdx] ?? 0;
  document.querySelectorAll('.nav-section').forEach(sec => {
    const idx = parseInt(sec.dataset.section);
    const body = sec.querySelector('.acc-body');
    const title = sec.querySelector('.acc-toggle');
    if (idx === targetSec) {
      body && body.classList.remove('collapsed');
      title && title.classList.remove('collapsed');
    }
  });
}

// ── Sidebar ────────────────────────────────────────────────────
function renderSidebar() {
  const items = document.querySelectorAll('.nav-item[data-target]');
  items.forEach(item => {
    const t = parseInt(item.dataset.target);
    updateNavItem(item, t);
  });
}

function updateSidebar() {
  const pct = Math.round((visited.size / TOTAL) * 100);
  const fill = document.getElementById('progressFill');
  const pctEl = document.getElementById('progressPct');
  const curEl = document.getElementById('curStep');

  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
  if (curEl) curEl.textContent = currentPanel + 1;

  // Update each nav item
  document.querySelectorAll('.nav-item[data-target]').forEach(item => {
    const t = parseInt(item.dataset.target);
    updateNavItem(item, t);
  });

  // Highlight active section title
  const activeSec = PANEL_SECTION[currentPanel] ?? 0;
  document.querySelectorAll('.nav-section').forEach(sec => {
    const title = sec.querySelector('.acc-toggle');
    if (!title) return;
    const idx = parseInt(sec.dataset.section);
    title.classList.toggle('has-active', idx === activeSec);
  });
}

function updateNavItem(item, idx) {
  const icon = item.querySelector('.nav-icon');
  item.classList.remove('active', 'done');

  if (idx === currentPanel) {
    item.classList.add('active');
    if (icon) icon.textContent = '▶';
  } else if (visited.has(idx)) {
    item.classList.add('done');
    if (icon) icon.textContent = '✓';
  } else {
    if (icon) icon.textContent = '◯';
  }
}

// ── Header ─────────────────────────────────────────────────────
function updateHeader() {
  const meta = META[currentPanel] || {};
  const bc = document.getElementById('breadcrumb');
  const info = document.getElementById('headerStepInfo');
  const leaf = document.getElementById('breadcrumbLeaf');

  if (bc && leaf) {
    const spans = bc.getElementsByTagName('span');
    if (spans[0]) spans[0].textContent = meta.section || '';
    leaf.textContent = meta.label || '';
  }
  if (info) info.textContent = `Langkah ${currentPanel + 1} / ${TOTAL}`;

  const navLabel = document.getElementById('navLabel');
  if (navLabel) navLabel.textContent = `Langkah ${currentPanel + 1} / ${TOTAL}`;
}

// ── Nav buttons ────────────────────────────────────────────────
function updateNavButtons() {
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if (prev) prev.disabled = currentPanel === 0;
  if (next) next.disabled = currentPanel === TOTAL - 1;
}

// ── Mini dots ──────────────────────────────────────────────────
function buildMiniDots() {
  const container = document.getElementById('navMiniDots');
  if (!container) return;
  container.innerHTML = '';
  // Show 7 dots around current position
  const radius = 3;
  for (let i = Math.max(0, currentPanel - radius); i <= Math.min(TOTAL - 1, currentPanel + radius); i++) {
    const dot = document.createElement('div');
    dot.className = 'mini-dot';
    if (i === currentPanel) dot.classList.add('active');
    else if (visited.has(i)) dot.classList.add('fill');
    container.appendChild(dot);
  }
}

function updateMiniDots() {
  buildMiniDots();
}

// ── Mobile sidebar ─────────────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  if (!sb) return;
  sb.classList.toggle('open');
  if (ov) ov.classList.toggle('open');
}

function closeSidebarMobile() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  if (sb && sb.classList.contains('open')) {
    sb.classList.remove('open');
    if (ov) ov.classList.remove('open');
  }
}

// ── Lightbox ───────────────────────────────────────────────────
function openLightbox(img) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  if (!lb || !lbImg) return;
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lb.classList.add('open');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'ArrowLeft')  navigate(-1);
});

// ── Flow tip (Panel 5 diagram) ─────────────────────────────────
function showFlowTip(node, text) {
  const tip = document.getElementById('flowTip');
  if (!tip) return;
  tip.style.display = 'block';
  tip.textContent = '💬 ' + text;
  // Reset all nodes
  document.querySelectorAll('.flow-node').forEach(n => n.style.fontWeight = '');
  node.style.fontWeight = '800';
}

// ── Quiz helpers ───────────────────────────────────────────────
function selectOpt(optEl, qid) {
  const group = document.querySelector(`.quiz-options[data-qid="${qid}"]`);
  if (!group) return;
  // If already checked (submitted), ignore
  if (group.dataset.submitted === '1') return;
  // Deselect all in group
  group.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  // Select clicked
  optEl.classList.add('selected');
  group.dataset.selected = optEl.dataset.val;

  // Update count label
  updateAnsweredCount(group.closest('[id]'));
}

function updateAnsweredCount(quizContainer) {
  if (!quizContainer) return;
  const id = quizContainer.id;
  if (id === 'inductionQuiz') {
    const answered = document.querySelectorAll('#inductionQuiz .quiz-options[data-selected]').length;
    const el = document.getElementById('inductionAnsweredCount');
    if (el) el.textContent = answered + ' / 5 soalan dijawab';
  } else if (id === 'finalQuiz') {
    const answered = document.querySelectorAll('#finalQuiz .quiz-options[data-selected]').length;
    const el = document.getElementById('finalAnsweredCount');
    if (el) el.textContent = answered + ' / 8 soalan dijawab';
  }
}

function revealAnswers(containerId, total) {
  let correct = 0;
  document.querySelectorAll(`#${containerId} .quiz-options`).forEach(group => {
    const qid = group.dataset.qid;
    const correctVal = group.dataset.correct;
    const selectedVal = group.dataset.selected;
    group.dataset.submitted = '1';

    group.querySelectorAll('.quiz-option').forEach(opt => {
      const val = opt.dataset.val;
      if (val === correctVal && val === selectedVal) {
        opt.classList.remove('selected');
        opt.classList.add('correct');
        correct++;
      } else if (val === selectedVal) {
        opt.classList.remove('selected');
        opt.classList.add('incorrect');
      } else if (val === correctVal) {
        opt.classList.add('reveal-correct');
      }
    });

    // Show feedback
    const fb = document.getElementById('fb-' + qid);
    if (fb) {
      fb.classList.add('show');
      fb.classList.add(document.querySelector(`#${containerId} .quiz-options[data-qid="${qid}"] .correct`) ? 'ok' : 'err');
    }
  });
  return correct;
}

// ── Induction Quiz ─────────────────────────────────────────────
function submitInductionQuiz() {
  const answered = document.querySelectorAll('#inductionQuiz .quiz-options[data-selected]').length;
  if (answered < 5) {
    alert('Sila jawab semua 5 soalan sebelum menyemak.');
    return;
  }

  const correct = revealAnswers('inductionQuiz', 5);

  const btn = document.getElementById('btnInductionSubmit');
  if (btn) btn.disabled = true;

  // Show score
  const scoreCard = document.getElementById('inductionScore');
  const ring = document.getElementById('inductionScoreRing');
  const msg  = document.getElementById('inductionScoreMsg');
  const sub  = document.getElementById('inductionScoreSub');

  if (ring) ring.textContent = correct + '/5';
  if (msg) {
    if (correct <= 1)      msg.textContent = 'Tiada masalah! Modul ini akan bantu anda dari awal. 💪';
    else if (correct <= 3) msg.textContent = 'Anda ada asas yang baik! Mari kukuhkan lagi. 👍';
    else                   msg.textContent = 'Terbaik! Anda hampir mahir. Guna modul sebagai rujukan. 🌟';
  }
  if (sub) sub.textContent = `Jawapan betul: ${correct} daripada 5 soalan`;

  if (scoreCard) scoreCard.classList.add('show');
  if (correct === 5) triggerConfetti();
}

// ── Final Quiz ─────────────────────────────────────────────────
function submitFinalQuiz() {
  const answered = document.querySelectorAll('#finalQuiz .quiz-options[data-selected]').length;
  if (answered < 8) {
    alert('Sila jawab semua 8 soalan sebelum menghantar.');
    return;
  }

  const correct = revealAnswers('finalQuiz', 8);

  const btn = document.getElementById('btnFinalSubmit');
  if (btn) btn.disabled = true;

  const scoreCard = document.getElementById('finalScore');
  const ring = document.getElementById('finalScoreRing');
  const msg  = document.getElementById('finalScoreMsg');
  const sub  = document.getElementById('finalScoreSub');

  if (ring) ring.textContent = correct + '/8';

  const pct = Math.round((correct / 8) * 100);
  if (msg) {
    if (pct < 50)      msg.textContent = 'Teruskan usaha! Ulang kaji modul ini sekali lagi. 📖';
    else if (pct < 75) msg.textContent = 'Baik! Anda faham asas proses import. Ulang kaji bahagian yang kurang jelas. 👍';
    else if (pct < 100) msg.textContent = 'Sangat baik! Anda bersedia menggunakan iFlick dengan yakin. 🌟';
    else               msg.textContent = 'Cemerlang! Anda telah menguasai sepenuhnya proses Import kursus. 🏆';
  }
  if (sub) sub.textContent = `Skor anda: ${correct}/8 (${pct}%)`;

  if (scoreCard) scoreCard.classList.add('show');
  if (correct >= 6) triggerConfetti();
}

// ── Drag & Drop ────────────────────────────────────────────────
let draggedItem = null;
let touchSelectedItem = null;
let touchSelectedActivity = null;

function initDragDrop() {
  setupDragActivity('activity1', 'pool1');
  setupDragActivity('activity2', 'pool2');
  setupDragActivity('activity3', 'pool3');
}

function setupDragActivity(activityId, poolId) {
  const activity = document.getElementById(activityId);
  if (!activity) return;

  activity.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', e => {
      draggedItem = item;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.dataset.id);
    });
    item.addEventListener('dragend', () => {
      if (draggedItem) draggedItem.classList.remove('dragging');
      draggedItem = null;
    });
  });

  activity.querySelectorAll('.drop-zone, .match-drop-zone').forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', e => {
      if (!zone.contains(e.relatedTarget)) {
        zone.classList.remove('drag-over');
      }
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (!draggedItem) return;
      dropItemToZone(draggedItem, zone, activityId, poolId);
    });
  });
}

function dropItemToZone(item, zone, activityId, poolId) {
  // If zone already has an item, send it back to pool
  const existing = zone.querySelector('.drag-item');
  if (existing) {
    const pool = document.getElementById(poolId);
    if (pool) pool.appendChild(existing);
    existing.style.margin = '';
  }

  // Remove from wherever it is
  if (item.parentNode) item.parentNode.removeChild(item);

  // Add to zone
  zone.appendChild(item);
  item.style.margin = '0';
  item.classList.remove('dragging', 'touch-selected', 'correct-placed', 'incorrect-placed');
  zone.classList.remove('correct-zone', 'incorrect-zone');
}

// Touch / click based selection for mobile
function handleItemClick(item, activityId) {
  const poolId = activityId.replace('activity', 'pool');

  if (touchSelectedItem === item && touchSelectedActivity === activityId) {
    item.classList.remove('touch-selected');
    touchSelectedItem = null;
    touchSelectedActivity = null;
    return;
  }

  if (touchSelectedItem) {
    touchSelectedItem.classList.remove('touch-selected');
  }

  touchSelectedItem = item;
  touchSelectedActivity = activityId;
  item.classList.add('touch-selected');
}

function handleZoneClick(zone, activityId) {
  if (!touchSelectedItem || touchSelectedActivity !== activityId) return;
  const poolId = activityId.replace('activity', 'pool');
  dropItemToZone(touchSelectedItem, zone, activityId, poolId);
  touchSelectedItem = null;
  touchSelectedActivity = null;
}

// ── Activity 1: Check answers ──────────────────────────────────
function checkActivity1() {
  const zones = document.querySelectorAll('#activity1 .drop-zone');
  let allFilled = true;
  zones.forEach(z => { if (!z.querySelector('.drag-item')) allFilled = false; });

  if (!allFilled) {
    alert('Sila lengkapkan semua kotak sebelum menyemak.');
    return;
  }

  let correct = 0;
  zones.forEach(zone => {
    const item = zone.querySelector('.drag-item');
    const expected = zone.dataset.answer;
    if (item && item.dataset.id === expected) {
      zone.classList.add('correct-zone');
      item.classList.add('correct-placed');
      correct++;
    } else {
      zone.classList.add('incorrect-zone');
      if (item) {
        item.classList.add('incorrect-placed');
        triggerShake(item);
      }
    }
  });

  const result = document.getElementById('act1Result');
  if (result) {
    result.classList.add('show');
    if (correct === 3) {
      result.textContent = '✅ Semua betul! Tahniah!';
      result.classList.remove('err');
      triggerConfetti();
    } else {
      result.textContent = `❌ ${correct} / 3 betul. Cuba semula!`;
      result.classList.add('err');
    }
  }
}

function resetActivity1() {
  const pool = document.getElementById('pool1');
  const zones = document.querySelectorAll('#activity1 .drop-zone');
  zones.forEach(zone => {
    const item = zone.querySelector('.drag-item');
    if (item && pool) {
      pool.appendChild(item);
    }
    zone.classList.remove('correct-zone', 'incorrect-zone', 'drag-over');
  });
  document.querySelectorAll('#activity1 .drag-item').forEach(item => {
    item.classList.remove('correct-placed', 'incorrect-placed', 'touch-selected');
    item.style.margin = '';
  });
  const result = document.getElementById('act1Result');
  if (result) { result.classList.remove('show', 'err'); result.textContent = ''; }
  touchSelectedItem = null;
  touchSelectedActivity = null;
}

// ── Activity 2: Check answers ──────────────────────────────────
function checkActivity2() {
  const zones = document.querySelectorAll('#activity2 .match-drop-zone');
  let allFilled = true;
  zones.forEach(z => { if (!z.querySelector('.drag-item')) allFilled = false; });

  if (!allFilled) {
    alert('Sila padankan semua 6 langkah sebelum menyemak.');
    return;
  }

  let correct = 0;
  zones.forEach(zone => {
    const item = zone.querySelector('.drag-item');
    const expected = zone.dataset.answer;
    if (item && item.dataset.id === expected) {
      zone.classList.add('correct-zone');
      item.classList.add('correct-placed');
      correct++;
    } else {
      zone.classList.add('incorrect-zone');
      if (item) {
        item.classList.add('incorrect-placed');
        triggerShake(item);
      }
    }
  });

  const result = document.getElementById('act2Result');
  if (result) {
    result.classList.add('show');
    if (correct === 6) {
      result.textContent = '✅ Sempurna! Semua 6 langkah betul!';
      result.classList.remove('err');
      triggerConfetti();
    } else {
      result.textContent = `❌ ${correct} / 6 betul. Cuba semula!`;
      result.classList.add('err');
    }
  }
}

function resetActivity2() {
  const pool = document.getElementById('pool2');
  const zones = document.querySelectorAll('#activity2 .match-drop-zone');
  zones.forEach(zone => {
    const item = zone.querySelector('.drag-item');
    if (item && pool) pool.appendChild(item);
    zone.classList.remove('correct-zone', 'incorrect-zone', 'drag-over');
  });
  document.querySelectorAll('#activity2 .drag-item').forEach(item => {
    item.classList.remove('correct-placed', 'incorrect-placed', 'touch-selected');
    item.style.margin = '';
  });
  const result = document.getElementById('act2Result');
  if (result) { result.classList.remove('show', 'err'); result.textContent = ''; }
  touchSelectedItem = null;
  touchSelectedActivity = null;
}

// ── Activity 3: Check answers ──────────────────────────────────
function checkActivity3() {
  const zones = document.querySelectorAll('#activity3 .drop-zone');
  let allFilled = true;
  zones.forEach(z => { if (!z.querySelector('.drag-item')) allFilled = false; });

  if (!allFilled) {
    alert('Sila lengkapkan semua kategori sebelum menyemak.');
    return;
  }

  let correct = 0;
  zones.forEach(zone => {
    const item = zone.querySelector('.drag-item');
    const expected = zone.dataset.answer;
    if (item && item.dataset.id === expected) {
      zone.classList.add('correct-zone');
      item.classList.add('correct-placed');
      correct++;
    } else {
      zone.classList.add('incorrect-zone');
      if (item) {
        item.classList.add('incorrect-placed');
        triggerShake(item);
      }
    }
  });

  const result = document.getElementById('act3Result');
  if (result) {
    result.classList.add('show');
    if (correct === 3) {
      result.textContent = '✅ Tepat sekali! Anda faham perbezaan Import, Backup dan Restore!';
      result.classList.remove('err');
      triggerConfetti();
    } else {
      result.textContent = `❌ ${correct} / 3 betul. Semak jadual di atas dan cuba lagi!`;
      result.classList.add('err');
    }
  }
}

function resetActivity3() {
  const pool = document.getElementById('pool3');
  const zones = document.querySelectorAll('#activity3 .drop-zone');
  zones.forEach(zone => {
    const item = zone.querySelector('.drag-item');
    if (item && pool) pool.appendChild(item);
    zone.classList.remove('correct-zone', 'incorrect-zone', 'drag-over');
  });
  document.querySelectorAll('#activity3 .drag-item').forEach(item => {
    item.classList.remove('correct-placed', 'incorrect-placed', 'touch-selected');
    item.style.margin = '';
  });
  const result = document.getElementById('act3Result');
  if (result) { result.classList.remove('show', 'err'); result.textContent = ''; }
  touchSelectedItem = null;
  touchSelectedActivity = null;
}

// ── Shake animation helper ─────────────────────────────────────
function triggerShake(el) {
  el.classList.remove('shake');
  void el.offsetWidth; // reflow to restart animation
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);
}

// ── Confetti ───────────────────────────────────────────────────
function triggerConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  container.innerHTML = '';

  const colors = ['#4A90E2', '#27AE60', '#F39C12', '#7B2FBE', '#E74C3C', '#00BCD4', '#FF6B6B', '#FFD93D'];
  const shapes = ['4px', '50%', '0'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    const size = 6 + Math.random() * 9;
    const tx = (Math.random() - 0.5) * 160;
    const delay = Math.random() * 0.6;
    const dur = 0.9 + Math.random() * 0.8;

    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${10 + Math.random() * 80}%;
      top: -15px;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${shapes[Math.floor(Math.random() * shapes.length)]};
      --tx: ${tx}px;
      animation-delay: ${delay}s;
      animation-duration: ${dur}s;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => { container.innerHTML = ''; }, 2500);
}

// ── Restart ────────────────────────────────────────────────────
function restartSIM() {
  visited.clear();
  // Reset quizzes
  document.querySelectorAll('.quiz-options').forEach(group => {
    delete group.dataset.selected;
    delete group.dataset.submitted;
    group.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.remove('selected', 'correct', 'incorrect', 'reveal-correct');
    });
  });
  document.querySelectorAll('.quiz-feedback').forEach(fb => {
    fb.classList.remove('show', 'ok', 'err');
  });
  document.querySelectorAll('.score-card').forEach(sc => sc.classList.remove('show'));
  document.getElementById('btnInductionSubmit').disabled = false;
  document.getElementById('btnFinalSubmit').disabled = false;

  // Reset activities
  resetActivity1();
  resetActivity2();

  // Clear localStorage
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}

  // Reset accordion — collapse all except section 0
  document.querySelectorAll('.nav-section').forEach(sec => {
    const idx = parseInt(sec.dataset.section);
    const body = sec.querySelector('.acc-body');
    const title = sec.querySelector('.acc-toggle');
    if (idx !== 0) {
      body && body.classList.add('collapsed');
      title && title.classList.add('collapsed');
    } else {
      body && body.classList.remove('collapsed');
      title && title.classList.remove('collapsed');
    }
  });

  goToPanel(0);
}
