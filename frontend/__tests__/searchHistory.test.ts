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
});