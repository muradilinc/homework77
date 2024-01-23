export interface Notation {
  id: string;
  datetime: string;
  author: string;
  message: string;
  image: File | null;
}

export type NewNotation = Omit<Notation, 'id' | 'datetime'>;