import axios from "axios";
import { IFilmTrailerResponse } from "../types/film.types";
import { useQuery } from '@tanstack/react-query';

export const fetchFilmTrailer = async (filmId: string) => {
   const apiKey = process.env.REACT_APP_KINOPOISK_API_KEY;

   if (!apiKey) throw new Error('ошибка, не задан api ключ кинопоиска');

   try {
      const response = axios.get<IFilmTrailerResponse>(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/videos`, {
         headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json'
         }
      });

      let result = await response;
      return result.data;
   }
   catch(err) {
      if (err instanceof Error) {
         throw new Error(err.message || 'произошла ошибка')
      }
      throw new Error('произошла ошибка');
   }
};

export const useFilmTrailer = (filmId: string) => {
   return useQuery({
      queryKey: ['filmTrailer', filmId],
      queryFn: () => fetchFilmTrailer(filmId),
      enabled: !!filmId
   })
}