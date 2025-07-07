import { checkFilmStatus, filmWatchLaterAction } from '../src/utils/filmsList';

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

   test('adds film to watch later and checks status', () => {
      filmWatchLaterAction(testData, 'add');
      
      const [watchLater] = checkFilmStatus(testData);
      expect(watchLater).toBe(true);
   });

   test('removes film from watch later and checks status', () => {
      filmWatchLaterAction(testData, 'add');
      filmWatchLaterAction(testData, 'remove');

      const [watchLater] = checkFilmStatus(testData);
      expect(watchLater).toBe(false);
   });
});