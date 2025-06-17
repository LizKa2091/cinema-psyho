import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import MainLayout from '../src/components/layout/MainLayout';

describe('main layout tests', () => {
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
   })
});