import '@testing-library/jest-dom';
import * as filmApi from '../src/hooks/useFilms';

describe('use films tests', () => {
   const originalEnv = process.env;

   beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
      global.fetch = jest.fn();
   });
   
   afterEach(() => {
      jest.clearAllMocks();
      process.env = originalEnv;
   });

   const fetchLink = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=%D0%A7%D1%91%D1%80%D0%BD%D1%8B%D0%B9%20%D1%8E%D0%BC%D0%BE%D1%80&page=$1';

   test('handles get request', async () => {
      const mockData = { films: [{ filmId: 132468, nameRu: 'Чёрный юмор', posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/132468.jpg', year: '1965', filmLength: '01:33', description: '', facts: [''] }], totalPages: 1, totalFilmsCount: 81 };

      global.fetch = jest.fn().mockResolvedValue({
         ok: true, json: () => Promise.resolve(mockData)
      });

      const response = await fetch(fetchLink);
      const data = await response.json();

      expect(data).toEqual(mockData);
   });

   test('handles get request errors', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetch(fetchLink)).rejects.toThrow('Network error');
   });

   test('throws error when api key is missing', async () => {
      delete process.env.REACT_APP_KINOPOISK_API_KEY;

      await expect(filmApi['fetchFilms']('юмор', 1)).rejects.toThrow('не задан api ключ');
   })
});