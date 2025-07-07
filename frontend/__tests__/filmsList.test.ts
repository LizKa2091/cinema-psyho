import { checkFilmStatus } from '../src/utils/filmsList';

beforeEach(() => {
   localStorage.clear();

   localStorage.setItem('watchLaterList', JSON.stringify({ films: [] }));
   localStorage.setItem('dislikedList', JSON.stringify({ films: [] }));
   localStorage.setItem('watchedList', JSON.stringify({ films: [] }));
});

describe('films list util tests', () => {
   const testData = { filmId: '123', title: 'Test Movie' };

   test('inits localStorage and returns false statuses', () => {
      const [watchLater, disliked, watched] = checkFilmStatus(testData);

      expect(watchLater).toBe(false);
      expect(disliked).toBe(false);
      expect(watched).toBe(false);
   });
});