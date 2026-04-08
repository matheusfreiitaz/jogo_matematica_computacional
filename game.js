/* ============================================================
   game.js — Lógica principal do Math Clash Royale
   ============================================================ */

/* ── Estado global ── */

let state = {};
let usedQuestions = [];   
let currentQuiz   = null; 
let quizAnswered  = false; 
 
/* ── Inicialização ── */ 

function initState() {
  state = {
    score: 0, round: 1, mana: 5, maxMana: 10,
    quizPhase: true, quizPassed: false,
    selectedChar: null, pendingAction: null,
    quizCount: 0, defenseBonus: 0,
    enemy:  { castle: 500, t1: 200, t2: 200 },
    player: { castle: 500, t1: 200, t2: 200 },
  };
}

/* ── Seleção de questão aleatória sem repetição ── */

function getNextQuiz() {
  if (usedQuestions.length >= quizBank.length) usedQuestions = [];
  const remaining = quizBank.filter((_, i) => !usedQuestions.includes(i));
  const idx       = Math.floor(Math.random() * remaining.length);
  const realIdx   = quizBank.indexOf(remaining[idx]);
  usedQuestions.push(realIdx);
  return { ...quizBank[realIdx], idx: realIdx };
}

/* ── Renderização ── */

function renderHP() {
  const setHP = (fillId, textId, cur, max) => {
    cur = Math.max(0, cur);
    const el = document.getElementById(fillId);
    const tx = document.getElementById(textId);
    if (el) el.style.width = (cur / max * 100) + '%';
    if (tx) tx.textContent = cur + '/' + max;
  };
  setHP('enemy-castle-hp',  'enemy-castle-text', state.enemy.castle,  500);
  setHP('etow1-hp',          'etow1-text',        state.enemy.t1,      200);
  setHP('etow2-hp',          'etow2-text',        state.enemy.t2,      200);
  setHP('player-castle-hp', 'player-castle-text', state.player.castle, 500);
  setHP('ptow1-hp',          'ptow1-text',        state.player.t1,     200);
  setHP('ptow2-hp',          'ptow2-text',        state.player.t2,     200);
}

function renderMana() {
  document.getElementById('mana-fill').style.width = (state.mana / state.maxMana * 100) + '%';
  document.getElementById('mana-val').textContent  = state.mana + '/' + state.maxMana;
}

function renderScore() {
  document.getElementById('score-display').textContent = 'Pontuação: ' + state.score;
  document.getElementById('round-display').textContent = 'Rodada ' + state.round;
}

/* ── Log de batalha ── */

function addLog(msg, type = 'info') {
  const log = document.getElementById('battle-log');
  const div = document.createElement('div');
  div.className = 'log-entry ' + type;
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  if (log.children.length > 20) log.removeChild(log.children[0]);
}

/* ── Quiz ── */

function loadQuiz() {
  quizAnswered = false;
  currentQuiz  = getNextQuiz();
  state.quizCount++;

  const badge   = document.getElementById('quiz-badge');
  const q       = document.getElementById('quiz-question');
  const opts    = document.getElementById('quiz-options');
  const counter = document.getElementById('quiz-counter');

  badge.textContent  = currentQuiz.type === 'binary' ? 'BINÁRIO' : 'CARTESIANO';
  badge.className    = 'quiz-type-badge ' + (currentQuiz.type === 'binary' ? 'badge-binary' : 'badge-cartesian');
  q.textContent      = currentQuiz.q;
  counter.textContent = 'Questão ' + state.quizCount;

  opts.innerHTML = '';
  currentQuiz.opts.forEach((opt, i) => {
    const btn     = document.createElement('button');
    btn.className = 'quiz-btn';
    btn.textContent = opt;
    btn.onclick   = () => answerQuiz(i, btn);
    opts.appendChild(btn);
  });

  setPhase('quiz');
}

function answerQuiz(choice, btn) {
  if (quizAnswered) return;
  quizAnswered = true;

  const allBtns = document.querySelectorAll('.quiz-btn');
  allBtns.forEach(b => b.disabled = true);

  if (choice === currentQuiz.answer) {
    btn.classList.add('correct');
    state.quizPassed = true;
    state.score += 10;
    addLog('✅ Correto! +10 pts. Agora escolha uma ação!', 'good');
    state.mana = Math.min(state.maxMana, state.mana + 1);
    renderMana();
    enableActions();
    setPhase('action');
  } else {
    btn.classList.add('wrong');
    allBtns[currentQuiz.answer].classList.add('correct');
    state.quizPassed = false;
    addLog('❌ Errou! O inimigo vai atacar!', 'bad');
    setTimeout(() => enemyAttack(), 800);
  }

  renderScore();
}

/* ── Fases ── */

function setPhase(phase) {
  const badge = document.getElementById('phase-badge');
  if (phase === 'quiz') {
    badge.textContent = '📚 FASE DO QUIZ — RESPONDA PARA AGIR';
    badge.className   = 'phase-badge phase-quiz';
    disableActions();
  } else {
    badge.textContent = '⚔ FASE DE AÇÃO — ESCOLHA E EXECUTE!';
    badge.className   = 'phase-badge phase-action';
  }
  state.quizPhase = (phase === 'quiz');
}

function enableActions() {
  ['btn-attack','btn-defend','btn-special'].forEach(id => {
    document.getElementById(id).disabled = false;
  });
}

function disableActions() {
  ['btn-attack','btn-defend','btn-special'].forEach(id => {
    document.getElementById(id).disabled = true;
  });
}

/* ── Seleção de personagem ── */

function selectChar(idx) {
  if (state.quizPhase) return;
  state.selectedChar = idx;
  document.querySelectorAll('.char-card').forEach((c, i) => {
    c.classList.toggle('selected', i === idx);
  });
}

/* ── Ações do jogador ── */

function doAction(action) {
  if (state.quizPhase) return;
  const char = state.selectedChar !== null ? CHARS[state.selectedChar] : CHARS[0];
  const cost = char.cost;

  if (state.mana < cost) {
    addLog('⚡ Sem elixir suficiente! Precisa de ' + cost, 'bad');
    return;
  }

  state.mana -= cost;
  renderMana();

  if (action === 'attack') {
    const dmg = char.atk + Math.floor(Math.random() * 20);
    if (state.enemy.t1 > 0) {
      state.enemy.t1 = Math.max(0, state.enemy.t1 - dmg);
      addLog('⚔ ' + char.emoji + ' ' + char.name + ' atacou a Torre 1 inimiga! -' + dmg + ' HP', 'good');
    } else if (state.enemy.t2 > 0) {
      state.enemy.t2 = Math.max(0, state.enemy.t2 - dmg);
      addLog('⚔ ' + char.emoji + ' ' + char.name + ' atacou a Torre 2 inimiga! -' + dmg + ' HP', 'good');
    } else {
      state.enemy.castle = Math.max(0, state.enemy.castle - dmg);
      addLog('⚔ ' + char.emoji + ' ' + char.name + ' atacou o Castelo inimigo! -' + dmg + ' HP', 'good');
    }
  } else if (action === 'defend') {
    state.defenseBonus = char.def;
    addLog('🛡 ' + char.emoji + ' ' + char.name + ' entrou em posição defensiva! +' + char.def + ' DEF', 'info');
  } else if (action === 'special') {
    const bonus = Math.floor(char.atk * 1.6);
    if (state.enemy.castle > 0) {
      state.enemy.castle = Math.max(0, state.enemy.castle - bonus);
      addLog('✨ ' + char.name + ' usou ' + char.special + '! -' + bonus + ' HP no castelo!', 'good');
    }
  }

  renderHP();
  checkWin();

  if (!checkWin()) {
    setTimeout(() => { enemyAttack(); }, 600);
  }
}

/* ── Ataque do inimigo ── */

function enemyAttack() {
  const dmg    = 30 + Math.floor(Math.random() * 40) - Math.floor(state.defenseBonus * 0.5);
  const actual = Math.max(5, dmg);
  state.defenseBonus = 0;

  const enemies  = ['👹 Goblin', '💀 Esqueleto', '🐉 Dragão'];
  const attacker = enemies[Math.floor(Math.random() * enemies.length)];

  if (state.player.t1 > 0) {
    state.player.t1 = Math.max(0, state.player.t1 - actual);
    addLog(attacker + ' atacou sua Torre 1! -' + actual + ' HP', 'bad');
  } else if (state.player.t2 > 0) {
    state.player.t2 = Math.max(0, state.player.t2 - actual);
    addLog(attacker + ' atacou sua Torre 2! -' + actual + ' HP', 'bad');
  } else {
    state.player.castle = Math.max(0, state.player.castle - actual);
    addLog(attacker + ' atacou seu Castelo! -' + actual + ' HP', 'bad');
  }

  renderHP();
  checkLose();

  if (!checkLose()) {
    state.round++;
    state.mana = Math.min(state.maxMana, state.mana + 1);
    renderMana();
    renderScore();
    setTimeout(() => loadQuiz(), 700);
  }
}

/* ── Verificação de vitória/derrota ── */

function checkWin() {
  if (state.enemy.castle <= 0) { showGameOver(true);  return true; }
  return false;
}

function checkLose() {
  if (state.player.castle <= 0) { showGameOver(false); return true; }
  return false;
}

/* ── Game Over ── */

function showGameOver(win) {
  const screen = document.getElementById('game-over');
  const title  = document.getElementById('go-title');
  const stats  = document.getElementById('go-stats');
  screen.style.display = 'flex';
  if (win) {
    title.textContent = '🏆 VITÓRIA!';
    title.className   = 'game-over-title win-title';
  } else {
    title.textContent = '💀 DERROTA!';
    title.className   = 'game-over-title lose-title';
  }
  stats.innerHTML = `Pontuação Final: <b>${state.score} pts</b><br>Rodadas jogadas: ${state.round}<br>Questões respondidas: ${state.quizCount}`;
}

function restartGame() {
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('battle-log').innerHTML    = '';
  usedQuestions = [];
  initState();
  renderHP();
  renderMana();
  renderScore();
  addLog('⚔ Nova batalha iniciada! Responda para atacar!', 'info');
  document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
  loadQuiz();
}

/* ── Bootstrap ── */

initState();
renderHP();
renderMana();
renderScore();
loadQuiz();
