export interface Medium {
  name: string;
  inhalt: string;
  format: 'Buch' | 'Serie' | 'Film';
  _id?: string;
}