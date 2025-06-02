import { IHistoryElement } from "../types/history.types";

const storageLifeTime: number = 30;
const maxStorageSize: number = 100;

let parsedHistory: IHistoryElement[] = [];

export const initSearchHistory = (): IHistoryElement[] => {
   const storedHistory: string | null = localStorage.getItem('searchHistory');
   if (!storedHistory) {
      return [];
   }

   parsedHistory = JSON.parse(storedHistory);
   return parsedHistory;
};

export const addItemSearchHistory = (label: string): void => {
   initSearchHistory();

   const currTimeStamp: number = new Date().getTime();
   parsedHistory.push({ label, timestamp: currTimeStamp });

   if (parsedHistory.length > maxStorageSize) {
      parsedHistory = parsedHistory.slice(1, maxStorageSize+1);
   }

   localStorage.setItem('searchHistory', JSON.stringify(parsedHistory));
};

export const clearSearchHistory = (): void => {
   const currTimeStamp: number = new Date().getTime();
   const expireTime: number = storageLifeTime * 24 * 60 * 60 * 1000;

   const storedHistory: string | null = localStorage.getItem('searchHistory');
   if (!storedHistory) return;

   parsedHistory = JSON.parse(storedHistory);
   parsedHistory = parsedHistory.filter((item: IHistoryElement) => ((currTimeStamp - item.timestamp) <= expireTime));

   localStorage.setItem('searchHistory', JSON.stringify(parsedHistory));
};