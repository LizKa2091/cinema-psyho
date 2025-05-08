export interface IMenuItem {
   label: string;
   key: string;
}

export interface IEmotionItem {
   value: string;
   label: string;
   emoji: string;
   color: string;
}

export interface IFilmItem {
   filmId: number;
   nameRu: string;
   year: string;
   description: string;
   filmLength: string;
   posterUrl: string;
}

export interface IFilmResponse {
   pagesCount: string;
   films: IFilmItem[];
}