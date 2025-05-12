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
   filmLength: string;
   description: string;
   facts: string[];
}

export interface IFilmResponse {
   data: IFilmItem;
}

export interface IFilmAlike {
   filmId: number;
   nameRu: string;
   posterUrl: string;
}

export interface IFilmsAlikeResponse {
   total: number;
   items: IFilmAlike[];
}