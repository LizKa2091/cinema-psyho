import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DislikeButton from '../src/components/UI/buttons/DislikeButton';
import * as filmsListUtils from '../src/utils/filmsList';

jest.mock('../src/utils/filmsList', () => ({
   checkFilmStatus: jest.fn(),
   filmDislikeAction: jest.fn()
}));

const mockFilmData = {
   filmId: 2,
   nameRu: 'тест',
   posterUrl: 'url',
   rating: '2.0',
   year: '2000',
   filmLength: '02:20'
};

describe('DislikeButton tests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('displays suggestive text dont show anymore when film is not hidden', () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([false, false, false]);
      
      render(<DislikeButton filmData={mockFilmData} />);
      
      const button = screen.getByTitle('Не показывать больше');

      expect(button).toBeInTheDocument();
   });

   test('displays suggestive text show again when film is hidden', () => {
      render(<DislikeButton filmData={mockFilmData} />);

      const button = screen.getByTitle('Не показывать больше');
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      const updatedButton = screen.getByTitle('Снова показывать');
      expect(updatedButton).toBeInTheDocument();
   });

   test('toggles hidden status on click', () => {
      (filmsListUtils.checkFilmStatus as jest.Mock).mockReturnValue([false, false, false]);

      const filmDislikeActionMock = filmsListUtils.filmDislikeAction as jest.Mock;

      render(<DislikeButton filmData={mockFilmData} />);

      const button = screen.getByTitle('Не показывать больше');

      fireEvent.click(button);

      expect(filmDislikeActionMock).toHaveBeenCalledWith(mockFilmData, 'add');
      

      const updatedButton = screen.getByTitle('Снова показывать');

      expect(updatedButton).toBeInTheDocument();
   });
});