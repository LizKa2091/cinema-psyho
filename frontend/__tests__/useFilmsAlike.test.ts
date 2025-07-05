import '@testing-library/jest-dom';
import * as filmApi from '../src/hooks/useFilmsAlike';

describe('use films alike tests', () => {
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

   const fetchLink = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/392521/similars';

   test('handles get request', async () => {
      const mockData = { items: { filmId: 103414, nameRu: 'Сволочи', posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/103414.jpg' }, total: 2 };
      
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
      delete process.env.REACT_KINOPOISK_API_KEY;

      await expect(filmApi['fetchSimilarFilms'](2)).rejects.toThrow('не задан api ключ');
   });
});