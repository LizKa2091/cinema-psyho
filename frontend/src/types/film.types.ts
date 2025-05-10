export interface IFilmsItem {
   filmId: number;
   nameRu: string;
   year: string;
   description: string;
   filmLength: string;
   posterUrl: string;
}

export interface IFilmsResponse {
   pagesCount: string;
   films: IFilmsItem[];
}

export interface IFilmItem {
   filmId: number;
   nameRu: string;
   webUrl: string;
   posterUrl: string;
   year: number;
   filmLength: number;
   description: string;
   facts: string[];
}

export interface IFilmResponse {
   data: IFilmItem;
}