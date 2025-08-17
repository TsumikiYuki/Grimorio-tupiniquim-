
export enum Category {
  CLASSE = 'Classe',
  RACA = 'Raça',
  MAGIA = 'Magia',
  ITEM = 'Item Mágico',
  MONSTRO = 'Monstro',
  OUTRO = 'Outro'
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  bio: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl: string;
  content: string;
  createdAt: string;
}

export interface Rating {
  score: number;
  count: number;
}

export interface Homebrew {
  id: string;
  title: string;
  authorId: string;
  authorUsername: string;
  authorAvatarUrl: string,
  category: Category;
  content: string;
  createdAt: string;
  rating: Rating;
  comments: Comment[];
}
