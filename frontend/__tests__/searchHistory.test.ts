import { addItemSearchHistory } from './../src/features/searchHistory';
import '@testing-library/jest-dom';

describe('search history tests', () => {
   let mockLocalStorage: Record<string, string>;

   beforeEach(() => {
      mockLocalStorage = {};

      jest.spyOn(global.localStorage.__proto__, 'getItem').mockImplementation((key: string) => {
         return mockLocalStorage[key] || null;
      });

      jest.spyOn(global.localStorage.__proto__, 'setItem').mockImplementation((key: string, value: string) => {
         mockLocalStorage[key] = value;
      });
   });

   afterEach(() => {
      jest.restoreAllMocks();
   });

   test('adds new item to search history', () => {
      const testData = 'test';
      addItemSearchHistory(testData);

      expect(localStorage.setItem).toHaveBeenCalledWith('searchHistory', expect.any(String));

      const storedData = JSON.parse(mockLocalStorage['searchHistory']);

      expect(storedData.length).toBe(1);
      expect(storedData[0].label).toBe(testData);
      expect(typeof storedData[0].timestamp).toBe('number');
   });

   test('trims history when max storage size is reached', () => {
      const testData = Array.from({ length: 100 }, (_, i) => ({
         label: `test ${i}`,
         timestamp: Date.now()
      }));

      mockLocalStorage['searchHistory'] = JSON.stringify(testData);
      addItemSearchHistory('some test');

      const storedData = JSON.parse(mockLocalStorage['searchHistory']);

      expect(storedData.length).toBeLessThanOrEqual(100);
      expect(storedData.some(item => item.label === 'test 0')).toBe(false);
      expect(storedData.some(item => item.label === 'some test')).toBe(true);
   })
});