import { render, screen } from '@testing-library/react';
import Profile from '../src/pages/Profile';

describe('profile page tests', () => {
   test('renders profile page', () => {
      render(<Profile />);

      expect(screen.getByText('Профиль')).toBeInTheDocument();
   });
});