import { render, screen, fireEvent } from "@testing-library/react";
import FilmsPagination from "../src/components/UI/FilmsPagination";

describe('FilmsPagination tests', () => {
   const mockHandlePageChange = jest.fn();

   beforeEach(() => {
      mockHandlePageChange.mockClear();
      Object.defineProperty(window, 'matchMedia', {
         writable: true,
         value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
         })),
      });
   });

   test('renders component', () => {
      render(<FilmsPagination totalItems={100} currPage={2} pagesCount={3} handlePageChange={mockHandlePageChange} />);

      expect(screen.getByTestId('films-pagination')).toBeInTheDocument();
   });

   test('handles page change', () => {
      render(<FilmsPagination totalItems={100} currPage={1} pagesCount={3} handlePageChange={mockHandlePageChange} />);

      const pageButton = screen.getByText('2');

      fireEvent.click(pageButton);

      expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
      expect(mockHandlePageChange.mock.calls[0][0]).toBe(2);
   });
})