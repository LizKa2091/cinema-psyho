import '@testing-library/jest-dom';

describe('use film tests', () => {
   beforeEach(() => {
      global.fetch = jest.fn();
   });
   
   afterEach(() => {
      jest.clearAllMocks();
   });

   const fetchLink = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/46464';

   test('handles get request', async () => {
      const mockData = { data: { filmId: 46464, nameRu: 'Ностальгия', webUrl: 'https://www.kinopoisk.ru/film/46464/', posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/46464.jpg', year: 1983, filmLength: '02:05', description: 'Русский писатель Андрей Горчаков приезжает в Италию в поисках биографических следов крепостного музыканта Павла Сосновского, некогда посетившего эти места. Поиски примет эмиграционных дней жизни музыканта — это и есть то, что связывает Горчакова c переводчицей Юдженией, которая пытается понять причину тоски русского друга посредством томика стихов Арсения Тарковского.\nВскоре Горчаков начинает осознавать, что история музыканта — это отчасти и его собственная история: в Италии он чувствует себя чужим, но и вернуться домой уже не может. Им овладевает тягостное оцепенение, тоска по родине переходит в болезнь.', facts: ['']} };
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
})