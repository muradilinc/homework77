export interface Notation {
  author: string | null;
  message: string;
  image: string | null;
}

export interface NotationData extends Notation {
  id: string;
  datetime: string;
}