import FilmItem from '../src/components/UI/FilmItem';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../src/hooks/useFilm', () => ({
   useFilm: jest.fn(),
}));

jest.mock('../src/hooks/useFilmTrailer', () => ({
   useFilmTrailer: jest.fn(),
}));

const mockedUseFilm = require('../src/hooks/useFilm').useFilm;
const mockedUseFilmTrailer = require('../src/hooks/useFilmTrailer').useFilmTrailer;

describe('FilmItem tests', () => {
   const mockFilmData = { data: { nameRu: 'test film name', description: 'test film description', year: '2022', filmLength: '02:00', webUrl: 'test film url', facts: ['test film fact 1', 'test film fact 2'], posterUrl: 'test film poster url' } };

   const mockTrailerData = { items: [{ url: 'https://www.youtube.com/embed/test1', site: 'YOUTUBE' }, { url: 'https://www.youtube.com/embed/test2', site: 'YOUTUBE' }]};

   test('displays warning on load failure', () => {
      mockedUseFilm.mockReturnValue({ isError: true });
      mockedUseFilmTrailer.mockReturnValue({});

      render(
         <MemoryRouter>
            <FilmItem filmId="123" />
         </MemoryRouter>
      );

      expect(screen.getByText('Ошибка, попробуйте другой фильм')).toBeInTheDocument();
      expect(screen.getByText('Вернуться назад')).toBeInTheDocument();
   });

   test('displays warning for not found film if data does not exist', () => {
      mockedUseFilm.mockReturnValue({ isSuccess: true, data: null });
      mockedUseFilmTrailer.mockReturnValue({});

      render(<FilmItem filmId="123" />);

      expect(screen.getByText('Фильм не найден')).toBeInTheDocument();
   });

   test('displays film data', () => {
      mockedUseFilm.mockReturnValue({ isSuccess: true, data: mockFilmData });
      mockedUseFilmTrailer.mockReturnValue({ data: mockTrailerData });

      render(
         <MemoryRouter>
            <FilmItem filmId="123" />
         </MemoryRouter>
      );

      expect(screen.getByText('test film name')).toBeInTheDocument();
      expect(screen.getByText('test film description')).toBeInTheDocument();
      expect(screen.getByText('2022 год')).toBeInTheDocument();
      expect(screen.getByText('Посмотреть на кинопоиске')).toBeInTheDocument();
   });

   test('displays and hides facts', async () => {
      mockedUseFilm.mockReturnValue({ isSuccess: true, data: mockFilmData });
      mockedUseFilmTrailer.mockReturnValue({ data: mockTrailerData });

      render(
         <MemoryRouter>
            <FilmItem filmId="123" />
         </MemoryRouter>
      );

      const button = screen.getByText('Раскрыть');

      fireEvent.click(button);

      await waitFor(() => {
         expect(screen.getByText('test film fact 1')).toBeInTheDocument();
      });

      await waitFor(() => {
         expect(screen.getByText('test film fact 2')).toBeInTheDocument();
      })

      fireEvent.click(button);

      expect(screen.queryByText('test film fact 1')).not.toBeInTheDocument();
   });

   test('displays trailers', () => {
      mockedUseFilm.mockReturnValue({ isSuccess: true, data: mockFilmData });
      mockedUseFilmTrailer.mockReturnValue({ data: mockTrailerData });

      render(
         <MemoryRouter>
            <FilmItem filmId="123" />
         </MemoryRouter>
      );

      expect(screen.getByText('Трейлеры YouTube')).toBeInTheDocument();
   });
})