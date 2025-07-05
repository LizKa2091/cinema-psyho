import { useQuery } from "@tanstack/react-query";
import { IFilmsAlikeResponse } from "../types/film.types";

export const fetchSimilarFilms = async (filmId: number): Promise<IFilmsAlikeResponse | undefined> => {
   const apiKey = process.env.REACT_APP_KINOPOISK_API_KEY;
   if (!apiKey) throw new Error(`не задан api ключ`);

   try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/similars`,
         {
            headers: {
               'X-API-KEY': apiKey,
               'Content-Type': 'application/json',
            },
         }
      );

      if (!response.ok) {
         throw new Error('ошибка сети');
      }

      let result = await response.json();
      return result;
   }
   catch(e) {
      console.error(e);
   }
};

export const useFilmsAlike = (filmId: number) => {
   return useQuery({
      queryKey: ['similarFilms', filmId],
      queryFn: () => fetchSimilarFilms(filmId),
      enabled: !!filmId
   })
};