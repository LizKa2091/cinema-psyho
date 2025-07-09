import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WatchLaterButton from '../src/components/UI/buttons/WatchLaterButton';
import * as filmsListUtils from '../src/utils/filmsList';

jest.mock('../src/utils/filmsList', () => ({
   checkFilmStatus: jest.fn(),
   filmWatchLaterAction: jest.fn()
}));

const mockFilmData = {
   filmId: 2,
   nameRu: 'тест',
   posterUrl: 'url',
   rating: '2.0',
   year: '2000',
   filmLength: '02:20'
};

describe('WatchLaterButton tests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('displays suggestive text watch later when film is not added', () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([false, false, false]);
      
      render(<WatchLaterButton filmData={mockFilmData} />);
      
      const button = screen.getByTitle('Добавить в просмотр позже');

      expect(button).toBeInTheDocument();
   });

   test('displays suggestive text remove from watch later when film is added', async () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([true, false, false]);

      render(<WatchLaterButton filmData={mockFilmData} />);

      const updatedButton = await screen.findByTitle('Убрать из просмотра позже');

      expect(updatedButton).toBeInTheDocument();
   });


   test('toggles hidden status on click', () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([false, false, false]);

      const filmWatchedActionMock = filmsListUtils.filmWatchLaterAction as jest.Mock;

      render(<WatchLaterButton filmData={mockFilmData} />);

      const button = screen.getByTitle('Добавить в просмотр позже');

      fireEvent.click(button);

      expect(filmWatchedActionMock).toHaveBeenCalledWith(mockFilmData, 'add');
      

      const updatedButton = screen.getByTitle('Убрать из просмотра позже');

      expect(updatedButton).toBeInTheDocument();
   });
});