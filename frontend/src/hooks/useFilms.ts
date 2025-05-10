import { useQuery } from '@tanstack/react-query';
import { IFilmItem, IFilmResponse } from '../types/menu.types';

const fetchFilms = async (keyWords: string): Promise<IFilmResponse | { films: any }> => {
   const keyWordsArr = [...keyWords.split(/[,/]/)];
   let allFilms: IFilmItem[] = [];
   
   const apiKey = process.env.REACT_APP_KINOPOISK_API_KEY;
   if (!apiKey) throw new Error(`не задан api ключ`);

   for (const keyword of keyWordsArr) {
      try {
         const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`,
            {
               headers: {
                  'X-API-KEY': apiKey,
                  'Content-Type': 'application/json',
               },
            }
         );
        
         if (!response.ok) throw new Error(`ошибка сети`);
         
         const data = await response.json();
         if (data.films) {
            allFilms = [...allFilms, ...data.films];
         }
      } 
      catch (error) {
        console.error(`ошибка с ключевым словом: "${keyword}":`, error);
      }
   }
   return { films: allFilms };
};

export const useFilms = (keyWord: string) => {
   return useQuery({
      queryKey: ['films', keyWord],
      queryFn: () => fetchFilms(keyWord),
      enabled: !!keyWord,
      retry: 1
   })
};