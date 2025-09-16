export interface Medium {
  name: string;
  inhalt: string;
  format: 'buch' | 'serie' | 'film';
  _id?: string;
}