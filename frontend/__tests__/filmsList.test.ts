import { checkFilmStatus, filmWatchLaterAction, filmDislikeAction, filmWatchedAction, filmsListByType } from '../src/utils/filmsList';

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

   test('adds or removes film from disliked list', () => {
      filmDislikeAction(testData, 'add');

      const [, disliked] = checkFilmStatus(testData);
      expect(disliked).toBe(true);

      filmDislikeAction(testData, 'remove');

      const [, dislikedAfterRemove] = checkFilmStatus(testData);
      expect(dislikedAfterRemove).toBe(false);
   });

   test('adds or removes film from watched list', () => {
      filmWatchedAction(testData, 'add');

      const [, , watched] = checkFilmStatus(testData);
      expect(watched).toBe(true);

      filmWatchedAction(testData, 'remove');

      const [, , watchedAfterRemove] = checkFilmStatus(testData);
      expect(watchedAfterRemove).toBe(false);
   });

   test('retrieves correct list by type', () => {
      filmWatchLaterAction(testData, 'add');
      filmDislikeAction(testData, 'add');
      filmWatchedAction(testData, 'add');

      const watchLaterList = filmsListByType('watchLaterList');
      const dislikedList = filmsListByType('dislikedList');
      const watchedList = filmsListByType('watchedList');

      expect(watchLaterList).toHaveLength(1);
      expect(dislikedList).toHaveLength(1);
      expect(watchedList).toHaveLength(1);

      expect(watchLaterList[0].filmId).toBe(testData.filmId);
   });

   test('returns empty list for unknown type', () => {
      const unknownList = filmsListByType('nonexistentList');
      
      expect(unknownList).toEqual([]);
   });
});