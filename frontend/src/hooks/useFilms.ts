import { useQuery } from '@tanstack/react-query';
import { IFilmsItem, IFilmsResponse } from '../types/film.types';

const fetchFilms = async (keyWords: string, page: number): Promise<IFilmsResponse> => {
   const keyWordsArr = [...keyWords.split(/[,/]/)];
   let allFilms: IFilmsItem[] = [];
   let totalPages: number = 0;
   let totalFilmsCount: number = 0;
   
   const apiKey = process.env.REACT_APP_KINOPOISK_API_KEY;
   if (!apiKey) throw new Error(`не задан api ключ`);

   for (const keyword of keyWordsArr) {
      try {
         const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,
            {
               headers: {
                  'X-API-KEY': apiKey,
                  'Content-Type': 'application/json',
               },
            }
         );
        
         if (!response.ok) throw new Error(`ошибка сети`);
         
         const data = await response.json();
         if (data.films && data.pagesCount && data.searchFilmsCountResult) {
            allFilms = [...allFilms, ...data.films];
            totalPages += data.pagesCount;
            totalFilmsCount += data.searchFilmsCountResult;
         }
      } 
      catch (error) {
        console.error(`ошибка с ключевым словом: "${keyword}":`, error);
      }
   }
   return { films: allFilms, totalPages, totalFilmsCount };
};

export const useFilms = (keyWord: string, page: number) => {
   return useQuery({
      queryKey: ['films', keyWord, page],
      queryFn: () => fetchFilms(keyWord, page),
      enabled: !!keyWord,
      retry: 1
   })
};