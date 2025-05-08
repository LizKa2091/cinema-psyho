import { useQuery } from '@tanstack/react-query';
import { IFilmResponse } from '../types/menu.types';

const fetchFilms = async (keyWord: string): Promise<IFilmResponse> => {
   const apiKey = process.env.REACT_APP_KINOPOISK_API_KEY;
   if (!apiKey) throw new Error(`не задан api ключ`);

   try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyWord}`, {
         method: 'GET',
         headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
         },
      });
   
      if (!response.ok) {
         throw new Error('ошибка сети');
      }
   
      let result = await response.json();
      return result;
   }
   catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e);
      throw new Error(errMsg);
   }
};

export const useFilms = (keyWord: string) => {
   return useQuery({
      queryKey: ['films', keyWord],
      queryFn: () => fetchFilms(keyWord),
      enabled: !!keyWord,
      retry: 2
   })
};