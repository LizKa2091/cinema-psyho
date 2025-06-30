import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import MainLayout from '../src/components/layout/MainLayout';

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: jest.fn(),
}));

describe('main layout tests', () => {
   const mockNavigate = jest.fn();
   (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

   test('main layout renders', () => {
      render(
         <Router>
            <MainLayout>
               <div>test</div>
            </MainLayout>
         </Router>   
      );

      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText("Cinema Psyho")).toBeInTheDocument();
      expect(screen.getByText("Cinema Psyho ©2025 Created by LizKa2091")).toBeInTheDocument();
   });

   test('main layout navigates to home when logo is clicked', () => {
      render(
         <Router>
            <MainLayout>
               <div>test</div>
            </MainLayout>
         </Router>   
      );

      const logo = screen.getByTestId('logo');
      fireEvent.click(logo);

      expect(mockNavigate).toHaveBeenCalledWith('/');
   });

   test('main layout footer link points to github profile', () => {
      render(
         <Router>
            <MainLayout>
               <div>test</div>
            </MainLayout>
         </Router>   
      );

      const footerLink = screen.getByTestId('footer-link');
      expect(footerLink).toHaveAttribute('href', 'https://github.com/LizKa2091');
   });

   test('main layout menu items render', () => {
      render(
         <Router>
            <MainLayout>
               <div>test</div>
            </MainLayout>
         </Router>
      );

      expect(screen.getByText('Главная')).toBeInTheDocument();
      expect(screen.getByText('Профиль')).toBeInTheDocument();
      expect(screen.getByText('Аналитика')).toBeInTheDocument();
      expect(screen.getByText('О создателе')).toBeInTheDocument();
   });

   test('main layout menu items navigate', () => {
      render(
         <Router>
            <MainLayout>
               <div>test</div>
            </MainLayout>
         </Router>
      );

      const link1 = screen.getByText('Главная');
      const link2 = screen.getByText('Профиль');
      const link3 = screen.getByText('Аналитика');
      const link4 = screen.getByText('О создателе');

      fireEvent.click(link1);
      expect(mockNavigate).toHaveBeenCalledWith('/');

      fireEvent.click(link2);
      expect(mockNavigate).toHaveBeenCalledWith('/profile');

      fireEvent.click(link3);
      expect(mockNavigate).toHaveBeenCalledWith('/profile');

      fireEvent.click(link4);
      expect(mockNavigate).toHaveBeenCalledWith('/');
   })
});