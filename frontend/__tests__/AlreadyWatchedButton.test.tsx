import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlreadyWatchedButton from '../src/components/UI/buttons/AlreadyWatchedButton';
import * as filmsListUtils from '../src/utils/filmsList';

jest.mock('../src/utils/filmsList', () => ({
   checkFilmStatus: jest.fn(),
   filmWatchedAction: jest.fn()
}));

const mockFilmData = {
   filmId: 2,
   nameRu: 'тест',
   posterUrl: 'url',
   rating: '2.0',
   year: '2000',
   filmLength: '02:20'
};

describe('AlreadyWatchedButton tests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('displays suggestive text already watched when film is not watched', () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([false, false, false]);
      
      render(<AlreadyWatchedButton filmData={mockFilmData} />);
      
      const button = screen.getByText('Уже смотрел');

      expect(button).toBeInTheDocument();
   });

   test('displays suggestive text remove from watched when film is already watched', () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([false, false, true]);

      render(<AlreadyWatchedButton filmData={mockFilmData} />);

      const button = screen.getByText('Убрать из просмотренного');

      expect(button).toBeInTheDocument();
   });

   test('toggles watched status on click', () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([false, false, false]);

      const filmWatchedActionMock = filmsListUtils.filmWatchedAction as jest.Mock;

      render(<AlreadyWatchedButton filmData={mockFilmData} />);

      const button = screen.getByText('Уже смотрел');

      fireEvent.click(button);

      expect(filmWatchedActionMock).toHaveBeenCalledWith(mockFilmData, 'add');
      

      const updatedButton = screen.getByText('Убрать из просмотренного');

      expect(updatedButton).toBeInTheDocument();
   });
});