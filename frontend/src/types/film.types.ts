export interface IFilmsItem {
   filmId: number;
   nameRu: string;
   year: string;
   description: string;
   filmLength?: string;
   posterUrl: string;
   isWatchLater?: boolean;
   isDisliked?: boolean;
}

export interface IFilmsResponse {
   films: IFilmsItem[];
   totalPages: number;
   totalFilmsCount: number;
}

export interface IFilmTrailerResponse {
   total: number;
   items: IFilmTrailerItem[];
}

type trailerSite = 'YOUTUBE' | 'YANDEX_DISK' | 'KINOPOISK_WIDGET';

export interface IFilmTrailerItem {
   url: string;
   site: trailerSite;
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