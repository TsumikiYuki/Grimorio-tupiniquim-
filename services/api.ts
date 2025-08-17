import { Homebrew, User, Category, Comment, Rating } from '../types';

let mockUsers: User[] = [
  { id: 'user-1', username: 'Mestre Ancião', avatarUrl: 'https://picsum.photos/seed/user1/100', bio: 'Criador de mundos e narrador de grandes épicos.' },
  { id: 'user-2', username: 'Elfa Artífice', avatarUrl: 'https://picsum.photos/seed/user2/100', bio: 'Forjando itens mágicos e novas raças para o multiverso.' },
];

let mockHomebrews: Homebrew[] = [
  {
    id: 'hb-1',
    title: 'Capoeirista - Nova Classe de Monge',
    authorId: 'user-1',
    authorUsername: 'Mestre Ancião',
    authorAvatarUrl: 'https://picsum.photos/seed/user1/100',
    category: Category.CLASSE,
    content: `
### Tradição Monástica: O Caminho da Ginga

Monges do Caminho da Ginga transformam a dança em uma arte marcial letal. Eles fluem pelo campo de batalha com uma graça hipnótica, seus movimentos imprevisíveis e seus ataques, uma mistura de precisão e ritmo.

#### Ritmo de Batalha
A partir do 3º nível, você aprende a entrar em um estado de fluxo rítmico. Como uma ação bônus, você pode gastar 1 ponto de Ki para ganhar os seguintes benefícios por 1 minuto:
- Sua movimentação não provoca ataques de oportunidade.
- Você pode adicionar seu modificador de Sabedoria ao seu CA.
- Seus ataques desarmados podem derrubar um alvo (teste de resistência de Destreza) ou empurrá-lo 10 pés para longe de você.

#### Rasteira
No 6º nível, quando uma criatura errar um ataque corpo a corpo contra você, você pode usar sua reação para fazer um ataque desarmado contra ela. Se acertar, a criatura é derrubada.`,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    rating: { score: 4.8, count: 25 },
    comments: [
      { id: 'c-1-1', authorId: 'user-2', authorUsername: 'Elfa Artífice', authorAvatarUrl: 'https://picsum.photos/seed/user2/100', content: 'Adorei a ideia! Super criativo e bem brasileiro!', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ],
  },
  {
    id: 'hb-2',
    title: 'Curupira - Nova Raça Feérica',
    authorId: 'user-2',
    authorUsername: 'Elfa Artífice',
    authorAvatarUrl: 'https://picsum.photos/seed/user2/100',
    category: Category.RACA,
    content: `
### Traços Raciais do Curupira

**Aumento no Valor de Habilidade.** Seu valor de Destreza aumenta em 2 e sua Sabedoria aumenta em 1.
**Idade.** Curupiras amadurecem na mesma proporção que humanos, mas são considerados protetores da floresta desde jovens.
**Tendência.** Geralmente caóticos e bons, os Curupiras são espíritos livres que protegem a natureza a todo custo.
**Tamanho.** Curupiras são Pequenos.
**Deslocamento.** Seu deslocamento base de caminhada é de 30 pés.
**Pés Invertidos.** Você tem vantagem em testes de Sabedoria (Sobrevivência) para não se perder. Além disso, qualquer criatura que tentar te rastrear tem desvantagem no teste.
**Guardião da Floresta.** Você conhece o truque *druidismo*.`,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    rating: { score: 4.5, count: 18 },
    comments: [],
  },
  {
    id: 'hb-3',
    title: 'Boto Cor-de-Rosa (Monstro)',
    authorId: 'user-1',
    authorUsername: 'Mestre Ancião',
    authorAvatarUrl: 'https://picsum.photos/seed/user1/100',
    category: Category.MONSTRO,
    content: `
### Boto Cor-de-Rosa
*Fera Grande, caótico e neutro*

---
**Classe de Armadura** 14 (armadura natural)
**Pontos de Vida** 85 (10d10 + 30)
**Deslocamento** 0 pés, 60 pés de natação

---
| FOR | DES | CON | INT | SAB | CAR |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 18 (+4) | 16 (+3) | 17 (+3) | 14 (+2) | 12 (+1) | 18 (+4) |

---
**Perícias** Percepção +4, Enganação +7
**Sentidos** Percepção passiva 14
**Idiomas** Silvestre, entende Comum mas não pode falar
**Nível de Desafio** 5 (1.800 XP)

---
***Anfíbio.*** O boto pode respirar ar e água.
***Metamorfo.*** O boto pode usar sua ação para se transformar em um humanoide Médio atraente, ou de volta à sua forma verdadeira. Suas estatísticas, além do tamanho, são as mesmas em cada forma. Qualquer equipamento que esteja vestindo ou carregando não é transformado. Ele reverte à sua forma verdadeira se morrer.
`,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    rating: { score: 4.9, count: 32 },
    comments: [],
  },
];


const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  getHomebrews: async (category?: Category): Promise<Homebrew[]> => {
    await simulateDelay(500);
    if (category) {
      return mockHomebrews.filter(h => h.category === category);
    }
    return [...mockHomebrews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getHomebrewById: async (id: string): Promise<Homebrew | undefined> => {
    await simulateDelay(500);
    return mockHomebrews.find(h => h.id === id);
  },

  createHomebrew: async (data: Omit<Homebrew, 'id' | 'createdAt' | 'rating' | 'comments'>): Promise<Homebrew> => {
    await simulateDelay(1000);
    const newHomebrew: Homebrew = {
      ...data,
      id: `hb-${Date.now()}`,
      createdAt: new Date().toISOString(),
      rating: { score: 0, count: 0 },
      comments: [],
    };
    mockHomebrews.unshift(newHomebrew);
    return newHomebrew;
  },

  postComment: async (homebrewId: string, commentData: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
    await simulateDelay(700);
    const homebrew = mockHomebrews.find(h => h.id === homebrewId);
    if (!homebrew) {
      throw new Error('Homebrew not found');
    }
    const newComment: Comment = {
      ...commentData,
      id: `c-${homebrewId}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    homebrew.comments.push(newComment);
    return newComment;
  },

  rateHomebrew: async (homebrewId: string, newScore: number): Promise<Rating> => {
    await simulateDelay(400);
    const homebrew = mockHomebrews.find(h => h.id === homebrewId);
    if (!homebrew) {
      throw new Error('Homebrew not found');
    }
    const oldTotalScore = homebrew.rating.score * homebrew.rating.count;
    const newCount = homebrew.rating.count + 1;
    const newAverage = (oldTotalScore + newScore) / newCount;
    homebrew.rating = {
        score: Math.round(newAverage * 10) / 10,
        count: newCount
    };
    return homebrew.rating;
  },
  
  getUserHomebrews: async(userId: string): Promise<Homebrew[]> => {
    await simulateDelay(500);
    return mockHomebrews.filter(h => h.authorId === userId);
  }
};