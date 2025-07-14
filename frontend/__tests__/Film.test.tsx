import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Film from '../src/pages/Film';
import Home from '../src/pages/Home';

describe('film page tests', () => {
   const queryClient = new QueryClient();

   test('renders film page with correct params', () => {
      const filmId = '123';
      render(
         <MemoryRouter initialEntries={[`/film/${filmId}`]}>
            <QueryClientProvider client={queryClient}>
               <Routes>
                  <Route path='/film/:id' element={<Film />} />
               </Routes>
            </QueryClientProvider>
         </MemoryRouter>
      );

      expect(screen.getByTestId('film-item')).toBeInTheDocument();
   });

   test('renders film page with unknown film id', () => {
      render(<Film />);

      expect(screen.getByText('ID фильма не указан')).toBeInTheDocument();
   });

   test('handles go back link', () => {
      const filmId = '123';

      render(
         <MemoryRouter initialEntries={[`/film/${filmId}`]}>
            <QueryClientProvider client={queryClient}>
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/film/:id' element={<Film />} />
               </Routes>
            </QueryClientProvider>
         </MemoryRouter>
      );

      const button = screen.getByTestId('go-back-button');

      fireEvent.click(button);

      expect(screen.getByTestId('home-page')).toBeInTheDocument();
   })
});