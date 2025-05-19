import { IFilmsItem } from "../types/film.types";

type filmAction = 'add' | 'remove';

export const checkFilmStatus = (filmData: IFilmsItem) => {
   let filmsWatchLaterList: string | null = localStorage.getItem('watchLaterList');
   let filmsDislikedList: string | null = localStorage.getItem('dislikedList');

   let isFilmWatchLater: boolean | null = null;
   let isFilmDisliked: boolean | null = null;

   if (!filmsWatchLaterList) {
      localStorage.setItem('watchLaterList', JSON.stringify({ films: [] }));
      isFilmWatchLater = false;
   }

   if (!filmsDislikedList) {
      localStorage.setItem('dislikedList', JSON.stringify({ films: [] }));
      isFilmDisliked = false;
   }

   if (filmsWatchLaterList && filmsDislikedList) {
      const watchLaterData = JSON.parse(filmsWatchLaterList);
      const dislikedData = JSON.parse(filmsDislikedList);
      
      isFilmWatchLater = Array.isArray(watchLaterData.films) && watchLaterData.films.some((film: IFilmsItem) => filmData.filmId === film.filmId);
      isFilmDisliked = Array.isArray(dislikedData.films) && dislikedData.films.some((film: IFilmsItem) => filmData.filmId === film.filmId);
   }

   return [isFilmWatchLater, isFilmDisliked];
};

export const filmWatchLaterAction = (filmData: IFilmsItem, action: filmAction) => {
   const storedData = localStorage.getItem('watchLaterList') || '{"films":[]}';
   const { films } = JSON.parse(storedData);
   
   let updatedFilms;
   
   if (action === 'add') {
     updatedFilms = [...films, filmData];
   } 
   else {
     updatedFilms = films.filter((film: IFilmsItem) => film.filmId !== filmData.filmId);
   }
   
   localStorage.setItem('watchLaterList', JSON.stringify({ films: updatedFilms }));
   return action === 'add';
};

export const filmDislikeAction = (filmData: IFilmsItem, action: filmAction) => {
   const storedData = localStorage.getItem('dislikedList') || '{"films":[]}';
   const { films } = JSON.parse(storedData);
   
   let updatedFilms;
   
   if (action === 'add') {
      updatedFilms = [...films, filmData];
   } 
   else {
      updatedFilms = films.filter((film: IFilmsItem) => film.filmId !== filmData.filmId);
   }
   
   localStorage.setItem('dislikedList', JSON.stringify({ films: updatedFilms }));
   return action === 'add';
};