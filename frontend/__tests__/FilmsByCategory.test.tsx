import React from 'react';
import { render, screen } from '@testing-library/react';
import FilmsByCategory from '../src/components/UI/profile/FilmsByCategory';
import * as filmsUtils from '../src/utils/filmsList';

jest.mock('../src/components/UI/profile/AIComment', () => () => <div data-testid="AIComment" />);
jest.mock('../src/components/UI/CompactFilmItem', () => () => <div data-testid="CompactFilmItem" />);

describe('FilmsByCategory profile component tests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('renders main heading', () => {
      jest.spyOn(filmsUtils, 'filmsListByType').mockReturnValue([]);

      render(<FilmsByCategory />);
      expect(screen.getByText('Сохранённые фильмы')).toBeInTheDocument();
   });

   test('displays info about empty state when film lists are empty', () => {
      jest.spyOn(filmsUtils, 'filmsListByType').mockReturnValue([]);

      render(<FilmsByCategory />);
      expect(screen.getAllByText('В этой категории у вас нет сохранённных фильмов').length).toBeGreaterThan(0);
   });

   test('renders film items in watchLater list when data exists', () => {
      jest.spyOn(filmsUtils, 'filmsListByType').mockImplementation((type: string) => {
         if (type === 'watchLaterList') {
            return [{ filmId: 1,nameRu: 'Test Film', description: 'Test description', posterUrlPreview: '', rating: '8.5' }];
         }

         return [];
      });

      render(<FilmsByCategory />);
      expect(screen.getByTestId('CompactFilmItem')).toBeInTheDocument();
      expect(screen.getByTestId('AIComment')).toBeInTheDocument();
   });
});