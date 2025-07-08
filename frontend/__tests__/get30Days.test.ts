import { get30Days } from '../src/utils/get30Days';

describe('get30Days util tests', () => {
   let result;

   beforeAll(() => {
      result = get30Days();
   });

   test('returns 31 days including today', () => {
      expect(result.length).toBe(31);
   });

   test('each date has correct format', () => {
      const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

      result.forEach(item => {
         expect(dateRegex.test(item.date)).toBe(true);
      });
   });

   test('timestamps are in descending order', () => {
      for (let i = 1; i < result.length; i++) {
         expect(result[i - 1].timestamp).toBeGreaterThan(result[i].timestamp);
      }
   });

   test('first date is today', () => {
      const today = new Date();
      const expected = today.toLocaleDateString('ru-RU').replace(/\//g, '.').padStart(10, '0');

      expect(result[0].date).toBe(expected);
   });

   test('last date is 30 days ago', () => {
      const today = new Date();
      const pastDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      const expected = pastDate.toLocaleDateString('ru-RU').replace(/\//g, '.').padStart(10, '0');

      expect(result[result.length - 1].date).toBe(expected);
   });

   test('timestamps match date strings', () => {
      result.forEach(({ date, timestamp }) => {
         const generatedDate = new Date(timestamp);
         const expectedString = generatedDate.toLocaleDateString('ru-RU').replace(/\//g, '.').padStart(10, '0');
         
         expect(date).toBe(expectedString);
      });
   });
});
