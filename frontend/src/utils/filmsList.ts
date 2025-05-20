import { IFilmsItem } from "../types/film.types";

type filmAction = 'add' | 'remove';

export const checkFilmStatus = (filmData: IFilmsItem) => {
   let filmsWatchLaterList: string | null = localStorage.getItem('watchLaterList');
   let filmsDislikedList: string | null = localStorage.getItem('dislikedList');
   let filmsWatchedList: string | null = localStorage.getItem('watchedList');

   let isFilmWatchLater: boolean | null = null;
   let isFilmDisliked: boolean | null = null;
   let isFilmWatched: boolean | null = null;

   if (!filmsWatchLaterList) {
      localStorage.setItem('watchLaterList', JSON.stringify({ films: [] }));
      isFilmWatchLater = false;
   }

   if (!filmsDislikedList) {
      localStorage.setItem('dislikedList', JSON.stringify({ films: [] }));
      isFilmDisliked = false;
   }

   if (!filmsWatchedList) {
      localStorage.setItem('watchedList', JSON.stringify({ films: [] }));
      isFilmWatched = false;
   }

   if (filmsWatchLaterList && filmsDislikedList && filmsWatchedList) {
      const watchLaterData = JSON.parse(filmsWatchLaterList);
      const dislikedData = JSON.parse(filmsDislikedList);
      const watchedData = JSON.parse(filmsWatchedList);
      
      isFilmWatchLater = Array.isArray(watchLaterData.films) && watchLaterData.films.some((film: IFilmsItem) => filmData.filmId === film.filmId);
      isFilmDisliked = Array.isArray(dislikedData.films) && dislikedData.films.some((film: IFilmsItem) => filmData.filmId === film.filmId);
      isFilmWatched = Array.isArray(watchedData.films) && watchedData.films.some((film: IFilmsItem) => filmData.filmId === film.filmId);
   }

   return [isFilmWatchLater, isFilmDisliked, isFilmWatched];
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

export const filmWatchedAction = (filmData: IFilmsItem, action: filmAction) => {
   const storedData = localStorage.getItem('watchedList') || '{"films":[]}';
   const { films } = JSON.parse(storedData);
   
   let updatedFilms;
   
   if (action === 'add') {
      updatedFilms = [...films, filmData];
   } 
   else {
      updatedFilms = films.filter((film: IFilmsItem) => film.filmId !== filmData.filmId);
   }
   
   localStorage.setItem('watchedList', JSON.stringify({ films: updatedFilms }));
   return action === 'add';
};