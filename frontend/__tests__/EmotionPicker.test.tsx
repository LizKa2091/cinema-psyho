import EmotionPicker from '../src/components/UI/EmotionPicker';
import { useFilms } from '../src/hooks/useFilms';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('../src/hooks/useFilms');
jest.mock('../src/utils/filmsList', () => ({
  checkFilmStatus: jest.fn(),
}));

describe('EmotionPicker tests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('renders form', () => {
      (useFilms as jest.Mock).mockReturnValue({ data: null, isLoading: false, isError: false, isSuccess: false });
   
      render(<EmotionPicker />);

      expect(screen.getByText('Какое у вас настроение?')).toBeInTheDocument();
      expect(screen.getByText('Применить')).toBeInTheDocument();
   });
   
   test('displays warning when moods are not selected', async () => {
      (useFilms as jest.Mock).mockReturnValue({ data: null, isLoading: false, isError: false, isSuccess: false });

      render(<EmotionPicker />);
      
      const button = screen.getByText('Применить');
      fireEvent.click(button);

      await waitFor(() => {
         expect(screen.getByText('Выберите хотя бы одно настроение')).toBeInTheDocument();
      });
   });

   test('displays warning on load failure', () => {
      (useFilms as jest.Mock).mockReturnValue({ data: null, isLoading: false, isError: true, isSuccess: false });

      render(<EmotionPicker />);

      expect(screen.getByText('Ошибка при загрузке фильмов')).toBeInTheDocument();
   });

   test('displays nothing found warning when no films found', () => {
      (useFilms as jest.Mock).mockReturnValue({ data: { films: [], totalFilmsCount: 0, totalPages: 1 }, isLoading: false, isError: false, isSuccess: true });

      render(<EmotionPicker />);

      fireEvent.click(screen.getByText('Применить'));

      expect(screen.getByText('Ничего не найдено')).toBeInTheDocument();
   });
})