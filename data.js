/* ============================================================ 
   data.js — Personagens e banco de questões
   ============================================================ */   
    
const CHARS = [   
  { name: 'Espadachim', emoji: '🗡️', atk: 80,  def: 30, cost: 3, special: 'Golpe Duplo'    }, 
  { name: 'Arquimago',  emoji: '🧙', atk: 130, def: 10, cost: 5, special: 'Bola de Fogo'   }, 
  { name: 'Paladino',   emoji: '🛡️', atk: 50,  def: 90, cost: 4, special: 'Escudo Sagrado' }, 
];
  
const quizBank = [
  /* ── Binário ── */ 
  { type:'binary', q:'Qual é o valor decimal de 1010 em binário?',              opts:['8','10','12','6'],                                     answer:1 },
  { type:'binary', q:'Converta 13 para binário:',                               opts:['1011','1100','1101','1110'],                           answer:2 },
  { type:'binary', q:'Qual é o resultado de 0101 + 0011 em binário?',           opts:['1000','0111','1001','1010'],                           answer:0 },
  { type:'binary', q:'Quantos bits são necessários para representar o número 15?', opts:['3','4','5','8'],                                    answer:1 },
  { type:'binary', q:'O que é 1111 em decimal?',                                opts:['14','15','16','13'],                                   answer:1 },
  { type:'binary', q:'Qual operação binária: 1 AND 0 =?',                       opts:['1','0','2','Erro'],                                    answer:1 }, 
  { type:'binary', q:'Qual operação binária: 1 OR 0 =?',                        opts:['0','1','2','Erro'],                                    answer:1 },
  { type:'binary', q:'Converta 255 para binário:',                              opts:['11111111','11111110','11111100','11110000'],            answer:0 },
  { type:'binary', q:'O número binário 100 representa:',                        opts:['2','3','4','5'],                                       answer:2 },
  { type:'binary', q:'Qual o resultado de NOT 1 em binário?',                   opts:['1','0','2','-1'],                                      answer:1 },

  /* ── Cartesiano ── */
  { type:'cartesian', q:'Qual quadrante tem x negativo e y positivo?',          opts:['1º','2º','3º','4º'],                                   answer:1 },
  { type:'cartesian', q:'O ponto (-3, -5) está no:',                            opts:['1º quadrante','2º quadrante','3º quadrante','4º quadrante'], answer:2 },
  { type:'cartesian', q:'Qual a distância de (0,0) ao ponto (3,4)?',            opts:['5','7','6','4'],                                       answer:0 },
  { type:'cartesian', q:'O ponto (0, 7) está em qual eixo?',                    opts:['Eixo X','Eixo Y','Origem','3º quadrante'],              answer:1 },
  { type:'cartesian', q:'Qual o ponto simétrico de (2, -3) em relação ao eixo X?', opts:['(-2,-3)','(2,3)','(-2,3)','(3,-2)'],               answer:1 },
  { type:'cartesian', q:'No plano cartesiano, o eixo das abscissas é o eixo:',  opts:['Y','Z','X','W'],                                       answer:2 },
  { type:'cartesian', q:'Qual a distância entre (1,1) e (4,5)?',                opts:['3','4','5','6'],                                       answer:2 },
  { type:'cartesian', q:'O ponto (5, 0) está no:',                              opts:['Eixo Y','Eixo X','1º quadrante','Origem'],              answer:1 },
  { type:'cartesian', q:'Qual quadrante: x > 0 e y < 0?',                       opts:['1º','2º','3º','4º'],                                   answer:3 },
  { type:'cartesian', q:'Ponto médio entre (0,0) e (4,6)?',                     opts:['(2,3)','(4,3)','(2,6)','(1,2)'],                       answer:0 },
];
