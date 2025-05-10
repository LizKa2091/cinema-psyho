import { useQuery } from "@tanstack/react-query";
import { IFilmResponse } from "../types/film.types";

const fetchFilmInfo = async (filmId: string): Promise<IFilmResponse | undefined> => {
   const apiKey = process.env.REACT_APP_KINOPOISK_API_KEY;
   if (!apiKey) throw new Error(`не задан api ключ`);

   try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${filmId}`,
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

export const useFilm = (filmId: string) => {
   return useQuery({
      queryKey: ['film', filmId],
      queryFn: () => fetchFilmInfo(filmId),
      enabled: !!filmId
   })
};