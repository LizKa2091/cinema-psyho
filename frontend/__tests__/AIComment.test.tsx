import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AIComment from '../src/components/UI/profile/AIComment';
import * as genFilmComment from '../src/hooks/useGenerateFilmComment';

jest.mock('../src/hooks/useGenerateFilmComment');

describe('AIComment profile component tests', () => {
   test('renders AI comment', async () => {
      (genFilmComment.useGenerateFilmComment as jest.Mock).mockReturnValue({
         mutate: (prompt, { onSuccess }) => {
            onSuccess({ result: 'test' });
         },
      });

      render(<AIComment filmId={123} nameRu="test film" description="test film" filmType="test" />);

      await waitFor(() => {
         expect(screen.getByText('test')).toBeInTheDocument();
      });
   });

   test('shows error message on failure', async () => {
      (genFilmComment.useGenerateFilmComment as jest.Mock).mockReturnValue({
         mutate: (prompt, { onError }) => {
            onError({ message: 'test film' });
         },
      });

      render(<AIComment filmId={456} nameRu="test film" description="test film " filmType="test" />);

      await waitFor(() => {
         expect(screen.getByText('test film')).toBeInTheDocument();
      });
   });
});