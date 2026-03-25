# ⚔ Math Clash Royale

Jogo educativo estilo tower defense onde você responde questões de matemática para atacar o castelo inimigo.

## 🎮 Como jogar

1. **Fase do Quiz** — Responda a questão de matemática corretamente.
   - ✅ Acertou → ganhe o turno de ação e +10 de pontuação.
   - ❌ Errou → o inimigo ataca automaticamente.

2. **Fase de Ação** — Escolha um guerreiro e execute uma ação:
   - ⚔ **Atacar** — causa dano progressivo nas torres e no castelo inimigo.
   - 🛡 **Defender** — reduz o dano do próximo ataque inimigo.
   - ✨ **Especial** — ataque poderoso direto no castelo inimigo.

3. Destrua o **Castelo Sombrio** antes que o inimigo destrua o seu!

## 📚 Conteúdo das questões

| Tipo | Tópicos |
|------|---------|
| 🟣 Binário | Conversão decimal ↔ binário, operações AND / OR / NOT, representação de bits |
| 🔵 Cartesiano | Quadrantes, eixos, distância entre pontos, ponto médio, simetria |

## 🧙 Guerreiros disponíveis

| Personagem | Custo | ATQ | DEF | Especial |
|------------|-------|-----|-----|----------|
| 🗡️ Espadachim | 3 | 80 | 30 | Golpe Duplo |
| 🧙 Arquimago  | 5 | 130 | 10 | Bola de Fogo |
| 🛡️ Paladino   | 4 | 50  | 90 | Escudo Sagrado |

## 🗂 Estrutura do projeto

```
math-clash-royale/
├── index.html        # Estrutura da página (HTML)
├── css/
│   └── style.css     # Estilos e animações
├── js/
│   ├── data.js       # Personagens e banco de questões
│   └── game.js       # Lógica principal do jogo
└── README.md
```

## 🛠 Tecnologias

- HTML5 semântico
- CSS3 com variáveis, animações e grid layout
- JavaScript vanilla (sem dependências externas)
- Google Fonts: [Cinzel](https://fonts.google.com/specimen/Cinzel) + [Rajdhani](https://fonts.google.com/specimen/Rajdhani)

