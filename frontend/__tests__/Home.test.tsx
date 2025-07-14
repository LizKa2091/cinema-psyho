import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../src/pages/Home';

describe('home page tests', () => {
   const queryClient = new QueryClient();

   test('renders home page', () => {
      render(
         <QueryClientProvider client={queryClient}>
            <Home />
         </QueryClientProvider>
      );

      expect(screen.getByTestId('home-page')).toBeInTheDocument();
   });
});