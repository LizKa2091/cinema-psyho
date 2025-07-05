import '@testing-library/jest-dom';
import axios from 'axios';
import * as filmApi from '../src/hooks/useFilmTrailer';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('use films alike tests (axios)', () => {
   const originalEnv = process.env;

   beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
   });

   afterEach(() => {
      jest.clearAllMocks();
      process.env = originalEnv;
   });

   const fetchUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/392521/videos';

   test('handles get request', async () => {
      const mockData = { items: { url: 'https://widgets.kinopoisk.ru/discovery/trailer/17211?onlyPlayer=1&autoplay=1&cover=1', site: 'KINOPOISK_WIDGET' }, total: 2 };

      mockAxios.get.mockResolvedValue({ data: mockData });

      const data = await axios.get(fetchUrl);

      expect(data.data).toEqual(mockData);
   });

   test('handles get request errors', async () => {
      mockAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(axios.get(fetchUrl)).rejects.toThrow('Network error');
   });

   test('throws error when api key is missing', async () => {
      delete process.env.REACT_KINOPOISK_API_KEY;

      await expect(filmApi.fetchFilmTrailer('2')).rejects.toThrow('ошибка, не задан api ключ кинопоиска');
   });
});