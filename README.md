# ⚔ Math Clash Wars — Guerra do Conhecimento

> Jogo de estratégia em turnos inspirado no Clash Royale, onde cada ação requer responder um desafio de matemática (Binários e Plano Cartesiano) antes de executar.



## 📋 Índice

- [Visão Geral](#visão-geral)
- [Demonstração](#demonstração)
- [Como Jogar](#como-jogar)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Sistemas do Jogo](#sistemas-do-jogo)
- [Banco de Questões](#banco-de-questões)
- [Personagens](#personagens)
- [Referências e Links](#referências-e-links)
- [Licença](#licença)



## 🎮 Visão Geral

**Math Clash Wars** é um jogo educativo de batalha em turnos desenvolvido 100% com tecnologias nativas da Web (HTML5, CSS3 e JavaScript Vanilla), sem qualquer dependência de framework externo. O conceito central é simples e poderoso: **para executar qualquer ação de batalha, o jogador precisa primeiro acertar uma questão matemática**.

### Objetivos Educacionais

| Área | Conteúdo |
|------|----------|
| Sistemas Binários | Conversão decimal↔binário, operações AND/OR/NOT/XOR, potências de 2 |
| Plano Cartesiano | Quadrantes, eixos, distância entre pontos, ponto médio, simetria |



## 🕹️ Como Jogar

1. **Tela de Introdução** — Clique em "Entrar na Batalha"
2. **Fase do Quiz** — Uma questão aparece com timer de 15 segundos
   - ✅ Acertou → Você escolhe sua ação (Atacar / Defender / Especial)
   - ❌ Errou → O inimigo ataca automaticamente
   - ⏰ Timer zerou → O inimigo ataca automaticamente
3. **Fase de Ação** — Selecione um personagem e execute a ação
4. **Sistema de Ondas** — A cada 8 questões, uma nova onda de inimigos mais fortes chega
5. **Vitória** → Destrua o castelo inimigo | **Derrota** → Seu castelo foi destruído

### Controles

| Elemento | Ação |
|----------|------|
| Botões A / B / C / D | Responder o quiz |
| Cards de personagem | Selecionar guerreiro |
| ⚔ ATACAR | Ataque físico no alvo atual |
| 🛡 DEFENDER | Ativa escudo + recupera HP |
| ✨ ESPECIAL | Habilidade especial do personagem |



## 🛠️ Tecnologias Utilizadas

### Linguagens Nativas (Zero Dependências Externas de Runtime)

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **HTML5** | Living Standard | Estrutura semântica, Canvas API |
| **CSS3** | Living Standard | Animações, variáveis CSS, Grid, Flexbox |
| **JavaScript ES6+** | ECMAScript 2020 | Lógica do jogo, DOM, Canvas 2D |

### APIs Web Utilizadas

| API | Finalidade | MDN Reference |
|-----|-----------|---------------|
| `Canvas API` | Partículas de fundo animadas | [MDN Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
| `requestAnimationFrame` | Loop de animação suave (60fps) | [MDN rAF](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) |
| `setInterval / clearInterval` | Timer countdown de questões | [MDN setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) |
| `setTimeout` | Delays entre ações de batalha | [MDN setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) |
| `CSS Custom Properties` | Sistema de temas/cores | [MDN CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) |
| `CSS Grid` | Layout da arena e personagens | [MDN Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) |
| `CSS Flexbox` | Layouts de linha | [MDN Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) |
| `CSS Animations / @keyframes` | Todos os efeitos visuais | [MDN Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations) |
| `CSS backdrop-filter` | Efeito de blur nos painéis | [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) |
| `SVG` | Castelos desenhados vetorialmente | [MDN SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) |

### Fontes Externas (via Google Fonts CDN)

| Fonte | Peso | Uso | Link |
|-------|------|-----|------|
| **Orbitron** | 700, 900 | Títulos, timer, HUD | [Google Fonts](https://fonts.google.com/specimen/Orbitron) |
| **Exo 2** | 300, 400, 700, 900 | Corpo do texto, botões | [Google Fonts](https://fonts.google.com/specimen/Exo+2) |

```html
<!-- Import no <head> -->
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;700;900&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
```

> ⚠️ As fontes são o **único recurso externo** carregado. O jogo funciona offline se as fontes estiverem em cache, usando fallback para `monospace` e `sans-serif`.



## 🏗️ Arquitetura do Projeto

```
math_clash_wars/
│
├── index.html          ← Arquivo único (self-contained)
│   ├── <head>
│   │   └── <style>    ← Todo o CSS (≈ 350 linhas)
│   ├── <body>
│   │   ├── <canvas>   ← Background de partículas
│   │   ├── .intro     ← Tela de abertura
│   │   ├── .gameover  ← Tela de fim de jogo
│   │   ├── #root      ← Interface principal do jogo
│   │   └── <script>   ← Toda a lógica JS (≈ 250 linhas)
│   └── ...
│
└── README.md           ← Este arquivo
```

### Padrão Arquitetural

O jogo utiliza o padrão **State Machine** (Máquina de Estados) com um objeto global `G` que centraliza todo o estado do jogo:

```javascript
// Estado global do jogo
let G = {
  // Meta
  wave: 1, score: 0, combo: 0, maxCombo: 0,
  totalQ: 0, correctQ: 0,

  // Fase atual: 'quiz' | 'action'
  phase: 'quiz',

  // Recursos
  mana: 5, maxMana: 10,
  sel: 0,          // personagem selecionado

  // HP dos castelos
  pHP: 500, pMax: 500,   // player
  eHP: 500, eMax: 500,   // enemy

  // Mecânicas
  defB: 0,         // bônus de defesa ativo
  timer: 15,       // contagem regressiva
  answered: false, // questão já respondida?
  used: [],        // índices de questões já usadas
  cd: [0, 0, 0],  // cooldowns dos personagens
};
```

---

## 📁 Estrutura de Arquivos

```
math_clash_v2.html      ← Arquivo único completo (874 linhas)
README.md               ← Documentação completa
```

O projeto é **single-file** por design: facilita distribuição, executa em qualquer browser sem servidor, e não requer build step.

---

## ⚙️ Sistemas do Jogo

### 1. Sistema de Fases (State Machine)

```
[INTRO] → [QUIZ] ←→ [ACTION] → [GAME OVER]
               ↘ (errou/timer) → [ENEMY ATTACK] → [QUIZ]
```

| Fase | Trigger de Entrada | O que acontece |
|------|-------------------|----------------|
| `quiz` | Início do turno | Questão carregada, timer iniciado |
| `action` | Acertou a questão | Botões de ação desbloqueados |
| `enemy_attack` | Errou / timer zerou | Inimigo inflige dano automaticamente |

### 2. Sistema de Timer

```javascript
// Timer com SVG circular (stroke-dashoffset)
// Circumferência do círculo r=20: 2π × 20 ≈ 126px
ring.style.strokeDashoffset = 126 * (1 - G.timer / 15);
```

- Duração: **15 segundos** por questão
- Cor muda: Dourado → Laranja (≤7s) → Vermelho (≤3s)
- Ao zerar: inimigo ataca automaticamente

### 3. Sistema de Combo

```javascript
// Multiplicador de pontos
const bonusPts = Math.floor(questao.pts * (1 + G.combo * 0.12));
```

| Combo | Bônus de Pts | Visual |
|-------|-------------|--------|
| 1x | +0% | Nenhum |
| 2x | +12% | "2x COMBO!" |
| 3x | +24% | "⚡ COMBO x3!" |
| 5x+ | +48%+ | "🔥 COMBO x5!" |

### 4. Sistema de Ondas

```javascript
// A cada 8 questões respondidas → nova onda
if (G.totalQ % 8 === 0) {
  G.wave++;
  G.eMax = 500 + G.wave * 80;  // inimigo fica mais forte
  G.eHP = G.eMax;               // HP totalmente restaurado
}
```

### 5. Sistema de Elixir (Mana)

| Evento | Variação |
|--------|----------|
| Início do jogo | 5 💎 |
| A cada questão (win/loss) | +1 💎 |
| Acertar questão (bônus) | +2 💎 |
| Usar Espadachim | -3 💎 |
| Usar Arquimago | -5 💎 |
| Usar Paladino | -4 💎 |

### 6. Sistema de Cooldown

```javascript
// Cooldown individual por personagem
function setCD(idx, sec) {
  G.cd[idx] = sec;
  const iv = setInterval(() => {
    G.cd[idx]--;
    if (G.cd[idx] <= 0) clearInterval(iv);
  }, 1000);
}
```

| Ação | Cooldown |
|------|---------|
| Atacar | 1 segundo |
| Defender | 2 segundos |
| Especial | 3 segundos |

### 7. Sistema de Partículas (Canvas 2D)

```javascript
// 55 partículas com movimento browniano + grid sutil
pts.push({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 1.1 + 0.3,     // raio 0.3–1.4px
  vx: (Math.random() - .5) * 0.25,  // velocidade x
  vy: (Math.random() - .5) * 0.25,  // velocidade y
  a: Math.random() * Math.PI * 2    // fase de oscilação
});
```



## 📚 Banco de Questões

Total: **30 questões** (15 Binário + 15 Cartesiano)

### Distribuição por Dificuldade

| Pontos | Nível | Exemplos |
|--------|-------|---------|
| 15 pts | Fácil | AND/OR, eixo das abscissas |
| 20 pts | Médio | Conversão binária, quadrantes |
| 25 pts | Médio-Difícil | Soma binária, distância entre pontos |
| 30 pts | Difícil | XOR, 11000000₂, simetria em relação à origem |

### Questões de Binário

1. Decimal de 1010₂ → 10
2. 13 em binário → 1101
3. 0101 + 0011 → 1000
4. Bits para representar 15 → 4 bits
5. 1111₂ em decimal → 15
6. 1 AND 0 → 0
7. 1 OR 0 → 1
8. 255 em binário → 11111111
9. 100₂ em decimal → 4
10. NOT 1 → 0
11. 1010 XOR 1100 → 0110
12. 2⁸ em decimal → 256
13. 8 em binário → 1000
14. 0000 + 0001 → 0001
15. 11000000₂ em decimal → 192

### Questões de Plano Cartesiano

1. x<0 e y>0 → 2º quadrante
2. (-3,-5) → 3º quadrante
3. Distância (0,0)→(3,4) → 5
4. (0,7) → Eixo Y
5. Simétrico (2,-3) / Eixo X → (2,3)
6. Eixo das abscissas → Eixo X
7. Distância (1,1)→(4,5) → 5
8. (5,0) → Eixo X
9. x>0 e y<0 → 4º quadrante
10. Ponto médio (0,0)↔(4,6) → (2,3)
11. (7,-2) → 4º quadrante
12. Origem (0,0) → Nenhum quadrante
13. Simétrico (-4,3) / origem → (4,-3)
14. Distância (-1,-1)→(2,3) → 5
15. (-5,2) → 2º quadrante



## 🧙 Personagens

### 🗡️ Espadachim

| Atributo | Valor |
|---------|-------|
| Custo | 3 💎 |
| Ataque | 80 + rand(0–25) |
| Defesa | 30 |
| Especial | Golpe Duplo (×1.8) |
| Cooldown | 1s / 2s / 3s |
| Estratégia | Spam constante, custo-benefício |

### 🧙‍♂️ Arquimago

| Atributo | Valor |
|---------|-------|
| Custo | 5 💎 |
| Ataque | 130 + rand(0–25) |
| Defesa | 10 |
| Especial | Bola de Fogo (×2.2) |
| Cooldown | 1s / 2s / 3s |
| Estratégia | Glass cannon, máximo dano |

### 🛡️ Paladino

| Atributo | Valor |
|---------|-------|
| Custo | 4 💎 |
| Ataque | 50 + rand(0–25) |
| Defesa | 90 |
| Especial | Muralha Divina (×1.5) |
| Cooldown | 1s / 2s / 3s |
| Estratégia | Tank, recuperação de HP |



## 🔗 Referências e Links

### MDN Web Docs (Documentação Oficial)

| Recurso | URL |
|---------|-----|
| HTML5 | https://developer.mozilla.org/en-US/docs/Web/HTML |
| CSS3 | https://developer.mozilla.org/en-US/docs/Web/CSS |
| JavaScript | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| Canvas API | https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API |
| CSS Animations | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations |
| CSS Grid | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout |
| CSS Flexbox | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout |
| SVG | https://developer.mozilla.org/en-US/docs/Web/SVG |
| requestAnimationFrame | https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame |
| backdrop-filter | https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter |
| CSS Custom Properties | https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties |

### Google Fonts

| Fonte | URL |
|-------|-----|
| Orbitron | https://fonts.google.com/specimen/Orbitron |
| Exo 2 | https://fonts.google.com/specimen/Exo+2 |
| Google Fonts CDN | https://fonts.google.com |

### Especificações W3C

| Spec | URL |
|------|-----|
| HTML Living Standard | https://html.spec.whatwg.org/ |
| CSS Animations Level 1 | https://www.w3.org/TR/css-animations-1/ |
| CSS Grid Layout | https://www.w3.org/TR/css-grid-1/ |
| SVG 2.0 | https://www.w3.org/TR/SVG2/ |
| ECMAScript 2020 | https://tc39.es/ecma262/ |

### Inspiração de Design

| Referência | Conceito |
|------------|---------|
| Clash Royale (Supercell) | Mecânica de cartas e batalha de castelos |
| Duolingo | Gamificação de aprendizado com feedback imediato |
| Material Design 3 | Princípios de feedback visual e animação |

### Ferramentas de Desenvolvimento

| Ferramenta | URL | Uso |
|------------|-----|-----|
| VS Code | https://code.visualstudio.com | Editor recomendado |
| Chrome DevTools | https://developer.chrome.com/docs/devtools | Debug e performance |
| Can I Use | https://caniuse.com | Compatibilidade CSS/JS |
| CSS Tricks | https://css-tricks.com | Referência de técnicas CSS |



## 🧪 Compatibilidade

| Browser | Versão Mínima | Status |
|---------|--------------|--------|
| Chrome | 90+ | ✅ Suportado |
| Firefox | 88+ | ✅ Suportado |
| Safari | 14+ | ✅ Suportado |
| Edge | 90+ | ✅ Suportado |
| Opera | 76+ | ✅ Suportado |

> `backdrop-filter` requer Chrome 76+, Firefox 103+, Safari 9+



## 📊 Métricas do Projeto

| Métrica | Valor |
|---------|-------|
| Linhas de código | ~874 |
| Linhas de CSS | ~350 |
| Linhas de JS | ~250 |
| Questões no banco | 30 |
| Personagens | 3 |
| Dependências runtime | 0 |
| Dependências de fonte | 2 (Google Fonts) |
| Tamanho do arquivo | ~42 KB |
| Tempo de carregamento | < 1s (excl. fontes) |



## 📄 Licença

Este projeto foi criado para fins educacionais. Sinta-se livre para usar, modificar e distribuir com atribuição.



*Criado com ⚔ e 🧠 — Math Clash Wars v2.0*
