import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CompactFilmItem from "../src/components/UI/CompactFilmItem";
import Film from "../src/pages/Film";

describe('CompactFilmItem tests', () => {
   const queryClient = new QueryClient();

   const testFilmItem = { filmId: 123, nameRu: 'test name 1', year: '2000', description: 'test desc 1', filmLength: '02:00', posterUrl: 'test url 1' };
   const testFilmItemWithoutLength = { filmId: 124, nameRu: 'test name 2', year: '2001', description: 'test desc 2', posterUrl: 'test url 2' };
   
   test('renders CompactFilmItem with film length', () => {
      render(
         <MemoryRouter>
            <QueryClientProvider client={queryClient}>
               <Routes>
                  <Route path='/' element={<CompactFilmItem filmItem={testFilmItem} />} />
               </Routes>
            </QueryClientProvider>
         </MemoryRouter>
      );

      expect(screen.getByTestId('film-item-card')).toBeInTheDocument();
      expect(screen.getByText(testFilmItem.nameRu)).toBeInTheDocument();
      expect(screen.getByText(testFilmItem.description)).toBeInTheDocument();
      expect(screen.getByAltText(testFilmItem.nameRu)).toHaveAttribute('src', testFilmItem.posterUrl);
   });

   test('renders CompactFilmItem without film length', () => {
      render(
         <MemoryRouter>
            <QueryClientProvider client={queryClient}>
               <Routes>
                  <Route path='/' element={<CompactFilmItem filmItem={testFilmItemWithoutLength} />} />
               </Routes>               
            </QueryClientProvider>
         </MemoryRouter>
      );

      expect(screen.getByTestId('film-item-card')).toBeInTheDocument();
   });

   test('handles navigation to film page on click', () => {
      render(
         <MemoryRouter initialEntries={['/']}>
            <QueryClientProvider client={queryClient}>
               <Routes>
                  <Route path='/' element={<CompactFilmItem filmItem={testFilmItemWithoutLength} />} />
                  <Route path='/film/:id' element={<Film />} />
               </Routes>
            </QueryClientProvider>
         </MemoryRouter>
      );

      const card = screen.getByTestId('film-item-card');
      fireEvent.click(card);

      expect(screen.getByTestId('film-item')).toBeInTheDocument();
   });
});