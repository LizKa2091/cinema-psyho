import { IFilmItem } from "../types/film.types";

export const checkFilmStatus = async (filmToCheckId: number) => {
   const filmsWatchLaterList: string | null = localStorage.getItem('watchLaterList');
   const filmsDislikedList: string | null = localStorage.getItem('dislikedList');

   let isFilmWatchLater: boolean | null = null;
   let isFilmDisliked: boolean | null = null;

   if (!filmsWatchLaterList) {
      localStorage.setItem('watchLaterList', JSON.stringify({ films: {} }));
      isFilmWatchLater = false;
   }

   if (!filmsDislikedList) {
      localStorage.setItem('dislikedList', JSON.stringify({ films: {} }));
      isFilmDisliked = false;
   }

   if (filmsWatchLaterList && filmsDislikedList) {
      isFilmWatchLater = JSON.parse(filmsWatchLaterList).films.filter((film: IFilmItem) => filmToCheckId === film.filmId);
      isFilmDisliked = JSON.parse(filmsDislikedList).films.filter((film: IFilmItem) => filmToCheckId === film.filmId);
   }


   return [isFilmWatchLater, isFilmDisliked];
}